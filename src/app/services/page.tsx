import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { headlineServices, additionalServices, services } from "@/content/services";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ten automotive customization disciplines performed in house in Houston: blackout packages, paint protection film, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, lighting, audio and truck accessories.",
  alternates: { canonical: routes.services },
};

/**
 * Card used for every discipline on this page.
 *
 * Both tiers now get the same photographic treatment. Photos for the five
 * additional disciplines are not delivered yet, so those slots point at
 * their final filenames and fall back to the striped placeholder until the
 * files land in /public. No code change is needed when they arrive.
 */
function DisciplineCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <Reveal
      as={Link}
      href={routes.service(service.slug)}
      className="svc"
      card
      delay={(Math.min(index + 1, 5)) as 1 | 2 | 3 | 4 | 5}
    >
      <div className="ph r45">
        <Photo src={service.image} alt={service.imageAlt} />
      </div>
      <div className="svc-body">
        <div className="name">{service.name}</div>
        <div className="desc">{service.cardLine}</div>
        <span className="go">Explore →</span>
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: routes.services },
          ]),
          ...services.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.summary,
              slug: service.slug,
            }),
          ),
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Services" }]}
        title={<>Ten disciplines.<br />One team.</>}
        intro="Every discipline below is practiced inside the same building by the same team, so a build drawing on four of them is still planned and run as a single project, with one point of contact."
      />

      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Headline Disciplines"
            title={<>The five most<br />requested.</>}
            lede="These five shape the character of a vehicle most directly, and they are rarely specified on their own."
          />

          <div className="svc-grid">
            {headlineServices.map((service, i) => (
              <DisciplineCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          <SecHead
            eyebrow="Additional In-House Disciplines"
            title={<>Five more,<br />same building.</>}
            lede="Full disciplines with their own pages, typically specified as part of a larger build."
            className="services-second-head"
          />

          <div className="svc-grid">
            {additionalServices.map((service, i) => (
              <DisciplineCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <IntakeForm source="services-index" />
    </>
  );
}
