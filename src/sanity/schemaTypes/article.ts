import { defineArrayMember, defineField, defineType } from "sanity";
import {
  ARTICLE_CATEGORIES,
  SERVICE_SLUG_OPTIONS,
  legacyImageField,
  lockedSlugField,
  paragraphsField,
} from "./fields";

/**
 * article
 *
 * A journal post. Migrated posts have the id article-{slug}. Posts Liz
 * creates in the Studio get an id from Sanity, which is also dotless.
 *
 * The body is plain paragraphs under headings, never formatted text. Each
 * section renders as a real heading followed by its paragraphs, which is
 * what lets an answer engine lift one section as the answer to one
 * question. Formatting would break that structure.
 */
export const article = defineType({
  name: "article",
  title: "Journal article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The headline of the article. Write it as the question a reader would search for.",
      validation: (rule) => rule.required(),
    }),
    lockedSlugField("title"),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "One or two sentences. Shown on the journal cards and in search results. Aim for 140 to 160 characters.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ARTICLE_CATEGORIES, layout: "radio", direction: "horizontal" },
      description: "The label shown above the title on the journal cards.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      description: "Written as it should appear, for example 6 min.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "date",
      description: "The newest article leads the journal page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      type: "date",
      description:
        "Only fill this in after a real revision. Search engines read it as the date the article last changed. Leave empty to use the published date.",
    }),
    legacyImageField({
      name: "hero",
      title: "Main photo",
      description:
        "Shown on the journal page and when the article is shared. It is not shown inside the article itself.",
      previews: [
        { title: "Featured article", aspectRatio: 16 / 10 },
        { title: "Journal card", aspectRatio: 4 / 5 },
        { title: "Link preview when shared", aspectRatio: 1.91 },
      ],
    }),
    paragraphsField(
      "intro",
      "Opening paragraphs",
      "The paragraphs before the first heading. Plain text only.",
    ),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Each section is a heading and its paragraphs. Write each heading as a question or a clear topic, so it can be quoted on its own.",
      of: [
        defineArrayMember({
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            paragraphsField("body", "Paragraphs", "Plain text only."),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),
    defineField({
      name: "takeaway",
      title: "The short version",
      type: "text",
      rows: 4,
      description: "The closing summary shown under the heading The short version.",
    }),
    defineField({
      name: "related",
      title: "Related services",
      type: "array",
      of: [{ type: "string" }],
      options: { list: SERVICE_SLUG_OPTIONS },
      description: "The service pages linked at the foot of the article.",
    }),
    defineField({
      name: "faqs",
      title: "Questions and answers",
      type: "array",
      description:
        "Short questions answered in a sentence or two. They appear under the article and in search results.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "hero.image" },
  },
});
