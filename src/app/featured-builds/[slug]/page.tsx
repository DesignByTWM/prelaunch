import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { featuredBuilds, getBuild } from "@/content/builds";
import { routes, site } from "@/lib/site";

/**
 * BUILD CASE STUDY TEMPLATE
 *
 * The commercial job of this page is not to show a finished car, it is to
 * demonstrate coordination. Each stage links to the service page for that
 * discipline, which turns a case study into an internal linking hub and
 * gives a reader a route from "that looks good" to "how much is that".
 */

export function generateStaticParams() {
  return featuredBuilds.map((build) => ({ slug: build.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) return {};

  return {
    title: `${build.title}, ${build.vehicle}`,
    description: `${build.summary} A ${build.vehicle} build by DESIGNBYTWM in Houston, combining ${build.tags.join(", ")}.`,
    alternates: { canonical: `${routes.builds}/${build.slug}` },
    openGraph: {
      title: `${build.title}, ${build.vehicle} | DESIGNBYTWM`,
      description: build.summary,
      images: [{ url: build.hero }],
    },
  };
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();

  const others = featuredBuilds.filter((b) => b.slug !== build.slug);

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Featured Builds", path: routes.builds },
            { name: build.title, path: `${routes.builds}/${build.slug}` },
          ]),
          {
            "@type": "CreativeWork",
            name: `${build.title}, ${build.vehicle}`,
            url: `${site.url}${routes.builds}/${build.slug}`,
            description: build.summary,
            image: `${site.url}${build.hero}`,
            creator: { "@id": `${site.url}/#organization` },
            about: build.tags.join(", "),
          },
        ]}
      />

      <PageHero
        image={build.hero}
        imageAlt={build.heroAlt}
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Featured Builds", href: routes.builds },
          { label: build.title },
        ]}
        title={build.title}
        intro={`${build.vehicle} · ${build.summary}`}
      />

      {/* Brief */}
      <section>
        <div className="wrap split">
          <SecHead eyebrow="The Brief" title={<>What the owner<br />came in for.</>} />
          <Reveal className="prose">
            {build.brief.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <ul className="flow-summary" style={{ marginTop: 28 }}>
              <li>
                <span className="k">Vehicle</span>
                <span>{build.vehicle}</span>
              </li>
              <li>
                <span className="k">Disciplines</span>
                <span>{build.tags.join(" · ")}</span>
              </li>
              <li>
                <span className="k">Time in the house</span>
                <span>{build.duration}</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Stages */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="The Build"
            title={<>Discipline<br />by discipline.</>}
            lede="Each stage below was planned against the others before any work started, which is the part that cannot be replicated across separate shops."
          />
          <div className="process">
            {build.stages.map((stage, i) => (
              <Reveal
                key={stage.discipline}
                className="process-step"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>
                    <Link href={routes.service(stage.slug)} style={{ borderBottom: "1px solid var(--gray-light)" }}>
                      {stage.discipline}
                    </Link>
                  </h3>
                  <p>{stage.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <div className="wrap">
          <SecHead eyebrow="Finished" title={<>The result.</>} lede={build.outcome} />
          <div className="index-grid">
            {build.gallery.map((shot, i) => (
              <Reveal
                key={shot.src + i}
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r45" style={{ borderRadius: "34px 0 34px 0" }}>
                  <Photo src={shot.src} alt={shot.alt} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other builds */}
      {others.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <SecHead eyebrow="More Work" title={<>Other builds.</>} />
            <div className="index-grid">
              {others.map((other, i) => (
                <Reveal
                  key={other.slug}
                  as={Link}
                  href={`${routes.builds}/${other.slug}`}
                  className="build"
                  card
                  delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
                >
                  <div className="ph r169">
                    <Photo src={other.hero} alt={other.heroAlt} />
                  </div>
                  <h3>{other.title}, {other.vehicle}</h3>
                  <div className="tags">
                    {other.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand heading={<>Start a build<br />of your own.</>} />
        </div>
      </section>

      <IntakeForm source={`build-${build.slug}`} />
    </>
  );
}
