import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, isConfigured, projectId } from "./env";

/**
 * IMAGE URLS
 *
 * Built through @sanity/image-url so the crop and hotspot Liz sets in the
 * Studio are honoured. Without the builder the raw asset URL is served and
 * her framing is lost.
 *
 * Every slot passes its own rendered width and height, measured from
 * globals.css, with fit crop and automatic format. That means the CDN does
 * the cropping to the exact box the photo lands in, and serves webp or avif
 * where the browser supports it.
 */

const builder = isConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
): string | null {
  if (!builder) return null;
  try {
    return builder
      .image(source)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}
