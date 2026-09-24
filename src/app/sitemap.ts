import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { featuredBuilds } from "@/content/builds";
import { journalPosts } from "@/content/journal";
import { getLocationContent } from "@/content/locations";
import { locations, routes, site } from "@/lib/site";

/**
 * sitemap.xml
 *
 * Generated from the same content files that render the pages, so a new
 * service, build or article appears in the sitemap automatically.
 *
 * City pages are included only when their content entry is marked
 * indexable, which today means Houston alone. The other 21 are still
 * placeholders served noindex, and listing a noindexed URL in a sitemap
 * sends Google a contradictory instruction and wastes crawl budget. The
 * filter reads the same flag the page reads, so the two can never
 * disagree, and a new city is added here by flipping its flag rather than
 * by editing this file.
 *
 * Deliberately excluded:
 *   - /thank-you, which has no search value.
 *
 * Priority values are relative hints only. The ordering below reflects
 * commercial intent: service pages earn more than the journal, because a
 * service page is where a search turns into an inquiry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}${routes.services}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}${routes.designYourBuild}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}${routes.dealers}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}${routes.wheels}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}${routes.faq}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}${routes.builds}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}${routes.about}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}${routes.contact}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}${routes.locations}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}${routes.journal}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}${routes.service(service.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const buildPages: MetadataRoute.Sitemap = featuredBuilds.map((build) => ({
    url: `${site.url}${routes.builds}/${build.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const journalPages: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${site.url}${routes.journal}/${post.slug}`,
    lastModified: new Date(post.published),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /* Only cities whose content entry is marked indexable. A city with no
     content entry, or one still in review, is left out. */
  const cityPages: MetadataRoute.Sitemap = locations
    .filter((location) => getLocationContent(location.slug)?.indexable)
    .map((location) => ({
      url: `${site.url}${routes.location(location.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...core, ...servicePages, ...cityPages, ...buildPages, ...journalPages];
}
