/**
 * CONTACT SHEET BUILDER
 *
 * Run:  node scripts/photos-contact-sheet.mjs
 *
 * Reads every photo in Liz's Dropbox folder, writes a small thumbnail for
 * each, and builds one scrollable HTML page showing all of them grouped by
 * folder with an ID under each.
 *
 * Also writes photo-map.csv, prefilled with every slot the site has, the
 * folder it should draw from and the crop it needs. You put photo IDs in
 * the second column. That is the only manual step in the whole process.
 *
 * Nothing here touches the project. It only reads the source photos and
 * writes into scripts/contact-sheet/.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SLOTS, SOURCE_DIR, IMAGE_EXT } from "./photo-slots.mjs";

const OUT = path.join(process.cwd(), "scripts", "contact-sheet");
const THUMBS = path.join(OUT, "thumbs");
const CSV = path.join(process.cwd(), "scripts", "photo-map.csv");

/**
 * --csv-only rebuilds the mapping file without regenerating 211
 * thumbnails, for when the slot list changes but the photos have not.
 * It overwrites photo-map.csv, so any IDs already filled in are lost.
 */
const CSV_ONLY = process.argv.includes("--csv-only");

fs.mkdirSync(THUMBS, { recursive: true });

/* ------------------------------------------------------------------ *
 * Collect every photo, grouped by its folder
 * ------------------------------------------------------------------ */

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (IMAGE_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

function writeCsv() {
  const rows = [
    "order,where_it_appears,slot,photo_id,phase,crop,export_width,source_folder,notes",
    ...SLOTS.map((s, i) => {
      const ratio =
        Math.abs(s.ratio - 1) < 0.01 ? "1:1"
        : Math.abs(s.ratio - 16 / 9) < 0.01 ? "16:9"
        : Math.abs(s.ratio - 4 / 5) < 0.01 ? "4:5"
        : Math.abs(s.ratio - 4 / 3) < 0.01 ? "4:3"
        : `${s.ratio.toFixed(2)}:1`;
      const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      return [
        String(i + 1).padStart(3, "0"),
        q(s.page),
        s.file,
        "",
        s.phase,
        ratio,
        s.width,
        q(s.folder),
        q(s.note),
      ].join(",");
    }),
  ];
  fs.writeFileSync(CSV, rows.join("\n"), "utf8");
}

if (CSV_ONLY) {
  writeCsv();
  console.log(`\n  Rebuilt scripts/photo-map.csv with ${SLOTS.length} slots.`);
  console.log("  Thumbnails untouched, photo IDs are unchanged.\n");
  process.exit(0);
}

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`\n  Source folder not found:\n  ${SOURCE_DIR}\n`);
  console.error("  Fix SOURCE_DIR in scripts/photo-slots.mjs and run again.\n");
  process.exit(1);
}

const files = walk(SOURCE_DIR).sort();
console.log(`\n  Found ${files.length} photos. Building thumbnails.\n`);

const groups = new Map();

let n = 0;
for (const file of files) {
  n += 1;
  const id = String(n).padStart(3, "0");
  const folder = path.relative(SOURCE_DIR, path.dirname(file)) || "root";
  const thumbName = `${id}.webp`;

  try {
    const meta = await sharp(file).metadata();
    await sharp(file)
      .rotate()
      .resize(420, 420, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(path.join(THUMBS, thumbName));

    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push({
      id,
      thumbName,
      name: path.basename(file),
      abs: file,
      w: meta.width,
      h: meta.height,
      orientation: meta.width >= meta.height ? "landscape" : "portrait",
    });

    if (n % 25 === 0) console.log(`    ${n} of ${files.length}`);
  } catch (err) {
    console.warn(`    SKIPPED ${path.basename(file)}: ${err.message}`);
  }
}

/* ------------------------------------------------------------------ *
 * The index page
 * ------------------------------------------------------------------ */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sections = [...groups.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([folder, items]) => `
    <section>
      <h2>${esc(folder)} <em>${items.length}</em></h2>
      <div class="grid">
        ${items.map((it) => `
          <figure>
            <img src="thumbs/${it.thumbName}" alt="${esc(it.name)}" loading="lazy">
            <figcaption>
              <b>${it.id}</b>
              <span>${it.w}&times;${it.h} ${it.orientation}</span>
              <small>${esc(it.name)}</small>
            </figcaption>
          </figure>`).join("")}
      </div>
    </section>`)
  .join("");

const html = `<!doctype html>
<meta charset="utf-8">
<title>DESIGNBYTWM photo contact sheet</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:28px; background:#141414; color:#eee;
         font:14px/1.5 system-ui, sans-serif; }
  h1 { font-size:20px; margin:0 0 6px; letter-spacing:.04em; text-transform:uppercase; }
  .lede { color:#9a9a9a; margin:0 0 32px; max-width:70ch; }
  h2 { font-size:13px; text-transform:uppercase; letter-spacing:.1em; color:#00a19b;
       margin:38px 0 14px; border-bottom:1px solid #2a2a2a; padding-bottom:8px; }
  h2 em { color:#6e6e6e; font-style:normal; font-size:11px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:14px; }
  figure { margin:0; background:#1c1c1c; border:1px solid #2a2a2a; }
  figure img { display:block; width:100%; height:150px; object-fit:cover; }
  figcaption { padding:8px 10px; display:grid; gap:2px; }
  figcaption b { font-size:15px; color:#00a19b; letter-spacing:.06em; }
  figcaption span { font-size:10px; color:#8a8a8a; text-transform:uppercase; letter-spacing:.06em; }
  figcaption small { font-size:10px; color:#6e6e6e; word-break:break-all; }
  .sticky { position:sticky; top:0; background:#141414; padding:10px 0 14px; z-index:2;
            border-bottom:1px solid #2a2a2a; margin-bottom:10px; }
  input { width:100%; max-width:340px; padding:10px 13px; background:#1c1c1c;
          border:1px solid #333; color:#eee; font:14px system-ui; }
</style>

<h1>Photo contact sheet</h1>
<p class="lede">
  ${files.length} photos. The teal number under each is its ID. Put those IDs
  into the second column of <b>scripts/photo-map.csv</b>, then run
  <b>node scripts/photos-process.mjs</b>. Click any thumbnail to open the
  full size original.
</p>

<div class="sticky">
  <input id="q" type="search" placeholder="Filter by filename or folder">
</div>

${sections}

<script>
  const q = document.getElementById('q');
  q.addEventListener('input', () => {
    const t = q.value.trim().toLowerCase();
    document.querySelectorAll('section').forEach(sec => {
      const folder = sec.querySelector('h2').textContent.toLowerCase();
      let visible = 0;
      sec.querySelectorAll('figure').forEach(f => {
        const hit = t === '' || folder.includes(t) ||
                    f.textContent.toLowerCase().includes(t);
        f.style.display = hit ? '' : 'none';
        if (hit) visible++;
      });
      sec.style.display = visible ? '' : 'none';
    });
  });
</script>
`;

fs.writeFileSync(path.join(OUT, "index.html"), html, "utf8");

/* ------------------------------------------------------------------ *
 * The mapping file
 * ------------------------------------------------------------------ */

if (fs.existsSync(CSV)) {
  console.log("\n  photo-map.csv already exists, leaving it alone.");
  console.log("  Delete it first, or use --csv-only, if you want a fresh one.\n");
} else {
  writeCsv();
  console.log(`\n  Wrote scripts/photo-map.csv with ${SLOTS.length} slots.`);
}

console.log(`
  DONE

  1. Open  scripts/contact-sheet/index.html  in your browser
  2. Open  scripts/photo-map.csv  in Excel
  3. Put a photo ID in the photo_id column for each slot you want filled
  4. Leave a row blank to skip it, the slot stays a charcoal placeholder
  5. Run  node scripts/photos-process.mjs

  Start with the 21 rows marked phase 1. Those are the homepage and the
  ten discipline cards, and five of them are broken links today.
`);
