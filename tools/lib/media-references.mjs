/**
 * One answer to "does anything actually use this asset?", shared by the deploy
 * guard and the media optimiser.
 *
 * They ask it for opposite reasons — the guard reports held files, the
 * optimiser skips them — and they used to answer it separately, which is the
 * shape of drift that docs/adr/0002 records: the same fact written down twice
 * eventually disagrees with itself.
 */

import fs from "node:fs";
import path from "node:path";

/** Source files that can carry an asset reference. */
const SOURCE_PATTERN = /\.(astro|ts|tsx|js|mjs|css|json|md)$/;

const posix = (p) => p.split(path.sep).join("/");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Collapse a file onto the master it was built from, dropping the extension and
 * any responsive-width suffix: `cupla-after-640.webp` and `cupla-after.mp4`
 * both reduce to `cupla-after`.
 */
export function logicalName(file) {
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-(?:640|1265)$/, "");
}

/** Every source file under `dir`, with its text, as [path, text] pairs. */
export function readSources(dir = "src") {
  return walk(dir)
    .filter((f) => SOURCE_PATTERN.test(f))
    .map((f) => [posix(f), fs.readFileSync(f, "utf8")]);
}

/** The same text as one haystack, for plain substring tests. */
export function readSourceText(dir = "src") {
  return readSources(dir).map(([, text]) => text).join("\n");
}

/**
 * Whether anything under src/ refers to this asset.
 *
 * Matched on the stem rather than the full path, because a reference is not
 * always written out in full: derivatives are picked by `srcset`, and video
 * paths are assembled at runtime (`${base}.mp4`), so the extension may appear
 * nowhere. The stem always does.
 */
export function isReferenced(sourceText, file) {
  return sourceText.includes(path.basename(logicalName(file)));
}
