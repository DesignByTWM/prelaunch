"use client";

import dynamic from "next/dynamic";

/**
 * LocationMotionLazy
 *
 * Loads LocationMotion, and therefore GSAP, ScrollTrigger, MotionPathPlugin
 * and Lenis, in a chunk of its own rather than in the shared bundle for the
 * city route.
 *
 * Why it exists: all 22 cities share one route file, so anything imported
 * statically there is downloaded by all of them. Only cities with content
 * animate. The other 21 render the coming soon placeholder and were paying
 * for an animation library they never run.
 *
 * ssr: false is correct rather than a shortcut. LocationMotion renders
 * nothing at all, it only attaches behaviour in an effect, so there is no
 * markup to server render and nothing to hydrate. Every word, link and
 * schema on the page is server rendered by the page itself.
 */

/* Mirrors the props on LocationMotion. Declared rather than derived,
   because the component is loaded dynamically and has no exported type. */
interface LocationMotionProps {
  /** Light path over the hero image, as 0 to 1 fractions. */
  sweep: [number, number][];
  imageWidth: number;
  imageHeight: number;
}

const LocationMotion = dynamic(
  () =>
    import("@/components/location/LocationMotion").then(
      (mod) => mod.LocationMotion,
    ),
  { ssr: false },
);

export function LocationMotionLazy(props: LocationMotionProps) {
  return <LocationMotion {...props} />;
}
