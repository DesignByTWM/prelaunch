import { KEY_PAGES_END, LLMS_BASE } from "@/content/llms";
import { journalPosts } from "@/content/journal";
import { featuredBuilds } from "@/content/builds";
import { getArticles, getBuilds } from "@/sanity/content";

/**
 * /llms.txt
 *
 * Replaces the static public/llms.txt, so articles and builds Liz publishes
 * in the Studio reach AI crawlers without a deploy.
 *
 * With the content that existed when it was introduced, the output is byte
 * for byte the file it replaced. That file listed no individual articles or
 * builds, so those five articles and six builds are still not listed: the
 * journal and builds pages stand for them, as before.
 *
 * Anything published after that is added to the Key pages list, directly
 * after its last entry, in the same link format:
 *
 *   - [Article title](https://designbytwm.com/journal/slug)
 *   - [Vehicle: Build name](https://designbytwm.com/featured-builds/slug)
 *
 * Links use the production address, as the file always has, whichever
 * deployment is serving it.
 */

export const revalidate = 3600;

const ORIGIN = "https://designbytwm.com";

/* Present when this route was introduced, and so already covered. */
const KNOWN_ARTICLES = new Set(journalPosts.map((p) => p.slug));
const KNOWN_BUILDS = new Set(featuredBuilds.map((b) => b.slug));

/** Square brackets would end the link text early, so they are dropped. */
const text = (s: string) => s.replace(/[[\]]/g, "");

export async function GET() {
  const [articles, builds] = await Promise.all([getArticles(), getBuilds()]);

  const added = [
    ...articles
      .filter((a) => !KNOWN_ARTICLES.has(a.slug))
      .map((a) => `- [${text(a.title)}](${ORIGIN}/journal/${a.slug})\n`),
    ...builds
      .filter((b) => !KNOWN_BUILDS.has(b.slug))
      .map((b) => `- [${text(`${b.vehicle}: ${b.title}`)}](${ORIGIN}/featured-builds/${b.slug})\n`),
  ];

  const cut = LLMS_BASE.indexOf(KEY_PAGES_END) + KEY_PAGES_END.length;
  const body = LLMS_BASE.slice(0, cut) + added.join("") + LLMS_BASE.slice(cut);

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
