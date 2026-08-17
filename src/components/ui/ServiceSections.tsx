import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { routes, nap } from "@/lib/site";
import type {
  ServiceCoverage,
  ServiceProcessStep,
  ServiceRecentWork,
  ServicePackage,
} from "@/content/services";

/* =============================================================
   SERVICE SECTION COMPONENTS
   Structure from Liz's approved mocks, August 14 2026.
   Styling is Brand Guidelines v2.0 only. Nothing from her stylesheet
   crossed over: her palette, her radii, her Inter 700 and her teal
   overlines were all discarded per Jose, August 17 2026.

   Two rules enforced here that her mock broke:
     1. Signal Teal appears on CTAs only, and always with a black label.
        Pills, step numbers and links use black or gray.
     2. Cards carry the approved 34px 0 34px 0 corner, buttons 16px 0 16px 0.
   ============================================================= */

/**
 * StatStrip
 *
 * Three short assertions directly under the hero. Warranty term,
 * material grade, in-house. Short factual statements this high in the
 * document are read by answer engines as entity attributes, which is
 * why they sit above the fold rather than in the footer.
 */
export function StatStrip({ items }: { items: string[] }) {
  return (
    <div className="stat-strip">
      <div className="wrap">
        <ul>
          {items.map((item, i) => (
            <li key={item}>
              <span className="label">{item}</span>
              {i < items.length - 1 && <i aria-hidden="true">◆</i>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Coverage
 *
 * The four named sub variants of a discipline. Commercially this is the
 * menu. For search it is the more valuable module on the page: each name
 * is a distinct long tail term the site did not previously use anywhere.
 *
 * Her mock linked each card to a dead href="#". They anchor to the
 * packages block instead, since that is where a reader picks a level.
 */
export function Coverage({ items }: { items: ServiceCoverage[] }) {
  return (
    <div className="cov-grid">
      {items.map((item, i) => (
        <Reveal
          key={item.name}
          as="a"
          href="#packages"
          className="cov rv-card"
          delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
        >
          <div className="ph r45">
            <span className="pill">{item.pill}</span>
          </div>
          <div className="cov-body">
            <h3>{item.name}</h3>
            <span className="go">Explore →</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Process
 *
 * Four steps on the approved black metal ground. Emitted as HowTo schema
 * by the caller. Process content is quoted by answer engines more than
 * any other block on a service page, because it answers "how does this
 * work" without the reader having to infer it.
 */
export function Process({
  statement,
  steps,
}: {
  statement: string;
  steps: ServiceProcessStep[];
}) {
  return (
    <Reveal className="proc">
      <Monogram />
      <div className="proc-in">
        <p className="proc-statement display">{statement}</p>
        <ol className="proc-grid">
          {steps.map((step) => (
            <li key={step.step}>
              <b>{step.step}</b>
              <h3>{step.name}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/**
 * RecentWork
 *
 * Four captioned frames. Photography is still outstanding, so these
 * render the approved placeholder treatment rather than a broken image.
 * Captions are real: they are the build types Liz named.
 */
export function RecentWork({ items }: { items: ServiceRecentWork[] }) {
  return (
    <>
      <div className="recent-grid">
        {items.map((item, i) => (
          <Reveal
            key={item.name}
            className="recent rv-card"
            delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
          >
            <div className="ph r11" />
            <div className="recent-scrim" />
            <span className="recent-cap label">{item.name}</span>
            <span className="pill">{item.tag}</span>
          </Reveal>
        ))}
      </div>
      <div className="recent-more">
        <Link href={routes.builds} className="btn btn-line">
          View More Builds
        </Link>
      </div>
    </>
  );
}

/**
 * Packages
 *
 * Three tiers, one flagged. No prices anywhere, by client instruction of
 * August 14 2026: every cost path routes to a consultation instead.
 * Emitted as Offer nodes so the tiers are machine readable without a
 * price attached.
 *
 * The inclusions here carry commitments the house has not previously
 * published: warranty term, priority scheduling, a dedicated project
 * lead. Logged in CLIENT_REVIEW_NOTES.md section 21.
 */
export function Packages({
  items,
  serviceName,
}: {
  items: ServicePackage[];
  serviceName: string;
}) {
  return (
    <div className="pkg-grid" id="packages">
      {items.map((pkg, i) => (
        <Reveal
          key={pkg.name}
          className={`pkg${pkg.featured ? " featured" : ""}`}
          delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
        >
          {pkg.featured && pkg.ribbon && <span className="ribbon label">{pkg.ribbon}</span>}
          <h3 className="display">{pkg.name}</h3>
          <p className="pkg-sub">{pkg.sub}</p>
          <ul className="pkg-list">
            {pkg.includes.map((inc) => (
              <li key={inc}>
                <span aria-hidden="true">✓</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`${routes.designYourBuild}?service=${encodeURIComponent(serviceName)}&tier=${encodeURIComponent(pkg.name)}`}
            className={`btn ${pkg.featured ? "btn-primary" : "btn-line"}`}
          >
            Request a Quote
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * FinalCta
 *
 * The closing band. Two calls to action, matching the structure Liz
 * asked to be carried across all ten pages: primary into the build
 * flow, secondary to the text line.
 *
 * The SMS number is read from lib/site.ts. It is never written into a
 * component. Her mocks carried a placeholder 713 number in 54 places
 * and none of it reached this file.
 */
export function FinalCta({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <Reveal className="final-cta">
      <Monogram />
      <div className="final-in">
        <span className="eyebrow on-dark">Ready When You Are</span>
        <h2 className="display">{title}</h2>
        <p>{lede}</p>
        <div className="final-actions">
          <Link href={routes.designYourBuild} className="btn btn-primary">
            Design Your Build
          </Link>
          <a href={nap.smsHref} className="btn btn-line-light">
            Text TWM
          </a>
        </div>
      </div>
    </Reveal>
  );
}
