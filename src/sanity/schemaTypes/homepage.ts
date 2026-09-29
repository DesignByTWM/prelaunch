import { defineField, defineType } from "sanity";
import { legacyImageField } from "./fields";

/**
 * homepage
 *
 * One document, fixed id `homepage`, created by the migration script.
 * Creating and deleting it is turned off in sanity.config.ts.
 *
 * Only the promotional parts of the hero are here. The headline, "Not a
 * shop. The Automotive Customization House.", and the button's destination
 * stay locked in code: the headline is the brand line used across the
 * site, in schema, in the confirmation email and in llms.txt, so it must
 * not drift on one page.
 *
 * The hero photo is shown uncropped and positioned by the hotspot, because
 * it fills the whole screen at every shape from a tall phone to a wide
 * desktop. The previews are those shapes.
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small line above the headline",
      type: "string",
      description: "The short line in capitals above the headline.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subline",
      title: "Paragraph under the headline",
      type: "text",
      rows: 4,
      description: "The sentence under the headline. The headline itself cannot be changed here.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button wording",
      type: "string",
      description: "The words on the hero button. Where the button goes cannot be changed here.",
      validation: (rule) => rule.required(),
    }),
    legacyImageField({
      name: "hero",
      title: "Hero photo",
      description:
        "The full screen photo at the top of the homepage. It is never cropped to one shape. The hotspot decides what stays in view on a phone and on a wide screen.",
      previews: [
        { title: "Desktop", aspectRatio: 1.85 },
        { title: "Wide desktop", aspectRatio: 2.46 },
        { title: "Phone", aspectRatio: 0.55 },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
