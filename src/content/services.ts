/**
 * THE SERVICE CATALOG
 * Locked structure, approved by Liz and Henry on August 3 2026.
 *
 *   10 retail services.
 *   5 headline   -> own homepage card, own photograph
 *   5 additional -> the "Additional In-House Disciplines" umbrella module
 *
 * Dealer Services is NOT in this list. It is a separate division with its
 * own funnel and is intentionally kept out of the retail hierarchy.
 *
 * Copy rules applied throughout:
 *   Approved vocabulary: in house, integrated, coordinated, complete
 *   transformation, craftsmanship, precision, fitment, design led,
 *   single point of contact, quality control.
 *   Banned: elevate your ride, turn heads, next level, where luxury meets
 *   performance, unleash, redefining automotive luxury, crafted to
 *   perfection, masterpiece on wheels, we don't just.
 *
 * CLIENT COPY, August 14 2026. Liz supplied ten page mocks and confirmed the
 * copy as close to final. Her wording is used verbatim for the hero, overview,
 * coverage, process, packages, FAQ and closing CTA on every service.
 *
 * Applied on import, per the project copy law:
 *   em dashes resolved, Oxford commas removed, mock artifacts stripped.
 * Her facts, figures and phrasing are otherwise untouched.
 *
 * Her FAQ set replaces the previous draft set and settles five timeframe
 * questions that had been open since the build. See CLIENT_REVIEW_NOTES.md
 * section 2. A full FAQ restructure follows once all copy is approved.
 *
 * Retained from the previous draft and still requiring confirmation:
 *   `intro`, `includes` and `summary`. Liz's layout has no slot for the scope
 *   checklist, so `includes` renders inside the overview rather than being
 *   discarded. Flagged in CLIENT_REVIEW_NOTES.md section 6.
 *
 * The `faqs` on each service feed the service page, the site wide FAQ page and
 * FAQPage schema at once. `process` emits HowTo and `packages` emits Offer
 * nodes, so a change here propagates to every surface that reads this file.
 */

export type ServiceTier = "headline" | "additional";

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** A named sub variant of a discipline. Drives the coverage grid. */
export interface ServiceCoverage {
  name: string;
}

export interface ServiceProcessStep {
  /** Two digit label, "01" through "04". */
  step: string;
  name: string;
  detail: string;
}

export interface ServiceRecentWork {
  name: string;
}

export interface ServicePackage {
  name: string;
  /** One line qualifier under the tier name. */
  sub: string;
  /** Exactly one tier per service carries this. */
  featured: boolean;
  /** Present only on the featured tier. */
  ribbon?: string;
  includes: string[];
  /** Optional note rendered under the bullet list, smaller and quieter. */
  note?: string;
}

export interface Service {
  slug: string;
  /** Full name, used in headings and schema. */
  name: string;
  /** Short form for nav and cards where the full name is too long. */
  shortName: string;
  tier: ServiceTier;
  /** One line on the homepage card. Under 80 characters. */
  cardLine: string;
  /** Meta description and card hover summary. 140 to 160 characters. */
  summary: string;
  /** Opening paragraph of the service page. */
  intro: string;
  /** Concrete scope. What is actually performed in house. */
  includes: string[];
  /** Slugs of services this pairs with inside a larger build. */
  pairsWith: string[];
  image: string;
  imageAlt: string;
  /**
   * Filename stem for this service's photography. Every slot on the
   * service page is derived from it by convention rather than by a
   * field per image: {prefix}-overview.webp, {prefix}-cov-1.webp
   * through -cov-4, and {prefix}-ref-1.webp through -ref-4.
   *
   * Photo hides a file that 404s, so a slot stays a flat placeholder
   * until the artwork lands. Dropping a correctly named file into
   * /public fills it with no code change.
   *
   * Where a delivered filename does not follow the convention, override
   * that one slot rather than bending the prefix, which would move all
   * nine slots at once. See overviewImage below.
   */
  imagePrefix: string;
  /**
   * Overrides the derived {prefix}-overview.webp for this service only.
   * Set it when the delivered file does not match the convention, and
   * leave it unset otherwise so the convention keeps working by default.
   */
  overviewImage?: string;
  /** Primary commercial intent phrase this page is built to answer. */
  primaryKeyword: string;

  /* ---- Layout copy, from Liz's approved mocks of August 14 2026 ---- */

  /**
   * Per-service CTA label, approved by Liz September 2 2026.
   * Renders on the hero button, the closing band button, and as
   * the closing band headline. Replaces the generic
   * "Design Your Build" on service pages only.
   */
  ctaLabel: string;
  /** Page H1. Replaces the service name as the visible headline. */
  heroTitle: string;
  /** Hero supporting line, sits under the H1. */
  heroLede: string;
  /** Three short assertions under the hero. Warranty, materials, in house. */
  statStrip: string[];
  overviewTitle: string;
  overviewBody: string;

  coverageTitle: string;
  /** Four sub variants of the discipline. Each is a distinct search term. */
  coverage: ServiceCoverage[];

  /** Single line statement over the process band. */
  processStatement: string;
  processTitle: string;
  /** Four steps. Emitted as HowTo schema. */
  process: ServiceProcessStep[];

  recentTitle: string;
  /** Four recent build captions. Photography still outstanding. */
  recentWork: ServiceRecentWork[];

  packagesTitle: string;
  /** Three tiers. Emitted as Offer nodes. No prices, by client instruction. */
  packages: ServicePackage[];

  ctaTitle: string;
  ctaLede: string;

  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "blackout-packages",
    name: "Blackout Packages",
    shortName: "Blackout",
    tier: "headline",
    cardLine: "Chrome and trim brought to one finish, coordinated with the rest of the build from the start.",
    summary:
      "Blackout packages in Houston. Chrome delete, badging, grille, trim and accent work in gloss, satin or matte, specified and finished in house.",
    intro:
      "A blackout package resolves every bright piece on a vehicle into one deliberate finish. Chrome window surrounds, grille slats, badging, mirror caps, roof rails, exhaust tips and trim are removed, refinished or replaced, then reinstalled to factory tolerances. Because the work happens in house, the finish is matched across every panel on the car rather than approximated across three vendors.",
    includes: [
      "Full chrome delete across window trim, grille, badging and body accents",
      "Gloss, satin or matte finish, selected against the paint under shop lighting",
      "Emblem removal, refinishing or replacement",
      "Mirror caps, roof rails, exhaust tips and lower valance treatment",
      "Reinstallation to factory fitment with quality control on every seam",
    ],
    pairsWith: ["paint-protection-film", "wheels-and-fitment", "vehicle-wraps", "lighting"],
    image: "/maincard1blackout.webp",
    imageAlt: "Blacked out trim and grille detail on a customized luxury SUV",
    imagePrefix: "blackout",
    /* Delivered as svcblackout1.webp rather than blackout-overview.webp. */
    overviewImage: "/svcblackout1.webp",
    primaryKeyword: "blackout package Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Blackout",
    heroTitle: "Every detail, finished in black.",
    heroLede:
      "Chrome delete, trim wrap and gloss-to-matte conversions, planned as one cohesive blackout, not a patchwork of separate jobs.",
    statStrip: [
      "Precision-Cut Film",
      "Specialist Coatings",
      "Finished In-House",
    ],
    overviewTitle: "A blackout is a decision, not a shortcut",
    overviewBody:
      "Done right, a blackout package changes the whole read of a vehicle, not just the trim. Every surface is planned together so the finish is consistent panel to panel, then applied by the same in-house team from first piece to last.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Full Blackout Package" },
      { name: "Trim & Badge Blackout" },
      { name: "Chrome Delete" },
      { name: "Wheel & Caliper Blackout" },
    ],
    processStatement: "Every surface, unified.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Vehicle assessed, blackout scope defined.",
      },
      {
        step: "02",
        name: "Prep",
        detail: "Surfaces cleaned and masked in-house.",
      },
      {
        step: "03",
        name: "Apply",
        detail: "Vinyl, wrap or coating applied panel by panel.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Final inspection and walkthrough at handoff.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Blackout" },
      { name: "Chrome Delete" },
      { name: "Badge & Trim" },
      { name: "Wheel Blackout" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Trim Blackout",
        sub: "Targeted coverage",
        featured: false,
        includes: [
          "Design consultation",
          "Premium cast vinyl",
          "Trim, badging and grille",
        ],
      },
      {
        name: "Full Blackout",
        sub: "Complete package",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Full surface preparation",
          "Chrome delete throughout the exterior",
          "Finish matched panel to panel",
        ],
      },
      {
        name: "Full Blackout + Wheels",
        sub: "Complete, including wheels",
        featured: false,
        includes: [
          "Everything in Full Blackout",
          "Wheel and caliper finishing",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Blackout",
    ctaLede:
      "Tell us about your vehicle and how much of it you want blacked out. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How long does a blackout package take?",
        answer:
          "Most blackout packages run 3 to 5 business days in production depending on scope. The window for your vehicle is confirmed at consultation.",
      },
      {
        question: "Can chrome be restored later?",
        answer:
          "It depends on the method. With a vinyl chrome delete, the film is removed and the original trim remains underneath. A painted chrome delete is permanent, because the finish is applied to the trim itself. Which method suits your vehicle is covered before the work is specified.",
      },
      {
        question: "Does this include the wheels?",
        answer:
          "Wheel and caliper blackout is available as an add-on or as part of the full package.",
      },
      {
        question: "How does a blackout finish age?",
        answer:
          "Both wrap and paint change with time and use. How quickly depends on sun exposure, washing and general wear. We go through the material options and what care each one asks for at consultation.",
      },
    ],
  },
  {
    slug: "paint-protection-film",
    name: "Paint Protection Film (PPF)",
    shortName: "Paint Protection Film",
    tier: "headline",
    cardLine: "Protection planned alongside finish work from the start, all in-house.",
    summary:
      "Paint protection film in Houston. Self-healing film in partial, track and full-body coverage, patterned and cut in house with wrapped edges.",
    intro:
      "Paint protection film is a clear, self healing urethane layer applied over factory paint to absorb rock chips, road debris and wash marring. It is the one service on this list that protects value rather than changes appearance, which is why it pairs with almost everything else here. Film is plotted, cut and installed in house, with edges wrapped rather than laid to the panel line wherever the panel allows.",
    includes: [
      "Partial front, extended front, track pack and full body coverage",
      "Self healing gloss or satin film options",
      "Wrapped edges on hoods, fenders and mirrors where panel geometry allows",
      "Headlight, rocker, door cup and luggage area protection",
      "Optional ceramic coating over film for wash release and gloss retention",
      "Paint decontamination and correction before any film is laid",
    ],
    pairsWith: ["vehicle-wraps", "wheels-and-fitment", "blackout-packages", "interior-transformation"],
    image: "/maincard2ppf.webp",
    imageAlt: "Paint protection film being installed on the hood of a luxury vehicle",
    imagePrefix: "ppf",
    primaryKeyword: "paint protection film Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Protection",
    heroTitle: "Protection planned before the first mile.",
    heroLede:
      "Self-healing film applied to the panels that take the most impact, fitted and installed in-house alongside the rest of your build.",
    statStrip: [
      "Self-Healing Film",
      "Patterned In-House",
      "Specialist Installation",
    ],
    overviewTitle: "Protection that doesn't announce itself",
    overviewBody:
      "A PPF install should disappear into the car. Edges are wrapped where the panel allows, seams are placed with intent, and every panel is measured and cut in-house before it goes on under controlled shop conditions.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Full Front Package" },
      { name: "Track Package (High-Impact)" },
      { name: "Full Vehicle Coverage" },
      { name: "High-Touch Panels" },
    ],
    processStatement: "Protection you never see.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Assess",
        detail: "Vehicle inspected, coverage plan defined.",
      },
      {
        step: "02",
        name: "Prep",
        detail: "Panels decontaminated and corrected.",
      },
      {
        step: "03",
        name: "Install",
        detail: "Film applied and edges wrapped in-house.",
      },
      {
        step: "04",
        name: "Cure & Deliver",
        detail: "Cure time confirmed, final walkthrough.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Front Package" },
      { name: "Full Body Coverage" },
      { name: "Track Package" },
      { name: "Edge Wrap Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Front Package",
        sub: "High-impact panels",
        featured: false,
        includes: [
          "Bumper, hood and fenders",
          "Self-healing film",
          "Edges wrapped where the panel allows",
        ],
      },
      {
        name: "Full Vehicle",
        sub: "Complete coverage",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Every exterior panel",
          "Self-healing film",
          "Patterned and cut in-house",
        ],
      },
      {
        name: "Full Vehicle + Ceramic",
        sub: "Protection, layered",
        featured: false,
        includes: [
          "Everything in Full Vehicle",
          "Ceramic coating over film",
          "One point of contact through the build",
        ],
        note: "Ceramic coating is a liquid glass layer applied over the film. It adds depth to the finish and gives the surface a hydrophobic top layer, so water and dirt sit on it rather than in it. Specified and applied as part of the same build.",
      },
    ],
    ctaTitle: "Design Your Protection",
    ctaLede:
      "Tell us about your vehicle and the coverage you're considering. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "What affects how long PPF lasts?",
        answer:
          "Film life depends on the product selected, how the vehicle is used and how it is maintained. The options and what each involves are discussed at consultation.",
      },
      {
        question: "How does the film age over time?",
        answer:
          "The films installed here are built with UV-stable, self-healing topcoats. How any film ages depends on the product, sun exposure and care, and we go through the options at consultation.",
      },
      {
        question: "How is the film removed?",
        answer:
          "Film is made to be removable, and removal is done in house by the same team that installs it. Because the result depends on the condition and history of the paint underneath, that is assessed before quoting.",
      },
      {
        question: "Does it need special care?",
        answer:
          "Hand washing is recommended. Care guidance for the specific film on your vehicle is given at handover.",
      },
    ],
  },
  {
    slug: "vehicle-wraps",
    name: "Vehicle Wraps",
    shortName: "Wraps",
    tier: "headline",
    cardLine: "Full and partial wraps, designed and installed in-house with documented material selection.",
    summary:
      "Vehicle wraps in Houston. Full color change, partial wraps and roof and hood treatments in premium cast vinyl, designed and installed in house.",
    intro:
      "A color change wrap rewrites the character of a vehicle without touching the paint underneath. Panels are disassembled rather than tucked, which is the difference between a wrap that holds for years and one that lifts at the edges in a Houston summer. Gloss, satin, matte, metallic, color shift and textured films are all available, selected against the vehicle in person rather than from a swatch on a screen.",
    includes: [
      "Full color change wraps in gloss, satin, matte, metallic and color shift films",
      "Partial wraps, roof wraps, hood wraps and accent panels",
      "Panel disassembly for tucked edges on door handles, mirrors and jambs",
      "Commercial and fleet graphics with brand accurate color matching",
      "Full paint decontamination and preparation before installation",
      "Removal of previous wraps and adhesive cleanup",
    ],
    pairsWith: ["paint-protection-film", "blackout-packages", "wheels-and-fitment", "suspension"],
    image: "/maincard3wraps.webp",
    imageAlt: "Color change vinyl wrap applied to a luxury coupe",
    imagePrefix: "wraps",
    primaryKeyword: "vehicle wrap Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Wrap",
    heroTitle: "Wrapped in something unmistakably yours.",
    heroLede:
      "Full-body, partial and color-change wraps, designed and installed by one in-house team, start to finish.",
    statStrip: [
      "Premium Cast Vinyl",
      "Designed In-House",
      "Specialist Installation",
    ],
    overviewTitle: "The feeling, before the finish",
    overviewBody:
      "The right wrap changes how a vehicle feels to own, not just how it looks in the driveway. Color and coverage are planned alongside the rest of your build, then installed by the same in-house team from consultation through final inspection.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Full Vehicle Wrap" },
      { name: "Partial & Accent" },
      { name: "Color Change" },
      { name: "Chrome Delete & Trim" },
    ],
    processStatement: "Every panel, considered.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Color and finish selected, design signed off before material is cut.",
      },
      {
        step: "02",
        name: "Prep",
        detail: "Panels cleaned, corrected and inspected in-house.",
      },
      {
        step: "03",
        name: "Install",
        detail: "Premium cast vinyl applied under controlled shop conditions.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Full inspection and a walkthrough at handoff.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Satin Military Green" },
      { name: "Midnight Blue" },
      { name: "Accent Roof & Hood" },
      { name: "Edge Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Partial",
        sub: "Targeted coverage",
        featured: false,
        includes: [
          "Design consultation",
          "Premium cast vinyl",
          "Roof, hood or accent panels",
        ],
      },
      {
        name: "Full Wrap",
        sub: "Complete finish change",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Full surface preparation",
          "Complete color change",
          "Finish reviewed panel by panel",
        ],
      },
      {
        name: "Full + Custom",
        sub: "Fully bespoke",
        featured: false,
        includes: [
          "Everything in Full Wrap",
          "Bespoke color and print work",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Wrap",
    ctaLede:
      "Tell us about your vehicle and the finish you have in mind. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How long does a full wrap take?",
        answer:
          "How much of the vehicle is being wrapped, and how much prep it needs, drive the timeline. Most full wraps run 3 to 5 business days, and a window for your vehicle is estimated at consultation.",
      },
      {
        question: "What affects how long a wrap lasts?",
        answer:
          "Wrap life depends on the film selected, sun and weather exposure, and how the vehicle is washed and stored. What to expect from each material is covered at consultation.",
      },
      {
        question: "How does a wrap sit over factory paint?",
        answer:
          "Wrap film sits over the factory finish rather than replacing it, and both installation and removal are done in house. Paint condition and any previous repair work affect how a wrap behaves, so the finish is assessed before we quote.",
      },
      {
        question: "Can PPF be installed with a wrap?",
        answer:
          "Yes. Many builds combine both, planned together in-house.",
      },
      {
        question: "How should the vehicle be cared for?",
        answer:
          "Hand wash only. Avoid automatic car washes, high-pressure sprayers and harsh chemical cleaners, which can lift edges and dull the finish over time.",
      },
    ],
  },
  {
    slug: "wheels-and-fitment",
    name: "Wheels & Fitment",
    shortName: "Wheels",
    tier: "headline",
    cardLine: "Fitment calibrated to the build and confirmed for your vehicle before anything is ordered.",
    summary:
      "Custom wheels and fitment in Houston. Forged and flow-formed wheels, offset and stance planning, tire pairing, TPMS and road force balancing, all done in house.",
    intro:
      "Wheels are the fastest way to change how a vehicle sits and the easiest place to get it wrong. Fitment is a measurement problem before it is a styling problem: offset, backspacing, brake clearance, tire profile and suspension geometry all have to agree before an order is placed. That planning happens here, in house, with the vehicle on the lift rather than over text messages.",
    includes: [
      "Forged, flow formed and cast wheel programs from established manufacturers",
      "Offset, backspacing and brake clearance verification on the vehicle",
      "Tire selection matched to profile, load rating and intended use",
      "Mounting, road force balancing and TPMS transfer or programming",
      "Torque specification and post install re-torque",
      "Fitment planning coordinated with any suspension change on the same build",
    ],
    pairsWith: ["suspension", "blackout-packages", "paint-protection-film", "vehicle-wraps"],
    image: "/maincard4wheels.webp",
    imageAlt: "Forged wheel and tire fitment on a customized luxury vehicle",
    imagePrefix: "wheels",
    primaryKeyword: "custom wheels Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Fitment",
    heroTitle: "Fitment calculated, not guessed.",
    heroLede:
      "Wheels, tires and fitment planned together in-house, so the stance is right the first time, not adjusted after the fact.",
    statStrip: [
      "Measured Fitment",
      "Mounted & Balanced In-House",
      "Forged & Monoblock",
    ],
    overviewTitle: "The stance comes from the numbers",
    overviewBody:
      "Offset, width and tire profile are calculated for your exact vehicle before anything is ordered, not eyeballed. Every wheel is mounted, balanced and torqued in-house, then re-checked before the vehicle leaves.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Forged Wheels" },
      { name: "Cast & Monoblock Wheels" },
      { name: "Wheels + Suspension Package" },
      { name: "Fitment Consultation Only" },
    ],
    processStatement: "Fitment, to the millimeter.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Vehicle measured, fitment calculated.",
      },
      {
        step: "02",
        name: "Select",
        detail: "Wheel and tire package confirmed.",
      },
      {
        step: "03",
        name: "Mount",
        detail: "Mounted, balanced and torqued in-house.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Fitment re-checked, final walkthrough.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "22in Forged" },
      { name: "Deep Concave" },
      { name: "Wheels + Suspension" },
      { name: "Fitment Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Wheels Only",
        sub: "Wheel & tire package",
        featured: false,
        includes: [
          "Fitment measured for your vehicle",
          "Mounted and balanced in-house",
          "Wheel and tire package",
        ],
      },
      {
        name: "Wheels + Fitment",
        sub: "Complete package",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Fitment measured and re-checked",
          "Mounted and balanced in-house",
          "Stance planned with you",
        ],
      },
      {
        name: "Wheels + Suspension",
        sub: "Complete stance package",
        featured: false,
        includes: [
          "Everything in Wheels + Fitment",
          "Suspension set up to match",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Fitment",
    ctaLede:
      "Tell us about your vehicle and the stance you're after. We'll calculate it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How do you confirm fitment before ordering?",
        answer:
          "Your vehicle is measured in-house and fitment is calculated before any wheel is ordered.",
      },
      {
        question: "Do you carry specific wheel brands?",
        answer:
          "Brand availability is confirmed at consultation.",
      },
      {
        question: "Can you match a factory-plus look?",
        answer:
          "Yes. Fitment can be calculated for a subtle or aggressive stance, your call.",
      },
      {
        question: "Is alignment included with a wheel package?",
        answer:
          "Alignment is included in suspension-paired wheel packages and can also be scheduled on its own. What your build includes is listed on the quote.",
      },
    ],
  },
  {
    slug: "interior-transformation",
    name: "Interior Transformation",
    shortName: "Interiors",
    tier: "headline",
    cardLine: "Complete retrims and interior work, coordinated with the exterior finish as one build.",
    summary:
      "Custom automotive interiors in Houston. Full leather and technical textile retrims, bespoke stitching, suede headliners and bespoke console work, built in house.",
    intro:
      "Interior work is the most labour intensive discipline in the building and the one clients notice every single day they drive. Seats are stripped to the frame, patterns are cut for the specific vehicle rather than pulled from a universal kit. Every panel comes back to the same standard. Leather, Alcantara, suede, contrast stitching, perforation and quilting are all executed by the same team that does the exterior work.",
    includes: [
      "Full leather and Alcantara retrims, seats, door cards and console",
      "Custom stitch patterns, quilting, perforation and contrast piping",
      "Suede and Alcantara headliners and pillar wrapping",
      "Steering wheel retrim, reshape and heated wheel options",
      "Fiber optic and ambient lighting integration",
      "Dashboard, trim and console finish work coordinated with the exterior",
    ],
    pairsWith: ["audio", "lighting", "blackout-packages", "paint-protection-film"],
    image: "/maincard5interior.webp",
    imageAlt: "Custom stitched leather interior with ambient lighting",
    imagePrefix: "interior",
    primaryKeyword: "custom car interior Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Interior",
    heroTitle: "Matched to the vision outside.",
    heroLede:
      "Full retrims, upgraded materials and custom interior work, designed alongside the rest of your build, not as an afterthought.",
    statStrip: [
      "Fine Leathers & Textiles",
      "Bespoke Patterning",
      "Trimmed In-House",
    ],
    overviewTitle: "The cabin should match the build",
    overviewBody:
      "An interior finished separately from the rest of the vehicle always shows. Material, stitching and color are planned against the exterior direction from the start, then executed by our own upholstery and trim team.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Seat Retrim" },
      { name: "Full Cabin Retrim" },
      { name: "Trim & Stitching Detail" },
      { name: "Custom Console & Trim" },
    ],
    processStatement: "Every stitch, intentional.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Materials and design direction selected.",
      },
      {
        step: "02",
        name: "Design",
        detail: "Pattern and stitching plan confirmed.",
      },
      {
        step: "03",
        name: "Build",
        detail: "Retrim completed in-house.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Final fit check and walkthrough.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Retrim" },
      { name: "Contrast Stitch" },
      { name: "Custom Console" },
      { name: "Seat Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Seats Only",
        sub: "Targeted retrim",
        featured: false,
        includes: [
          "Design consultation",
          "Fine leathers and textiles",
          "Seat retrim",
        ],
      },
      {
        name: "Full Cabin Retrim",
        sub: "Complete interior",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Seats, door panels and headliner",
          "Fine leathers and textiles",
          "Pattern and stitching designed with you",
        ],
      },
      {
        name: "Full Cabin + Custom Console",
        sub: "Fully bespoke",
        featured: false,
        includes: [
          "Everything in Full Cabin",
          "Bespoke console and trim work",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Interior",
    ctaLede:
      "Tell us about your vehicle and the materials you have in mind. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How long does a full retrim take?",
        answer:
          "Most full retrims run 2 to 3 weeks depending on scope and material. The window for your vehicle is confirmed once the material and scope are set.",
      },
      {
        question: "Can you match a specific material or color?",
        answer:
          "Yes. Material and color are selected and confirmed at consultation.",
      },
      {
        question: "How are factory electronics handled in a retrim?",
        answer:
          "A retrim is planned around the factory electronics and controls in the cabin, which are removed and refitted as part of the work. Anything in your vehicle that needs particular handling is identified before trim work starts.",
      },
      {
        question: "Do you work with exotic materials?",
        answer:
          "Yes, including exotic leathers and specialty materials. Ask at consultation.",
      },
    ],
  },
  {
    slug: "suspension",
    name: "Suspension",
    shortName: "Suspension",
    tier: "additional",
    cardLine: "Lift, level, lowering and coilover programs with alignment.",
    summary:
      "Suspension work in Houston. Lift and leveling kits, lowering springs, coilovers and air suspension, installed with alignment and matched to your wheel package.",
    intro:
      "Suspension changes how a vehicle sits, how it drives and what wheel and tire package will physically fit. Lift kits, leveling kits, lowering springs, coilovers and air management are installed with alignment performed after the fact rather than skipped and with the wheel program planned alongside rather than after.",
    includes: [
      "Lift and leveling kits for trucks and SUVs",
      "Lowering springs, coilovers and adjustable damping setups",
      "Air suspension installation and management",
      "Post installation alignment and ride height verification",
      "Wheel and tire clearance planning on the same build",
    ],
    pairsWith: ["wheels-and-fitment", "truck-accessories", "blackout-packages"],
    image: "/services6suspension.webp",
    imageAlt: "Suspension and ride height work on a lifted truck",
    imagePrefix: "suspension",
    primaryKeyword: "lift kit Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Setup",
    heroTitle: "Set up for the stance and the ride.",
    heroLede:
      "Air and coilover suspension, tuned in-house for the look you want without giving up how the vehicle actually drives.",
    statStrip: [
      "Air & Coilover Programs",
      "Tuned In-House",
      "Matched To Your Wheels",
    ],
    overviewTitle: "Stance is only half the job",
    overviewBody:
      "Dropping a vehicle is easy. Keeping it comfortable, aligned and drivable is the part that takes experience. Every setup is tuned in-house to the wheel and tire package it's paired with, not installed and left as-is.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Air Suspension" },
      { name: "Coilover Suspension" },
      { name: "Lowering Springs" },
      { name: "Tune & Alignment Only" },
    ],
    processStatement: "Set right, not just set low.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Ride height and use case defined.",
      },
      {
        step: "02",
        name: "Select",
        detail: "Setup matched to wheel and tire package.",
      },
      {
        step: "03",
        name: "Install",
        detail: "Installed and tuned in-house.",
      },
      {
        step: "04",
        name: "Align & Deliver",
        detail: "Aligned, tested and delivered.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Air Setup" },
      { name: "Coilover Install" },
      { name: "Wheels + Suspension" },
      { name: "Tune Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Lowering Springs",
        sub: "Entry-level stance",
        featured: false,
        includes: [
          "Design consultation",
          "Alignment as part of the install",
          "Ride height matched to your wheels",
        ],
      },
      {
        name: "Coilover Setup",
        sub: "Adjustable stance",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Height and damping adjustable",
          "Set up and tuned in-house",
          "Matched to your wheel and tire package",
        ],
      },
      {
        name: "Full Air Suspension",
        sub: "Complete air setup",
        featured: false,
        includes: [
          "Everything in Coilover Setup",
          "Air management specified and installed",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Setup",
    ctaLede:
      "Tell us about your vehicle and the stance you're after. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How will this affect ride quality?",
        answer:
          "Any change to suspension changes how the vehicle rides. The setup is specified around how you actually drive the car rather than ride height alone, and the trade-offs of each option are covered at consultation.",
      },
      {
        question: "Air or coilovers: which is right for me?",
        answer:
          "It depends on your use case and how much adjustability you want. We'll walk through it at consultation.",
      },
      {
        question: "Is alignment included with a suspension install?",
        answer:
          "Alignment is part of a suspension install. What your build includes is listed on the quote.",
      },
      {
        question: "How low can I go without rubbing?",
        answer:
          "Clearance is calculated against your specific wheel and tire package before anything is installed, and we walk through where the limits sit on your vehicle at consultation.",
      },
    ],
  },
  {
    slug: "paint-and-body",
    name: "Paint & Body",
    shortName: "Paint & Body",
    tier: "additional",
    cardLine: "Custom paint, refinishing, panel repair and collision work.",
    summary:
      "Custom paint and body in Houston. Full and partial repaints, custom color, panel repair and refinishing, executed in house in our own booth.",
    intro:
      "Paint is the discipline that determines whether a build looks finished or looks assembled. Custom color, accent panels, calipers, trim refinishing, panel repair and collision work all happen in house, which means a repaired panel is matched to the rest of the vehicle by the same people who will be reinstalling the trim over it.",
    includes: [
      "Full and partial repaints in factory or custom color",
      "Accent panel, roof, mirror and caliper refinishing",
      "Panel repair, dent and damage correction",
      "Collision repair coordinated with cosmetic upgrades on the same visit",
      "Paint correction and finish quality control before delivery",
    ],
    pairsWith: ["blackout-packages", "paint-protection-film", "wheels-and-fitment"],
    image: "/services7paintbody.webp",
    imageAlt: "Custom paint finish on a refinished vehicle panel",
    imagePrefix: "paintbody",
    primaryKeyword: "custom paint Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Finish",
    heroTitle: "Finished the way it should have left the factory.",
    heroLede:
      "Paint correction, bodywork and full respray work, handled in-house with the same standard as the rest of your build.",
    statStrip: [
      "Custom Color Development",
      "In-House Paint Booth",
      "Multi-Stage Finishing",
    ],
    overviewTitle: "Paint is where shortcuts show first",
    overviewBody:
      "Panel gaps, color match and finish depth are what separate a real paint job from a quick one. Every project runs through our own booth, under our own standard, from prep through final clear.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Paint Correction" },
      { name: "Full Respray" },
      { name: "Bodywork & Panel Repair" },
      { name: "Color Match Touch-Up" },
    ],
    processStatement: "Depth you can see in the reflection.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Assess",
        detail: "Panels inspected, scope defined.",
      },
      {
        step: "02",
        name: "Prep",
        detail: "Bodywork and surface prep completed.",
      },
      {
        step: "03",
        name: "Paint",
        detail: "Sprayed and cleared in our in-house booth.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Correction, inspection and handoff.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Respray" },
      { name: "Panel Repair" },
      { name: "Correction Detail" },
      { name: "Color Match" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Correction Only",
        sub: "Restore the finish",
        featured: false,
        includes: [
          "Multi-stage correction",
          "Gloss and clarity restored",
          "Finish assessed panel by panel",
        ],
      },
      {
        name: "Full Respray",
        sub: "Complete refinish",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Full bodywork preparation",
          "Sprayed and cleared in our own booth",
          "Color developed and reviewed with you",
        ],
      },
      {
        name: "Full Respray + Bodywork",
        sub: "Complete restoration",
        featured: false,
        includes: [
          "Everything in Full Respray",
          "Panel repair included",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Finish",
    ctaLede:
      "Tell us about your vehicle and the finish you have in mind. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "How long does a full respray take?",
        answer:
          "Scope and the amount of bodywork needed drive the timeline. Most full resprays run 1 to 3 weeks, and a window for your vehicle is estimated once the plan is set.",
      },
      {
        question: "How is the color matched?",
        answer:
          "Color is matched to your vehicle and confirmed with you before spraying begins. Age, sun exposure and previous repair work all affect how a factory color has weathered, and that is part of what the match is worked out against.",
      },
      {
        question: "Do you handle insurance claims?",
        answer:
          "Yes. Insurance work is something the house takes on. Bring the claim details along with the vehicle so the damage can be assessed and documented. What the process looks like from there depends on the scope, the cause of the damage and how your carrier handles the claim.",
      },
      {
        question: "Is clear coat protection included?",
        answer:
          "Paint protection film and ceramic coating can be specified on top of a respray. Whether either is included in your build is set out on the quote.",
      },
    ],
  },
  {
    slug: "lighting",
    name: "Lighting",
    shortName: "Lighting",
    tier: "additional",
    cardLine: "Headlight and taillight work, ambient and auxiliary lighting.",
    summary:
      "Automotive lighting in Houston. Headlight and taillight work, ambient interior lighting and accent lighting, wired and installed in house.",
    intro:
      "Lighting is the detail that reads at night and the one most often done badly. Headlight and taillight upgrades, smoked or tinted finishes, sequential signals, ambient interior lighting and auxiliary lighting for trucks are wired properly, sealed properly and tested before the vehicle leaves.",
    includes: [
      "Headlight and taillight upgrades and replacements",
      "Smoked, tinted and custom finished lenses",
      "Ambient and fiber optic interior lighting",
      "Auxiliary, rock and off road lighting for trucks and SUVs",
      "Correct wiring, sealing and electrical load management",
    ],
    pairsWith: ["blackout-packages", "interior-transformation", "truck-accessories"],
    image: "/services8lighting.webp",
    imageAlt: "Custom lighting detail on a customized vehicle at night",
    imagePrefix: "lighting",
    primaryKeyword: "custom car lighting Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Lighting",
    heroTitle: "Light that looks intentional, not installed.",
    heroLede:
      "Headlight, taillight and underglow lighting upgrades, wired and finished in-house so nothing looks bolted on.",
    statStrip: [
      "Factory-Line Integration",
      "Wired In-House",
      "Headlight & Taillight",
    ],
    overviewTitle: "Lighting should read as part of the design",
    overviewBody:
      "A lighting upgrade done well disappears into the vehicle's factory lines. Every install is wired and finished in-house, matched to the rest of the build rather than treated as a separate add-on.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Headlight Retrofit" },
      { name: "Taillight Tint & Upgrade" },
      { name: "Ambient & Accent Lighting" },
      { name: "Full Lighting Package" },
    ],
    processStatement: "Light that belongs there.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Lighting goals and vehicle assessed.",
      },
      {
        step: "02",
        name: "Source",
        detail: "Components selected and confirmed.",
      },
      {
        step: "03",
        name: "Install",
        detail: "Wired and installed in-house.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Function check and walkthrough.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Headlight Retrofit" },
      { name: "Taillight Tint" },
      { name: "Underglow Install" },
      { name: "Wiring Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Taillight Package",
        sub: "Targeted upgrade",
        featured: false,
        includes: [
          "Taillight upgrade",
          "Wired in-house",
          "Finished to the factory lines",
        ],
      },
      {
        name: "Headlight Retrofit",
        sub: "Most requested",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Full retrofit",
          "Wired in-house",
          "Components specified with you",
        ],
      },
      {
        name: "Full Lighting Package",
        sub: "Complete package",
        featured: false,
        includes: [
          "Everything in Headlight Retrofit",
          "Ambient and accent lighting",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Lighting",
    ctaLede:
      "Tell us about your vehicle and the look you're after. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "Is this street legal?",
        answer:
          "Lighting regulations vary by state and by the specific setup. We can tell you what a given setup involves, but what is legal where you drive is worth checking against your state's current requirements.",
      },
      {
        question: "Can lighting be added to an existing build?",
        answer:
          "Lighting can be added to a vehicle that has already been built, or planned as part of a larger build. Scope is confirmed at consultation.",
      },
      {
        question: "How long does install take?",
        answer:
          "Scope drives the timeline. Most lighting installs run 1 to 3 days, and a window is estimated at consultation.",
      },
    ],
  },
  {
    slug: "audio",
    name: "Audio",
    shortName: "Audio",
    tier: "additional",
    cardLine: "Speaker, amplifier and subwoofer systems with sound treatment.",
    summary:
      "Car audio in Houston. Speaker, amplifier, subwoofer and DSP systems with sound deadening and custom enclosures, fabricated and tuned in house.",
    intro:
      "Audio work is judged by what you do not see. Speakers, amplifiers, subwoofers, digital signal processing and sound deadening are integrated into the existing interior with custom enclosures and panels built to the vehicle, so the system reads as a factory option rather than an addition.",
    includes: [
      "Component and coaxial speaker upgrades",
      "Amplifier, subwoofer and digital signal processing installation",
      "Custom enclosures and trim panels built to the vehicle",
      "Sound deadening on doors, floor and trunk",
      "Head unit, Apple CarPlay and Android Auto integration",
    ],
    pairsWith: ["interior-transformation", "lighting"],
    image: "/services9audio.webp",
    imageAlt: "Custom audio installation integrated into a vehicle interior",
    imagePrefix: "audio",
    primaryKeyword: "car audio Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Sound",
    heroTitle: "Sound built into the vehicle, not bolted on.",
    heroLede:
      "Custom audio systems designed and installed in-house, integrated into the cabin rather than added on top of it.",
    statStrip: [
      "Custom Fabrication",
      "Tuned In-House",
      "Cabin Integration",
    ],
    overviewTitle: "Integration is what separates a real build",
    overviewBody:
      "Anyone can add speakers. A system that's fabricated to fit the cabin, tuned to the vehicle and wired cleanly in-house is a different level of work. It's the only way we install audio.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Sound System Upgrade" },
      { name: "Custom Subwoofer Enclosure" },
      { name: "Full Audio Build" },
      { name: "Tuning Only" },
    ],
    processStatement: "Built into the cabin, not onto it.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Goals and cabin layout assessed.",
      },
      {
        step: "02",
        name: "Design",
        detail: "System and enclosure designed.",
      },
      {
        step: "03",
        name: "Build",
        detail: "Fabricated and installed in-house.",
      },
      {
        step: "04",
        name: "Tune & Deliver",
        detail: "Tuned, tested and delivered.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Full Audio Build" },
      { name: "Custom Enclosure" },
      { name: "Cabin Integration" },
      { name: "Wiring Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Sound Upgrade",
        sub: "Entry-level upgrade",
        featured: false,
        includes: [
          "Component speaker upgrade",
          "Wired in-house",
          "Integrated with factory controls where the vehicle allows",
        ],
      },
      {
        name: "Custom Subwoofer Build",
        sub: "Most requested",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Custom-fabricated enclosure",
          "Tuned in-house",
          "Finished to match the cabin",
        ],
      },
      {
        name: "Full Audio Build",
        sub: "Complete system",
        featured: false,
        includes: [
          "Everything in Subwoofer Build",
          "Full system integration",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Sound",
    ctaLede:
      "Tell us about your vehicle and what you're looking for. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "Can this be added to an existing interior?",
        answer:
          "Yes. Audio builds are planned around the cabin you already have or as part of a full retrim.",
      },
      {
        question: "How does audio integrate with factory controls?",
        answer:
          "Audio work is planned around the factory controls and head unit already in the vehicle. What integration is possible depends on the platform, and that is confirmed before the build is specified.",
      },
      {
        question: "How long does an audio build take?",
        answer:
          "It depends on the depth of the build. An install using existing locations is a short job. A full custom build involving fabrication runs longer, and a window is estimated once the system is specified.",
      },
      {
        question: "Do you work with amateur or pro-level systems?",
        answer:
          "Both. Systems are scoped to your goals and budget at consultation.",
      },
    ],
  },
  {
    slug: "truck-accessories",
    name: "Truck Accessories",
    shortName: "Truck Accessories",
    tier: "additional",
    cardLine: "Bumpers, racks, steps, covers and off road equipment, fitted.",
    summary:
      "Truck accessories in Houston. Bumpers, steps, racks, bed covers and off-road equipment, fitted and finished in house alongside wheels and suspension.",
    intro:
      "Truck work is where the disciplines here overlap most. Bumpers, steps, racks, bed covers, lighting and off road equipment are fitted and, where the build calls for it, refinished to match the vehicle rather than bolted on in whatever finish they shipped in.",
    includes: [
      "Front and rear bumpers, bull bars and skid protection",
      "Running boards, steps and side bars",
      "Bed covers, racks, roof racks and cargo systems",
      "Off road equipment, recovery points and auxiliary lighting",
      "Accessory refinishing to match the vehicle finish",
    ],
    pairsWith: ["suspension", "wheels-and-fitment", "lighting", "blackout-packages"],
    image: "/services10truckaccs.webp",
    imageAlt: "Custom truck with accessories, wheels and lift package",
    imagePrefix: "truck",
    primaryKeyword: "truck accessories Houston",

    /* Layout copy from Liz's approved mocks, August 14 2026. */
    ctaLabel: "Design Your Build-Out",
    heroTitle: "Built for how the truck actually gets used.",
    heroLede:
      "Bed accessories, lift kits and functional upgrades, installed in-house and matched to the rest of the build.",
    statStrip: [
      "In-House Fabrication",
      "Fitted & Finished",
      "Built For Real Use",
    ],
    overviewTitle: "Function first, finished to match",
    overviewBody:
      "Truck accessories have to hold up to real use, not just look right in photos. Every upgrade is installed in-house and finished to match the rest of the vehicle, from bed accessories to lift kits.",
    coverageTitle: "Choose your coverage",
    coverage: [
      { name: "Bed Accessories" },
      { name: "Lift Kits" },
      { name: "Racks & Overland Builds" },
      { name: "Bumpers & Armor" },
    ],
    processStatement: "Built for the way it's actually driven.",
    processTitle: "The process",
    process: [
      {
        step: "01",
        name: "Consult",
        detail: "Use case and vehicle assessed.",
      },
      {
        step: "02",
        name: "Select",
        detail: "Accessories and fitment confirmed.",
      },
      {
        step: "03",
        name: "Install",
        detail: "Installed and fabricated in-house.",
      },
      {
        step: "04",
        name: "Deliver",
        detail: "Function check and walkthrough.",
      },
    ],
    recentTitle: "Design directions",
    recentWork: [
      { name: "Lift + Wheels" },
      { name: "Bed Accessories" },
      { name: "Overland Build" },
      { name: "Armor Detail" },
    ],
    packagesTitle: "Find your coverage level",
    packages: [
      {
        name: "Bed Accessories",
        sub: "Functional upgrades",
        featured: false,
        includes: [
          "Bed liner and tie-downs",
          "Fitted in-house",
          "Finished to match the vehicle",
        ],
      },
      {
        name: "Lift Kit Package",
        sub: "Most requested",
        featured: true,
        ribbon: "Signature",
        includes: [
          "Lift kit and alignment",
          "Fitted in-house",
          "Planned around your wheel and tire package",
        ],
      },
      {
        name: "Full Overland Build",
        sub: "Complete build-out",
        featured: false,
        includes: [
          "Everything in Lift Kit Package",
          "Racks and armor",
          "One point of contact through the build",
        ],
      },
    ],
    ctaTitle: "Design Your Build-Out",
    ctaLede:
      "Tell us about your truck and how it's actually used. We'll plan it, price it and book it, all in-house.",
    faqs: [
      {
        question: "Can this be paired with new wheels?",
        answer:
          "Yes. Lift and wheel packages are planned together, with clearance and fitment calculated before parts are ordered.",
      },
      {
        question: "How long does a full build take?",
        answer:
          "Scope drives the timeline. Most truck builds run 3 to 7 business days, and a window is estimated once the parts list is set.",
      },
      {
        question: "Do you install aftermarket parts I already own?",
        answer:
          "Often yes. Bring your parts list to consultation so we can look at what you have and what installing it involves.",
      },
    ],
  },
];

/* ---------------- Derived views ---------------- */

export const headlineServices = services.filter((s) => s.tier === "headline");
export const additionalServices = services.filter((s) => s.tier === "additional");

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
