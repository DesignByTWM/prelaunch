"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * ReviewLink
 *
 * The Google G on a review card, linking to that review on Google Maps.
 * The only client part of the Reviews section: it exists to send the
 * review_click event, the same way SubmitLead sends generate_lead.
 *
 * The logo is the unmodified file in /public, decorative here because the
 * link carries the full accessible name.
 */
export function ReviewLink({ name, url }: { name: string; url: string }) {
  return (
    <a
      className="rev-g"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${name}'s review on Google (opens in a new tab)`}
      onClick={() => {
        try {
          sendGAEvent("event", "review_click", { reviewer: name });
        } catch {
          // Analytics must never block the link.
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/google-g.svg" alt="" width={20} height={20} />
    </a>
  );
}
