import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageHero,
  SecHead,
  CustomBand,
  Checklist,
  CrossSell,
  FaqBlock,
} from "@/components/ui/Page";
import { Reveal } from "@/components/Reveal";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { services, getService } from "@/content/services";
import { serviceAreas, nap, routes } from "@/lib/site";

/**
 * SERVICE PAGE TEMPLATE
 *
 * One file, ten pages. Every service in services.ts already carries its
 * intro, scope, pairings, keyword and FAQs, so this template composes
 * rather than authors. Adding an eleventh service later is a data entry,
 * not a build task.
 *
 * Statically generated at build time via generateStaticParams, which keeps
 * these pages on the fastest possible delivery path for Core Web Vitals.
 */

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: routes.service(service.slug) },
    openGraph: {
      title: `${service.name} | DESIGNBYTWM`,
      description: service.summary,
      url: routes.service(service.slug),
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pairs = service.pairsWith
    .map((pairSlug) => getService(pairSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd
        graph={[
          serviceSchema({
            name: service.name,
            description: service.summary,
            slug: service.slug,
            // The full service area is declared on every service page so the
            // 22 location pages reinforce one entity rather than compete.
            areaServed: serviceAreas.map((city) => `${city}, ${nap.stateFull}`),
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: routes.services },
            { name: service.name, path: routes.service(service.slug) },
          ]),
        ]}
      />

      <PageHero
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Services", href: routes.services },
          { label: service.shortName },
        ]}
        title={service.name}
        intro={service.cardLine}
      />

      {/* Overview and scope */}
      <section>
        <div className="wrap split">
          <SecHead
            eyebrow={service.tier === "headline" ? "Headline Discipline" : "In-House Discipline"}
            title={<>What it is,<br />and how we do it.</>}
          />
          <Reveal className="prose">
            <p>{service.intro}</p>
          </Reveal>
        </div>

        <div className="wrap" style={{ marginTop: "clamp(40px,5vw,68px)" }}>
          <div className="split">
            <SecHead eyebrow="Scope" title={<>What the work<br />includes.</>} />
            <Reveal>
              <Checklist items={service.includes} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pairings. The commercial core of the in-house argument. */}
      {pairs.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <SecHead
              eyebrow="Pairs With"
              title={<>Rarely ordered<br />on its own.</>}
              lede={`Most vehicles that come in for ${service.shortName.toLowerCase()} leave having had more than one discipline performed. Because all of it happens here, the work is scheduled as a single build.`}
            />
            <CrossSell
              items={pairs.map((p) => ({ slug: p.slug, name: p.name, cardLine: p.cardLine }))}
            />
          </div>
        </section>
      )}

      {/* Custom build band, then FAQ.
         The band sits above the questions rather than below them so it does
         not stack directly on top of the intake form, which made the two
         calls to action read as redundant. */}
      <section>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Planning {service.shortName.toLowerCase()} as part
                <br />
                of a bigger build?
              </>
            }
          />

          <SecHead
            eyebrow="Questions"
            title={<>{service.shortName},<br />answered.</>}
            className="services-second-head"
          />
          <FaqBlock faqs={service.faqs} />
        </div>
      </section>

      <IntakeForm
        eyebrow="Get Started"
        title={`Start with ${service.shortName.toLowerCase()}.`}
        lede={`Tell us about your vehicle and we follow up to schedule a consultation in ${nap.city}.`}
        source={`service-${service.slug}`}
        preselect={service.name}
      />
    </>
  );
}
