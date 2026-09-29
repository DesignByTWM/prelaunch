import { createClient } from "next-sanity";
import { apiVersion, dataset, isConfigured, projectId } from "./env";

/**
 * SANITY READ CLIENT
 *
 * Server side only, and read only. There is no token on this client by
 * design, so it can only ever see published content in a public dataset.
 * The write token lives in the seed script and nowhere else.
 *
 * `perspective: "published"` means a draft Liz is still working on never
 * reaches the site. She has to publish for a photo to go live.
 *
 * Null when the project is not configured, so callers fall back to the
 * files in /public rather than throwing during a build.
 */
export const sanityClient = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      /* Off everywhere. The API CDN is a cache of its own, and when the
         publish webhook triggers a revalidation the page can regenerate
         from the CDN before it holds the new version, baking a stale photo
         back in. These requests only happen at build or revalidation time,
         never per visitor, so going straight to the API costs nothing a
         visitor would notice. Photos themselves still come from the image
         CDN, which is separate. */
      useCdn: false,
      perspective: "published",
    })
  : null;
