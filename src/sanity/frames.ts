/**
 * IMAGE FRAMES
 *
 * Every place outside the service page slots where a Sanity photo can
 * appear, with the shape and size it is drawn at. Measured from the grid
 * rules in globals.css and location.css, where the page padding is
 * clamp(20px, 5vw, 40px) inside a 1240px wrap.
 *
 * `maxWidth` is the widest the frame is ever drawn in CSS pixels, across
 * every breakpoint. Several are widest on a tablet or a phone, not on a
 * desktop, because the grids drop columns before the frames shrink. The
 * srcset tops out at twice this for 2x screens.
 *
 * `fallbackWidth` is the plain src, the desktop width.
 *
 * These only matter once Liz uploads a photo. Until then every frame shows
 * its current file exactly as before, with no srcset at all.
 */

export interface Frame {
  aspectRatio: number;
  maxWidth: number;
  fallbackWidth: number;
  sizes: string;
}

export const FRAMES = {
  /* Homepage and /services discipline cards, .svc-grid .ph.r45.
     Widest as one column at 540px. */
  serviceCard: {
    aspectRatio: 4 / 5,
    maxWidth: 486,
    fallbackWidth: 216,
    sizes: "(max-width: 540px) 92vw, (max-width: 960px) 46vw, (max-width: 1200px) 30vw, (max-width: 1240px) 18vw, 216px",
  },
  /* Related band on service pages, .rel 215px tall. About 1.74 to 1 on a
     desktop, one column of up to 460px below 860px. */
  relatedCard: {
    aspectRatio: 1.74,
    maxWidth: 460,
    fallbackWidth: 375,
    sizes: "(max-width: 500px) 92vw, (max-width: 860px) 460px, (max-width: 1240px) 30vw, 375px",
  },
  /* Houston discipline carousel, .lp-card-img. Width clamp(260px, 26vw,
     400px), 78vw at 900px and below. */
  houstonCard: {
    aspectRatio: 4 / 5,
    maxWidth: 702,
    fallbackWidth: 400,
    sizes: "(max-width: 900px) 78vw, (max-width: 1538px) 26vw, 400px",
  },
  /* Journal lead article, .featured-article .ph.r1610. One column at 900px
     and below. */
  articleFeatured: {
    aspectRatio: 16 / 10,
    maxWidth: 820,
    fallbackWidth: 585,
    sizes: "(max-width: 900px) 92vw, (max-width: 1240px) 48vw, 585px",
  },
  /* Journal grid cards, .journal-grid .ph.r45. Two columns to 1000px, one
     column capped at 380px below 540px. */
  articleCard: {
    aspectRatio: 4 / 5,
    maxWidth: 450,
    fallbackWidth: 275,
    sizes: "(max-width: 420px) 92vw, (max-width: 540px) 380px, (max-width: 1000px) 46vw, (max-width: 1240px) 22vw, 275px",
  },
  /* Homepage featured builds, .builds .ph.r169. One column capped at 540px
     below 860px. */
  buildHome: {
    aspectRatio: 16 / 9,
    maxWidth: 540,
    fallbackWidth: 369,
    sizes: "(max-width: 600px) 92vw, (max-width: 860px) 540px, (max-width: 1240px) 30vw, 369px",
  },
  /* Featured Builds finder cards, .builds-grid .ph.r45. One column capped at
     400px below 560px. */
  buildFinder: {
    aspectRatio: 4 / 5,
    maxWidth: 400,
    fallbackWidth: 371,
    sizes: "(max-width: 440px) 92vw, (max-width: 560px) 400px, (max-width: 860px) 46vw, (max-width: 1240px) 30vw, 371px",
  },
  /* Build page gallery, .build-gallery .ph.r45. One column at 700px and
     below. */
  buildGallery: {
    aspectRatio: 4 / 5,
    maxWidth: 630,
    fallbackWidth: 568,
    sizes: "(max-width: 700px) 92vw, (max-width: 1240px) 46vw, 568px",
  },
  /* Location page featured build card, .lp-feat-card. 4:3, sits in the
     wider column of a two column grid inside the 1240px wrap, full width
     of the wrap at 900px and below. Measured: 641px at most on desktop,
     the 7fr column at a 1240px viewport, and 820px at 900px, where it
     runs the full width of the wrap, so that is its widest. */
  locationFeature: {
    aspectRatio: 4 / 3,
    maxWidth: 820,
    fallbackWidth: 641,
    sizes: "(max-width: 900px) 92vw, (max-width: 1240px) calc(55.4vw - 47px), 641px",
  },
  /* "Other builds" on a build page, .index-grid .ph.r169. */
  buildOther: {
    aspectRatio: 16 / 9,
    maxWidth: 540,
    fallbackWidth: 371,
    sizes: "(max-width: 600px) 92vw, (max-width: 960px) 46vw, (max-width: 1240px) 30vw, 371px",
  },
} satisfies Record<string, Frame>;

/**
 * Frames with no fixed shape. The photo fills the whole screen width at any
 * height, so it is served uncropped and positioned by the hotspot.
 */
export const NATURAL = {
  homeHero: { maxWidth: 1920, fallbackWidth: 1920, sizes: "100vw" },
  houstonFeature: { maxWidth: 1920, fallbackWidth: 1920, sizes: "100vw" },
};
