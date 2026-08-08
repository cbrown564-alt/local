#!/usr/bin/env node
/**
 * Studio bakeoff audio — VO + Foley for X6–X9, X17, X18, X26.
 *
 * Cast from research/film/clips/studio/voice-bakeoff/roster.json.
 * Scripts from research/film/studio-media-experiments.md.
 *
 *   node --env-file=.env tools/pipeline/generate-studio-audio.mjs
 *   node --env-file=.env tools/pipeline/generate-studio-audio.mjs --only=X8,X17,X18
 *   node --env-file=.env tools/pipeline/generate-studio-audio.mjs --only=X6 --force
 *   node --env-file=.env tools/pipeline/generate-studio-audio.mjs --stems-only
 *   node --env-file=.env tools/pipeline/generate-studio-audio.mjs --mix-only --only=X6,X9
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(import.meta.dirname, "..", "..");
const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const OUT_DIR = path.join(root, "research", "film", "clips", "studio", "audio");
const ROSTER_PATH = path.join(
  root,
  "research",
  "film",
  "clips",
  "studio",
  "voice-bakeoff",
  "roster.json",
);

const TTS_MODEL = "eleven_multilingual_v2";
const SFX_MODEL = "eleven_text_to_sound_v2";
const OUTPUT_FORMAT = "mp3_44100_128";

const argv = process.argv.slice(2);
const force = argv.includes("--force");
const stemsOnly = argv.includes("--stems-only");
const mixOnly = argv.includes("--mix-only");
const onlyArg = argv.find((a) => a.startsWith("--only="));
const only = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean),
    )
  : null;

const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY (e.g. node --env-file=.env …).");
  process.exit(1);
}

const roster = JSON.parse(fs.readFileSync(ROSTER_PATH, "utf8"));
const assignments = roster.assignments ?? {};

const voiceEntry = (key) => {
  const entry = roster.created?.[key] || roster.controls?.[key];
  if (!entry?.voice_id) throw new Error(`Unknown voice key "${key}" in roster`);
  return { key, name: entry.name, voice_id: entry.voice_id };
};

const assigned = (slot, fallback) => voiceEntry(assignments[slot] || fallback);

const CAST = {
  visitor: assigned("X6_VISITOR", "harbour-whisper"),
  bot: assigned("X6_BOT", "consent-bot"),
  narrator: assigned("X6_NARRATOR", "slate-narrator"),
  proverb: assigned("X8_VOICE", "slate-narrator"),
  owner: assigned("X17_OWNER", "harbour-brass"),
  heard: assigned("X17_VISITOR", "rain-glass"),
  ask: assigned("X18_ASK", "harbour-brass"),
};

const softSettings = {
  stability: 0.55,
  similarity_boost: 0.75,
  style: 0.15,
  use_speaker_boost: false,
};
const botSettings = {
  stability: 0.85,
  similarity_boost: 0.5,
  style: 0.0,
  use_speaker_boost: false,
};
const conversationalSettings = {
  stability: 0.4,
  similarity_boost: 0.75,
  style: 0.3,
  use_speaker_boost: true,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const runFfmpeg = (args, label) => {
  try {
    execFileSync(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString() : String(error);
    throw new Error(`ffmpeg failed while ${label}:\n${stderr.slice(-1600)}`);
  }
};

/** Parse duration seconds from ffmpeg -i stderr. */
const durationOf = (file) => {
  try {
    execFileSync(ffmpeg, ["-i", file], { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString() : "";
    const match = stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (!match) return 0;
    return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  }
  return 0;
};

const writeIfMissing = (target, buffer, label) => {
  if (fs.existsSync(target) && !force) {
    console.log(`skip ${label} (exists; pass --force)`);
    return false;
  }
  fs.writeFileSync(target, buffer);
  console.log(`wrote ${label} (${buffer.length} bytes)`);
  return true;
};

const tts = async (voice, text, target, settings = softSettings) => {
  ensureDir(path.dirname(target));
  const rel = path.relative(OUT_DIR, target);
  if (fs.existsSync(target) && !force) {
    console.log(`skip tts ${rel}`);
    return target;
  }
  if (mixOnly) {
    if (!fs.existsSync(target)) throw new Error(`missing stem for --mix-only: ${rel}`);
    return target;
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.voice_id}?output_format=${OUTPUT_FORMAT}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: TTS_MODEL,
      voice_settings: settings,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`tts ${rel}: ${response.status} ${body}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeIfMissing(target, buffer, `tts ${rel}`);
  await sleep(250);
  return target;
};

const sfx = async (text, target, durationSeconds = 4, { loop = false } = {}) => {
  ensureDir(path.dirname(target));
  const rel = path.relative(OUT_DIR, target);
  if (fs.existsSync(target) && !force) {
    console.log(`skip sfx ${rel}`);
    return target;
  }
  if (mixOnly) {
    if (!fs.existsSync(target)) throw new Error(`missing stem for --mix-only: ${rel}`);
    return target;
  }

  const url = `https://api.elevenlabs.io/v1/sound-generation?output_format=${OUTPUT_FORMAT}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      duration_seconds: durationSeconds,
      loop,
      model_id: SFX_MODEL,
      prompt_influence: 0.45,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`sfx ${rel}: ${response.status} ${body}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 800) throw new Error(`sfx ${rel}: suspiciously small`);
  writeIfMissing(target, buffer, `sfx ${rel}`);
  await sleep(300);
  return target;
};

/** Mix multiple inputs with adelay (ms) and optional volume (linear). */
const mixTimeline = (clips, output, { totalSeconds }) => {
  // clips: [{ file, delayMs, volume? }]
  const args = ["-y"];
  for (const clip of clips) {
    args.push("-i", clip.file);
  }
  const parts = clips.map((clip, i) => {
    const vol = clip.volume ?? 1;
    const delay = Math.max(0, Math.round(clip.delayMs));
    return `[${i}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=${vol},adelay=${delay}|${delay}[a${i}]`;
  });
  const mixInputs = clips.map((_, i) => `[a${i}]`).join("");
  const filter = `${parts.join(";")};${mixInputs}amix=inputs=${clips.length}:duration=longest:dropout_transition=0:normalize=0,atrim=0:${totalSeconds},apad=whole_dur=${totalSeconds}[out]`;
  args.push("-filter_complex", filter, "-map", "[out]", "-ar", "44100", "-ac", "2", output);
  runFfmpeg(args, `mix ${path.basename(output)}`);
};

const mixUnder = (voiceFile, bedFile, output, bedDb = -16) => {
  const voiceDur = durationOf(voiceFile);
  const total = Math.max(voiceDur + 0.4, 3).toFixed(2);
  runFfmpeg(
    [
      "-y",
      "-i",
      voiceFile,
      "-stream_loop",
      "-1",
      "-i",
      bedFile,
      "-filter_complex",
      `[0:a]aformat=sample_rates=44100:channel_layouts=stereo,apad=whole_dur=${total},atrim=0:${total}[v];` +
        `[1:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=${bedDb}dB,atrim=0:${total}[b];` +
        `[v][b]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[out]`,
      "-map",
      "[out]",
      "-t",
      String(total),
      "-ar",
      "44100",
      "-ac",
      "2",
      output,
    ],
    `underlay ${path.basename(output)}`,
  );
};

const writeSidecar = (id, lines) => {
  const target = path.join(OUT_DIR, `${id}.md`);
  fs.writeFileSync(target, `${lines.join("\n")}\n`);
  console.log(`wrote ${path.relative(root, target)}`);
};

const shouldRun = (id) => !only || only.has(id.toUpperCase());

// ─── Experiment scripts ─────────────────────────────────────────────

const X8_LINES = [
  { id: "T01", room: "street rain", roomPrompt: "soft street rain on wet slate pavement, close and quiet, seamless ambient loop", text: "A stranger should not need an account to find your front door." },
  { id: "T02", room: "empty wind", roomPrompt: "empty coastal wind across open harbour, sparse and quiet, seamless ambient loop", text: "Every link that ends in nothing was somebody deciding to visit you." },
  { id: "T03", room: "shop door bell", roomPrompt: "single small brass shop door bell chime in a quiet wooden shop, then soft room tone", text: "The biggest name on your website should be yours." },
  { id: "T04", room: "rain on glass", roomPrompt: "raindrops on a dark shop window glass at night, close microphone, seamless ambient loop", text: "People arrive with one question. The first screen should answer it." },
  { id: "T05", room: "counter wood", roomPrompt: "quiet wooden shop counter room tone, soft wood creak once, seamless ambient loop", text: "Get in touch means the customer does the work." },
  { id: "T06", room: "paper shuffle", roomPrompt: "anxious paper shuffle and clipboard rustle on a counter, sparse, seamless ambient loop", text: "Your website greets people with what worries you. They came with a question." },
  { id: "T07", room: "cellar drip", roomPrompt: "slow cellar drip into a stone room then distant window rain, quiet seamless ambient loop", text: "The thing you'd say in ten seconds at the counter isn't on the site at all." },
  { id: "T08", room: "envelope tear", roomPrompt: "paper envelope tear then quiet desk room tone, sparse seamless ambient loop", text: "A menu nobody opens is a menu nobody read." },
  { id: "T09", room: "clock tick wrong", roomPrompt: "irregular dusty clock ticks out of sync, quiet interior, seamless ambient loop", text: "Your site is telling people how old it is, not how good you are." },
  { id: "T10", room: "two doors soft", roomPrompt: "soft two wooden doors settling in a quiet hallway, very sparse seamless ambient loop", text: "Swap your name for a competitor's. If nothing else needs changing, the site isn't yours." },
];

// ─── Generators ─────────────────────────────────────────────────────

const generateX8 = async () => {
  console.log("\n══ X8 — dialect proverb series");
  const stems = path.join(OUT_DIR, "stems", "X08");
  ensureDir(stems);
  for (const line of X8_LINES) {
    const dry = path.join(stems, `${line.id}-vo.mp3`);
    const bed = path.join(stems, `${line.id}-room.mp3`);
    const mixed = path.join(OUT_DIR, `X08-${line.id}.mp3`);
    await tts(CAST.proverb, line.text, dry, softSettings);
    await sfx(line.roomPrompt, bed, 8, { loop: true });
    if (!stemsOnly) {
      if (fs.existsSync(mixed) && !force) {
        console.log(`skip mix X08-${line.id}.mp3`);
      } else {
        mixUnder(dry, bed, mixed, -16);
        console.log(`mixed X08-${line.id}.mp3`);
      }
    }
  }
  writeSidecar("X08-proverbs", [
    "# X08 — dialect proverb series",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${TTS_MODEL}\` + \`${SFX_MODEL}\` room tones`,
    `- Voice: ${CAST.proverb.name} (\`${CAST.proverb.voice_id}\`, \`${CAST.proverb.key}\`)`,
    "- Prompt source: `research/film/studio-media-experiments.md` §X8",
    "- Disclosure: synthetic; required wherever these ship guest-facing",
    "- Score: ",
    "",
    "| File | Theme | Room tone | Script |",
    "| --- | --- | --- | --- |",
    ...X8_LINES.map(
      (l) => `| \`X08-${l.id}.mp3\` | ${l.id} | ${l.room} | ${l.text} |`,
    ),
  ]);
};

const generateX17 = async () => {
  console.log("\n══ X17 — owner vs visitor");
  await tts(
    CAST.owner,
    "We put the important notes up front so nobody's disappointed. The loaf is there. We worked hard on the rules.",
    path.join(OUT_DIR, "X17-meant.mp3"),
    conversationalSettings,
  );
  await tts(
    CAST.heard,
    "I only wanted today's loaf. I left.",
    path.join(OUT_DIR, "X17-heard.mp3"),
    softSettings,
  );
  writeSidecar("X17-split", [
    "# X17 — owner vs visitor split audio",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${TTS_MODEL}\``,
    `- Track A (Meant): ${CAST.owner.name} (\`${CAST.owner.key}\`)`,
    `- Track B (Heard): ${CAST.heard.name} (\`${CAST.heard.key}\`)`,
    "- Still pair: `X07-asmr-counter.png`",
    "- Prompt source: `research/film/studio-media-experiments.md` §X17",
    "- Disclosure: synthetic",
    "- Score: ",
    "",
    "| File | Track | Script |",
    "| --- | --- | --- |",
    "| `X17-meant.mp3` | Meant (owner) | We put the important notes up front so nobody's disappointed. The loaf is there. We worked hard on the rules. |",
    "| `X17-heard.mp3` | Heard (visitor) | I only wanted today's loaf. I left. |",
  ]);
};

const generateX18 = async () => {
  console.log("\n══ X18 — send the link");
  await tts(
    CAST.ask,
    "Send the link. That's the whole ask.",
    path.join(OUT_DIR, "X18-send-the-link.mp3"),
    softSettings,
  );
  writeSidecar("X18-ask", [
    "# X18 — empty envelope ask line",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${TTS_MODEL}\``,
    `- Voice: ${CAST.ask.name} (\`${CAST.ask.key}\`)`,
    "- Prompt source: `research/film/studio-media-experiments.md` §X18",
    "- Disclosure: synthetic",
    "- Score: ",
    "",
    "| File | Script |",
    "| --- | --- |",
    "| `X18-send-the-link.mp3` | Send the link. That's the whole ask. |",
  ]);
};

const generateX6 = async () => {
  console.log("\n══ X6 — radio play");
  const stems = path.join(OUT_DIR, "stems", "X06");
  ensureDir(stems);

  const files = {
    rain: await sfx(
      "soft street rain on wet slate outside a small coastal shop, quiet seamless ambient loop, no thunder",
      path.join(stems, "rain.mp3"),
      12,
      { loop: true },
    ),
    visitor1: await tts(
      CAST.visitor,
      "Right — just need the door.",
      path.join(stems, "visitor-1.mp3"),
      conversationalSettings,
    ),
    blip: await sfx(
      "single short flat digital UI blip notification, dry, no music",
      path.join(stems, "ui-blip.mp3"),
      1.2,
    ),
    bot1: await tts(
      CAST.bot,
      "Create an account to continue.",
      path.join(stems, "bot-1.mp3"),
      botSettings,
    ),
    visitor2: await tts(
      CAST.visitor,
      "I don't want an account. I want to know if you're open.",
      path.join(stems, "visitor-2.mp3"),
      conversationalSettings,
    ),
    rustle: await sfx(
      "cookie consent paper rustle and checkbox click, dry foley, short",
      path.join(stems, "consent-rustle.mp3"),
      2,
    ),
    bot2: await tts(CAST.bot, "Accept all.", path.join(stems, "bot-2.mp3"), botSettings),
    hold: await sfx(
      "tinny telephone hold music, cheap and looping, slightly annoying, no vocals",
      path.join(stems, "hold-music.mp3"),
      8,
      { loop: true },
    ),
    narrator1: await tts(
      CAST.narrator,
      "That was somebody deciding to visit you.",
      path.join(stems, "narrator-1.mp3"),
      softSettings,
    ),
    chord: await sfx(
      "one warm low soft chord, short and gentle, coastal evening, no melody",
      path.join(stems, "warm-chord.mp3"),
      2.5,
    ),
    narrator2: await tts(
      CAST.narrator,
      "Your front door should open without their password.",
      path.join(stems, "narrator-2.mp3"),
      softSettings,
    ),
  };

  if (stemsOnly) return;

  const out = path.join(OUT_DIR, "X06-radio-play.mp3");
  if (fs.existsSync(out) && !force) {
    console.log("skip mix X06-radio-play.mp3");
  } else {
    // Approximate timeline (ms) — hold music must feel too long.
    const timeline = [
      { file: files.rain, delayMs: 0, volume: 0.35 },
      { file: files.visitor1, delayMs: 800, volume: 1 },
      { file: files.blip, delayMs: 3200, volume: 0.7 },
      { file: files.bot1, delayMs: 3800, volume: 0.95 },
      { file: files.visitor2, delayMs: 7000, volume: 1 },
      { file: files.rustle, delayMs: 11500, volume: 0.75 },
      { file: files.bot2, delayMs: 13200, volume: 0.95 },
      { file: files.hold, delayMs: 15500, volume: 0.45 },
      { file: files.narrator1, delayMs: 25500, volume: 1 },
      { file: files.chord, delayMs: 29500, volume: 0.7 },
      { file: files.narrator2, delayMs: 31200, volume: 1 },
    ];
    mixTimeline(timeline, out, { totalSeconds: 38 });
    console.log("mixed X06-radio-play.mp3");
  }

  writeSidecar("X06-radio-play", [
    "# X06 — radio play over one still",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${TTS_MODEL}\` + \`${SFX_MODEL}\``,
    `- Visitor: ${CAST.visitor.name} (\`${CAST.visitor.key}\`)`,
    `- Bot: ${CAST.bot.name} (\`${CAST.bot.key}\`)`,
    `- Narrator: ${CAST.narrator.name} (\`${CAST.narrator.key}\`)`,
    "- Poster: `X06-radio-play-poster.png`",
    "- Prompt source: `research/film/studio-media-experiments.md` §X6",
    "- Disclosure: synthetic",
    "- Score: ",
    "",
    "Stems in `stems/X06/`. Mixed file: `X06-radio-play.mp3`.",
  ]);
};

const generateX7 = async () => {
  console.log("\n══ X7 — ASMR counter Foley");
  const stems = path.join(OUT_DIR, "stems", "X07");
  ensureDir(stems);

  const slap = await sfx(
    "stack of blank paper placards slapped onto a wooden counter, ASMR close mic",
    path.join(stems, "paper-slap.mp3"),
    2,
  );
  const shuffle = await sfx(
    "anxious paper shuffle and clipboard chain rattle on a counter, ASMR",
    path.join(stems, "paper-shuffle.mp3"),
    3,
  );
  const boots = await sfx(
    "clay boots walk away on wooden floor then leave, soft footsteps fading",
    path.join(stems, "boots-leave.mp3"),
    2.5,
  );
  const fold = await sfx(
    "soft wooden shutters folding flat into a counter, gentle click",
    path.join(stems, "wood-fold.mp3"),
    2,
  );
  const loaf = await sfx(
    "warm cloth and ceramic plate settle beside a loaf on a counter, soft ASMR",
    path.join(stems, "loaf-settle.mp3"),
    2.5,
  );

  if (stemsOnly) return;

  const out = path.join(OUT_DIR, "X07-asmr-counter-foley.mp3");
  if (fs.existsSync(out) && !force) {
    console.log("skip mix X07-asmr-counter-foley.mp3");
  } else {
    mixTimeline(
      [
        { file: slap, delayMs: 0, volume: 1 },
        { file: shuffle, delayMs: 1800, volume: 1 },
        { file: boots, delayMs: 4800, volume: 0.9 },
        // silence gap ~1.5s for departure
        { file: fold, delayMs: 8500, volume: 1 },
        { file: loaf, delayMs: 10500, volume: 1 },
      ],
      out,
      { totalSeconds: 14 },
    );
    console.log("mixed X07-asmr-counter-foley.mp3");
  }

  writeSidecar("X07-foley", [
    "# X07 — ASMR counter Foley bed",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${SFX_MODEL}\``,
    "- No VO",
    "- Still: `X07-asmr-counter.png`",
    "- Prompt source: `research/film/studio-media-experiments.md` §X7",
    "- Score: ",
  ]);
};

const generateX26 = async () => {
  console.log("\n══ X26 — choir of clocks bed");
  const stems = path.join(OUT_DIR, "stems", "X26");
  ensureDir(stems);

  const wrong = await sfx(
    "many small dusty clocks ticking out of sync, irregular and messy, quiet room",
    path.join(stems, "desync-ticks.mp3"),
    5,
  );
  const clear = await sfx(
    "one clear clean clock tick, precise and steady, short",
    path.join(stems, "clear-tick.mp3"),
    2,
  );
  const lock = await sfx(
    "soft harmonic lock as many clocks sync into one gentle pulse, warm quiet chord undertone",
    path.join(stems, "harmonic-lock.mp3"),
    4,
  );

  if (stemsOnly) return;

  const out = path.join(OUT_DIR, "X26-choir-of-clocks-bed.mp3");
  if (fs.existsSync(out) && !force) {
    console.log("skip mix X26-choir-of-clocks-bed.mp3");
  } else {
    mixTimeline(
      [
        { file: wrong, delayMs: 0, volume: 1 },
        { file: clear, delayMs: 4500, volume: 1.1 },
        { file: lock, delayMs: 6000, volume: 0.95 },
      ],
      out,
      { totalSeconds: 11 },
    );
    console.log("mixed X26-choir-of-clocks-bed.mp3");
  }

  writeSidecar("X26-bed", [
    "# X26 — choir of clocks musical bed",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${SFX_MODEL}\``,
    "- No VO — desynced ticks → one clear tick → harmonic lock",
    "- Prompt source: `research/film/studio-media-experiments.md` §X26",
    "- Score: ",
  ]);
};

const generateX9 = async () => {
  console.log("\n══ X9 — binaural walk");
  const stems = path.join(OUT_DIR, "stems", "X09");
  ensureDir(stems);

  const rain = await sfx(
    "soft rain and wet slate footsteps approaching a shop, left-ear outdoor feel, seamless ambient loop",
    path.join(stems, "left-rain-steps.mp3"),
    12,
    { loop: true },
  );
  const harbour = await sfx(
    "distant quiet harbour clink and water, very soft, seamless ambient loop",
    path.join(stems, "left-harbour.mp3"),
    10,
    { loop: true },
  );
  const blips = await sfx(
    "sequence of flat digital UI blips and consent dialog sounds, dry, right channel feel",
    path.join(stems, "right-ui.mp3"),
    6,
  );
  const bot1 = await tts(
    CAST.bot,
    "Create an account to continue.",
    path.join(stems, "right-bot-1.mp3"),
    botSettings,
  );
  const bot2 = await tts(
    CAST.bot,
    "Accept all.",
    path.join(stems, "right-bot-2.mp3"),
    botSettings,
  );
  const hold = await sfx(
    "tinny telephone hold music, cheap and looping, no vocals",
    path.join(stems, "right-hold.mp3"),
    8,
    { loop: true },
  );
  const latch = await sfx(
    "one warm wooden door latch click, close and dry, satisfying",
    path.join(stems, "centre-latch.mp3"),
    1.5,
  );
  const narrator = await tts(
    CAST.narrator,
    "A stranger should not need an account to find your front door.",
    path.join(stems, "centre-narrator.mp3"),
    softSettings,
  );

  if (stemsOnly) return;

  const leftMix = path.join(stems, "_left-bed.mp3");
  const rightMix = path.join(stems, "_right-bed.mp3");
  const centreMix = path.join(stems, "_centre.mp3");
  const out = path.join(OUT_DIR, "X09-binaural-walk.mp3");

  if (fs.existsSync(out) && !force) {
    console.log("skip mix X09-binaural-walk.mp3");
  } else {
    mixTimeline(
      [
        { file: rain, delayMs: 0, volume: 0.7 },
        { file: harbour, delayMs: 0, volume: 0.35 },
      ],
      leftMix,
      { totalSeconds: 50 },
    );
    mixTimeline(
      [
        { file: blips, delayMs: 4000, volume: 0.8 },
        { file: bot1, delayMs: 7000, volume: 1 },
        { file: bot2, delayMs: 12000, volume: 1 },
        { file: hold, delayMs: 14500, volume: 0.4 },
      ],
      rightMix,
      { totalSeconds: 50 },
    );
    mixTimeline(
      [
        { file: latch, delayMs: 32000, volume: 1 },
        { file: narrator, delayMs: 34000, volume: 1 },
      ],
      centreMix,
      { totalSeconds: 50 },
    );

    runFfmpeg(
      [
        "-y",
        "-i",
        leftMix,
        "-i",
        rightMix,
        "-i",
        centreMix,
        "-filter_complex",
        // Beds are already stereo; fold each to a hard L / R / centre pan.
        "[0:a]pan=stereo|c0=0.5*c0+0.5*c1|c1=0*c0[L];" +
          "[1:a]pan=stereo|c0=0*c0|c1=0.5*c0+0.5*c1[R];" +
          "[2:a]pan=stereo|c0=0.4*c0+0.4*c1|c1=0.4*c0+0.4*c1[C];" +
          "[L][R][C]amix=inputs=3:duration=longest:dropout_transition=0:normalize=0,atrim=0:50[out]",
        "-map",
        "[out]",
        "-ar",
        "44100",
        "-ac",
        "2",
        out,
      ],
      "X09 binaural join",
    );
    console.log("mixed X09-binaural-walk.mp3");
  }

  writeSidecar("X09-binaural", [
    "# X09 — binaural walk past the door",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Model: ElevenLabs \`${TTS_MODEL}\` + \`${SFX_MODEL}\``,
    `- Right-channel bot: ${CAST.bot.name} (\`${CAST.bot.key}\`)`,
    `- Centre narrator: ${CAST.narrator.name} (\`${CAST.narrator.key}\`)`,
    "- Headphones prototype; mono still carries the T1 narrator line",
    "- Prompt source: `research/film/studio-media-experiments.md` §X9",
    "- Disclosure: synthetic",
    "- Score: ",
  ]);
};

const writeAudioIndex = () => {
  const lines = [
    "# Studio bakeoff audio",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    "- Generator: `tools/pipeline/generate-studio-audio.mjs`",
    "- Cast: `../voice-bakeoff/roster.json`",
    "- Disclosure: all VO synthetic; Foley from ElevenLabs Sound Effects API",
    "",
    "## Listen order",
    "",
    "1. `X06-radio-play.mp3` — first 15s with the poster",
    "2. `X08-T01.mp3`, `X08-T04.mp3`, `X08-T09.mp3` — proverb register",
    "3. `X17-meant.mp3` / `X17-heard.mp3` — toggle insight",
    "4. `X09-binaural-walk.mp3` — headphones",
    "5. `X07-asmr-counter-foley.mp3`, `X26-choir-of-clocks-bed.mp3`, `X18-send-the-link.mp3`",
    "",
    "## Files",
    "",
    "| File | Experiment | Kind |",
    "| --- | --- | --- |",
    "| `X06-radio-play.mp3` | X6 | mixed radio play |",
    "| `X07-asmr-counter-foley.mp3` | X7 | Foley bed |",
    "| `X08-T01.mp3` … `X08-T10.mp3` | X8 | proverb + room tone |",
    "| `X09-binaural-walk.mp3` | X9 | binaural mix |",
    "| `X17-meant.mp3` / `X17-heard.mp3` | X17 | split VO |",
    "| `X18-send-the-link.mp3` | X18 | ask line |",
    "| `X26-choir-of-clocks-bed.mp3` | X26 | clock bed |",
    "",
    "Stems live under `stems/X0N/`.",
    "",
    "## Cast",
    "",
    "| Role | Key |",
    "| --- | --- |",
    `| Visitor | \`${CAST.visitor.key}\` |`,
    `| Bot | \`${CAST.bot.key}\` |`,
    `| Narrator / X8 | \`${CAST.narrator.key}\` |`,
    `| X17 Owner | \`${CAST.owner.key}\` |`,
    `| X17 Heard | \`${CAST.heard.key}\` |`,
    `| X18 ask | \`${CAST.ask.key}\` |`,
  ];
  fs.writeFileSync(path.join(OUT_DIR, "AUDIO.md"), `${lines.join("\n")}\n`);
  console.log(`wrote ${path.relative(root, path.join(OUT_DIR, "AUDIO.md"))}`);
};

const main = async () => {
  ensureDir(OUT_DIR);
  console.log("Studio audio cast:");
  for (const [role, v] of Object.entries(CAST)) {
    console.log(`  ${role}: ${v.key} (${v.voice_id})`);
  }

  // VO-first batch, then heavier mixes (plan order).
  if (shouldRun("X8")) await generateX8();
  if (shouldRun("X17")) await generateX17();
  if (shouldRun("X18")) await generateX18();
  if (shouldRun("X6")) await generateX6();
  if (shouldRun("X7")) await generateX7();
  if (shouldRun("X26")) await generateX26();
  if (shouldRun("X9")) await generateX9();

  writeAudioIndex();
  console.log("\ndone.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
