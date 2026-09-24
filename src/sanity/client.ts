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
      /* The CDN is a cache of its own. Off in development for the same
         reason the fetch is uncached there, so an edit shows on refresh.
         Production keeps it on. */
      useCdn: process.env.NODE_ENV !== "development",
      perspective: "published",
    })
  : null;
