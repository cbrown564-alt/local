/**
 * Bake the Mourne skyline profile that `Shore` draws.
 *
 * `src/site/data/mourne-terrain.json` is a 224×224 heightfield — around 50k
 * numbers. `Shore` needs a silhouette, not a grid: the highest ground in each
 * longitude column, normalised to 0–1, which is what you would see looking
 * north from the bay. Baking it separately keeps the grid a build-time input
 * (docs/adr/0004) and makes the ~200 numbers the site actually draws
 * reviewable in a diff.
 *
 * Latitude is collapsed by this projection, which is why the lights on
 * `/the-lights/` are drawn as a separate register below rather than placed on
 * this line — see docs/adr/0005.
 *
 * Repeatable: `node tools/pipeline/bake-shore-profile.mjs`
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const SAMPLES = 200;

const terrainPath = path.join(projectRoot, "src/site/data/mourne-terrain.json");
const outPath = path.join(projectRoot, "src/site/data/shore-profile.json");

const terrain = JSON.parse(readFileSync(terrainPath, "utf8"));
const { width, height, heights, minHeight, maxHeight, bbox, source } = terrain;
const range = maxHeight - minHeight || 1;

const profile = [];
for (let i = 0; i < SAMPLES; i += 1) {
  const col = Math.round((i / (SAMPLES - 1)) * (width - 1));
  let peak = -Infinity;
  for (let row = 0; row < height; row += 1) {
    const v = heights[row * width + col];
    if (v > peak) peak = v;
  }
  // Three decimals is finer than a sub-pixel at any width we render at.
  profile.push(Number(((peak - minHeight) / range).toFixed(3)));
}

if (profile.length !== SAMPLES) {
  throw new Error(`expected ${SAMPLES} samples, baked ${profile.length}`);
}
if (profile.some((v) => !Number.isFinite(v) || v < 0 || v > 1)) {
  throw new Error("profile carries a value outside 0–1");
}

writeFileSync(
  outPath,
  `${JSON.stringify(
    {
      source,
      bakedFrom: "src/site/data/mourne-terrain.json",
      bakedAt: new Date().toISOString().slice(0, 10),
      bbox,
      minHeight,
      maxHeight,
      samples: SAMPLES,
      profile,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Baked ${SAMPLES} samples to src/site/data/shore-profile.json ` +
    `(${minHeight}m–${maxHeight}m).`,
);
