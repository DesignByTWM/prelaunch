import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { article } from "./article";
import { build } from "./build";
import { servicePhotos } from "./servicePhotos";

/**
 * Stage 2: the homepage hero, the journal, featured builds and service
 * photos. Nothing else on the site is edited from the Studio.
 */
export const schemaTypes: SchemaTypeDefinition[] = [homepage, article, build, servicePhotos];
