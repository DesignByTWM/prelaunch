/**
 * FEATURED BUILDS
 *
 * ============================================================
 * NINE ENTRIES, THREE DIFFERENT PROVENANCES
 * ============================================================
 * The array below holds nine builds. They did not arrive by the same
 * route and they are not equally trustworthy. Read this before adding,
 * quoting or publishing any of them.
 *
 * 1. FROM LIZ'S DROPBOX FOLDER NAMES, September 1 2026
 *      cadillac-iq-monochromatic
 *      lamborghini-sto-dsb-el-chavez
 *      range-rover-rose-pink-interior
 *    The vehicle names and descriptors came from her folder names and
 *    nothing else. There was no build sheet, no work order and no
 *    caption behind them. Every descriptive field is ours. The
 *    discipline pairings were inferred from the folder names and have
 *    not been confirmed against the work actually performed.
 *
 * 2. FROM LIZ'S FEATURED BUILDS MOCK, August 14 2026, ORIGIN UNCONFIRMED
 *      g-class-complete-transformation
 *      m5-wrap-wheel-package
 *      f150-suspension-overland
 *    Vehicle, title, tags and type are hers, used verbatim. It has
 *    never been confirmed that these are real completed builds rather
 *    than illustrative examples composed for the layout.
 *
 * 3. NOT ACCOUNTED FOR ANYWHERE
 *      corvette-interior-audio
 *      range-rover-sport-ppf-paint
 *      sierra-blackout-lift
 *    No recorded source. These are not in her mock, not in her folder
 *    names and not traceable to any instruction in the project log.
 *
 * WHAT IS OURS ON ALL NINE, AND THEREFORE STILL DRAFT:
 *   brief, stages[].detail, outcome, and on group 1 also summary and
 *   heroAlt.
 *   These describe what each discipline is and why the combination
 *   is planned together. They deliberately contain NO invented client
 *   story, NO invented timeline and NO invented specification, because
 *   we cannot verify what was actually done on these vehicles.
 *
 * `duration` is intentionally absent. Inventing a turnaround figure for
 * a real customer's vehicle is the kind of claim that gets a business in
 * trouble, and Liz has already supplied real timeframes per discipline
 * in services.ts.
 *
 * STILL REQUIRED BEFORE LAUNCH:
 *   - Confirmation of which of these nine are real completed builds
 *   - A decision on the count. Liz has stated six at launch.
 *   - Liz's review of the group 1 copy, which is ours throughout
 *   - A source, or removal, for the three in group 3
 *   - Real photography, promised by Liz on August 14
 *   - Written owner permission where a vehicle is identifiable
 *
 * Tracked in CLIENT_REVIEW_NOTES.md section 29, which supersedes the
 * build provenance parts of sections 8, 17 and 21.
 *
 * Data shape mirrors what Sanity will return, so switching to the
 * CMS is a data source change and not a rewrite.
 * ============================================================
 */

export interface BuildStage {
  discipline: string;
  /** Slug of the service page this stage links to. */
  slug: string;
  detail: string;
}

/** Filter categories from Liz's mock: All, SUV, Sedan, Truck, Coupe. */
export type BuildType = "SUV" | "Sedan" | "Truck" | "Coupe";

export interface FeaturedBuild {
  slug: string;
  title: string;
  vehicle: string;
  type: BuildType;
  /** Short label used on cards. */
  summary: string;
  hero: string;
  heroAlt: string;
  /** Discipline tags shown on the card. Liz's pairings, verbatim. */
  tags: string[];
  brief: string[];
  stages: BuildStage[];
  outcome: string;
  gallery: { src: string; alt: string }[];
  placeholder: boolean;
}

export const featuredBuilds: FeaturedBuild[] = [
  {
    slug: "cadillac-iq-monochromatic",
    title: "Monochromatic",
    vehicle: "Cadillac IQ",
    type: "SUV",
    summary: "One finish carried across every surface of the vehicle.",
    hero: "/mainfeatbuild1cadillac.webp",
    heroAlt: "Cadillac IQ finished in a single monochromatic treatment",
    tags: ["Blackout", "Wheels"],
    brief: [
      "A monochromatic build is the hardest kind to get right, because there is nowhere for a mismatch to hide. Every surface is judged against every other surface.",
      "Trim, badging and wheels were resolved as one decision rather than three, which is only possible when the same team finishes all of them under the same lighting.",
    ],
    stages: [
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Chrome and bright trim brought to a single finish across the vehicle, matched panel to panel rather than piece to piece.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail:
          "Wheel finish selected against the body treatment so the two read as one decision, with fitment measured on the vehicle before ordering.",
      },
    ],
    outcome:
      "A vehicle that reads as one continuous surface rather than a collection of separately finished parts.",
    gallery: [],
    placeholder: true,
  },
  {
    slug: "lamborghini-sto-dsb-el-chavez",
    title: "DSB x El Chavez",
    vehicle: "Lamborghini Huracan STO",
    type: "Coupe",
    summary: "A collaborative design executed in vinyl over a track-focused car.",
    hero: "/mainfeatbuild2lambo.webp",
    heroAlt: "Lamborghini Huracan STO wrapped in a collaborative DSB and El Chavez design",
    tags: ["Wraps"],
    brief: [
      "A collaboration puts a second set of intentions on the vehicle, so the work is as much about translation as installation. The design has to survive contact with the panels it lands on.",
      "Wrapping a car with this much aerodynamic surface means the pattern is planned around the shapes rather than applied over them.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail:
          "Design translated to the panels, printed and installed in house, with placement planned around the car's aerodynamic surfaces rather than laid over them.",
      },
    ],
    outcome:
      "A collaborative design that follows the car's own lines instead of fighting them.",
    gallery: [],
    placeholder: true,
  },
  {
    slug: "range-rover-rose-pink-interior",
    title: "Rose Pink Interior",
    vehicle: "Range Rover",
    type: "SUV",
    summary: "A full cabin retrim in a colour the factory does not offer.",
    hero: "/mainfeatbuild3rangerover.webp",
    heroAlt: "Range Rover with a rose pink leather interior retrim",
    tags: ["Interior"],
    brief: [
      "Taking a cabin somewhere the factory never offered means every surface has to be re-decided, because there is no reference car to compare against.",
      "Colour behaves differently across leather, stitching and trim, so the material was selected together with the thread and the panels rather than chosen first and applied after.",
    ],
    stages: [
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail:
          "Seats, panels and trim retrimmed in house, with colour and stitching confirmed against the actual materials before any trim work began.",
      },
    ],
    outcome:
      "A cabin in a colour the factory does not build, executed to the standard of one that does.",
    gallery: [],
    placeholder: true,
  },
  {
    slug: "g-class-complete-transformation",
    title: "Complete Transformation",
    vehicle: "Mercedes-Benz G-Class",
    type: "SUV",
    summary: "Blackout, wraps, wheels and interior planned and executed as one build.",
    hero: "/build-suv.webp",
    heroAlt: "Mercedes-Benz G-Class with blackout trim, wrap, custom wheels and a retrimmed interior",
    tags: ["Blackout", "Wraps", "Wheels", "Interior"],
    brief: [
      "Four disciplines on one vehicle is the point at which sequencing stops being a convenience and starts being the difference between a coherent result and an approximate one.",
      "Finish selection, wrap coverage, wheel specification and interior direction were decided against each other rather than in isolation, which is only possible when the same team performs all four.",
    ],
    stages: [
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Chrome and bright trim resolved into one finish across every panel, selected under shop lighting against the wrap rather than chosen from a sample card.",
      },
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail:
          "Colour and coverage planned alongside the blackout so the two read as a single decision rather than two treatments layered on one vehicle.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail:
          "Offset, width and tire profile calculated for the vehicle before anything was ordered, then mounted, balanced and torqued in house.",
      },
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail:
          "Material, stitching and colour specified against the exterior direction from the start, executed by our own upholstery and trim team.",
      },
    ],
    outcome:
      "One plan, one schedule and one point of contact across four disciplines that would otherwise have meant four shops and four calendars.",
    gallery: [
      { src: "/maincard1blackout.webp", alt: "Blackout trim detail" },
      { src: "/maincard4wheels.webp", alt: "Wheel and fitment detail" },
      { src: "/mainmaterial2stitch.webp", alt: "Interior stitching detail" },
    ],
    placeholder: true,
  },
  {
    slug: "m5-wrap-wheel-package",
    title: "Wrap & Wheel Package",
    vehicle: "BMW M5",
    type: "Sedan",
    summary: "Colour change and wheel specification planned together rather than in sequence.",
    hero: "/build-sedan.webp",
    heroAlt: "BMW M5 in a full colour change wrap on a custom wheel package",
    tags: ["Wraps", "Wheels"],
    brief: [
      "Wrap colour and wheel finish are the two decisions most often made separately and most often regretted together.",
      "Specifying both at once means the wheel is chosen against the actual finish on the car rather than against a photograph of it.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail:
          "Full colour change, installed by the same in-house team from consultation through final inspection.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail:
          "Fitment calculated for the vehicle rather than eyeballed, with the finish selected against the wrap under shop lighting.",
      },
    ],
    outcome:
      "Two disciplines specified as one decision, so the finished car reads as designed rather than assembled.",
    gallery: [
      { src: "/maincard3wraps.webp", alt: "Wrap finish detail" },
      { src: "/wheel-2.webp", alt: "Wheel detail" },
      { src: "/mainmaterial3fitment.webp", alt: "Fitment detail" },
    ],
    placeholder: true,
  },
  {
    slug: "f150-suspension-overland",
    title: "Suspension & Overland Build",
    vehicle: "Ford F-150",
    type: "Truck",
    summary: "Ride height and accessories specified as one package before any part was ordered.",
    hero: "/build-truck.webp",
    heroAlt: "Ford F-150 on a lift kit with overland accessories and off-road wheels",
    tags: ["Suspension", "Truck Accessories"],
    brief: [
      "Ride height changes step placement, bumper clearance and how a rack sits, which is why accessories chosen before the suspension is decided rarely fit the finished truck.",
      "Both were specified together so the parts list was correct the first time.",
    ],
    stages: [
      {
        discipline: "Suspension",
        slug: "suspension",
        detail:
          "Tuned in house around how the truck is actually used, with alignment performed as part of the install rather than left to the owner.",
      },
      {
        discipline: "Truck Accessories",
        slug: "truck-accessories",
        detail:
          "Bed accessories and functional upgrades installed in house and finished to match the rest of the vehicle.",
      },
    ],
    outcome:
      "Fitment problems caught at the planning stage instead of on delivery day, which is the entire argument for planning the two together.",
    gallery: [
      { src: "/build-truck.webp", alt: "Completed truck build" },
      { src: "/wheel-4.webp", alt: "Off-road wheel detail" },
      { src: "/mainmaterial1metal.webp", alt: "Finish detail" },
    ],
    placeholder: true,
  },
  {
    slug: "corvette-interior-audio",
    title: "Interior & Audio Build",
    vehicle: "Chevrolet Corvette",
    type: "Coupe",
    summary: "Retrim and audio fabricated together while the cabin was already apart.",
    hero: "/maincard5interior.webp",
    heroAlt: "Chevrolet Corvette interior retrim with an integrated custom audio system",
    tags: ["Interior", "Audio"],
    brief: [
      "Audio and interior work compete for the same square inches of a cabin, and both require stripping it.",
      "Doing them in one pass is the difference between a system integrated into the car and one added on top of it.",
    ],
    stages: [
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail:
          "Patterned for the specific vehicle rather than pulled from a universal kit, with every panel returned to the same standard.",
      },
      {
        discipline: "Audio",
        slug: "audio",
        detail:
          "Fabricated to fit the cabin, tuned to the vehicle and wired cleanly in house, with factory controls retained.",
      },
    ],
    outcome:
      "Two disciplines that each require the cabin apart, performed once. The saving is not cosmetic, it is the labour of stripping the interior twice.",
    gallery: [
      { src: "/maincard5interior.webp", alt: "Interior retrim detail" },
      { src: "/mainmaterial2stitch.webp", alt: "Stitching detail" },
      { src: "/build-sedan.webp", alt: "Completed cabin" },
    ],
    placeholder: true,
  },
  {
    slug: "range-rover-sport-ppf-paint",
    title: "PPF & Paint Correction",
    vehicle: "Range Rover Sport",
    type: "SUV",
    summary: "Paint brought back to standard before any film was laid over it.",
    hero: "/maincard2ppf.webp",
    heroAlt: "Range Rover Sport with paint protection film applied over corrected paint",
    tags: ["PPF", "Paint & Body"],
    brief: [
      "Film applied over unresolved paint permanently seals in whatever is underneath it.",
      "Correction and protection are one job in the right order, which is the only order worth doing them in.",
    ],
    stages: [
      {
        discipline: "Paint & Body",
        slug: "paint-and-body",
        detail:
          "Correction performed to our own standard before any protection was considered, with colour matched to the vehicle rather than to the paint code.",
      },
      {
        discipline: "Paint Protection Film",
        slug: "paint-protection-film",
        detail:
          "Every panel measured and cut in house, then installed under controlled shop conditions with no silvering at the edges and no visible seams.",
      },
    ],
    outcome:
      "Protection applied to paint worth protecting, in the sequence that makes the film an investment rather than a cover.",
    gallery: [
      { src: "/maincard2ppf.webp", alt: "Paint protection film detail" },
      { src: "/build-suv.webp", alt: "Completed vehicle" },
      { src: "/mainmaterial1metal.webp", alt: "Finish detail" },
    ],
    placeholder: true,
  },
  {
    slug: "sierra-blackout-lift",
    title: "Full Blackout & Lift",
    vehicle: "GMC Sierra",
    type: "Truck",
    summary: "Complete chrome delete paired with a lift, planned as a single stance decision.",
    hero: "/build-truck.webp",
    heroAlt: "GMC Sierra with a full blackout package on a lift kit and custom wheels",
    tags: ["Blackout", "Suspension"],
    brief: [
      "A full blackout changes what the truck reads as. Ride height changes what it reads as from twenty feet away.",
      "Specified together, they land as one intention rather than two modifications.",
    ],
    stages: [
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Every bright element on the vehicle resolved into a single finish, applied panel by panel by the same in-house team.",
      },
      {
        discipline: "Suspension",
        slug: "suspension",
        detail:
          "Lift specified against the wheel and tire package it was paired with, with alignment included as part of the install.",
      },
    ],
    outcome:
      "One schedule for two disciplines that would otherwise have meant moving the truck between shops and hoping the finishes agreed.",
    gallery: [
      { src: "/maincard1blackout.webp", alt: "Blackout trim detail" },
      { src: "/build-truck.webp", alt: "Completed truck" },
      { src: "/wheel-3.webp", alt: "Wheel detail" },
    ],
    placeholder: true,
  },
];

/** Filter categories for the index. "All" is prepended in the component. */
export const buildTypes: BuildType[] = ["SUV", "Sedan", "Truck", "Coupe"];

export const getBuild = (slug: string) =>
  featuredBuilds.find((build) => build.slug === slug);
