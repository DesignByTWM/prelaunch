import type { SchemaTypeDefinition } from "sanity";
import { servicePhotos } from "./servicePhotos";

/** Photos only. Nothing else on the site is edited from the Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [servicePhotos];
