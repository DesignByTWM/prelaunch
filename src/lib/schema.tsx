/**
 * STRUCTURED DATA
 *
 * One builder per entity type. Everything reads from lib/site.ts so the
 * NAP emitted to Google, Bing and Apple can never drift from the NAP
 * rendered on the page, which is the single most common cause of local
 * ranking loss.
 *
 * Notes on choices made here:
 *
 * - AutoBodyShop is used rather than the generic LocalBusiness. It is a
 *   recognised subtype and it tells search engines what kind of business
 *   this is without relying on the description text.
 *
 * - hasOfferCatalog lists all ten disciplines against the organization.
 *   This is what lets an answer engine respond to "who does paint
 *   protection film and wheels in Houston" with one business rather than
 *   two, which is the entire commercial argument for an in-house house.
 *
 * - areaServed is populated from the location program so the 22 city
 *   pages reinforce one entity instead of competing as separate ones.
 *
 * - FAQPage is emitted from the same objects that render the visible
 *   questions. Schema that does not match visible content is a manual
 *   action risk, so they are never allowed to diverge.
 */

import { hours, nap, site, socials } from "@/lib/site";
import { services } from "@/content/services";

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "AutoBodyShop",
    "@id": ORG_ID,
    name: nap.businessName,
    legalName: site.legalName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: nap.phone,
    email: nap.email,
    image: `${site.url}/dbtwmmainpagehero.webp`,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logos/designbytwm_logo_black.svg`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: nap.street,
      addressLocality: nap.city,
      addressRegion: nap.state,
      postalCode: nap.postalCode,
      addressCountry: nap.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: nap.latitude,
      longitude: nap.longitude,
    },
    openingHoursSpecification: hours
      .filter((entry) => entry.opens)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days,
        opens: entry.opens,
        closes: entry.closes,
      })),
    sameAs: socials.map((social) => social.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "In-house automotive customization disciplines",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: `${site.url}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: nap.businessName,
    publisher: { "@id": ORG_ID },
    creator: {
      "@type": "Organization",
      name: "Bizsual",
      url: "https://bizsual.com",
    },
    inLanguage: "en-US",
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string[];
  offers?: { name: string; description: string; includes: string[] }[];
}) {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}/services/${input.slug}`,
    serviceType: input.name,
    provider: { "@id": ORG_ID },
    areaServed: (input.areaServed ?? [`${nap.city}, ${nap.stateFull}`]).map((area) => ({
      "@type": "City",
      name: area,
    })),
    /**
     * Tiers are emitted WITHOUT price, by client instruction of August 14
     * 2026. An Offer with no price is valid and still tells an answer
     * engine the levels exist, which is what distinguishes a real operator
     * from a directory listing. Adding a price later is a one line change.
     */
    ...(input.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${input.name} packages`,
            itemListElement: input.offers.map((offer) => ({
              "@type": "Offer",
              name: offer.name,
              description: offer.description,
              itemOffered: {
                "@type": "Service",
                name: `${input.name}: ${offer.name}`,
                description: offer.includes.join(". "),
              },
            })),
          },
        }
      : {}),
  };
}

/**
 * HowTo, from the four step process block on every service page.
 *
 * This is the highest value addition in Liz's August 14 templates. Process
 * content answers "how does this actually work" in a form answer engines
 * quote directly, and no competitor in this market publishes it in a
 * machine readable way.
 *
 * No estimatedCost is emitted, consistent with the no pricing instruction.
 */
export function howToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

/**
 * Emits a single @graph rather than several loose script tags. One graph
 * lets the entities reference each other by @id, which is how a crawler
 * understands that the FAQ, the services and the business are one thing.
 */
export function JsonLd({ graph }: { graph: object[] }) {
  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // Content is generated from typed local data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
