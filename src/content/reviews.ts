/**
 * HOMEPAGE REVIEWS
 *
 * The four Google reviews in the homepage Testimonials section, and the
 * only source for them. The cards and the Review structured data are both
 * generated from this list, so what a visitor reads and what a search
 * engine reads cannot drift apart.
 *
 * Copy is verbatim as approved, October 8 2026, capitals included.
 * `quote` is stored without its surrounding quotation marks: the card adds
 * them, and the schema's reviewBody uses the text as it is here.
 *
 * Every review is five stars. There is no date on purpose: the review
 * dates were not supplied, and a guessed date is worse than none.
 */

export interface Review {
  /** Card heading. Also the Review's name in the schema. */
  title: string;
  /** The visible quote, without its surrounding quotation marks. */
  quote: string;
  /** As displayed, first name and initial. Also the schema author. */
  name: string;
  /** Small caps service line under the name. */
  label: string;
  /** The review on Google Maps. */
  url: string;
}

export const reviews: Review[] = [
  {
    title: "EXCEEDED EXPECTATIONS",
    quote:
      "We've been customers for a few years and they've done work on two cars for us. We first used them for some custom paint and a wrap. They exceeded expectations and we loved how our cars turned out... Overall we have been super happy and would recommend to anyone.",
    name: "Hillary S.",
    label: "PAINT & WRAP",
    url: "https://maps.app.goo.gl/xB1TDRLkLqFZJNyp6",
  },
  {
    title: "DONE IN UNDER A WEEK",
    quote:
      "Wrapped my GT satin black, got rims blacked, tinted all windows along with headlights and taillights... TWM definitely exceeded my expectations and then some! Was updated about progress daily! Job was done in less than a week!",
    name: "Matt T.",
    label: "BLACKOUT PACKAGE",
    url: "https://maps.app.goo.gl/1V431mPQjX9qRyPf7",
  },
  {
    title: "COMMUNICATION, PRICING, QUALITY",
    quote:
      "Excellent communication, pricing and I can't say enough about the quality of work. I had Henry and his team wrap my Range Rover and install new wheels and tires. Don't shop anywhere else!",
    name: "Trevor S.",
    label: "WRAP & WHEELS",
    url: "https://maps.app.goo.gl/fNkzqidziuijaXZ28",
  },
  {
    title: "THE MOST PROFESSIONAL",
    quote:
      "I have been involved with automobile customization for a very long time and by far these guys are the most professional, and do the best work.",
    name: "Ahmad K.",
    label: "CUSTOM BUILD",
    url: "https://maps.app.goo.gl/hShWaFrYZ9Ju5gBC7",
  },
];

/** The trust strip under the cards. */
export const trustPoints = [
  { headline: "10 DISCIPLINES", subline: "ONE PROCESS, ONE TEAM" },
  { headline: "ALL IN-HOUSE", subline: "DESIGNED & BUILT UNDER ONE ROOF" },
  { headline: "HOUSTON, TX", subline: "SERVING TEXAS & BEYOND" },
  { headline: "PREMIUM PARTNERS", subline: "FORGIATO · VOSSEN · LEXANI · GIOVANNA" },
];
