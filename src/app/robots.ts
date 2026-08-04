import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt
 *
 * Staging is blocked outright. Production allows everything crawlable.
 *
 * AI crawlers are explicitly allowed. That is a deliberate decision, not an
 * oversight: the entire GEO and AEO strategy depends on ChatGPT, Claude,
 * Perplexity and Google's AI surfaces being able to read the FAQ, the
 * journal and the service pages. Blocking them would remove the business
 * from exactly the answers we are trying to win.
 *
 * The 22 city pages carry their own noindex at the page level rather than
 * being disallowed here, because a disallowed page cannot be read at all,
 * whereas a noindexed page can still pass link equity while staying out of
 * the index.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      // Named explicitly so the intent is unmistakable to anyone auditing.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
