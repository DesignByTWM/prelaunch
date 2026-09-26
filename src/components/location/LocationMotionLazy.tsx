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

const LocationMotion = dynamic(
  () =>
    import("@/components/location/LocationMotion").then(
      (mod) => mod.LocationMotion,
    ),
  { ssr: false },
);

export function LocationMotionLazy() {
  return <LocationMotion />;
}
