/**
 * Builds the responsive and alternate-format derivatives the site serves.
 *
 * Only for media something under src/ actually references. Held media — an
 * Omni loop judged to have worked but not yet wired to a concept, say — is
 * skipped: deriving it costs a VP9 encode nobody asked for and, worse, parks
 * unreferenced bytes at a guessable production URL, which is exactly what
 * PLAN.md section 6.1 is trying to clear. Wire the clip first, then derive.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { isReferenced, readSourceText } from "../lib/media-references.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const mediaDir = path.join(root, "public", "media");
const require = createRequire(import.meta.url);
const pnpmDir = path.join(root, "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((entry) => entry.startsWith("sharp@"));

if (!sharpDir) throw new Error("Sharp was not found. Run pnpm install first.");

const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));
const ffmpeg = require("ffmpeg-static");
const widths = [640, 1265];
const force = process.env.FORCE_MEDIA === "1";

const isCurrent = (source, target) =>
  !force && fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs;

const filesUnder = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(entryPath) : [entryPath];
  });

const sourceText = readSourceText(path.join(root, "src"));
const held = [];

/** Masters worth deriving from: referenced from src/, or explicitly forced. */
const sourcesOfType = (pattern) =>
  filesUnder(mediaDir)
    .filter((entry) => pattern.test(entry))
    .filter((entry) => {
      if (isReferenced(sourceText, entry)) return true;
      held.push(path.relative(root, entry));
      return false;
    });

for (const source of sourcesOfType(/\.jpe?g$/i)) {
  const sourceDir = path.dirname(source);
  const stem = path.basename(source, path.extname(source));

  for (const width of widths) {
    const target = path.join(sourceDir, `${stem}-${width}.webp`);
    if (isCurrent(source, target)) continue;

    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(target);
    console.log(`wrote ${path.relative(root, target)}`);
  }
}

for (const source of sourcesOfType(/\.mp4$/i)) {
  const target = path.join(
    path.dirname(source),
    `${path.basename(source, ".mp4")}.webm`,
  );
  if (isCurrent(source, target)) continue;

  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i", source,
      "-an",
      "-c:v", "libvpx-vp9",
      "-crf", "42",
      "-b:v", "0",
      "-deadline", "good",
      "-cpu-used", "4",
      "-row-mt", "1",
      "-pix_fmt", "yuv420p",
      target,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  console.log(`wrote ${path.relative(root, target)}`);
}

if (held.length > 0) {
  const listed = process.argv.includes("--held");
  console.log(
    `\nSkipped ${held.length} held master(s) — nothing under src/ references them` +
      (listed ? ":" : ". Pass --held to list them."),
  );
  if (listed) for (const file of held.sort()) console.log(`  ${file}`);
  console.log("Wire the asset to a concept, then re-run to derive it.");
}
