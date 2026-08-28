import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero, SecHead } from "@/components/ui/Page";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { journalPosts } from "@/content/journal";
import { routes, site } from "@/lib/site";

/**
 * JOURNAL
 *
 * REBUILT August 28 2026 to Liz's mock of August 14 2026.
 *
 * Her order:
 *   hero -> featured article, two column with the frame left -> "More
 *   Articles / From the journal", four card grid -> footer.
 *
 * Her mock shows five articles, one featured and four in the grid, which
 * is exactly what journalPosts holds. The first post leads and the rest
 * fill the grid, so publishing a sixth article changes nothing here.
 *
 * Removed to match her composition, logged in CLIENT_REVIEW_NOTES.md 27.3:
 *   - the "Start here" section head above the featured article. Her
 *     overline sits inside the right hand column instead
 *   - the CustomBand asking for questions, and the empty trailing section
 *     that followed it
 *   - reading time on the cards. Her card carries the category pill only
 *
 * Her titles are illustrative rather than real: "When Wrapping Is the
 * Wrong Call", "Two Questions That Expose a Cheap Blackout Quote". Those
 * are not our articles. The five real posts render in her layout instead,
 * since renaming published slugs to match a mock would break the URLs.
 */

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
        ctaLabel="Contact the House"
        ctaHref={routes.contact}
      />

      {/* Featured. Her two column block, frame left, no section head above. */}
      <section>
        <div className="wrap">
          <Reveal
            as={Link}
            href={`${routes.journal}/${lead.slug}`}
            className="featured-article"
            card
          >
            <div className="ph r1610">
              <Photo src={lead.hero} alt={lead.heroAlt} priority />
              <span className="pill">{lead.category}</span>
            </div>

            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="display" style={{ margin: "12px 0 14px" }}>
                {lead.title}
              </h2>
              <p className="lede">{lead.summary}</p>
              <span
                className="btn btn-line"
                style={{ marginTop: 22, borderRadius: "16px 0 16px 0" }}
              >
                Read Article
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Her four card grid. */}
      <section className="alt">
        <div className="wrap">
          <SecHead eyebrow="More Articles" title="From the journal" center />

          <div className="journal-grid">
            {rest.map((post, i) => (
              <Reveal
                key={post.slug}
                as={Link}
                href={`${routes.journal}/${post.slug}`}
                className="journal-card rv-card"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="ph r45">
                  <Photo src={post.hero} alt={post.heroAlt} />
                  <span className="pill">{post.category}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <span className="go">Read Article →</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
