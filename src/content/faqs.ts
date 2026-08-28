/**
 * COMPANY FAQ CONTENT
 *
 * These sit above the service-level questions and do a different job.
 * Service FAQs answer "what is PPF". These answer "who is this business
 * and can I trust them with my car", which is what an answer engine uses
 * to build an entity understanding of DESIGNBYTWM and what a buyer reads
 * before ever picking up the phone.
 *
 * DRAFT COPY. Two categories of risk in here, both flagged in
 * CLIENT_REVIEW_NOTES.md:
 *
 *   1. HISTORY AND ORIGIN. I do not know how or when the house was
 *      founded, who founded it or how the team is structured. Nothing
 *      below invents a founding year, a headcount or a person. Those
 *      answers are written around what is verifiable and are the single
 *      biggest gap Henry needs to fill, because origin story is exactly
 *      what an AI engine quotes when asked "who is Design By TWM".
 *
 *   2. POLICY. Deposits, payment methods, warranty terms, insurance
 *      coverage while a vehicle is in the building, visitation during a
 *      build. Every one of these is a commitment. They are written as the
 *      most defensible industry-standard position, not as fact.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  /** Shown under the group heading on the FAQ page. */
  intro: string;
  items: FaqItem[];
}

export const companyFaqGroups: FaqGroup[] = [
  {
    id: "the-house",
    label: "The House",
    intro:
      "Who we are, what we do and what makes the way we work different from a conventional shop.",
    items: [
      {
        question: "What is Design By TWM?",
        answer:
          "Design By TWM is an automotive customization house in Houston, Texas. It performs ten disciplines under one roof: blackout packages, paint protection film, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, lighting, audio and truck accessories, along with a separate dealer services division.",
      },
      {
        question: "Where is Design By TWM located?",
        answer:
          "The facility is at 18235 Ammi Trail, Houston, Texas 77060, in north Houston. All work is performed at that single location rather than distributed across partner shops.",
      },
      {
        question: "How did Design By TWM start?",
        answer:
          "The house grew out of Tire and Wheel Master, a Houston wheel and tire retailer operating three showrooms across the city. Customers buying wheels there kept asking for everything else a build needs, wraps, blackout work, protection film, interiors and suspension. Rather than reshape an established retail operation around custom build work, Design By TWM was opened as its own house dedicated entirely to complete transformations.",
      },
      {
        question: "What does TWM stand for?",
        answer:
          "TWM comes from Tire and Wheel Master, the Houston wheel and tire business the house grew out of. The name keeps the connection to where the work started, which was wheels and fitment, while Design By TWM covers the full range of disciplines a complete build needs.",
      },
      {
        question: "Is Design By TWM connected to Tire and Wheel Master?",
        answer:
          "By lineage, not by operation. Tire and Wheel Master is a wheel and tire retailer with three Houston locations. Design By TWM is a separate business running independently from its own facility on Ammi Trail, opened because complete vehicle transformation is a different kind of work than retail wheel sales, on a different pace and requiring a different level of coordination between disciplines.",
      },
      {
        question: "Does that wheel and tire background affect how you build?",
        answer:
          "It shows in fitment. Wheels were the starting point, so offset, backspacing, brake clearance and ride height are measured and calculated before parts are ordered. That same approach carries into how the other disciplines on a build are planned.",
      },
      {
        question: "What does automotive customization house mean?",
        answer:
          "A conventional shop specializes in one thing and sends the rest of the work elsewhere. A customization house holds every discipline internally, so a vehicle needing wraps, wheels, suspension and an interior is handled as one project by one team instead of being passed between four vendors on four schedules.",
      },
      {
        question: "Why does in-house work matter?",
        answer:
          "Three practical reasons. Finish work is selected and applied by the same team across every panel. Stages are sequenced on one calendar rather than waiting on an outside shop. And you deal with one house throughout, instead of coordinating between separate vendors.",
      },
      {
        question: "What kinds of vehicles do you work on?",
        answer:
          "Domestic and imported vehicles alike: luxury and exotic cars, performance vehicles, SUVs and trucks. The disciplines are the same across all of them, though scope differs. An exotic is more likely to come in for paint protection film and wheels, a truck for suspension, accessories and lighting.",
      },
      {
        question: "Do I need an exotic or luxury car to work with you?",
        answer:
          "No. The work is defined by the standard applied, not by the badge on the vehicle. Daily drivers, trucks and enthusiast cars go through the same process and the same quality control as anything else in the building.",
      },
      {
        question: "Do you serve areas outside Houston?",
        answer:
          "Yes. Clients come from across the greater Houston area including The Woodlands, Katy, Sugar Land, Cypress, Spring, Pearland, League City, Conroe, Magnolia and Hockley, and vehicles are regularly transported in from elsewhere in Texas for larger builds.",
      },
    ],
  },

  {
    id: "getting-started",
    label: "Getting Started",
    intro:
      "How a project begins, from first inquiry through an approved plan.",
    items: [
      {
        question: "How do I get a quote?",
        answer:
          "Submit the intake form or call the house, describe the vehicle and what you have in mind, and we schedule a consultation. Quotes are given per vehicle after seeing it in person rather than from a flat price list, because the same service can differ substantially between two cars.",
      },
      {
        question: "Do I need an appointment?",
        answer:
          "Yes, for a consultation. Seeing the vehicle in person lets us assess paint condition, existing modifications and fitment, which is what the quote is based on.",
      },
      {
        question: "I know I want something done but not exactly what. Can you help?",
        answer:
          "That is most of what a consultation is for. Clients frequently arrive knowing they want the vehicle to look a certain way without knowing which disciplines get them there. Because all ten are performed here, the recommendation is not shaped by which services happen to be available.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "It depends on scope and on the shop calendar. A contained job can often be scheduled quickly, while a multi-discipline build involving parts on order needs planning further out. Timing is confirmed when the plan is approved rather than estimated at first contact.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "Yes. A deposit is taken before parts and materials are ordered for your vehicle, which on a custom build are not returnable. Deposit and balance terms are set out in writing with your quote.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Card, bank transfer and cash are accepted. Financing options can be discussed for larger builds during the consultation.",
      },
      {
        question: "Can I change the scope after the build has started?",
        answer:
          "Often yes, and it is common once a client sees the vehicle mid-process. Any addition is quoted as an amendment to the original plan before it is scheduled.",
      },
    ],
  },

  {
    id: "during-the-build",
    label: "During the Build",
    intro:
      "What happens once your vehicle is with us.",
    items: [
      {
        question: "How long will my vehicle be here?",
        answer:
          "Anywhere from a few days for a contained job to several weeks for a full multi-discipline build. An estimated window is discussed when the plan is approved. Because every discipline runs in the same building, the vehicle does not move between shops between stages.",
      },
      {
        question: "Will I get updates while the work is happening?",
        answer:
          "Yes. You have a single point of contact for the whole project rather than a different person per discipline, and progress is shared as the build moves through its stages.",
      },
      {
        question: "Can I see my vehicle during the build?",
        answer:
          "Visits can be arranged. Mid-build is genuinely the most interesting time to see a vehicle, particularly during an interior retrim or while film is being laid, though access is scheduled rather than open so the work is not interrupted.",
      },
      {
        question: "Where is my vehicle kept while it is being worked on?",
        answer:
          "Work and staging happen inside the facility. Arrangements for longer builds are discussed as part of the plan.",
      },
      {
        question: "Can you arrange transport for my vehicle?",
        answer:
          "Enclosed transport can be coordinated for clients outside the immediate Houston area or for vehicles that are not comfortably driven to the facility. This is arranged during the consultation.",
      },
    ],
  },

  {
    id: "aftercare",
    label: "Aftercare",
    intro:
      "What happens after you collect the vehicle.",
    items: [
      {
        question: "What happens if something is not right after I pick up the vehicle?",
        answer:
          "Bring it back so we can look at it. Because the work was performed here rather than subcontracted, the team you speak to is the same team that did the original work.",
      },
      {
        question: "How do I care for the work after delivery?",
        answer:
          "Care depends on what was done, and guidance for your specific build is given at handover. In general we recommend hand washing with a pH neutral soap, avoiding automatic brush washes, and keeping high pressure away from film and vinyl edges.",
      },
      {
        question: "Do you offer maintenance after a build?",
        answer:
          "Yes. Ongoing detailing, protection maintenance and inspection of film and coatings can be scheduled, and long-term clients frequently return for additional work as vehicles change.",
      },
    ],
  },

  {
    id: "dealers-and-fleet",
    label: "Dealers and Fleet",
    intro:
      "Volume work for dealership inventory and commercial vehicles runs through a separate division.",
    items: [
      {
        question: "Do you work with dealerships?",
        answer:
          "Yes. The Dealer Services Division handles inventory work at volume, including blackout and trim packages, wheel and tire programs, wraps, lift kits, protection and audio upgrades prepared for retail delivery.",
      },
      {
        question: "Can you handle multiple vehicles at once?",
        answer:
          "Yes. Dealer and fleet work is scheduled as a program rather than as individual bookings, with a single agreed specification applied across the units in that program.",
      },
      {
        question: "Do you do commercial fleet wraps?",
        answer:
          "Yes. Fleet graphics and full color change wraps are performed in house, with color matched to your brand specification as part of the planning stage.",
      },
      {
        question: "How does a dealership get started?",
        answer:
          "Through the dealer inquiry form or by calling the house directly. Dealer programs begin with a conversation about inventory mix, volume and turnaround expectations before any specification is set.",
      },
    ],
  },
];

/** Flat list of every company question, for schema. */
export const companyFaqs: FaqItem[] = companyFaqGroups.flatMap((group) => group.items);
