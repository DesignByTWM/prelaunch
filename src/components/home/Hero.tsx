import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
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
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="ph">
        <img
          src="/hero.webp"
          alt="Completed DESIGNBYTWM build photographed in an open environmental setting"
          fetchPriority="high"
        />
      </div>
      <div className="hero-scrim" />

      <div className="hero-in">
        <div className="wrap">
          <div className="hero-content">
            <Monogram />
            <span className="eyebrow on-dark">Houston, Texas</span>
            <h1 className="display">
              <span className="l1">Not a shop.</span>
              <span className="l2">
                The Automotive
                <br />
                Customization House.
              </span>
            </h1>
            <p>
              Wraps, paint protection film, wheels, interiors and every other
              discipline a build requires, designed and executed in-house from
              first consultation through final delivery.
            </p>
            <Link href={routes.designYourBuild} className="btn btn-primary">
              Design Your Build
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
