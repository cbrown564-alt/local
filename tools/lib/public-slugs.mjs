import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

/** @returns {string[]} */
export function readTransformationCandidateSlugs() {
  const source = readFileSync(
    path.join(projectRoot, "src", "site", "data", "transformations.ts"),
    "utf8",
  );
  const match = source.match(
    /export const transformationCandidates[^=]*=\s*\[([\s\S]*?)\]\s*;/,
  );
  if (!match) {
    throw new Error("Could not find transformationCandidates in transformations.ts");
  }
  return [...match[1].matchAll(/slug:\s*"([^"]+)"/g)].map((entry) => entry[1]);
}

/** @returns {string[]} */
export function readPublicTransformationSlugs() {
  const source = readFileSync(
    path.join(projectRoot, "src", "site", "data", "transformations.ts"),
    "utf8",
  );
  const match = source.match(
    /export const publicTransformationSlugs[^=]*=\s*\[([\s\S]*?)\]\s*(?:as const)?;/,
  );
  if (!match) {
    throw new Error("Could not find publicTransformationSlugs in transformations.ts");
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

export { projectRoot };
