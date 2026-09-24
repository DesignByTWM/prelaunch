import type { Metadata, Viewport } from "next";

/**
 * STUDIO LAYOUT
 *
 * A pass through. It exists so the Studio route can declare metadata,
 * which a client component cannot do, and the Studio page itself has to be
 * a client component because Sanity builds its interface with React
 * context in the browser.
 *
 * Nothing is rendered around the children. The Studio sits outside the
 * (site) route group, so the only thing above it is the root layout's html
 * and body. No header, no footer, no floating text button, no site
 * stylesheet, no GA4 and no Vercel Analytics.
 */

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

/* The Studio manages its own full screen viewport. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
