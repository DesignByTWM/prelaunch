# SEO / GEO / AEO AUDIT
## DESIGNBYTWM · Post-Launch Position
**Prepared by:** Bizsual · ApexForge Strategy Collective
**Date:** September 3 2026
**Status of site:** Live at https://designbytwm.com since September 3 2026
**Agents:** SVO (lead) · MIRL · WVCE · IAO

---

## 1. SCOPE AND METHOD

### 1.1 What this document answers

Three questions, in order:

1. What was planned for SEO, GEO and AEO at the conception of this project
2. What actually shipped at launch
3. Where the real gaps are now that the site is live, and which of them block the 4-month program

### 1.2 Source hierarchy applied

| Source | Status | Weight |
|---|---|---|
| Documents in the main project folder | THE PLAN. Conception-stage intent | Historical. Superseded wherever the repo differs |
| The repo `\dbtwm_website` and designbytwm.com | THE FINAL APPROVED EXECUTION, approved by Liz and Henry | Governs. Overrides the plan |

A difference between the plan and the live site is recorded in this document as an **approved supersession**, never as a miss. Section 5 lists them so the record is clean.

### 1.3 Evidence base

Read directly from the repo:

`src/app/sitemap.ts` · `src/app/robots.ts` · `src/lib/site.ts` · `src/lib/schema.tsx` · `src/app/layout.tsx` · `src/app/services/[slug]/page.tsx` · `src/app/journal/[slug]/page.tsx` · `src/app/featured-builds/[slug]/page.tsx` · `src/app/locations/page.tsx` · `src/app/locations/[city]/page.tsx` · `src/components/Header.tsx` · `src/components/Footer.tsx` · `src/content/journal.ts` · `package.json` · full `src` route tree

Plan documents: the four marketing reports, the service catalog, the Bizsual proposal and signed agreement, the Quote Builder scope.

Production facts taken as verified by Jose at launch and not re-tested here: robots.txt, sitemap.xml, canonical resolution, JSON-LD graph, NAP, lead pipeline, Resend key scope, share previews, Lighthouse scores.

### 1.4 Out of scope

- Houston master location page design. Decided: it is built after two weeks of real Search Console query data exists
- Final keyword targets. Any keyword named here is provisional until query data lands

---

## 2. EXECUTIVE SUMMARY

**The technical SEO and AEO foundation shipped is stronger than the plan asked for.** Structured data, crawler policy, canonical discipline, NAP integrity and answer-engine readiness are all in production and correct. On the AEO axis specifically, this site is ahead of every competitor named in the market research: HowTo schema on all ten disciplines, FAQPage sitewide, and five educational articles built to be quoted rather than to fill a blog.

**The gap is not in what was built. It is in what measures it and what feeds it.**

Three findings drive the rest of this document:

1. **There is no analytics of any kind installed.** No GA4, no Vercel Analytics, no session tooling. `package.json` carries five dependencies and none is an analytics package. A 4-month retainer whose contracted monthly deliverable is a performance report tied to leads and rankings currently has no instrument to report from. This is the single highest-priority item and it blocks the baseline.

2. **The site is live but not yet registered anywhere.** Search Console, Bing, IndexNow and Apple Business Connect are all outstanding. Google has not been told the site exists. Until it is, the two weeks of query data the Houston master page depends on has not started counting.

3. **The content engine is built but starved.** Ten service page templates, twenty-two city routes, five articles and six build case studies are all in place structurally. What they lack is photography, client-verified copy, and the location content itself. The machine is assembled. It has no fuel in it.

**Bottom line:** the build phase delivered the foundation correctly. The SEO stage is not remedial work. It is instrumentation, registration and content, in that order.

---

## 3. WHAT WAS PLANNED AT CONCEPTION

Extracted from the plan documents and restated as a checklist. Chapter references are to the marketing reports.

### 3.1 Technical and on-page (Ch. 6.2, 6.3, 12.2)

- Keyword-rich service pages, one per discipline
- Service-specific landing pages, clear service segmentation
- Structured data for vehicles and services
- Fast load, mobile optimisation, strong calls to action
- Portfolio restructured to case study format

### 3.2 Local SEO (Ch. 6.4, 12.2, Quote Builder Scope 3 step 1)

- Google Business Profile optimisation
- NAP consistency
- Local citation footprint
- Review volume growth, review keyword relevance
- Photo uploads and posting cadence on the profile

### 3.3 Location content (Quote Builder Scope 3 step 3, sitemap approval)

- Dedicated pages for each target market served
- Approved at 22 cities: Houston as master, 21 replications

### 3.4 Authority content (Ch. 6.6, 12.3, Scope 3 step 4)

- Educational content: PPF explainers, ceramic coating, wheel fitment guides, wrap versus paint comparisons
- Full build breakdowns and technical explanation
- Weekly blog cadence in Phase 2 of the roadmap

### 3.5 GEO and AI search (Scope 3 step 5, Ch. 11)

- Content and trust signals structured so AI engines surface the business
- AI-crawler readiness baked in at build time rather than retrofitted
- AI-powered chatbot for build consultations

### 3.6 Conversion and lead systems (Ch. 6.7, Scope 2)

- Lead magnet
- Intelligent forms with branded success states
- Branded transactional email on a verified domain
- Live CRM pipeline with automatic lead sync and source attribution
- Email nurture sequences, SMS follow-up, retargeting

### 3.7 Measurement (Scope 3 step 7, Ch. 11.8, Ch. 12.6)

- Analytics, ranking tracking, lead attribution
- Monthly performance report tied to leads and rankings
- KPI set: lead volume, conversion rate, average project value, traffic growth, ranking movement

### 3.8 Stack (ApexForge mandate)

- Next.js 15 App Router, Tailwind + shadcn/ui, Sanity CMS, Vercel, Supabase or PlanetScale, HubSpot or GoHighLevel, GA4 + Vercel Analytics + session recording

---

## 4. WHAT ACTUALLY SHIPPED

Verified in the repo. This is the approved execution.

### 4.1 Crawl and index control

| Item | State |
|---|---|
| robots.txt | Production allows all. Staging and previews disallow everything, failing closed by design |
| AI crawlers | Twelve named and explicitly allowed: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot, Applebot-Extended, Bingbot, CCBot |
| Disallowed | `/thank-you` and `/api/` only |
| sitemap.xml | 35 URLs, generated from the same content files that render the pages. A new service, build or article enters the sitemap automatically |
| Canonical | Apex only. `site.isProduction` is true on the exact production origin and nowhere else, so no preview build can ever claim the domain |
| City pages | Noindex at page level, follow retained, deliberately excluded from the sitemap so Google is never given a contradictory instruction |

**Assessment:** correct, and more disciplined than the plan specified. The decision to noindex the 22 city placeholders rather than publish them thin is the right call and prevents a doorway-page signal attaching to the domain before the program starts.

### 4.2 Structured data

Emitted as a single `@graph` with entities cross-referencing by `@id`, which is how a crawler understands the FAQ, the services and the business are one thing.

| Schema type | Where | Notes |
|---|---|---|
| AutoBodyShop | Sitewide | Recognised subtype, not generic LocalBusiness. Full NAP, geo, hours, sameAs across six profiles including the new Pinterest |
| OfferCatalog | On the organization | All ten disciplines. This is what lets an answer engine name one business for "who does PPF and wheels in Houston" |
| WebSite | Sitewide | Publisher linked to the org @id |
| Service | Each of 10 service pages | With `areaServed` populated from all 22 cities, so the location program reinforces one entity |
| HowTo | Each of 10 service pages | Four-step process per discipline. No competitor in this market publishes process in machine-readable form |
| FAQPage | Service pages, FAQ page, each journal post | Emitted from the same objects that render the visible questions, so schema and visible content cannot diverge |
| BlogPosting | Each of 5 journal posts | Author and publisher both resolve to the org @id |
| CreativeWork | Each of 6 build case studies | Creator resolves to the org @id |
| BreadcrumbList | Sitewide | |
| CollectionPage | Locations hub | |

Package tiers are emitted as Offers **without price**, by client instruction of August 14 2026. That is valid markup and still signals to an answer engine that tiers exist.

**Assessment:** this is the strongest part of the build and it substantially exceeds the plan. Section 3.5 asked for AI-crawler readiness. What shipped is a full entity graph.

### 4.3 Content inventory

| Type | Count | State |
|---|---|---|
| Service pages | 10 | Built to Liz's August 14 templates. Hero, overview, coverage, process, recent work, packages, FAQ, related, final CTA |
| Explore pages | 6 | The House, Dealer Services, Featured Builds, Shop Wheels, Design Your Build, Contact |
| Journal articles | 5 | PPF vs ceramic, wrap vs paint, wheel fitment, blackout package contents, wrap care in Houston heat |
| Build case studies | 6 | Each stage links to its service page, turning a case study into an internal linking hub |
| FAQs | 69 | Applied from Liz's final revision spreadsheet |
| City routes | 22 | Placeholder, noindex |
| Legal | 3 | Privacy, Terms, Accessibility |
| Total pages built | 63 | 35 in the sitemap |

### 4.4 NAP and local foundation

Single source of truth in `src/lib/site.ts`. Every phone number, address and business name rendered anywhere on the site, in schema, in the footer or in forms reads from that file. Nothing is typed by hand into a component. Phone `(832) 402-9174`, address `18235 Ammi Trail, Houston, TX 77060`, email `info@designbytwm.com`.

Hours confirmed by Liz August 14 2026: Monday to Friday 08:00 to 17:00, Saturday and Sunday closed.

### 4.5 Lead capture

Server action plus a shared `SubmitLead` component feeding ContactForm, DealerForm, BuildFlow and IntakeForm. Delivery through Resend to `info@`, `media@` and the webmaster gmail. Customer auto-response sends from `info@`. Service page leads carry both a source label and a package tier.

### 4.6 Performance

Lighthouse mobile on live: Performance 93 to 100, Best Practices 100, CLS 0. Accessibility 95 sitewide, addressed in section 6.

---

## 5. APPROVED SUPERSESSIONS

The plan called for these. The approved execution did something different. **None of these is a miss.** They are recorded so nobody re-opens a settled decision six weeks from now.

| # | The plan said | The approved execution shipped | Why |
|---|---|---|---|
| S1 | Sanity.io headless CMS | Typed TypeScript content files in `src/content` | Structure deliberately mirrors what Sanity would return, so a CMS swap is a data-source change rather than a rewrite. CMS decision still open, see D7 |
| S2 | Tailwind + shadcn/ui | Custom CSS in `globals.css` | Brand Guidelines v2.0 required a bespoke design language. Tailwind remains a dependency but the design system is hand-built |
| S3 | Supabase or PlanetScale database | No database. Leads are transactional email | Leads are the only dynamic data and email delivery was verified end to end. A database was not needed to launch |
| S4 | AI chatbot for build consultations | Not built | Explicitly moved out of scope as a future build using an AI API |
| S5 | Build configurator | Design Your Build guided form flow | Approved by Liz and Henry as the quote path |
| S6 | Shop Wheels catalog | Form only, route reserved as a swappable component | Wheels catalog is thousands of SKUs. Deferred to a future Shopify or ecommerce integration |
| S7 | 20 location pages | 22 | Magnolia and Hockley added at sitemap approval, July 17 2026 |
| S8 | Dealer Services band on the homepage | Removed. Separate funnel reached by nav and footer | Liz, July 25 2026 |
| S9 | Pricing in service content | No prices anywhere, including schema | Client instruction, August 14 2026. Every cost path routes to consultation |
| S10 | Deep navigation in the header | Four links plus the CTA. Deep nav lives in the footer and on the services page | Part of the approved V2 restraint |

**Two items sit between supersession and open question and need Jose's ruling, not mine.** They appear in the signed Scope 2 deliverables but did not ship, and no record shows them being formally descoped:

- **CRM pipeline with automatic lead sync** (HubSpot or GoHighLevel). Leads currently arrive as email only
- **Lead magnet** to power the capture funnel

These are carried into section 8 as decisions D2 and D8 rather than being called gaps, because calling them gaps presumes an answer.

---

## 6. GAP REGISTER

Scored on impact to the 4-month program, effort, and what each one blocks.

### GAP A · No analytics installed anywhere
**Severity: Critical. Blocks everything downstream.**

`package.json` dependencies are `next`, `react`, `react-dom`, `resend`, `sharp`. There is no GA4, no Vercel Analytics, no session tooling, no tag manager. `layout.tsx` contains no measurement script.

Consequences:
- The contracted monthly performance report has no data source
- Conversion rate, traffic growth and lead attribution cannot be measured, only counted from the inbox
- There is no before/after baseline for the SEO stage, so improvement cannot be demonstrated
- The Houston master page decision depends on query data that nothing is currently collecting

**Blocks:** baseline, monthly reporting, every optimisation decision for four months.

### GAP B · Site not registered with any search engine
**Severity: Critical. Time-sensitive.**

Outstanding: Google Search Console property and verification, sitemap submission, Bing Webmaster Tools, IndexNow, Apple Business Connect.

Every day this waits is a day removed from the front of the two-week query-data window that the Houston master page is gated on.

**Blocks:** task 5 in the sequence, indexation speed, Siri and Apple Maps presence.

### GAP C · Google Business Profile not yet pointed at the apex
**Severity: High.**

The profile website field still needs to be moved to `https://designbytwm.com`. Beyond that: services list, products, description, categories, hours matched to the site, photo uploads, post cadence, review response.

GBP is the single highest-converting local surface in this industry per the market research, and four real reviews are already live on the site.

### GAP D · Business coordinates are approximate
**Severity: High. Small effort.**

`src/lib/site.ts` carries `latitude: 29.9469, longitude: -95.4133` with an inline note reading "Verify against GBP before launch." That verification did not happen. Those coordinates feed the `GeoCoordinates` node in the AutoBodyShop schema, which is exactly what Apple Maps and Siri ingest.

Wrong-by-a-few-hundred-metres coordinates in schema against a correct GBP pin is a low-grade inconsistency signal on the one axis where consistency is the whole game.

### GAP E · Photography
**Severity: High. Not resolvable by us.**

- 80 service page photo slots outstanding with Liz. The workbook listing every frame, its shape and its size went to her on launch day
- **Lighting has no source photography at all.** Not a missing slot, a missing discipline
- Build gallery slots partially wired through `galleryFiles` overrides

SEO consequences: no image search surface, no `ImageObject` depth in schema, weaker E-E-A-T on pages whose entire commercial argument is visual proof, and service page OpenGraph images referencing files that may not resolve.

### GAP F · Location program is unstarted by design
**Severity: Expected. This is the program, not a defect.**

22 city routes exist, all noindex placeholders reading "coming soon." Correctly excluded from the sitemap. Houston master waits on query data. Recorded here for completeness so the audit reflects reality.

### GAP G · Copy still pending client verification
**Severity: Medium. Blocks indexation confidence, not indexation.**

- All five journal articles are draft copy. Technically sound as industry guidance, but every claim about how DESIGNBYTWM specifically operates needs Henry. Logged in `CLIENT_REVIEW_NOTES.md` section 18
- Featured build descriptive copy for all six builds was written by us, not Liz. Logged in section 29
- TWM / Tire and Wheel Master lineage copy remains draft pending Henry's decision on making it public

That last one is the highest-value unresolved content item on the site. A verified multi-generational lineage in the Houston wheel trade is a first-class E-E-A-T signal and no competitor can replicate it.

### GAP H · No named human expertise anywhere on the site
**Severity: Medium-High for AEO. Rising in importance.**

Every schema author and creator resolves to the organization. There is no `Person` entity, no named technician, no owner byline, no photograph of a human being who does the work.

Answer engines increasingly weight demonstrable first-hand experience. "The house says" carries less than "Henry Velasquez, who has done this for X years, says." This is the difference between being listed and being cited.

### GAP I · GEO surface files absent
**Severity: Medium. Low effort.**

- No `llms.txt`. An emerging convention for telling AI crawlers what a site is and what it wants surfaced
- No `humans.txt`, which is also where the Bizsual credit line was to sit
- No `speakable` markup on the FAQ content, which is the voice-answer surface for Siri and Assistant

### GAP J · Accessibility 95 sitewide
**Severity: Medium. Cause now probably identified.**

Identical 95 across five different templates points at a shared component, which is what Jose concluded. The strongest candidate found in the repo:

**`Footer.tsx` opens its four column headings with `<h5>`.** On most templates the highest heading before it is an `<h2>` or `<h3>`, so the document heading order jumps a level or two. That triggers Lighthouse's "Heading elements are not in a sequentially-descending order" audit, which fires on every page carrying the footer, which is every page. The uniform score is consistent with exactly one audit failing everywhere.

This is a candidate, not a confirmed diagnosis. Options in section 8, decision D3. No change made.

### GAP K · Legacy URL handling unverified
**Severity: Unknown until answered. Potentially High.**

The site replaced a previous Shopify presence. Nothing in the repo shows a redirect map from old URLs to new ones, and `next.config` carries no redirects that surfaced in this read.

If the old site had indexed URLs with any accumulated authority, those are currently 404ing. Question raised in section 8, decision D4.

### GAP L · No citation footprint work started
**Severity: Medium. Scheduled.**

NAP is correct on the site and in schema. It has not yet been pushed to the aggregators and directories that local ranking depends on: Apple, Bing Places, Yelp, Facebook, Yellow Pages, Angi, MapQuest, the automotive verticals.

### GAP M · No review generation system
**Severity: Medium.**

Four real Google reviews are live on the site with source URLs. There is no cadence for requesting more, no review-response practice, and no decision on whether to mark reviews up in schema.

Note: Google's structured data policy restricts self-serving review markup on LocalBusiness. Omitting it may be correct. Decision D5.

### GAP N · Bizsual attribution incomplete
**Severity: Low. Explicitly bounded.**

Footer carries the plain-text "Powered by Bizsual" label, deliberately not a link. Still to add, carefully and without touching client entity signals: a `creator` node on the WebSite schema, and a credit line in `humans.txt`. The real association gets built on bizsual.com with a case study and Organization schema.

---

## 7. PRIORITY MATRIX

| Gap | Impact | Effort | Blocks | Priority |
|---|---|---|---|---|
| A · No analytics | Critical | Low | Baseline, all reporting | **1** |
| B · Not registered with search engines | Critical | Low | Query data, indexation | **2** |
| D · Approximate coordinates | High | Very low | Apple, local consistency | **3** |
| C · GBP not pointed at apex | High | Low | Local conversion | **4** |
| J · Accessibility 95 | Medium | Low | Nothing. Quality item | **5** |
| K · Legacy URL redirects | Unknown | Low | Retained authority | **6** |
| I · GEO surface files | Medium | Low | AI surfacing | **7** |
| L · Citation footprint | Medium | Medium | Local ranking | **8** |
| G · Copy verification | Medium | Client-bound | Confidence | **9** |
| H · Named expertise | Medium-High | Client-bound | AEO citation | **10** |
| E · Photography | High | Client-bound | Image SEO, E-E-A-T | **11** |
| M · Review generation | Medium | Ongoing | Local ranking | **12** |
| F · Location program | Expected | High | Nothing yet | **13** |
| N · Bizsual attribution | Low | Low | Nothing | **14** |

Items 9 through 11 sit with Liz and Henry. They are chased, not executed.

---

## 8. DECISIONS REQUIRED BEFORE EXECUTION

Presented as options with plain tradeoffs. Nothing gets built on any of these until Jose rules.

### D1 · Analytics stack
- **A)** GA4 only. Free, industry standard, integrates with Search Console, steeper interface
- **B)** Vercel Analytics only. Simplest, privacy-friendly, already in the hosting account, weaker for SEO attribution
- **C)** GA4 plus Vercel Analytics. GA4 for attribution and reporting, Vercel for real-user performance data. Two dashboards
- **D)** GA4 plus Vercel Analytics plus Microsoft Clarity. Adds free session recordings and heatmaps, which show where leads abandon forms. One more script on the page

### D2 · CRM
- **A)** None for now. Email pipeline continues. Revisit at month 3
- **B)** HubSpot free tier. Contacts and deal pipeline at no cost, upgrade path exists
- **C)** GoHighLevel. Stronger nurture and SMS automation, monthly cost
- **D)** Airtable as a lightweight lead ledger. Cheap, no automation, better than an inbox

### D3 · Accessibility 95
- **A)** Change the footer `h5` headings to the correct level and re-test. Fastest path, likely resolves it, single small change
- **B)** Run a full axe audit on five templates first, then fix whatever it names. Slower, certain
- **C)** Fix the footer headings and run the audit anyway to confirm nothing else is hiding
- **D)** Leave it. 95 is a good score and it affects no ranking factor

### D4 · Legacy Shopify URLs
Question first: does Jose have the old Shopify URL list or a Search Console export from the previous site?
- **A)** Yes, and we build a redirect map
- **B)** No old URLs of consequence, take no action
- **C)** Unknown. Wait for Search Console coverage data after verification, then redirect whatever shows as 404 with traffic

### D5 · Review markup
- **A)** Omit review schema. Compliant with Google's self-serving review policy. Reviews stay visible on the page, unmarked
- **B)** Mark up reviews as `Review` nodes without `aggregateRating`. Lower risk, some benefit
- **C)** Full `aggregateRating`. Highest visible benefit, against policy for self-serving reviews, manual-action risk

### D6 · Named human expertise
- **A)** Henry named as the authority. Byline on journal articles, a `Person` entity, a short bio on The House. Strongest AEO signal, needs his consent
- **B)** House byline only. "The DESIGNBYTWM team." Safe, weaker
- **C)** Named technicians per discipline. Richest, hardest to maintain
- **D)** Defer until Henry rules on the TWM lineage, then do both together as one story

### D7 · CMS
- **A)** Sanity.io. Liz edits content in a clean interface, monthly cost above the free tier, a build project to wire up
- **B)** Direct VS Code access for Liz. No cost, no build, requires her to be comfortable in an editor and risks breaking the build
- **C)** Neither for now. Copy changes come through Jose. Zero risk, Jose is the bottleneck
- **D)** Sanity for journal and builds only, leaving service pages and legal in code

### D8 · Lead magnet
The signed Scope 2 lists one. It did not ship.
- **A)** Build one now. Strongest candidate for this market: a build planning guide or a "what to ask before you approve a customization quote" PDF, which suits the blackout-quote article already published
- **B)** Defer to month 2 of the SEO program, once query data shows what people actually want
- **C)** Formally descope it. The Design Your Build flow is the capture mechanism
- **D)** Repurpose the journal. Gate nothing, and treat the five articles as the magnet

---

## 9. SEQUENCED PLAN, NEXT 30 DAYS

Mapped onto the order Jose set.

### Week 1 · Instrument and register
1. Resolve D1, install analytics, verify events fire on a live form submission
2. Google Search Console: add the apex as a domain property, verify by DNS, submit `sitemap.xml`
3. Confirm both `www` and apex resolve correctly inside the property
4. Bing Webmaster Tools: create, import from Search Console, submit sitemap
5. IndexNow: generate the key, place the key file, wire submission
6. Fix the coordinates in `site.ts` against the confirmed GBP pin, redeploy

**Exit condition:** the two-week query-data clock starts.

### Week 2 · Local surfaces
7. Apple Business Connect: claim, verify, complete the listing for Siri and Apple Maps
8. Google Business Profile: point the website field at the apex, align categories, services, description and hours to the site, load photography as it arrives, start a post cadence
9. Resolve D3 and clear the accessibility item
10. Add `llms.txt` and `humans.txt`, including the Bizsual credit line, plus the `creator` node on the WebSite schema

### Week 3 · Foundation and footprint
11. Resolve D4 and handle legacy URLs
12. Begin the citation footprint: Apple, Bing Places, Yelp, Facebook, and the automotive verticals, all against the locked NAP
13. Review-generation cadence agreed with Liz
14. Chase list to Liz and Henry: 80 photo slots, Lighting photography, journal copy verification, featured build copy, TWM lineage ruling

### Week 4 · Read the data
15. First Search Console query pull. Impressions, positions, and the queries the site is already being shown for
16. Baseline report issued
17. Houston master page brief written **from that data**, presented for approval before any page is built

**The 21 replications follow only after the Houston master is approved.**

---

## 10. BASELINE TO LOCK TODAY

Recorded now so month 4 has a defensible zero point.

| Metric | Value at September 3 2026 |
|---|---|
| Indexed pages | 0. Not yet submitted |
| Sitemap URLs | 35 |
| Total pages built | 63 |
| Indexable city pages | 0 of 22 |
| Journal articles published | 5 |
| Build case studies | 6 |
| FAQs published | 69 |
| Schema types in production | 10 |
| Organic sessions | Unknown. No analytics installed |
| Ranking keywords | 0 tracked |
| Google reviews live on site | 4 |
| Citation footprint | Not started |
| Domain age at apex | Established, new site |
| Lighthouse mobile Performance | 93 to 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse Accessibility | 95 |
| CLS | 0 |

---

## 11. ASSUMPTIONS AND CAVEATS

1. Production facts listed by Jose at launch are taken as verified and were not independently re-tested
2. The accessibility diagnosis in Gap J is a candidate identified by reading the repo, not a confirmed test result
3. Legacy Shopify URL exposure is unquantified pending D4
4. Keywords are deliberately absent from this document. Naming targets before query data exists would contradict the decision that the Houston master is built from real data
5. Nothing in the repo or on the live site was changed while producing this audit

---

**Prepared by Bizsual for DESIGNBYTWM.**
Next action: rulings on D1 through D8, then Week 1 execution.
