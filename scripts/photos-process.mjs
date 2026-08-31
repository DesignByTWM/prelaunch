/**
 * PHOTO PROCESSOR
 *
 * Run:  node scripts/photos-process.mjs
 *       node scripts/photos-process.mjs --dry        report only, writes nothing
 *       node scripts/photos-process.mjs --only=hero.webp,svc-ppf.webp
 *
 * Reads scripts/photo-map.csv, and for every row that has a photo ID:
 *   crops to that slot's exact ratio, resizes to its export width,
 *   converts to webp and writes it into /public with the right filename.
 *
 * Cropping uses sharp's attention strategy, which finds the most visually
 * significant region rather than cutting from the centre. On vehicle
 * photography that means it follows the car. It is not perfect. Where it
 * gets one wrong, set an offset in the csv (see below) and rerun that
 * single slot.
 *
 * OFFSETS. Put a position after the ID in photo_id to override the
 * automatic crop, for example:  142 top   or   87 left
 * Valid: top, bottom, left, right, centre, attention (the default).
 *
 * Rerunning is always safe. Every output is written fresh from the
 * original source photo, so nothing degrades through repeated passes.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SLOTS, SOURCE_DIR, IMAGE_EXT } from "./photo-slots.mjs";

const ROOT = process.cwd();
const CSV = path.join(ROOT, "scripts", "photo-map.csv");
const PUBLIC = path.join(ROOT, "public");
const DRY = process.argv.includes("--dry");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.slice(7).split(",").map((s) => s.trim()) : null;

const POSITIONS = {
  top: sharp.gravity.north,
  bottom: sharp.gravity.south,
  left: sharp.gravity.west,
  right: sharp.gravity.east,
  centre: sharp.gravity.centre,
  center: sharp.gravity.centre,
  attention: sharp.strategy.attention,
};

/* ------------------------------------------------------------------ *
 * Index the source photos by ID, the same order the contact sheet used
 * ------------------------------------------------------------------ */

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (IMAGE_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

if (!fs.existsSync(CSV)) {
  console.error("\n  scripts/photo-map.csv not found.");
  console.error("  Run node scripts/photos-contact-sheet.mjs first.\n");
  process.exit(1);
}

const files = walk(SOURCE_DIR).sort();
const byId = new Map();
files.forEach((f, i) => byId.set(String(i + 1).padStart(3, "0"), f));

/* ------------------------------------------------------------------ *
 * Parse the map. Quoted fields may contain commas.
 * ------------------------------------------------------------------ */

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    if (c === '"') {
      if (quoted && line[i + 1] === '"') { cur += '"'; i += 1; }
      else quoted = !quoted;
    } else if (c === "," && !quoted) { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

const lines = fs.readFileSync(CSV, "utf8").split(/\r?\n/).filter(Boolean);
const header = parseCsvLine(lines[0]).map((h) => h.trim());
const iSlot = header.indexOf("slot");
const iId = header.indexOf("photo_id");

if (iSlot === -1 || iId === -1) {
  console.error("\n  photo-map.csv is missing a slot or photo_id column.\n");
  process.exit(1);
}

const slotByFile = new Map(SLOTS.map((s) => [s.file, s]));

const queued = [];
const problems = [];

for (const line of lines.slice(1)) {
  const cells = parseCsvLine(line);
  const file = (cells[iSlot] || "").trim();
  const raw = (cells[iId] || "").trim();
  if (!file || !raw) continue;
  if (ONLY && !ONLY.includes(file)) continue;

  const slot = slotByFile.get(file);
  if (!slot) { problems.push(`${file}: not a known slot, check the spelling`); continue; }

  const [idPart, posPart] = raw.split(/\s+/);
  const id = idPart.padStart(3, "0");
  const source = byId.get(id);
  if (!source) { problems.push(`${file}: photo ID ${idPart} does not exist`); continue; }

  let position = sharp.strategy.attention;
  if (posPart) {
    const key = posPart.toLowerCase();
    if (!(key in POSITIONS)) { problems.push(`${file}: unknown position "${posPart}"`); continue; }
    position = POSITIONS[key];
  }

  queued.push({ slot, source, id, position, posLabel: posPart || "auto" });
}

if (problems.length) {
  console.log(`\n  ${problems.length} PROBLEMS, these rows were skipped:\n`);
  for (const p of problems) console.log(`    !!  ${p}`);
}

if (!queued.length) {
  console.log("\n  Nothing to process. Add photo IDs to scripts/photo-map.csv.\n");
  process.exit(0);
}

/* ------------------------------------------------------------------ *
 * Process
 * ------------------------------------------------------------------ */

console.log(`\n${DRY ? "DRY RUN, nothing written" : "PROCESSING"}  ${queued.length} images\n`);

let done = 0;
let warned = 0;

for (const job of queued) {
  const { slot, source, id, posLabel } = job;
  const height = Math.round(slot.width / slot.ratio);

  try {
    const meta = await sharp(source).metadata();

    /* A source narrower than the export width means upscaling, which on a
       luxury site shows. Warn rather than refuse, since it is sometimes
       the only shot available. */
    let note = "";
    if (meta.width < slot.width) {
      note = `  UPSCALED from ${meta.width}px`;
      warned += 1;
    }

    if (!DRY) {
      await sharp(source)
        .rotate()
        .resize(slot.width, height, { fit: "cover", position: job.position })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(PUBLIC, slot.file));
    }

    const kb = DRY ? "" : ` ${Math.round(fs.statSync(path.join(PUBLIC, slot.file)).size / 1024)}kb`;
    console.log(`  ok  ${slot.file.padEnd(30)} <- ${id} ${posLabel.padEnd(10)} ${slot.width}x${height}${kb}${note}`);
    done += 1;
  } catch (err) {
    console.log(`  !!  ${slot.file.padEnd(30)} FAILED: ${err.message}`);
  }
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

const filled = new Set(queued.map((j) => j.slot.file));
const remaining = SLOTS.filter((s) => !filled.has(s.file) && !fs.existsSync(path.join(PUBLIC, s.file)));
const byPhase = { 1: 0, 2: 0, 3: 0 };
for (const s of remaining) byPhase[s.phase] += 1;

console.log(`
  ${done} written${warned ? `, ${warned} upscaled from a source smaller than the target` : ""}

  Still empty:  ${byPhase[1]} of phase 1,  ${byPhase[2]} of phase 2

  Those slots stay flat charcoal placeholders, which is deliberate and
  looks intentional. Nothing is broken by leaving them.

  If a crop cut the vehicle badly, put a position after the ID in the csv
  and rerun just that one:

      node scripts/photos-process.mjs --only=${queued[0]?.slot.file ?? "hero.webp"}

  Then check the pages:

      npm run build
      npx kill-port 3000 3005
      npm run dev
`);
