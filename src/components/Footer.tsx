import Link from "next/link";
import { Monogram, Wordmark } from "@/components/BrandMarks";
import { SocialRow } from "@/components/ui/Socials";
import { services } from "@/content/services";
import { nap, routes, locations } from "@/lib/site";

/**
 * Footer
 *
 * Approved V2: charcoal with the brushed metal texture, four columns,
 * six social marks on the 12px 0 12px 0 corner, and the Areas We Serve
 * block carrying all 22 cities from the location program.
 *
 * Social marks now come from the shared SocialRow so the contact page
 * renders the identical treatment from one source.
 */

const explore = [
  { label: "The House", href: routes.about },
  { label: "Dealer Services", href: routes.dealers },
  { label: "Featured Builds", href: routes.builds },
  { label: "Shop Wheels", href: routes.wheels },
  { label: "Design Your Build", href: routes.designYourBuild },
  { label: "Contact", href: routes.contact },
  { label: "Journal", href: routes.journal },
  { label: "FAQ", href: routes.faq },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Wordmark />
            {/* Tagline line set per Jose, August 21 2026. Matches the
                footer lockup in Liz's mocks. */}
            <p className="foot-tagline display">Designed in-house.</p>
            <p>
              {nap.city}, {nap.stateFull}.
            </p>
            <p style={{ marginTop: 14 }}>
              <a href={nap.phoneHref}>{nap.phone}</a>
              <br />
              {nap.street}, {nap.city}, {nap.state} {nap.postalCode}
            </p>

            <SocialRow />
          </div>

          <div>
            <h5>Services</h5>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={routes.service(service.slug)}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Explore</h5>
            <ul>
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Areas We Serve</h5>
            <p className="areas">
              {locations.map((location, i) => (
                <span key={location.slug}>
                  <Link href={routes.location(location.slug)}>{location.name}</Link>
                  {i < locations.length - 1 && " · "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="foot-base">
          <Monogram className="mark-mono" decorative={false} />
          <span>
            © {year} {nap.businessName} · All rights reserved ·{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/**
 * Floating SMS button. Teal ground, black label, monogram in black.
 * Uses the locked number, which is SMS capable.
 */
export function SmsFloat() {
  return (
    <a className="sms" href={nap.smsHref} aria-label={`Text ${nap.businessName}`}>
      <Monogram />
      <span>
        <em>Text the House</em>
        <b>{nap.phone}</b>
      </span>
    </a>
  );
}
