import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SocialRow } from "@/components/ui/Socials";
import { PageHero, SecHead } from "@/components/ui/Page";
import { FormPending } from "@/components/forms/FormPending";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { hours, nap, napLine, routes, site } from "@/lib/site";

/**
 * CONTACT
 *
 * REBUILT August 28 2026 to Liz's mock of August 14 2026.
 *
 * Her page, in her order:
 *   hero -> three contact cards -> two column block, message form left,
 *   hours and location right -> footer.
 *
 * That is a considerably smaller page than the one we had built. Removed
 * to match her composition, all logged in CLIENT_REVIEW_NOTES.md 27:
 *   - the second routing grid, new builds / dealers / press
 *   - the service area section
 *   - the full IntakeForm at the foot of the page
 *
 * Kept inside her right hand column although her mock does not show them,
 * because this is the NAP page and dropping the address, phone and email
 * from it would cost real local ranking:
 *   - call and text, email and facility rows
 *   - the social row, which is a locked decision from Jose
 *
 * Every NAP value is read from lib/site.ts, the same source the schema,
 * the footer and the forms use. Inconsistent name, address or phone across
 * a site is a common and nearly invisible cause of local ranking loss, and
 * the only reliable fix is to make it structurally impossible.
 *
 * The map is a keyless Google Maps embed pointed at the address string, so
 * there is no API key to manage and nothing to expire. Liz's mock has a
 * placeholder image in this slot. A live map is strictly better and needs
 * no photography.
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
        title="Let's talk about your build."
        intro="Text, call or stop by the shop, whichever is easiest."
      />

      {/* Three ways in, her wording and her order. "Book a Consult" routes
         to Design Your Build, which is where she pointed it. There is no
         booking system and none is implied. */}
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="routes-grid">
            <Reveal className="route-card" delay={1}>
              <h3>Text the House</h3>
              <p>Fastest way to reach us during shop hours.</p>
              <a href={nap.smsHref} className="btn btn-primary">
                Text the House
              </a>
            </Reveal>

            <Reveal className="route-card" delay={2}>
              <h3>Book a Consult</h3>
              <p>Schedule time to walk through your build in person.</p>
              <Link href={routes.designYourBuild} className="btn btn-line">
                Book Now
              </Link>
            </Reveal>

            <Reveal className="route-card" delay={3}>
              <h3>Visit the Shop</h3>
              <p>
                {nap.city}, {nap.state}. See the facility and current builds.
              </p>
              <a href="#map" className="btn btn-line">
                Get Directions
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Her two column block. Message form left, hours and location right. */}
      <section className="alt" id="message">
        <div className="wrap contact-grid even">
          <Reveal>
            <SecHead eyebrow="Send a Message" title="Get in touch" />

            <div className="row">
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="name" type="text" placeholder="Full name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" placeholder="name@email.com" autoComplete="email" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-phone">Phone</label>
              <input id="c-phone" name="phone" type="tel" placeholder="(832) 000-0000" autoComplete="tel" />
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" placeholder="How can we help?" />
            </div>

            <input type="hidden" name="source" value="contact" />
            <FormPending label="Send Message" />
          </Reveal>

          <Reveal>
            <SecHead eyebrow="Hours &amp; Location" title="Shop hours" />

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

            {/* NAP block. Not in her mock, kept deliberately. See the note
               at the head of this file. */}
            <div className="info" style={{ marginTop: 28 }}>
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
                <div className="k">Follow the work</div>
                <div className="v">
                  <SocialRow onLight />
                </div>
              </div>
            </div>

            <div className="map-frame" id="map" style={{ marginTop: 28 }}>
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
    </>
  );
}
