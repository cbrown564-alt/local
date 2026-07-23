import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(import.meta.dirname, "..");
const imageDir = path.join(root, "public", "images");
const videoDir = path.join(root, "public", "videos");
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

for (const name of fs.readdirSync(imageDir).filter((entry) => /\.jpe?g$/i.test(entry))) {
  const source = path.join(imageDir, name);
  const stem = path.basename(name, path.extname(name));

  for (const width of widths) {
    const target = path.join(imageDir, `${stem}-${width}.webp`);
    if (isCurrent(source, target)) continue;

    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(target);
    console.log(`wrote ${path.relative(root, target)}`);
  }
}

for (const name of fs.readdirSync(videoDir).filter((entry) => /\.mp4$/i.test(entry))) {
  const source = path.join(videoDir, name);
  const target = path.join(videoDir, `${path.basename(name, ".mp4")}.webm`);
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
