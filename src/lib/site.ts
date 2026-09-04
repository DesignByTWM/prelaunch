/**
 * Single source of truth for NAP, identity and canonical URLs.
 *
 * NAP integrity is the backbone of local SEO and of Apple Maps / Siri
 * ingestion. Every phone number, address and business name rendered
 * anywhere on this site, in schema, in the footer, in forms, must come
 * from this file. Nothing gets typed by hand into a component.
 */

/** The one canonical production hostname. Nothing else is ever indexable. */
const PRODUCTION_ORIGIN = "https://designbytwm.com";

/**
 * Resolve the origin this deployment is actually running on.
 *
 * Order matters:
 *   1. NEXT_PUBLIC_SITE_URL, when explicitly set
 *   2. NEXT_PUBLIC_VERCEL_URL, injected automatically by Vercel, so a
 *      preview deployment gets correct canonicals with zero configuration
 *   3. localhost
 *
 * There is deliberately NO fallback to the production domain. An
 * unconfigured deployment must never claim to be designbytwm.com, because
 * that would emit canonical tags pointing the review build at the live
 * coming soon domain and mark itself indexable at the same time.
 */
function resolveOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

const origin = resolveOrigin();

export const site = {
  name: "DESIGNBYTWM",
  legalName: "Design By TWM",
  tagline: "Not a shop. The Automotive Customization House.",

  url: origin,

  /**
   * Indexing gate. TRUE only on the exact production origin.
   *
   * Every other environment, local, Vercel preview, staging subdomain or a
   * misconfigured deployment, is served noindex with robots.txt disallowing
   * everything. This fails closed on purpose: a review build hidden from
   * Google is a non-event, a review build competing with the live domain is
   * a problem that takes weeks to unwind.
   */
  isProduction: origin === PRODUCTION_ORIGIN,

  description:
    "Design By TWM is an automotive customization house in Houston, Texas. Blackout packages, paint protection film, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, lighting, audio and truck accessories, all executed in house by one team.",
} as const;

/** LOCKED. Do not add, change or duplicate. */
export const nap = {
  businessName: "DESIGNBYTWM",
  phone: "(832) 402-9174",
  phoneHref: "tel:+18324029174",
  smsHref: "sms:+18324029174",
  email: "info@designbytwm.com",
  street: "18235 Ammi Trail",
  city: "Houston",
  state: "TX",
  stateFull: "Texas",
  postalCode: "77060",
  country: "US",
  // Verified against the Google Business Profile pin, September 4 2026.
  latitude: 29.96596788453699,
  longitude: -95.39701566741802,
} as const;

export const napLine = `${nap.street}, ${nap.city}, ${nap.state} ${nap.postalCode}`;

/**
 * All six profiles carried over from Shopify. These double as schema
 * sameAs entities, which is a direct trust signal for both classic
 * search and AI answer engines resolving the brand.
 */
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/designbytwm" },
  { label: "Facebook", href: "https://www.facebook.com/designbytwm" },
  { label: "X", href: "https://x.com/designbytwm" },
  { label: "Pinterest", href: "https://www.pinterest.com/designbytwmhtx" },
  { label: "TikTok", href: "https://www.tiktok.com/@designbytwm" },
  { label: "YouTube", href: "https://www.youtube.com/@designbytwm" },
] as const;

/**
 * CONFIRMED by Liz, August 14 2026. Replaces the placeholder hours that
 * shipped with the review build.
 *
 * Note her mock still showed the old 9 to 6 and an open Saturday. Her
 * email governs, confirmed by Jose August 17 2026: Saturday is now closed.
 */
export const hours = [
  { days: "Monday to Friday", opens: "08:00", closes: "17:00" },
  { days: "Saturday", opens: null, closes: null },
  { days: "Sunday", opens: null, closes: null },
] as const;

/**
 * The 22 approved location pages. Houston is the master, the other 21
 * replicate it. This is the single source: `serviceAreas` below is derived
 * from it, so the footer, the schema areaServed and the routes can never
 * drift apart.
 */
export const locations = [
  { name: "Houston", slug: "houston" },
  { name: "The Woodlands", slug: "the-woodlands" },
  { name: "Katy", slug: "katy" },
  { name: "Sugar Land", slug: "sugar-land" },
  { name: "Cypress", slug: "cypress" },
  { name: "Spring", slug: "spring" },
  { name: "Tomball", slug: "tomball" },
  { name: "Humble", slug: "humble" },
  { name: "Kingwood", slug: "kingwood" },
  { name: "Pearland", slug: "pearland" },
  { name: "Friendswood", slug: "friendswood" },
  { name: "League City", slug: "league-city" },
  { name: "Missouri City", slug: "missouri-city" },
  { name: "Pasadena", slug: "pasadena" },
  { name: "Baytown", slug: "baytown" },
  { name: "Conroe", slug: "conroe" },
  { name: "Richmond", slug: "richmond" },
  { name: "Fulshear", slug: "fulshear" },
  { name: "Bellaire", slug: "bellaire" },
  { name: "Memorial", slug: "memorial" },
  { name: "Magnolia", slug: "magnolia" },
  { name: "Hockley", slug: "hockley" },
] as const;

/** Names only. Used for schema areaServed and inline city lists. */
export const serviceAreas = locations.map((location) => location.name);

/** Canonical route table. Nav, footer, sitemap and breadcrumbs all read from here. */
export const routes = {
  home: "/",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  builds: "/featured-builds",
  journal: "/journal",
  locations: "/locations",
  location: (slug: string) => `/locations/${slug}`,
  dealers: "/dealer-services",
  designYourBuild: "/design-your-build",
  wheels: "/wheels",
  faq: "/faq",
  about: "/the-house",
  contact: "/contact",
} as const;
