/**
 * PHOTO SLOT MANIFEST
 *
 * The single source of truth for every image the site renders, its exact
 * crop ratio and its export width. Both photo scripts read this, so the
 * contact sheet, the mapping file and the processor can never disagree
 * about what exists.
 *
 * Ratios and widths come from the real CSS grid values, measured rather
 * than estimated. See IMAGE_PREP_LIST.md for how each was derived.
 *
 * Widths are already 2x for retina. Do not double them again.
 *
 * `folder` is the Dropbox folder the photo should come from. It is a hint
 * for the contact sheet, not a rule. Anything can go anywhere.
 */

/** @typedef {{ file: string, ratio: number, width: number, folder: string, note: string, phase: 1|2|3 }} Slot */

const SERVICE_PREFIXES = [
  { prefix: "blackout", folder: "04 — Blackout & Chrome Delete", label: "Blackout Packages" },
  { prefix: "ppf", folder: "02 — Paint Protection Film PPF", label: "Paint Protection Film" },
  { prefix: "wraps", folder: "01 — Vehicle Wraps", label: "Vehicle Wraps" },
  { prefix: "wheels", folder: "05 — Wheels & Tires", label: "Wheels & Fitment" },
  { prefix: "interior", folder: "03 — Custom Interiors", label: "Interior Transformation" },
  { prefix: "suspension", folder: "08 — Suspension", label: "Suspension" },
  { prefix: "paintbody", folder: "06 — Paint & Body", label: "Paint & Body" },
  { prefix: "lighting", folder: "NO FOLDER SUPPLIED", label: "Lighting" },
  { prefix: "audio", folder: "07 — Audio", label: "Audio" },
  { prefix: "truck", folder: "09 — Truck Accessories", label: "Truck Accessories" },
];

/**
 * PHASE 1 — 21 files, live the moment they land.
 *
 * Ordered the way a visitor meets them: down the homepage first, then the
 * services index. Not grouped by image type, because you are filling this
 * in while looking at the site.
 *
 * Homepage runs: hero, five discipline cards, materials, featured builds,
 * wheels. The services index then adds the other five discipline cards.
 */
const phase1 = [
  /* --- HOMEPAGE, top to bottom --- */
  { file: "hero.webp", ratio: 16 / 9, width: 2400, folder: "10 — Multi-Service Builds", page: "Home 1. Hero", note: "The one that matters most. Headline sits bottom left over a dark scrim, so keep the left third quiet." },

  { file: "svc-blackout.webp", ratio: 4 / 5, width: 760, folder: "04 — Blackout & Chrome Delete", page: "Home 2. Disciplines, card 1", note: "Also used on the services index and as a Related card." },
  { file: "svc-ppf.webp", ratio: 4 / 5, width: 760, folder: "02 — Paint Protection Film PPF", page: "Home 2. Disciplines, card 2", note: "Also used on the services index and as a Related card." },
  { file: "svc-wraps.webp", ratio: 4 / 5, width: 760, folder: "01 — Vehicle Wraps", page: "Home 2. Disciplines, card 3", note: "Also used on the services index and as a Related card." },
  { file: "svc-wheels.webp", ratio: 4 / 5, width: 760, folder: "05 — Wheels & Tires", page: "Home 2. Disciplines, card 4", note: "Also used on the services index and as a Related card." },
  { file: "svc-interior.webp", ratio: 4 / 5, width: 760, folder: "03 — Custom Interiors", page: "Home 2. Disciplines, card 5", note: "Also used on the services index and as a Related card." },

  { file: "mat-metal.webp", ratio: 1, width: 760, folder: "06 — Paint & Body", page: "Home 3. Materials, frame 1", note: "Close detail, not a whole car. Hand-finished panel." },
  { file: "mat-stitch.webp", ratio: 1, width: 760, folder: "03 — Custom Interiors", page: "Home 3. Materials, frame 2", note: "Close detail. Leather stitching." },
  { file: "mat-fitment.webp", ratio: 1, width: 760, folder: "05 — Wheels & Tires", page: "Home 3. Materials, frame 3", note: "Close detail. Wheel and brake." },

  { file: "build-suv.webp", ratio: 16 / 9, width: 760, folder: "Featured Builds", page: "Home 4. Featured builds, card 1", note: "G-Class. Whole vehicle, environmental." },
  { file: "build-sedan.webp", ratio: 16 / 9, width: 760, folder: "Featured Builds", page: "Home 4. Featured builds, card 2", note: "M5. Whole vehicle, environmental." },
  { file: "build-truck.webp", ratio: 16 / 9, width: 760, folder: "Featured Builds", page: "Home 4. Featured builds, card 3", note: "F-150. Whole vehicle, environmental." },

  { file: "wheel-1.webp", ratio: 1, width: 560, folder: "05 — Wheels & Tires", page: "Home 5. Shop wheels, card 1", note: "Sits on a white frame, so a clean or plain background reads best." },
  { file: "wheel-2.webp", ratio: 1, width: 560, folder: "05 — Wheels & Tires", page: "Home 5. Shop wheels, card 2", note: "White frame, plain background." },
  { file: "wheel-3.webp", ratio: 1, width: 560, folder: "05 — Wheels & Tires", page: "Home 5. Shop wheels, card 3", note: "White frame, plain background." },
  { file: "wheel-4.webp", ratio: 1, width: 560, folder: "05 — Wheels & Tires", page: "Home 5. Shop wheels, card 4", note: "White frame, plain background." },

  /* --- SERVICES INDEX, the five that are not on the homepage --- */
  { file: "svc-suspension.webp", ratio: 4 / 5, width: 760, folder: "08 — Suspension", page: "Services index, card 6", note: "MISSING TODAY. This card is a broken link until the file lands." },
  { file: "svc-paint-body.webp", ratio: 4 / 5, width: 760, folder: "06 — Paint & Body", page: "Services index, card 7", note: "MISSING TODAY. This card is a broken link until the file lands." },
  { file: "svc-lighting.webp", ratio: 4 / 5, width: 760, folder: "NO FOLDER SUPPLIED", page: "Services index, card 8", note: "MISSING TODAY, and Liz sent no lighting photography at all." },
  { file: "svc-audio.webp", ratio: 4 / 5, width: 760, folder: "07 — Audio", page: "Services index, card 9", note: "MISSING TODAY. This card is a broken link until the file lands." },
  { file: "svc-truck-accessories.webp", ratio: 4 / 5, width: 760, folder: "09 — Truck Accessories", page: "Services index, card 10", note: "MISSING TODAY. This card is a broken link until the file lands." },
].map((s) => ({ ...s, phase: 1 }));

/**
 * PHASE 2 — 90 files, nine per service page.
 * Wired by naming convention on August 31 2026, so these fill themselves
 * the moment a correctly named file lands in /public.
 */
const phase2 = SERVICE_PREFIXES.flatMap(({ prefix, folder, label }) => [
  { file: `${prefix}-overview.webp`, ratio: 4 / 3, width: 1100, folder, phase: 2, page: `${label} 1. Overview frame`, note: "One strong wide shot of the work being performed." },
  { file: `${prefix}-cov-1.webp`, ratio: 4 / 5, width: 560, folder, phase: 2, page: `${label} 2. Coverage card 1`, note: "" },
  { file: `${prefix}-cov-2.webp`, ratio: 4 / 5, width: 560, folder, phase: 2, page: `${label} 2. Coverage card 2`, note: "" },
  { file: `${prefix}-cov-3.webp`, ratio: 4 / 5, width: 560, folder, phase: 2, page: `${label} 2. Coverage card 3`, note: "" },
  { file: `${prefix}-cov-4.webp`, ratio: 4 / 5, width: 560, folder, phase: 2, page: `${label} 2. Coverage card 4`, note: "" },
  { file: `${prefix}-ref-1.webp`, ratio: 666 / 428, width: 1340, folder, phase: 2, page: `${label} 3. Reference, large left`, note: "The biggest frame in the mosaic." },
  { file: `${prefix}-ref-2.webp`, ratio: 476 / 205, width: 960, folder, phase: 2, page: `${label} 3. Reference, small upper right`, note: "Wide crop, roughly 2.3 to 1." },
  { file: `${prefix}-ref-3.webp`, ratio: 476 / 205, width: 960, folder, phase: 2, page: `${label} 3. Reference, small lower right`, note: "Wide crop, roughly 2.3 to 1." },
  { file: `${prefix}-ref-4.webp`, ratio: 1160 / 240, width: 2320, folder, phase: 2, page: `${label} 3. Reference, full width band`, note: "Very wide letterbox. A detail crop works, a whole car does not." },
]);

export const SLOTS = [...phase1, ...phase2];

export const SOURCE_DIR =
  "C:\\Users\\Jose Perdomo III\\Desktop\\2026-06-26 - Design By TWM\\PHOTOS FROM DROPBOX BY LIZ - DBTWM";

export const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?|heic)$/i;
