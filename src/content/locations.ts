/**
 * LOCATION PAGE CONTENT
 *
 * Real content for the city pages, keyed by slug. A city with an entry
 * here renders the full location page. A city without one renders the
 * existing coming soon placeholder, unchanged.
 *
 * Houston is the master. The other 21 cities were written against it on
 * October 2 2026. Twenty-two near-identical pages is the pattern Google
 * treats as doorway pages, so every city carries its own two-discipline
 * pairing (no two cities share one), its own routes, neighbourhoods,
 * FAQs, hero and featured build. They are indexed in tranches rather than
 * all at once: tranche 1 is live, the rest flip their own flag later.
 *
 * DRIVE TIMES AND ROUTES FOR ALL 22 CITIES are our estimates from the
 * Ammi Trail address, phrased as "About X min". Liz offered to review and
 * correct them; she will do so city by city after launch.
 *
 * MAP COORDINATES. Every origin is projected from its real latitude and
 * longitude onto the fixed backdrop in the city template, using a
 * transform fitted to Houston's four approved dots. Distance beyond the
 * edge of the frame is eased in so outer cities stay inside it while
 * keeping their true direction. Routes from the east arc over the House
 * label; routes from the south land from below it.
 *
 * PAIR IMAGES. A pair image is resolved in the city template, not here:
 * Liz's photo for that service's overview slot in Sanity wins, then the
 * path below, then an empty striped frame. An empty string below means no
 * local file exists yet, so the frame stays empty until Liz publishes the
 * overview photo for that discipline, at which point every city page that
 * pairs it fills in automatically.
 *
 * `indexable` is per city. Houston was approved by Liz on September 24
 * 2026 by email and indexed the same day. The sitemap reads this flag, so
 * a future city goes live by flipping its own flag rather than by editing
 * the sitemap.
 *
 * DESIGN, September 24 2026. The location pages carry the animated
 * concept Jose approved (full photo hero, pinned pair scene, route map,
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
  /* The light sweep path that used to live here was removed with the
     effect itself, September 26 2026, at Henry's request. */
  hero: {
    image: string;
    alt: string;
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
  "the-woodlands": {
    slug: "the-woodlands",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "PPF and Custom Interiors in The Woodlands, TX",
    description:
      "Paint protection film and interior transformation for The Woodlands, straight down I-45 at 18235 Ammi Trail. Ten disciplines under one roof.",
    h1: { line1: "The Woodlands.", line2: "The Automotive Customization House." },
    lede:
      "From Town Center to the House is one highway. Paint protection film and interior work are planned together at Ammi Trail, then finished by the same team that scoped them.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "Protected outside. Rebuilt inside.",
      lede: "Film on the paint and a new cabin, scoped at one consultation and delivered as one build.",
      primary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Self-healing film over the paint, in partial, track or full-body coverage. Patterned and cut in house, with the edges wrapped so the film disappears.",
        image: "/ppf-overview.webp",
        imageAlt: "Stealth-finished Range Rover Sport after full paint protection film",
      },
      secondary: {
        slug: "interior-transformation",
        title: "Interior Transformation",
        copy:
          "Full leather and technical textile retrims, bespoke stitching and suede headliners. The cabin is specified to the car rather than to a catalog.",
        image: "",
        imageAlt: "Custom interior retrim built at the House",
      },
    },
    access: {
      headline: "One highway. One exit.",
      where:
        "Straight down I-45 South from The Woodlands to the Rankin Road exit in north Houston, just north of Beltway 8.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Town Center",
          via: "I-45 South",
          time: "About 25 min",
          x: 340, y: 26, labelX: 338, labelY: 46,
          d: "M340 26 C319 60 323 104 328 132",
        },
        {
          from: "Research Forest",
          via: "I-45 South",
          time: "About 30 min",
          x: 306, y: 26, labelX: 153, labelY: 46,
          d: "M306 26 C330 59 330 103 328 132",
        },
        {
          from: "Creekside Park",
          via: "Grand Parkway to I-45",
          time: "About 30 min",
          x: 272, y: 26, labelX: 154, labelY: 28,
          d: "M272 26 C274 71 306 108 328 132",
        },
      ],
      neighborhoods:
        "Serving Town Center, Research Forest, Creekside Park, Sterling Ridge, Alden Bridge, Cochran's Crossing and every village in The Woodlands.",
    },
    faqs: [
      {
        question: "How far is the House from The Woodlands?",
        answer:
          "About 25 minutes from Town Center, straight down I-45 South. The House is at 18235 Ammi Trail, Houston, TX 77060, off the Rankin Road exit just north of Beltway 8.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Paint protection film, interior transformation and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can I combine paint protection film with an interior transformation?",
        answer:
          "Yes. Both are scoped together at the consultation, so the exterior and the cabin are planned as one build rather than two separate jobs.",
      },
      {
        question: "How do I start a build from The Woodlands?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "range-rover-rose-pink-interior",
    preselectService: "paint-protection-film",
  },
  katy: {
    slug: "katy",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "Custom Wheels and Blackout Packages in Katy, TX",
    description:
      "Custom wheels, fitment and blackout packages for Katy, built at 18235 Ammi Trail in Houston. Stance, finish and trim planned as one build.",
    h1: { line1: "Katy.", line2: "The Automotive Customization House." },
    lede:
      "Katy builds come in on I-10 and around the Beltway to Ammi Trail. Wheels and blackout are specified together, so the stance and the finish read as one decision.",
    hero: {
      image: "/featurebuild4denali.webp",
      alt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift",
    },
    pair: {
      headline: "The right stance. One finish.",
      lede: "Fitment and blackout decided at the same consultation, so the wheels and the trim agree.",
      primary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Forged and flow-formed wheels with offset and stance planned for the vehicle. Tire pairing, TPMS and road force balancing, all done in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
      secondary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Chrome delete, badging, grille and trim brought to gloss, satin or matte black. The finish is chosen to sit with the wheels, not against them.",
        image: "/blackout-overview.webp",
        imageAlt: "Blacked-out Land Rover Defender in a studio bay with overhead lighting",
      },
    },
    access: {
      headline: "I-10 to the Beltway to the House.",
      where:
        "East on I-10 from Katy, north on Beltway 8, then I-45 North one exit to Rankin Road in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Old Town Katy",
          via: "I-10 East to Beltway 8",
          time: "About 40 min",
          x: 28, y: 222, labelX: 50, labelY: 260,
          d: "M28 222 C143 235 256 175 328 132",
        },
        {
          from: "Cinco Ranch",
          via: "Westpark Tollway to Beltway 8",
          time: "About 40 min",
          x: 30, y: 265, labelX: 8, labelY: 285,
          d: "M30 265 C113 178 242 148 328 132",
        },
        {
          from: "Cane Island",
          via: "I-10 East to Beltway 8",
          time: "About 45 min",
          x: 28, y: 188, labelX: 39, labelY: 184,
          d: "M28 188 C138 214 254 167 328 132",
        },
      ],
      neighborhoods:
        "Serving Old Town Katy, Cinco Ranch, Cane Island, Grand Lakes, Seven Meadows, Elyson and the rest of the Katy area.",
    },
    faqs: [
      {
        question: "How far is the House from Katy?",
        answer:
          "About 40 minutes from Old Town Katy, east on I-10 and around Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060, off I-45 at Rankin Road.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can I pair new wheels with a blackout package?",
        answer:
          "Yes. The fitment and the trim finish are planned together at the consultation, so the wheels and the blackout read as one build.",
      },
      {
        question: "How do I start a build from Katy?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "corvette-desert-tan-wrap",
    preselectService: "wheels-and-fitment",
  },
  "sugar-land": {
    slug: "sugar-land",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "Vehicle Wraps and PPF in Sugar Land, TX",
    description:
      "Vehicle wraps and paint protection film for Sugar Land, designed and installed at 18235 Ammi Trail in Houston. Color and protection planned together.",
    h1: { line1: "Sugar Land.", line2: "The Automotive Customization House." },
    lede:
      "From Sugar Land Town Square it is a straight run up US 59 and around the Beltway to Ammi Trail. Wraps and paint protection film are designed together, then installed by one team.",
    hero: {
      image: "/featurebuild5corvette.webp",
      alt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    },
    pair: {
      headline: "New color. Protected finish.",
      lede: "Color and protection, scoped at the same consultation and installed by the same team.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change, partial wraps and roof and hood treatments in premium cast vinyl. Designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Self-healing film against rock chips and debris on US 59 and the Beltway. Partial, track or full-body coverage, cut in house.",
        image: "/ppf-overview.webp",
        imageAlt: "Stealth-finished Range Rover Sport after full paint protection film",
      },
    },
    access: {
      headline: "Up 59. Around the Beltway.",
      where:
        "North on US 59 from Sugar Land, around Beltway 8 to I-45, then north to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Sugar Land Town Square",
          via: "US 59 to Beltway 8",
          time: "About 40 min",
          x: 41, y: 449, labelX: 51, labelY: 457,
          d: "M41 449 C173 372 269 228 328 132",
        },
        {
          from: "Telfair",
          via: "US 59 to Beltway 8",
          time: "About 40 min",
          x: 36, y: 398, labelX: 6, labelY: 418,
          d: "M36 398 C104 274 238 186 328 132",
        },
        {
          from: "Riverstone",
          via: "Fort Bend Toll Road to Beltway 8",
          time: "About 45 min",
          x: 69, y: 508, labelX: 6, labelY: 528,
          d: "M69 508 C195 406 278 242 328 132",
        },
      ],
      neighborhoods:
        "Serving Sugar Land Town Square, First Colony, Telfair, Riverstone, Sugar Creek, New Territory and all of Sugar Land.",
    },
    faqs: [
      {
        question: "How far is the House from Sugar Land?",
        answer:
          "About 40 minutes from Sugar Land Town Square, up US 59 and around Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Can I get a wrap and paint protection film on the same vehicle?",
        answer:
          "Yes. Both are scoped at the same consultation, so color and coverage are planned as one build.",
      },
      {
        question: "How do I start a build from Sugar Land?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "cadillac-iq-monochromatic",
    preselectService: "vehicle-wraps",
  },
  cypress: {
    slug: "cypress",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "Wheels, Fitment and Suspension in Cypress, TX",
    description:
      "Custom wheels, fitment and suspension for Cypress, installed at 18235 Ammi Trail in Houston. Lift, lowering and wheel packages planned as one build.",
    h1: { line1: "Cypress.", line2: "The Automotive Customization House." },
    lede:
      "Cypress builds come in on US 290 and the Beltway. Wheels and suspension are planned at the same consultation, so ride height and fitment are settled before anything is ordered.",
    hero: {
      image: "/featurebuild4denali.webp",
      alt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift",
    },
    pair: {
      headline: "Ride height and fitment, decided once.",
      lede: "Suspension and wheels specified together, installed with alignment by one team.",
      primary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Forged and flow-formed wheels with offset planned to the ride height. Tire pairing, TPMS and road force balancing, all done in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
      secondary: {
        slug: "suspension",
        title: "Suspension",
        copy:
          "Lift and leveling kits, lowering springs, coilovers and air suspension. Installed with alignment and matched to the wheel package.",
        image: "",
        imageAlt: "Suspension installed and aligned at the House",
      },
    },
    access: {
      headline: "Down 290. Across the Beltway.",
      where:
        "East on US 290 from Cypress, then Beltway 8 East to I-45 and north one exit to Rankin Road.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Towne Lake",
          via: "US 290 to Beltway 8",
          time: "About 30 min",
          x: 48, y: 143, labelX: 6, labelY: 130,
          d: "M48 143 C145 184 256 155 328 132",
        },
        {
          from: "Bridgeland",
          via: "US 290 to Beltway 8",
          time: "About 35 min",
          x: 39, y: 110, labelX: 6, labelY: 91,
          d: "M39 110 C141 72 254 106 328 132",
        },
        {
          from: "Cy-Fair",
          via: "FM 1960 East",
          time: "About 25 min",
          x: 99, y: 102, labelX: 87, labelY: 86,
          d: "M99 102 C172 149 266 141 328 132",
        },
      ],
      neighborhoods:
        "Serving Towne Lake, Bridgeland, Cy-Fair, Fairfield, Coles Crossing, Lakes of Fairhaven and all of Cypress.",
    },
    faqs: [
      {
        question: "How far is the House from Cypress?",
        answer:
          "About 30 minutes from Towne Lake, east on US 290 and across Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060, off I-45 at Rankin Road.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Wheels and fitment, suspension and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Should wheels and suspension be planned together?",
        answer:
          "Yes. Ride height changes what fits, so the House specifies both at the consultation and installs them as one build.",
      },
      {
        question: "How do I start a build from Cypress?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "range-rover-rose-pink-interior",
    preselectService: "wheels-and-fitment",
  },
  spring: {
    slug: "spring",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "Vehicle Wraps and Blackout Packages in Spring, TX",
    description:
      "Vehicle wraps and blackout packages for Spring, minutes down I-45 at 18235 Ammi Trail in Houston. Color and trim finish designed as one build.",
    h1: { line1: "Spring.", line2: "The Automotive Customization House." },
    lede:
      "Spring is the shortest drive to the House. Fifteen minutes down I-45 to Ammi Trail, where wraps and blackout work are designed together and finished in house.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "A new color. Nothing bright left.",
      lede: "The wrap sets the color and the blackout takes every chrome detail with it.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change or partial wraps in premium cast vinyl, including roof and hood treatments. Designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Emblems, grilles, window trim and accents taken to gloss, satin or matte black so nothing interrupts the new color.",
        image: "/blackout-overview.webp",
        imageAlt: "Blacked-out Land Rover Defender in a studio bay with overhead lighting",
      },
    },
    access: {
      headline: "Fifteen minutes down I-45.",
      where:
        "South on I-45 from Spring to the Rankin Road exit in north Houston, just north of Beltway 8.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Old Town Spring",
          via: "I-45 South",
          time: "About 15 min",
          x: 339, y: 30, labelX: 213, labelY: 29,
          d: "M339 30 C319 63 324 105 328 132",
        },
        {
          from: "Klein",
          via: "FM 1960 to I-45 South",
          time: "About 20 min",
          x: 232, y: 45, labelX: 174, labelY: 65,
          d: "M232 45 C279 59 309 102 328 132",
        },
        {
          from: "Gleannloch Farms",
          via: "Grand Parkway to I-45",
          time: "About 25 min",
          x: 201, y: 31, labelX: 67, labelY: 30,
          d: "M201 31 C228 86 288 115 328 132",
        },
      ],
      neighborhoods:
        "Serving Old Town Spring, Klein, Gleannloch Farms, Champion Forest, Spring Lakes, Northgate Forest and all of Spring.",
    },
    faqs: [
      {
        question: "How far is the House from Spring?",
        answer:
          "About 15 minutes from Old Town Spring, south on I-45 to the Rankin Road exit. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can a wrap and a blackout package be done together?",
        answer:
          "Yes. The color and the trim finish are decided at the same consultation, so the wrap and the blackout are completed as one build.",
      },
      {
        question: "How do I start a build from Spring?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "corvette-desert-tan-wrap",
    preselectService: "vehicle-wraps",
  },
  tomball: {
    slug: "tomball",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Truck Accessories and Suspension in Tomball, TX",
    description:
      "Truck accessories, lift and leveling kits for Tomball, fitted at 18235 Ammi Trail in Houston. Bumpers, racks and suspension planned as one build.",
    h1: { line1: "Tomball.", line2: "The Automotive Customization House." },
    lede:
      "Tomball trucks come down SH 249 to Ammi Trail. Accessories and suspension are fitted together, so the bumpers, steps and lift work as one setup.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "Lifted, fitted, finished.",
      lede: "Accessories and suspension fitted at the same time, by the team that fits the wheels.",
      primary: {
        slug: "truck-accessories",
        title: "Truck Accessories",
        copy:
          "Bumpers, steps, racks, bed covers and off-road equipment, fitted and finished in house alongside the wheels and suspension.",
        image: "",
        imageAlt: "Truck accessories fitted at the House",
      },
      secondary: {
        slug: "suspension",
        title: "Suspension",
        copy:
          "Lift and leveling kits, coilovers and air suspension, installed with alignment and matched to the wheel and tire package.",
        image: "",
        imageAlt: "Suspension installed and aligned at the House",
      },
    },
    access: {
      headline: "Down 249. Across the Beltway.",
      where:
        "South on SH 249 from Tomball, east on Beltway 8, then north on I-45 to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Old Town Tomball",
          via: "SH 249 to Beltway 8",
          time: "About 25 min",
          x: 236, y: 28, labelX: 246, labelY: 42,
          d: "M236 28 C251 78 297 112 328 132",
        },
        {
          from: "Northpointe",
          via: "SH 249 to Beltway 8",
          time: "About 20 min",
          x: 170, y: 39, labelX: 75, labelY: 38,
          d: "M170 39 C239 45 294 96 328 132",
        },
        {
          from: "Rosehill",
          via: "FM 2920 to SH 249",
          time: "About 35 min",
          x: 202, y: 26, labelX: 142, labelY: 61,
          d: "M202 26 C228 82 288 114 328 132",
        },
      ],
      neighborhoods:
        "Serving Old Town Tomball, Northpointe, Rosehill, Lakewood Forest and the communities along SH 249.",
    },
    faqs: [
      {
        question: "How far is the House from Tomball?",
        answer:
          "About 25 minutes from Old Town Tomball, down SH 249 and across Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Can I add truck accessories when I lift my truck?",
        answer:
          "Yes. Accessories and suspension are fitted together at the House, so bumpers, steps and the lift are set up as one build.",
      },
      {
        question: "How do I start a build from Tomball?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "sierra-blackout-lift",
    preselectService: "truck-accessories",
  },
  humble: {
    slug: "humble",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "Blackout Packages and Truck Accessories in Humble, TX",
    description:
      "Blackout packages and truck accessories for Humble, about 15 minutes from 18235 Ammi Trail. Trim, bumpers and racks finished as one build, in-house.",
    h1: { line1: "Humble.", line2: "The Automotive Customization House." },
    lede:
      "Humble sits just east of the House. Blackout work and truck accessories are specified together at Ammi Trail, so new parts arrive already matched to the finish.",
    hero: {
      image: "/featurebuild4denali.webp",
      alt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift",
    },
    pair: {
      headline: "Blacked out. Built out.",
      lede: "Every bright detail taken dark, with the accessories finished to match.",
      primary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Chrome delete, badging and grille work in gloss, satin or matte black, carried across every trim piece on the truck.",
        image: "/blackout-overview.webp",
        imageAlt: "Blacked-out Land Rover Defender in a studio bay with overhead lighting",
      },
      secondary: {
        slug: "truck-accessories",
        title: "Truck Accessories",
        copy:
          "Bumpers, steps, racks and bed covers fitted and finished in house, matched to the blackout rather than added after it.",
        image: "",
        imageAlt: "Truck accessories fitted at the House",
      },
    },
    access: {
      headline: "Fifteen minutes west.",
      where:
        "West on Beltway 8 from Humble to I-45, then north one exit to Rankin Road in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Old Town Humble",
          via: "Beltway 8 West",
          time: "About 15 min",
          x: 496, y: 113, labelX: 490, labelY: 148,
          d: "M496 113 C454 48 362 54 328 132",
        },
        {
          from: "Atascocita",
          via: "FM 1960 West",
          time: "About 25 min",
          x: 559, y: 127, labelX: 535, labelY: 99,
          d: "M559 127 C501 55 362 61 328 132",
        },
        {
          from: "Fall Creek",
          via: "Beltway 8 West",
          time: "About 20 min",
          x: 526, y: 181, labelX: 535, labelY: 180,
          d: "M526 181 C467 282 306 212 328 132",
        },
      ],
      neighborhoods:
        "Serving Old Town Humble, Atascocita, Fall Creek, Eagle Springs, Walden on Lake Houston and the rest of the Humble area.",
    },
    faqs: [
      {
        question: "How far is the House from Humble?",
        answer:
          "About 15 minutes from Old Town Humble, west on Beltway 8 to I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Blackout packages, truck accessories and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can truck accessories be finished to match a blackout package?",
        answer:
          "Yes. The accessories and the blackout are specified at the same consultation, so the finish is consistent across the truck.",
      },
      {
        question: "How do I start a build from Humble?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "g-class-satin-black-wrap",
    preselectService: "blackout-packages",
  },
  kingwood: {
    slug: "kingwood",
    /* Tranche 1, indexed October 2 2026. */
    indexable: true,
    title: "PPF and Custom Wheels in Kingwood, TX",
    description:
      "Paint protection film and custom wheels for Kingwood, at 18235 Ammi Trail in Houston. Protection and fitment planned as one build, installed in-house.",
    h1: { line1: "Kingwood.", line2: "The Automotive Customization House." },
    lede:
      "Kingwood builds come down US 59 and across the Beltway to Ammi Trail. Paint protection and new wheels are planned at one consultation and installed by one team.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "Protect the paint. Change the stance.",
      lede: "Film and wheels on the same build, scoped together so neither waits on the other.",
      primary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Self-healing film in partial, track or full-body coverage, patterned and cut in house with the edges wrapped out of sight.",
        image: "/ppf-overview.webp",
        imageAlt: "Stealth-finished Range Rover Sport after full paint protection film",
      },
      secondary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Forged and flow-formed wheels with offset and stance planned to the car. Tire pairing, TPMS and road force balancing in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
    },
    access: {
      headline: "Down 59. West on the Beltway.",
      where:
        "South on US 59 from Kingwood, west on Beltway 8, then north on I-45 to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Kingwood Town Center",
          via: "US 59 to Beltway 8",
          time: "About 25 min",
          x: 562, y: 67, labelX: 455, labelY: 51,
          d: "M562 67 C504 48 362 54 328 132",
        },
        {
          from: "Forest Cove",
          via: "US 59 to Beltway 8",
          time: "About 25 min",
          x: 528, y: 82, labelX: 490, labelY: 102,
          d: "M528 82 C478 55 362 61 328 132",
        },
        {
          from: "Porter",
          via: "Grand Parkway to I-45",
          time: "About 30 min",
          x: 556, y: 27, labelX: 565, labelY: 29,
          d: "M556 27 C499 27 362 68 328 132",
        },
      ],
      neighborhoods:
        "Serving Kingwood Town Center, Forest Cove, Kings Harbor, Elm Grove, Porter and every village in Kingwood.",
    },
    faqs: [
      {
        question: "How far is the House from Kingwood?",
        answer:
          "About 25 minutes from Kingwood Town Center, down US 59 and west on Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can I add paint protection film when I change my wheels?",
        answer:
          "Yes. Both are scoped at the consultation and completed as one build, so the vehicle comes back once rather than twice.",
      },
      {
        question: "How do I start a build from Kingwood?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "cadillac-iq-monochromatic",
    preselectService: "paint-protection-film",
  },
  pearland: {
    slug: "pearland",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Vehicle Wraps and Car Audio in Pearland, TX",
    description:
      "Vehicle wraps and custom car audio for Pearland, built at 18235 Ammi Trail in Houston. Color and sound designed together, then installed in-house.",
    h1: { line1: "Pearland.", line2: "The Automotive Customization House." },
    lede:
      "Pearland builds come up SH 288 and I-45 to Ammi Trail. Wraps and audio are designed at the same consultation, so how the car looks and how it sounds are one plan.",
    hero: {
      image: "/featurebuild1cadillac.webp",
      alt: "Cadillac IQ wrapped in Satin Silver White Aluminum on color matched wheels",
    },
    pair: {
      headline: "How it looks. How it sounds.",
      lede: "A color change outside and a tuned system inside, delivered as one build.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change, partial wraps and roof and hood treatments in premium cast vinyl, designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "audio",
        title: "Audio",
        copy:
          "Speakers, amplifiers, subwoofers and DSP with sound deadening and custom enclosures. Fabricated and tuned in house.",
        image: "",
        imageAlt: "Custom audio system fabricated at the House",
      },
    },
    access: {
      headline: "Up 288. Straight up I-45.",
      where:
        "North on SH 288 from Pearland into I-45 North, then straight up to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Shadow Creek Ranch",
          via: "SH 288 to I-45 North",
          time: "About 40 min",
          x: 203, y: 504, labelX: 54, labelY: 503,
          d: "M203 504 C289 392 315 235 328 132",
        },
        {
          from: "Pearland Town Center",
          via: "SH 288 to I-45 North",
          time: "About 40 min",
          x: 235, y: 515, labelX: 71, labelY: 526,
          d: "M235 515 C222 374 284 227 328 132",
        },
        {
          from: "Old Town Pearland",
          via: "SH 35 to I-45 North",
          time: "About 40 min",
          x: 319, y: 515, labelX: 328, labelY: 523,
          d: "M319 515 C368 386 346 232 328 132",
        },
      ],
      neighborhoods:
        "Serving Shadow Creek Ranch, Silverlake, Pearland Town Center, Old Town Pearland, Southwyck and all of Pearland.",
    },
    faqs: [
      {
        question: "How far is the House from Pearland?",
        answer:
          "About 40 minutes from Shadow Creek Ranch, up SH 288 and I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Can I get a wrap and an audio upgrade on the same build?",
        answer:
          "Yes. The exterior and the system are scoped together at the consultation and completed by the same team.",
      },
      {
        question: "How do I start a build from Pearland?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "g-class-satin-black-wrap",
    preselectService: "vehicle-wraps",
  },
  friendswood: {
    slug: "friendswood",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Custom Paint and PPF in Friendswood, TX",
    description:
      "Custom paint, panel repair and paint protection film for Friendswood, finished at 18235 Ammi Trail in Houston in the House's own booth.",
    h1: { line1: "Friendswood.", line2: "The Automotive Customization House." },
    lede:
      "Friendswood builds come straight up I-45 to Ammi Trail. Paint is refinished in the House's own booth, then protected with film by the same team.",
    hero: {
      image: "/featurebuild5corvette.webp",
      alt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    },
    pair: {
      headline: "Refinished. Then protected.",
      lede: "New paint and the film that keeps it, planned at one consultation.",
      primary: {
        slug: "paint-and-body",
        title: "Paint & Body",
        copy:
          "Full and partial repaints, custom color, panel repair and refinishing, executed in the House's own booth.",
        image: "",
        imageAlt: "Paint and body work refinished in the House booth",
      },
      secondary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Self-healing film over the finish, in partial, track or full-body coverage, cut in house with wrapped edges.",
        image: "/ppf-overview.webp",
        imageAlt: "Stealth-finished Range Rover Sport after full paint protection film",
      },
    },
    access: {
      headline: "Straight up I-45.",
      where:
        "North on I-45 from Friendswood, through downtown and up to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Friendswood",
          via: "I-45 North",
          time: "About 45 min",
          x: 378, y: 522, labelX: 352, labelY: 542,
          d: "M378 522 C407 384 362 231 328 132",
        },
        {
          from: "West Ranch",
          via: "FM 528 to I-45 North",
          time: "About 45 min",
          x: 343, y: 524, labelX: 256, labelY: 532,
          d: "M343 524 C292 392 311 235 328 132",
        },
        {
          from: "Baybrook",
          via: "I-45 North",
          time: "About 45 min",
          x: 426, y: 520, labelX: 435, labelY: 519,
          d: "M426 520 C437 377 374 228 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Friendswood, West Ranch, Wedgewood Village, Polly Ranch, Baybrook and all of Friendswood.",
    },
    faqs: [
      {
        question: "How far is the House from Friendswood?",
        answer:
          "About 45 minutes from downtown Friendswood, straight up I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Paint and body, paint protection film and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can paint protection film be added after a repaint?",
        answer:
          "Yes. Paint and film are scoped together at the consultation and completed by the same team, so the film is planned around the new finish.",
      },
      {
        question: "How do I start a build from Friendswood?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "lamborghini-sto-dsb-el-chavez",
    preselectService: "paint-and-body",
  },
  "league-city": {
    slug: "league-city",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "PPF and Automotive Lighting in League City, TX",
    description:
      "Paint protection film and automotive lighting for League City, at 18235 Ammi Trail in Houston. Film, headlight and accent work installed in-house.",
    h1: { line1: "League City.", line2: "The Automotive Customization House." },
    lede:
      "League City builds come up I-45 from the Bay Area to Ammi Trail. Paint protection and lighting are planned together and installed by one team.",
    hero: {
      image: "/featurebuild1cadillac.webp",
      alt: "Cadillac IQ wrapped in Satin Silver White Aluminum on color matched wheels",
    },
    pair: {
      headline: "Protected by day. Lit by night.",
      lede: "Film over the paint and new lighting, scoped together and finished in house.",
      primary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Self-healing film against sun, salt air and road debris along I-45. Partial, track or full-body coverage, cut in house.",
        image: "/ppf-overview.webp",
        imageAlt: "Stealth-finished Range Rover Sport after full paint protection film",
      },
      secondary: {
        slug: "lighting",
        title: "Lighting",
        copy:
          "Headlight and taillight work, ambient interior lighting and accent lighting, wired and installed in house.",
        image: "",
        imageAlt: "Automotive lighting wired and installed at the House",
      },
    },
    access: {
      headline: "Up from the Bay Area.",
      where:
        "North on I-45 from League City, through downtown Houston and up to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown League City",
          via: "I-45 North",
          time: "About 45 min",
          x: 454, y: 525, labelX: 431, labelY: 545,
          d: "M454 525 C455 377 380 228 328 132",
        },
        {
          from: "South Shore Harbour",
          via: "FM 2094 to I-45 North",
          time: "About 50 min",
          x: 499, y: 524, labelX: 465, labelY: 511,
          d: "M499 524 C399 409 353 242 328 132",
        },
        {
          from: "Tuscan Lakes",
          via: "FM 646 to I-45 North",
          time: "About 50 min",
          x: 420, y: 528, labelX: 329, labelY: 548,
          d: "M420 528 C434 383 372 230 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown League City, South Shore Harbour, Tuscan Lakes, Victory Lakes, Bay Colony and the rest of League City.",
    },
    faqs: [
      {
        question: "How far is the House from League City?",
        answer:
          "About 45 minutes from downtown League City, straight up I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can I add lighting when I get paint protection film?",
        answer:
          "Yes. Both are scoped at the same consultation and installed by the House team as one build.",
      },
      {
        question: "How do I start a build from League City?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "sierra-blackout-lift",
    preselectService: "paint-protection-film",
  },
  "missouri-city": {
    slug: "missouri-city",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Custom Interiors and Car Audio in Missouri City, TX",
    description:
      "Interior transformations and custom car audio for Missouri City, built at 18235 Ammi Trail in Houston. The cabin and the system planned as one.",
    h1: { line1: "Missouri City.", line2: "The Automotive Customization House." },
    lede:
      "Missouri City builds come up US 59 to Ammi Trail. Interior and audio are designed together, so the cabin is built around the system rather than cut to fit it.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "A new cabin. A tuned system.",
      lede: "Retrim and audio planned at the same consultation, built by one team.",
      primary: {
        slug: "interior-transformation",
        title: "Interior Transformation",
        copy:
          "Full leather and technical textile retrims, bespoke stitching, suede headliners and console work, built in house.",
        image: "",
        imageAlt: "Custom interior retrim built at the House",
      },
      secondary: {
        slug: "audio",
        title: "Audio",
        copy:
          "Speakers, amplifiers, subwoofers and DSP with sound deadening and custom enclosures, fabricated and tuned in house.",
        image: "",
        imageAlt: "Custom audio system fabricated at the House",
      },
    },
    access: {
      headline: "Up 59. Straight to the House.",
      where:
        "North on US 59 from Missouri City to I-45, then north to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Sienna",
          via: "SH 6 to US 59 North",
          time: "About 45 min",
          x: 110, y: 522, labelX: 54, labelY: 521,
          d: "M110 522 C224 412 289 243 328 132",
        },
        {
          from: "Quail Valley",
          via: "US 59 North",
          time: "About 40 min",
          x: 83, y: 501, labelX: 8, labelY: 539,
          d: "M83 501 C128 350 247 216 328 132",
        },
        {
          from: "Lake Olympia",
          via: "US 59 North",
          time: "About 40 min",
          x: 134, y: 498, labelX: 119, labelY: 524,
          d: "M134 498 C241 395 296 237 328 132",
        },
      ],
      neighborhoods:
        "Serving Sienna, Quail Valley, Lake Olympia, Riverstone, Vicksburg and all of Missouri City.",
    },
    faqs: [
      {
        question: "How far is the House from Missouri City?",
        answer:
          "About 40 minutes from Quail Valley, up US 59 and I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Should interior and audio be planned together?",
        answer:
          "Yes. Speaker and enclosure placement affects the trim, so the House scopes both at the consultation and builds them as one.",
      },
      {
        question: "How do I start a build from Missouri City?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "lamborghini-sto-dsb-el-chavez",
    preselectService: "interior-transformation",
  },
  pasadena: {
    slug: "pasadena",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Vehicle Wraps and Truck Accessories in Pasadena, TX",
    description:
      "Vehicle wraps and truck accessories for Pasadena, built at 18235 Ammi Trail in Houston. Color, bumpers and racks designed and fitted in-house.",
    h1: { line1: "Pasadena.", line2: "The Automotive Customization House." },
    lede:
      "Pasadena builds come up SH 225 and Loop 610 to I-45 and Ammi Trail. Wraps and truck accessories are designed together and fitted by the same team.",
    hero: {
      image: "/featurebuild4denali.webp",
      alt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift",
    },
    pair: {
      headline: "A new color. A working truck.",
      lede: "The wrap and the accessories, specified together and finished in house.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change and partial wraps in premium cast vinyl, including roof and hood treatments. Designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "truck-accessories",
        title: "Truck Accessories",
        copy:
          "Bumpers, steps, racks and bed covers, fitted and finished in house alongside wheels and suspension.",
        image: "",
        imageAlt: "Truck accessories fitted at the House",
      },
    },
    access: {
      headline: "225 to the Loop. Up I-45.",
      where:
        "West on SH 225 from Pasadena, around Loop 610 to I-45, then north to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Pasadena",
          via: "SH 225 to I-45 North",
          time: "About 30 min",
          x: 435, y: 466, labelX: 312, labelY: 489,
          d: "M435 466 C442 338 376 213 328 132",
        },
        {
          from: "Spencer Highway",
          via: "Beltway 8 North",
          time: "About 35 min",
          x: 461, y: 488, labelX: 362, labelY: 508,
          d: "M461 488 C373 383 343 232 328 132",
        },
        {
          from: "Fairmont Parkway",
          via: "Beltway 8 North",
          time: "About 35 min",
          x: 493, y: 499, labelX: 482, labelY: 519,
          d: "M493 499 C479 355 390 219 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Pasadena, Golden Acres, Red Bluff, Spencer Highway, Fairmont Parkway and all of Pasadena.",
    },
    faqs: [
      {
        question: "How far is the House from Pasadena?",
        answer:
          "About 30 minutes from downtown Pasadena, west on SH 225 and up I-45. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Vehicle wraps, truck accessories and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can a truck with accessories be wrapped?",
        answer:
          "Yes. The House scopes the wrap and the accessories together, so the parts and the color are planned as one build.",
      },
      {
        question: "How do I start a build from Pasadena?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "corvette-desert-tan-wrap",
    preselectService: "vehicle-wraps",
  },
  baytown: {
    slug: "baytown",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Truck Accessories and Lighting in Baytown, TX",
    description:
      "Truck accessories and automotive lighting for Baytown, fitted at 18235 Ammi Trail in Houston. Bumpers, racks and lighting wired and installed in-house.",
    h1: { line1: "Baytown.", line2: "The Automotive Customization House." },
    lede:
      "Baytown builds come in on I-10 and around the Beltway to Ammi Trail. Accessories and lighting are fitted together, wired by the same team that mounts them.",
    hero: {
      image: "/featurebuild5corvette.webp",
      alt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    },
    pair: {
      headline: "Fitted out. Lit up.",
      lede: "Accessories and lighting planned as one install, wired in house.",
      primary: {
        slug: "truck-accessories",
        title: "Truck Accessories",
        copy:
          "Bumpers, steps, racks and off-road equipment, fitted and finished in house alongside wheels and suspension.",
        image: "",
        imageAlt: "Truck accessories fitted at the House",
      },
      secondary: {
        slug: "lighting",
        title: "Lighting",
        copy:
          "Headlight and taillight work, accent and ambient lighting, wired and installed in house to work with the accessories.",
        image: "",
        imageAlt: "Automotive lighting wired and installed at the House",
      },
    },
    access: {
      headline: "I-10 to the Beltway.",
      where:
        "West on I-10 from Baytown, north on Beltway 8, then I-45 North to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Baytown",
          via: "I-10 West to Beltway 8",
          time: "About 35 min",
          x: 588, y: 361, labelX: 454, labelY: 363,
          d: "M588 361 C530 282 322 212 328 132",
        },
        {
          from: "Cedar Bayou",
          via: "I-10 West to Beltway 8",
          time: "About 40 min",
          x: 594, y: 314, labelX: 529, labelY: 286,
          d: "M594 314 C478 290 385 196 328 132",
        },
        {
          from: "Highlands",
          via: "Beltway 8 North",
          time: "About 30 min",
          x: 561, y: 305, labelX: 481, labelY: 337,
          d: "M561 305 C509 282 306 212 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Baytown, Cedar Bayou, Highlands, Mont Belvieu and the rest of the Baytown area.",
    },
    faqs: [
      {
        question: "How far is the House from Baytown?",
        answer:
          "About 35 minutes from downtown Baytown, west on I-10 and around Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can lighting be installed with new truck accessories?",
        answer:
          "Yes. The accessories and the lighting are scoped together, so mounting and wiring are planned as one install.",
      },
      {
        question: "How do I start a build from Baytown?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "sierra-blackout-lift",
    preselectService: "truck-accessories",
  },
  conroe: {
    slug: "conroe",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Suspension and Lighting in Conroe, TX",
    description:
      "Suspension, lift and leveling kits and automotive lighting for Conroe, installed with alignment at 18235 Ammi Trail in Houston, all in-house.",
    h1: { line1: "Conroe.", line2: "The Automotive Customization House." },
    lede:
      "Conroe builds come straight down I-45 to Ammi Trail. Suspension and lighting are planned together, so ride height and light placement are settled as one.",
    hero: {
      image: "/featurebuild6benz.webp",
      alt: "Mercedes-AMG G 63 in a full satin black wrap with blacked out badging",
    },
    pair: {
      headline: "Higher stance. Better light.",
      lede: "Lift or level, then light it properly, scoped at one consultation.",
      primary: {
        slug: "suspension",
        title: "Suspension",
        copy:
          "Lift and leveling kits, coilovers and air suspension, installed with alignment and matched to the wheel package.",
        image: "",
        imageAlt: "Suspension installed and aligned at the House",
      },
      secondary: {
        slug: "lighting",
        title: "Lighting",
        copy:
          "Headlight, taillight and accent lighting, wired and installed in house and placed for the new ride height.",
        image: "",
        imageAlt: "Automotive lighting wired and installed at the House",
      },
    },
    access: {
      headline: "Straight down I-45.",
      where:
        "South on I-45 from Conroe, past The Woodlands and Spring, to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Conroe",
          via: "I-45 South",
          time: "About 35 min",
          x: 347, y: 31, labelX: 359, labelY: 48,
          d: "M347 31 C324 62 326 104 328 132",
        },
        {
          from: "Lake Conroe",
          via: "SH 105 to I-45 South",
          time: "About 45 min",
          x: 292, y: 26, labelX: 197, labelY: 28,
          d: "M292 26 C321 56 326 102 328 132",
        },
        {
          from: "Grand Central Park",
          via: "I-45 South",
          time: "About 30 min",
          x: 326, y: 26, labelX: 162, labelY: 52,
          d: "M326 26 C310 62 320 105 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Conroe, Lake Conroe, Grand Central Park, Woodforest, April Sound and the rest of the Conroe area.",
    },
    faqs: [
      {
        question: "How far is the House from Conroe?",
        answer:
          "About 35 minutes from downtown Conroe, straight down I-45. The House is at 18235 Ammi Trail, Houston, TX 77060, at the Rankin Road exit.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Should lighting be planned with a lift?",
        answer:
          "Yes. Ride height changes where lighting sits, so the House scopes the suspension and the lighting together and installs them as one build.",
      },
      {
        question: "How do I start a build from Conroe?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "sierra-blackout-lift",
    preselectService: "suspension",
  },
  richmond: {
    slug: "richmond",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Custom Paint and Wheels in Richmond, TX",
    description:
      "Custom paint, panel repair and custom wheels for Richmond, finished at 18235 Ammi Trail in Houston. Color and fitment planned as one build.",
    h1: { line1: "Richmond.", line2: "The Automotive Customization House." },
    lede:
      "Richmond builds come up US 59 and around the Beltway to Ammi Trail. Paint and wheels are specified together, so the color and the fitment are decided as one.",
    hero: {
      image: "/featurebuild5corvette.webp",
      alt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    },
    pair: {
      headline: "New paint. The wheels to match.",
      lede: "Refinish and fitment, planned at one consultation and finished in house.",
      primary: {
        slug: "paint-and-body",
        title: "Paint & Body",
        copy:
          "Full and partial repaints, custom color and panel repair, refinished in the House's own booth.",
        image: "",
        imageAlt: "Paint and body work refinished in the House booth",
      },
      secondary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Forged and flow-formed wheels, finished to sit with the new paint. Offset, tire pairing and road force balancing in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
    },
    access: {
      headline: "From the Brazos to the Beltway.",
      where:
        "North on US 59 from Richmond, around Beltway 8 to I-45, then north to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Richmond",
          via: "US 59 to Beltway 8",
          time: "About 45 min",
          x: 27, y: 370, labelX: 46, labelY: 387,
          d: "M27 370 C158 325 263 210 328 132",
        },
        {
          from: "Harvest Green",
          via: "Grand Parkway to US 59",
          time: "About 50 min",
          x: 29, y: 404, labelX: 39, labelY: 406,
          d: "M29 404 C100 277 236 187 328 132",
        },
        {
          from: "Long Meadow Farms",
          via: "Grand Parkway to US 59",
          time: "About 45 min",
          x: 32, y: 337, labelX: 63, labelY: 369,
          d: "M32 337 C159 305 263 202 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Richmond, Harvest Green, Long Meadow Farms, Pecan Grove, Aliana and the rest of Richmond.",
    },
    faqs: [
      {
        question: "How far is the House from Richmond?",
        answer:
          "About 45 minutes from downtown Richmond, up US 59 and around Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Paint and body, wheels and fitment and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can wheels be finished to match new paint?",
        answer:
          "Yes. The paint and the wheels are scoped together at the consultation, so the finish and the fitment are planned as one build.",
      },
      {
        question: "How do I start a build from Richmond?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "range-rover-rose-pink-interior",
    preselectService: "paint-and-body",
  },
  fulshear: {
    slug: "fulshear",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Vehicle Wraps and Custom Interiors in Fulshear, TX",
    description:
      "Vehicle wraps and interior transformations for Fulshear, designed at 18235 Ammi Trail in Houston. Exterior color and cabin specified as one build.",
    h1: { line1: "Fulshear.", line2: "The Automotive Customization House." },
    lede:
      "Fulshear builds come east on I-10 and around the Beltway to Ammi Trail. Wraps and interiors are designed together, so the outside and the cabin are one specification.",
    hero: {
      image: "/featurebuild1cadillac.webp",
      alt: "Cadillac IQ wrapped in Satin Silver White Aluminum on color matched wheels",
    },
    pair: {
      headline: "Outside and in, one specification.",
      lede: "A color change and a retrimmed cabin, decided at the same consultation.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change or partial wraps in premium cast vinyl, designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "interior-transformation",
        title: "Interior Transformation",
        copy:
          "Full leather and technical textile retrims, bespoke stitching and suede headliners, specified to sit with the new color.",
        image: "",
        imageAlt: "Custom interior retrim built at the House",
      },
    },
    access: {
      headline: "East on I-10. North on the Beltway.",
      where:
        "East on I-10 from Fulshear, north on Beltway 8, then I-45 North to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Fulshear",
          via: "I-10 East to Beltway 8",
          time: "About 50 min",
          x: 26, y: 219, labelX: 6, labelY: 194,
          d: "M26 219 C141 234 255 175 328 132",
        },
        {
          from: "Cross Creek Ranch",
          via: "Westpark Tollway to Beltway 8",
          time: "About 50 min",
          x: 29, y: 287, labelX: 39, labelY: 292,
          d: "M29 287 C109 193 241 154 328 132",
        },
        {
          from: "Weston Lakes",
          via: "I-10 East to Beltway 8",
          time: "About 55 min",
          x: 26, y: 253, labelX: 59, labelY: 270,
          d: "M26 253 C146 255 257 183 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Fulshear, Cross Creek Ranch, Fulbrook on Fulshear Creek, Weston Lakes, Tamarron and the rest of Fulshear.",
    },
    faqs: [
      {
        question: "How far is the House from Fulshear?",
        answer:
          "About 50 minutes from downtown Fulshear, east on I-10 and around Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Can an interior be specified to match a wrap?",
        answer:
          "Yes. The color and the cabin are scoped together at the consultation, so the interior is chosen against the actual wrap.",
      },
      {
        question: "How do I start a build from Fulshear?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "lamborghini-sto-dsb-el-chavez",
    preselectService: "vehicle-wraps",
  },
  bellaire: {
    slug: "bellaire",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Custom Interiors and Paint in Bellaire, TX",
    description:
      "Interior transformations and custom paint for Bellaire, built at 18235 Ammi Trail in Houston. Cabin and finish specified together, all in-house.",
    h1: { line1: "Bellaire.", line2: "The Automotive Customization House." },
    lede:
      "Bellaire builds come up Loop 610 and I-45 to Ammi Trail. Interiors and paint are specified together, so the cabin and the finish are one decision.",
    hero: {
      image: "/featurebuild1cadillac.webp",
      alt: "Cadillac IQ wrapped in Satin Silver White Aluminum on color matched wheels",
    },
    pair: {
      headline: "The cabin and the finish, together.",
      lede: "Retrim and refinish planned at one consultation and built in house.",
      primary: {
        slug: "interior-transformation",
        title: "Interior Transformation",
        copy:
          "Full leather and technical textile retrims, bespoke stitching, suede headliners and console work, built in house.",
        image: "",
        imageAlt: "Custom interior retrim built at the House",
      },
      secondary: {
        slug: "paint-and-body",
        title: "Paint & Body",
        copy:
          "Full and partial repaints, custom color and panel refinishing in the House's own booth.",
        image: "",
        imageAlt: "Paint and body work refinished in the House booth",
      },
    },
    access: {
      headline: "Around the Loop. Up I-45.",
      where:
        "North on Loop 610 from Bellaire, east to I-45, then north to the Rankin Road exit in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Bellaire Town Square",
          via: "Loop 610 to I-45 North",
          time: "About 30 min",
          x: 180, y: 428, labelX: 28, labelY: 454,
          d: "M180 428 C271 348 308 218 328 132",
        },
        {
          from: "West Bellaire",
          via: "US 59 to I-45 North",
          time: "About 30 min",
          x: 146, y: 432, labelX: 36, labelY: 431,
          d: "M146 432 C169 306 263 199 328 132",
        },
      ],
      neighborhoods:
        "Serving Bellaire Town Square, Evelyn's Park, Bellaire Boulevard and every street in Bellaire.",
    },
    faqs: [
      {
        question: "How far is the House from Bellaire?",
        answer:
          "About 30 minutes from Bellaire Town Square, around Loop 610 and up I-45. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "What hours is the House open?",
        answer:
          "Monday to Friday, 8 AM to 5 PM, closed Saturday and Sunday. Requests through Design Your Build can be sent at any time.",
      },
      {
        question: "Can a custom interior be matched to new paint?",
        answer:
          "Yes. The interior and the paint are scoped at the same consultation so the cabin and the finish are planned as one build.",
      },
      {
        question: "How do I start a build from Bellaire?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "lamborghini-sto-dsb-el-chavez",
    preselectService: "interior-transformation",
  },
  memorial: {
    slug: "memorial",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Vehicle Wraps and Wheels in Memorial, Houston, TX",
    description:
      "Vehicle wraps and custom wheels for Memorial, built at 18235 Ammi Trail in north Houston. Color and fitment designed together, all in-house.",
    h1: { line1: "Memorial.", line2: "The Automotive Customization House." },
    lede:
      "Memorial builds come up Beltway 8 to Ammi Trail. Wraps and wheels are designed at the same consultation, so the color and the stance are one specification.",
    hero: {
      image: "/featurebuild5corvette.webp",
      alt: "Chevrolet Corvette Stingray C8 wrapped in Gloss Desert Tan with a gloss black roof",
    },
    pair: {
      headline: "A new color. The right stance.",
      lede: "Wrap and wheels specified together and finished by one team.",
      primary: {
        slug: "vehicle-wraps",
        title: "Vehicle Wraps",
        copy:
          "Full color change, partial wraps and roof and hood treatments in premium cast vinyl, designed and installed in house.",
        image: "",
        imageAlt: "Vehicle wrap installed at the House",
      },
      secondary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Forged and flow-formed wheels with offset and stance planned to the car. Tire pairing, TPMS and road force balancing in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
    },
    access: {
      headline: "Up the Beltway.",
      where:
        "North on Beltway 8 from Memorial, around to I-45, then north one exit to Rankin Road in north Houston.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Memorial City",
          via: "Beltway 8 North",
          time: "About 30 min",
          x: 113, y: 329, labelX: 15, labelY: 349,
          d: "M113 329 C217 296 286 198 328 132",
        },
        {
          from: "Memorial Villages",
          via: "Beltway 8 North",
          time: "About 30 min",
          x: 134, y: 356, labelX: 6, labelY: 376,
          d: "M134 356 C165 250 262 177 328 132",
        },
        {
          from: "Memorial Park",
          via: "I-10 to I-45 North",
          time: "About 25 min",
          x: 216, y: 361, labelX: 141, labelY: 381,
          d: "M216 361 C291 301 315 200 328 132",
        },
      ],
      neighborhoods:
        "Serving Memorial City, the Memorial Villages, Memorial Park, Spring Branch, Briar Forest and the rest of Memorial.",
    },
    faqs: [
      {
        question: "How far is the House from Memorial?",
        answer:
          "About 30 minutes from Memorial City, north on Beltway 8 and around to I-45. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Vehicle wraps, wheels and fitment and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can wheels be color matched to a wrap?",
        answer:
          "Yes. When the wrap and the wheels are decided together, the wheel finish is matched against the actual film rather than a sample.",
      },
      {
        question: "How do I start a build from Memorial?",
        answer:
          "Send your vehicle and goals through Design Your Build, or call or text (832) 402-9174. The House reviews every request and follows up to plan the build.",
      },
    ],
    featuredBuildSlug: "cadillac-iq-monochromatic",
    preselectService: "vehicle-wraps",
  },
  magnolia: {
    slug: "magnolia",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Truck Accessories and Wheels in Magnolia, TX",
    description:
      "Truck accessories and custom wheels for Magnolia, fitted at 18235 Ammi Trail in Houston. Bumpers, racks, wheels and tires set up as one build.",
    h1: { line1: "Magnolia.", line2: "The Automotive Customization House." },
    lede:
      "Magnolia trucks come down SH 249 to Ammi Trail. Accessories and wheels are fitted together, so bumpers, steps and tires are set up as one.",
    hero: {
      image: "/featurebuild4denali.webp",
      alt: "GMC Sierra Denali HD Ultimate in a two-tone wrap on a suspension lift",
    },
    pair: {
      headline: "Fitted out on the right wheels.",
      lede: "Accessories and wheels planned at one consultation, fitted in house.",
      primary: {
        slug: "truck-accessories",
        title: "Truck Accessories",
        copy:
          "Bumpers, steps, racks, bed covers and off-road equipment, fitted and finished in house alongside the wheels.",
        image: "",
        imageAlt: "Truck accessories fitted at the House",
      },
      secondary: {
        slug: "wheels-and-fitment",
        title: "Wheels & Fitment",
        copy:
          "Wheels and tires paired to the truck, with offset planned around the accessories. TPMS and road force balancing in house.",
        image: "",
        imageAlt: "Custom wheel and fitment work at the House",
      },
    },
    access: {
      headline: "Down 249 to the Beltway.",
      where:
        "South on SH 249 from Magnolia, east on Beltway 8, then north on I-45 to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Downtown Magnolia",
          via: "SH 249 to Beltway 8",
          time: "About 40 min",
          x: 228, y: 26, labelX: 75, labelY: 61,
          d: "M228 26 C245 78 294 112 328 132",
        },
        {
          from: "Pinehurst",
          via: "SH 249 to Beltway 8",
          time: "About 35 min",
          x: 262, y: 26, labelX: 275, labelY: 28,
          d: "M262 26 C301 51 318 100 328 132",
        },
        {
          from: "Stagecoach",
          via: "SH 249 to Beltway 8",
          time: "About 35 min",
          x: 194, y: 26, labelX: 107, labelY: 28,
          d: "M194 26 C223 83 286 114 328 132",
        },
      ],
      neighborhoods:
        "Serving Downtown Magnolia, Pinehurst, Stagecoach and the communities along FM 1488 and SH 249.",
    },
    faqs: [
      {
        question: "How far is the House from Magnolia?",
        answer:
          "About 40 minutes from downtown Magnolia, down SH 249 and across Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Can I send photos of my vehicle before I come in?",
        answer:
          "Yes. Design Your Build and the contact form both take up to three reference photos, so the House can see the vehicle and the inspiration before the consultation.",
      },
      {
        question: "Should wheels be chosen with truck accessories?",
        answer:
          "Yes. Bumpers and steps change what fits, so the House scopes the accessories and the wheels together and fits them as one build.",
      },
      {
        question: "How do I start a build from Magnolia?",
        answer:
          "Start with Design Your Build, or call or text (832) 402-9174. Someone from the House follows up to plan the work.",
      },
    ],
    featuredBuildSlug: "corvette-desert-tan-wrap",
    preselectService: "truck-accessories",
  },
  hockley: {
    slug: "hockley",
    /* Live and rendered, noindex until its tranche. Flip to true to index. */
    indexable: false,
    title: "Suspension and Blackout Packages in Hockley, TX",
    description:
      "Suspension, lift kits and blackout packages for Hockley, installed at 18235 Ammi Trail in Houston. Ride height and finish planned as one build.",
    h1: { line1: "Hockley.", line2: "The Automotive Customization House." },
    lede:
      "Hockley builds come east on US 290 to Ammi Trail. Suspension and blackout work are planned together, so the stance and the finish are settled as one.",
    hero: {
      image: "/featurebuild1cadillac.webp",
      alt: "Cadillac IQ wrapped in Satin Silver White Aluminum on color matched wheels",
    },
    pair: {
      headline: "Lifted. Blacked out.",
      lede: "Ride height and trim finish planned at one consultation.",
      primary: {
        slug: "suspension",
        title: "Suspension",
        copy:
          "Lift and leveling kits, coilovers and air suspension, installed with alignment and matched to the wheel package.",
        image: "",
        imageAlt: "Suspension installed and aligned at the House",
      },
      secondary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Chrome delete, badging, grille and trim taken to gloss, satin or matte black across the whole truck.",
        image: "/blackout-overview.webp",
        imageAlt: "Blacked-out Land Rover Defender in a studio bay with overhead lighting",
      },
    },
    access: {
      headline: "East on 290.",
      where:
        "East on US 290 from Hockley, onto Beltway 8 East, then north on I-45 to the Rankin Road exit.",
      house: { x: 328, y: 132 },
      /* VERIFY: routes and times are our estimates, not Liz's figures. */
      routes: [
        {
          from: "Hockley",
          via: "US 290 to Beltway 8",
          time: "About 45 min",
          x: 36, y: 58, labelX: 45, labelY: 57,
          d: "M36 58 C124 128 247 133 328 132",
        },
        {
          from: "Waller",
          via: "US 290 to Beltway 8",
          time: "About 50 min",
          x: 26, y: 26, labelX: 6, labelY: 85,
          d: "M26 26 C144 19 256 85 328 132",
        },
      ],
      neighborhoods:
        "Serving Hockley, Waller and the communities along US 290 northwest of Houston.",
    },
    faqs: [
      {
        question: "How far is the House from Hockley?",
        answer:
          "About 45 minutes from Hockley, east on US 290 and across Beltway 8. The House is at 18235 Ammi Trail, Houston, TX 77060.",
      },
      {
        question: "Is every part of a build done in-house?",
        answer:
          "Yes. Suspension, blackout packages and the other eight disciplines are completed by the House team at 18235 Ammi Trail. No work is sent to another shop.",
      },
      {
        question: "Can a blackout package be done with a lift?",
        answer:
          "Yes. The suspension and the blackout are scoped together, so the truck comes back finished as one build.",
      },
      {
        question: "How do I start a build from Hockley?",
        answer:
          "Use Design Your Build to send the vehicle, the work you have in mind and up to three photos. Or call or text (832) 402-9174.",
      },
    ],
    featuredBuildSlug: "sierra-blackout-lift",
    preselectService: "suspension",
  },
};

export const getLocationContent = (slug: string): LocationContent | undefined =>
  locationContent[slug];
