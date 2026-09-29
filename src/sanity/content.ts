import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import {
  hotspotPosition,
  imageUrl,
  naturalUrl,
  sanityImageNatural,
  sanityImageSet,
} from "./image";
import type { Frame } from "./frames";
import { services } from "@/content/services";
import { journalPosts, type PostSection } from "@/content/journal";
import { featuredBuilds, type BuildStage, type BuildType } from "@/content/builds";
import { homeHero } from "@/content/home";
import { site } from "@/lib/site";

/**
 * SITE CONTENT, READ SIDE
 *
 * Everything Stage 2 moved into the Studio: the homepage hero, the service
 * card photos, the journal and the featured builds.
 *
 * THE FALLBACK RULE. The code content files are used only when the Sanity
 * fetch throws or the project is not configured, so the build never fails
 * because the CMS is unreachable. If Sanity answers, its answer is final:
 * an article or build that is absent or unpublished there stays absent on
 * the site. Nothing is ever resurrected from code.
 *
 * THE IMAGE RULE. A photo resolves in this order: the image Liz uploaded,
 * then the legacyPath the migration recorded, then the current code file.
 * A migrated item therefore renders exactly the file it always did until
 * she uploads a replacement.
 *
 * Each read is wrapped in React cache, so a page that needs the same list
 * in several places asks Sanity once.
 */

/* Same contract as the service photos: production caches for an hour and
   the webhook revalidates on publish, development never caches. */
const fetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

type Result<T> = { ok: true; data: T } | { ok: false };

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<Result<T>> {
  if (!sanityClient) return { ok: false };
  try {
    return { ok: true, data: await sanityClient.fetch<T>(query, params, fetchOptions) };
  } catch {
    return { ok: false };
  }
}

/* ---------------------------------------------------------------- images */

type SanityImage = SanityImageSource & { asset?: { _ref?: string } };

interface SanityImageField {
  image?: SanityImage;
  alt?: string;
  legacyPath?: string;
}

/** A resolved photo. `sanity` is set only when Liz has uploaded one. */
export interface ImageRef {
  src: string;
  alt: string;
  sanity?: SanityImageSource;
}

function toImageRef(field: SanityImageField | null | undefined, codeSrc = "", codeAlt = ""): ImageRef {
  const alt = field?.alt?.trim() || codeAlt;
  if (field?.image?.asset?._ref) {
    return { src: field.legacyPath || codeSrc, alt, sanity: field.image };
  }
  if (field?.legacyPath) return { src: field.legacyPath, alt };
  return { src: codeSrc, alt };
}

/**
 * A photo ready for an img tag. `extra` is empty for a file in /public, so
 * the tag renders exactly as it always has: no srcset, no sizes, no style.
 * Spread it last, after the attributes the tag already had.
 */
export interface Framed {
  src: string;
  alt: string;
  extra: { srcSet?: string; sizes?: string; style?: { objectPosition: string } };
  fromSanity: boolean;
}

/** A photo cut to a fixed frame shape, such as a 4:5 card. */
export function framed(ref: ImageRef, frame: Frame): Framed {
  const set = ref.sanity ? sanityImageSet(ref.sanity, frame) : null;
  if (!set) return { src: ref.src, alt: ref.alt, extra: {}, fromSanity: false };
  return {
    src: set.src,
    alt: ref.alt,
    extra: { srcSet: set.srcSet, sizes: set.sizes },
    fromSanity: true,
  };
}

/** A full bleed photo, uncropped, positioned by the hotspot. */
export function framedNatural(
  ref: ImageRef,
  frame: { maxWidth: number; fallbackWidth: number; sizes: string },
): Framed {
  const set = ref.sanity ? sanityImageNatural(ref.sanity, frame) : null;
  if (!set || !ref.sanity) return { src: ref.src, alt: ref.alt, extra: {}, fromSanity: false };
  const position = hotspotPosition(ref.sanity);
  return {
    src: set.src,
    alt: ref.alt,
    extra: {
      srcSet: set.srcSet,
      sizes: set.sizes,
      ...(position ? { style: { objectPosition: position } } : {}),
    },
    fromSanity: true,
  };
}

/** Absolute URL for structured data. */
export function absoluteImage(ref: ImageRef): string {
  if (ref.sanity) {
    const url = naturalUrl(ref.sanity, 1600);
    if (url) return url;
  }
  return `${site.url}${ref.src}`;
}

/** Open Graph image. Relative for a local file, as it always was. */
export function ogImage(ref: ImageRef): string {
  if (ref.sanity) {
    const url = imageUrl(ref.sanity, 1200, 630);
    if (url) return url;
  }
  return ref.src;
}

/* -------------------------------------------------------------- homepage */

export interface HomeHeroContent {
  eyebrow?: string;
  subline?: string;
  ctaLabel?: string;
  image?: ImageRef;
}

interface HomepageDoc {
  eyebrow?: string;
  subline?: string;
  ctaLabel?: string;
  hero?: SanityImageField;
}

export const getHomeHero = cache(async (): Promise<HomeHeroContent> => {
  const result = await fetchSanity<HomepageDoc | null>(
    `*[_id == "homepage"][0]{eyebrow, subline, ctaLabel, hero}`,
  );

  if (!result.ok) {
    return {
      eyebrow: homeHero.eyebrow,
      subline: homeHero.subline,
      ctaLabel: homeHero.ctaLabel,
      image: { src: homeHero.image, alt: homeHero.imageAlt },
    };
  }

  /* Sanity answered. An absent document stays absent. */
  const doc = result.data;
  if (!doc) return {};
  return {
    eyebrow: doc.eyebrow,
    subline: doc.subline,
    ctaLabel: doc.ctaLabel,
    image: toImageRef(doc.hero, homeHero.image, homeHero.imageAlt),
  };
});

/* --------------------------------------------------------- service cards */

interface CardDoc {
  slug?: string;
  card?: { image?: SanityImage; alt?: string };
}

/**
 * The card photo for every service, keyed by slug. Used by every place that
 * shows a service card: the homepage, /services, the Related band, the
 * Houston carousel and service Open Graph images.
 *
 * An empty card slot is not an absence. It means keep the current photo,
 * which is the one in services.ts.
 */
export const getServiceCards = cache(async (): Promise<Map<string, ImageRef>> => {
  const result = await fetchSanity<CardDoc[]>(`*[_type == "servicePhotos"]{slug, card}`);
  const docs = result.ok ? result.data : [];
  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]));

  return new Map(
    services.map((service) => {
      const card = bySlug.get(service.slug)?.card;
      const ref: ImageRef = card?.image?.asset?._ref
        ? { src: service.image, alt: card.alt?.trim() || service.imageAlt, sanity: card.image }
        : { src: service.image, alt: service.imageAlt };
      return [service.slug, ref];
    }),
  );
});

/** Convenience: one service's card, falling back to its code photo. */
export function cardFor(cards: Map<string, ImageRef>, slug: string): ImageRef {
  const service = services.find((s) => s.slug === slug);
  return cards.get(slug) ?? { src: service?.image ?? "", alt: service?.imageAlt ?? "" };
}

/* --------------------------------------------------------------- journal */

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  published: string;
  updatedAt?: string;
  hero: ImageRef;
  intro: string[];
  sections: PostSection[];
  takeaway: string;
  related: string[];
  faqs: { question: string; answer: string }[];
}

interface ArticleDoc {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt?: string;
  hero?: SanityImageField;
  intro?: string[];
  sections?: { heading: string; body?: string[] }[];
  takeaway?: string;
  related?: string[];
  faqs?: { question: string; answer: string }[];
}

const ARTICLE_FIELDS = `
  "slug": slug.current, title, summary, category, readingTime, publishedAt, updatedAt,
  hero, intro, sections[]{heading, body}, takeaway, related, faqs[]{question, answer}
`;

function fromArticleDoc(doc: ArticleDoc): Article {
  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    category: doc.category,
    readingTime: doc.readingTime,
    published: doc.publishedAt,
    ...(doc.updatedAt ? { updatedAt: doc.updatedAt } : {}),
    hero: toImageRef(doc.hero),
    intro: doc.intro ?? [],
    sections: (doc.sections ?? []).map((s) => ({ heading: s.heading, body: s.body ?? [] })),
    takeaway: doc.takeaway ?? "",
    related: doc.related ?? [],
    faqs: doc.faqs ?? [],
  };
}

function fromCodePost(post: (typeof journalPosts)[number]): Article {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category,
    readingTime: post.readingTime,
    published: post.published,
    hero: { src: post.hero, alt: post.heroAlt },
    intro: post.intro,
    sections: post.sections,
    takeaway: post.takeaway,
    related: post.related,
    faqs: post.faqs,
  };
}

/** Every published article, newest first. The first one leads the journal. */
export const getArticles = cache(async (): Promise<Article[]> => {
  const result = await fetchSanity<ArticleDoc[]>(
    `*[_type == "article" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {${ARTICLE_FIELDS}}`,
  );
  return result.ok ? result.data.map(fromArticleDoc) : journalPosts.map(fromCodePost);
});

/** One article, or null when Sanity has no published article at that address. */
export const getArticle = cache(async (slug: string): Promise<Article | null> => {
  const result = await fetchSanity<ArticleDoc | null>(
    `*[_type == "article" && slug.current == $slug][0]{${ARTICLE_FIELDS}}`,
    { slug },
  );
  if (!result.ok) {
    const post = journalPosts.find((p) => p.slug === slug);
    return post ? fromCodePost(post) : null;
  }
  return result.data ? fromArticleDoc(result.data) : null;
});

/* ---------------------------------------------------------------- builds */

export interface Build {
  slug: string;
  title: string;
  vehicle: string;
  type: BuildType;
  summary: string;
  hero: ImageRef;
  tags: string[];
  brief: string[];
  stages: BuildStage[];
  outcome: string;
  gallery: ImageRef[];
}

interface BuildDoc {
  slug: string;
  title: string;
  vehicle: string;
  type: BuildType;
  summary: string;
  hero?: SanityImageField;
  tags?: string[];
  brief?: string[];
  stages?: BuildStage[];
  outcome?: string;
  gallery?: SanityImageField[];
}

const BUILD_FIELDS = `
  "slug": slug.current, title, vehicle, type, summary, hero, tags, brief,
  stages[]{discipline, slug, detail}, outcome, gallery
`;

function fromBuildDoc(doc: BuildDoc): Build {
  return {
    slug: doc.slug,
    title: doc.title,
    vehicle: doc.vehicle,
    type: doc.type,
    summary: doc.summary,
    hero: toImageRef(doc.hero),
    tags: doc.tags ?? [],
    brief: doc.brief ?? [],
    stages: doc.stages ?? [],
    outcome: doc.outcome ?? "",
    gallery: (doc.gallery ?? []).map((item) => toImageRef(item)),
  };
}

function fromCodeBuild(build: (typeof featuredBuilds)[number]): Build {
  const files =
    build.galleryFiles ?? [1, 2, 3, 4].map((n) => `/gallery-${build.galleryPrefix}-${n}.webp`);
  return {
    slug: build.slug,
    title: build.title,
    vehicle: build.vehicle,
    type: build.type,
    summary: build.summary,
    hero: { src: build.hero, alt: build.heroAlt },
    tags: build.tags,
    brief: build.brief,
    stages: build.stages,
    outcome: build.outcome,
    gallery: files.map((src) => ({ src, alt: `${build.vehicle}, ${build.title}` })),
  };
}

/** Every published build, in Liz's position order. */
export const getBuilds = cache(async (): Promise<Build[]> => {
  const result = await fetchSanity<BuildDoc[]>(
    `*[_type == "build" && defined(slug.current)] | order(order asc, _createdAt asc) {${BUILD_FIELDS}}`,
  );
  return result.ok ? result.data.map(fromBuildDoc) : featuredBuilds.map(fromCodeBuild);
});

/** One build, or null when Sanity has no published build at that address. */
export const getBuild = cache(async (slug: string): Promise<Build | null> => {
  const result = await fetchSanity<BuildDoc | null>(
    `*[_type == "build" && slug.current == $slug][0]{${BUILD_FIELDS}}`,
    { slug },
  );
  if (!result.ok) {
    const build = featuredBuilds.find((b) => b.slug === slug);
    return build ? fromCodeBuild(build) : null;
  }
  return result.data ? fromBuildDoc(result.data) : null;
});

/* --------------------------------------------------- static param slugs */

/**
 * Slugs for generateStaticParams. The code slugs are used only when the
 * fetch throws, never because Sanity returned fewer.
 */
export async function getArticleSlugs(): Promise<string[]> {
  const result = await fetchSanity<string[]>(`*[_type == "article" && defined(slug.current)].slug.current`);
  return result.ok ? result.data : journalPosts.map((p) => p.slug);
}

export async function getBuildSlugs(): Promise<string[]> {
  const result = await fetchSanity<string[]>(`*[_type == "build" && defined(slug.current)].slug.current`);
  return result.ok ? result.data : featuredBuilds.map((b) => b.slug);
}
