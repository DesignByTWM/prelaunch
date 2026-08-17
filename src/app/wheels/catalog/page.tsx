import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SecHead } from "@/components/ui/Page";
import { Reveal } from "@/components/Reveal";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { nap, routes, site } from "@/lib/site";

/**
 * WHEEL CATALOG · COMING SOON
 *
 * Liz's Shop Wheels mock carries a "Browse Wheels" call to action. The
 * locked decision is that wheels ship form-only at launch, so rather than
 * point that button at a dead href="#" it lands here.
 *
 * Jose, August 17 2026: build the CTA with the catalog and give it a
 * coming soon page. A full store is under discussion separately.
 *
 * NOINDEX, deliberately. A thin coming soon page competing in search
 * against the wheels hub would cannibalise it. The moment real inventory
 * lands, delete the robots block below and this becomes a real route.
 */

export const metadata: Metadata = {
  title: "Wheel Catalog",
  description:
    "The DESIGNBYTWM wheel catalog is in preparation. Fitment for your exact vehicle is confirmed before anything is ordered.",
  alternates: { canonical: `${routes.wheels}/catalog` },
  robots: { index: false, follow: true },
};

export default function WheelCatalogPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop Wheels", path: routes.wheels },
            { name: "Catalog", path: `${routes.wheels}/catalog` },
          ]),
          {
            "@type": "WebPage",
            name: "Wheel Catalog",
            url: `${site.url}${routes.wheels}/catalog`,
            isPartOf: { "@id": `${site.url}/#website` },
            description:
              "Wheel catalog in preparation. Fitment is confirmed per vehicle before any order is placed.",
          },
        ]}
      />

      <PageHero
        image="/wheel-1.webp"
        imageAlt="Forged wheel detail on a customized vehicle"
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Shop Wheels", href: routes.wheels },
          { label: "Catalog" },
        ]}
        title={<>The catalog<br />is coming.</>}
        intro="We are building out the full wheel program online. Until it is live, fitment is handled the way it always has been: on the lift, against your specific vehicle."
      />

      <section>
        <div className="wrap split">
          <SecHead
            eyebrow="In Preparation"
            title={<>Browsing is<br />the easy part.</>}
          />
          <Reveal className="prose">
            <p>
              Offset, width and tire profile decide whether a wheel clears, rubs
              or sits right, and none of that is answered by a photograph. Every
              set that leaves here is calculated for the exact vehicle before
              anything is ordered, then mounted, balanced and torqued in house.
            </p>
            <p>
              The online catalog will carry that same logic rather than a grid of
              pictures. Until it is ready, tell us the vehicle and the look you
              are after and we will come back with what actually fits.
            </p>
            <p style={{ marginTop: 24 }}>
              <Link href={routes.wheels} className="arrow-link">
                Back to Shop Wheels →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <IntakeForm
        eyebrow="Wheel Enquiry"
        title="Tell us the vehicle."
        lede={`Year, make, model and the stance you want. We confirm fitment before anything is ordered. Call or text ${nap.phone} if you would rather talk it through.`}
        source="wheels-catalog"
        preselect="Wheels & Fitment"
      />
    </>
  );
}
