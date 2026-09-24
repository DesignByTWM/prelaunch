"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * /studio
 *
 * The Sanity Studio, mounted inside the app.
 *
 * A client component, because the Studio is a React application that builds
 * its interface with context in the browser. Evaluating it on the server
 * fails. The metadata for the route, including the noindex, sits in the
 * layout beside this file, since a client component cannot export it.
 *
 * The catch all segment lets the Studio own its own routing under /studio
 * without a page per tool.
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
