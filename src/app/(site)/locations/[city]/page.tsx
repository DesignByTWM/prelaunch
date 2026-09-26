import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { IntakeForm } from "@/components/home/IntakeForm";
import { LocationMotionLazy } from "@/components/location/LocationMotionLazy";
import "@/components/location/location.css";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import { getLocationContent } from "@/content/locations";
import { services, serviceBySlug } from "@/content/services";
import { featuredBuilds } from "@/content/builds";
import { wheelBrands } from "@/content/wheels";
import { hours, locations, nap, routes } from "@/lib/site";

/**
 * CITY PAGE
 *
 * Two modes, chosen by whether the city has an entry in
 * content/locations.ts.
 *
 * WITH CONTENT: the full location page, in the animated concept Jose
 * approved on September 24 2026. Houston is the master and the only one
 * written so far. The main website is not touched by this concept: its
 * styles live in components/location/location.css behind an .lp- prefix
 * and its motion in components/location/LocationMotion.tsx, both loaded
 * only here.
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
 * `indexable` flag on the content entry. Houston was approved by Liz and
 * indexed September 24 2026; every other city stays noindex until its own
 * content is written. Removing a noindex is one line, undoing a doorway
 * page penalty is not.
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

/** "08:00" to "8 AM", "17:00" to "5 PM". */
function clock(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

/**
 * The real location page, section by section in Jose's approved order:
 *
 *   1. Hero, the full photo with the headline rising in
 *   2. The city's two disciplines, one pinned scene
 *   3. From the city to the House, route map
 *   4. The ten disciplines, horizontal run
 *   5. Featured build
 *   6. Shop wheels, white, two cards
 *   7. City questions, inverted
 *   8. Design your build, the shared intake form on its bright ground
 *
 * The site header and footer come from the root layout as on every page.
 * The nearby cities row was removed September 24 2026 per Jose: the
 * footer's Areas We Serve already links every city page, so the row was
 * a duplicate. Internal linking between cities is unchanged.
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
  const wheels = wheelBrands.slice(0, 2);

  /* The form's select carries service names as its values, so the slug
     is resolved here rather than stored twice. */
  const preselect = serviceBySlug.get(content.preselectService)?.name;

  const open = hours.find((h) => h.opens && h.closes);
  const closedDays = hours.filter((h) => !h.opens).map((h) => h.days);

  const { access } = content;

  return (
    <div className="lp" id="lp">
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

      <LocationMotionLazy />

      {/* 1. HERO. The full photo from the first frame. The light sweep
          effect was removed September 26 2026 at Henry's request; the
          headline still rises in, in CSS, so nothing waits on script. */}
      <section className="lp-hero" aria-label={`${location.name}, ${content.h1.line2}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lp-hero-img"
          src={content.hero.image}
          alt={content.hero.alt}
          fetchPriority="high"
        />
        <div className="lp-hero-fade" aria-hidden="true" />

        <div className="lp-hero-copy">
          <div className="lp-rv">
            <Monogram />
          </div>
          <h1 className="display lp-h1">
            <span className="lp-mask lp-l1"><span>{content.h1.line1}</span></span>
            <span className="lp-mask lp-l2"><span>{content.h1.line2}</span></span>
          </h1>
          <p className="lp-hero-lede lp-rv">{content.lede}</p>
          <div className="lp-ctas lp-rv">
            <a href="#intake" className="btn btn-primary">Design Your Build</a>
            <Link href={routes.builds} className="btn btn-line-light">
              View Featured Builds
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PAIR. Desktop pins this and hands one service to the
          other across a single frame. Mobile and reduced motion stack. */}
      <section className="lp-pair" aria-label={content.pair.headline}>
        <div className="lp-pair-stage">
          <div>
            <div className="lp-pair-head">
              <span className="eyebrow">{location.name} starts here</span>
              <h2 className="display">{content.pair.headline}</h2>
              <p>{content.pair.lede}</p>
            </div>

            <div className="lp-tabs" aria-hidden="true">
              <span className="lp-tab is-on">{pair[0].title}</span>
              <span className="lp-tab">{pair[1].title}</span>
            </div>

            <div className="lp-swap">
              {pair.map((entry) => {
                const service = serviceBySlug.get(entry.slug);
                return (
                  <div key={entry.slug} className="lp-swap-item">
                    <div className="lp-mframe">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={entry.image} alt={entry.imageAlt} loading="lazy" />
                    </div>
                    <h3 className="display">{entry.title}</h3>
                    <p>{entry.copy}</p>
                    <Link href={routes.service(entry.slug)} className="arrow-link">
                      {service?.ctaLabel ?? "Explore"} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lp-frame" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lp-frame-a" src={pair[0].image} alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lp-frame-b" src={pair[1].image} alt="" />
            <span className="lp-film" />
          </div>
        </div>
      </section>

      {/* 3. FROM THE CITY TO THE HOUSE. Where, how to get here, when. */}
      <section className="lp-map" aria-label={`From ${location.name} to the House`}>
        <div className="wrap lp-map-grid">
          <div>
            <span className="eyebrow">From {location.name} to the House</span>
            <h2 className="display">{access.headline}</h2>

            <div className="lp-block">
              <span className="lp-k">Where</span>
              <p>
                <b>
                  {nap.street}, {nap.city}, {nap.state} {nap.postalCode}
                </b>
                {access.where}
              </p>
            </div>

            <div className="lp-block">
              <span className="lp-k">Getting here</span>
              <ul className="lp-routes">
                {access.routes.map((route, i) => (
                  <li key={route.from} data-route={i} tabIndex={0}>
                    <span className="lp-from">From {route.from}</span>
                    <span className="lp-time">{route.time}</span>
                    <span className="lp-via">{route.via}</span>
                  </li>
                ))}
              </ul>
            </div>

            {open && open.opens && open.closes && (
              <div className="lp-block">
                <span className="lp-k">Hours</span>
                <p>
                  {open.days}, {clock(open.opens)} to {clock(open.closes)}.
                  {closedDays.length > 0 && ` Closed ${closedDays.join(" and ")}.`}
                </p>
              </div>
            )}

            <p className="lp-hoods">{access.neighborhoods}</p>
          </div>

          <svg
            className="lp-svg"
            viewBox="0 0 620 560"
            role="img"
            aria-label={`Map of routes from ${access.routes.map((r) => r.from).join(", ")} to the House at ${nap.street}`}
          >
            {/* Houston roads, schematic and not to scale. */}
            <circle className="lp-road major" cx="300" cy="360" r="190" />
            <circle className="lp-road" cx="292" cy="368" r="84" />
            <path className="lp-road major" d="M312 395 L318 250 L330 120 L352 10" />
            <path className="lp-road" d="M330 380 L372 250 L410 120 L438 10" />
            <path className="lp-road" d="M40 372 L560 356" />
            <path className="lp-road" d="M300 395 L150 520" />
            <text className="lp-rlabel" x="360" y="24">I-45</text>
            <text className="lp-rlabel" x="446" y="30">Hardy Toll Rd</text>
            <text className="lp-rlabel" x="486" y="238">Beltway 8</text>
            <text className="lp-rlabel" x="376" y="318">610</text>

            {access.routes.map((route, i) => (
              <path key={`r-${route.from}`} className="lp-route" data-route={i} d={route.d} />
            ))}

            {/* Two arrows per route, running toward the House. */}
            {access.routes.flatMap((route, i) =>
              [0, 1].map((k) => (
                <path
                  key={`a-${route.from}-${k}`}
                  className="lp-arrow"
                  data-route={i}
                  data-k={k}
                  d="M-6 -4.5 L6 0 L-6 4.5 Z"
                />
              )),
            )}

            {access.routes.map((route) => (
              <g key={`d-${route.from}`} className="lp-dest">
                <circle cx={route.x} cy={route.y} r="4.5" />
                <text x={route.labelX} y={route.labelY}>{route.from}</text>
              </g>
            ))}

            <g>
              <circle className="lp-house-pulse" cx={access.house.x} cy={access.house.y} r="9" />
              <circle className="lp-house-dot" cx={access.house.x} cy={access.house.y} r="7" />
              <svg
                className="lp-house-mono"
                x={access.house.x + 16}
                y={access.house.y - 50}
                width="46"
                height="35"
                aria-hidden="true"
              >
                <use href="#twm-mono" />
              </svg>
              <text className="lp-house-label" x={access.house.x + 18} y={access.house.y - 4}>
                The House
              </text>
              <text className="lp-house-sub" x={access.house.x + 18} y={access.house.y + 14}>
                {nap.street}
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. THE TEN DISCIPLINES. Desktop holds the page and runs the
          cards sideways. Mobile swipes. */}
      <section className="lp-disc" aria-label="The ten disciplines">
        <div className="lp-disc-inner">
          <div className="lp-disc-head">
            <div>
              <span className="eyebrow">The Ten Disciplines</span>
              <h2 className="display">Everything your build needs. One roof.</h2>
            </div>
            <div className="lp-bar" aria-hidden="true"><i /></div>
          </div>
          <div className="lp-track">
            {disciplines.map((service) => (
              <Link key={service.slug} href={routes.service(service.slug)} className="lp-card">
                <div className="lp-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.imageAlt} loading="lazy" />
                </div>
                <h3 className="display">{service.name}</h3>
                <p>{service.cardLine}</p>
                <span className="lp-go">{service.ctaLabel ?? "Explore"} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED BUILD. */}
      {build && (
        <section className="lp-feat" aria-label="Featured build">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={build.hero} alt={build.heroAlt} loading="lazy" />
          <div className="lp-feat-copy">
            <span className="eyebrow">Featured Build</span>
            <h2 className="display">Built at the House.</h2>
            <p>
              {build.vehicle}: {build.title}. Every finish in these frames was
              applied here, under one roof.
            </p>
            <Link href={`${routes.builds}/${build.slug}`} className="btn btn-line-light">
              See the build
            </Link>
          </div>
        </section>
      )}

      {/* 6. SHOP WHEELS. White ground, two cards from the same source as
          the homepage module and /wheels. */}
      <section className="lp-wheels" aria-label="Shop wheels">
        <div className="wrap lp-wheels-grid">
          <div>
            <span className="eyebrow">Wheels &amp; Fitment</span>
            <h2 className="display">Shop wheels.</h2>
            <p className="lede">
              A selection from the forged and monoblock lines we specify.
              Fitment is measured for your vehicle before anything is ordered.
            </p>
            <Link href={routes.wheels} className="btn btn-line">Browse Wheels</Link>
          </div>
          <div className="lp-wheel-cards">
            {wheels.map((brand) => (
              <div key={brand.name} className="lp-wheel-card">
                <div className="lp-wheel-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.frame} alt={`${brand.name} wheel`} loading="lazy" />
                </div>
                <h3>{brand.name}</h3>
                <p>{brand.blurb}</p>
                <a href="#intake" className="btn btn-line">Inquire</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CITY QUESTIONS. Inverted. Also the source of the FAQPage
          schema above, so what Google reads is what the visitor reads. */}
      <section className="lp-faq" aria-label={`${location.name} questions`}>
        <div className="wrap lp-faq-grid">
          <div>
            <span className="eyebrow">{location.name} questions</span>
            <h2 className="display">Before you drive over.</h2>
          </div>
          <div>
            {content.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p className="lp-ans">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DESIGN YOUR BUILD. The shared form on its standard bright
          ground. Every lead is stamped with this page and city. */}
      <IntakeForm
        eyebrow="Design Your Build"
        title="Tell the House what you drive."
        lede="Share your vehicle and what you want done. The House reviews every request and follows up to plan the build."
        source={`location-${content.slug}`}
        preselect={preselect}
        city={location.name}
      />

    </div>
  );
}
