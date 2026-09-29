import { site } from "@/lib/site";

/**
 * INDEXNOW
 *
 * Tells Bing, Yandex and the other IndexNow engines that a page exists, so
 * a new article or build is crawled within hours rather than whenever they
 * next happen to visit.
 *
 * Called only from the publish webhook, only for a brand new article or
 * build, and only after its pages have been revalidated, so the URL
 * already serves the new content when the engines fetch it. Edits and
 * republishes never ping: resubmitting unchanged URLs is treated as noise.
 *
 * PRODUCTION ONLY. Anywhere else it logs that it skipped and returns. A
 * preview deployment must never announce preview URLs to a search engine.
 *
 * NEVER THROWS. A slow or failing IndexNow endpoint must not fail the
 * webhook, so it gives up after five seconds and reports what happened.
 *
 * The key is the one already served at /{key}.txt from public/, where the
 * engines verify it. INDEXNOW_KEY overrides it if that file is ever changed.
 */

const ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_KEY = "1f4a9c7e63b84d2ab5e0c8d71a3f6b92";
const TIMEOUT_MS = 5000;

export interface IndexNowResult {
  submitted: boolean;
  status?: number;
  reason?: string;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (!site.isProduction) {
    console.log(
      `IndexNow skipped: not production (${site.url}). Would have submitted ${urls.length} URLs: ${urls.join(", ")}`,
    );
    return { submitted: false, reason: "not production" };
  }

  const key = process.env.INDEXNOW_KEY?.trim() || DEFAULT_KEY;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(site.url).host,
        key,
        keyLocation: `${site.url}/${key}.txt`,
        urlList: urls,
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URLs.`);
    /* 200 and 202 both mean accepted. */
    return { submitted: res.ok, status: res.status };
  } catch (error) {
    const reason = controller.signal.aborted
      ? `timed out after ${TIMEOUT_MS / 1000}s`
      : error instanceof Error
        ? error.message
        : "unknown error";
    console.error(`IndexNow failed: ${reason}`);
    return { submitted: false, reason };
  } finally {
    clearTimeout(timer);
  }
}
