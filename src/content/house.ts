/**
 * THE HOUSE · PAGE CONTENT
 *
 * ============================================================
 * REDUCED, August 17 2026
 * ============================================================
 * Liz answered the open questions on August 14 2026:
 *
 *   Tire and Wheel Master lineage . . . . . . remove
 *   Origin story  . . . . . . . . . . . . . . remove
 *   Team section  . . . . . . . . . . . . . . remove
 *   Facility figures  . . . . . . . . . . . . remove
 *
 * Per Jose, the page keeps a modest intro, Under One Roof, the ten
 * disciplines and Process. Nothing that overstates the business.
 *
 * The removed exports are gone rather than commented out. The copy is
 * preserved in CLIENT_REVIEW_NOTES.md and in git history if it is ever
 * wanted back.
 *
 * ------------------------------------------------------------
 * TESTIMONIALS: RESOLVED August 31 2026
 * ------------------------------------------------------------
 * The four fabricated placeholders were replaced with genuine public
 * reviews from the DESIGNBYTWM Google Business Profile. `placeholder`
 * is false on all four and the launch blocker is closed.
 *
 * See CLIENT_REVIEW_NOTES.md section 28.
 * ============================================================
 */

export interface Testimonial {
  quote: string;
  name: string;
  vehicle: string;
  disciplines: string;
  /** Link to the published review, so any claim is checkable. */
  sourceUrl?: string;
  placeholder: boolean;
}

/* ---------------- INTRO ----------------
   Deliberately modest. Claims only what the business does, with no
   history, no headcount and no facility figures behind it.
---------------------------------------- */

export const houseIntro = [
  "Design By TWM is an automotive customization house in Houston. Wheels, wraps, blackout packages, paint protection film, interiors, suspension, paint and body, lighting, audio and truck accessories are all performed here, by one team, in one building.",
  "That is the whole idea. A vehicle that needs four disciplines does not need four shops, four schedules and four people each pointing at the other when something needs correcting. It needs one plan and one point of contact.",
];

/* ---------------- WHY IN HOUSE ---------------- */

export const inHousePillars = [
  {
    title: "Finishes match",
    copy: "Gloss, satin and matte read differently under different light and against different paint. When one team selects and applies the finish across every panel, trim piece and accessory on a vehicle, it resolves as one deliberate decision instead of three vendors' best guesses.",
  },
  {
    title: "Schedules hold",
    copy: "A build with four disciplines and four shops has four calendars, and the vehicle waits on every one of them. Here the disciplines are sequenced inside one schedule, so wheels are not sitting in a box while the wrap cures somewhere else.",
  },
  {
    title: "Accountability is singular",
    copy: "When something needs correcting there is no conversation about which vendor is responsible. The team that performed the work handles the correction, which is a very different experience than being handed between two businesses each pointing at the other.",
  },
  {
    title: "Disciplines get planned together",
    copy: "Ride height changes what wheels will clear. A wrap changes where film should go. An interior retrim is the moment to run ambient lighting. Decisions that would be discovered too late across separate shops are made at the planning stage here.",
  },
];

/* ---------------- PROCESS ---------------- */

export const processSteps = [
  {
    title: "Consultation",
    copy: "The vehicle comes in and gets looked at properly. Paint condition, existing modifications, what you want it to become. This is where direction gets set and where we say plainly if something you are asking for is not the right call for the car.",
  },
  {
    title: "The plan",
    copy: "Disciplines are specified as one package rather than quoted piece by piece. Materials, finishes, fitment and sequence are decided before anything is ordered, and you see the whole scope and the whole number at once.",
  },
  {
    title: "The build",
    copy: "Work moves through the building in a planned order. You have a single point of contact for the entire project rather than a different person for each discipline, and progress is shared as the vehicle moves through its stages.",
  },
  {
    title: "Quality control",
    copy: "Every panel, seam, edge and torque spec is checked before the vehicle is called finished. Anything that does not meet the standard goes back before you ever see it, not after.",
  },
  {
    title: "Delivery",
    copy: "The vehicle is presented clean and complete, with care guidance for whatever was done to it. What happens after delivery matters as much as the build, so aftercare is walked through in person rather than handed over on paper.",
  },
];

/* ---------------- FACILITY, TEAM AND ORIGIN ----------------
   Removed August 17 2026 per Liz. See the header note above.
   `facilityStats`, `team` and `originStory` no longer exist.
----------------------------------------------------------- */

/* ---------------- TESTIMONIALS ----------------
   REAL, August 31 2026.

   All four fabricated placeholders were replaced with genuine public
   reviews from the DESIGNBYTWM Google Business Profile, sourced by Jose.

   Rules applied, and they matter:
     - Quoted as written. Spelling and phrasing are the reviewer's own,
       lightly trimmed only where marked with an ellipsis, never in a way
       that changes meaning or strengthens the praise.
     - Attributed by the name the reviewer published under, with the
       source named on the page. Nothing is anonymised or dressed up.
     - Vehicle and disciplines are taken from what the reviewer actually
       describes. Where they do not say, the field is left general
       rather than invented.

   That is what separates this from the placeholders it replaces. These
   are real people who chose to publish these words in public.
----------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Wrapped my GT satin black got rims blacked, tinted all windows along with head lights and tail lights. Could not of imagined the process being so smooth and seamless. TWM definitely exceeded my expectations and then some! was updated about progress daily! job was done in less than a week!",
    name: "Matt Tolve",
    vehicle: "Google review",
    disciplines: "Vehicle Wraps · Wheels & Fitment · Lighting",
    sourceUrl: "https://maps.app.goo.gl/kQzdVSQN3fkpcXqk9",
    placeholder: false,
  },
  {
    quote:
      "We have been very pleased with the quality of work. We've been customers for a few years and they've done work on two cars for us. We first used them for some custom paint and a wrap. They exceeded expectations and we loved how our cars turned out.",
    name: "Hillary Sweet",
    vehicle: "Google review",
    disciplines: "Paint & Body · Vehicle Wraps",
    sourceUrl: "https://maps.app.goo.gl/bSoydXkxVrmGGphB8",
    placeholder: false,
  },
  {
    quote:
      "Got a wrap recently done on my wife's car. The color was fantastic. I've had no issues with bubbling. I wrapped my truck a few years ago and I had nothing but problems so I decided to go to a professional. When I buy my new truck, I know exactly where I'm bringing it for a wrap.",
    name: "Myles Corbin",
    vehicle: "Google review",
    disciplines: "Vehicle Wraps",
    sourceUrl: "https://maps.app.goo.gl/g9tRVoz6tiA6ox2y6",
    placeholder: false,
  },
  {
    quote:
      "TWM does great work and have done several of my vehicles and they go above and beyond to satisfy u. I have nothing but good things to say about them.",
    name: "Chad Smith",
    vehicle: "Google review",
    disciplines: "Multiple vehicles",
    sourceUrl: "https://maps.app.goo.gl/559UN6nDpmunsgUFA",
    placeholder: false,
  },
];

/** Anything still flagged is a launch blocker. Used by the dev-only warning. */
export const placeholderCount = testimonials.filter((t) => t.placeholder).length;
