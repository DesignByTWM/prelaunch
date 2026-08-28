/**
 * APPLY LIZ'S FINAL COPY REVISIONS  ·  27 August 2026
 *
 * Sources:
 *   2026-08-28 SENT BY LIZ - DBTWM Site Wide copy FINAL revision.xlsx  (66 rows)
 *   2026-08-28 SENT BY LIZ - DBTWM FAQ FINAL.xlsx                      (69 FAQs, 5 removed)
 *
 * Run from the project root:   node scripts/apply-liz-2026-08-28.mjs
 * Dry run (writes nothing):    node scripts/apply-liz-2026-08-28.mjs --dry
 *
 * The script never guesses. Every replacement is an exact string match.
 * Anything it cannot find is reported at the end under MISS and left
 * untouched, so a silent partial application is impossible.
 *
 * Punctuation applied on import, per the project copy law:
 *   no em dashes, no Oxford commas, no comma before "and".
 * Her wording is otherwise verbatim.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");
const SERVICES = path.join(ROOT, "src", "content", "services.ts");
const FAQS = path.join(ROOT, "src", "content", "faqs.ts");

const missed = [];
const applied = [];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const q = (s) => JSON.stringify(s);

/** Isolate one service object inside services.ts by its slug. */
function sliceService(src, slug) {
  const start = src.indexOf(`slug: "${slug}"`);
  if (start === -1) return null;
  let end = src.indexOf('\n    slug: "', start + 10);
  if (end === -1) end = src.indexOf("\n];", start);
  return { start, end };
}

/**
 * Replace a run of consecutive quoted strings inside a scoped block.
 * Indentation agnostic: items are matched with `,\s*` between them.
 */
function replaceSeq(src, scope, from, to, label) {
  const block = src.slice(scope.start, scope.end);
  const pattern = new RegExp(from.map((s) => `"${esc(s)}"`).join(",\\s*"));
  const m = block.match(pattern);
  if (!m) {
    missed.push(label);
    return src;
  }
  const indentMatch = block.slice(0, m.index).match(/\n([ \t]*)$/);
  const indent = indentMatch ? indentMatch[1] : "          ";
  const replacement = to.map((s) => q(s)).join(`,\n${indent}`);
  const patched = block.replace(pattern, replacement);
  applied.push(label);
  return src.slice(0, scope.start) + patched + src.slice(scope.end);
}

/** Replace an exact substring anywhere in a file. */
function replaceRaw(src, from, to, label) {
  if (!src.includes(from)) {
    missed.push(label);
    return src;
  }
  applied.push(label);
  return src.split(from).join(to);
}

/* ------------------------------------------------------------------ *
 * 1. SERVICES  ·  per-discipline copy
 *
 * Bullets her sheet deletes globally (Priority scheduling) or replaces
 * globally (Dedicated project lead) are handled in step 2, so they are
 * deliberately absent from these sequences.
 * ------------------------------------------------------------------ */

let svc = fs.readFileSync(SERVICES, "utf8");

const SERVICE_EDITS = [
  ["blackout-packages", [
    ["r15 badges", ["2-Year Warranty", "Premium Vinyl & Coatings", "Installed In-House"],
      ["Precision-Cut Film", "Specialist Coatings", "Finished In-House"]],
    ["r16 pkg1", ["Design consultation", "Premium vinyl", "2-year warranty"],
      ["Design consultation", "Premium cast vinyl", "Trim, badging and grille"]],
    ["r17 pkg2", ["Full surface prep", "Chrome delete included", "2-year warranty"],
      ["Full surface preparation", "Chrome delete throughout the exterior", "Finish matched panel to panel"]],
    ["r18 pkg3", ["Everything in Full Blackout", "Wheel & caliper blackout"],
      ["Everything in Full Blackout", "Wheel and caliper finishing"]],
    ["r19 meta", ["Blackout packages in Houston. Chrome delete, badging, grille, trim and accent work in gloss, satin or matte, finished in house on a single vehicle timeline."],
      ["Blackout packages in Houston. Chrome delete, badging, grille, trim and accent work in gloss, satin or matte, specified and finished in house."]],
  ]],

  ["paint-protection-film", [
    ["r20 badges", ["10-Year Film Warranty", "Self-Healing Film", "Installed In-House"],
      ["Self-Healing Film", "Patterned In-House", "Specialist Installation"]],
    ["r21 overview", ["The best PPF install is invisible. No silvering at the edges, no visible seams, no compromise on the paint underneath. Every panel is measured and cut in-house, then installed under controlled shop conditions."],
      ["A PPF install should disappear into the car. Edges are wrapped where the panel allows, seams are placed with intent, and every panel is measured and cut in-house before it goes on under controlled shop conditions."]],
    ["r22 pkg1", ["Bumper, hood & fenders", "Self-healing film", "10-year warranty"],
      ["Bumper, hood and fenders", "Self-healing film", "Edges wrapped where the panel allows"]],
    ["r23 pkg2", ["Every exterior panel", "Self-healing film", "10-year warranty"],
      ["Every exterior panel", "Self-healing film", "Patterned and cut in-house"]],
    ["r24 pkg3", ["Everything in Full Vehicle", "Ceramic coating added"],
      ["Everything in Full Vehicle", "Ceramic coating over film"]],
    ["r26 meta", ["Paint protection film in Houston. Self healing PPF in partial, track and full body coverage, cut and installed in house with wrapped edges and no visible seams."],
      ["Paint protection film in Houston. Self-healing film in partial, track and full-body coverage, patterned and cut in house with wrapped edges."]],
  ]],

  ["vehicle-wraps", [
    ["r27 badges", ["5-Year Warranty", "Premium Cast Vinyl", "Installed In-House"],
      ["Premium Cast Vinyl", "Designed In-House", "Specialist Installation"]],
    ["r28 pkg1", ["Design consultation", "Premium cast vinyl", "2-year warranty"],
      ["Design consultation", "Premium cast vinyl", "Roof, hood or accent panels"]],
    ["r29 pkg2", ["Full surface prep", "Complete color change", "5-year warranty"],
      ["Full surface preparation", "Complete color change", "Finish reviewed panel by panel"]],
    ["r30 pkg3", ["Everything in Full Wrap", "Custom color matching"],
      ["Everything in Full Wrap", "Bespoke color and print work"]],
    ["r31 meta", ["Vehicle wraps in Houston. Full color change, partial wraps, roof and hood treatments and commercial fleet graphics, installed in house with panels disassembled."],
      ["Vehicle wraps in Houston. Full color change, partial wraps and roof and hood treatments in premium cast vinyl, designed and installed in house."]],
  ]],

  ["wheels-and-fitment", [
    ["r32 badges", ["Fitment Guarantee", "In-House Mounting & Balancing", "Installed In-House"],
      ["Measured Fitment", "Mounted & Balanced In-House", "Forged & Monoblock"]],
    ["r33 overview", ["Offset, width and tire profile are calculated for your exact vehicle before anything is ordered, not eyeballed. Every wheel is mounted, balanced and torqued in-house, then re-checked before delivery."],
      ["Offset, width and tire profile are calculated for your exact vehicle before anything is ordered, not eyeballed. Every wheel is mounted, balanced and torqued in-house, then re-checked before the vehicle leaves."]],
    ["r34 pkg1", ["Fitment calculation", "In-house mounting & balancing", "1-year warranty"],
      ["Fitment measured for your vehicle", "Mounted and balanced in-house", "Wheel and tire package"]],
    ["r35 pkg2", ["Fitment guarantee", "In-house mounting & balancing", "1-year warranty"],
      ["Fitment measured and re-checked", "Mounted and balanced in-house", "Stance planned with you"]],
    ["r36 pkg3", ["Everything in Wheels + Fitment", "Suspension setup included"],
      ["Everything in Wheels + Fitment", "Suspension set up to match"]],
    ["r37 meta", ["Custom wheels and fitment in Houston. Forged and flow formed wheels, offset and stance planning, tire pairing, TPMS and road force balancing, all done in house."],
      ["Custom wheels and fitment in Houston. Forged and flow-formed wheels, offset and stance planning, tire pairing, TPMS and road force balancing, all done in house."]],
  ]],

  ["interior-transformation", [
    ["r38 badges", ["2-Year Warranty", "Premium Materials", "Installed In-House"],
      ["Fine Leathers & Textiles", "Bespoke Patterning", "Trimmed In-House"]],
    ["r39 pkg1", ["Design consultation", "Premium materials", "2-year warranty"],
      ["Design consultation", "Fine leathers and textiles", "Seat retrim"]],
    ["r40 pkg2", ["Seats, door panels & headliner", "Premium materials", "2-year warranty"],
      ["Seats, door panels and headliner", "Fine leathers and textiles", "Pattern and stitching designed with you"]],
    ["r41 pkg3", ["Everything in Full Cabin", "Custom console & trim work"],
      ["Everything in Full Cabin", "Bespoke console and trim work"]],
    ["r42 meta", ["Custom automotive interiors in Houston. Full leather and Alcantara retrims, custom stitching, suede headliners, steering wheels and ambient lighting, built in house."],
      ["Custom automotive interiors in Houston. Full leather and technical textile retrims, bespoke stitching, suede headliners and bespoke console work, built in house."]],
  ]],

  ["suspension", [
    ["r43 badges", ["2-Year Warranty", "In-House Tuning", "Installed In-House"],
      ["Air & Coilover Programs", "Tuned In-House", "Matched To Your Wheels"]],
    ["r44 pkg1", ["Design consultation", "Alignment included", "1-year warranty"],
      ["Design consultation", "Alignment as part of the install", "Ride height matched to your wheels"]],
    ["r45 pkg2", ["Height & damping adjustable", "In-house tuning", "2-year warranty"],
      ["Height and damping adjustable", "Set up and tuned in-house", "Matched to your wheel and tire package"]],
    ["r46 pkg3", ["Everything in Coilover Setup", "Air management included"],
      ["Everything in Coilover Setup", "Air management specified and installed"]],
  ]],

  ["paint-and-body", [
    ["r47 badges", ["Lifetime Workmanship Warranty", "In-House Paint Booth", "Installed In-House"],
      ["Custom Color Development", "In-House Paint Booth", "Multi-Stage Finishing"]],
    ["r48 pkg1", ["Multi-stage correction", "Gloss & clarity restored", "1-year warranty"],
      ["Multi-stage correction", "Gloss and clarity restored", "Finish assessed panel by panel"]],
    ["r49 pkg2", ["Full bodywork prep", "Sprayed & cleared in-house", "Lifetime workmanship warranty"],
      ["Full bodywork preparation", "Sprayed and cleared in our own booth", "Color developed and reviewed with you"]],
    ["r51 meta", ["Custom paint and body work in Houston. Full and partial repaints, custom color, panel repair, refinishing and collision work, executed in house with color matched finish."],
      ["Custom paint and body in Houston. Full and partial repaints, custom color, panel repair and refinishing, executed in house in our own booth."]],
  ]],

  ["lighting", [
    ["r52 badges", ["2-Year Warranty", "In-House Wiring", "Installed In-House"],
      ["Factory-Line Integration", "Wired In-House", "Headlight & Taillight"]],
    ["r53 tile pill", ["Under"], ["Ambient"]],
    ["r53 tile name", ["Underglow & Accent Lighting"], ["Ambient & Accent Lighting"]],
    ["r54 pkg1", ["Tint & upgrade", "In-house wiring", "2-year warranty"],
      ["Taillight upgrade", "Wired in-house", "Finished to the factory lines"]],
    ["r55 pkg2", ["Full retrofit", "In-house wiring", "2-year warranty"],
      ["Full retrofit", "Wired in-house", "Components specified with you"]],
    ["r56 pkg3", ["Everything in Headlight Retrofit", "Underglow & accent lighting"],
      ["Everything in Headlight Retrofit", "Ambient and accent lighting"]],
    ["r57 meta", ["Automotive lighting in Houston. Headlight and taillight upgrades, tinting, smoked finishes, ambient interior lighting and auxiliary off road lighting, installed in house."],
      ["Automotive lighting in Houston. Headlight and taillight work, ambient interior lighting and accent lighting, wired and installed in house."]],
  ]],

  ["audio", [
    ["r58 badges", ["2-Year Warranty", "Custom Fabrication", "Installed In-House"],
      ["Custom Fabrication", "Tuned In-House", "Cabin Integration"]],
    ["r59 pkg1", ["Component speaker upgrade", "In-house wiring", "2-year warranty"],
      ["Component speaker upgrade", "Wired in-house", "Integrated with factory controls where the vehicle allows"]],
    ["r60 pkg2", ["Custom-fabricated enclosure", "In-house tuning", "2-year warranty"],
      ["Custom-fabricated enclosure", "Tuned in-house", "Finished to match the cabin"]],
  ]],

  ["truck-accessories", [
    ["r62 badges", ["2-Year Warranty", "In-House Fabrication", "Installed In-House"],
      ["In-House Fabrication", "Fitted & Finished", "Built For Real Use"]],
    ["r63 pkg1", ["Bed liner & tie-downs", "In-house install", "2-year warranty"],
      ["Bed liner and tie-downs", "Fitted in-house", "Finished to match the vehicle"]],
    ["r64 pkg2", ["Lift kit & alignment", "In-house install", "2-year warranty"],
      ["Lift kit and alignment", "Fitted in-house", "Planned around your wheel and tire package"]],
    ["r65 pkg3", ["Everything in Lift Kit Package", "Racks, armor & recovery gear"],
      ["Everything in Lift Kit Package", "Racks and armor"]],
    ["r66 meta", ["Truck accessories in Houston. Bumpers, steps, racks, bed covers, off road equipment and protection, fitted and finished in house alongside wheels and suspension."],
      ["Truck accessories in Houston. Bumpers, steps, racks, bed covers and off-road equipment, fitted and finished in house alongside wheels and suspension."]],
  ]],
];

for (const [slug, edits] of SERVICE_EDITS) {
  for (const [label, from, to] of edits) {
    const scope = sliceService(svc, slug);
    if (!scope) { missed.push(`${slug} :: block not found`); break; }
    svc = replaceSeq(svc, scope, from, to, `${slug} :: ${label}`);
  }
}

/* ------------------------------------------------------------------ *
 * 2. SERVICES  ·  site-wide rows 2, 3, 5, 6
 * ------------------------------------------------------------------ */

// r5  Priority scheduling comes out. The tier drops to three bullets.
{
  const count = (svc.match(/"Priority scheduling"/g) || []).length;
  if (count) {
    svc = svc.replace(/^[ \t]*"Priority scheduling",\r?\n/gm, "");
    applied.push(`r5 Priority scheduling removed x${count}`);
  } else {
    missed.push("r5 Priority scheduling");
  }
}

// r6  Dedicated project lead -> One point of contact through the build
svc = replaceRaw(svc, '"Dedicated project lead"', '"One point of contact through the build"', "r6 dedicated project lead");

// r2  Most Popular -> Signature
svc = replaceRaw(svc, 'ribbon: "Most Popular"', 'ribbon: "Signature"', "r2 ribbon");

// r3  Selected builds -> Design directions
svc = replaceRaw(svc, 'recentTitle: "Selected builds"', 'recentTitle: "Design directions"', "r3 recentTitle");

/* ------------------------------------------------------------------ *
 * 3. SERVICES  ·  FAQ blocks, her 39 in her order
 * ------------------------------------------------------------------ */

const SERVICE_FAQS = {
  "blackout-packages": [
    ["How long does a blackout package take?", "Most blackout packages run 3 to 5 business days in production depending on scope. The window for your vehicle is confirmed at consultation."],
    ["Can chrome be restored later?", "It depends on the method. With a vinyl chrome delete, the film is removed and the original trim remains underneath. A painted chrome delete is permanent, because the finish is applied to the trim itself. Which method suits your vehicle is covered before the work is specified."],
    ["Does this include the wheels?", "Wheel and caliper blackout is available as an add-on or as part of the full package."],
    ["How does a blackout finish age?", "Both wrap and paint change with time and use. How quickly depends on sun exposure, washing and general wear. We go through the material options and what care each one asks for at consultation."],
  ],
  "paint-protection-film": [
    ["What affects how long PPF lasts?", "Film life depends on the product selected, how the vehicle is used and how it is maintained. The options and what each involves are discussed at consultation."],
    ["How does the film age over time?", "The films installed here are built with UV-stable, self-healing topcoats. How any film ages depends on the product, sun exposure and care, and we go through the options at consultation."],
    ["How is the film removed?", "Film is made to be removable, and removal is done in house by the same team that installs it. Because the result depends on the condition and history of the paint underneath, that is assessed before quoting."],
    ["Does it need special care?", "Hand washing is recommended. Care guidance for the specific film on your vehicle is given at handover."],
  ],
  "vehicle-wraps": [
    ["How long does a full wrap take?", "How much of the vehicle is being wrapped, and how much prep it needs, drive the timeline. Most full wraps run 3 to 5 business days, and a window for your vehicle is estimated at consultation."],
    ["What affects how long a wrap lasts?", "Wrap life depends on the film selected, sun and weather exposure, and how the vehicle is washed and stored. What to expect from each material is covered at consultation."],
    ["How does a wrap sit over factory paint?", "Wrap film sits over the factory finish rather than replacing it, and both installation and removal are done in house. Paint condition and any previous repair work affect how a wrap behaves, so the finish is assessed before we quote."],
    ["Can PPF be installed with a wrap?", "Yes. Many builds combine both, planned together in-house."],
    ["How should the vehicle be cared for?", "Hand wash only. Avoid automatic car washes, high-pressure sprayers and harsh chemical cleaners, which can lift edges and dull the finish over time."],
  ],
  "wheels-and-fitment": [
    ["How do you confirm fitment before ordering?", "Your vehicle is measured in-house and fitment is calculated before any wheel is ordered."],
    ["Do you carry specific wheel brands?", "Brand availability is confirmed at consultation."],
    ["Can you match a factory-plus look?", "Yes. Fitment can be calculated for a subtle or aggressive stance, your call."],
    ["Is alignment included with a wheel package?", "Alignment is included in suspension-paired wheel packages and can also be scheduled on its own. What your build includes is listed on the quote."],
  ],
  "interior-transformation": [
    ["How long does a full retrim take?", "Most full retrims run 2 to 3 weeks depending on scope and material. The window for your vehicle is confirmed once the material and scope are set."],
    ["Can you match a specific material or color?", "Yes. Material and color are selected and confirmed at consultation."],
    ["How are factory electronics handled in a retrim?", "A retrim is planned around the factory electronics and controls in the cabin, which are removed and refitted as part of the work. Anything in your vehicle that needs particular handling is identified before trim work starts."],
    ["Do you work with exotic materials?", "Yes, including exotic leathers and specialty materials. Ask at consultation."],
  ],
  suspension: [
    ["How will this affect ride quality?", "Any change to suspension changes how the vehicle rides. The setup is specified around how you actually drive the car rather than ride height alone, and the trade-offs of each option are covered at consultation."],
    ["Air or coilovers: which is right for me?", "It depends on your use case and how much adjustability you want. We'll walk through it at consultation."],
    ["Is alignment included with a suspension install?", "Alignment is part of a suspension install. What your build includes is listed on the quote."],
    ["How low can I go without rubbing?", "Clearance is calculated against your specific wheel and tire package before anything is installed, and we walk through where the limits sit on your vehicle at consultation."],
  ],
  "paint-and-body": [
    ["How long does a full respray take?", "Scope and the amount of bodywork needed drive the timeline. Most full resprays run 1 to 3 weeks, and a window for your vehicle is estimated once the plan is set."],
    ["How is the color matched?", "Color is matched to your vehicle and confirmed with you before spraying begins. Age, sun exposure and previous repair work all affect how a factory color has weathered, and that is part of what the match is worked out against."],
    ["Do you handle insurance claims?", "Yes. Insurance work is something the house takes on. Bring the claim details along with the vehicle so the damage can be assessed and documented. What the process looks like from there depends on the scope, the cause of the damage and how your carrier handles the claim."],
    ["Is clear coat protection included?", "Paint protection film and ceramic coating can be specified on top of a respray. Whether either is included in your build is set out on the quote."],
  ],
  lighting: [
    ["Is this street legal?", "Lighting regulations vary by state and by the specific setup. We can tell you what a given setup involves, but what is legal where you drive is worth checking against your state's current requirements."],
    ["Can lighting be added to an existing build?", "Lighting can be added to a vehicle that has already been built, or planned as part of a larger build. Scope is confirmed at consultation."],
    ["How long does install take?", "Scope drives the timeline. Most lighting installs run 1 to 3 days, and a window is estimated at consultation."],
  ],
  audio: [
    ["Can this be added to an existing interior?", "Yes. Audio builds are planned around the cabin you already have or as part of a full retrim."],
    ["How does audio integrate with factory controls?", "Audio work is planned around the factory controls and head unit already in the vehicle. What integration is possible depends on the platform, and that is confirmed before the build is specified."],
    ["How long does an audio build take?", "It depends on the depth of the build. An install using existing locations is a short job. A full custom build involving fabrication runs longer, and a window is estimated once the system is specified."],
    ["Do you work with amateur or pro-level systems?", "Both. Systems are scoped to your goals and budget at consultation."],
  ],
  "truck-accessories": [
    ["Can this be paired with new wheels?", "Yes. Lift and wheel packages are planned together, with clearance and fitment calculated before parts are ordered."],
    ["How long does a full build take?", "Scope drives the timeline. Most truck builds run 3 to 7 business days, and a window is estimated once the parts list is set."],
    ["Do you install aftermarket parts I already own?", "Often yes. Bring your parts list to consultation so we can look at what you have and what installing it involves."],
  ],
};

for (const [slug, items] of Object.entries(SERVICE_FAQS)) {
  const scope = sliceService(svc, slug);
  if (!scope) { missed.push(`${slug} :: FAQ block not found`); continue; }
  const block = svc.slice(scope.start, scope.end);
  const at = block.indexOf("    faqs: [");
  if (at === -1) { missed.push(`${slug} :: faqs array not found`); continue; }

  // `faqs` is the last property on every service object, so everything
  // from there to the end of the block is replaced wholesale.
  const body = items
    .map(([question, answer]) => `      {\n        question: ${q(question)},\n        answer:\n          ${q(answer)},\n      },`)
    .join("\n");
  const rebuilt = `    faqs: [\n${body}\n    ],\n  },\n`;

  svc = svc.slice(0, scope.start) + block.slice(0, at) + rebuilt + svc.slice(scope.end);
  applied.push(`${slug} :: FAQs rebuilt (${items.length})`);
}

if (!DRY) fs.writeFileSync(SERVICES, svc, "utf8");

/* ------------------------------------------------------------------ *
 * 4. COMPANY FAQ  ·  her 30, five removed
 * ------------------------------------------------------------------ */

const COMPANY_GROUPS = [
  ["the-house", "The House",
    "Who we are, what we do and what makes the way we work different from a conventional shop.", [
    ["What is Design By TWM?", "Design By TWM is an automotive customization house in Houston, Texas. It performs ten disciplines under one roof: blackout packages, paint protection film, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, lighting, audio and truck accessories, along with a separate dealer services division."],
    ["Where is Design By TWM located?", "The facility is at 18235 Ammi Trail, Houston, Texas 77060, in north Houston. All work is performed at that single location rather than distributed across partner shops."],
    ["How did Design By TWM start?", "The house grew out of Tire and Wheel Master, a Houston wheel and tire retailer operating three showrooms across the city. Customers buying wheels there kept asking for everything else a build needs, wraps, blackout work, protection film, interiors and suspension. Rather than reshape an established retail operation around custom build work, Design By TWM was opened as its own house dedicated entirely to complete transformations."],
    ["What does TWM stand for?", "TWM comes from Tire and Wheel Master, the Houston wheel and tire business the house grew out of. The name keeps the connection to where the work started, which was wheels and fitment, while Design By TWM covers the full range of disciplines a complete build needs."],
    ["Is Design By TWM connected to Tire and Wheel Master?", "By lineage, not by operation. Tire and Wheel Master is a wheel and tire retailer with three Houston locations. Design By TWM is a separate business running independently from its own facility on Ammi Trail, opened because complete vehicle transformation is a different kind of work than retail wheel sales, on a different pace and requiring a different level of coordination between disciplines."],
    ["Does that wheel and tire background affect how you build?", "It shows in fitment. Wheels were the starting point, so offset, backspacing, brake clearance and ride height are measured and calculated before parts are ordered. That same approach carries into how the other disciplines on a build are planned."],
    ["What does automotive customization house mean?", "A conventional shop specializes in one thing and sends the rest of the work elsewhere. A customization house holds every discipline internally, so a vehicle needing wraps, wheels, suspension and an interior is handled as one project by one team instead of being passed between four vendors on four schedules."],
    ["Why does in-house work matter?", "Three practical reasons. Finish work is selected and applied by the same team across every panel. Stages are sequenced on one calendar rather than waiting on an outside shop. And you deal with one house throughout, instead of coordinating between separate vendors."],
    ["What kinds of vehicles do you work on?", "Domestic and imported vehicles alike: luxury and exotic cars, performance vehicles, SUVs and trucks. The disciplines are the same across all of them, though scope differs. An exotic is more likely to come in for paint protection film and wheels, a truck for suspension, accessories and lighting."],
    ["Do I need an exotic or luxury car to work with you?", "No. The work is defined by the standard applied, not by the badge on the vehicle. Daily drivers, trucks and enthusiast cars go through the same process and the same quality control as anything else in the building."],
    ["Do you serve areas outside Houston?", "Yes. Clients come from across the greater Houston area including The Woodlands, Katy, Sugar Land, Cypress, Spring, Pearland, League City, Conroe, Magnolia and Hockley, and vehicles are regularly transported in from elsewhere in Texas for larger builds."],
  ]],

  ["getting-started", "Getting Started",
    "How a project begins, from first inquiry through an approved plan.", [
    ["How do I get a quote?", "Submit the intake form or call the house, describe the vehicle and what you have in mind, and we schedule a consultation. Quotes are given per vehicle after seeing it in person rather than from a flat price list, because the same service can differ substantially between two cars."],
    ["Do I need an appointment?", "Yes, for a consultation. Seeing the vehicle in person lets us assess paint condition, existing modifications and fitment, which is what the quote is based on."],
    ["I know I want something done but not exactly what. Can you help?", "That is most of what a consultation is for. Clients frequently arrive knowing they want the vehicle to look a certain way without knowing which disciplines get them there. Because all ten are performed here, the recommendation is not shaped by which services happen to be available."],
    ["How far in advance should I book?", "It depends on scope and on the shop calendar. A contained job can often be scheduled quickly, while a multi-discipline build involving parts on order needs planning further out. Timing is confirmed when the plan is approved rather than estimated at first contact."],
    ["Do you require a deposit?", "Yes. A deposit is taken before parts and materials are ordered for your vehicle, which on a custom build are not returnable. Deposit and balance terms are set out in writing with your quote."],
    ["What payment methods do you accept?", "Card, bank transfer and cash are accepted. Financing options can be discussed for larger builds during the consultation."],
    ["Can I change the scope after the build has started?", "Often yes, and it is common once a client sees the vehicle mid-process. Any addition is quoted as an amendment to the original plan before it is scheduled."],
  ]],

  ["during-the-build", "During the Build",
    "What happens once your vehicle is with us.", [
    ["How long will my vehicle be here?", "Anywhere from a few days for a contained job to several weeks for a full multi-discipline build. An estimated window is discussed when the plan is approved. Because every discipline runs in the same building, the vehicle does not move between shops between stages."],
    ["Will I get updates while the work is happening?", "Yes. You have a single point of contact for the whole project rather than a different person per discipline, and progress is shared as the build moves through its stages."],
    ["Can I see my vehicle during the build?", "Visits can be arranged. Mid-build is genuinely the most interesting time to see a vehicle, particularly during an interior retrim or while film is being laid, though access is scheduled rather than open so the work is not interrupted."],
    ["Where is my vehicle kept while it is being worked on?", "Work and staging happen inside the facility. Arrangements for longer builds are discussed as part of the plan."],
    ["Can you arrange transport for my vehicle?", "Enclosed transport can be coordinated for clients outside the immediate Houston area or for vehicles that are not comfortably driven to the facility. This is arranged during the consultation."],
  ]],

  ["aftercare", "Aftercare",
    "What happens after you collect the vehicle.", [
    ["What happens if something is not right after I pick up the vehicle?", "Bring it back so we can look at it. Because the work was performed here rather than subcontracted, the team you speak to is the same team that did the original work."],
    ["How do I care for the work after delivery?", "Care depends on what was done, and guidance for your specific build is given at handover. In general we recommend hand washing with a pH neutral soap, avoiding automatic brush washes, and keeping high pressure away from film and vinyl edges."],
    ["Do you offer maintenance after a build?", "Yes. Ongoing detailing, protection maintenance and inspection of film and coatings can be scheduled, and long-term clients frequently return for additional work as vehicles change."],
  ]],

  ["dealers-and-fleet", "Dealers and Fleet",
    "Volume work for dealership inventory and commercial vehicles runs through a separate division.", [
    ["Do you work with dealerships?", "Yes. The Dealer Services Division handles inventory work at volume, including blackout and trim packages, wheel and tire programs, wraps, lift kits, protection and audio upgrades prepared for retail delivery."],
    ["Can you handle multiple vehicles at once?", "Yes. Dealer and fleet work is scheduled as a program rather than as individual bookings, with a single agreed specification applied across the units in that program."],
    ["Do you do commercial fleet wraps?", "Yes. Fleet graphics and full color change wraps are performed in house, with color matched to your brand specification as part of the planning stage."],
    ["How does a dealership get started?", "Through the dealer inquiry form or by calling the house directly. Dealer programs begin with a conversation about inventory mix, volume and turnaround expectations before any specification is set."],
  ]],
];

{
  let faqSrc = fs.readFileSync(FAQS, "utf8");
  const START = "export const companyFaqGroups: FaqGroup[] = [";
  const s = faqSrc.indexOf(START);
  const e = s === -1 ? -1 : faqSrc.indexOf("\n];", s);

  if (s === -1 || e === -1) {
    missed.push("faqs.ts :: companyFaqGroups block not found");
  } else {
    const groups = COMPANY_GROUPS.map(([id, label, intro, items]) => {
      const body = items
        .map(([question, answer]) => `      {\n        question: ${q(question)},\n        answer:\n          ${q(answer)},\n      },`)
        .join("\n");
      return `  {\n    id: ${q(id)},\n    label: ${q(label)},\n    intro:\n      ${q(intro)},\n    items: [\n${body}\n    ],\n  },`;
    }).join("\n\n");

    faqSrc = faqSrc.slice(0, s) + START + "\n" + groups + faqSrc.slice(e);
    const total = COMPANY_GROUPS.reduce((n, g) => n + g[3].length, 0);
    applied.push(`faqs.ts :: company FAQs rebuilt (${total})`);
    if (!DRY) fs.writeFileSync(FAQS, faqSrc, "utf8");
  }
}

/* ------------------------------------------------------------------ *
 * 5. Labels living in components, rows 3 and 4
 * ------------------------------------------------------------------ */

const LABEL_EDITS = [
  ["src/components/ui/ServiceSections.tsx", "View More Builds", "View the Portfolio", "r4 portfolio button"],
  ["src/app/services/[slug]/page.tsx", 'eyebrow="Recent Work"', 'eyebrow="Reference"', "r3 recent eyebrow"],
];

for (const [rel, from, to, label] of LABEL_EDITS) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { missed.push(`${label} :: ${rel} not found`); continue; }
  const src = fs.readFileSync(p, "utf8");
  const next = replaceRaw(src, from, to, label);
  if (next !== src && !DRY) fs.writeFileSync(p, next, "utf8");
}

/* ------------------------------------------------------------------ *
 * 6. Home and services index, rows 7 to 14
 *
 * These sentences live in page components rather than in the content
 * layer, so the script searches every source file for the exact text.
 * Anything not found is reported rather than guessed at.
 * ------------------------------------------------------------------ */

const PROSE_EDITS = [
  ["r7 home hero subhead",
    "Wraps, paint protection film, wheels, interiors and every other discipline a build requires, designed and executed in-house from first consultation through final delivery.",
    "Wraps, paint protection film, wheels, interiors and the disciplines that surround them, designed and executed in-house, from first consultation through final delivery."],
  ["r9 portfolio lede",
    "Complete transformations, multiple disciplines, one team and one standard of quality control.",
    "Complete transformations drawing on several disciplines, planned and executed as a single build."],
  ["r10 wheels lede",
    "Browse the wheel program. Fitment is confirmed for your vehicle before anything is ordered.",
    "A selection from the forged and monoblock lines we specify. Fitment is measured for your vehicle before anything is ordered."],
  ["r11 services intro",
    "Every service below is performed inside the same building by the same team, which means a build using four of them still runs on one timeline with one point of contact.",
    "Every discipline below is practiced inside the same building by the same team, so a build drawing on four of them is still planned and run as a single project, with one point of contact."],
  ["r13 headline disciplines intro",
    "These five account for the majority of the work that comes through the house, and most vehicles combine at least two of them.",
    "These five shape the character of a vehicle most directly, and they are rarely specified on their own."],
  ["r14 additional disciplines intro",
    "Full services with their own pages. Most often specified as part of a larger build rather than ordered on their own.",
    "Full disciplines with their own pages, typically specified as part of a larger build."],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const sourceFiles = walk(path.join(ROOT, "src"));

for (const [label, from, to] of PROSE_EDITS) {
  let hit = false;
  for (const file of sourceFiles) {
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes(from)) continue;
    hit = true;
    if (!DRY) fs.writeFileSync(file, src.split(from).join(to), "utf8");
    applied.push(`${label} :: ${path.relative(ROOT, file)}`);
  }
  if (!hit) missed.push(label);
}

/* ------------------------------------------------------------------ *
 * 7. Safety net: anything still carrying a coverage term in live copy
 * ------------------------------------------------------------------ */

const BANNED = /\b(warrant(y|ies|ed)|guarantee[ds]?|lifetime)\b/i;
const survivors = [];

for (const file of walk(path.join(ROOT, "src"))) {
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    const t = line.trim();
    // Comments are internal notes, not published copy.
    if (t.startsWith("*") || t.startsWith("//") || t.startsWith("/*")) return;
    if (BANNED.test(line)) survivors.push(`${path.relative(ROOT, file)}:${i + 1}  ${t.slice(0, 110)}`);
  });
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

console.log(`\n${DRY ? "DRY RUN, nothing written" : "APPLIED"}\n`);
console.log(`  ${applied.length} edits landed`);
for (const a of applied) console.log(`    ok   ${a}`);

if (missed.length) {
  console.log(`\n  ${missed.length} NOT FOUND, left untouched:\n`);
  for (const m of missed) console.log(`    MISS ${m}`);
  console.log("\n  Nothing was guessed. Send this list back and the exact text gets fixed by hand.");
} else {
  console.log("\n  Nothing missed. Every string in the spreadsheets was found.");
}

if (survivors.length) {
  console.log(`\n  COVERAGE TERMS STILL IN LIVE COPY (${survivors.length}):\n`);
  for (const s of survivors) console.log(`    !!   ${s}`);
} else {
  console.log("\n  Coverage sweep clean. No warranty, guarantee or lifetime left in live copy.");
}

console.log(`
  STILL TO DO BY HAND, deliberately not scripted:
    r8   "Five disciplines, one process" -> "Ten disciplines, one process"
         Depends on how the headline is split across lines in the component.
    r25  New line beneath the PPF third tier. Needs a note field on
         ServicePackage plus a render slot, which is a code change.
    Contact buttons -> "Contact the House". Message bubble stays "Text the House".
    Remove the prelaunch notice from every form.
    Schema regeneration once all copy is in.
`);
