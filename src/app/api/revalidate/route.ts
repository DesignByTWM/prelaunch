import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

/**
 * INSTANT PUBLISH
 *
 * Sanity calls this when a document changes, so a photo Liz publishes
 * appears on the site without waiting for a rebuild.
 *
 * NOT WIRED IN SANITY YET. The endpoint exists and is verified, but no
 * webhook points at it. Creating that webhook in the Sanity project is a
 * separate step.
 *
 * The signature is checked with parseBody against SANITY_REVALIDATE_SECRET.
 * That secret is what stops anyone from forcing revalidation by posting to
 * this URL, so a missing secret is treated as a server error rather than
 * being waved through.
 */

interface WebhookPayload {
  _type?: string;
  slug?: string;
  _id?: string;
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
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid signature." },
        { status: 401 },
      );
    }

    if (body?._type !== "servicePhotos") {
      return NextResponse.json({
        revalidated: false,
        message: `Ignored document type ${body?._type ?? "unknown"}.`,
      });
    }

    /* The document id is servicePhotos-{slug}, so the slug comes from
       either the projected field or the id itself. */
    const slug = body.slug ?? body._id?.replace(/^servicePhotos-/, "");

    if (!slug) {
      return NextResponse.json(
        { revalidated: false, message: "No service slug on the payload." },
        { status: 400 },
      );
    }

    /* The service page itself, plus the two pages that show a service's
       overview image: the services index and the home page services grid. */
    const paths = [`/services/${slug}`, "/services", "/"];
    paths.forEach((path) => revalidatePath(path));

    return NextResponse.json({ revalidated: true, slug, paths });
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
