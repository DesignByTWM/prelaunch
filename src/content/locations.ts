import { locations } from "@/lib/site";

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
 * `indexable` is per city and deliberately false for Houston while it is
 * in review. Turning it on is a one line change once Liz signs off.
 *
 * ============================================================
 * VERIFY WITH LIZ BEFORE THIS PAGE IS INDEXED
 * ============================================================
 *   1. DRIVE TIME. "About 20 min from Downtown" is our estimate from the
 *      Ammi Trail address, not a measured figure Liz supplied.
 *   2. NEIGHBOURHOOD LIST. Downtown, the Heights, River Oaks, the
 *      Galleria and Greenspoint are our selection. Confirm these are the
 *      areas the house actually wants to be found for.
 *   3. G 63 SCOPE. The featured build card points at
 *      g-class-satin-black-wrap. Her verified scope for it is wraps,
 *      blackout and audio, with no PPF, so confirm it is the right build
 *      to carry a page whose pair is Blackout and PPF.
 *   4. FAQ 3 ANSWER. The pairing answer describes intake planning trim
 *      finishes and film coverage together. Confirm that is how the shop
 *      actually sequences a combined job.
 *
 * Everything else on the page is drawn from nap in lib/site.ts, from
 * services.ts or from builds.ts, so it cannot drift from the rest of the
 * site.
 */

export interface LocationPairService {
  /** Slug in services.ts. The card's link and CTA label come from there. */
  slug: string;
  title: string;
  copy: string;
}

export interface LocationContent {
  slug: string;
  /** Per city indexing gate. False while the page is in review. */
  indexable: boolean;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  /** The two disciplines this city page leads on. */
  pair: {
    primary: LocationPairService;
    secondary: LocationPairService;
  };
  /** Slim row of four facts, plus the neighbourhood line beneath it. */
  strip: {
    items: string[];
    neighborhoods: string;
  };
  faqs: { question: string; answer: string }[];
  /** Slug in builds.ts. */
  featuredBuildSlug: string;
  /** Slug in services.ts. Resolved to the service name for the form. */
  preselectService: string;
  /** Other city pages linked at the foot of this one. */
  nearby: string[];
}

export const locationContent: Record<string, LocationContent> = {
  houston: {
    slug: "houston",
    /* Off while the page is in review. See the VERIFY list above. */
    indexable: false,
    title: "Blackout Packages and PPF in Houston, TX",
    description:
      "Blackout packages, paint protection film and eight more disciplines under one roof at 18235 Ammi Trail, Houston. Design your build with the House.",
    eyebrow: "Houston, TX",
    h1: "Houston. The Automotive Customization House.",
    lede:
      "Every Houston build starts and finishes at 18235 Ammi Trail. Blackout packages, paint protection film and eight more disciplines run under one roof with one team. No subcontractors and no handoffs.",
    pair: {
      primary: {
        slug: "blackout-packages",
        title: "Blackout Packages",
        copy:
          "Emblems, grilles, trim and accents refinished in gloss, satin or matte black. One darker, cleaner finish carried from front to rear.",
      },
      secondary: {
        slug: "paint-protection-film",
        title: "Paint Protection Film",
        copy:
          "Clear film against rock chips and road debris from I-45 to the Loop. Full front or full body coverage, installed in-house.",
      },
    },
    strip: {
      items: [
        "Off I-45 at Rankin Rd",
        "Minutes from Beltway 8 and the Hardy Toll Road",
        "About 20 min from Downtown",
        "Mon to Fri 8 AM to 5 PM",
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
    /* Derived rather than listed, so it can never drift from the
       location program in lib/site.ts. */
    nearby: locations.filter((l) => l.slug !== "houston").map((l) => l.slug),
  },
};

export const getLocationContent = (slug: string): LocationContent | undefined =>
  locationContent[slug];
