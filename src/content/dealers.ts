/**
 * DEALER SERVICES DIVISION
 *
 * Content here is derived from the DESIGNBYTWM Dealer Services Division
 * service catalog supplied by the client, so the six package categories and
 * their line items are real rather than invented. Commercial framing,
 * process and FAQs are drafted and need Henry's review.
 *
 * This division is deliberately kept out of the retail service hierarchy.
 * It has its own funnel, its own intake and its own language, because the
 * buyer is a dealership principal or a used car manager, not a vehicle
 * owner. Their question is not "will this look good", it is "what does this
 * do to my front-end gross and my time to turn".
 */

/**
 * The four questions from Liz's Dealer Services mock, August 14 2026.
 * Her wording verbatim, punctuation resolved per the project copy law.
 * These lead the FAQ block. The longer drafted set follows.
 */
export const dealerQuickFaqs = [
  {
    question: "What's the typical turnaround time?",
    answer:
      "Turnaround depends on scope and current volume, confirmed at onboarding.",
  },
  {
    question: "Is there a minimum volume requirement?",
    answer: "No minimum is required to apply. Pricing terms scale with volume.",
  },
  {
    question: "Can this cover multiple locations?",
    answer:
      "Yes. Multi-location accounts are supported under one dealer agreement.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is confirmed during onboarding based on volume and services needed.",
  },
];

export interface DealerPackage {
  slug: string;
  name: string;
  summary: string;
  items: string[];
}

export const dealerPackages: DealerPackage[] = [
  {
    slug: "blackout-trim",
    name: "Blackout & Trim Packages",
    summary:
      "Professionally refinished emblems, grilles, trims and accents in gloss, satin or matte black. The fastest way to differentiate a unit sitting alongside identical inventory.",
    items: [
      "Basic emblem and trim package",
      "Full chrome delete package",
      "Custom color accents",
    ],
  },
  {
    slug: "wheel-tire",
    name: "Wheel & Tire Packages",
    summary:
      "Curated wheel and tire programs for dealership inventory, including mounting, balancing and TPMS integration handled in house.",
    items: [
      "Factory upgrade packages",
      "Custom wheel and tire combinations",
      "Off-road and performance sets",
    ],
  },
  {
    slug: "wraps",
    name: "Premium Vehicle Wraps",
    summary:
      "Full or partial vinyl wraps for inventory, lease returns, promotional vehicles and aging units that need a fresh visual identity before they go back on the line.",
    items: [
      "Full color change wraps",
      "Roof and hood wraps",
      "Custom graphics and dealership branding",
    ],
  },
  {
    slug: "suspension",
    name: "Suspension & Lift Kits",
    summary:
      "Showroom-ready stance on trucks and SUVs through precision-installed lift and leveling kits, with alignment performed as part of the work.",
    items: [
      "Lift and level kits with alignment",
      "Wheel fitment optimization",
      "Custom ride height adjustments",
    ],
  },
  {
    slug: "audio-video",
    name: "Audio & Video Upgrades",
    summary:
      "Dealer-installed technology packages that lift the delivery experience and open backend revenue on units that would otherwise sell on price alone.",
    items: [
      "Apple CarPlay and Android Auto integration",
      "Speaker and subwoofer packages",
      "Rear entertainment systems",
    ],
  },
  {
    slug: "protection",
    name: "Ceramic Coating & PPF",
    summary:
      "High-performance surface protection that protects inventory on the lot and gives the finance office a product with real, explainable value.",
    items: [
      "Three-year and five-year ceramic coating",
      "Partial or full paint protection film",
      "Windshield protection and glass coating",
    ],
  },
];

/** Why a dealer principal should care. Commercial, not aesthetic. */
export const dealerValue = [
  {
    title: "One vendor, ten disciplines",
    copy: "Blackout, wheels, wraps, suspension, protection and audio all come from the same building. One purchase order, one schedule, one contact, instead of coordinating six specialists against a delivery date.",
  },
  {
    title: "Consistent spec across inventory",
    copy: "The same finish, the same fitment and the same standard applied unit after unit. Inventory presents uniformly on the lot, which matters when a customer is walking a row of four similar trucks.",
  },
  {
    title: "Front-end gross on units that would sell flat",
    copy: "A blackout package or a wheel and tire upgrade turns a commodity unit into a differentiated one. The spend is modest against what it supports in asking price and in how fast the unit moves.",
  },
  {
    title: "Scheduled as a program, not as bookings",
    copy: "Volume work is planned around your turn cycle rather than taken one vehicle at a time. Capacity is reserved so units are not sitting waiting for a bay.",
  },
];

export const dealerProcess = [
  {
    title: "Inventory review",
    copy: "We look at the mix, the units that are sitting and where the gross is being left. Not every vehicle is worth upgrading, and saying so is part of the conversation.",
  },
  {
    title: "Package specification",
    copy: "Packages are specified to your inventory rather than pulled from a menu, with a fixed spec per tier so a unit can be ordered without a fresh conversation each time.",
  },
  {
    title: "Program scheduling",
    copy: "Capacity is reserved against your turn cycle. Units move through in planned batches so the work does not become a bottleneck on delivery.",
  },
  {
    title: "Execution and quality control",
    copy: "Every unit is checked to the same standard before it goes back. Consistency across a batch is the whole point of a program, so it gets verified rather than assumed.",
  },
  {
    title: "Delivery back to the lot",
    copy: "Units come back retail ready. Where a package is being sold through the finance office, documentation and product detail go back with the vehicle.",
  },
];

export const dealerFaqs = [
  {
    question: "Do you work with dealerships in Houston?",
    answer:
      "Yes. The Design By TWM Dealer Services Division handles inventory work at volume for Houston area dealerships, including blackout and trim packages, wheel and tire programs, wraps, lift kits, protection and audio upgrades prepared for retail delivery.",
  },
  {
    question: "What is the minimum volume for a dealer program?",
    answer:
      "Programs are built around your turn cycle rather than around a fixed unit minimum. Some dealers run a standing spec across every truck that lands, others send selected units that need help moving. Both work.",
  },
  {
    question: "How quickly can units be turned around?",
    answer:
      "Turnaround depends on the package and on how much capacity is reserved. Because every discipline runs in one building, a unit needing blackout, wheels and protection is handled on one pass rather than moving between three vendors, which is usually where dealer timelines break down.",
  },
  {
    question: "Can you apply the same specification across multiple units?",
    answer:
      "Yes, and that is the main reason dealers use a program rather than ad hoc bookings. A fixed spec per tier means unit twelve looks exactly like unit one, which is what makes the upgrade sellable as a consistent dealership offering.",
  },
  {
    question: "Can dealership branding be applied to vehicles?",
    answer:
      "Yes. Custom graphics and dealership branding are handled alongside color change and partial wraps, with brand accurate color matching so a livery looks identical across every vehicle carrying it.",
  },
  {
    question: "Do you handle lease returns and aging inventory?",
    answer:
      "Yes. Partial wraps, trim refinishing and protection work are commonly used on lease returns and units that have been sitting, where a modest spend changes how the vehicle presents without touching the reconditioning budget.",
  },
  {
    question: "Do you offer protection products a finance office can sell?",
    answer:
      "Ceramic coating and paint protection film are both installed for dealer partners and are commonly presented as backend products at delivery. Coverage tiers can be specified so the offering is simple to explain at the desk.",
  },
  {
    question: "How does a dealership get started?",
    answer:
      "Through the dealer inquiry form or by calling the house directly. The first conversation covers inventory mix, volume and turnaround expectations before any specification is set.",
  },
];
