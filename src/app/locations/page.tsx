import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { locations, nap, routes, site } from "@/lib/site";

/**
 * LOCATIONS HUB
 *
 * Lists all 22 service areas and links to each city page.
 *
 * The individual city pages are placeholders at this stage. The location
 * SEO program is built after the site is finalised and approved, because
 * 22 pages of near-identical content is the single fastest way to get a
 * location program devalued by Google. Each one needs genuinely distinct
 * content, and that cannot be written against copy the client has not
 * signed off yet.
 */

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: `DESIGNBYTWM serves ${locations.length} communities across greater Houston from its facility at ${nap.street}. Wraps, paint protection film, wheels, interiors, suspension and complete builds.`,
  alternates: { canonical: routes.locations },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas We Serve", path: routes.locations },
          ]),
          {
            "@type": "CollectionPage",
            name: "Areas We Serve",
            url: `${site.url}${routes.locations}`,
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Areas We Serve" }]}
        title={
          <>
            Across greater
            <br />
            Houston.
          </>
        }
        intro={`One facility on ${nap.street}, serving ${locations.length} communities across the metro. Vehicles are also regularly transported in from elsewhere in Texas for larger builds.`}
      />

      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Service Area"
            title={
              <>
                {locations.length} communities,
                <br />
                one house.
              </>
            }
            lede="Every discipline is performed at the Ammi Trail facility. Clients travel to the house rather than the work travelling to them, which is what makes a coordinated multi discipline build possible in the first place."
          />

          <div className="city-grid">
            {locations.map((location, i) => (
              <Reveal
                key={location.slug}
                as={Link}
                href={routes.location(location.slug)}
                className="city-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <span className="city-name">{location.name}</span>
                <span className="city-state">{nap.stateFull}</span>
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
                Wherever you are
                <br />
                in the metro.
              </>
            }
          />
        </div>
      </section>

      <IntakeForm source="locations-hub" />
    </>
  );
}
