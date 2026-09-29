import { defineField, type ObjectRule, type SlugOptions } from "sanity";
import { services } from "../../content/services";
import { LockedWhenPublished } from "../components/LockedWhenPublished";

/**
 * SHARED STUDIO FIELDS
 *
 * The pieces every Stage 2 document type is built from, so an image or a
 * slug behaves the same way in the homepage, an article and a build.
 *
 * Descriptions are written for Liz: plain English, no em dashes, no Oxford
 * commas.
 */

/** The ten service slugs, in the order services.ts declares them. */
export const SERVICE_SLUG_OPTIONS = services.map((s) => ({ title: s.name, value: s.slug }));

/** Article categories. A fixed list, so the journal cards stay consistent. */
export const ARTICLE_CATEGORIES = ["Protection", "Finish", "Fitment", "Aftercare"];

/**
 * Build discipline tags. The labels already on the site, exactly as they
 * are written today, because they drive the search on Featured Builds.
 */
export const BUILD_TAGS = [
  "Wraps",
  "Wheels",
  "Blackout",
  "Interior",
  "Audio",
  "Paint & Body",
  "Suspension",
  "Lighting",
];

/** Build vehicle types. Must match the filter pills on Featured Builds. */
export const BUILD_TYPES = ["SUV", "Sedan", "Truck", "Coupe"];

type Preview = { title: string; aspectRatio: number };

type LegacyImageValue = {
  image?: { asset?: unknown };
  alt?: string;
  legacyPath?: string;
};

/**
 * A photo that may already be on the site as a file in /public.
 *
 * `legacyPath` is set once by the migration script and never shown. It is
 * how a migrated item keeps rendering its current photo until Liz uploads a
 * replacement: the site uses the uploaded image first, then legacyPath,
 * then the code fallback.
 *
 * A photo is required unless legacyPath already covers it, so a brand new
 * article or build cannot be published without one. Alt text is required
 * whenever a photo is uploaded.
 */
export function legacyImageParts(previews: Preview[]) {
  return {
    fields: [
      defineField({
        name: "image",
        title: "Photo",
        type: "image",
        options: { hotspot: { previews } },
        description: "Empty means the site keeps its current photo. Upload to replace it.",
      }),
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe what is in the photo for search engines and screen readers.",
        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as LegacyImageValue | undefined;
            if (parent?.image?.asset && !String(value ?? "").trim()) {
              return "Add alt text whenever there is a photo.";
            }
            return true;
          }),
      }),
      defineField({
        name: "legacyPath",
        title: "Current file",
        type: "string",
        readOnly: true,
        hidden: true,
      }),
    ],
    validation: (rule: ObjectRule) =>
      rule.custom((value: unknown) => {
        const v = value as LegacyImageValue | undefined;
        if (!v?.image?.asset && !v?.legacyPath) return "Upload a photo.";
        return true;
      }),
    preview: {
      select: { media: "image", alt: "alt", legacyPath: "legacyPath" },
      prepare: ({ media, alt, legacyPath }: { media?: unknown; alt?: string; legacyPath?: string }) => ({
        title: alt || "Photo",
        subtitle: media ? "Uploaded" : legacyPath ? `Current file: ${legacyPath}` : "No photo yet",
        media: media as never,
      }),
    },
  };
}

export function legacyImageField(options: {
  name: string;
  title: string;
  description?: string;
  previews: Preview[];
}) {
  return defineField({
    name: options.name,
    title: options.title,
    type: "object",
    description: options.description,
    options: { collapsible: true, collapsed: false },
    ...legacyImageParts(options.previews),
  });
}

/**
 * The page address. Generated from the title, then locked once a published
 * version exists, because changing it would break every link to the page.
 */
export function lockedSlugField(source: SlugOptions["source"]) {
  return defineField({
    name: "slug",
    title: "Page address",
    type: "slug",
    options: { source, maxLength: 96 },
    components: { input: LockedWhenPublished },
    description:
      "The web address of this page. It is set from the title and locks once the page is published, so links to it never break.",
    validation: (rule) => rule.required(),
  });
}

/** An array of plain paragraphs. No formatting, by design. */
export function paragraphsField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [{ type: "text", rows: 4 }],
    description,
  });
}
