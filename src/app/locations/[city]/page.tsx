import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { locations, nap, routes } from "@/lib/site";

/**
 * CITY PAGE · PLACEHOLDER
 *
 * All 22 routes exist so the footer and hub links resolve rather than 404.
 * Real content comes after the site is finalised and approved.
 *
 * NOINDEX, deliberately.
 *
 * Twenty-two near-identical pages is precisely the pattern Google treats as
 * doorway pages, and publishing them thin now would attach that signal to
 * the domain before the real program ever launches. Indexing gets switched
 * on page by page as genuine content is written for each city. Removing the
 * noindex is one line, undoing a doorway page penalty is not.
 */

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) return {};

  return {
    title: `${location.name}, ${nap.state}`,
    description: `Automotive customization for ${location.name}, ${nap.stateFull}. Page in progress.`,
    alternates: { canonical: routes.location(location.slug) },
    // Off until real content exists for this city.
    robots: { index: false, follow: true },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) notFound();

  return (
    /* Uses the shared inner hero rather than its own padding. PageHero
       does not fit: this hero is centred, its eyebrow is a plain city
       label rather than breadcrumbs, and it closes on a link that
       PageHero has no slot for. So it carries the same
       `hero inner` / `hero-in` / `hero-content` structure instead and
       inherits the shared charcoal ground and 50px spacing. */
    <section className="hero inner">
      <div className="hero-in">
        <div className="wrap">
          <Reveal className="hero-content" style={{ margin: "0 auto", textAlign: "center" }}>
            <Monogram />

            <span className="eyebrow on-dark" style={{ marginTop: 18 }}>
              {location.name}, {nap.stateFull}
            </span>

            <h1
              className="display"
              style={{ fontSize: "clamp(30px,5vw,62px)", margin: "14px 0 18px" }}
            >
              {location.name}
              <br />
              coming soon.
            </h1>

            <p className="lede" style={{ margin: "0 auto 34px" }}>
              This page is in progress. In the meantime, every discipline is
              performed at the {nap.city} facility and clients travel in from{" "}
              {location.name} regularly.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={routes.designYourBuild} className="btn btn-primary">
                Design Your Build
              </Link>
              {/* Light variant: the hero ground is charcoal now. */}
              <Link href={routes.contact} className="btn btn-line-light">
                Contact the House
              </Link>
            </div>

            <p style={{ marginTop: 44 }}>
              <Link href={routes.services} className="arrow-link">
                See all ten disciplines →
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
