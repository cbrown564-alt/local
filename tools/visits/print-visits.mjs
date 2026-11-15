/**
 * Print /for/ visit counts from the production D1 database.
 * Requires a logged-in `cf` CLI (`cf auth login`).
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = readFileSync(path.join(root, "cloudflare.config.ts"), "utf8");
const match = config.match(/bindings\.d1\(\s*\{\s*name:\s*"mournemade-visits",\s*id:\s*"([0-9a-f-]+)"/);
if (!match) {
  console.error("Could not find the mournemade-visits D1 id in cloudflare.config.ts.");
  process.exit(1);
}
const sql = readFileSync(path.join(root, "scripts/visits.sql"), "utf8");
const result = spawnSync("pnpm", ["exec", "cf", "d1", "query", match[1], `--sql=${sql}`], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});
process.exit(result.status ?? 1);
