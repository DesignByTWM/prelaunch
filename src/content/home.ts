/**
 * HOMEPAGE HERO, PROMOTIONAL COPY
 *
 * The parts of the hero Liz can edit in the Studio, as they stand in code.
 * This file is the fallback the hero uses only when the Sanity fetch fails
 * or the project is not configured, and the source the Stage 2 migration
 * copied into the Studio verbatim.
 *
 * The headline and the button's destination are deliberately not here.
 * They stay locked in Hero.tsx.
 */

export interface HomeHero {
  eyebrow: string;
  subline: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

export const homeHero: HomeHero = {
  eyebrow: "Houston, Texas",
  subline:
    "Wraps, paint protection film, wheels, interiors and the disciplines that surround them, designed and executed in-house, from first consultation through final delivery.",
  ctaLabel: "Design Your Build",
  image: "/dbtwmmainpagehero.webp",
  imageAlt: "Completed DESIGNBYTWM build photographed in an open environmental setting",
};
