"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * ReviewsRow
 *
 * The row of review cards, plus the quiet next arrow the mobile swipe row
 * shows at its right edge. The cards themselves are server rendered and
 * passed in as children; this only owns the row element and the arrow.
 *
 * The arrow is CSS hidden above the mobile breakpoint, where the row does
 * not scroll. On mobile it is shown on load, fades once the last card is
 * fully in view, and returns if the row is scrolled back. Tapping it moves
 * the row to the next card, smoothly unless reduced motion is set.
 */
export function ReviewsRow({ children }: { children: ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    /* A pixel of slack for subpixel scroll positions. */
    const update = () => setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const next = () => {
    const el = row.current;
    if (!el) return;
    const inset = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const target = Array.from(el.children as HTMLCollectionOf<HTMLElement>)
      .map((card) => card.offsetLeft - inset)
      .find((left) => left > el.scrollLeft + 4);
    if (target === undefined) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="rev-row">
      {/* Scrolls sideways on mobile, so it is a named, focusable region
          that a keyboard can reach and scroll. */}
      <div ref={row} className="rev-grid" role="region" aria-label="Client reviews" tabIndex={0}>
        {children}
      </div>
      <button
        type="button"
        className={`rev-next${atEnd ? " is-end" : ""}`}
        aria-label="Next review"
        onClick={next}
      >
        <span className="rev-next-disc" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
            <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
