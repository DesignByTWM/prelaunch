"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  PREFERRED_SOURCE_HREF,
  loadPreferredSource,
  startPreferredSource,
  watchTrigger,
} from "@/lib/preferred-source";

/**
 * PreferredSourceTrigger
 *
 * A real link to Google's preferred source page for designbytwm.com. It
 * is part of the page's own HTML, so nothing shifts when Google's script
 * arrives. The loading rules live in lib/preferred-source.ts.
 *
 * Click sends preferred_source_click through the GA4 setup the site
 * already uses, the same way ReviewLink sends review_click.
 */
export function PreferredSourceTrigger({
  placement,
  className,
  label,
  children,
}: {
  placement: "footer" | "post_end";
  className?: string;
  /** Accessible name, for triggers with no visible text. */
  label?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return watchTrigger(element);
  }, []);

  return (
    <a
      ref={ref}
      className={className}
      href={PREFERRED_SOURCE_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-preferred-source={placement}
      onPointerEnter={() => loadPreferredSource()}
      onFocus={() => loadPreferredSource()}
      onClick={(event) => {
        try {
          sendGAEvent("event", "preferred_source_click", {
            placement,
            page_path: window.location.pathname,
          });
        } catch {
          // Analytics must never block the link.
        }
        // A modified click is the visitor asking for a new tab. Let it be.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (startPreferredSource()) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

/**
 * End of content button, for journal articles and featured builds.
 * The site's outlined button with Google's four color G, the unmodified
 * file in /public. The button stands alone, with no sentence beside it.
 */
export function PreferredSourceButton() {
  return (
    <PreferredSourceTrigger placement="post_end" className="btn btn-line pref-btn">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/google-g.svg" alt="" width={18} height={18} />
      Add as Preferred Source
    </PreferredSourceTrigger>
  );
}
