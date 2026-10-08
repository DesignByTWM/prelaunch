import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { reviews } from "@/content/reviews";

/**
 * The homepage's organization and website schema.
 *
 * The homepage is the only page where the reviews are visible, so it is
 * the only page whose business node carries them. They go inside the one
 * full AutoBodyShop node, not a second partial node with the same @id.
 */
export default function HomeSchema() {
  return <JsonLd graph={[organizationSchema({ reviews }), websiteSchema()]} />;
}
