import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { routes } from "@/lib/site";

/* =============================================================
   SHARED PAGE COMPONENTS
   Extracted from the approved homepage. Every inner page is
   assembled from these. Nothing here introduces a colour, corner
   treatment or type role that is not already on the homepage.
   ============================================================= */

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * PageHero
 *
 * The homepage hero treatment applied to inner pages: full photo,
 * bottom scrim, teal monogram, content anchored bottom left.
 * Breadcrumbs occupy the eyebrow slot so no new element is added.
 */
export function PageHero({
  image,
  imageAlt,
  crumbs,
  title,
  intro,
  ctaLabel = "Design Your Build",
  ctaHref = routes.designYourBuild,
  secondaryLabel,
  secondaryHref,
  stats,
  hideCta = false,
}: {
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Short assertions on a hairline rule, as in Liz's dealer hero. */
  stats?: string[];
  /**
   * Some of Liz's explore heroes carry no buttons at all. Design Your
   * Build is one: the form is immediately below, so a button pointing at
   * it is noise.
   */
  hideCta?: boolean;
}) {
  return (
    <section className="hero inner">
      <div className="ph">
        <img src={image} alt={imageAlt} fetchPriority="high" />
      </div>
      <div className="hero-scrim" />

      <div className="hero-in">
        <div className="wrap">
          <div className="hero-content">
            <Monogram />
            <nav aria-label="Breadcrumb" className="eyebrow on-dark crumbs">
              {crumbs.map((crumb, i) => (
                <span key={crumb.label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                  {i < crumbs.length - 1 && <i aria-hidden="true">/</i>}
                </span>
              ))}
            </nav>

            <h1 className="display">{title}</h1>
            {intro && <p>{intro}</p>}

            {/* Second action is optional. Liz uses a pair on some explore
               pages and a single button on others, so the slot exists and
               stays empty unless a page asks for it.

               Anything that is not an internal route, sms: or tel: for
               example, renders as a plain anchor rather than a Link. */}
            {!hideCta && (
              <div className="hero-actions">
                <Link href={ctaHref} className="btn btn-primary">
                  {ctaLabel}
                </Link>
                {secondaryLabel && secondaryHref && (
                  secondaryHref.startsWith("/") ? (
                    <Link href={secondaryHref} className="btn btn-line-light">
                      {secondaryLabel}
                    </Link>
                  ) : (
                    <a href={secondaryHref} className="btn btn-line-light">
                      {secondaryLabel}
                    </a>
                  )
                )}
              </div>
            )}

            {stats && stats.length > 0 && (
              <ul className="hero-stats">
                {stats.map((item, i) => (
                  <li key={item}>
                    <span className="label">{item}</span>
                    {i < stats.length - 1 && <i aria-hidden="true">◆</i>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Eyebrow + display h2 + lede. The approved section head, used everywhere. */
export function SecHead({
  eyebrow,
  title,
  lede,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`sec-head ${center ? "center" : ""} ${className}`.trim()}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display">{title}</h2>
      {lede && <p className="lede" style={center ? { margin: "0 auto" } : undefined}>{lede}</p>}
    </Reveal>
  );
}

/**
 * CustomBand
 *
 * The approved black metal CTA band from the homepage services section.
 * Reused verbatim on inner pages with variable copy.
 */
export function CustomBand({
  heading,
  ctaLabel = "Start a Custom Build",
  ctaHref = routes.designYourBuild,
}: {
  heading: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Reveal className="custom">
      <Monogram />
      <div className="inner">
        <h3 className="display">{heading}</h3>
      </div>
      <Link href={ctaHref} className="btn btn-primary inner">
        {ctaLabel}
      </Link>
    </Reveal>
  );
}

/**
 * FaqBlock
 *
 * Native <details> elements, so the answers are in the DOM and readable
 * by a crawler whether or not they are open. That matters: answer engines
 * lift these, and content hidden behind JavaScript often is not indexed.
 * The caller is responsible for emitting matching FAQPage schema.
 */
export function FaqBlock({
  faqs,
  center = false,
}: {
  faqs: { question: string; answer: string }[];
  center?: boolean;
}) {
  return (
    <div className={`faq${center ? " center" : ""}`}>
      {faqs.map((faq, i) => (
        <Reveal key={faq.question} as="details" delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}>
          <summary>{faq.question}</summary>
          <div className="answer">{faq.answer}</div>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered scope list with hairline separators. */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={item}>
          <b>{String(i + 1).padStart(2, "0")}</b>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * CrossSell
 *
 * Renders the pairsWith relationships already modelled in services.ts.
 * This is the module that does the commercial work Liz asked for when she
 * separated PPF: it shows every discipline as pairable with the others
 * rather than as an isolated purchase.
 */
export function CrossSell({
  items,
}: {
  items: { slug: string; name: string; cardLine: string }[];
}) {
  return (
    <div className="cross-grid">
      {items.map((item, i) => (
        <Reveal
          key={item.slug}
          as={Link}
          href={routes.service(item.slug)}
          className="cross"
          delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
        >
          <div className="name">{item.name}</div>
          <div className="desc">{item.cardLine}</div>
          <span className="go">Explore →</span>
        </Reveal>
      ))}
    </div>
  );
}
