import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { StudioLogo } from "./src/sanity/StudioLogo";

/**
 * SANITY STUDIO
 *
 * Mounted at /studio inside the Next app. Photos and slot labels only.
 *
 * Creating and deleting servicePhotos documents is turned off. There is
 * exactly one document per service, seeded by scripts/sanity-seed-services,
 * and the list in structure.ts points at each by its fixed id. Allowing new
 * ones would only ever produce a document the site does not read.
 */
export default defineConfig({
  basePath: "/studio",
  title: "DESIGNBYTWM",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
  studio: {
    components: { logo: StudioLogo },
  },
  document: {
    actions: (prev, context) =>
      context.schemaType === "servicePhotos"
        ? prev.filter(
            (action) =>
              action.action !== "duplicate" &&
              action.action !== "delete" &&
              action.action !== "unpublish",
          )
        : prev,
    newDocumentOptions: () => [],
  },
  apiVersion,
});
