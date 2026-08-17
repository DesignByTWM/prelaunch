import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import {
  houseIntro,
  inHousePillars,
  processSteps,
  testimonials,
} from "@/content/house";
import { services } from "@/content/services";
import { nap, routes, site } from "@/lib/site";

/**
 * THE HOUSE
 *
 * The entity page. Everything a search engine or an AI assistant needs to
 * answer "who is Design By TWM" lives here, with the FAQ carrying the
 * compressed version.
 *
 * REDUCED August 17 2026. Liz removed the origin story, the Tire and Wheel
 * Master lineage, the team section and the facility figures. What remains
 * is a modest intro, Under One Roof, the ten disciplines and Process.
 *
 * Testimonials are still fabricated and still a launch blocker.
 * See src/content/house.ts and CLIENT_REVIEW_NOTES.md section 15.1.
 */

export const metadata: Metadata = {
  title: "The House",
  description:
    "Design By TWM is an automotive customization house in Houston, Texas. Ten disciplines performed under one roof by one team, from first consultation through final delivery.",
  alternates: { canonical: routes.about },
};

export default function TheHousePage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The House", path: routes.about },
          ]),
          {
            "@type": "AboutPage",
            name: "The House",
            url: `${site.url}${routes.about}`,
            about: { "@id": `${site.url}/#organization` },
            description:
              "How Design By TWM works: ten automotive customization disciplines performed in house by one team in Houston, Texas.",
          },
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "The House" }]}
        title={<>Not a shop.<br />A house.</>}
        intro="Ten disciplines, one building, one team and one point of contact. Here is what that means for a vehicle that comes through the door."
      />

      {/* INTRO */}
      <section>
        <div className="wrap split">
          <SecHead eyebrow="The House" title={<>One team,<br />one building.</>} />
          <Reveal className="story">
            {houseIntro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY IN HOUSE */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="The Standard"
            title={<>Why everything<br />happens here.</>}
            lede="In-house is not a slogan on this site. It is the operating decision the whole business is built around, and it changes four specific things about how a vehicle turns out."
          />
          <div className="pillars">
            {inHousePillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                className="pillar"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Under One Roof"
            title={<>The ten<br />disciplines.</>}
            lede="Every one of these is performed by our own team inside the Ammi Trail facility. None of it is subcontracted."
          />
          <div className="cross-grid">
            {services.map((service, i) => (
              <Reveal
                key={service.slug}
                as={Link}
                href={routes.service(service.slug)}
                className="cross"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="name">{service.name}</div>
                <div className="desc">{service.cardLine}</div>
                <span className="go">Explore →</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Process"
            title={<>How a build<br />actually runs.</>}
            lede="The same five stages whether a vehicle is in for one discipline or six."
          />
          <div className="process">
            {processSteps.map((step, i) => (
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

      {/* FACILITY AND TEAM SECTIONS REMOVED, August 17 2026, per Liz.
         Facility figures were invented and the team section is not wanted.
         Both are gone rather than hidden. */}

      {/* TESTIMONIALS */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="Clients"
            title={<>What owners<br />say afterwards.</>}
            lede="The pattern in the feedback is consistent: one timeline, one contact and finishes that match across the whole vehicle."
          />
          <div className="quotes">
            {testimonials.map((testimonial, i) => (
              <Reveal
                key={testimonial.name}
                className="quote"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <blockquote>{testimonial.quote}</blockquote>
                <div className="who">
                  <div className="name">{testimonial.name}</div>
                  <div className="meta">
                    {testimonial.vehicle} · {testimonial.disciplines}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Bring us the vehicle
                <br />
                and the idea.
              </>
            }
          />
        </div>
      </section>

      <IntakeForm
        eyebrow="Get Started"
        title="Start a conversation."
        lede={`Tell us about your vehicle and what you have in mind. Call or text ${nap.phone} if you would rather talk it through.`}
        source="the-house"
      />
    </>
  );
}
