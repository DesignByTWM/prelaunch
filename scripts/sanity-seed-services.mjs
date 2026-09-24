/**
 * SEED THE SERVICE PHOTO DOCUMENTS
 *
 *   node scripts/sanity-seed-services.mjs
 *
 * Creates one servicePhotos document per service, with the labels already
 * on the site pre-filled, so Liz opens the Studio to ten named services
 * rather than an empty list.
 *
 * Uses createIfNotExists, so it is safe to run more than once. A document
 * that already exists is left exactly as it is, and nothing Liz has done
 * is ever overwritten.
 *
 * Uploads no images. The photo slots start empty, which is what makes the
 * site fall back to the files already in /public.
 *
 * THE WRITE TOKEN
 * It is read from the environment here and nowhere else. This script is
 * never imported by the app, no route or component reads the token, and it
 * is never printed. Only whether it is present is reported.
 */

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

/* .env.local is not loaded automatically outside Next, so it is parsed
   here. Values are used, never logged. */
function loadEnvLocal() {
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, value] = match;
      if (!process.env[key]) {
        process.env[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* No .env.local. Fall through to whatever is already in the environment. */
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.",
  );
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Nothing was written.");
  process.exit(1);
}

/* services.ts is TypeScript, so the labels are read out of the source
   rather than imported. This script is the only consumer, and adding a
   TypeScript runtime for one read is not worth it. */
function readServices() {
  const src = readFileSync(
    new URL("../src/content/services.ts", import.meta.url),
    "utf8",
  );

  const marks = [];
  const slugRe = /^ {4}slug: "([a-z-]+)",/gm;
  let match;
  while ((match = slugRe.exec(src))) marks.push({ slug: match[1], at: match.index });

  const names = (block, key) => {
    const start = block.indexOf(`${key}: [`);
    if (start < 0) return [];
    const end = block.indexOf("\n    ],", start);
    return [...block.slice(start, end).matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
  };

  return marks.map((mark, i) => {
    const block = src.slice(mark.at, i + 1 < marks.length ? marks[i + 1].at : src.length);
    return {
      slug: mark.slug,
      name: (block.match(/^ {4}name: "([^"]+)",/m) ?? [])[1] ?? mark.slug,
      coverage: names(block, "coverage"),
      recentWork: names(block, "recentWork"),
    };
  });
}

const services = readServices();

if (services.length !== 10) {
  console.error(`Expected 10 services, found ${services.length}. Nothing was written.`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-24",
  token,
  useCdn: false,
});

const run = async () => {
  let created = 0;
  let skipped = 0;

  for (const service of services) {
    /* Hyphen, not a dot. A dotted id is a nested path to Sanity's
       permissions and falls outside a public dataset's default read grant,
       which would make it unreadable by the tokenless site client. */
    const id = `servicePhotos-${service.slug}`;

    const existing = await client.getDocument(id).catch(() => null);
    if (existing) {
      skipped += 1;
      console.log(`skipped  ${service.slug} (already exists)`);
      continue;
    }

    const doc = {
      _id: id,
      _type: "servicePhotos",
      serviceName: service.name,
      slug: service.slug,
      overview: {},
    };

    service.coverage.forEach((label, i) => {
      doc[`coverage${i + 1}`] = { label };
    });
    service.recentWork.forEach((label, i) => {
      doc[`reference${i + 1}`] = { label };
    });

    await client.createIfNotExists(doc);
    created += 1;
    console.log(`created  ${service.slug}`);
  }

  console.log("");
  console.log(`Created ${created}, skipped ${skipped}, of ${services.length} services.`);
};

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
