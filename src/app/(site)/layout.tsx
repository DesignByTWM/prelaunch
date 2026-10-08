import { SiteChrome } from "@/components/SiteChrome";

/**
 * SITE LAYOUT
 *
 * Wraps every page of the site in the chrome that used to sit in the root
 * layout. It sits one level down from the root so /studio, which is
 * outside this route group, cannot inherit any of it. Route groups are
 * invisible to routing, so every URL under here is exactly what it was
 * before.
 *
 * `schema` is the @schema slot: the organization and website schema for
 * the page being rendered. @schema/page.tsx is the homepage, the one page
 * whose business node carries the reviews, and @schema/default.tsx is
 * every other page, unchanged.
 */
export default function SiteLayout({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: React.ReactNode;
}) {
  return <SiteChrome schema={schema}>{children}</SiteChrome>;
}
