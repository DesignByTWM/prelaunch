import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, isConfigured, projectId } from "./env";

/**
 * IMAGE URLS
 *
 * Every image Liz uploads is served straight from the Sanity CDN, built
 * through @sanity/image-url so her crop and hotspot are honoured. Without
 * the builder the raw asset URL is served and her framing is lost.
 *
 * WHY THESE ARE NOT SOFT ANY MORE, September 29 2026
 * They were requested at exactly the desktop size of each frame, once, at
 * the CDN's default quality. That failed three ways at the same time:
 *   - a 2x screen stretched every pixel across four
 *   - most frames are drawn larger on a tablet than on a desktop, so even
 *     a 1x screen stretched them
 *   - the default quality, encoded to AVIF, was aggressive for photography
 * The fix is a real srcset up to twice the widest the frame is ever drawn,
 * at quality 90, and never beyond the pixels Liz actually uploaded.
 *
 * These are plain img tags, not next/image, so Next.js never re-encodes a
 * photo the Sanity CDN has already encoded. One compression, not two.
 */

const builder = isConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Quality for every photo served from Sanity. */
const QUALITY = 90;

/**
 * Widths offered to the browser. It picks the smallest one that covers the
 * frame at the screen's pixel density, using the sizes attribute.
 */
const LADDER = [320, 480, 640, 800, 960, 1200, 1440, 1640, 1920, 2320, 2560];

type ImageWithAsset = {
  asset?: { _ref?: string; _id?: string };
  crop?: { top?: number; bottom?: number; left?: number; right?: number };
};

/**
 * How wide, in real pixels, the finished photo can be without inventing
 * any.
 *
 * Sanity writes the upload's dimensions into the asset id itself, as
 * image-{hash}-{width}x{height}-{ext}. Liz's crop then trims that. The
 * frame's shape is cut from what is left, positioned by her hotspot, so the
 * usable width is whichever runs out first: the cropped width, or the
 * cropped height stretched to the frame's shape.
 *
 * Null when the dimensions cannot be read, in which case the caller falls
 * back to a single, modest size rather than guessing.
 */
function sourceWidthFor(source: SanityImageSource, aspectRatio: number): number | null {
  const image = source as ImageWithAsset;
  const id = image?.asset?._ref ?? image?.asset?._id ?? "";
  const match = id.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  const crop = image.crop ?? {};
  const croppedWidth = width * (1 - (crop.left ?? 0) - (crop.right ?? 0));
  const croppedHeight = height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0));

  return Math.floor(Math.min(croppedWidth, croppedHeight * aspectRatio));
}

function build(source: SanityImageSource, width: number, aspectRatio: number): string {
  return builder!
    .image(source)
    .width(width)
    .height(Math.round(width / aspectRatio))
    .fit("crop")
    .quality(QUALITY)
    .auto("format")
    .url();
}

/**
 * One URL at a fixed size. For places that need a single image rather than
 * a responsive one, such as an Open Graph card. Same crop, hotspot and
 * quality as everything else.
 */
export function imageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
): string | null {
  if (!builder) return null;
  try {
    return build(source, width, width / height);
  } catch {
    return null;
  }
}

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  sizes: string;
}

/** Liz's crop box in real pixels, or null when the asset id has no size. */
function croppedBox(source: SanityImageSource): { width: number; height: number } | null {
  const image = source as ImageWithAsset;
  const id = image?.asset?._ref ?? image?.asset?._id ?? "";
  const match = id.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  if (!match) return null;
  const crop = image.crop ?? {};
  return {
    width: Math.floor(Number(match[1]) * (1 - (crop.left ?? 0) - (crop.right ?? 0))),
    height: Math.floor(Number(match[2]) * (1 - (crop.top ?? 0) - (crop.bottom ?? 0))),
  };
}

function buildNatural(source: SanityImageSource, width: number): string {
  /* Width only. With no height the builder keeps Liz's crop box and adds
     no crop of its own, so the photo keeps its real proportions. */
  return builder!.image(source).width(width).quality(QUALITY).auto("format").url();
}

/**
 * One URL at a given width, uncropped. For structured data, where the
 * image should be the photo as Liz framed it rather than a card shape.
 */
export function naturalUrl(source: SanityImageSource, width: number): string | null {
  if (!builder) return null;
  try {
    const box = croppedBox(source);
    return buildNatural(source, box ? Math.min(width, box.width) : width);
  } catch {
    return null;
  }
}

/**
 * For frames with no fixed shape, where the photo fills a box that is tall
 * on a phone and wide on a desktop: the homepage hero and the Houston
 * featured build. The photo is never cropped to one shape. The browser's
 * object-fit fills the box, and the hotspot, through object-position,
 * decides what stays in view.
 */
export function sanityImageNatural(
  source: SanityImageSource,
  frame: { maxWidth: number; fallbackWidth: number; sizes: string },
): ResponsiveImage | null {
  if (!builder) return null;
  try {
    const box = croppedBox(source);
    const top = box ? Math.min(frame.maxWidth * 2, box.width) : frame.fallbackWidth;
    const widths = [...LADDER.filter((w) => w < top), top];
    const srcSet = widths.map((w) => `${buildNatural(source, w)} ${w}w`).join(", ");
    return {
      src: buildNatural(source, Math.min(frame.fallbackWidth, top)),
      srcSet,
      sizes: frame.sizes,
    };
  } catch {
    return null;
  }
}

/**
 * The hotspot as a CSS object-position, relative to Liz's crop box rather
 * than to the whole upload, because the crop box is what is served.
 * Undefined when there is no hotspot, which leaves the browser's default,
 * the centre.
 */
export function hotspotPosition(source: SanityImageSource): string | undefined {
  const image = source as ImageWithAsset & { hotspot?: { x?: number; y?: number } };
  const hotspot = image?.hotspot;
  if (hotspot?.x === undefined || hotspot?.y === undefined) return undefined;
  const crop = image.crop ?? {};
  const left = crop.left ?? 0;
  const top = crop.top ?? 0;
  const spanX = 1 - left - (crop.right ?? 0);
  const spanY = 1 - top - (crop.bottom ?? 0);
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const x = clamp(spanX > 0 ? (hotspot.x - left) / spanX : 0.5);
  const y = clamp(spanY > 0 ? (hotspot.y - top) / spanY : 0.5);
  return `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`;
}

/**
 * The responsive image for one frame: a src for anything that ignores
 * srcset, a srcset from small up to twice the widest the frame is drawn,
 * and the sizes the browser uses to choose between them.
 *
 * Every candidate is cut to the same shape, so Liz's crop and hotspot hold
 * at every width. The top candidate never asks for more pixels than her
 * upload has, because the CDN would happily upscale and serve a larger file
 * that looks no better.
 *
 * Shared on purpose. The service photo slots use it now, and the journal,
 * builds and homepage will use the same thing when they move to Sanity.
 */
export function sanityImageSet(
  source: SanityImageSource,
  frame: {
    aspectRatio: number;
    /** Widest the frame is drawn, in CSS pixels. */
    maxWidth: number;
    /** Width to use for the plain src, usually the desktop frame width. */
    fallbackWidth: number;
    sizes: string;
  },
): ResponsiveImage | null {
  if (!builder) return null;

  try {
    const available = sourceWidthFor(source, frame.aspectRatio);
    const wanted = frame.maxWidth * 2;

    /* Dimensions unknown: one safe size, no srcset guesswork. */
    if (available === null) {
      const url = build(source, frame.fallbackWidth, frame.aspectRatio);
      return { src: url, srcSet: `${url} ${frame.fallbackWidth}w`, sizes: frame.sizes };
    }

    const top = Math.min(wanted, available);
    const widths = [...LADDER.filter((w) => w < top), top];

    const srcSet = widths
      .map((w) => `${build(source, w, frame.aspectRatio)} ${w}w`)
      .join(", ");

    const src = build(source, Math.min(frame.fallbackWidth, top), frame.aspectRatio);

    return { src, srcSet, sizes: frame.sizes };
  } catch {
    return null;
  }
}
