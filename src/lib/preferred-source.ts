/**
 * PREFERRED SOURCE  ·  GOOGLE
 *
 * One shared loader for Google's "Add as preferred source" flow, used by
 * every trigger on the page (the footer G and the end of content button).
 *
 * Source of truth:
 * https://developers.google.com/search/docs/appearance/preferred-sources
 * Advanced JavaScript implementation, standard script callback queue.
 *
 * Google's publisher script is deliberately NOT in the page head. Loaded
 * sitewide it opens a Google frame that sets a third party cookie on
 * every page. It is injected here instead, once, in manual control mode,
 * and only when both of these are true:
 *
 *   1. the visitor has really interacted (scroll, tap, key press), and
 *   2. a trigger is within about 300px of the viewport.
 *
 * Hovering or focusing a trigger loads it too, as a backup.
 *
 * Every trigger is a real link to the deeplink below. If the script is
 * ready the click starts Google's flow in its own window. If it is
 * blocked or not ready the link simply opens.
 */

export const PREFERRED_SOURCE_HREF =
  "https://www.google.com/preferences/source?q=designbytwm.com";

const SCRIPT_SRC = "https://news.google.com/swg/js/v1/publisher.js";
const NEAR_MARGIN = "300px";
const INTERACTIONS = ["scroll", "wheel", "pointerdown", "touchstart", "keydown"] as const;

interface PreferredSourceApi {
  init(options: { theme?: "light" | "dark"; lang?: string }): void;
  addPreferredSource(): void;
}

type PreferredSourceCallback = (preferredSource: PreferredSourceApi) => void;

/** A plain array before Google's script runs, Google's own queue after. */
interface PreferredSourceQueue {
  push(callback: PreferredSourceCallback): unknown;
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: PreferredSourceQueue;
  }
}

let api: PreferredSourceApi | null = null;
let requested = false;
let interacted = false;
let listening = false;
let observer: IntersectionObserver | null = null;
const near = new Set<Element>();

/** Injects Google's script. Safe to call any number of times. */
export function loadPreferredSource(): void {
  if (requested || typeof window === "undefined") return;
  requested = true;

  observer?.disconnect();
  observer = null;
  near.clear();

  const fresh: PreferredSourceCallback[] = [];
  const queue: PreferredSourceQueue = window.PREFERRED_SOURCE ?? fresh;
  window.PREFERRED_SOURCE = queue;

  // One initialization for every trigger. Google's theme is set once.
  queue.push((preferredSource) => {
    preferredSource.init({ theme: "light" });
    api = preferredSource;
  });

  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.setAttribute("preferred-sources-control", "manual");
  document.head.appendChild(script);
}

function maybeLoad(): void {
  if (interacted && near.size > 0) loadPreferredSource();
}

function onInteract(): void {
  interacted = true;
  for (const type of INTERACTIONS) window.removeEventListener(type, onInteract);
  maybeLoad();
}

/**
 * Registers a trigger element. Returns the cleanup for the effect that
 * called it.
 */
export function watchTrigger(element: Element): () => void {
  if (requested || typeof window === "undefined") return () => {};

  if (!listening) {
    listening = true;
    for (const type of INTERACTIONS) {
      window.addEventListener(type, onInteract, { passive: true });
    }
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) near.add(entry.target);
          else near.delete(entry.target);
        }
        maybeLoad();
      },
      { rootMargin: NEAR_MARGIN },
    );
  }

  observer.observe(element);

  return () => {
    observer?.unobserve(element);
    near.delete(element);
  };
}

/**
 * Starts Google's flow. Returns false when the script is blocked or not
 * ready, so the caller lets the link open normally.
 */
export function startPreferredSource(): boolean {
  if (!api) return false;
  try {
    api.addPreferredSource();
    return true;
  } catch {
    return false;
  }
}
