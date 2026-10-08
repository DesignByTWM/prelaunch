import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";

/**
 * The organization and website schema on every page except the homepage.
 * Exactly what SiteChrome emits by default. See @schema/page.tsx.
 */
export default function SiteSchema() {
  return <JsonLd graph={[organizationSchema(), websiteSchema()]} />;
}
