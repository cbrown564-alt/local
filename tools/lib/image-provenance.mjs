import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./public-slugs.mjs";

/** `## heading` in image-provenance.md → the classification it records. */
const SECTIONS = new Map([
  ["Business-owned site assets", "business"],
  ["Generated imagery", "generated"],
  ["Third-party photographs", "third-party"],
  ["Withdrawn", "withdrawn"],
]);

const IMAGE_FILE = /^[\w-]+\.(?:jpe?g|png|webp|avif)$/i;

/** `**in use.**` and friends. Anything that is not shipped reads false. */
const parseInUse = (status) => {
  const text = status.trim().toLowerCase();
  if (/^not in use\b/.test(text)) return false;
  if (/^deleted\b/.test(text)) return false;
  // A reference photograph held as evidence for a visualisation is not itself
  // concept photography, so a page rendering one would be a fault.
  if (/^source for\b/.test(text)) return false;
  if (/^in use\b/.test(text)) return true;
  return null;
};

/**
 * Parse `research/image-provenance.md` into a lookup keyed by
 * filename stem. The record is the studio's own account of how each image was
 * made, so it — not a filename convention or the page's own caption — is what
 * the journey suite tests concept pages against.
 *
 * Only the backticked filenames *before* a bullet's `**status**` name its
 * subjects; paths mentioned in the prose afterwards (held references, rejected
 * attempts, evidence files) are deliberately ignored.
 *
 * @returns {Map<string, {classification: string, inUse: boolean|null, file: string}>}
 */
export function readImageProvenance() {
  const source = readFileSync(
    path.join(projectRoot, "research", "image-provenance.md"),
    "utf8",
  );

  const records = new Map();
  let classification = null;
  let bullet = null;

  const flush = () => {
    if (!bullet || !classification) {
      bullet = null;
      return;
    }
    const [subjects, status] = bullet.split(/\*\*(.+?)\*\*/s).slice(0, 2);
    const inUse = status === undefined ? null : parseInUse(status);
    for (const [, file] of subjects.matchAll(/`([^`]+)`/g)) {
      if (!IMAGE_FILE.test(file)) continue;
      records.set(file.replace(/\.[^.]+$/, ""), { classification, inUse, file });
    }
    bullet = null;
  };

  for (const line of source.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      flush();
      classification = SECTIONS.get(heading[1]) ?? null;
      continue;
    }
    if (!classification) continue;
    if (/^\s*-\s/.test(line)) {
      flush();
      bullet = line;
    } else if (bullet && line.trim()) {
      bullet += ` ${line.trim()}`;
    } else if (bullet) {
      flush();
    }
  }
  flush();

  if (records.size === 0) {
    throw new Error("image-provenance.md yielded no records — the format has changed.");
  }
  return records;
}

/**
 * Resolve a rendered image's basename to its provenance record. Responsive
 * derivatives (`central-promenade-640.webp`) fall back to their master
 * (`central-promenade.jpg`), but only after an exact stem match fails, so a
 * genuinely numbered master like `main-street-1.jpg` still resolves to itself.
 */
export function lookupProvenance(records, basename) {
  const stem = basename.replace(/\.[^.]+$/, "");
  return records.get(stem) ?? records.get(stem.replace(/-\d+$/, "")) ?? null;
}
