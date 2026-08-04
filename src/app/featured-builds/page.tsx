import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { featuredBuilds } from "@/content/builds";
import { routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Featured Builds",
  description:
    "Complete vehicle transformations by DESIGNBYTWM in Houston. Multi discipline builds combining wraps, paint protection film, wheels, suspension, interiors, audio and lighting under one roof.",
  alternates: { canonical: routes.builds },
};

export default function FeaturedBuildsPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Featured Builds", path: routes.builds },
          ]),
          {
            "@type": "CollectionPage",
            name: "Featured Builds",
            url: `${site.url}${routes.builds}`,
            about: { "@id": `${site.url}/#organization` },
            hasPart: featuredBuilds.map((build) => ({
              "@type": "CreativeWork",
              name: `${build.title}, ${build.vehicle}`,
              url: `${site.url}${routes.builds}/${build.slug}`,
              description: build.summary,
            })),
          },
        ]}
      />

      <PageHero
        image="/build-suv.webp"
        imageAlt="Completed multi discipline build by DESIGNBYTWM"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Featured Builds" }]}
        title={
          <>
            Complete
            <br />
            transformations.
          </>
        }
        intro="Not a gallery of finished cars. Each of these is the story of several disciplines planned together, and what that changed about the result."
      />

      <section>
        <div className="wrap">
          <SecHead
            eyebrow="The Work"
            title={
              <>
                Every build here
                <br />
                used more than one discipline.
              </>
            }
            lede="That is the point. A vehicle that needs wraps, wheels, suspension and protection is one project here, not four bookings across four shops."
          />

          <div className="builds-list">
            {featuredBuilds.map((build, i) => (
              <Reveal
                key={build.slug}
                as={Link}
                href={`${routes.builds}/${build.slug}`}
                className="build-row"
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r169">
                  <Photo src={build.hero} alt={build.heroAlt} />
                </div>
                <div className="build-row-body">
                  <span className="eyebrow">{build.vehicle}</span>
                  <h3 className="display">{build.title}</h3>
                  <p>{build.summary}</p>
                  <div className="tags">
                    {build.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className="arrow-link" style={{ marginTop: 22 }}>
                    Read the build →
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Your vehicle
                <br />
                could be next.
              </>
            }
          />
        </div>
      </section>

      <IntakeForm source="featured-builds" />
    </>
  );
}
