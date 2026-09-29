import type { StructureResolver } from "sanity/structure";
import { services } from "../content/services";
import { servicePhotosId } from "./slots";

/**
 * STUDIO STRUCTURE
 *
 * Four sections, in the order the site reads:
 *
 *   Homepage         one fixed document
 *   Journal          articles, newest first
 *   Featured Builds  builds, in their position order
 *   Service Photos   the ten services, in services.ts order
 *
 * Homepage and Service Photos open fixed documents, so they can never grow
 * a duplicate or an orphan. Journal and Featured Builds are lists where Liz
 * can add new entries.
 */

export const HOMEPAGE_ID = "homepage";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("DESIGNBYTWM")
    .items([
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId(HOMEPAGE_ID).title("Homepage")),

      S.listItem()
        .id("journal")
        .title("Journal")
        .child(
          S.documentTypeList("article")
            .title("Journal")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),

      S.listItem()
        .id("builds")
        .title("Featured Builds")
        .child(
          S.documentTypeList("build")
            .title("Featured Builds")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .id("servicePhotos")
        .title("Service Photos")
        .child(
          S.list()
            .title("Service Photos")
            .items(
              services.map((service) =>
                S.listItem()
                  .id(service.slug)
                  .title(service.name)
                  .child(
                    S.document()
                      .schemaType("servicePhotos")
                      .documentId(servicePhotosId(service.slug))
                      .title(service.name),
                  ),
              ),
            ),
        ),
    ]);
