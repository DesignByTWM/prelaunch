import { defineArrayMember, defineField, defineType } from "sanity";
import {
  BUILD_TAGS,
  BUILD_TYPES,
  SERVICE_SLUG_OPTIONS,
  legacyImageField,
  legacyImageParts,
  lockedSlugField,
  paragraphsField,
} from "./fields";

/**
 * build
 *
 * A featured build. Migrated builds have the id build-{slug}.
 *
 * `order` decides where a build appears. The homepage shows the first three
 * and the Featured Builds page lists them all in this order, which is Liz's
 * order rather than a date.
 */
export const build = defineType({
  name: "build",
  title: "Featured build",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Build name",
      type: "string",
      description: "The name of the build, for example Satin Black.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "vehicle",
      title: "Vehicle",
      type: "string",
      description: "Make and model, for example Mercedes-AMG G 63.",
      validation: (rule) => rule.required(),
    }),
    lockedSlugField((doc) => [doc.vehicle, doc.title].filter(Boolean).join(" ")),
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      description: "1 is first. The homepage shows positions 1 to 3.",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "type",
      title: "Vehicle type",
      type: "string",
      options: { list: BUILD_TYPES, layout: "radio", direction: "horizontal" },
      description: "Used by the filter buttons on the Featured Builds page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      description: "One sentence under the build name.",
      validation: (rule) => rule.required(),
    }),
    legacyImageField({
      name: "hero",
      title: "Main photo",
      description: "Shown on the build cards and when the build is shared.",
      previews: [
        { title: "Homepage and More Work cards", aspectRatio: 16 / 9 },
        { title: "Featured Builds card", aspectRatio: 4 / 5 },
      ],
    }),
    defineField({
      name: "tags",
      title: "Disciplines",
      type: "array",
      of: [{ type: "string" }],
      options: { list: BUILD_TAGS },
      description: "The disciplines on the card. They also drive the search on Featured Builds.",
      validation: (rule) => rule.required().min(1),
    }),
    paragraphsField(
      "brief",
      "The brief",
      "Why these disciplines were planned together. Plain text only.",
    ),
    defineField({
      name: "stages",
      title: "Stages",
      type: "array",
      description: "Each discipline in the build, in the order it was done.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stage",
          fields: [
            defineField({
              name: "discipline",
              title: "Discipline",
              type: "string",
              description: "As it should read, for example Vehicle Wraps.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Service page",
              type: "string",
              options: { list: SERVICE_SLUG_OPTIONS },
              description: "The service page this stage links to.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "detail",
              title: "What was done",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "discipline", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 2,
      description: "One sentence closing the build.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description: "Between 2 and 8 photos, in an even number so the two column gallery never has a gap.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryPhoto",
          ...legacyImageParts([{ title: "Gallery frame", aspectRatio: 4 / 5 }]),
        }),
      ],
      validation: (rule) =>
        rule
          .min(2)
          .max(8)
          .custom((items) =>
            Array.isArray(items) && items.length % 2 !== 0
              ? "Use an even number of photos, so the gallery has no gap."
              : true,
          ),
    }),
  ],
  orderings: [
    { title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "vehicle", media: "hero.image" },
  },
});
