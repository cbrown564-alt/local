#!/usr/bin/env node
/**
 * Generates ElevenLabs Sound Effects stems for the "One Day, Made Here" beds.
 *
 * Prompts and mix levels live in research/film/one-day-made-here.md.
 * Writes research/film/audio/<town>/<stem>.mp3 — then run assemble:film.
 *
 *   ELEVENLABS_API_KEY=… pnpm generate:ambience
 *   ELEVENLABS_API_KEY=… pnpm generate:ambience --town=dundrum
 *   ELEVENLABS_API_KEY=… pnpm generate:ambience --force   # overwrite existing
 */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const AUDIO_DIR = path.join(root, "research", "film", "audio");
const API_URL = "https://api.elevenlabs.io/v1/sound-generation";
const MODEL_ID = "eleven_text_to_sound_v2";
const DURATION_SECONDS = 10;
const OUTPUT_FORMAT = "mp3_44100_128";

/** @typedef {{ stem: string, text: string }} StemSpec */

/** @type {Record<string, StemSpec[]>} */
const STEMS = {
  dundrum: [
    {
      stem: "water",
      text: "very still shallow tidal water lapping gently over mudflats, close and quiet, no waves, seamless ambient loop",
    },
    {
      stem: "birds",
      text: "curlew and oystercatcher calls across a still estuary, occasional, distant, early morning, sparse seamless ambient loop",
    },
    {
      stem: "village",
      text: "quiet Irish village morning ambience, distant shop shutter, soft cup on saucer, door closing far away, sparse seamless loop",
    },
    {
      stem: "evening",
      text: "still village evening ambience, faint distant trad session through a pub door, very quiet, occasional slow car, seamless loop",
    },
  ],
  newcastle: [
    {
      stem: "surf",
      text: "steady surf washing a sandy beach, medium distance, rhythmic, no people, seamless ambient loop",
    },
    {
      stem: "gulls",
      text: "herring gulls calling over a seaside promenade, occasional, bright daytime, sparse seamless ambient loop",
    },
    {
      stem: "wind",
      text: "soft sea wind, open and empty, no whistle, seamless ambient loop",
    },
    {
      stem: "arcade",
      text: "faint seaside amusement arcade heard from outside at dusk, muffled electronic jingles and distant ride hum, very quiet, seamless loop",
    },
  ],
};

const force = process.argv.includes("--force");
const townArg = process.argv.find((arg) => arg.startsWith("--town="));
const towns = townArg ? [townArg.slice("--town=".length)] : Object.keys(STEMS);

const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY in the environment before generating.");
  process.exit(1);
}

for (const town of towns) {
  if (!STEMS[town]) {
    console.error(`Unknown town "${town}". Expected: ${Object.keys(STEMS).join(", ")}`);
    process.exit(1);
  }
}

const generateStem = async (town, spec) => {
  const dir = path.join(AUDIO_DIR, town);
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, `${spec.stem}.mp3`);
  if (fs.existsSync(target) && !force) {
    console.log(`skip ${town}/${spec.stem}.mp3 (exists; pass --force to overwrite)`);
    return;
  }

  const url = `${API_URL}?output_format=${OUTPUT_FORMAT}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text: spec.text,
      duration_seconds: DURATION_SECONDS,
      loop: true,
      model_id: MODEL_ID,
      prompt_influence: 0.4,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `ElevenLabs sound-generation failed for ${town}/${spec.stem} ` +
        `(${response.status}): ${body.slice(0, 800)}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1000) {
    throw new Error(`ElevenLabs returned a suspiciously small file for ${town}/${spec.stem}`);
  }
  fs.writeFileSync(target, buffer);
  console.log(`wrote research/film/audio/${town}/${spec.stem}.mp3 (${buffer.length} bytes)`);
};

for (const town of towns) {
  for (const spec of STEMS[town]) {
    await generateStem(town, spec);
  }
}

console.log("\nStems ready. Run: pnpm assemble:film");
