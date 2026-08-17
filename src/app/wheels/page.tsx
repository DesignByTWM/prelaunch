import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, CustomBand, FaqBlock } from "@/components/ui/Page";
import { WheelInquiryForm } from "@/components/forms/WheelInquiryForm";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { wheelPrograms, fitmentFactors, wheelFaqs, wheelCatalog, wheelQuickFaqs } from "@/content/wheels";
import { nap, routes, serviceAreas } from "@/lib/site";

/**
 * SHOP WHEELS
 *
 * Inquiry module rather than a catalog at launch. Rather than apologise for
 * the absence of a browse experience, the page argues the case for the
 * opposite: fitment is a measurement problem, and a catalog lets people
 * order wheels that will not fit their vehicle. That framing is honest, it
 * is genuinely the house position given where the business came from, and
 * it converts better than an empty product grid.
 */

export const metadata: Metadata = {
  title: "Shop Wheels",
  description:
    "Custom wheels and fitment in Houston. Forged, flow formed, cast and off-road wheel programs, with offset, clearance and load rating confirmed on your vehicle before anything is ordered.",
  alternates: { canonical: routes.wheels },
};

export default function WheelsPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop Wheels", path: routes.wheels },
          ]),
          serviceSchema({
            name: "Custom Wheels and Fitment",
            description:
              "Forged, flow formed, cast and off-road wheel programs with fitment confirmed on the vehicle, tire pairing, road force balancing and TPMS.",
            slug: "wheels-and-fitment",
            areaServed: serviceAreas.map((city) => `${city}, ${nap.stateFull}`),
          }),
          faqSchema([...wheelQuickFaqs, ...wheelFaqs]),
        ]}
      />

      <PageHero
        image="/svc-wheels.webp"
        imageAlt="Forged wheel and tire fitment on a customized luxury vehicle"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Shop Wheels" }]}
        title="Fitment first. Then the look."
        intro="Browse the wheel program. Fitment is confirmed for your exact vehicle before anything is ordered."
        ctaLabel="Browse Wheels"
        ctaHref="#catalog"
      />

      {/* CATALOG
         From Liz's mock of August 14 2026. Eight representative sets so the
         page reads as a program rather than a form. No prices anywhere:
         every card routes to a fitment inquiry, which is her treatment and
         the client's no-pricing instruction at the same time. */}
      <section id="catalog">
        <div className="wrap">
          <SecHead
            eyebrow="Catalog"
            title="Browse the wheel program"
            lede="A representative selection. The full program runs to thousands of sets, so tell us the vehicle and we come back with what actually fits it."
            center
          />
          <div className="cov-grid">
            {wheelCatalog.map((wheel, i) => (
              <Reveal
                key={wheel.name}
                as="a"
                href="#wheel-inquiry"
                className="cov rv-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r11">
                  <Photo src={wheel.frame} alt={`${wheel.name} wheel`} />
                  <span className="pill">{wheel.size}</span>
                </div>
                <div className="cov-body">
                  <h3>{wheel.name}</h3>
                  <span className="go">Inquire for fitment →</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="recent-more">
            <Link href={`${routes.wheels}/catalog`} className="btn btn-line">
              Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Why no catalog */}
      <section>
        <div className="wrap split">
          <SecHead
            eyebrow="How This Works"
            title={
              <>
                Fitment first,
                <br />
                then the wheel.
              </>
            }
          />
          <Reveal className="prose">
            <p>
              A wheel catalog is a list of parts sorted by how they look. It
              cannot tell you whether a given wheel clears your brakes, sits
              flush under your arch, carries the load your truck actually needs
              or works with the ride height you are planning.
            </p>
            <p>
              So we do it the other way around. Tell us the vehicle and the look
              you are after, and we come back with options that have already
              been checked against it. Nothing gets ordered on a guess, and
              nothing arrives that cannot be used.
            </p>
            <p>
              This is the part of the business the house grew out of, and it is
              the reason fitment problems here get caught at the planning stage
              rather than on delivery day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Wheel Programs"
            title={
              <>
                Four ways
                <br />
                a wheel gets made.
              </>
            }
            lede="Construction determines strength, weight, how bespoke the sizing can be and how long it takes to arrive. It is the first decision, before finish or style."
          />

          <div className="index-grid">
            {wheelPrograms.map((program, i) => (
              <Reveal
                key={program.slug}
                className="pkg-card"
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r11" style={{ borderRadius: "0 34px 0 34px", marginBottom: 22 }}>
                  <Photo src={program.frame} alt={program.alt} />
                </div>
                <h3>{program.name}</h3>
                <p>{program.summary}</p>
                <ul>
                  {program.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fitment factors */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="What Gets Checked"
            title={
              <>
                Six measurements
                <br />
                before an order.
              </>
            }
            lede="Every one of these is confirmed on your vehicle. Any one of them being wrong is how people end up with wheels sitting in a garage."
          />
          <div className="pillars">
            {fitmentFactors.map((factor, i) => (
              <Reveal
                key={factor.title}
                className="pillar"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <h3>{factor.title}</h3>
                <p>{factor.copy}</p>
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
                Wheels are usually
                <br />
                not the only thing.
              </>
            }
            ctaLabel="Design Your Build"
            ctaHref={routes.designYourBuild}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Questions"
            title={
              <>
                Wheels,
                <br />
                answered.
              </>
            }
          />
          <FaqBlock faqs={wheelFaqs} />
          <Reveal style={{ marginTop: 26 }}>
            <Link href={routes.service("wheels-and-fitment")} className="arrow-link">
              Wheels &amp; Fitment in full →
            </Link>
          </Reveal>
        </div>
      </section>

      <WheelInquiryForm />
    </>
  );
}
