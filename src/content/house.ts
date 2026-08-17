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
 * STILL PLACEHOLDER, STILL A LAUNCH BLOCKER
 * ------------------------------------------------------------
 * `testimonials` is fabricated in full. Jose confirmed on August 17
 * that it stays in place until Liz supplies real, permissioned quotes.
 *
 * Fabricated endorsements on a live site are an FTC exposure. This must
 * not ship. Tracked in CLIENT_REVIEW_NOTES.md section 15.1.
 * ============================================================
 */

export interface Testimonial {
  quote: string;
  name: string;
  vehicle: string;
  disciplines: string;
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
    copy: "The vehicle is presented clean and complete, with care guidance for whatever was done to it. What happens after delivery matters as much as the build, so aftercare and warranty terms are walked through rather than handed over on paper.",
  },
];

/* ---------------- FACILITY, TEAM AND ORIGIN ----------------
   Removed August 17 2026 per Liz. See the header note above.
   `facilityStats`, `team` and `originStory` no longer exist.
----------------------------------------------------------- */

/* ---------------- TESTIMONIALS ----------------
   EVERY ENTRY BELOW IS FABRICATED PLACEHOLDER CONTENT.
   Must be replaced with real, permissioned customer
   testimonials before this site goes live.
----------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had gotten quotes from three different shops and would have been driving the truck between all of them over about two months. They did the whole thing in one place and I picked it up in under three weeks.",
    name: "Marcus T.",
    vehicle: "Ford F-250",
    disciplines: "Suspension · Wheels & Fitment · Blackout · Lighting",
    placeholder: true,
  },
  {
    quote:
      "What sold me was that they told me not to do something. I wanted the whole car wrapped and they walked me around the paint and explained why the front end needed film instead. That kind of answer is why I went back for the interior.",
    name: "Priya N.",
    vehicle: "Porsche Cayenne",
    disciplines: "Paint Protection Film · Interior Transformation",
    placeholder: true,
  },
  {
    quote:
      "The satin on the trim matches the satin on the mirror caps and the exhaust tips exactly. Sounds like a small thing until you have seen a car where it does not, and then it is the only thing you can look at.",
    name: "Devon R.",
    vehicle: "Range Rover Sport",
    disciplines: "Blackout Packages · Wheels & Fitment",
    placeholder: true,
  },
  {
    quote:
      "Same person answered the phone every single time for six weeks. I never had to explain the project again from the beginning, and I never wondered who was actually responsible for it.",
    name: "Alicia G.",
    vehicle: "Mercedes-Benz G-Class",
    disciplines: "Vehicle Wraps · Interior Transformation · Audio",
    placeholder: true,
  },
];

/** Anything still flagged is a launch blocker. Used by the dev-only warning. */
export const placeholderCount = testimonials.filter((t) => t.placeholder).length;
