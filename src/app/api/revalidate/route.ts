import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { submitToIndexNow, type IndexNowResult } from "@/lib/indexnow";
import { site } from "@/lib/site";

/**
 * INSTANT PUBLISH
 *
 * Sanity calls this when a document changes, so whatever Liz publishes
 * appears on the site without waiting for a rebuild or for the hourly
 * refresh.
 *
 * The signature is checked with parseBody against SANITY_REVALIDATE_SECRET.
 * That secret is what stops anyone from forcing revalidation by posting to
 * this URL, so a missing secret is treated as a server error rather than
 * being waved through.
 *
 * WHAT EACH DOCUMENT TYPE REFRESHES
 *
 *   servicePhotos  its service page, /services and / as before, plus every
 *                  page that shows a service card: every service page's
 *                  Related band and the city pages
 *   homepage       /
 *   article        the article, every other article's More reading, the
 *                  journal list, /thank-you, the sitemap and llms.txt
 *   build          the build, every other build's Other builds, the builds
 *                  list, the homepage, the city pages, the sitemap and
 *                  llms.txt
 *
 * When an article or build changes its address, or is deleted, the old
 * address is refreshed too, so it stops serving the old page.
 *
 * Only a brand new article or build is announced to IndexNow, and only
 * after its pages have been refreshed.
 */

interface WebhookPayload {
  _type?: string;
  _id?: string;
  slug?: string | null;
  previousSlug?: string | null;
  operation?: "create" | "update" | "delete" | null;
}

interface Target {
  path: string;
  /** Set for a dynamic route pattern, which refreshes every page it matches. */
  type?: "page";
}

function targetsFor(body: WebhookPayload): Target[] | { error: string } {
  const slug = body.slug ?? undefined;
  const previous = body.previousSlug && body.previousSlug !== slug ? body.previousSlug : undefined;

  switch (body._type) {
    case "servicePhotos": {
      /* The id is servicePhotos-{slug}, so the slug comes from either the
         projected field or the id itself. */
      const service = slug ?? body._id?.replace(/^servicePhotos-/, "");
      if (!service) return { error: "No service slug on the payload." };
      return [
        { path: `/services/${service}` },
        { path: "/services" },
        { path: "/" },
        /* The card photo: every Related band and the city pages. */
        { path: "/services/[slug]", type: "page" },
        { path: "/locations/[city]", type: "page" },
      ];
    }

    case "homepage":
      return [{ path: "/" }];

    case "article": {
      if (!slug && !previous) return { error: "No article slug on the payload." };
      return [
        ...(slug ? [{ path: `/journal/${slug}` }] : []),
        ...(previous ? [{ path: `/journal/${previous}` }] : []),
        { path: "/journal" },
        { path: "/journal/[slug]", type: "page" as const },
        { path: "/thank-you" },
        { path: "/sitemap.xml" },
        { path: "/llms.txt" },
      ];
    }

    case "build": {
      if (!slug && !previous) return { error: "No build slug on the payload." };
      return [
        ...(slug ? [{ path: `/featured-builds/${slug}` }] : []),
        ...(previous ? [{ path: `/featured-builds/${previous}` }] : []),
        { path: "/featured-builds" },
        { path: "/" },
        { path: "/featured-builds/[slug]", type: "page" as const },
        { path: "/locations/[city]", type: "page" as const },
        { path: "/sitemap.xml" },
        { path: "/llms.txt" },
      ];
    }

    default:
      return [];
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  /* 500 rather than a throw, so a deployment without the secret set
     answers cleanly instead of failing the build or crashing a route. */
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not set." },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret);

    if (!isValidSignature) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid signature." },
        { status: 401 },
      );
    }

    if (!body) {
      return NextResponse.json({ revalidated: false, message: "Empty payload." }, { status: 400 });
    }

    const targets = targetsFor(body);
    if ("error" in targets) {
      return NextResponse.json({ revalidated: false, message: targets.error }, { status: 400 });
    }
    if (targets.length === 0) {
      return NextResponse.json({
        revalidated: false,
        message: `Ignored document type ${body._type ?? "unknown"}.`,
      });
    }

    for (const target of targets) {
      if (target.type) revalidatePath(target.path, target.type);
      else revalidatePath(target.path);
    }

    /* A brand new article or build only, and only now that its pages are
       refreshed. */
    let indexNow: IndexNowResult | undefined;
    if (body.operation === "create" && body.slug && (body._type === "article" || body._type === "build")) {
      const base = body._type === "article" ? "/journal" : "/featured-builds";
      indexNow = await submitToIndexNow([
        `${site.url}${base}/${body.slug}`,
        `${site.url}${base}`,
        `${site.url}/sitemap.xml`,
      ]);
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug ?? null,
      paths: targets.map((t) => (t.type ? `${t.path} (${t.type})` : t.path)),
      ...(indexNow ? { indexNow } : {}),
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 400 },
    );
  }
}
