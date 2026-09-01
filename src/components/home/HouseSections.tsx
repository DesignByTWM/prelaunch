import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/Reveal";
import { featuredBuilds } from "@/content/builds";
import { wheelBrands } from "@/content/wheels";
import { routes } from "@/lib/site";

/* ===== MATERIALS OF THE HOUSE ===============================
   Approved V2: off-white .alt section, monogram watermark at 4.5
   percent, three 1:1 figures with the mirrored 0 34px 0 34px corner.
   ============================================================ */

const materials = [
  { image: "/mainmaterial1metal.webp", alt: "Hand-finished panel detail", caption: "Hand-finished metal" },
  { image: "/mainmaterial2stitch.webp", alt: "Leather stitching detail", caption: "Cabin stitching detail" },
  { image: "/mainmaterial3fitment.webp", alt: "Wheel and brake fitment detail", caption: "Wheel & brake fitment" },
];

export function Materials() {
  return (
    <section className="alt">
      <div className="wrap mat-wrap">
        <Monogram className="mat-watermark" />

        <Reveal className="sec-head">
          <span className="eyebrow">Process</span>
          <h2 className="display">Materials of the house.</h2>
          <p className="lede">
            A closer look at the fabrication, fitment and material selection
            behind every build.
          </p>
        </Reveal>

        <div className="mat-grid">
          {materials.map((material, i) => (
            <Reveal
              key={material.caption}
              as="figure"
              card
              delay={(i + 1) as 1 | 2 | 3}
            >
              <div className="ph r11">
                <Photo src={material.image} alt={material.alt} />
              </div>
              <figcaption>{material.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== FEATURED BUILDS ======================================
   Approved V2: 16:9 frames, body-font h3 at 14.5px, outlined tags.

   FIXED August 31 2026. This section previously held its own hardcoded
   list of three builds with slugs that did not exist in builds.ts:
   full-size-suv-blackout-interior, sport-sedan-wrap-wheels and
   pickup-suspension-interior. All three cards linked to 404 pages.

   It now renders the first three entries of featuredBuilds, the same
   source the Featured Builds page uses, so a card can never again point
   at a build that does not exist.
   ============================================================ */

export function FeaturedBuilds() {
  const builds = featuredBuilds.slice(0, 3);

  return (
    <section id="builds">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Portfolio</span>
          <h2 className="display">Featured builds.</h2>
          <p className="lede">
            Complete transformations drawing on several disciplines, planned
            and executed as a single build.
          </p>
        </Reveal>

        <div className="builds">
          {builds.map((build, i) => (
            <Reveal
              key={build.slug}
              as={Link}
              href={`${routes.builds}/${build.slug}`}
              className="build"
              card
              delay={(i + 1) as 1 | 2 | 3}
            >
              <div className="ph r169">
                <Photo src={build.hero} alt={build.heroAlt} />
              </div>
              <h3>
                {build.vehicle}: {build.title}
              </h3>
              <div className="tags">
                {build.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SHOP WHEELS ==========================================
   Approved V2 module. Ships as an inquiry module at launch, not a
   catalog: the wheel program is thousands of SKUs and is deferred
   to a later ecommerce integration. Each card routes into the
   intake form, and the /wheels route is reserved so the catalog can
   drop in without a URL change.

   Reads wheelBrands from content/wheels.ts, which is the same source
   /wheels renders from. It previously carried its own hardcoded list
   of four anonymous wheel sets, which was left behind when the brands
   landed on September 2 2026 and quietly disagreed with /wheels. One
   source means the two cannot drift apart again.

   The fifth CTA tile on /wheels is deliberately not repeated here.
   This module is a glance at the brands, not the full grid.
   ============================================================ */

export function ShopWheels() {
  return (
    <section className="alt" id="wheels">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow">Wheels &amp; Fitment</span>
          <h2 className="display">Shop wheels.</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            A selection from the forged and monoblock lines we specify.
            Fitment is measured for your vehicle before anything is ordered.
          </p>
        </Reveal>

        <div className="wheels">
          {wheelBrands.map((brand, i) => (
            <Reveal
              key={brand.name}
              className="wheel"
              card
              delay={(i + 1) as 1 | 2 | 3 | 4}
            >
              <div className="ph r11">
                <Photo src={brand.frame} alt={`${brand.name} wheel`} />
              </div>
              <h4>{brand.name}</h4>
              <p>{brand.blurb}</p>
              <a href="#intake" className="btn btn-line">Inquire</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
