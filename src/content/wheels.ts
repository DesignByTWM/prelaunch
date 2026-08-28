/**
 * WHEELS
 *
 * Ships as an inquiry module at launch. The wheel program runs to thousands
 * of SKUs, which is a catalog problem rather than a website problem, so the
 * browse experience is deferred to a later ecommerce integration. The
 * /wheels route is reserved and this content is deliberately structured so
 * a real catalog can drop in underneath it without a URL change.
 *
 * PLACEHOLDER: the `programs` entries below describe wheel construction
 * types, which is accurate and brand-agnostic. No manufacturer names appear
 * anywhere yet, pending confirmation of which brands are actually carried.
 * See CLIENT_REVIEW_NOTES.md item 11.7.
 */

export const wheelPrograms = [
  {
    slug: "forged",
    name: "Forged",
    frame: "/wheel-1.webp",
    alt: "Forged wheel on a customized luxury vehicle",
    summary:
      "Machined from a solid billet under pressure, which produces the strongest and lightest wheel available and allows almost any width, offset and face profile to be specified.",
    points: [
      "Fully bespoke sizing, offset and concavity",
      "Highest strength to weight ratio",
      "Custom finishes including brushed, polished and painted",
      "Longest lead time, typically made to order",
    ],
  },
  {
    slug: "flow-formed",
    name: "Flow Formed",
    frame: "/wheel-2.webp",
    alt: "Flow formed wheel fitted to a performance vehicle",
    summary:
      "Cast then spun under heat and pressure to stretch and compress the barrel. Much of the strength benefit of forging at a fraction of the cost, which makes it the sensible middle of the market.",
    points: [
      "Significantly lighter than a standard cast wheel",
      "Wide range of sizes available from stock",
      "Strong value for daily driven vehicles",
      "Shorter lead time than forged",
    ],
  },
  {
    slug: "cast",
    name: "Cast",
    frame: "/wheel-3.webp",
    alt: "Cast wheel fitted to an SUV",
    summary:
      "Poured into a mould in one piece. The most accessible construction and entirely appropriate where the goal is a change of appearance rather than a weight reduction.",
    points: [
      "Widest availability and fastest to source",
      "Broadest range of finishes at entry pricing",
      "Well suited to appearance-led builds",
      "Heavier than flow formed or forged",
    ],
  },
  {
    slug: "off-road",
    name: "Off-Road & Truck",
    frame: "/wheel-4.webp",
    alt: "Off road wheel on a lifted truck",
    summary:
      "Built for load, impact and aggressive fitment on trucks and SUVs, usually specified alongside suspension so ride height and clearance are solved as one problem.",
    points: [
      "Higher load ratings for trucks and SUVs",
      "Aggressive offsets and deep concave profiles",
      "Beadlock and simulated beadlock options",
      "Planned together with lift or leveling work",
    ],
  },
];

/** What actually gets checked before an order is placed. */
export const fitmentFactors = [
  {
    title: "Diameter and width",
    copy: "Sets the visual proportion and dictates what tire profile is available. Going larger usually means a shorter sidewall, which changes ride quality.",
  },
  {
    title: "Offset and backspacing",
    copy: "Where the mounting face sits relative to the centreline. This is what decides whether a wheel tucks under the arch, sits flush or pokes, and whether it rubs at full lock.",
  },
  {
    title: "Brake clearance",
    copy: "Measured on the vehicle, not assumed from a chart. Large factory or upgraded brake packages rule out certain spoke designs entirely.",
  },
  {
    title: "Bolt pattern and centre bore",
    copy: "Has to match the hub exactly. Where it does not, hub-centric rings or adapters are specified deliberately rather than improvised.",
  },
  {
    title: "Load rating",
    copy: "Non-negotiable on trucks and SUVs. A wheel that looks right and is not rated for the vehicle is not an option regardless of how it sits.",
  },
  {
    title: "Ride height",
    copy: "Suspension and wheels are one decision. Lift, level or lowering changes what will clear, so both are planned together before either is ordered.",
  },
];

/**
 * CATALOG PREVIEW
 *
 * From Liz's Shop Wheels mock, August 14 2026. Eight representative sets
 * shown as a browse grid so the page reads as a program rather than a
 * form. No prices, by client instruction: every card routes to a fitment
 * inquiry, matching her "Inquire for fitment" treatment.
 *
 * These are construction and finish descriptions, not manufacturer SKUs.
 * No brand names appear, consistent with Liz's answer of August 14 that
 * wheel brand access is not to be published. See review notes item 11.7.
 *
 * When a real catalog lands, this array is replaced by a CMS or commerce
 * feed and the component underneath does not change.
 */
export const wheelCatalog = [
  { name: '20" Forged, Gloss Black', style: "Forged", finish: "Gloss Black", size: '20"', frame: "/wheel-1.webp" },
  { name: '22" Monoblock, Brushed Titanium', style: "Monoblock", finish: "Brushed Titanium", size: '22"', frame: "/wheel-2.webp" },
  { name: '21" Multi-Spoke, Satin Black', style: "Multi-Spoke", finish: "Satin Black", size: '21"', frame: "/wheel-3.webp" },
  { name: '24" Deep Concave, Matte Black', style: "Deep Concave", finish: "Matte Black", size: '24"', frame: "/wheel-4.webp" },
  { name: '19" Forged, Polished', style: "Forged", finish: "Polished", size: '19"', frame: "/wheel-1.webp" },
  { name: '20" Split-Spoke, Gunmetal', style: "Split-Spoke", finish: "Gunmetal", size: '20"', frame: "/wheel-2.webp" },
  { name: '22" Concave, Satin Bronze', style: "Concave", finish: "Satin Bronze", size: '22"', frame: "/wheel-3.webp" },
  { name: '21" Forged, Gloss White', style: "Forged", finish: "Gloss White", size: '21"', frame: "/wheel-4.webp" },
];

/**
 * The three fitment questions from Liz's mock. Kept separate from the
 * seven longer wheelFaqs below, which stay because they carry real search
 * weight. Hers lead, ours follow.
 */
export const wheelQuickFaqs = [
  {
    question: "How do you confirm fitment before I order?",
    answer:
      "Your vehicle is measured in-house and fitment is calculated before any wheel is ordered.",
  },
  {
    question: "Is mounting and balancing included?",
    answer: "Yes, mounting and balancing is included with every wheel purchase.",
  },
  {
    question: "Can I pair wheels with a suspension setup?",
    answer:
      "Yes. Wheels and suspension are planned together for correct fitment.",
  },
];

export const wheelFaqs = [
  {
    question: "How do I know what wheels will fit my vehicle?",
    answer:
      "Fitment is measured on the vehicle rather than looked up. Diameter, width, offset, backspacing, brake clearance, bolt pattern, centre bore and load rating all have to agree before an order is placed. Design By TWM in Houston confirms all of it with the vehicle on the lift, which is what prevents a wheel arriving that cannot be used.",
  },
  {
    question: "What is the difference between forged, flow formed and cast wheels?",
    answer:
      "Cast wheels are poured into a mould and are the most accessible. Flow formed wheels are cast then spun under heat and pressure, giving much of the strength of forging at lower cost. Forged wheels are machined from solid billet, which is the strongest and lightest construction and allows fully bespoke sizing.",
  },
  {
    question: "Do I need new tires when I change wheels?",
    answer:
      "Usually yes, because a change in diameter or width means the existing tires will not fit the new wheel. Tire selection is quoted alongside the wheels so the figure reflects the finished vehicle rather than just the rims.",
  },
  {
    question: "Can you transfer my TPMS sensors to new wheels?",
    answer:
      "In most cases existing sensors can be transferred. Where they are not compatible, new sensors are supplied and programmed. Either way the system is verified before the vehicle is released.",
  },
  {
    question: "Will new wheels affect my speedometer?",
    answer:
      "Accuracy is preserved when the overall rolling diameter stays close to factory, which is part of the fitment planning. A significant change in rolling diameter does shift the reading, so it is accounted for before ordering rather than discovered afterward.",
  },
  {
    question: "Do you install wheels purchased elsewhere?",
    answer:
      "In most cases yes. Mounting, road force balancing, TPMS and torque are handled the same way as on a supplied set. Where you bring your own wheels, our work covers the installation. Anything relating to the wheel itself stays with wherever it was purchased.",
  },
  {
    question: "How long does a wheel and tire fitting take?",
    answer:
      "The fitting itself is usually a same-day job once the parts are in hand. The longer part is sourcing, particularly for forged wheels which are typically made to order.",
  },
];
