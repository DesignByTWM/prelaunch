import { SiteChrome } from "@/components/SiteChrome";

/**
 * SITE LAYOUT
 *
 * Wraps every page of the site in the chrome that used to sit in the root
 * layout. It sits one level down from the root so /studio, which is
 * outside this route group, cannot inherit any of it. Route groups are
 * invisible to routing, so every URL under here is exactly what it was
 * before.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
