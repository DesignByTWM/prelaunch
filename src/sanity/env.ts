/**
 * SANITY ENVIRONMENT
 *
 * Read from NEXT_PUBLIC_ variables so both the Studio and the server side
 * read client can use them.
 *
 * Deliberately no write token here. The write token is used by the seed
 * script only, which reads it from the environment directly, so it can
 * never be bundled into anything the browser receives.
 *
 * These fall back to empty strings rather than throwing. A build with no
 * Sanity configuration must still succeed, falling back to the local files
 * in /public, which is what keeps the site independent of the CMS.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

/** Pinned. A floating date would change query behaviour without a deploy. */
export const apiVersion = "2026-09-24";

/** True only when there is enough configuration to attempt a fetch. */
export const isConfigured = Boolean(projectId && dataset);
