import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui/Page";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getLegalDoc } from "@/content/legal";
import { routes, site } from "@/lib/site";

/**
 * LegalDocument
 *
 * Shared renderer for the privacy policy, terms and accessibility pages.
 * Deliberately kept in the site's design language rather than dropped into
 * an unstyled wall of text, because these pages get read by people deciding
 * whether to trust the business with a vehicle.
 */
export function LegalDocument({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug);
  if (!doc) return null;

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: doc.title, path: `/${doc.slug}` },
          ]),
          {
            "@type": "WebPage",
            name: doc.title,
            url: `${site.url}/${doc.slug}`,
            description: doc.summary,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        image="/mat-metal.webp"
        imageAlt="Detail of finish work in the DESIGNBYTWM facility"
        crumbs={[{ label: "Home", href: routes.home }, { label: doc.title }]}
        title={doc.title}
        intro={doc.summary}
        ctaLabel="Contact the House"
        ctaHref={routes.contact}
      />

      <section>
        <div className="wrap">
          <article className="article">
            <Reveal className="article-meta">
              <span className="eyebrow">Last updated {doc.updated}</span>
            </Reveal>

            <Reveal className="article-intro">
              {doc.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            {doc.sections.map((section) => (
              <Reveal key={section.heading} className="article-section" delay={1}>
                <h2 className="display">{section.heading}</h2>
                {section.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </Reveal>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
