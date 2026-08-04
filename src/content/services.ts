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
 * The `faqs` on each service feed both the service page FAQ block and the
 * site-wide FAQ page, and are emitted as FAQPage schema. Answer engines
 * lift these almost verbatim, so each answer is written to stand alone
 * without the surrounding page for context.
 *
 * DRAFT COPY. Every answer below is a reasonable industry-standard position
 * written to give Henry and Liz something concrete to react to. Timeframes,
 * pricing structure, warranty terms and policy statements must be confirmed
 * against how the house actually operates before launch. Anything they
 * change here propagates automatically to the service page, the FAQ page and
 * the schema, since all three read from this one file.
 */

export type ServiceTier = "headline" | "additional";

export interface ServiceFaq {
  question: string;
  answer: string;
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
  /** Primary commercial intent phrase this page is built to answer. */
  primaryKeyword: string;
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  /* ================= HEADLINE ================= */
  {
    slug: "blackout-packages",
    name: "Blackout Packages",
    shortName: "Blackout",
    tier: "headline",
    cardLine: "Chrome and trim brought to one finish, coordinated with the rest of the build from the start.",
    summary:
      "Blackout packages in Houston. Chrome delete, badging, grille, trim and accent work in gloss, satin or matte, finished in house on a single vehicle timeline.",
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
    image: "/svc-blackout.webp",
    imageAlt: "Blacked out trim and grille detail on a customized luxury SUV",
    primaryKeyword: "blackout package Houston",
    faqs: [
      {
        question: "What is a blackout package on a car?",
        answer:
          "A blackout package is the removal or refinishing of every chrome and bright element on a vehicle so the exterior reads in one consistent finish. It typically covers window trim, the grille, badging, mirror caps, roof rails and exhaust tips, finished in gloss, satin or matte black.",
      },
      {
        question: "Is a chrome delete permanent?",
        answer:
          "It depends on the method. Vinyl based chrome delete is reversible and can be removed later without damaging the trim underneath. Painted or powder coated trim is permanent. Design By TWM in Houston walks through both options during the build consultation so the choice matches how long the vehicle will be kept.",
      },
      {
        question: "How long does a blackout package take?",
        answer:
          "A typical blackout package runs three to five days depending on how much trim the vehicle carries and the finish selected. Vehicles combining blackout with wheels, paint protection film or interior work are scheduled as one coordinated build rather than separate visits.",
      },
      {
        question: "How much does a blackout package cost?",
        answer:
          "Pricing depends on how much bright trim the vehicle carries, the finish selected and whether the trim is wrapped, painted or replaced. A basic emblem and trim package sits well below a full chrome delete on a vehicle with extensive brightwork. Design By TWM in Houston quotes per vehicle after inspecting it rather than from a flat price list.",
      },
      {
        question: "Can you black out only part of a vehicle?",
        answer:
          "Yes. Many clients start with badging and window trim and leave the grille, mirrors or exhaust tips for a later stage. Because the work is performed in house, a partial blackout can be extended later in a finish that matches what was already done.",
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
      "Paint protection film in Houston. Self healing PPF in partial, track and full body coverage, cut and installed in house with wrapped edges and no visible seams.",
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
    image: "/svc-ppf.webp",
    imageAlt: "Paint protection film being installed on the hood of a luxury vehicle",
    primaryKeyword: "paint protection film Houston",
    faqs: [
      {
        question: "What is paint protection film?",
        answer:
          "Paint protection film, or PPF, is a transparent urethane film applied over a vehicle's factory paint. It absorbs rock chips, road debris and light scratches, and most modern films are self healing, meaning minor marks disappear with heat from the sun or warm water.",
      },
      {
        question: "Can paint protection film go over a vinyl wrap?",
        answer:
          "Yes. Film is commonly installed over a color change wrap to protect the vinyl on high impact areas such as the front bumper, hood and mirrors. Design By TWM coordinates both services on one timeline so the wrap cures properly before film is applied.",
      },
      {
        question: "How long does paint protection film last?",
        answer:
          "Quality film carries a manufacturer warranty of five to ten years depending on the product and coverage. Actual life depends on climate, washing habits and how the vehicle is stored. Houston heat and sun make regular maintenance washing and an optional ceramic topper worthwhile.",
      },
      {
        question: "Is PPF better than ceramic coating?",
        answer:
          "They solve different problems. Paint protection film is a physical barrier that stops rock chips and scratches. Ceramic coating is a chemical layer that improves gloss, water beading and wash release but does not stop impact damage. Many builds use both, with the coating applied over the film.",
      },
      {
        question: "How much does paint protection film cost?",
        answer:
          "Cost is driven by coverage rather than by the value of the vehicle. A partial front covering the bumper, hood edge and mirrors is the entry point, an extended front adds the full hood and fenders, and full body coverage is the largest scope. Complex body shapes take more film and more labour, so film is quoted per vehicle.",
      },
      {
        question: "Can paint protection film be removed later?",
        answer:
          "Yes. Professionally installed film is removed with heat and controlled tension, and factory paint underneath is unaffected when the film is taken off within its service life. Film left well beyond its warranty period can become brittle, which makes removal slower and more labour intensive.",
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
      "Vehicle wraps in Houston. Full color change, partial wraps, roof and hood treatments and commercial fleet graphics, installed in house with panels disassembled.",
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
    image: "/svc-wraps.webp",
    imageAlt: "Color change vinyl wrap applied to a luxury coupe",
    primaryKeyword: "vehicle wrap Houston",
    faqs: [
      {
        question: "Does a vinyl wrap damage the paint underneath?",
        answer:
          "A wrap installed on healthy factory paint protects it rather than damages it. Problems come from wrapping over failing paint, prior body work or aftermarket repaints, where removal can lift the finish. Design By TWM inspects the paint before quoting a wrap and says so directly if the surface is not a candidate.",
      },
      {
        question: "How long does a car wrap last in Houston?",
        answer:
          "Three to five years is realistic for a quality film in the Houston climate. Sun exposure is the main factor, so a garaged vehicle will hold longer than one parked outside daily. Horizontal surfaces such as the roof and hood age first.",
      },
      {
        question: "How much does it cost to wrap a car?",
        answer:
          "Pricing depends on vehicle size, film selection and how much disassembly the body requires. A partial or roof wrap sits well below a full color change, and exotic body shapes take longer than a sedan. Design By TWM quotes per vehicle after seeing it rather than from a flat price list.",
      },
      {
        question: "Can you wrap a leased vehicle?",
        answer:
          "Yes, and it is one of the most common reasons people wrap rather than repaint. The wrap can be removed before the lease is returned, leaving the factory paint as it was. Confirm the terms with your leasing company first, since a small number restrict exterior changes.",
      },
      {
        question: "How do I take care of a wrapped car?",
        answer:
          "Hand wash with a pH neutral soap, keep high pressure away from edges and seams, and avoid automatic brush washes. Vinyl does not need waxing, though a wrap safe sealant helps in the Houston sun. Removing bird droppings and fuel spills quickly prevents staining.",
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
      "Custom wheels and fitment in Houston. Forged and flow formed wheels, offset and stance planning, tire pairing, TPMS and road force balancing, all done in house.",
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
    image: "/svc-wheels.webp",
    imageAlt: "Forged wheel and tire fitment on a customized luxury vehicle",
    primaryKeyword: "custom wheels Houston",
    faqs: [
      {
        question: "What does wheel fitment mean?",
        answer:
          "Fitment is the relationship between a wheel, the tire on it and the vehicle it mounts to. It covers diameter, width, offset, backspacing, bolt pattern, center bore and tire profile. Correct fitment means no rubbing, correct brake clearance and the stance the build was designed around.",
      },
      {
        question: "Do I need suspension work when I change wheels?",
        answer:
          "Not always, but larger diameters or aggressive offsets often need ride height or alignment adjustment to clear properly. Because suspension is handled in house at Design By TWM, wheel and suspension decisions are planned together instead of discovered after the wheels arrive.",
      },
      {
        question: "Will aftermarket wheels affect my TPMS?",
        answer:
          "Existing sensors can usually be transferred to new wheels, and new sensors can be supplied and programmed when the originals are not compatible. Either way the system is verified before the vehicle is released.",
      },
      {
        question: "How much do custom wheels cost?",
        answer:
          "Wheel pricing spans a wide range depending on construction. Cast wheels are the entry point, flow formed sit in the middle and forged wheels are the most expensive because each one is machined from a solid billet. Tires, TPMS and mounting are quoted alongside the wheels so the figure reflects the finished vehicle.",
      },
      {
        question: "Will larger wheels affect ride quality or speedometer accuracy?",
        answer:
          "A larger diameter usually means a shorter tire sidewall, which firms up the ride. Speedometer accuracy is preserved when the overall rolling diameter stays close to factory, which is part of the fitment planning done before any order is placed.",
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
      "Custom automotive interiors in Houston. Full leather and Alcantara retrims, custom stitching, suede headliners, steering wheels and ambient lighting, built in house.",
    intro:
      "Interior work is the most labour intensive discipline in the building and the one clients notice every single day they drive. Seats are stripped to the frame, patterns are cut for the specific vehicle rather than pulled from a universal kit, and every panel comes back to the same standard. Leather, Alcantara, suede, contrast stitching, perforation and quilting are all executed by the same team that does the exterior work.",
    includes: [
      "Full leather and Alcantara retrims, seats, door cards and console",
      "Custom stitch patterns, quilting, perforation and contrast piping",
      "Suede and Alcantara headliners and pillar wrapping",
      "Steering wheel retrim, reshape and heated wheel options",
      "Fiber optic and ambient lighting integration",
      "Dashboard, trim and console finish work coordinated with the exterior",
    ],
    pairsWith: ["audio", "lighting", "blackout-packages", "paint-protection-film"],
    image: "/svc-interior.webp",
    imageAlt: "Custom stitched leather interior with ambient lighting",
    primaryKeyword: "custom car interior Houston",
    faqs: [
      {
        question: "How long does a full interior retrim take?",
        answer:
          "A full retrim generally runs two to four weeks depending on the vehicle, the material selected and the complexity of the stitch pattern. Vehicles combining interior work with exterior disciplines are scheduled as one build so the car is off the road once rather than repeatedly.",
      },
      {
        question: "Can you match a custom interior to my exterior colors?",
        answer:
          "Yes. Thread, leather and accent colors are selected against the exterior finish in person, which is one of the practical advantages of having both disciplines under one roof. Stitch color is commonly pulled from a wrap, a brake caliper or a wheel accent.",
      },
      {
        question: "Do custom interiors affect resale value?",
        answer:
          "It depends on the vehicle and the buyer. Restrained, well executed work in quality materials generally holds or improves value on enthusiast vehicles. Highly personalized color schemes narrow the buyer pool. This is discussed openly during the consultation rather than after the work is done.",
      },
      {
        question: "How much does a custom interior cost?",
        answer:
          "Interior pricing is driven by labour more than by material. A steering wheel retrim or a headliner is a contained job, while a full retrim with custom stitching across seats, door cards and console is among the largest scopes in the building. Every interior is quoted after the vehicle is inspected in person.",
      },
      {
        question: "Can you repair one damaged seat instead of retrimming the whole interior?",
        answer:
          "Yes. Single panel repairs, bolster replacement and stitch repairs are routine, and matching an existing material is often possible. Where the original leather has aged or faded, retrimming a larger section usually gives a better result than matching a single panel against worn material.",
      },
    ],
  },

  /* ================= ADDITIONAL IN-HOUSE DISCIPLINES ================= */
  {
    slug: "suspension",
    name: "Suspension",
    shortName: "Suspension",
    tier: "additional",
    cardLine: "Lift, level, lowering and coilover programs with alignment.",
    summary:
      "Suspension work in Houston. Lift and leveling kits, lowering springs, coilovers and air suspension, installed with alignment and fitment planned around the wheels.",
    intro:
      "Suspension changes how a vehicle sits, how it drives and what wheel and tire package will physically fit. Lift kits, leveling kits, lowering springs, coilovers and air management are installed with alignment performed after the fact rather than skipped, and with the wheel program planned alongside rather than after.",
    includes: [
      "Lift and leveling kits for trucks and SUVs",
      "Lowering springs, coilovers and adjustable damping setups",
      "Air suspension installation and management",
      "Post installation alignment and ride height verification",
      "Wheel and tire clearance planning on the same build",
    ],
    pairsWith: ["wheels-and-fitment", "truck-accessories", "blackout-packages"],
    image: "/svc-suspension.webp",
    imageAlt: "Suspension and ride height work on a lifted truck",
    primaryKeyword: "lift kit Houston",
    faqs: [
      {
        question: "Do I need an alignment after a lift kit?",
        answer:
          "Yes. Any change to ride height changes suspension geometry, which affects tire wear and steering. Alignment is performed as part of the installation at Design By TWM rather than left for the customer to arrange elsewhere.",
      },
      {
        question: "Will a lift kit affect my truck's ride quality?",
        answer:
          "It can, and the degree depends on the kit. A leveling kit changes ride quality very little, while a large lift with new shocks changes it noticeably. The intended use of the truck, daily driving versus off road, drives the recommendation.",
      },
      {
        question: "How much does a lift kit cost?",
        answer:
          "Cost depends on lift height, whether new shocks and control arms are included and how much supporting work the vehicle needs to clear the intended wheel and tire package. A leveling kit is the entry point and a full lift with upgraded components is considerably more. Alignment is included in the quote rather than billed afterward.",
      },
      {
        question: "Can you install air suspension?",
        answer:
          "Yes. Air suspension is installed and managed in house, including tank, compressor and control placement. It is most often specified on builds where the client wants an aggressive parked stance without giving up daily drivability.",
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
      "Custom paint and body work in Houston. Full and partial repaints, custom color, panel repair, refinishing and collision work, executed in house with color matched finish.",
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
    image: "/svc-paint-body.webp",
    imageAlt: "Custom paint finish on a refinished vehicle panel",
    primaryKeyword: "custom paint Houston",
    faqs: [
      {
        question: "Can you match my factory paint on a repair?",
        answer:
          "Yes. Color is matched to the vehicle rather than to the paint code alone, since factory finishes shift with age and sun exposure. Blending into adjacent panels is standard practice where the repair calls for it.",
      },
      {
        question: "Can collision repair be combined with customization?",
        answer:
          "That is one of the practical advantages of an in house shop. If a vehicle is already apart for panel repair, adding a blackout package, paint protection film or a color change is significantly more efficient than scheduling it as a separate build later.",
      },
      {
        question: "How long does a custom paint job take?",
        answer:
          "A full repaint generally runs two to four weeks depending on the color, how much preparation the body needs and whether trim is being refinished at the same time. Accent work such as a roof, mirror caps or brake calipers is a much shorter job.",
      },
      {
        question: "Do you work with insurance on collision repair?",
        answer:
          "Collision work is performed in house and can be coordinated with an insurance claim. Many clients use the opportunity to add cosmetic work while the vehicle is already apart, which is quoted separately from the insured repair so the two are never confused.",
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
      "Automotive lighting in Houston. Headlight and taillight upgrades, tinting, smoked finishes, ambient interior lighting and auxiliary off road lighting, installed in house.",
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
    image: "/svc-lighting.webp",
    imageAlt: "Custom lighting detail on a customized vehicle at night",
    primaryKeyword: "custom car lighting Houston",
    faqs: [
      {
        question: "Is tinting headlights or taillights legal in Texas?",
        answer:
          "Texas law requires that required lamps remain visible and effective, and heavily darkened lenses can fail inspection or draw enforcement attention. Design By TWM advises on how far a finish can reasonably go and will say when a requested look creates a compliance problem.",
      },
      {
        question: "Can you add ambient lighting to a car that did not come with it?",
        answer:
          "Yes. Fiber optic and LED ambient systems can be integrated into door cards, footwells, the dash and the headliner on vehicles that were never equipped from the factory, and are commonly done alongside an interior retrim while the panels are already out.",
      },
      {
        question: "Will aftermarket lighting cause warning lights or drain the battery?",
        answer:
          "Not when it is installed correctly. LED conversions can trigger bulb out warnings on some vehicles, which is resolved with the correct load resistors or decoders. Auxiliary lighting is wired through a relay and a fuse so it cannot draw power with the vehicle switched off.",
      },
      {
        question: "How much does a lighting upgrade cost?",
        answer:
          "A headlight or taillight replacement is a contained job. Ambient interior lighting routed through door cards, footwells, the dash and the headliner is far more labour intensive because the panels have to come out. Interior lighting is most efficient when scheduled alongside an interior retrim.",
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
      "Car audio in Houston. Speaker, amplifier, subwoofer and DSP systems with sound deadening and custom enclosures, integrated cleanly into factory interiors.",
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
    image: "/svc-audio.webp",
    imageAlt: "Custom audio installation integrated into a vehicle interior",
    primaryKeyword: "car audio Houston",
    faqs: [
      {
        question: "Can you upgrade audio without changing the factory look?",
        answer:
          "Yes. Most upgrades keep the factory head unit and interior appearance while replacing speakers, adding amplification and processing behind trim panels. Enclosures are built to the vehicle so nothing looks added on.",
      },
      {
        question: "Does sound deadening actually make a difference?",
        answer:
          "It does, in two ways. It reduces road and panel noise, and it gives speakers a more rigid surface to work against, which improves clarity and bass response. On most builds it is the highest value part of the installation.",
      },
      {
        question: "Can I keep Apple CarPlay and my factory screen with an upgraded system?",
        answer:
          "Yes. Most upgrades keep the factory head unit and screen, including Apple CarPlay and Android Auto, and add amplification, processing and better speakers behind the trim. Replacing the head unit is only necessary when the factory unit cannot deliver a clean enough signal to build on.",
      },
      {
        question: "How much does a car audio upgrade cost?",
        answer:
          "A speaker upgrade with sound deadening is the entry point. Adding amplification, a subwoofer, digital signal processing and a custom enclosure increases both parts and labour. Systems are specified around how the client actually listens rather than around a target power figure.",
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
      "Truck accessories in Houston. Bumpers, steps, racks, bed covers, off road equipment and protection, fitted and finished in house alongside wheels and suspension.",
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
    image: "/svc-truck-accessories.webp",
    imageAlt: "Custom truck with accessories, wheels and lift package",
    primaryKeyword: "truck accessories Houston",
    faqs: [
      {
        question: "Can accessories be finished to match my truck?",
        answer:
          "Yes. Because paint and body is in house, bumpers, steps, racks and other accessories can be refinished in gloss, satin or matte black or matched to the body color before they are installed rather than left in the manufacturer's finish.",
      },
      {
        question: "Should accessories be installed before or after a lift?",
        answer:
          "Both are planned together. Ride height affects step placement, bumper clearance and how a rack sits, so on a full truck build the suspension, wheels and accessories are specified as one package before any parts are ordered.",
      },
      {
        question: "Can you install accessories I bought elsewhere?",
        answer:
          "In most cases yes. Bring the parts and they can be fitted and, where the build calls for it, refinished to match the vehicle. Parts supplied by the client carry no warranty from us on the part itself, only on the installation.",
      },
      {
        question: "Do bed covers and racks affect fuel economy?",
        answer:
          "A tonneau cover generally has a small positive or neutral effect. Roof racks, light bars and heavy bumpers add drag and weight, which does reduce economy. On a full truck build these are specified together so the trade offs are understood before parts are ordered.",
      },
    ],
  },
];

/* ---------------- Derived views ---------------- */

export const headlineServices = services.filter((s) => s.tier === "headline");
export const additionalServices = services.filter((s) => s.tier === "additional");

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
