import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/Reveal";
import { SecHead, FaqBlock } from "@/components/ui/Page";
import { ShopWheels } from "@/components/home/HouseSections";
import { IntakeForm } from "@/components/home/IntakeForm";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import { getLocationContent } from "@/content/locations";
import { services, serviceBySlug } from "@/content/services";
import { featuredBuilds } from "@/content/builds";
import { locations, nap, routes } from "@/lib/site";

/**
 * CITY PAGE
 *
 * Two modes, chosen by whether the city has an entry in
 * content/locations.ts.
 *
 * WITH CONTENT: the full location page. Houston is the master and the
 * only one written so far.
 *
 * WITHOUT CONTENT: the coming soon placeholder below, unchanged. All 22
 * routes exist so the footer and hub links resolve rather than 404.
 *
 * NOINDEX, still, on every city.
 *
 * Twenty-two near-identical pages is precisely the pattern Google treats as
 * doorway pages, and publishing them thin now would attach that signal to
 * the domain before the real program ever launches. Indexing gets switched
 * on page by page as genuine content is written for each city, through the
 * `indexable` flag on the content entry. Houston carries real content but
 * stays noindex while Liz reviews it. Removing the noindex is one line,
 * undoing a doorway page penalty is not.
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

  const content = getLocationContent(city);

  if (content) {
    return {
      /* Bare, so the root "%s | DESIGNBYTWM" template applies. */
      title: content.title,
      description: content.description,
      alternates: { canonical: routes.location(location.slug) },
      robots: { index: content.indexable, follow: true },
    };
  }

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

  const content = getLocationContent(city);
  if (content) return <LocationPage slug={city} />;

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

/**
 * The real location page.
 *
 * Every block reuses an existing module or the existing classes for it.
 * Nothing here introduces a colour, corner treatment or type role that is
 * not already on the homepage or a service page.
 *
 * The hero block is a standard light section rather than the charcoal
 * `.hero` component. `.hero` is a fixed height band whose content is
 * absolutely positioned against the bottom edge, so it cannot carry a
 * second column beside the text without overflowing. `.svc-overview` is
 * the approved two column block for exactly this, copy one side and a
 * frame the other, and it already stacks below on small screens.
 */
function LocationPage({ slug }: { slug: string }) {
  const content = getLocationContent(slug);
  if (!content) notFound();

  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const pair = [content.pair.primary, content.pair.secondary];
  const pairSlugs = pair.map((entry) => entry.slug);

  /* The two paired disciplines lead, then the remaining eight in the
     order services.ts declares them. */
  const disciplines = [
    ...pairSlugs
      .map((pairSlug) => serviceBySlug.get(pairSlug))
      .filter((service) => service !== undefined),
    ...services.filter((service) => !pairSlugs.includes(service.slug)),
  ];

  const build = featuredBuilds.find((b) => b.slug === content.featuredBuildSlug);

  /* The form's select carries service names as its values, so the slug
     is resolved here rather than stored twice. */
  const preselect = serviceBySlug.get(content.preselectService)?.name;

  const nearby = content.nearby
    .map((citySlug) => locations.find((l) => l.slug === citySlug))
    .filter((entry) => entry !== undefined);

  return (
    <>
      <JsonLd
        graph={[
          /* No visible breadcrumb bar on this page, by design. The trail
             is emitted for search only. */
          breadcrumbSchema([
            { name: "Home", path: routes.home },
            { name: "Areas We Serve", path: routes.locations },
            { name: location.name, path: routes.location(location.slug) },
          ]),
          /* Both paired disciplines, scoped to this city. provider
             references the existing organization node, so no second
             business or address entity is created. */
          ...pair.map((entry) => {
            const service = serviceBySlug.get(entry.slug);
            return serviceSchema({
              name: service?.name ?? entry.title,
              description: service?.summary ?? entry.copy,
              slug: entry.slug,
              areaServed: [location.name],
            });
          }),
          faqSchema(content.faqs),
        ]}
      />

      {/* HERO. Copy left, the two paired disciplines right, stacking
          below the copy on small screens. */}
      <section>
        <div className="wrap">
          <div className="svc-overview">
            <div>
              <Reveal className="sec-head">
                <span className="eyebrow">{content.eyebrow}</span>
                <h1 className="display">{content.h1}</h1>
                <p className="lede">{content.lede}</p>
              </Reveal>

              <Reveal style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#build" className="btn btn-primary">
                  Design Your Build
                </a>
                <Link href={routes.builds} className="btn btn-line">
                  View Featured Builds
                </Link>
              </Reveal>
            </div>

            <div style={{ display: "grid", gap: 20 }}>
              {pair.map((entry, i) => {
                const service = serviceBySlug.get(entry.slug);
                return (
                  <Reveal
                    key={entry.slug}
                    as={Link}
                    href={routes.service(entry.slug)}
                    className="svc"
                    card
                    delay={(i + 1) as 1 | 2}
                  >
                    <div className="svc-body">
                      <div className="name">{entry.title}</div>
                      <div className="desc">{entry.copy}</div>
                      <span className="go">
                        {service?.ctaLabel ?? "Explore"} →
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STRIP. Four facts on one slim row, neighbourhoods beneath. */}
      <section className="alt">
        <div className="wrap">
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px 28px",
              }}
            >
              {content.strip.items.map((item) => (
                <span key={item} className="label">
                  {item}
                </span>
              ))}
            </div>
            <p className="form-note">{content.strip.neighborhoods}</p>
          </Reveal>
        </div>
      </section>

      {/* TEN DISCIPLINES. The homepage services grid, carrying all ten. */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="The Ten Disciplines"
            title="Everything your build needs. One roof."
          />

          <div className="svc-grid">
            {disciplines.map((service, i) => (
              <Reveal
                key={service.slug}
                as={Link}
                href={routes.service(service.slug)}
                className="svc"
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r45">
                  <Photo src={service.image} alt={service.imageAlt} />
                </div>
                <div className="svc-body">
                  <div className="name">{service.name}</div>
                  <div className="desc">{service.cardLine}</div>
                  <span className="go">Explore →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BUILD. The existing build card, one of them. */}
      {build && (
        <section className="alt">
          <div className="wrap">
            <SecHead
              eyebrow="Featured Build"
              title="Built at the House."
              lede="Every finish in these frames was applied here, under one roof."
            />

            <div className="builds">
              <Reveal
                as={Link}
                href={`${routes.builds}/${build.slug}`}
                className="build"
                card
                delay={1}
              >
                <div className="ph r169">
                  <Photo src={build.hero} alt={build.heroAlt} />
                </div>
                <h3>
                  {build.vehicle}: {build.title}
                </h3>
                <div className="tags">
                  {build.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* FAQ. Collapsed, and the source of the FAQPage schema above. */}
      <section>
        <div className="wrap">
          <SecHead eyebrow="FAQ" title="Common questions" center />
          <FaqBlock faqs={content.faqs} center />
        </div>
      </section>

      <ShopWheels />

      {/* FORM. Wrapped rather than re-id'd: IntakeForm owns its own
          section id, and the hero button anchors to this one. */}
      <div id="build">
        <IntakeForm
          source={`location-${content.slug}`}
          preselect={preselect}
          city={location.name}
        />
      </div>

      {/* NEARBY. One line, every other city page. */}
      <section className="alt">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Serving Greater {location.name}</span>
            <p className="lede" style={{ marginTop: 12, maxWidth: "none" }}>
              {nearby.map((entry, i) => (
                <span key={entry.slug}>
                  <Link href={routes.location(entry.slug)}>{entry.name}</Link>
                  {i < nearby.length - 1 && " · "}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
