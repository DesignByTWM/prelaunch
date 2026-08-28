# IMAGE PREPARATION LIST
### Design By TWM · every photo slot, with real pixel dimensions
**Rebuilt 28 August 2026 from the actual CSS grid values, not estimates.**

Source: `...\PHOTOS FROM DROPBOX BY LIZ - DBTWM`
Destination: `dbtwm_website\public\`

---

## READ THIS FIRST, TWO CORRECTIONS

**1. Inner page heroes need no photograph at all.** Every inner hero is flat charcoal now, per your instruction of 21 August. The photo frame is suppressed in CSS. So there is no hero image for any service page, the FAQ, contact, the house, or any explore page. The homepage hero is the only hero photo on the site.

**2. The "tall" reference frame is not tall.** I told you `ref-1` was a 2:3 vertical. It is not. Measured against the real grid it renders at **666 × 428**, which is landscape. Ignore what I said before. Only `ref-4` is unusual, and it is a very wide letterbox band.

---

## HOW TO EXPORT

| Setting | Value |
|---|---|
| Format | `.webp`, quality 80 to 85 |
| Colour | sRGB |
| Weight | under 250 KB, under 400 KB for the homepage hero |
| Naming | exactly as listed, lowercase, hyphens |

The **Export** column is already 2x for retina. Do not double it again. The **Renders at** column is what the visitor actually sees, given here so you can judge how much detail survives.

---

## 1 · HOMEPAGE

| # | Section / label | Filename | Ratio | Renders at | Export |
|---|---|---|---|---|---|
| 1 | Hero, full bleed | `hero.webp` | 16:9 | full width × 780 | **2400 × 1350** |
| 2 | Materials of the house, frame 1 | `mat-metal.webp` | 1:1 | 373 × 373 | **760 × 760** |
| 3 | Materials, frame 2 | `mat-stitch.webp` | 1:1 | 373 × 373 | **760 × 760** |
| 4 | Materials, frame 3 | `mat-fitment.webp` | 1:1 | 373 × 373 | **760 × 760** |
| 5 | Featured builds, card 1 | `build-suv.webp` | 16:9 | 369 × 208 | **760 × 428** |
| 6 | Featured builds, card 2 | `build-sedan.webp` | 16:9 | 369 × 208 | **760 × 428** |
| 7 | Featured builds, card 3 | `build-truck.webp` | 16:9 | 369 × 208 | **760 × 428** |
| 8 | Shop wheels, card 1 | `wheel-1.webp` | 1:1 | 275 × 275 | **560 × 560** |
| 9 | Shop wheels, card 2 | `wheel-2.webp` | 1:1 | 275 × 275 | **560 × 560** |
| 10 | Shop wheels, card 3 | `wheel-3.webp` | 1:1 | 275 × 275 | **560 × 560** |
| 11 | Shop wheels, card 4 | `wheel-4.webp` | 1:1 | 275 × 275 | **560 × 560** |

The wheel cards sit on a white frame, so cut-out or clean-background wheel shots read best here.

**Hero composition note.** The headline and monogram sit bottom left over a dark scrim covering the lower 82 percent. Keep the left third of the frame quiet.

---

## 2 · SERVICE CARDS · used in three places

These ten do the most work on the site. Each appears on the homepage grid, the `/services` index, and as a Related card on other service pages.

**Five already exist and need replacing. Five do not exist at all and are currently broken links.**

| # | Discipline | Filename | Status | Ratio | Export |
|---|---|---|---|---|---|
| 12 | Blackout Packages | `svc-blackout.webp` | replace | 4:5 | **760 × 950** |
| 13 | Paint Protection Film | `svc-ppf.webp` | replace | 4:5 | **760 × 950** |
| 14 | Vehicle Wraps | `svc-wraps.webp` | replace | 4:5 | **760 × 950** |
| 15 | Wheels & Fitment | `svc-wheels.webp` | replace | 4:5 | **760 × 950** |
| 16 | Interior Transformation | `svc-interior.webp` | replace | 4:5 | **760 × 950** |
| 17 | Suspension | `svc-suspension.webp` | **MISSING** | 4:5 | **760 × 950** |
| 18 | Paint & Body | `svc-paint-body.webp` | **MISSING** | 4:5 | **760 × 950** |
| 19 | Lighting | `svc-lighting.webp` | **MISSING** | 4:5 | **760 × 950** |
| 20 | Audio | `svc-audio.webp` | **MISSING** | 4:5 | **760 × 950** |
| 21 | Truck Accessories | `svc-truck-accessories.webp` | **MISSING** | 4:5 | **760 × 950** |

Renders at 216 × 270 on the homepage and 371 × 464 on the services index, so 760 × 950 covers both.

---

## 3 · SERVICE PAGES · 9 slots each, 90 total

Identical structure on all ten pages. Only the prefix changes.

| Section / label | Filename | Ratio | Renders at | Export |
|---|---|---|---|---|
| Overview, right frame | `{prefix}-overview.webp` | 4:3 | 549 × 412 | **1100 × 825** |
| Coverage card 1 | `{prefix}-cov-1.webp` | 4:5 | 275 × 344 | **560 × 700** |
| Coverage card 2 | `{prefix}-cov-2.webp` | 4:5 | 275 × 344 | **560 × 700** |
| Coverage card 3 | `{prefix}-cov-3.webp` | 4:5 | 275 × 344 | **560 × 700** |
| Coverage card 4 | `{prefix}-cov-4.webp` | 4:5 | 275 × 344 | **560 × 700** |
| Reference, large left | `{prefix}-ref-1.webp` | ~1.55:1 | 666 × 428 | **1340 × 860** |
| Reference, small upper right | `{prefix}-ref-2.webp` | ~2.3:1 | 476 × 205 | **960 × 410** |
| Reference, small lower right | `{prefix}-ref-3.webp` | ~2.3:1 | 476 × 205 | **960 × 410** |
| Reference, wide band | `{prefix}-ref-4.webp` | **~4.8:1** | 1160 × 240 | **2320 × 480** |

`ref-4` is a letterbox slot. A wide detail crop works, a whole car does not.

**The ten prefixes and their coverage subjects:**

| Page | Prefix | Dropbox folder | Coverage 1 to 4 |
|---|---|---|---|
| Blackout Packages | `blackout` | 04 Blackout & Chrome Delete | Full blackout · Trim and badge · Chrome delete · Wheel and caliper |
| Paint Protection Film | `ppf` | 02 Paint Protection Film PPF | Full front · Track package · Full vehicle · High-touch panels |
| Vehicle Wraps | `wraps` | 01 Vehicle Wraps | Full wrap · Partial and accent · Colour change · Chrome delete and trim |
| Wheels & Fitment | `wheels` | 05 Wheels & Tires | Forged · Cast and monoblock · Wheels plus suspension · Fitment consult |
| Interior Transformation | `interior` | 03 Custom Interiors | Seat retrim · Full cabin · Trim and stitching · Custom console |
| Suspension | `suspension` | 08 Suspension | Air · Coilover · Lowering springs · Tune and alignment |
| Paint & Body | `paintbody` | 06 Paint & Body | Correction · Full respray · Bodywork · Colour match |
| Lighting | `lighting` | **NO FOLDER SUPPLIED** | Headlight retrofit · Taillight · Ambient and accent · Full package |
| Audio | `audio` | 07 Audio | Sound system · Custom subwoofer · Full build · Tuning |
| Truck Accessories | `truck` | 09 Truck Accessories | Bed accessories · Lift kits · Racks and overland · Bumpers and armor |

**No images needed for:** the hero (charcoal), the process band (black metal texture), the packages band, the FAQ, or the Related cards. Related reuses the `svc-` card images from section 2.

---

## 4 · FEATURED BUILDS

Six builds. Source: the `Featured Builds` folder.

| Section / label | Filename | Ratio | Renders at | Export |
|---|---|---|---|---|
| List row photo, one per build | `fb-{name}-hero.webp` | 16:9 | 594 × 334 | **1200 × 675** |
| Detail page gallery, 4 per build | `fb-{name}-1.webp` … `-4.webp` | 3:2 | up to 720 wide | **1440 × 960** |

Names: `gclass`, `m5`, `f150`, and the three remaining builds once Liz confirms them.

Roughly **30 images** across the six.

---

## TOTALS

| Section | Count |
|---|---|
| Homepage | 11 |
| Service cards | 10 |
| Service pages | 90 |
| Featured builds | ~30 |
| **Total** | **~141** |

---

## THREE THINGS FOR LIZ

1. **No Lighting folder.** That page needs nine images plus a card. Zero source supplied.
2. **Five service cards were never supplied** and are broken links today: Suspension, Paint & Body, Lighting, Audio, Truck Accessories.
3. **The `ref-4` letterbox band** at roughly 4.8:1 is an unusual crop. If nothing in a folder suits it, that slot can be dropped and the mosaic rebalanced to three frames.

---

## ORDER OF WORK

1. **Homepage 11 plus the 10 service cards = 21 files.** Highest impact, and it fixes five broken images.
2. **Blackout, PPF, Wraps, Wheels, Interiors.** 45 files. The five pages Liz reviews first.
3. **Featured builds.** ~30 files.
4. **Suspension, Paint & Body, Audio, Truck.** 36 files.
5. **Lighting**, once the folder arrives.

Stopping after step 1 still leaves a site that looks deliberate. Placeholder frames are flat charcoal, not broken boxes.
