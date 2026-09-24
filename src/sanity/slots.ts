/**
 * PHOTO SLOTS
 *
 * The nine photo slots on a service page, in the order they appear.
 *
 * One list, used by the Studio schema, the seed script and the service
 * page itself, so a slot cannot exist in one place and not another.
 *
 * `suffix` is the naming convention already used in /public. The overview
 * slot is {prefix}-overview.webp, coverage is {prefix}-cov-1.webp through
 * -cov-4, reference is {prefix}-ref-1.webp through -ref-4.
 *
 * `width` and `height` are the rendered sizes measured from globals.css at
 * the 1240px wrap, which is the largest the frames ever get. They are what
 * the Sanity image URLs are built against, so Liz's crop and hotspot are
 * applied to the exact box the photo lands in.
 *
 *   overview    .svc-overview .ph, aspect-ratio 4/3, half of the 1160px
 *               content width less the 64px gap
 *   coverage    .cov .ph.r45, aspect-ratio 4/5, one of four columns in
 *               .cov-grid with 20px gaps
 *   reference   .recent .ph.fill, the mosaic in .recent-grid, which is
 *               1.4fr 1fr over rows of 205px, 205px and 240px with an
 *               18px gap. The four frames are deliberately different
 *               sizes, so each carries its own.
 */

export interface SlotSpec {
  /** Field name on the servicePhotos document. */
  field: string;
  /** Filename suffix under /public, without the extension. */
  suffix: string;
  /** Rendered width in CSS pixels at the widest layout. */
  width: number;
  /** Rendered height in CSS pixels at the widest layout. */
  height: number;
  /**
   * Shape of the frame, used for the hotspot preview in the Studio so Liz
   * crops against the real proportions.
   *
   * The overview and coverage frames take theirs from the aspect-ratio in
   * globals.css, which is exact. The four reference frames have no CSS
   * ratio, they fill a grid cell, so theirs is the cell's width over its
   * height.
   */
  aspectRatio: number;
  /** Whether this frame shows a text label on the page. */
  label: boolean;
}

export const OVERVIEW_SLOT: SlotSpec = {
  field: "overview",
  suffix: "overview",
  width: 548,
  height: 411,
  /* .svc-overview .ph, aspect-ratio 4/3 */
  aspectRatio: 4 / 3,
  label: false,
};

export const COVERAGE_SLOTS: SlotSpec[] = [1, 2, 3, 4].map((n) => ({
  field: `coverage${n}`,
  suffix: `cov-${n}`,
  width: 275,
  height: 344,
  /* .ph.r45, aspect-ratio 4/5 */
  aspectRatio: 4 / 5,
  label: true,
}));

export const REFERENCE_SLOTS: SlotSpec[] = [
  { field: "reference1", suffix: "ref-1", width: 666, height: 428, aspectRatio: 666 / 428, label: true },
  { field: "reference2", suffix: "ref-2", width: 476, height: 205, aspectRatio: 476 / 205, label: true },
  { field: "reference3", suffix: "ref-3", width: 476, height: 205, aspectRatio: 476 / 205, label: true },
  { field: "reference4", suffix: "ref-4", width: 1160, height: 240, aspectRatio: 1160 / 240, label: true },
];

/** All nine, in page order. */
export const ALL_SLOTS: SlotSpec[] = [
  OVERVIEW_SLOT,
  ...COVERAGE_SLOTS,
  ...REFERENCE_SLOTS,
];

/**
 * The document id for a service, one per service, fixed.
 *
 * A HYPHEN, NOT A DOT, AND THIS MATTERS.
 *
 * Sanity treats a dot in a document id as a path separator, and a public
 * dataset's default read grant is `_id in path("*")`, which matches one
 * segment only. That is what keeps drafts, whose ids start `drafts.`,
 * private. An id like servicePhotos.suspension is two segments, so it falls
 * outside that grant and a client with no token cannot read it, even though
 * the document is published in a public dataset.
 *
 * The site's read client deliberately has no token, so a dotted id made
 * every document invisible to it and every slot silently fell back to the
 * file in /public. Keeping this id flat is what makes the photos readable.
 */
export const servicePhotosId = (slug: string) => `servicePhotos-${slug}`;
