/**
 * MIGRATE servicePhotos.{slug} TO servicePhotos-{slug}
 *
 *   node scripts/sanity-migrate-ids.mjs
 *
 * WHY THIS EXISTS
 * The documents were first created with a dot in the id. Sanity treats a
 * dot as a path separator in permissions, and a public dataset's default
 * read grant is `_id in path("*")`, which matches a single segment only.
 * That is what keeps drafts private, since their ids start `drafts.`.
 *
 * The effect was that every servicePhotos document, although published in a
 * public dataset, was unreadable by a client with no token. The site's read
 * client has no token on purpose, so it received null and every photo slot
 * fell back to the file in /public. Nothing looked broken in the Studio.
 *
 * This copies each document to a flat, dotless id, keeping every field,
 * including any photo, crop, hotspot, alt text and label already published,
 * then deletes the old one. Safe to run more than once. A document already
 * at the new id is left alone.
 *
 * The write token is read from the environment and never printed.
 */

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-24",
  token,
  useCdn: false,
});

const run = async () => {
  const old = await client.fetch(`*[_type == "servicePhotos" && _id match "servicePhotos.*"]`);
  const dotted = old.filter((doc) => doc._id.includes("."));

  if (dotted.length === 0) {
    console.log("Nothing to migrate. No dotted ids found.");
    return;
  }

  let moved = 0;
  let skipped = 0;

  for (const doc of dotted) {
    const slug = doc._id.replace(/^servicePhotos\./, "");
    const nextId = `servicePhotos-${slug}`;

    const existing = await client.getDocument(nextId).catch(() => null);
    if (existing) {
      skipped += 1;
      console.log(`skipped  ${slug} (${nextId} already exists)`);
      continue;
    }

    /* Everything except the fields Sanity owns. */
    const { _id, _rev, _createdAt, _updatedAt, ...content } = doc;
    void _id;
    void _rev;
    void _createdAt;
    void _updatedAt;

    await client.createIfNotExists({ ...content, _id: nextId });
    await client.delete(doc._id);

    const carried = Object.keys(content).filter(
      (key) => content[key] && typeof content[key] === "object" && content[key].image,
    );
    moved += 1;
    console.log(
      `moved    ${slug} -> ${nextId}${carried.length ? ` (photos kept: ${carried.join(", ")})` : ""}`,
    );
  }

  console.log("");
  console.log(`Moved ${moved}, skipped ${skipped}, of ${dotted.length} dotted documents.`);
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
