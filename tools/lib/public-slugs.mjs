import path from "node:path";
import { fileURLToPath } from "node:url";
import { publicTransformationSlugs } from "../../api/public-transformation-slugs.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

/** @returns {string[]} */
export function readPublicTransformationSlugs() {
  return [...publicTransformationSlugs];
}

export { projectRoot };
