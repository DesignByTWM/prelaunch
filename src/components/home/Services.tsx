import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { additionalServices, headlineServices } from "@/content/services";
import { routes } from "@/lib/site";

/**
 * Services section
 *
 * Approved V2 structure, with the one approved change: five headline cards
 * instead of four, because PPF was separated from Blackout Packages.
 * Heading updated from "Four disciplines" to "Five disciplines" to match.
 *
 * Everything else is untouched: the 4:5 frame, the 34px 0 34px 0 corner,
 * the hover lift, the umbrella strip and the black metal custom build band.
 */
export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">What We Build</span>
          <h2 className="display">
            Five disciplines,
            <br />
            one process.
          </h2>
          <p className="lede">
            Every project is planned, coordinated and completed by the same
            in-house team, with a single point of contact from consultation
            through delivery.
          </p>
        </Reveal>

        <div className="svc-grid">
          {headlineServices.map((service, i) => (
            <Reveal
              key={service.slug}
              as={Link}
              href={routes.service(service.slug)}
              className="svc"
              card
              delay={(i + 1) as 1 | 2 | 3 | 4 | 5}
            >
              <div className="ph r45">
                <img src={service.image} alt={service.imageAlt} loading="lazy" />
              </div>
              <div className="svc-body">
                <div className="name">{service.name}</div>
                <div className="desc">{service.cardLine}</div>
                <span className="go">Explore →</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="umbrella">
          <div className="label">+ Additional In-House Disciplines</div>
          <div className="list">
            {additionalServices.map((s) => s.name).join("  ·  ")}
          </div>
          <Link href={routes.services} className="arrow-link">
            View all services →
          </Link>
        </Reveal>

        <Reveal className="custom">
          <Monogram />
          <div className="inner">
            <h3 className="display">
              Planning something bigger?
              <br />
              Let&rsquo;s design it together.
            </h3>
          </div>
          <Link href={routes.designYourBuild} className="btn btn-primary inner">
            Start a Custom Build
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
