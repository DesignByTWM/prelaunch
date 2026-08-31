import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SecHead, FaqBlock } from "@/components/ui/Page";
import {
  ServiceHero,
  Coverage,
  Process,
  RecentWork,
  Packages,
  Related,
  FinalCta,
} from "@/components/ui/ServiceSections";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
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
 * REBUILT August 21 2026 to Liz's mock exactly, per Jose.
 *
 * Her page, section for section, in her order:
 *
 *   hero (eyebrow, H1, lede, two CTAs, stat strip inside the hero)
 *     -> overview, two column, copy left and one frame right
 *     -> coverage, centred head, four cards
 *     -> process, statement then head then four steps, all on dark
 *     -> recent work, four frame mosaic, then View More Builds
 *     -> packages, three tiers on a dark ground
 *     -> FAQ, centred head, "Common questions"
 *     -> related, three photographic cards, "Often paired with"
 *     -> final CTA
 *
 * Nothing of hers is styled by her. Every surface above renders in
 * Brand Guidelines v2.0: our corners, our type, our palette, teal on
 * primary CTAs and the monogram only. Where her frame is square and
 * ours is 34px 0 34px 0, the frame sits in her position wearing our
 * corner. That is the whole rule.
 *
 * Departures from her file, all deliberate, all logged in
 * CLIENT_REVIEW_NOTES.md section 23:
 *
 *   1. Hero ground is flat black with no photograph. Global instruction
 *      from Jose, August 21 2026. Her hero photo slot is unused.
 *   2. No breadcrumb bar. BreadcrumbList schema retained.
 *   3. Process sits on the approved black band rather than her
 *      photograph with a dark overlay.
 *   4. The scope checklist is gone. Her layout has no slot for it and
 *      the instruction is to follow her layout. `includes` is still in
 *      services.ts and is one line away from returning.
 *   5. The overview shows her paragraph only. The second paragraph we
 *      had there is not in her mock.
 *   6. No intake form at the foot of the page. Her page closes on the
 *      final CTA.
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

  // Her related band is three columns. The fourth pairing is held back
  // rather than breaking her composition.
  const pairs = service.pairsWith
    .map((pairSlug) => getService(pairSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 3);

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

      <ServiceHero
        eyebrow={service.name}
        title={service.heroTitle}
        lede={service.heroLede}
        stats={service.statStrip}
      />

      {/* Overview. Her two column block: copy left, one frame right. */}
      <section>
        <div className="wrap">
          <div className="svc-overview">
            <div>
              <SecHead eyebrow="Overview" title={service.overviewTitle} />
              <Reveal className="prose">
                <p>{service.overviewBody}</p>
              </Reveal>
            </div>
            <Reveal className="media rv-card">
              <div className="ph">
                <Photo
                  src={`/${service.imagePrefix}-overview.webp`}
                  alt={service.imageAlt}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Coverage. Four named sub variants, each a distinct search term. */}
      <section className="alt" id="coverage">
        <div className="wrap">
          <SecHead eyebrow="Coverage" title={service.coverageTitle} center />
          <Coverage items={service.coverage} prefix={service.imagePrefix} />
        </div>
      </section>

      {/* Process. Statement, head and steps all sit inside the band, which
          is her order. Emitted above as HowTo. */}
      <section id="process">
        <div className="wrap">
          <Process
            statement={service.processStatement}
            title={service.processTitle}
            steps={service.process}
          />
        </div>
      </section>

      {/* Recent work. Photography still outstanding, placeholders in place. */}
      <section className="alt" id="recent">
        <div className="wrap">
          <SecHead eyebrow="Reference" title={service.recentTitle} center />
          <RecentWork items={service.recentWork} prefix={service.imagePrefix} />
        </div>
      </section>

      {/* Packages. Three tiers on a dark ground, no prices anywhere. */}
      <section className="dark">
        <div className="wrap">
          <SecHead eyebrow="Packages" title={service.packagesTitle} center />
          <Packages items={service.packages} serviceName={service.name} />
        </div>
      </section>

      {/* Questions. Her head, centred, and her wording. */}
      <section id="faq">
        <div className="wrap">
          <SecHead eyebrow="FAQ" title="Common questions" center />
          <FaqBlock faqs={service.faqs} center />
        </div>
      </section>

      {/* Pairings. Three photographic cards, her composition. */}
      {pairs.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <SecHead eyebrow="Related" title="Often paired with" center />
            <Related
              items={pairs.map((p) => ({
                slug: p.slug,
                name: p.name,
                image: p.image,
                imageAlt: p.imageAlt,
              }))}
            />
          </div>
        </section>
      )}

      {/* Closing band. Her page ends here. */}
      <section id="final-cta">
        <div className="wrap">
          <FinalCta title={service.ctaTitle} lede={service.ctaLede} />
        </div>
      </section>
    </>
  );
}
