/**
 * FEATURED BUILDS
 *
 * ============================================================
 * PLACEHOLDER CONTENT
 * ============================================================
 * All three builds below are invented. Vehicles, client quotes,
 * timelines and build details are not real projects.
 *
 * They exist so the index and the detail template can be reviewed
 * with realistic content rather than empty boxes, and so the shape
 * of a real case study is obvious when Liz supplies them.
 *
 * Tracked in CLIENT_REVIEW_NOTES.md section 8 and 17.
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

export interface FeaturedBuild {
  slug: string;
  title: string;
  vehicle: string;
  /** Short label used on cards. */
  summary: string;
  hero: string;
  heroAlt: string;
  /** Discipline tags shown on the card. */
  tags: string[];
  duration: string;
  brief: string[];
  stages: BuildStage[];
  outcome: string;
  gallery: { src: string; alt: string }[];
  placeholder: boolean;
}

export const featuredBuilds: FeaturedBuild[] = [
  {
    slug: "defender-white-out",
    title: "White Out",
    vehicle: "Land Rover Defender",
    summary: "Colour change, blackout, wheels and suspension planned as one build.",
    hero: "/build-truck.webp",
    heroAlt: "Land Rover Defender in a satin white wrap with blacked out trim and off-road wheels",
    tags: ["Vehicle Wraps", "Blackout", "Wheels & Fitment", "Suspension"],
    duration: "Four weeks",
    brief: [
      "The owner wanted the Defender to read as one solid colour with no bright work anywhere on it, sitting slightly taller on a wheel that suited the shape rather than fighting it.",
      "The complication was sequencing. A colour change, a full chrome delete, a suspension change and a new wheel package all affect each other, and done across separate shops the vehicle would have moved four times and taken most of a quarter.",
    ],
    stages: [
      {
        discipline: "Vehicle Wraps",
        slug: "vehicle-wraps",
        detail:
          "Full colour change in satin white. Panels were disassembled rather than tucked so every edge finishes inside a jamb, which is what stops a wrap lifting in Houston summers.",
      },
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Complete chrome delete across window surrounds, badging, grille, mirror caps and roof rails, all brought to a single satin black so nothing reads as a different decision.",
      },
      {
        discipline: "Suspension",
        slug: "suspension",
        detail:
          "Modest lift with alignment performed as part of the work, specified before the wheels were ordered so clearance was known rather than hoped for.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail:
          "Off-road wheel package sized to the new ride height, with tire profile chosen to keep rolling diameter close to factory so the speedometer stayed accurate.",
      },
    ],
    outcome:
      "Four disciplines, one schedule, one point of contact. The vehicle left in four weeks rather than the three months the same work would have taken moving between separate shops.",
    gallery: [
      { src: "/build-truck.webp", alt: "Defender three quarter view after completion" },
      { src: "/svc-wheels.webp", alt: "Wheel and tire fitment detail" },
      { src: "/svc-blackout.webp", alt: "Blacked out trim detail" },
    ],
    placeholder: true,
  },
  {
    slug: "range-rover-monochrome",
    title: "Monochrome",
    vehicle: "Range Rover Sport",
    summary: "Blackout and protection film specified together from the first drawing.",
    hero: "/build-suv.webp",
    heroAlt: "Range Rover Sport with blacked out trim and full front paint protection film",
    tags: ["Blackout", "Paint Protection Film", "Wheels & Fitment"],
    duration: "Two weeks",
    brief: [
      "A near-new vehicle where the owner wanted the brightwork gone but was not willing to compromise the factory paint underneath, having already lost a bumper to rock chips on a previous car.",
      "This is the pairing that made the case for separating paint protection film into its own discipline. Protection and finish work are not sequential decisions, they are one decision made twice.",
    ],
    stages: [
      {
        discipline: "Blackout Packages",
        slug: "blackout-packages",
        detail:
          "Gloss black finish selected against the paint under shop lighting rather than from a swatch, applied across trim, badging and exhaust tips.",
      },
      {
        discipline: "Paint Protection Film",
        slug: "paint-protection-film",
        detail:
          "Extended front coverage with wrapped edges on the hood, fenders and mirrors, plus door cups and rockers. Laid after the blackout work so the film sits over the finished surface, not under it.",
      },
      {
        discipline: "Wheels & Fitment",
        slug: "wheels-and-fitment",
        detail:
          "Factory sizing retained, finish changed to match the trim work. Road force balanced and TPMS transferred.",
      },
    ],
    outcome:
      "The sequencing is the whole story. Film applied before finish work would have had to come off. Applied by a separate shop afterwards, the edges would have been cut without knowing where the trim work ended.",
    gallery: [
      { src: "/build-suv.webp", alt: "Range Rover Sport after completion" },
      { src: "/svc-ppf.webp", alt: "Paint protection film edge detail" },
      { src: "/mat-metal.webp", alt: "Trim finish detail" },
    ],
    placeholder: true,
  },
  {
    slug: "sedan-full-retrim",
    title: "Full Retrim",
    vehicle: "Luxury Sedan",
    summary: "Interior rebuilt to the frame, with audio and lighting run while the panels were out.",
    hero: "/build-sedan.webp",
    heroAlt: "Custom retrimmed sedan interior with contrast stitching and ambient lighting",
    tags: ["Interior Transformation", "Audio", "Lighting"],
    duration: "Three weeks",
    brief: [
      "A vehicle the owner had no intention of selling, where the cabin was the only part that still felt like everybody else's car.",
      "Interior work is the most labour intensive discipline in the building and also the one that creates the most opportunity, because once the panels are out, every other job that lives behind them becomes cheap to do.",
    ],
    stages: [
      {
        discipline: "Interior Transformation",
        slug: "interior-transformation",
        detail:
          "Seats stripped to the frame and patterned for this specific vehicle. Leather and Alcantara with contrast stitching, door cards, console and a suede headliner.",
      },
      {
        discipline: "Audio",
        slug: "audio",
        detail:
          "Component speakers, amplification and processing behind the trim with sound deadening on doors and floor. Factory head unit and CarPlay retained.",
      },
      {
        discipline: "Lighting",
        slug: "lighting",
        detail:
          "Fibre optic ambient lighting routed through door cards, footwells and headliner. Only practical to do at this cost because the cabin was already apart.",
      },
    ],
    outcome:
      "Three disciplines that would each have required stripping the interior separately, done once. The audio and lighting work cost a fraction of what it would have as standalone jobs.",
    gallery: [
      { src: "/build-sedan.webp", alt: "Completed interior" },
      { src: "/mat-stitch.webp", alt: "Stitching detail" },
      { src: "/svc-interior.webp", alt: "Ambient lighting detail" },
    ],
    placeholder: true,
  },
];

export const getBuild = (slug: string) =>
  featuredBuilds.find((build) => build.slug === slug);
