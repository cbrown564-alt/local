#!/usr/bin/env node
/**
 * Assembles the "One Day, Made Here" town hero films.
 *
 * Gemini Omni clip exports go in research/film/clips/<town>/ with a two-digit
 * order prefix (01-….mp4 … 06-….mp4, any codec). ElevenLabs ambience stems go
 * in research/film/audio/<town>/. The full treatment and generation prompts
 * live in research/film/one-day-made-here.md.
 *
 * Per town with clips present this writes:
 *   public/media/home/<town>-film.mp4 / .webm          full arc, seamless loop
 *   public/media/home/<town>-film-mobile.mp4 / .webm   dusk pair, lighter
 *   public/media/home/<town>-film-poster.jpg           dusk frame master
 *   public/media/home/<town>-film-poster-{640,1265}.webp
 *   public/media/home/<town>-ambience.mp3              only when stems exist
 *
 *   node tools/pipeline/assemble-hero-film.mjs            assemble towns with clips
 *   node tools/pipeline/assemble-hero-film.mjs --demo     fill gaps with stand-in clips
 *
 * --demo synthesises tone-graded stand-in clips for any missing shot so the
 * hero can be reviewed end-to-end before the Gemini renders exist. Stand-ins
 * must never deploy: rerun without --demo (or delete public/media/home/) once
 * real clips land. Demo clips are marked via research/film/clips/<town>/.demo.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(import.meta.dirname, "..", "..");
const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const pnpmDir = path.join(root, "node_modules", ".pnpm");
const sharpDir = fs
  .readdirSync(pnpmDir)
  .find((entry) => entry.startsWith("sharp@"));
if (!sharpDir) throw new Error("Sharp was not found. Run pnpm install first.");
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

const TOWNS = ["dundrum", "newcastle"];
const CLIP_SECONDS = 8;
const XFADE_SECONDS = 0.8;
const FPS = 30;
const MASTER_WIDTH = 1920;
const MASTER_HEIGHT = 1080;
const MOBILE_WIDTH = 1280;
const MOBILE_HEIGHT = 720;
const AMBIENCE_SECONDS = 60;

const CLIPS_DIR = path.join(root, "research", "film", "clips");
const AUDIO_DIR = path.join(root, "research", "film", "audio");
const OUT_DIR = path.join(root, "public", "media", "home");
const DEMO = process.argv.includes("--demo");

const run = (args, label) => {
  try {
    execFileSync(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString() : String(error);
    throw new Error(`ffmpeg failed while ${label}:\n${stderr.slice(-1600)}`);
  }
};

/** Dawn-to-dusk colour pairs for --demo stand-ins, per town bias. */
const DEMO_SHOTS = {
  dundrum: [
    ["0x0b1420", "0x2c3a4a"], // pre-dawn mist
    ["0x2c3a4a", "0xa8874e"], // first light on the flats
    ["0x8fa5a0", "0xd9c9a8"], // morning main street
    ["0x6f8f9f", "0xdfe8e4"], // midday bay glitter
    ["0xb07f3f", "0x4d5347"], // golden hour castle
    ["0x10182b", "0xb97e49"], // blue-hour windows
  ],
  newcastle: [
    ["0x04070f", "0x1a2c40"], // pre-dawn surf
    ["0x1a2c40", "0xc98d6b"], // rose on the ridge
    ["0x7f9ab5", "0xe0d3b5"], // promenade morning
    ["0x4f7fa8", "0xd7e6ee"], // midday beach
    ["0xc98d4b", "0x5c4a6b"], // harbour gold
    ["0x0a1122", "0xc9763f"], // arcade dusk
  ],
};

/** Write one stand-in clip; falls back to a flat wash if gradients misbehave. */
const synthesizeDemoClip = (target, [from, to]) => {
  const common = [
    "-vf",
    "noise=alls=5:allf=t,vignette=PI/5,format=yuv420p",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "20",
    "-t",
    String(CLIP_SECONDS),
    target,
  ];
  try {
    run(
      [
        "-y",
        "-f",
        "lavfi",
        "-i",
        `gradients=s=${MASTER_WIDTH}x${MASTER_HEIGHT}:c0=${from}:c1=${to}:speed=0.02:d=${CLIP_SECONDS}:r=${FPS}`,
        ...common,
      ],
      `synthesising ${path.basename(target)}`,
    );
  } catch {
    run(
      [
        "-y",
        "-f",
        "lavfi",
        "-i",
        `color=${from}:s=${MASTER_WIDTH}x${MASTER_HEIGHT}:d=${CLIP_SECONDS}:r=${FPS}`,
        ...common,
      ],
      `synthesising flat stand-in ${path.basename(target)}`,
    );
  }
};

const listClips = (town) => {
  const dir = path.join(CLIPS_DIR, town);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /^\d{2}.*\.(mp4|mov|webm|mkv)$/i.test(name))
    .sort()
    .map((name) => path.join(dir, name));
};

/** Every clip becomes exactly CLIP_SECONDS of 1080p30 yuv420p h264, no audio. */
const normalizeClip = (source, target) => {
  run(
    [
      "-y",
      "-i",
      source,
      "-vf",
      `scale=${MASTER_WIDTH}:${MASTER_HEIGHT}:force_original_aspect_ratio=increase,` +
        `crop=${MASTER_WIDTH}:${MASTER_HEIGHT},fps=${FPS},` +
        `tpad=stop_mode=clone:stop_duration=${CLIP_SECONDS},format=yuv420p`,
      "-t",
      String(CLIP_SECONDS),
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "18",
      target,
    ],
    `normalising ${path.basename(source)}`,
  );
};

/**
 * Crossfade a sequence of normalised clips into one looping whole. The first
 * input is appended again at the end so the last frame dissolves back into
 * the opener — the loop point reads as "tomorrow".
 */
const buildLoop = (clips, target, { width, height, crf }) => {
  const inputs = [...clips, clips[0]];
  const args = ["-y"];
  for (const input of inputs) args.push("-i", input);

  const parts = inputs.map((_, i) => `[${i}:v]settb=AVTB[v${i}]`);
  const offsets = [];
  let running = CLIP_SECONDS;
  let label = "v0";
  for (let t = 1; t < inputs.length; t += 1) {
    const offset = running - XFADE_SECONDS;
    offsets.push(offset);
    const out = t === inputs.length - 1 ? "vout" : `vx${t}`;
    parts.push(
      `[${label}][v${t}]xfade=transition=fade:duration=${XFADE_SECONDS}:offset=${offset.toFixed(3)}[${out}]`,
    );
    running += CLIP_SECONDS - XFADE_SECONDS;
    label = out;
  }
  const scale = `[vout]scale=${width}:${height}[vscaled]`;

  run(
    [
      ...args,
      "-filter_complex",
      `${parts.join(";")};${scale}`,
      "-map",
      "[vscaled]",
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      String(crf),
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      target,
    ],
    `crossfading ${path.basename(target)}`,
  );

  // Midpoint of the last real clip's fully-visible window — the dusk frame.
  const enterDusk = offsets[offsets.length - 2] + XFADE_SECONDS;
  const leaveDusk = offsets[offsets.length - 1];
  const duskAt = (enterDusk + leaveDusk) / 2;
  console.log(`  dusk frame at ${duskAt.toFixed(2)}s in ${path.basename(target)}`);
  return duskAt;
};

const toWebm = (source, target) => {
  run(
    [
      "-y",
      "-i",
      source,
      "-an",
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "42",
      "-b:v",
      "0",
      "-deadline",
      "good",
      "-cpu-used",
      "4",
      "-row-mt",
      "1",
      "-pix_fmt",
      "yuv420p",
      target,
    ],
    `encoding ${path.basename(target)}`,
  );
};

const writePoster = async (master, duskAt, stem) => {
  const frame = path.join(os.tmpdir(), `${stem}-frame.png`);
  // Output seek, not input seek: decodes up to the timestamp but is exact.
  // Input seeking landed on the wrong frame against freshly encoded masters.
  run(
    ["-y", "-i", master, "-ss", duskAt.toFixed(2), "-frames:v", "1", frame],
    "extracting the dusk frame",
  );
  await sharp(frame)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(OUT_DIR, `${stem}.jpg`));
  for (const width of [640, 1265]) {
    await sharp(frame)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(path.join(OUT_DIR, `${stem}-${width}.webp`));
  }
  fs.unlinkSync(frame);
};

/** ElevenLabs stems per town: file, level, and when it enters the bed. */
const AMBIENCE_MIX = {
  dundrum: [
    { stem: "water", gainDb: -6, from: 0 },
    { stem: "birds", gainDb: -10, from: 0 },
    { stem: "village", gainDb: -16, from: 0 },
    { stem: "evening", gainDb: -14, from: AMBIENCE_SECONDS / 2 },
  ],
  newcastle: [
    { stem: "surf", gainDb: -6, from: 0 },
    { stem: "gulls", gainDb: -12, from: 0 },
    { stem: "wind", gainDb: -14, from: 0 },
    { stem: "arcade", gainDb: -16, from: AMBIENCE_SECONDS / 2 },
  ],
};

const findStem = (town, stem) => {
  const dir = path.join(AUDIO_DIR, town);
  if (!fs.existsSync(dir)) return null;
  const name = fs
    .readdirSync(dir)
    .find((entry) => new RegExp(`^${stem}.*\\.(mp3|wav|m4a|ogg)$`, "i").test(entry));
  return name ? path.join(dir, name) : null;
};

const mixAmbience = (town, target) => {
  const parts = AMBIENCE_MIX[town]
    .map((spec) => ({ ...spec, file: findStem(town, spec.stem) }))
    .filter((spec) => spec.file);
  if (parts.length === 0) return false;

  const args = ["-y"];
  for (const part of parts) args.push("-stream_loop", "-1", "-i", part.file);
  const chains = parts.map((part, i) => {
    const delay = Math.round(part.from * 1000);
    const delayFilter = delay > 0 ? `,adelay=${delay}|${delay}` : "";
    return `[${i}:a]volume=${part.gainDb}dB${delayFilter}[a${i}]`;
  });
  const inputs = parts.map((_, i) => `[a${i}]`).join("");
  const fadeOutStart = AMBIENCE_SECONDS - 1.5;
  const graph =
    `${chains.join(";")};${inputs}amix=inputs=${parts.length}:normalize=0,` +
    `loudnorm,afade=t=in:st=0:d=1.5,afade=t=out:st=${fadeOutStart}:d=1.5[aout]`;

  run(
    [
      ...args,
      "-filter_complex",
      graph,
      "-map",
      "[aout]",
      "-t",
      String(AMBIENCE_SECONDS),
      "-c:a",
      "libmp3lame",
      "-q:a",
      "4",
      target,
    ],
    `mixing ${path.basename(target)}`,
  );
  return true;
};

const assembleTown = async (town) => {
  const townClipsDir = path.join(CLIPS_DIR, town);
  const demoMarker = path.join(townClipsDir, ".demo");

  if (DEMO && fs.existsSync(townClipsDir) === false) fs.mkdirSync(townClipsDir, { recursive: true });
  if (DEMO) {
    DEMO_SHOTS[town].forEach((palette, index) => {
      const name = `${String(index + 1).padStart(2, "0")}-demo.mp4`;
      const target = path.join(townClipsDir, name);
      if (fs.existsSync(target) || listClips(town).some((c) => path.basename(c).startsWith(name.slice(0, 2)))) return;
      synthesizeDemoClip(target, palette);
      console.log(`synthesised stand-in research/film/clips/${town}/${name}`);
    });
    if (!fs.existsSync(demoMarker)) fs.writeFileSync(demoMarker, "stand-in clips — replace before deploy\n");
  }

  const clips = listClips(town);
  if (clips.length === 0) {
    console.log(`${town}: no clips in research/film/clips/${town}/ — skipping`);
    return;
  }
  if (clips.length < 2) {
    console.log(`${town}: need at least two clips to crossfade — skipping`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `mm-film-${town}-`));
  const normalised = clips.map((clip, index) => {
    const target = path.join(tmp, `${String(index).padStart(2, "0")}.mp4`);
    normalizeClip(clip, target);
    return target;
  });
  console.log(`${town}: normalised ${clips.length} clip(s)`);

  const master = path.join(OUT_DIR, `${town}-film.mp4`);
  const duskAt = buildLoop(normalised, master, {
    width: MASTER_WIDTH,
    height: MASTER_HEIGHT,
    crf: 23,
  });
  console.log(`wrote ${path.relative(root, master)}`);

  toWebm(master, path.join(OUT_DIR, `${town}-film.webm`));
  console.log(`wrote public/media/home/${town}-film.webm`);

  const mobilePair = [normalised[normalised.length - 2], normalised[normalised.length - 1]];
  const mobile = path.join(OUT_DIR, `${town}-film-mobile.mp4`);
  buildLoop(mobilePair, mobile, { width: MOBILE_WIDTH, height: MOBILE_HEIGHT, crf: 26 });
  console.log(`wrote ${path.relative(root, mobile)}`);
  toWebm(mobile, path.join(OUT_DIR, `${town}-film-mobile.webm`));
  console.log(`wrote public/media/home/${town}-film-mobile.webm`);

  await writePoster(master, duskAt, `${town}-film-poster`);
  console.log(`wrote public/media/home/${town}-film-poster.{jpg,-640.webp,-1265.webp}`);

  if (mixAmbience(town, path.join(OUT_DIR, `${town}-ambience.mp3`))) {
    console.log(`wrote public/media/home/${town}-ambience.mp3`);
  } else {
    console.log(`${town}: no ElevenLabs stems in research/film/audio/${town}/ — sound toggle stays off`);
  }

  fs.rmSync(tmp, { recursive: true, force: true });
};

for (const town of TOWNS) {
  await assembleTown(town);
}

if (DEMO) {
  console.log(
    "\nDemo stand-ins are in place. Review the hero, then replace " +
      "research/film/clips/<town>/ with Gemini Omni renders and rerun without --demo.",
  );
}
