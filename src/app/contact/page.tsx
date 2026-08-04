import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SocialRow } from "@/components/ui/Socials";
import { PageHero, SecHead } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { hours, nap, napLine, routes, serviceAreas, site } from "@/lib/site";

/**
 * CONTACT
 *
 * The NAP page. Every value rendered here comes from lib/site.ts, which is
 * the same source the schema, the footer and the forms read from. That is
 * deliberate: inconsistent name, address or phone across a site is one of
 * the most common and least visible causes of local ranking loss, and the
 * only reliable fix is to make it structurally impossible.
 *
 * The map is a keyless Google Maps embed pointed at the address string, so
 * there is no API key to manage and nothing to expire.
 */

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact DESIGNBYTWM in Houston, Texas. Call or text ${nap.phone}, or visit ${napLine}. Consultations for wraps, paint protection film, wheels, interiors and complete builds.`,
  alternates: { canonical: routes.contact },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${nap.businessName}, ${napLine}`,
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: routes.contact },
          ]),
          {
            "@type": "ContactPage",
            name: "Contact DESIGNBYTWM",
            url: `${site.url}${routes.contact}`,
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Contact" }]}
        title={<>Come see<br />the house.</>}
        intro="Consultations happen with the vehicle in front of us, because a quote given over the phone is a guess. Call, text or send the form and we will get you scheduled."
        ctaLabel="Send A Message"
        ctaHref="#intake"
      />

      {/* Details and map */}
      <section>
        <div className="wrap contact-grid">
          <Reveal>
            <SecHead eyebrow="The House" title={<>Where to<br />find us.</>} />

            <div className="info">
              <div className="info-row">
                <div className="k">Call or text</div>
                <div className="v">
                  <a href={nap.phoneHref}>{nap.phone}</a>
                  <span className="sub">
                    Texts reach the same number. Often the fastest way to get an
                    answer during shop hours.
                  </span>
                </div>
              </div>

              <div className="info-row">
                <div className="k">Email</div>
                <div className="v">
                  <a href={`mailto:${nap.email}`}>{nap.email}</a>
                </div>
              </div>

              <div className="info-row">
                <div className="k">Facility</div>
                <div className="v">
                  <address style={{ fontStyle: "normal" }}>
                    {nap.street}
                    <br />
                    {nap.city}, {nap.state} {nap.postalCode}
                  </address>
                  <span className="sub">
                    North Houston. Consultations by appointment so the vehicle
                    gets proper attention rather than a walk-by.
                  </span>
                </div>
              </div>

              <div className="info-row">
                <div className="k">Hours</div>
                <div className="v">
                  <ul className="hours-list">
                    {hours.map((entry) => (
                      <li key={entry.days}>
                        <span>{entry.days}</span>
                        <span>
                          {entry.opens ? `${entry.opens} to ${entry.closes}` : "Closed"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="info-row">
                <div className="k">Follow the work</div>
                <div className="v">
                  <SocialRow onLight />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal card>
            <div className="map-frame">
              <iframe
                src={mapSrc}
                title={`Map showing ${nap.businessName} at ${napLine}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Routing */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Get To The Right Place"
            title={<>Three ways<br />to reach us.</>}
            lede="Retail builds, dealer programs and press all go to different people, so pick the one that fits and it gets to the right desk first time."
          />

          <div className="routes-grid">
            <Reveal className="route-card" delay={1}>
              <h3>New builds</h3>
              <p>
                Wraps, paint protection film, wheels, interiors, suspension or a
                complete transformation. Start with a consultation and we plan
                the disciplines as one package.
              </p>
              <Link href={routes.designYourBuild} className="btn btn-primary">
                Design Your Build
              </Link>
            </Reveal>

            <Reveal className="route-card" delay={2}>
              <h3>Dealers and fleet</h3>
              <p>
                Inventory programs, volume blackout and wheel packages, wraps
                and protection prepared for retail delivery. Handled by the
                Dealer Services Division.
              </p>
              <Link href={routes.dealers} className="btn btn-line">
                Dealer Services
              </Link>
            </Reveal>

            <Reveal className="route-card" delay={3}>
              <h3>Press and media</h3>
              <p>
                Feature requests, photography, collaborations and anything else
                media related. Send the details and we will point you to the
                right person.
              </p>
              <a href={`mailto:${nap.email}`} className="btn btn-line">
                Email Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section>
        <div className="wrap split">
          <SecHead
            eyebrow="Service Area"
            title={<>Who we<br />build for.</>}
          />
          <Reveal className="prose">
            <p>
              The facility serves the greater Houston area, and vehicles are
              regularly transported in from elsewhere in Texas for larger
              builds. If you are outside the immediate area, enclosed transport
              can be arranged as part of the plan.
            </p>
            <p style={{ marginTop: 20 }}>
              <span className="areas" style={{ color: "var(--gray-mid)" }}>
                {serviceAreas.join(" · ")}
              </span>
            </p>
            <p style={{ marginTop: 22 }}>
              <Link href={routes.locations} className="arrow-link">
                Areas we serve →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <IntakeForm
        eyebrow="Send A Message"
        title="Tell us about the vehicle."
        lede={`The more you tell us up front, the more useful the first conversation is. Or call and text ${nap.phone} directly.`}
        source="contact"
      />
    </>
  );
}
