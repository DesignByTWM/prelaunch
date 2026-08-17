import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageHero,
  SecHead,
  Checklist,
  CrossSell,
  FaqBlock,
} from "@/components/ui/Page";
import {
  StatStrip,
  Coverage,
  Process,
  RecentWork,
  Packages,
  FinalCta,
} from "@/components/ui/ServiceSections";
import { Reveal } from "@/components/Reveal";
import { IntakeForm } from "@/components/home/IntakeForm";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  howToSchema,
} from "@/lib/schema";
import { services, getService } from "@/content/services";
import { serviceAreas, nap, routes } from "@/lib/site";

/**
 * SERVICE PAGE TEMPLATE
 *
 * One file, ten pages. Section order follows Liz's approved mocks of
 * August 14 2026:
 *
 *   hero -> stat strip -> overview -> coverage -> process
 *        -> recent work -> packages -> faq -> related -> final CTA
 *
 * Two deliberate departures from her mock, both approved by Jose on
 * August 17 2026:
 *
 *   1. No breadcrumb bar. The crumbs stay in the hero eyebrow slot where
 *      they already were. BreadcrumbList schema is retained regardless,
 *      since it drives the trail Google renders in results and costs
 *      nothing visually.
 *   2. The scope checklist survives. Her layout has no slot for it, but
 *      it is reviewed content and carries real search weight, so it sits
 *      inside the overview rather than being dropped. Flagged in
 *      CLIENT_REVIEW_NOTES.md section 6.
 *
 * Everything renders from services.ts. Adding an eleventh service is a
 * data entry, not a build task.
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
            // Tiers are emitted without price, by client instruction of
            // August 14 2026. Every cost path routes to a consultation.
            offers: service.packages.map((pkg) => ({
              name: pkg.name,
              description: pkg.sub,
              includes: pkg.includes,
            })),
          }),
          howToSchema({
            name: `How ${service.name.toLowerCase()} is performed at DESIGNBYTWM`,
            description: service.overviewBody,
            steps: service.process.map((step) => ({
              name: step.name,
              text: step.detail,
            })),
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
        title={service.heroTitle}
        intro={service.heroLede}
      />

      <StatStrip items={service.statStrip} />

      {/* Overview. Liz's paragraph leads, the reviewed scope detail follows. */}
      <section>
        <div className="wrap split">
          <SecHead
            eyebrow={service.tier === "headline" ? "Headline Discipline" : "In-House Discipline"}
            title={service.overviewTitle}
          />
          <Reveal className="prose">
            <p>{service.overviewBody}</p>
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

      {/* Coverage. Four named sub variants, each a distinct search term. */}
      <section className="alt" id="coverage">
        <div className="wrap">
          <SecHead eyebrow="Coverage" title={service.coverageTitle} center />
          <Coverage items={service.coverage} />
        </div>
      </section>

      {/* Process. Emitted above as HowTo. */}
      <section id="process">
        <div className="wrap">
          <SecHead eyebrow="How It Works" title={service.processTitle} center />
          <Process statement={service.processStatement} steps={service.process} />
        </div>
      </section>

      {/* Recent work. Photography still outstanding, placeholders in place. */}
      <section className="alt" id="recent">
        <div className="wrap">
          <SecHead eyebrow="Recent Work" title={service.recentTitle} center />
          <RecentWork items={service.recentWork} />
        </div>
      </section>

      {/* Packages. Three tiers, no prices anywhere. */}
      <section>
        <div className="wrap">
          <SecHead eyebrow="Packages" title={service.packagesTitle} center />
          <Packages items={service.packages} serviceName={service.name} />
        </div>
      </section>

      {/* Questions. */}
      <section className="alt" id="faq">
        <div className="wrap">
          <SecHead
            eyebrow="Questions"
            title={<>{service.shortName},<br />answered.</>}
          />
          <FaqBlock faqs={service.faqs} />
        </div>
      </section>

      {/* Pairings. The commercial core of the in-house argument. */}
      {pairs.length > 0 && (
        <section>
          <div className="wrap">
            <SecHead
              eyebrow="Related"
              title={<>Often paired<br />with.</>}
              lede={`Most vehicles that come in for ${service.shortName.toLowerCase()} leave having had more than one discipline performed. Because all of it happens here, the work is scheduled as a single build.`}
            />
            <CrossSell
              items={pairs.map((p) => ({ slug: p.slug, name: p.name, cardLine: p.cardLine }))}
            />
          </div>
        </section>
      )}

      {/* Closing band, then the intake form. */}
      <section id="final-cta" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <FinalCta title={service.ctaTitle} lede={service.ctaLede} />
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
