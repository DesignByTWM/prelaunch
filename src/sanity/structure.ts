import type { StructureResolver } from "sanity/structure";
import { services } from "../content/services";
import { servicePhotosId } from "./slots";

/**
 * STUDIO STRUCTURE
 *
 * One list, "Service Photos", holding the ten services in the order they
 * are declared in services.ts. That order is the same one the site uses,
 * so the Studio list reads the way the site does.
 *
 * Each entry opens its own fixed document. Nothing in here creates a
 * document, so the list can never grow a duplicate or an orphan.
 */
export const structure: StructureResolver = (S) =>
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
    );
