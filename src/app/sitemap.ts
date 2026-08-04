import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { featuredBuilds } from "@/content/builds";
import { journalPosts } from "@/content/journal";
import { routes, site } from "@/lib/site";

/**
 * sitemap.xml
 *
 * Generated from the same content files that render the pages, so a new
 * service, build or article appears in the sitemap automatically.
 *
 * Deliberately excluded:
 *   - the 22 city pages, which are noindex until real content is written.
 *     Listing a noindexed URL in a sitemap sends Google a contradictory
 *     instruction and wastes crawl budget.
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

  return [...core, ...servicePages, ...buildPages, ...journalPages];
}
