import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { reviews, trustPoints } from "@/content/reviews";
import { ReviewLink } from "./ReviewLink";
import { ReviewsRow } from "./ReviewsRow";

/* ===== TESTIMONIALS =========================================
   Approved October 8 2026. Replaces Materials of the house in the
   same position and keeps its ground: the off-white .alt section and
   the monogram watermark at 4.5 percent.

   Four white cards with the mirrored 0 34px 0 34px corner, then the
   trust strip. Desktop four across, tablet two by two, mobile one
   swipe row on CSS scroll-snap alone.

   Every word is server rendered from content/reviews.ts, the same
   list the homepage Review structured data is built from.
   ============================================================ */

/** One star, drawn on a 24 unit grid. */
function Star() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.5l2.94 6.07 6.56.9-4.78 4.63 1.16 6.6L12 17.57 6.12 20.7l1.16-6.6L2.5 9.47l6.56-.9z"
      />
    </svg>
  );
}

export function Reviews() {
  return (
    <section className="alt" id="reviews">
      <div className="wrap rev-wrap">
        <Monogram className="rev-watermark" />

        <Reveal className="sec-head">
          <span className="eyebrow">TESTIMONIALS</span>
          <h2 className="display">TRUSTED BY OUR CLIENTS.</h2>
          <p className="lede">In their words, from the builds we&apos;ve delivered.</p>
        </Reveal>

        <ReviewsRow>
          {reviews.map((review, i) => (
            <Reveal
              key={review.url}
              as="figure"
              className="rev-card"
              delay={(i + 1) as 1 | 2 | 3 | 4}
            >
              <span className="rev-stars" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} />
                ))}
              </span>
              <h3 className="rev-title">{review.title}</h3>
              <blockquote className="rev-quote">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="rev-foot">
                <span className="rev-who">
                  <span className="rev-name">{review.name}</span>
                  <span className="rev-label">{review.label}</span>
                </span>
                <ReviewLink name={review.name} url={review.url} />
              </figcaption>
            </Reveal>
          ))}
        </ReviewsRow>

        <Reveal className="rev-trust">
          {trustPoints.map((point) => (
            <div key={point.headline} className="rev-point">
              <div className="rev-point-head display">{point.headline}</div>
              <div className="rev-point-sub">{point.subline}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
