import type { Metadata } from "next";
import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Reveal } from "@/components/Reveal";
import { SecHead } from "@/components/ui/Page";
import { processSteps } from "@/content/house";
import { journalPosts } from "@/content/journal";
import { nap, routes, socials } from "@/lib/site";

/**
 * THANK YOU
 *
 * Shared confirmation destination for every form on the site.
 *
 * Two jobs beyond saying thanks. It sets expectations about what happens
 * next, which reduces the follow-up calls asking whether the form went
 * through. And it keeps the person on the site with reading and social
 * links, because the moment right after submitting is the highest
 * engagement moment a visitor will ever have.
 *
 * Not indexed. This page has no value in search and would only ever appear
 * as a confusing result.
 */

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has been received by DESIGNBYTWM.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const reading = journalPosts.slice(0, 3);

  return (
    <>
      <section style={{ paddingTop: "clamp(70px,10vw,130px)", paddingBottom: "clamp(40px,6vw,70px)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Monogram />
          <h1 className="display" style={{ fontSize: "clamp(28px,4.4vw,52px)", margin: "18px 0 16px" }}>
            Request received.
          </h1>
          <p className="lede" style={{ margin: "0 auto 32px" }}>
            Thank you. Your details are with the house and someone will be in
            touch to arrange a consultation.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={nap.phoneHref} className="btn btn-primary">
              Call {nap.phone}
            </a>
            <Link href={routes.contact} className="btn btn-line">
              Contact the House
            </Link>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="What Happens Next"
            title={<>From here<br />to delivery.</>}
            center
            lede="So you know what to expect rather than wondering whether the form went through."
          />
          <div className="process">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.title}
                className="process-step"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Keep them here */}
      <section>
        <div className="wrap">
          <SecHead
            eyebrow="While You Wait"
            title={<>Worth<br />reading.</>}
            lede="The questions most people ask between submitting a request and walking into the house."
          />
          <div className="cross-grid">
            {reading.map((post, i) => (
              <Reveal
                key={post.slug}
                as={Link}
                href={`${routes.journal}/${post.slug}`}
                className="cross"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="name">{post.category}</div>
                <div className="desc" style={{ color: "var(--black)", fontSize: 13.5, marginTop: 10 }}>
                  {post.title}
                </div>
                <span className="go">Read →</span>
              </Reveal>
            ))}
            <Reveal
              as={Link}
              href={routes.builds}
              className="cross"
              delay={4}
            >
              <div className="name">Featured Builds</div>
              <div className="desc" style={{ color: "var(--black)", fontSize: 13.5, marginTop: 10 }}>
                See what a multi discipline build actually involves
              </div>
              <span className="go">Explore →</span>
            </Reveal>
          </div>

          <Reveal style={{ marginTop: 44, textAlign: "center" }}>
            <p className="type-eyebrow" style={{ marginBottom: 16 }}>
              Follow the work
            </p>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
