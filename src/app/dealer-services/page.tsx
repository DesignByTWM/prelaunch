import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, CustomBand, FaqBlock } from "@/components/ui/Page";
import { StatStrip, FinalCta } from "@/components/ui/ServiceSections";
import { DealerForm } from "@/components/forms/DealerForm";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import {
  dealerPackages,
  dealerValue,
  dealerProcess,
  dealerFaqs,
  dealerQuickFaqs,
} from "@/content/dealers";
import { nap, routes, serviceAreas, site } from "@/lib/site";

/**
 * DEALER SERVICES DIVISION
 *
 * A standalone B2B funnel, kept structurally separate from the ten retail
 * services. Different buyer, different vocabulary, different intake form.
 *
 * The commercial argument leads. A dealership principal is not reading this
 * to find out what satin black looks like, they are working out whether it
 * moves units and what it does to gross.
 */

export const metadata: Metadata = {
  title: "Dealer Services Division",
  description:
    "Volume automotive customization for Houston dealerships. Blackout and trim packages, wheel and tire programs, wraps, lift kits, ceramic coating, PPF and audio upgrades, all performed in house on a scheduled program.",
  alternates: { canonical: routes.dealers },
};

export default function DealerServicesPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Dealer Services", path: routes.dealers },
          ]),
          serviceSchema({
            name: "Dealer Services Division",
            description:
              "Volume automotive customization for dealership inventory: blackout and trim packages, wheel and tire programs, vehicle wraps, suspension lift kits, ceramic coating, paint protection film and audio upgrades.",
            slug: "dealer-services",
            areaServed: serviceAreas.map((city) => `${city}, ${nap.stateFull}`),
          }),
          faqSchema([...dealerQuickFaqs, ...dealerFaqs]),
          {
            "@type": "OfferCatalog",
            name: "Dealer Services Division packages",
            url: `${site.url}${routes.dealers}`,
            provider: { "@id": `${site.url}/#organization` },
            itemListElement: dealerPackages.map((pkg) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: pkg.name,
                description: pkg.summary,
              },
            })),
          },
        ]}
      />

      <PageHero
        image="/build-truck.webp"
        imageAlt="Dealership inventory prepared with blackout, wheel and suspension packages"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Dealer Services" }]}
        title="A direct line to in-house capability."
        intro="Reconditioning, customization and fleet work, handled by the same in-house team, on dealer timelines."
        ctaLabel="Apply For An Account"
        ctaHref="#dealer-intake"
      />

      <StatStrip
        items={["Volume Pricing", "Priority Turnaround", "One Point of Contact"]}
      />

      {/* Commercial argument */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Why Dealers Use Us"
            title={
              <>
                Built around gross
                <br />
                and time to turn.
              </>
            }
            lede="Retail customization sells on how a vehicle looks. Dealer work sells on what it does to a unit that is sitting, and on how little of your time it costs to get there."
          />
          <div className="pillars">
            {dealerValue.map((item, i) => (
              <Reveal
                key={item.title}
                className="pillar"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="The Catalog"
            title={
              <>
                Six package
                <br />
                categories.
              </>
            }
            lede="Specified to your inventory rather than pulled from a menu, with a fixed spec per tier so a unit can be ordered without a fresh conversation every time."
          />

          <div className="index-grid">
            {dealerPackages.map((pkg, i) => (
              <Reveal
                key={pkg.slug}
                className="pkg-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <h3>{pkg.name}</h3>
                <p>{pkg.summary}</p>
                <ul>
                  {pkg.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="How A Program Runs"
            title={
              <>
                From inventory review
                <br />
                to retail ready.
              </>
            }
            lede="Volume work is planned as a program against your turn cycle, not taken one vehicle at a time."
          />
          <div className="process">
            {dealerProcess.map((step, i) => (
              <Reveal
                key={step.title}
                className="process-step"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Reserve capacity
                <br />
                against your turn cycle.
              </>
            }
            ctaLabel="Start A Dealer Program"
            ctaHref="#dealer-intake"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Dealer Questions"
            title={
              <>
                What principals
                <br />
                ask first.
              </>
            }
          />
          <FaqBlock faqs={[...dealerQuickFaqs, ...dealerFaqs]} />
        </div>
      </section>

      {/* Closing band, from Liz's mock of August 14 2026. */}
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <FinalCta
            title="Let's talk volume"
            lede="Apply for a dealer account and we'll follow up to confirm terms and onboarding."
          />
        </div>
      </section>

      <DealerForm />
    </>
  );
}
