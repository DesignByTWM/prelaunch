import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { StudioLogo } from "./src/sanity/StudioLogo";

/**
 * SANITY STUDIO
 *
 * Mounted at /studio inside the Next app.
 *
 * FIXED DOCUMENTS. The homepage and the ten servicePhotos documents each
 * have exactly one document at a fixed id, which structure.ts opens
 * directly. Creating, duplicating, deleting and unpublishing them is turned
 * off. A second one would only ever be a document the site does not read,
 * and an unpublished one would take the homepage hero offline.
 *
 * LISTS. Articles and builds are real lists: Liz can add new ones. They are
 * the only two types offered when creating a document.
 */

const FIXED_TYPES = new Set(["homepage", "servicePhotos"]);
const CREATABLE_TYPES = new Set(["article", "build"]);

export default defineConfig({
  basePath: "/studio",
  title: "DESIGNBYTWM",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    /* No template for the fixed types, so nothing can create a second. */
    templates: (prev) => prev.filter((template) => !FIXED_TYPES.has(template.schemaType)),
  },
  plugins: [structureTool({ structure })],
  studio: {
    components: { logo: StudioLogo },
  },
  document: {
    actions: (prev, context) =>
      FIXED_TYPES.has(context.schemaType)
        ? prev.filter(
            (action) =>
              action.action !== "duplicate" &&
              action.action !== "delete" &&
              action.action !== "unpublish",
          )
        : prev,
    newDocumentOptions: (prev) =>
      prev.filter((item) => CREATABLE_TYPES.has(item.templateId)),
  },
  apiVersion,
});
