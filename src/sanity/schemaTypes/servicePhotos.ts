import { defineType, defineField } from "sanity";
import { COVERAGE_SLOTS, OVERVIEW_SLOT, REFERENCE_SLOTS, type SlotSpec } from "../slots";

/**
 * servicePhotos
 *
 * One document per service, holding the nine photo slots on that service
 * page. The document id is fixed as servicePhotos.{slug}, so a service can
 * never end up with two of them.
 *
 * Every slot is optional. A slot left empty falls back to the file already
 * in /public, and then to the striped placeholder, so partial progress can
 * be published safely.
 *
 * Field descriptions are written for Liz rather than for a developer.
 */

/** A slot is an image, the alt text for it, and on some slots a label. */
function slotField(slot: SlotSpec, title: string, description: string) {
  return defineField({
    name: slot.field,
    title,
    type: "object",
    description,
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: "image",
        title: "Photo",
        type: "image",
        /* The preview ratio is the real shape of this frame on the page, so
           the crop Liz sets is the crop she gets. */
        options: {
          hotspot: {
            previews: [{ title: `${title} on the page`, aspectRatio: slot.aspectRatio }],
          },
        },
        description:
          "Leave empty to keep the current photo on the site. Drag the hotspot to set what stays in frame when the photo is cropped. The crop frame is free. The previews below show the exact shape the site will display.",
      }),
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description:
          "Describe what is in the photo for search engines and screen readers.",
        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as { image?: unknown } | undefined;
            if (parent?.image && !String(value ?? "").trim()) {
              return "Add alt text whenever there is a photo in this slot.";
            }
            return true;
          }),
      }),
      ...(slot.label
        ? [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description:
                "The words printed on this card. Leave empty to keep the wording already on the site.",
            }),
          ]
        : []),
    ],
    preview: {
      select: { media: "image", subtitle: "alt" },
      prepare: ({ media, subtitle }: { media?: unknown; subtitle?: string }) => ({
        title,
        subtitle: subtitle || "No photo yet",
        media: media as never,
      }),
    },
  });
}

export const servicePhotos = defineType({
  name: "servicePhotos",
  title: "Service Photos",
  type: "document",
  fields: [
    defineField({
      name: "serviceName",
      title: "Service",
      type: "string",
      readOnly: true,
      description: "Which service page these photos appear on.",
    }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "string",
      readOnly: true,
      description: "The web address of the service page. This cannot be changed here.",
    }),

    slotField(
      OVERVIEW_SLOT,
      "Overview photo",
      "The large photo beside the opening paragraph, near the top of the page.",
    ),

    ...COVERAGE_SLOTS.map((slot, i) =>
      slotField(
        slot,
        `Coverage ${i + 1}`,
        `Card ${i + 1} of 4 in the Coverage row, partway down the page.`,
      ),
    ),

    ...REFERENCE_SLOTS.map((slot, i) =>
      slotField(
        slot,
        `Reference ${i + 1}`,
        i === 0
          ? "The tall frame on the left of the Reference block, lower down the page."
          : i === 3
            ? "The wide frame across the foot of the Reference block."
            : `The ${i === 1 ? "upper" : "lower"} frame on the right of the Reference block.`,
      ),
    ),
  ],
  preview: {
    select: { title: "serviceName", subtitle: "slug", media: "overview.image" },
  },
});
