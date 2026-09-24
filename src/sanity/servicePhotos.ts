import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { imageUrl } from "./image";
import { servicePhotosId, type SlotSpec } from "./slots";

/**
 * SERVICE PHOTOS, READ SIDE
 *
 * Fetches one service's photo document at build time and resolves each
 * slot against it.
 *
 * Resolution order per slot, which is the whole point of the design:
 *   1. the Sanity image, if Liz has published one
 *   2. the local file already in /public, by naming convention
 *   3. nothing, which leaves the existing striped placeholder in place
 *
 * The fetch is wrapped so that an unreachable Sanity, a missing project id
 * or a malformed response all return null. A build must never fail because
 * the CMS is down. It just falls back to the files in /public, which is how
 * the site rendered before Sanity existed.
 */

export interface SlotValue {
  image?: SanityImageSource & { asset?: { _ref?: string } };
  alt?: string;
  label?: string;
}

export type ServicePhotosDoc = Record<string, SlotValue | string | undefined>;

export async function getServicePhotos(
  slug: string,
): Promise<ServicePhotosDoc | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<ServicePhotosDoc | null>(
      `*[_id == $id][0]`,
      { id: servicePhotosId(slug) },
      /**
       * Production caches for an hour, and the webhook will revalidate on
       * publish once it is wired.
       *
       * Development does not cache at all. The hour long entry is written
       * into .next/cache by a build, and next dev reads the same cache, so
       * a photo published after a build would not appear on a refresh for
       * up to an hour. That made a working setup look broken. Production
       * caching is untouched.
       */
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 3600 } },
    );
  } catch {
    /* Sanity unreachable or misconfigured. Fall back to /public. */
    return null;
  }
}

export interface ResolvedSlot {
  src: string;
  alt: string;
  label: string;
}

/**
 * Resolves one slot.
 *
 * `fallbackSrc` is the local path by naming convention. It is returned
 * unchanged when there is no Sanity image, so an empty slot behaves
 * exactly as it did before.
 *
 * Alt follows the image: Sanity alt only when the Sanity image is the one
 * being used, otherwise the alt already in code. Label is independent,
 * because Liz can reword a card without replacing its photo.
 */
export function resolveSlot(
  doc: ServicePhotosDoc | null,
  slot: SlotSpec,
  fallbackSrc: string,
  fallbackAlt: string,
  fallbackLabel = "",
): ResolvedSlot {
  const value = doc?.[slot.field];
  const entry = typeof value === "object" && value !== null ? (value as SlotValue) : undefined;

  const label = entry?.label?.trim() ? entry.label.trim() : fallbackLabel;

  const hasImage = Boolean(entry?.image?.asset?._ref);
  const url = hasImage && entry?.image ? imageUrl(entry.image, slot.width, slot.height) : null;

  if (!url) {
    return { src: fallbackSrc, alt: fallbackAlt, label };
  }

  return {
    src: url,
    alt: entry?.alt?.trim() ? entry.alt.trim() : fallbackAlt,
    label,
  };
}
