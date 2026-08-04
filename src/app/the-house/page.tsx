import type { Metadata } from "next";
import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import {
  originStory,
  inHousePillars,
  processSteps,
  facilityStats,
  team,
  testimonials,
} from "@/content/house";
import { services } from "@/content/services";
import { nap, routes, site } from "@/lib/site";

/**
 * THE HOUSE
 *
 * The entity page. Everything a search engine or an AI assistant needs to
 * answer "who is Design By TWM" lives here in long form, with the FAQ
 * carrying the compressed version.
 *
 * Contains placeholder content. See src/content/house.ts.
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
              "The origin, process and team behind Design By TWM, an automotive customization house in Houston, Texas.",
          },
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "The House" }]}
        title={<>Not a shop.<br />A house.</>}
        intro="Ten disciplines, one building, one team and one point of contact. Here is how that came to be and what it means for a vehicle that comes through the door."
      />

      {/* ORIGIN */}
      <section>
        <div className="wrap split">
          <SecHead eyebrow="Origin" title={<>Where the<br />house started.</>} />
          <Reveal className="story">
            {originStory.map((paragraph, i) => (
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

      {/* FACILITY */}
      <section className="custom-section">
        <div className="wrap">
          <Reveal className="custom" style={{ marginTop: 0, display: "block" }}>
            <Monogram />
            <div className="inner">
              <span className="eyebrow on-dark">The Facility</span>
              <h3 className="display" style={{ margin: "12px 0 6px" }}>
                One building.
                <br />
                {nap.street}, {nap.city}.
              </h3>
              <p style={{ color: "rgba(255,255,255,.78)", fontSize: 15, maxWidth: "56ch", marginBottom: 30 }}>
                Every discipline runs from a single facility in north Houston.
                Vehicles are kept inside while they are with us, and no stage of
                a build leaves the building.
              </p>

              <div className="stats">
                {facilityStats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div className="figure">{stat.figure}</div>
                    <div className="label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="The Team"
            title={<>The people<br />who do the work.</>}
            lede="One team across every discipline, which is the reason a build has a single point of contact rather than one per service."
          />
          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal
                key={member.name}
                className="member"
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r45">
                  <Photo src={member.image} alt={`${member.name}, ${member.role} at DESIGNBYTWM`} />
                </div>
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
