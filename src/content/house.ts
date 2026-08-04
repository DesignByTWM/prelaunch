/**
 * THE HOUSE · PAGE CONTENT
 *
 * ============================================================
 * PLACEHOLDER CONTENT WARNING
 * ============================================================
 * Everything in this file marked `placeholder: true` is invented
 * to complete the build for client review. It is NOT real.
 *
 * MUST be replaced before the site goes to production:
 *   - `team`         every member except the founder entry
 *   - `testimonials` every entry, all fabricated
 *   - `facilityStats` all figures invented
 *
 * Fabricated customer testimonials on a live site are a legal
 * exposure under FTC rules on endorsements and reviews. These
 * exist so Liz and Henry can see the layout and swap in real
 * content, not to be published.
 *
 * Tracked as launch blockers in CLIENT_REVIEW_NOTES.md section 15.
 * ============================================================
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  placeholder: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  vehicle: string;
  disciplines: string;
  placeholder: boolean;
}

/* ---------------- THE ORIGIN ---------------- */

export const originStory = [
  "Design By TWM did not begin as a customization house. It began behind a wheel and tire counter.",
  "Tire and Wheel Master has been selling wheels in Houston for years, across three showrooms spread through the city. Wheels are an entry point. A client comes in for a set of forged twenty-twos, and while the truck is on the lift the conversation turns to everything else. Could the chrome go? Could the interior be redone in something better than what came from the factory? Could the whole thing be wrapped a colour nobody else has?",
  "Those conversations kept happening, and the answers kept being no, or worse, the answer was a phone number for somebody else across town. Retail wheel sales runs on a rhythm of hours. A complete vehicle transformation runs on a rhythm of weeks. Trying to force the second into a building designed for the first would have broken both.",
  "So rather than reshape an operation that was already working, Henry opened a separate house dedicated entirely to the work those clients were asking for. Design By TWM took its initials from where it came from, and its standard from what was missing in the market: one team, one building, one point of contact, from the first drawing to the moment the keys go back.",
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

/* ---------------- FACILITY ----------------
   PLACEHOLDER. Every figure below is invented.
   Henry to supply real numbers or delete the section.
------------------------------------------- */

export const facilityStats = [
  { figure: "10", label: "Disciplines under one roof", placeholder: false },
  { figure: "22", label: "Cities served across greater Houston", placeholder: false },
  { figure: "1", label: "Point of contact per build", placeholder: false },
  { figure: "18,000", label: "Square feet of facility", placeholder: true },
  { figure: "12", label: "Working bays", placeholder: true },
  { figure: "3", label: "Dedicated finish booths", placeholder: true },
];

/* ---------------- TEAM ----------------
   PLACEHOLDER except the founder entry.
   Names, roles and bios below are invented.
--------------------------------------- */

export const team: TeamMember[] = [
  {
    name: "Henry Velasquez",
    role: "Founder",
    bio: "Grew up around the wheel and tire business and opened Design By TWM to handle the work clients kept asking for and could not get in one place. Sets the standard every build is measured against.",
    image: "/team-1.webp",
    placeholder: true,
  },
  {
    name: "Marco Delgado",
    role: "Build Coordinator",
    bio: "Owns the schedule and is the single point of contact on every project. Sequences the disciplines so a vehicle never waits on a stage that could have been planned around.",
    image: "/team-2.webp",
    placeholder: true,
  },
  {
    name: "Andre Whitfield",
    role: "Lead Installer, Film and Wrap",
    bio: "Plots, cuts and lays every metre of protection film and vinyl that leaves the building. Known for edges nobody can find and for refusing to wrap paint that is not ready for it.",
    image: "/team-3.webp",
    placeholder: true,
  },
  {
    name: "Renata Salinas",
    role: "Lead Trimmer, Interiors",
    bio: "Patterns every interior to the specific vehicle rather than to a universal kit. Handles leather, Alcantara, stitch design and the parts of a cabin owners touch every day.",
    image: "/team-4.webp",
    placeholder: true,
  },
  {
    name: "Dominic Reyes",
    role: "Paint and Body Lead",
    bio: "Matches colour to the vehicle rather than to the paint code, because factory finishes shift with sun and age. Runs refinishing, panel repair and collision work.",
    image: "/team-5.webp",
    placeholder: true,
  },
  {
    name: "Trey Bonner",
    role: "Wheels, Fitment and Suspension",
    bio: "Solves offset, clearance and ride height on the lift before anything is ordered. The reason fitment problems here get caught at the planning stage instead of on delivery day.",
    image: "/team-6.webp",
    placeholder: true,
  },
];

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
export const placeholderCount =
  team.filter((m) => m.placeholder).length +
  testimonials.filter((t) => t.placeholder).length +
  facilityStats.filter((s) => s.placeholder).length;
