import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

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

for (const source of filesUnder(mediaDir).filter((entry) => /\.jpe?g$/i.test(entry))) {
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

for (const source of filesUnder(mediaDir).filter((entry) => /\.mp4$/i.test(entry))) {
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
