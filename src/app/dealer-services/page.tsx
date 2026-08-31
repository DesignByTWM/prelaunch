import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Monogram } from "@/components/BrandMarks";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, FaqBlock } from "@/components/ui/Page";
import { DealerForm } from "@/components/forms/DealerForm";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { dealerPackages, dealerFaqs, dealerQuickFaqs } from "@/content/dealers";
import { nap, routes, serviceAreas, site } from "@/lib/site";

/**
 * DEALER SERVICES DIVISION
 *
 * REBUILT August 31 2026 to Liz's mock of August 14 2026.
 *
 * Her order:
 *   hero with stat strip -> overview, two column -> "Program / What the
 *   program covers", four cards -> process on dark -> apply form ->
 *   FAQ -> closing CTA.
 *
 * Her four program cards and her four process steps ship verbatim. They
 * replace our five drafted process steps and our four drafted value
 * propositions, which were never client copy.
 *
 * KEPT AGAINST HER MOCK, and this is the one judgement call on the page:
 * the six dealer package categories. Those came from Henry's own Dealer
 * Services Division catalog, so they are client-supplied source material
 * rather than anything we wrote. Her mock is a wireframe of the page
 * shape, and reading it as an instruction to delete his catalog would be
 * reading it too literally. They sit directly under her program grid,
 * which is where the detail naturally belongs. One edit removes them.
 * Logged in CLIENT_REVIEW_NOTES.md 27.5.
 *
 * Removed to match her composition:
 *   - dealerValue, four drafted commercial arguments
 *   - CustomBand
 *
 * COMPLIANCE NOTE: her hero stat strip and her third program card both
 * assert "Priority Turnaround". On August 27 Liz removed "Priority
 * scheduling" from the retail package tiers as an unconfirmed operational
 * commitment. Her dealer mock predates that instruction and this is her
 * own division's stated selling point, so it ships as she wrote it, but
 * it is the same class of published promise and Henry should confirm it.
 * Flagged for the delivery email.
 */

export const metadata: Metadata = {
  title: "Dealer Services",
  description:
    "Dealer Services Division at DESIGNBYTWM in Houston. Blackout and trim packages, wheel and tire programs, wraps, lift kits, protection and audio upgrades prepared for retail delivery at volume.",
  alternates: { canonical: routes.dealers },
};

/* Hers lead, ours follow. Same pattern as Shop Wheels. */
const allDealerFaqs = [...dealerQuickFaqs, ...dealerFaqs];

/** Her four program pillars, verbatim, with her pill labels. */
const programCards = [
  { pill: "Recon", name: "Reconditioning", frame: "/svc-paint-body.webp" },
  { pill: "Custom", name: "Fleet Customization", frame: "/svc-wraps.webp" },
  { pill: "Volume", name: "Volume Pricing", frame: "/svc-wheels.webp" },
  { pill: "Rush", name: "Priority Turnaround", frame: "/svc-blackout.webp" },
];

/** Her four process steps, verbatim. */
const programProcess = [
  { name: "Apply", text: "Dealer account application submitted." },
  { name: "Onboard", text: "Account and pricing terms confirmed." },
  { name: "Submit", text: "Work orders submitted per vehicle." },
  { name: "Deliver", text: "Turnaround on your schedule." },
];

export default function DealerServicesPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Dealer Services", path: routes.dealers },
          ]),
          {
            /* Built inline rather than through serviceSchema, which hard
               codes a /services/{slug} url and would point this entity at
               a retail page that does not exist. */
            "@type": "Service",
            name: "Dealer Services Division",
            serviceType: "Automotive dealer reconditioning and customization",
            description:
              "Volume reconditioning and customization for dealership inventory in Houston, including blackout and trim packages, wheel and tire programs, wraps, lift kits, protection and audio upgrades.",
            url: `${site.url}${routes.dealers}`,
            provider: { "@id": `${site.url}/#organization` },
            audience: {
              "@type": "BusinessAudience",
              name: "Automotive dealerships and fleet operators",
            },
            areaServed: serviceAreas.map((area) => ({
              "@type": "City",
              name: area,
            })),
          },
          faqSchema(allDealerFaqs),
        ]}
      />

      <PageHero
        image="/build-truck.webp"
        imageAlt="Dealership inventory prepared in the DESIGNBYTWM facility"
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Dealer Services" },
        ]}
        title="A direct line to in-house capability."
        intro="Reconditioning, customization and fleet work, handled by the same in-house team, on dealer timelines."
        ctaLabel="Apply for an Account"
        ctaHref="#apply"
        secondaryLabel="Text the House"
        secondaryHref={nap.smsHref}
        stats={["Volume Pricing", "Priority Turnaround", "One Point of Contact"]}
      />

      {/* Her overview block. */}
      <section>
        <div className="wrap">
          <div className="svc-overview">
            <div>
              <SecHead
                eyebrow="Overview"
                title="Built for how dealers actually move inventory"
              />
              <Reveal className="prose">
                <p>
                  Reconditioning and customization work does not fit around a
                  retail queue. Dealer work is scheduled on its own timeline,
                  run through the same in-house team and quality standard as
                  every other build.
                </p>
              </Reveal>
            </div>
            <Reveal className="media rv-card">
              <div className="ph">
                <Photo
                  src="/mat-fitment.webp"
                  alt="Dealership vehicle being assessed at intake"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Her program grid. */}
      <section className="alt">
        <div className="wrap">
          <SecHead eyebrow="Program" title="What the program covers" center />

          <div className="cov-grid">
            {programCards.map((card, i) => (
              <Reveal
                key={card.name}
                as="a"
                href="#apply"
                className="cov rv-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r45">
                  <Photo src={card.frame} alt={card.name} />
                  <span className="pill">{card.pill}</span>
                </div>
                <div className="cov-body">
                  <h3>{card.name}</h3>
                  <span className="go">Explore →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Henry's own catalog. Kept against her mock, see the note above. */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Packages"
            title="Six categories, one purchase order"
            lede="Specified per unit or applied as a standing spec across inventory. Every category is performed in the same building."
            center
          />

          <div className="index-grid">
            {dealerPackages.map((pkg, i) => (
              <Reveal
                key={pkg.slug}
                className="dealer-pkg rv-card"
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

      {/* Her process band. */}
      <section id="process">
        <div className="wrap">
          <Reveal className="proc">
            <Monogram />
            <div className="proc-in">
              <p className="proc-statement display">One team. Your timeline.</p>
              <div className="sec-head center">
                <span className="eyebrow">How It Works</span>
                <h2 className="display">The process</h2>
              </div>
              <ol className="proc-grid">
                {programProcess.map((step, i) => (
                  <li key={step.name} className="proc-step">
                    <span className="proc-num display">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.name}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Her application form. */}
      <section className="alt" id="apply">
        <div className="wrap">
          <SecHead eyebrow="Apply" title="Apply for a dealer account" center />

          {/* Extracted to DealerForm on August 31 2026 so it can hold
              state and submit. Her markup moved across unchanged. */}
          <Reveal className="form-panel">
            <DealerForm />
          </Reveal>
        </div>
      </section>

      {/* Questions. Hers lead. */}
      <section id="faq">
        <div className="wrap">
          <SecHead eyebrow="FAQ" title="Common questions" center />
          <FaqBlock faqs={allDealerFaqs} center />
        </div>
      </section>

      {/* Her closing band. */}
      <section>
        <div className="wrap">
          <Reveal className="final-cta">
            <div className="final-in">
              <span className="eyebrow on-dark">Ready When You Are</span>
              <h2 className="display">Let&apos;s talk volume</h2>
              <p>
                Apply for a dealer account and we follow up to confirm terms and
                onboarding.
              </p>
              <div className="final-actions">
                <Link href="#apply" className="btn btn-primary">
                  Apply for an Account
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
