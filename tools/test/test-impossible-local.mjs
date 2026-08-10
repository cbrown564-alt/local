import { readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (message, condition) => {
  if (!condition) failures.push(message);
};

const page = read("src/pages/prototypes/impossible-local/index.astro");
const shell = read("src/prototypes/impossible-local/ImpossibleLocalShell.astro");
const journey = read("src/prototypes/impossible-local/journey.ts");
const client = read("src/prototypes/impossible-local/client.ts");
const css = read("src/prototypes/impossible-local/impossible-local.css");
const sources = read("research/prototypes/impossible-local/SOURCES.md");
const profilePath = path.join(
  root,
  "src/prototypes/impossible-local/route-profile.json",
);
const profile = JSON.parse(readFileSync(profilePath, "utf8"));

check("prototype shell must be noindex", /robots="noindex, nofollow"/.test(shell));
check("Canvas must be decorative", /data-terrain-canvas aria-hidden="true"/.test(page));
check("SVG terrain fallback is missing", /data-terrain-fallback/.test(page));
check("workshop form is missing", /data-workshop-form/.test(page));
check("form must say nothing is sent", /Nothing is sent or stored/.test(page));
check("renderer failure path is missing", /renderer.*off/.test(client));
check("reduced-motion branch is missing", /prefers-reduced-motion: reduce/.test(css));
check("source and limits block is missing", /id="sources"/.test(page));
check("source record is missing the promotion boundary", /Promotion boundary/.test(sources));
check("route profile exceeds the 25 KB target before compression", statSync(profilePath).size < 25_000);
check("route profile must contain 121 samples", profile.samples.length === 121);
check("public route samples must omit latitude", profile.samples.every((sample) => !("lat" in sample)));
check("public route samples must omit longitude", profile.samples.every((sample) => !("lon" in sample)));
check("route source must name AWS Open Data", /AWS Open Data/.test(profile.source));

for (const id of ["street", "forest", "high-ground", "descent", "workshop"]) {
  check(`journey chapter ${id} is missing`, journey.includes(`id: "${id}"`));
}

check("existing Mourne Cycles renderer must not be reused", !/McRidgeline|mc-ridgeline/.test(page + journey + client + css));
check("Lit Town renderer must not be reused", !/lit-town|LitTown/.test(page + journey + client + css));
check("generated media must not be loaded by the prototype", !/media-sprint|generated-/.test(page + journey + client + css));

if (failures.length) {
  console.error(`Impossible local verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Impossible local verification passed: five chapters, ${profile.samples.length} terrain samples, renderer fallback, reduced motion and complete enquiry handoff.`,
);
