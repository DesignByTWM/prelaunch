import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead } from "@/components/ui/Page";
import { BuildFinder } from "@/components/builds/BuildFinder";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { featuredBuilds } from "@/content/builds";
import { routes, site } from "@/lib/site";

/**
 * FEATURED BUILDS
 *
 * REBUILT August 31 2026 to Liz's mock of August 14 2026.
 *
 * Her order:
 *   hero -> "Search The Portfolio / Find your vehicle", search field,
 *   type pills, three column card grid -> closing CTA -> footer.
 *
 * Her search and filters are real in her file, not decoration, so they
 * are built as working controls in BuildFinder. The cards themselves are
 * rendered inside a client component, which means they are still in the
 * server rendered HTML and still crawlable.
 *
 * Removed to match her composition, logged in CLIENT_REVIEW_NOTES.md 27.4:
 *   - the CustomBand
 *   - the IntakeForm at the foot of the page. Her closing CTA routes to
 *     Design Your Build, which is the same capture one step along
 *
 * ItemList schema is emitted for the six builds. It describes a list of
 * pages rather than making any claim about the work itself, which matters
 * while the build descriptions are still unverified draft copy.
 */

export const metadata: Metadata = {
  title: "Featured Builds",
  description:
    "Complete vehicle transformations by DESIGNBYTWM in Houston. Blackout packages, wraps, wheels, interiors, suspension and paint, planned and executed as single builds.",
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
            description:
              "Complete vehicle transformations executed in house by DESIGNBYTWM in Houston, Texas.",
            isPartOf: { "@id": `${site.url}/#website` },
            about: { "@id": `${site.url}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: featuredBuilds.length,
              itemListElement: featuredBuilds.map((build, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${build.vehicle}: ${build.title}`,
                url: `${site.url}${routes.builds}/${build.slug}`,
              })),
            },
          },
        ]}
      />

      <PageHero
        image="/build-suv.webp"
        imageAlt="Completed multi-discipline build by DESIGNBYTWM"
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Featured Builds" },
        ]}
        title="The work speaks first."
        intro="Complete transformations, multiple disciplines, one team. Every build documented from first consultation to final delivery."
      />

      {/* Her search block. */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Search The Portfolio"
            title="Find your vehicle"
            lede="See if we have already worked on something like yours."
            center
          />

          <Reveal>
            <BuildFinder builds={featuredBuilds} />
          </Reveal>
        </div>
      </section>

      {/* Her closing band. One call to action. */}
      <section>
        <div className="wrap">
          <Reveal className="final-cta">
            <div className="final-in">
              <span className="eyebrow on-dark">Ready When You Are</span>
              <h2 className="display">Have a vision for your vehicle?</h2>
              <p>
                Tell us about your vehicle and the transformation you have in
                mind.
              </p>
              <div className="final-actions">
                <Link href={routes.designYourBuild} className="btn btn-primary">
                  Design Your Build
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
