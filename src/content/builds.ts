/**
 * FEATURED BUILDS
 *
 * ============================================================
 * SIX BUILDS ON LIZ'S VERIFIED SCOPE, PLUS ONE AWAITING AN ANSWER
 * ============================================================
 * Liz supplied verified scope for six builds on September 2 2026. It is
 * client-supplied fact and it supersedes everything we had written.
 *
 * HER SIX, IN HER ORDER:
 *      cadillac-iq-monochromatic         Cadillac IQ
 *      lamborghini-sto-dsb-el-chavez     Lamborghini Huracan STO
 *      range-rover-rose-pink-interior    Range Rover
 *      sierra-blackout-lift              GMC Sierra Denali HD Ultimate
 *      corvette-interior-audio           Chevrolet Corvette Stingray C8
 *      g-class-complete-transformation   Mercedes-AMG G 63
 *
 * The first three are the homepage cards, which is intended.
 *
 * WHAT IS HERS ON THOSE SIX, AND THEREFORE FACT:
 *   the vehicle, the build name, the order, plus the disciplines and
 *   specification in her scope. tags and stages are built from her
 *   bullets rather than from our reading of a folder name. Every stage
 *   detail traces back to something she wrote.
 *
 * WHAT IS STILL OURS ON THOSE SIX:
 *   the phrasing of brief, summary, outcome and heroAlt, which arrange
 *   her scope into sentences. They add no timeline, no client story and
 *   no specification beyond what she supplied.
 *
 * All six carry placeholder: false.
 *
 * WHAT THIS REPLACED. The previous copy was ours throughout and parts of
 * it were wrong, not merely unverified. The Lamborghini was described as
 * a wrap build and tagged Wraps. It is an interior and audio build with
 * colour matched calipers. There is no wrap in her scope at all.
 * That entry was rebuilt from nothing. The Corvette was described as an
 * interior and audio build and is a wrap and blackout build. Three
 * titles were wrong, including Rose Pink for what is Blush Pink.
 *
 * SLUGS ARE UNCHANGED so existing urls keep resolving. Two now actively
 * misdescribe their build: corvette-interior-audio is a wrap build, and
 * g-class-complete-transformation is a satin black wrap on a G 63. That
 * is the cost of not breaking a published link.
 *
 * REMOVED September 2 2026, not on her list:
 *      m5-wrap-wheel-package             BMW M5
 *      f150-suspension-overland          Ford F-150
 *
 * UNRESOLVED, HELD LAST:
 *      range-rover-sport-ppf-paint       Range Rover Sport
 *    Not on her list of six and not covered by her scope. It is not yet
 *    clear whether it duplicates her Range Rover entry or is a separate
 *    vehicle. Left in place and untouched, still placeholder: true, with
 *    the copy we wrote. Do not publish it as verified.
 *
 * `duration` is intentionally absent. Inventing a turnaround figure for
 * a real customer's vehicle is the kind of claim that gets a business in
 * trouble, and Liz has already supplied real timeframes per discipline
 * in services.ts. Her scope of September 2 carries no timings either.
 *
 * STILL REQUIRED BEFORE LAUNCH:
 *   - Her answer on range-rover-sport-ppf-paint
 *   - Real photography, promised by Liz on August 14
 *   - Written owner permission where a vehicle is identifiable
 *
 * Tracked in CLIENT_REVIEW_NOTES.md section 32, which supersedes the
 * build provenance parts of sections 8, 17, 21, 29 and 31.
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
  /**
   * Filename stem for this build's gallery, by the same convention the
   * service pages use: /gallery-{galleryPrefix}-1.webp through -4.webp.
   *
   * Replaced the old per-shot `gallery` array on September 2 2026. That
   * array pointed at generic discipline photographs standing in for
   * pictures of the actual vehicle, which is exactly the substitution
   * this project has been removing everywhere else.
   */
  galleryPrefix: string;
  placeholder: boolean;
}

export const featuredBuilds: FeaturedBuild[] = [
  {
    slug: "cadillac-iq-monochromatic",
    title: "Monochromatic",
    vehicle: "Cadillac IQ",
    type: "SUV",
    summary: "A satin wrap with the wheels colour matched to it.",
    hero: "/mainfeatbuild1cadillac.webp",
    heroAlt: "Cadillac IQ wrapped in Satin Silver White Aluminum on colour matched Giovanna Panik wheels",
    galleryPrefix: "cadillac",
    tags: ["Wraps", "Wheels"],
    brief: [
      "Two disciplines specified as one finish. The body is wrapped in Satin Silver White Aluminum and the wheels are matched to it rather than set against it.",
      "Colour matching a wheel to a wrap only works when both are decided together, because the match is judged against the actual film rather than against a sample.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail: "Full vehicle wrap in Satin Silver White Aluminum.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail: "Panik Wheels by Giovanna, colour matched to the wrap.",
      },
    ],
    outcome: "One finish carried across the body and the wheels.",
    placeholder: false,
  },
  {
    slug: "lamborghini-sto-dsb-el-chavez",
    title: "DSB x El Chavez",
    vehicle: "Lamborghini Huracan STO",
    type: "Coupe",
    summary: "A bespoke Tiffany Blue interior with a 16 speaker audio system.",
    hero: "/mainfeatbuild2lambo.webp",
    heroAlt: "Lamborghini Huracan STO with a bespoke Tiffany Blue leather interior",
    galleryPrefix: "lambo",
    tags: ["Interior", "Audio", "Paint & Body"],
    brief: [
      "A collaboration between DESIGNBYTWM and El Chavez, executed inside the car rather than on the paint. The cabin is Tiffany Blue leather throughout, with the El Chavez signature embroidered into the seats.",
      "The audio runs through the factory interface rather than alongside it. The brake calipers were colour matched to the same blue, so the outside points back at the inside.",
    ],
    stages: [
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail:
          "Full bespoke interior in Tiffany Blue leather. Two-tone Tiffany Blue and black seat upholstery, diamond quilted and horizontal stitched seat detailing, Tiffany Blue contrast stitching throughout, custom seatbelts matched to the interior, colour matched headliner, pillars and interior trim, with Alcantara suede accents. The El Chavez signature is embroidered into the seats.",
      },
      {
        discipline: "Audio",
        slug: "audio",
        detail: "Upgraded 16 speaker audio system, running through the factory interface.",
      },
      {
        discipline: "Paint & Body",
        slug: "paint-and-body",
        detail: "Custom brake calipers colour matched in Tiffany Blue.",
      },
    ],
    outcome: "A cabin built around one colour, with the audio and the calipers matched to it.",
    placeholder: false,
  },
  {
    slug: "range-rover-rose-pink-interior",
    title: "Blush Pink Interior",
    vehicle: "Range Rover",
    type: "SUV",
    summary: "A full blush pink cabin, with a blackout package and Forgiato wheels outside.",
    hero: "/mainfeatbuild3rangerover.webp",
    heroAlt: "Range Rover with a full blush pink interior transformation and Forgiato wheels",
    galleryPrefix: "rangerover",
    tags: ["Interior", "Blackout", "Wheels"],
    brief: [
      "The cabin is the build. A full blush pink interior transformation means every surface inside is specified together rather than matched to a stock trim.",
      "Outside, a blackout package and a Forgiato wheel upgrade keep the exterior quiet against it.",
    ],
    stages: [
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail: "Full blush pink interior transformation.",
      },
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail: "Blackout package across the exterior.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail: "Forgiato wheel upgrade.",
      },
    ],
    outcome: "A blush pink cabin inside a blacked out exterior on Forgiato wheels.",
    placeholder: false,
  },
  {
    slug: "sierra-blackout-lift",
    title: "White on White",
    vehicle: "GMC Sierra Denali HD Ultimate",
    type: "Truck",
    summary: "A two-tone wrap on a lifted truck, blacked out and running RBP wheels.",
    hero: "/build-truck.webp",
    heroAlt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift with RBP wheels",
    galleryPrefix: "sierra",
    tags: ["Blackout", "Wraps", "Suspension", "Wheels", "Lighting"],
    brief: [
      "Five disciplines on one truck. The wrap and the blackout decide what it reads as, the lift and the wheels decide how it sits.",
      "Lighting was part of the same build rather than an afterthought, with a starlight headliner in the cabin and rock lighting underneath.",
    ],
    stages: [
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail: "Full blackout package.",
      },
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail: "Two-tone exterior wrap.",
      },
      {
        discipline: "Suspension",
        slug: "suspension",
        detail: "Suspension lift upgrade.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail: "Upgraded RBP wheels on Rolling Big Power tires.",
      },
      {
        discipline: "Lighting",
        slug: "lighting",
        detail: "Custom starlight headliner in the cabin and custom rock lighting underneath.",
      },
    ],
    outcome: "Five disciplines on one truck, planned as a single build.",
    placeholder: false,
  },
  {
    slug: "corvette-interior-audio",
    title: "Desert Tan Wrap",
    vehicle: "Chevrolet Corvette Stingray C8",
    type: "Coupe",
    summary: "A gloss desert tan colour change, blacked out from the roof to the wheels.",
    hero: "/maincard5interior.webp",
    heroAlt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    galleryPrefix: "corvette",
    tags: ["Wraps", "Blackout", "Wheels"],
    brief: [
      "A colour change in Gloss Desert Tan, with everything that would otherwise interrupt it taken to gloss black.",
      "Roof, mirror caps, grille, aerodynamic trim and wheels were resolved to the same finish, so the tan reads as the only colour on the car.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail: "Full colour change wrap in Gloss Desert Tan, with a gloss black roof.",
      },
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Full exterior blackout package, covering gloss black mirror caps and exterior accents, the front grille and the aerodynamic trim accents.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail: "Blacked out wheels.",
      },
    ],
    outcome: "One colour on the body, everything else in gloss black.",
    placeholder: false,
  },
  {
    slug: "g-class-complete-transformation",
    title: "Satin Black",
    vehicle: "Mercedes-AMG G 63",
    type: "SUV",
    summary: "A satin black colour change over a black-on-black exterior, with a bespoke sound system.",
    hero: "/build-suv.webp",
    heroAlt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging and grille",
    galleryPrefix: "g63",
    tags: ["Wraps", "Blackout", "Audio"],
    brief: [
      "Satin black over the whole vehicle, with every bright element on the exterior taken to black so nothing breaks the finish.",
      "The sound system is bespoke and runs through the factory controls rather than replacing them.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail: "Full satin black exterior colour change wrap.",
      },
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Complete black-on-black exterior package, with custom blacked out Mercedes-AMG emblems and badging, a blacked out front grille and blacked out exterior trim.",
      },
      {
        discipline: "Audio",
        slug: "audio",
        detail: "Bespoke upgraded sound system, integrated with the factory controls.",
      },
    ],
    outcome: "A black-on-black exterior with the audio built into the factory controls.",
    placeholder: false,
  },
  {
    slug: "range-rover-sport-ppf-paint",
    title: "PPF & Paint Correction",
    vehicle: "Range Rover Sport",
    type: "SUV",
    summary: "Paint brought back to standard before any film was laid over it.",
    hero: "/maincard2ppf.webp",
    heroAlt: "Range Rover Sport with paint protection film applied over corrected paint",
    galleryPrefix: "rrsport",
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
    placeholder: true,
  },
];

/** Filter categories for the index. "All" is prepended in the component. */
export const buildTypes: BuildType[] = ["SUV", "Sedan", "Truck", "Coupe"];

export const getBuild = (slug: string) =>
  featuredBuilds.find((build) => build.slug === slug);
