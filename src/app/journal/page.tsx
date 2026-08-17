import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead, CustomBand } from "@/components/ui/Page";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { journalPosts } from "@/content/journal";
import { routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Straight answers on automotive customization from DESIGNBYTWM in Houston. Paint protection film, wraps, wheel fitment, blackout packages and aftercare, explained properly.",
  alternates: { canonical: routes.journal },
};

export default function JournalPage() {
  const [lead, ...rest] = journalPosts;

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: routes.journal },
          ]),
          {
            "@type": "Blog",
            name: "DESIGNBYTWM Journal",
            url: `${site.url}${routes.journal}`,
            publisher: { "@id": `${site.url}/#organization` },
            blogPost: journalPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${site.url}${routes.journal}/${post.slug}`,
              description: post.summary,
              datePublished: post.published,
              image: `${site.url}${post.hero}`,
              author: { "@id": `${site.url}/#organization` },
            })),
          },
        ]}
      />

      <PageHero
        image="/mat-metal.webp"
        imageAlt="Detail of finish work in the DESIGNBYTWM facility"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Journal" }]}
        title="Insights from the shop floor."
        intro="Straight answers on wraps, protection and care, written by the team that does the work."
        ctaLabel="Ask A Question"
        ctaHref={routes.contact}
      />

      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Featured"
            title={
              <>
                Start
                <br />
                here.
              </>
            }
          />

          {/* Lead article */}
          <Reveal
            as={Link}
            href={`${routes.journal}/${lead.slug}`}
            className="build-row"
            card
          >
            <div className="ph r169">
              <Photo src={lead.hero} alt={lead.heroAlt} />
            </div>
            <div className="build-row-body">
              <span className="eyebrow">
                {lead.category} · {lead.readingTime}
              </span>
              <h3 className="display">{lead.title}</h3>
              <p>{lead.summary}</p>
              <span className="arrow-link">Read it →</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SecHead eyebrow="More Articles" title={<>From the journal.</>} />

          <div className="index-grid">
            {rest.map((post, i) => (
              <Reveal
                key={post.slug}
                as={Link}
                href={`${routes.journal}/${post.slug}`}
                className="build"
                card
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r169" style={{ borderRadius: "34px 0 34px 0" }}>
                  <Photo src={post.hero} alt={post.heroAlt} />
                </div>
                <span className="eyebrow" style={{ marginTop: 16, display: "block" }}>
                  {post.category} · {post.readingTime}
                </span>
                <h3 style={{ marginTop: 8 }}>{post.title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--gray-mid)", marginTop: 10 }}>
                  {post.summary}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Question we
                <br />
                have not answered?
              </>
            }
            ctaLabel="Ask The House"
            ctaHref={routes.contact}
          />
        </div>
      </section>

      <section style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <div className="wrap" />
      </section>
    </>
  );
}
