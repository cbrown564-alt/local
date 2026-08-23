import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { cwd } from "node:process";
import { glob } from "node:fs/promises";

const root = cwd();
const files = [];
for await (const file of glob("src/concepts/**/*.astro", { cwd: root })) {
  files.push(file);
}
const legacy = new Set([
  "src/concepts/arley-house/components/AhVillageMap.astro",
  "src/concepts/kelly-mcevoy-brown/home.astro",
]);
const failures = [];

for (const file of files) {
  const source = await readFile(join(root, file), "utf8");
  if (!/(?:import\s+MapPlate|<MapPlate\b)/.test(source)) continue;
  if (legacy.has(file)) continue;
  failures.push(file);
}

if (failures.length) {
  console.error("Generated map guard failed: do not add hand-drawn SVG maps.");
  console.error("Use src/concepts/_shell/GeneratedMapPlate.astro with an AI-generated raster instead:");
  for (const file of failures) console.error(`- ${relative(root, join(root, file))}`);
  process.exit(1);
}

console.log(`Generated map guard passed (${files.length} concept Astro files scanned).`);
