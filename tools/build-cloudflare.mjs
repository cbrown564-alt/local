import { writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const mode = process.argv[2] ?? "migration-preview";
if (!["production", "migration-preview"].includes(mode)) throw new Error(`Unknown mode: ${mode}`);
const run = args => {
  const result = spawnSync("pnpm", args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run(["check:cloudflare"]);
run(["build"]);
// Generated provider files belong in dist; public remains the source boundary.
writeFileSync("dist/_headers", `${mode === "migration-preview" ? "/*\n  X-Robots-Tag: noindex, nofollow\n\n" : ""}/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
writeFileSync("dist/_redirects", [
  "/prototypes/what-we-look-for/ /where-it-fails/ 301",
  "/what-we-look-for/ /where-it-fails/ 301",
  "/how-a-site-goes-together/ /how-its-made/ 301",
  "/five-shapes/ /why-its-yours/ 301",
].join("\n") + "\n");
let files = 0;
const walk = directory => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else {
      if (statSync(file).size > 25 * 1024 * 1024) throw new Error(`Asset exceeds 25 MiB: ${file}`);
      files++;
    }
  }
};
walk("dist");
console.log(`Cloudflare assets: ${files} files, each within 25 MiB`);
run(["exec", "cf-wrangler", "build", "--mode", mode]);
