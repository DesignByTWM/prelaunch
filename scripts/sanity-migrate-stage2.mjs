/**
 * STAGE 2 MIGRATION
 *
 *   npx tsx scripts/sanity-migrate-stage2.mjs
 *
 * Copies the homepage hero copy, the five journal articles and the six
 * featured builds from code into Sanity, verbatim.
 *
 * SAFE TO RUN AGAIN. createIfNotExists only. A document that already exists
 * is left exactly as it is: nothing is patched, replaced or deleted, so
 * anything Liz has edited is never overwritten.
 *
 * NO IMAGES ARE UPLOADED. Each photo gets a hidden legacyPath pointing at the
 * file already in /public, so the site keeps rendering exactly the same
 * photo until Liz uploads a replacement in the Studio.
 *
 * Ids are dotless (homepage, article-{slug}, build-{slug}). A dot would put
 * the document outside the public dataset's read grant and the site, which
 * reads with no token, could not see it.
 *
 * THE WRITE TOKEN is read from the environment here and nowhere else. It is
 * never printed and never imported by any app code.
 */

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { journalPosts } from "../src/content/journal.ts";
import { featuredBuilds } from "../src/content/builds.ts";
import { homeHero } from "../src/content/home.ts";

function loadEnvLocal() {
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, value] = match;
      if (!process.env[key]) process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  } catch {
    /* No .env.local. Fall through to whatever is already in the environment. */
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity project id, dataset or write token. Nothing was written.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-09-24", token, useCdn: false });

/** Stable keys, so the same run always produces the same document. */
const key = (prefix, i) => `${prefix}${i}`;

const homepageDoc = {
  _id: "homepage",
  _type: "homepage",
  eyebrow: homeHero.eyebrow,
  subline: homeHero.subline,
  ctaLabel: homeHero.ctaLabel,
  hero: { alt: homeHero.imageAlt, legacyPath: homeHero.image },
};

const articleDocs = journalPosts.map((post) => ({
  _id: `article-${post.slug}`,
  _type: "article",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  summary: post.summary,
  category: post.category,
  readingTime: post.readingTime,
  publishedAt: post.published,
  hero: { alt: post.heroAlt, legacyPath: post.hero },
  intro: post.intro,
  sections: post.sections.map((section, i) => ({
    _key: key("s", i),
    _type: "section",
    heading: section.heading,
    body: section.body,
  })),
  takeaway: post.takeaway,
  related: post.related,
  faqs: post.faqs.map((faq, i) => ({
    _key: key("f", i),
    _type: "faq",
    question: faq.question,
    answer: faq.answer,
  })),
}));

const buildDocs = featuredBuilds.map((build, index) => {
  const gallery =
    build.galleryFiles ?? [1, 2, 3, 4].map((n) => `/gallery-${build.galleryPrefix}-${n}.webp`);
  return {
    _id: `build-${build.slug}`,
    _type: "build",
    title: build.title,
    vehicle: build.vehicle,
    slug: { _type: "slug", current: build.slug },
    order: index + 1,
    type: build.type,
    summary: build.summary,
    hero: { alt: build.heroAlt, legacyPath: build.hero },
    tags: build.tags,
    brief: build.brief,
    stages: build.stages.map((stage, i) => ({
      _key: key("st", i),
      _type: "stage",
      discipline: stage.discipline,
      slug: stage.slug,
      detail: stage.detail,
    })),
    outcome: build.outcome,
    /* The same shared alt the gallery renders today, on every frame, so the
       page output is identical until Liz writes her own. */
    gallery: gallery.map((path, i) => ({
      _key: key("g", i),
      _type: "galleryPhoto",
      alt: `${build.vehicle}, ${build.title}`,
      legacyPath: path,
    })),
  };
});

const run = async () => {
  const all = [homepageDoc, ...articleDocs, ...buildDocs];
  let created = 0;
  let skipped = 0;

  for (const doc of all) {
    if (doc._id.includes(".")) throw new Error(`Dotted id refused: ${doc._id}`);

    const existing = await client.getDocument(doc._id).catch(() => null);
    if (existing) {
      skipped += 1;
      console.log(`skipped  ${doc._id}`);
      continue;
    }
    await client.createIfNotExists(doc);
    created += 1;
    console.log(`created  ${doc._id}`);
  }

  console.log("");
  console.log(`Created ${created}, skipped ${skipped}, of ${all.length} documents.`);
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
