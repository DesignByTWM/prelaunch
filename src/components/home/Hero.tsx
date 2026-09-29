import Link from "next/link";
import { preconnect } from "react-dom";
import { Monogram } from "@/components/BrandMarks";
import { getHomeHero, framedNatural } from "@/sanity/content";
import { NATURAL } from "@/sanity/frames";
import { routes } from "@/lib/site";

/**
 * Hero
 *
 * Approved V2 exactly. The H1 is the positioning line itself, set in two
 * weights: "Not a shop." at full size, then the house name at 0.62em.
 * That relationship is the approved headline treatment and is not a
 * placeholder for something more descriptive.
 *
 * One CTA only. The monogram sits above the eyebrow in Signal Teal.
 *
 * STAGE 2. The eyebrow, the paragraph, the button wording and the photo
 * come from the Homepage document in the Studio. The headline and the
 * button's destination stay locked here.
 *
 * The photo fills the screen at every shape from a tall phone to a wide
 * desktop, so a Sanity photo is served uncropped and positioned by Liz's
 * hotspot rather than cut to one shape. The Sanity CDN is preconnected
 * only when the photo actually comes from it, because this is the image
 * that decides how fast the page appears.
 */
export async function Hero() {
  const hero = await getHomeHero();
  const photo = hero.image ? framedNatural(hero.image, NATURAL.homeHero) : null;
  if (photo?.fromSanity) preconnect("https://cdn.sanity.io");

  return (
    <section className="hero">
      <div className="ph">
        {photo && <img src={photo.src} alt={photo.alt} fetchPriority="high" {...photo.extra} />}
      </div>
      <div className="hero-scrim" />

      <div className="hero-in">
        <div className="wrap">
          <div className="hero-content">
            <Monogram />
            {hero.eyebrow && <span className="eyebrow on-dark">{hero.eyebrow}</span>}
            <h1 className="display">
              <span className="l1">Not a shop.</span>
              <span className="l2">
                The Automotive
                <br />
                Customization House.
              </span>
            </h1>
            {hero.subline && <p>{hero.subline}</p>}
            {hero.ctaLabel && (
              <Link href={routes.designYourBuild} className="btn btn-primary">
                {hero.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
