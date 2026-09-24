/**
 * LOCATION PAGE CONTENT
 *
 * Real content for the city pages, keyed by slug. A city with an entry
 * here renders the full location page. A city without one renders the
 * existing coming soon placeholder, unchanged.
 *
 * Houston is the master. The other 21 cities are written against it once
 * it is approved, which is why only one entry exists today. Twenty-two
 * near-identical pages is the pattern Google treats as doorway pages, so
 * they are published one at a time with genuinely distinct content.
 *
 * `indexable` is per city. Houston was approved by Liz on September 24
 * 2026 by email and indexed the same day. The sitemap reads this flag, so
 * a future city goes live by flipping its own flag rather than by editing
 * the sitemap.
 *
 * DESIGN, September 24 2026. The location pages carry the animated
 * concept Jose approved (light sweep hero, pinned pair scene, route map,
 * horizontal disciplines run). The main website is not touched. Every
 * animated section reads its words and coordinates from this file, so a
 * new city is data entry against the same template.
 *
 * ============================================================
 * OPEN ITEMS, NOT BLOCKING LAUNCH
 * ============================================================
 * Liz approved the page with these outstanding. They are ours rather than
 * hers, so they are still worth confirming and correcting in place.
 *
 *   1. DRIVE TIMES AND ROUTES. Every "Getting here" row below is our
 *      estimate from the Ammi Trail address, including "About 20 min
 *      from Downtown". None of them are figures Liz supplied.
 *   2. NEIGHBOURHOOD LIST. Downtown, the Heights, River Oaks, the
 *      Galleria and Greenspoint are our selection. Confirm these are the
 *      areas the house actually wants to be found for.
 *   3. G 63 SCOPE. The featured build points at g-class-satin-black-wrap.
 *      Her verified scope for it is wraps, blackout and audio, with no
 *      PPF, so confirm it is the right build to carry a page whose pair
 *      is Blackout and PPF.
 *   4. FAQ 3 ANSWER. The pairing answer describes intake planning trim
 *      finishes and film coverage together. Confirm that is how the shop
 *      actually sequences a combined job.
 *
 * Everything else on the page is drawn from nap in lib/site.ts, from
 * services.ts, builds.ts or wheels.ts, so it cannot drift from the rest
 * of the site.
 */

export interface LocationPairService {
  /** Slug in services.ts. The link and CTA label come from there. */
  slug: string;
  title: string;
  copy: string;
  /** Large frame in the pinned pair scene. */
  image: string;
  imageAlt: string;
}

/** One origin on the map, drawn as a route into the House. */
export interface LocationRoute {
  /** Origin as shown in the "Getting here" list and on the map. */
  from: string;
  /** Road guidance, e.g. "I-45 North". */
  via: string;
  /** Estimated drive, e.g. "About 20 min". VERIFY. */
  time: string;
  /** Map dot position in the 620 x 560 map viewBox. */
  x: number;
  y: number;
  /** Label anchor for the dot. */
  labelX: number;
  labelY: number;
  /** SVG path from the origin to the House. Must end at the House pin. */
  d: string;
}

export interface LocationContent {
  slug: string;
  /** Per city indexing gate. False while the page is in review. */
  indexable: boolean;
  title: string;
  description: string;
  h1: { line1: string; line2: string };
  lede: string;
  hero: {
    image: string;
    alt: string;
    /** Natural pixel size of the image, used to aim the light. */
    width: number;
    height: number;
    /**
     * The light sweep path, as fractions of the image (0 to 1). The last
     * point is where the light rests and opens up.
     */
    sweep: [number, number][];
  };
  /** The two disciplines this city page leads on. */
  pair: {
    headline: string;
    lede: string;
    primary: LocationPairService;
    secondary: LocationPairService;
  };
  /** The "From [City] to the House" section. */
  access: {
    headline: string;
    where: string;
    routes: LocationRoute[];
    /** House pin position in the map viewBox. */
    house: { x: number; y: number };
    neighborhoods: string;
  };
  faqs: { question: string; answer: string }[];
  /** Slug in builds.ts. */
  featuredBuildSlug: string;
  /** Slug in services.ts. Resolved to the service name for the form. */
  preselectService: string;
}

export const locationContent: Record<string, LocationContent> = {
  houston: {
    slug: "houston",
    /* Approved by Liz, September 24 2026. Indexed the same day. */
    indexable: true,
    title: "Blackout Packages and PPF in Houston, TX",
    description:
      "Blackout packages, paint protection film and eight more disciplines under one roof at 18235 Ammi Trail, Houston. Design your build with the House.",
    h1: { line1: "Houston.", line2: "The Automotive Customization House." },
    lede:
      "Every Houston build starts and finishes at 18235 Ammi Trail. Blackout packages, paint protection film and eight more disciplines run under one roof with one team. No subcontractors and no handoffs.",
    hero: {
      image: "/dbtwmmainpagehero.webp",
      alt: "Blacked-out Land Rover Defender outside the House",
      width: 1456,
      height: 816,
      /* Headlight, roof light bar, teal caliper, then rest on the body. */
      sweep: [
        [0.433, 0.397],
        [0.584, 0.078],
        [0.604, 0.684],
        [0.52, 0.42],
      ],
    },
    pair: {
      headline: "Darker trim. Protected paint.",
      lede: "Blackout and paint protection, planned together at intake and finished under one roof.",
      primary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Emblems, grilles, trim and accents refinished in gloss, satin or matte black. One darker, cleaner finish carried from front to rear.",
        image: "/blackout-overview.webp",
        imageAlt: "Land Rover Defender with a full blackout package in satin black",
      },
      secondary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Clear film against rock chips and road debris from I-45 to the Loop. Full front or full body coverage, installed in-house.",
        image: "/ppf-overview.webp",
        imageAlt: "Range Rover Sport with paint protection film installed",
      },
    },
    access: {
      headline: "One address. All of Houston.",
      where:
        "Off I-45 at Rankin Road in north Houston, minutes from Beltway 8 and the Hardy Toll Road.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown",
          via: "I-45 North",
          time: "About 20 min",
          x: 306, y: 384, labelX: 318, labelY: 404,
          d: "M306 384 C316 300 318 230 328 132",
        },
        {
          from: "The Heights",
          via: "I-45 North",
          time: "About 20 min",
          x: 252, y: 318, labelX: 160, labelY: 310,
          d: "M252 318 C282 300 316 240 328 132",
        },
        {
          from: "River Oaks",
          via: "610 to I-45 North",
          time: "About 25 min",
          x: 232, y: 374, labelX: 204, labelY: 410,
          d: "M232 374 C250 300 300 220 328 132",
        },
        {
          from: "The Galleria",
          via: "610 to I-45 North",
          time: "About 30 min",
          x: 192, y: 392, labelX: 88, labelY: 426,
          d: "M192 392 C150 300 230 170 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown, the Heights, River Oaks, the Galleria, Greenspoint and every Houston neighborhood in between.",
    },
    faqs: [
      {
        question: "Where is Design By TWM located in Houston?",
        answer:
          "18235 Ammi Trail, Houston, TX 77060, off I-45 at Rankin Road in north Houston. Beltway 8 and the Hardy Toll Road are minutes away. The House is open Monday to Friday from 8 AM to 5 PM.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Wraps, PPF, wheels, suspension, interiors, paint and body, lighting, audio, blackout and truck accessories are all completed by the House team at Ammi Trail.",
      },
      {
        question: "Can I pair a blackout package with paint protection film?",
        answer:
          "Yes. Both are planned together at intake so trim finishes and film coverage line up.",
      },
      {
        question: "How do I start a build from anywhere in Houston?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "g-class-satin-black-wrap",
    preselectService: "blackout-packages",
    /* No nearby cities list: the footer's Areas We Serve already links
       every city page. Removed September 24 2026 per Jose. */
  },
};

export const getLocationContent = (slug: string): LocationContent | undefined =>
  locationContent[slug];
