import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, CustomBand, FaqBlock, CrossSell } from "@/components/ui/Page";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { journalPosts, getPost } from "@/content/journal";
import { getService } from "@/content/services";
import { routes, site } from "@/lib/site";

/**
 * JOURNAL POST TEMPLATE
 *
 * Article body uses real <h2> elements per section rather than styled divs.
 * That heading structure is what lets an answer engine extract a specific
 * section as the answer to a specific question, which is the entire reason
 * these posts exist.
 *
 * Each post also emits its own FAQPage block, so a single article can be
 * cited both as long-form explanation and as a direct answer.
 */

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `${routes.journal}/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.published,
      images: [{ url: post.hero }],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: routes.journal },
            { name: post.title, path: `${routes.journal}/${post.slug}` },
          ]),
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            url: `${site.url}${routes.journal}/${post.slug}`,
            image: `${site.url}${post.hero}`,
            datePublished: post.published,
            dateModified: post.published,
            author: { "@id": `${site.url}/#organization` },
            publisher: { "@id": `${site.url}/#organization` },
            articleSection: post.category,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${site.url}${routes.journal}/${post.slug}`,
            },
          },
          faqSchema(post.faqs),
        ]}
      />

      <PageHero
        image={post.hero}
        imageAlt={post.heroAlt}
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Journal", href: routes.journal },
          { label: post.category },
        ]}
        title={post.title}
        intro={post.summary}
        ctaLabel="Read Below"
        ctaHref="#article"
      />

      {/* Article */}
      <section id="article">
        <div className="wrap">
          <article className="article">
            <Reveal className="article-meta">
              <span className="eyebrow">
                {post.category} · {post.readingTime} read
              </span>
            </Reveal>

            <Reveal className="article-intro">
              {post.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            {post.sections.map((section, i) => (
              <Reveal key={section.heading} className="article-section" delay={1}>
                <h2 className="display">{section.heading}</h2>
                {section.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </Reveal>
            ))}

            <Reveal className="article-takeaway">
              <span className="eyebrow">The short version</span>
              <p>{post.takeaway}</p>
            </Reveal>
          </article>
        </div>
      </section>

      {/* Post FAQ */}
      {post.faqs.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <SecHead eyebrow="Quick Answers" title={<>Asked<br />and answered.</>} />
            <FaqBlock faqs={post.faqs} />
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section>
          <div className="wrap">
            <SecHead
              eyebrow="Related Disciplines"
              title={<>The work<br />behind this.</>}
              lede="Everything covered here is performed in house at the Ammi Trail facility."
            />
            <CrossSell
              items={related.map((s) => ({
                slug: s.slug,
                name: s.name,
                cardLine: s.cardLine,
              }))}
            />
          </div>
        </section>
      )}

      <section className="alt" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Talk it through
                <br />
                with the house.
              </>
            }
            ctaLabel="Design Your Build"
            ctaHref={routes.designYourBuild}
          />
        </div>
      </section>

      {/* More reading */}
      <section className="alt">
        <div className="wrap">
          <SecHead eyebrow="More Reading" title={<>Keep going.</>} />
          <div className="index-grid">
            {more.map((other, i) => (
              <Reveal
                key={other.slug}
                as={Link}
                href={`${routes.journal}/${other.slug}`}
                className="cross"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="name">{other.category}</div>
                <div className="desc" style={{ fontSize: 13.5, color: "var(--black)", marginTop: 10 }}>
                  {other.title}
                </div>
                <span className="go">Read →</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
