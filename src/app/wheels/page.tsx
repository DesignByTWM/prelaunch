import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, FaqBlock } from "@/components/ui/Page";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { wheelFaqs, wheelCatalog, wheelQuickFaqs } from "@/content/wheels";
import { routes, site } from "@/lib/site";

/**
 * SHOP WHEELS
 *
 * REBUILT August 28 2026 to Liz's mock of August 14 2026, approved by Jose.
 *
 * Her page, in her order:
 *   hero -> catalog grid, eight sets -> fitment FAQ -> closing CTA.
 *
 * This is a browse grid rather than a store. No prices, no cart, no stock.
 * Every card routes to the fitment inquiry, which is her own treatment:
 * "Inquire for fitment" on each card. So it does not pre-empt the Shopify
 * integration that is still deferred, it just stops the page reading as a
 * form with nothing to look at.
 *
 * Removed to match her composition, logged in CLIENT_REVIEW_NOTES.md 27.2:
 *   - the four wheel construction programs, forged, flow formed, cast,
 *     off-road, with their summaries and bullet points
 *   - the six fitment factors block
 *   - the CustomBand
 *   - the WheelInquiryForm. Her closing CTA routes to Design Your Build,
 *     which is the same lead capture one step further along
 *
 * Two deliberate departures, both flagged:
 *   1. Her filter pills, All / By Style / By Finish / By Size, are not
 *      built. In her mock they are decoration and filter nothing. Shipping
 *      dead controls on a luxury site is worse than not having them. The
 *      catalog data carries style, finish and size fields, so real filters
 *      can be added the day someone wants them.
 *   2. Her FAQ shows three questions. All ten are rendered, hers first in
 *      her order, because the other seven carry real search weight and are
 *      already in the FAQPage schema. Cutting to three is a one line change.
 */

export const metadata: Metadata = {
  title: "Shop Wheels",
  description:
    "Custom wheels and fitment in Houston. Forged, monoblock, multi-spoke and deep concave sets in a range of finishes, with fitment measured on your vehicle before anything is ordered.",
  alternates: { canonical: routes.wheels },
};

/* Hers lead, ours follow. Same order as the data file. */
const allWheelFaqs = [...wheelQuickFaqs, ...wheelFaqs];

export default function WheelsPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop Wheels", path: routes.wheels },
          ]),
          /**
           * CollectionPage, not Service.
           *
           * `serviceSchema` builds its url as /services/{slug}, so using it
           * here would emit a second Service entity for wheels pointing at
           * /services/wheels-and-fitment, which is a different page that
           * already carries that entity. Two Service nodes for one offering
           * is how a crawler ends up unsure which page to rank.
           *
           * This page is a browse grid, so it is described as a collection
           * belonging to the organization, and the Service entity stays
           * where it belongs on the service page.
           */
          {
            "@type": "CollectionPage",
            name: "Wheel Program",
            url: `${site.url}${routes.wheels}`,
            description:
              "Forged, monoblock, multi-spoke and deep concave wheel sets supplied and fitted in Houston, with offset, brake clearance and load rating measured on the vehicle before ordering.",
            isPartOf: { "@id": `${site.url}/#website` },
            about: { "@id": `${site.url}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: wheelCatalog.length,
              itemListElement: wheelCatalog.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
              })),
            },
          },
          faqSchema(allWheelFaqs),
        ]}
      />

      <PageHero
        image="/wheel-1.webp"
        imageAlt="Forged wheel fitted to a customized vehicle"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Shop Wheels" }]}
        title="Fitment first. Then the look."
        intro="Browse the wheel program. Fitment is confirmed for your exact vehicle before anything is ordered."
        ctaLabel="Browse Wheels"
        ctaHref="#catalog"
        secondaryLabel="Get a Fitment Check"
        secondaryHref={routes.designYourBuild}
      />

      {/* Catalog. Eight representative sets, her grid. */}
      <section id="catalog">
        <div className="wrap">
          <SecHead eyebrow="Catalog" title="Browse the wheel program" center />

          <div className="wheels">
            {wheelCatalog.map((item, i) => (
              <Reveal
                key={item.name}
                className="wheel rv-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r11">
                  <Photo src={item.frame} alt={`${item.name} wheel`} />
                </div>
                <h3>{item.name}</h3>
                <p>Inquire for fitment</p>
                <Link href={routes.designYourBuild} className="btn btn-line">
                  Inquire
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fitment questions. Her head, her three at the top. */}
      <section className="alt" id="faq">
        <div className="wrap">
          <SecHead eyebrow="FAQ" title="Fitment questions" center />
          <FaqBlock faqs={allWheelFaqs} center />
        </div>
      </section>

      {/* Her closing band. One call to action, not two. */}
      <section>
        <div className="wrap">
          <Reveal className="final-cta">
            <div className="final-in">
              <span className="eyebrow on-dark">Not Sure What Fits?</span>
              <h2 className="display">Get a fitment check</h2>
              <p>
                Tell us about your vehicle and we confirm what actually fits
                before you order.
              </p>
              <div className="final-actions">
                <Link href={routes.designYourBuild} className="btn btn-primary">
                  Get a Fitment Check
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
