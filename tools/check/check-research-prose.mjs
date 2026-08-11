import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const researchRoot = path.join(projectRoot, "research");

const BINARY_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".mp4",
  ".mp3",
  ".webm",
  ".wav",
  ".gif",
]);

/** research/ holds prose and manifests only — binaries belong under media/.
 *  See research/reorganisation-plan.md. */
function findBinaries(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const full = path.join(dir, entry);
    const info = statSync(full);
    if (info.isDirectory()) {
      found.push(...findBinaries(full));
    } else if (BINARY_EXTENSIONS.has(path.extname(entry).toLowerCase())) {
      found.push(path.relative(projectRoot, full));
    }
  }
  return found;
}

let offenders = [];
try {
  offenders = findBinaries(researchRoot);
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}

if (offenders.length) {
  console.error(
    `Research prose check failed: binaries found under research/.\n` +
      `Move these under media/ instead — research/ is prose and manifests only:\n- ${offenders.join("\n- ")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Research prose check passed: no binaries under research/.");
}
