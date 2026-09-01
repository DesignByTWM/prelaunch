/**
 * JOURNAL
 *
 * Educational content, written to earn answer engine citations rather than
 * to fill a blog. Each post targets a question people actually search and
 * answers it properly, including the parts that do not favour us. An
 * article that says "wrap is not right for you if X" gets cited. An article
 * that says wrap is always great does not.
 *
 * Structure mirrors what Sanity will return so the CMS swap is a data
 * source change, not a rewrite.
 *
 * DRAFT COPY. Technically accurate as general industry guidance, but every
 * claim about how DESIGNBYTWM specifically works needs Henry's review.
 * Tracked in CLIENT_REVIEW_NOTES.md section 18.
 */

export interface PostSection {
  heading: string;
  body: string[];
}

export interface JournalPost {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  summary: string;
  category: string;
  readingTime: string;
  published: string;
  hero: string;
  heroAlt: string;
  intro: string[];
  sections: PostSection[];
  takeaway: string;
  /** Slugs of related service pages. */
  related: string[];
  faqs: { question: string; answer: string }[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "ppf-vs-ceramic-coating",
    title: "PPF or ceramic coating: which does your car actually need?",
    summary:
      "Paint protection film and ceramic coating are constantly compared as if they are alternatives. They are not. Here is what each one actually does and when you need both.",
    category: "Protection",
    readingTime: "6 min",
    published: "2026-08-04",
    hero: "/maincard2ppf.webp",
    heroAlt: "Paint protection film being installed on a vehicle hood",
    intro: [
      "This is the most common question that comes through the house, and the framing is usually wrong. People ask which one is better, as though they solve the same problem. They do not.",
      "One is a physical barrier. The other is a chemical surface treatment. Comparing them is like asking whether a phone case is better than a screen protector.",
    ],
    sections: [
      {
        heading: "What paint protection film does",
        body: [
          "Paint protection film is a clear urethane layer, typically six to eight mil thick, applied over the factory paint. It is a physical barrier, and it is the only one of the two that stops impact damage.",
          "A stone thrown up by a truck on I-45 hits the film instead of the paint. Most modern films are self healing, meaning light scratches and wash marring disappear with heat from the sun or warm water.",
          "What it does not do is make the car easier to wash or dramatically change how it looks, beyond a slight gloss or satin shift depending on the film chosen.",
        ],
      },
      {
        heading: "What ceramic coating does",
        body: [
          "Ceramic coating is a liquid polymer that bonds to the surface and cures into a hard, hydrophobic layer measured in microns rather than mils.",
          "It makes water bead and sheet off, makes contaminants far less likely to bond, holds gloss, and makes the car meaningfully easier to keep clean. In Houston, where bug season and hard water spotting are both real problems, that last point matters more than people expect.",
          "What it does not do is stop a rock chip. A coating is a few microns thick. It has no impact resistance worth discussing, and any claim otherwise should be treated with suspicion.",
        ],
      },
      {
        heading: "When you need film",
        body: [
          "If the vehicle is driven on highways, if it is new or has high resale value, or if the paint is a soft or hard-to-match colour, film on the impact zones is the higher priority of the two.",
          "The most common sensible coverage is an extended front: full hood, full fenders, mirrors, bumper and a strip of the roof leading edge. That covers where the overwhelming majority of chips actually land.",
        ],
      },
      {
        heading: "When coating alone is enough",
        body: [
          "If the vehicle is garage kept, driven mostly in town, or already has paint that has lived a life, a coating on its own is a perfectly reasonable decision.",
          "It is also the right call when the budget does not stretch to both and the honest priority is keeping the car looking good and easy to maintain rather than protecting resale value.",
        ],
      },
      {
        heading: "Why most builds use both",
        body: [
          "The standard combination is film on the impact zones and coating over the top, including over the film itself.",
          "Coating over film is not redundant. Film has a slightly grabbier surface than clear coat and holds dirt more readily. A coating on top solves that, and it makes the whole car, filmed and unfilmed panels alike, behave the same way when you wash it.",
        ],
      },
      {
        heading: "The order matters",
        body: [
          "Film goes on first, coating second. Applying coating to bare paint and then film over the top means the film is bonding to the coating rather than to the paint, which is not what either product is designed for.",
          "This is also why sequencing across separate vendors goes wrong. A detailer coats the car, the film shop then has to strip the coating from every panel they are filming, and the owner pays twice for the same surface.",
        ],
      },
    ],
    takeaway:
      "Film stops chips. Coating stops dirt sticking and keeps the finish sharp. If you can only do one and the car is new and driven, film on the front. If the car is older or garage kept, coating. Most vehicles that come through here end up with both, in that order.",
    related: ["paint-protection-film", "vehicle-wraps", "paint-and-body"],
    faqs: [
      {
        question: "Can you put ceramic coating over paint protection film?",
        answer:
          "Yes, and it is the standard approach. Coating over film improves wash release on the film surface, which is slightly grabbier than clear coat, and makes filmed and unfilmed panels behave consistently.",
      },
      {
        question: "Is ceramic coating a substitute for paint protection film?",
        answer:
          "No. Ceramic coating is measured in microns and has no meaningful impact resistance. It does not stop rock chips. Only paint protection film provides a physical barrier against impact damage.",
      },
    ],
  },

  {
    slug: "wrap-vs-paint",
    title: "Wrap or repaint: an honest comparison",
    summary:
      "Colour change by wrap and colour change by paint solve the same problem in very different ways. Cost, reversibility, durability and the situations where each one is the wrong answer.",
    category: "Finish",
    readingTime: "7 min",
    published: "2026-07-28",
    hero: "/maincard3wraps.webp",
    heroAlt: "Vinyl wrap being applied to a luxury coupe",
    intro: [
      "Both change the colour of the car. That is where the similarity ends, and picking the wrong one is an expensive mistake in either direction.",
    ],
    sections: [
      {
        heading: "Reversibility is the real difference",
        body: [
          "A wrap comes off. Paint does not. If the vehicle is leased, if you plan to sell within a few years, or if you want a colour you are not certain you will still love in three years, that single fact usually settles the question.",
          "A wrap on healthy factory paint also protects the paint underneath while it is on. Removing a wrap after three years frequently reveals paint in better condition than the panels that were never covered.",
        ],
      },
      {
        heading: "Where wrap wins",
        body: [
          "Finishes paint cannot easily do. Satin, matte, colour shift, brushed metallic and textured films exist off the roll. Achieving those in paint is possible but significantly more expensive and, in the case of matte, a maintenance commitment most owners underestimate.",
          "Speed. A full wrap is days. A quality repaint is weeks.",
          "Partial changes. A roof, a hood, a set of accents. Wrapping one panel is straightforward. Painting one panel and matching it to the rest of an aged factory finish is genuinely difficult work.",
        ],
      },
      {
        heading: "Where paint wins",
        body: [
          "Longevity. A quality repaint outlasts a wrap several times over. In the Houston climate a wrap is a three to five year decision, with horizontal surfaces going first.",
          "Damaged or previously repaired paint. Wrap over failing paint is a bad idea, because removal can lift the finish that was already struggling. If the surface underneath is not sound, wrap is not the answer regardless of budget.",
          "Complex bodywork. Deep recesses, sharp compound curves and heavily vented panels are where wrap installers earn their money, and some shapes simply finish better in paint.",
        ],
      },
      {
        heading: "The question nobody asks first",
        body: [
          "What condition is the paint in right now? This decides more than budget does.",
          "Wrap needs sound paint underneath. If a vehicle has aftermarket respray, prior body filler or clear coat that is beginning to fail, wrapping it is borrowing against a problem that gets worse when the film comes off.",
          "Any shop worth using inspects the paint before quoting a wrap and tells you plainly if the surface is not a candidate. If a wrap quote arrives without anybody looking at the car, that is worth noticing.",
        ],
      },
      {
        heading: "What it costs to live with",
        body: [
          "A wrap wants hand washing with pH neutral soap, no automatic brush washes and no high pressure aimed directly at edges and seams. It does not need waxing, though a wrap safe sealant helps against the sun.",
          "Paint wants what paint has always wanted, and benefits enormously from protection film on the impact areas regardless of whether the colour is factory or custom.",
        ],
      },
    ],
    takeaway:
      "If you might change your mind, if the car is leased, or if you want a finish paint cannot easily produce, wrap it. If you are keeping the vehicle long term and want the colour to be permanent, paint it. And before either, have somebody look at the paint that is already on it.",
    related: ["vehicle-wraps", "paint-and-body", "paint-protection-film"],
    faqs: [
      {
        question: "Is wrapping a car cheaper than painting it?",
        answer:
          "Usually yes for a comparable quality of result, and considerably faster. A quality repaint takes weeks where a wrap takes days. The trade-off is longevity: paint lasts several times longer than vinyl.",
      },
      {
        question: "Does a wrap damage the paint underneath?",
        answer:
          "Not on healthy factory paint, which a wrap actually protects while it is on. Problems arise when wrapping over failing paint, prior body filler or an aftermarket respray, where removal can lift the finish.",
      },
    ],
  },

  {
    slug: "wheel-fitment-explained",
    title: "Why wheels do not fit: offset, backspacing and the numbers that matter",
    summary:
      "Bolt pattern is the least of it. A plain explanation of offset, backspacing, brake clearance and load rating, and why wheels bought online so often end up in a garage.",
    category: "Fitment",
    readingTime: "8 min",
    published: "2026-07-19",
    hero: "/maincard4wheels.webp",
    heroAlt: "Forged wheel and tire fitment detail on a customized vehicle",
    intro: [
      "Almost everybody who has bought wheels online has a story about a set that did not work. The bolt pattern matched, the diameter was right, and something else was wrong.",
      "Here is what that something else usually is.",
    ],
    sections: [
      {
        heading: "Offset",
        body: [
          "Offset is the distance between the wheel's mounting face and its centreline, in millimetres. Positive offset pushes the mounting face outward, which pulls the wheel inward under the arch. Negative offset does the opposite and pushes the wheel out.",
          "This is the single number that determines whether a wheel tucks, sits flush or pokes past the fender. It is also the number most likely to cause rubbing at full steering lock or over suspension travel.",
          "Two wheels with identical diameter, width and bolt pattern can sit thirty millimetres apart on the same car purely because of offset.",
        ],
      },
      {
        heading: "Backspacing",
        body: [
          "Backspacing measures from the mounting face to the inner lip, in inches. It is describing the same relationship as offset from the other direction, and it is the number that tells you whether the inner barrel will clear suspension components, brake calipers and strut housings.",
          "Truck people tend to work in backspacing, car people in offset. Both are describing where the wheel sits.",
        ],
      },
      {
        heading: "Brake clearance",
        body: [
          "Spoke design matters as much as size here. A large factory brake package, and certainly an upgraded one, rules out entire wheel designs regardless of diameter.",
          "This has to be measured on the vehicle. Manufacturer clearance charts are approximations, and they do not know what has already been changed on your car.",
        ],
      },
      {
        heading: "Load rating",
        body: [
          "Non-negotiable on trucks and SUVs, and the factor most often ignored on appearance-led builds.",
          "A wheel rated below what the vehicle requires is not a compromise, it is a wheel that should not go on the car. This is where cheap wheels on heavy vehicles become genuinely dangerous rather than just disappointing.",
        ],
      },
      {
        heading: "Rolling diameter and your speedometer",
        body: [
          "Going up in wheel diameter usually means going down in tire sidewall to keep the overall rolling diameter close to factory.",
          "Keep that number close and the speedometer stays accurate and the gearing feels unchanged. Let it drift significantly and the speedometer reads wrong, which on a modern vehicle can also affect traction control and ABS calibration.",
        ],
      },
      {
        heading: "Ride height changes all of it",
        body: [
          "This is the one that catches people out. A lift, a leveling kit, lowering springs or coilovers all change what will clear.",
          "Ordering wheels first and deciding on suspension afterwards is how a correct set of wheels becomes the wrong set of wheels. Both decisions belong in the same conversation, before either is ordered.",
        ],
      },
    ],
    takeaway:
      "Bolt pattern gets a wheel onto the hub. Offset, backspacing, brake clearance, load rating and rolling diameter decide whether it works. All of them are measurements from your specific vehicle, which is why fitment is checked on the lift rather than looked up in a chart.",
    related: ["wheels-and-fitment", "suspension", "truck-accessories"],
    faqs: [
      {
        question: "What is wheel offset in simple terms?",
        answer:
          "Offset is how far the wheel's mounting face sits from its centreline, measured in millimetres. It determines whether the wheel tucks under the arch, sits flush with the fender or pokes outward, and it is the main cause of rubbing when it is wrong.",
      },
      {
        question: "Why did my wheels not fit even though the bolt pattern matched?",
        answer:
          "Bolt pattern only determines whether the wheel mounts to the hub. Offset, backspacing, brake clearance, centre bore and load rating all have to be correct as well, and any one of them being wrong makes the wheel unusable on that vehicle.",
      },
    ],
  },

  {
    slug: "what-a-blackout-package-includes",
    title: "What a blackout package actually includes",
    summary:
      "Chrome delete means different things at different shops. A breakdown of every bright element on a modern vehicle, which method suits each one and what reversible actually means.",
    category: "Finish",
    readingTime: "5 min",
    published: "2026-07-11",
    hero: "/maincard1blackout.webp",
    heroAlt: "Blacked out trim and grille detail on a luxury SUV",
    intro: [
      "Two shops quote a blackout package. One quote is a third of the other. They are not quoting the same work, and the difference is almost never explained.",
    ],
    sections: [
      {
        heading: "Everything that is bright on a modern vehicle",
        body: [
          "Window surrounds and the pillar trim between them. Grille surround and grille slats. Front and rear badging. Model and trim lettering. Mirror caps. Roof rails and crossbars. Door handles. Lower valance and skid plate accents. Exhaust tips. Fog light bezels. Wheel centre caps.",
          "A quote covering four of those and a quote covering all fourteen will look very different, and both may honestly be described as a blackout package.",
        ],
      },
      {
        heading: "Three ways to do it",
        body: [
          "Vinyl. Reversible, faster, less expensive. The right choice on leased vehicles or where the owner might want the brightwork back. Quality depends heavily on whether pieces are removed before wrapping or wrapped in place.",
          "Paint. Permanent, and the best result on complex or textured pieces where vinyl struggles to lay flat. Requires removal, preparation and proper curing.",
          "Replacement. Some pieces are cheaper and better to swap for an aftermarket or factory blacked-out equivalent than to refinish. Grilles and badges frequently fall into this category.",
        ],
      },
      {
        heading: "Removed versus wrapped in place",
        body: [
          "This is the single biggest quality differentiator and the easiest thing to hide in a quote.",
          "Trim wrapped in place has visible film edges at every boundary and will lift at those edges eventually, faster in Houston heat. Trim removed, wrapped and reinstalled has no visible edge because the film terminates behind the piece.",
          "It is significantly more labour. It is also the difference between work that looks correct at three years and work that looks correct at three months.",
        ],
      },
      {
        heading: "Gloss, satin or matte",
        body: [
          "Gloss reads closest to factory and hides imperfection best. Satin is the most popular and the most forgiving in strong sunlight. Matte is the most striking and the least forgiving, both of application flaws and of cleaning.",
          "Whichever is chosen has to be consistent across every piece. Mixed sheens across trim is the most common mistake in this category and it is immediately visible once you notice it.",
        ],
      },
    ],
    takeaway:
      "Ask any quote two questions. Which specific pieces are included, and are they being removed or wrapped in place. Those two answers explain almost every price difference between blackout quotes.",
    related: ["blackout-packages", "vehicle-wraps", "paint-and-body"],
    faqs: [
      {
        question: "Is a chrome delete reversible?",
        answer:
          "It depends on the method. Vinyl based chrome delete is reversible and the trim underneath is unaffected. Painted or powder coated trim is permanent. The right choice usually depends on whether the vehicle is leased and how long it will be kept.",
      },
      {
        question: "Why do blackout package quotes vary so much?",
        answer:
          "Two reasons. Which pieces are included, since a modern vehicle has around fourteen bright elements and quotes often cover only some. And whether trim is removed before being wrapped or wrapped in place, which is a large labour difference and the main driver of how long the work lasts.",
      },
    ],
  },

  {
    slug: "caring-for-a-wrapped-car-in-houston",
    title: "Caring for a wrapped car in Houston heat",
    summary:
      "Sun, humidity, hard water and love bug season. What actually shortens the life of a wrap in this climate and the small habits that add years to it.",
    category: "Aftercare",
    readingTime: "5 min",
    published: "2026-07-02",
    hero: "/build-sedan.webp",
    heroAlt: "Wrapped vehicle photographed in Houston sunlight",
    intro: [
      "A wrap that lasts five years in a mild climate might give you three here. Most of that gap is avoidable, and almost none of it is about the film you chose.",
    ],
    sections: [
      {
        heading: "Sun is the main enemy",
        body: [
          "UV exposure is what degrades vinyl, and horizontal surfaces take the most of it. Roofs and hoods always fail first, often years before the vertical panels show anything at all.",
          "A garaged vehicle will meaningfully outlast one parked outside daily. Covered parking at work matters as much as covered parking at home, since that is where the car sits through the hottest hours.",
        ],
      },
      {
        heading: "Wash by hand, and how",
        body: [
          "pH neutral soap, two buckets, a soft mitt. No automatic brush washes, which will find every edge and seam on the vehicle and start lifting them.",
          "Keep pressure washers well back and never aim them directly at an edge or a seam. Most wrap failures that arrive here for repair started at an edge that met high pressure at close range.",
        ],
      },
      {
        heading: "Deal with contaminants quickly",
        body: [
          "Bird droppings, love bugs and fuel spills all etch vinyl, and heat accelerates it dramatically. What would be a nuisance in a mild climate becomes permanent staining on a hot Houston afternoon.",
          "Keep a detail spray and a microfibre in the car. Something removed in ten seconds does not become a mark you look at for the next three years.",
        ],
      },
      {
        heading: "Hard water is a real problem here",
        body: [
          "Houston water leaves mineral deposits, and letting a car air dry in sunlight bakes those spots into the finish.",
          "Dry the vehicle rather than letting it drip, and avoid washing in direct sun where water evaporates before it can be dried off.",
        ],
      },
      {
        heading: "What not to do",
        body: [
          "Do not wax a wrap. It does nothing useful and on matte and satin finishes it will add gloss you did not ask for and cannot easily remove.",
          "Do not use polish or any abrasive product. Vinyl has no clear coat to correct, and abrading it simply removes material.",
          "Do not ignore a lifting edge. A small lift caught early is a quick fix. Left alone through a summer, it becomes a panel.",
        ],
      },
    ],
    takeaway:
      "Park in shade wherever you reasonably can, hand wash with pH neutral soap, keep pressure away from the edges, and get contaminants off quickly. Those four habits are worth more to the life of a wrap than the price difference between film brands.",
    related: ["vehicle-wraps", "paint-protection-film", "blackout-packages"],
    faqs: [
      {
        question: "How do you wash a wrapped car?",
        answer:
          "By hand, with a pH neutral soap and a soft mitt. Avoid automatic brush washes entirely, keep pressure washers well back and never aim them directly at edges or seams, and dry the vehicle rather than letting it air dry in the sun.",
      },
      {
        question: "How long does a car wrap last in Houston?",
        answer:
          "Three to five years for a quality film. Sun exposure is the main factor, so a garaged vehicle lasts noticeably longer than one parked outside daily, and horizontal surfaces such as the roof and hood always degrade before the vertical panels.",
      },
    ],
  },
];

export const getPost = (slug: string) =>
  journalPosts.find((post) => post.slug === slug);
