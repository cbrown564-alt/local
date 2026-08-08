#!/usr/bin/env node
/**
 * X25 postcard whispers — one ElevenLabs line per theme front.
 *
 * Scripts are the theme messages from studio-recurring-themes.md / X8 table.
 * Outputs beside the fronts in research/film/clips/studio/X25-postcard-fronts/.
 *
 *   node --env-file=.env tools/pipeline/generate-x25-whispers.mjs
 *   node --env-file=.env tools/pipeline/generate-x25-whispers.mjs --force
 *   node --env-file=.env tools/pipeline/generate-x25-whispers.mjs --voice=harbour-whisper
 *
 * Default cast (roster.json assignments):
 *   X25_VOICE   → harbour-whisper (most themes)
 *   X25_SERIOUS → rain-glass (T02, T09)
 * `--voice=` forces one voice for every theme.
 */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const OUT_DIR = path.join(root, "research", "film", "clips", "studio", "X25-postcard-fronts");
const ROSTER_PATH = path.join(
  root,
  "research",
  "film",
  "clips",
  "studio",
  "voice-bakeoff",
  "roster.json",
);
const MODEL_ID = "eleven_multilingual_v2";
const OUTPUT_FORMAT = "mp3_44100_128";

/** Themes that use the serious alternate (loss / age weight). */
const SERIOUS_THEME_IDS = new Set(["T02", "T09"]);

/** @type {{ id: string; slug: string; text: string }[]} */
const WHISPERS = [
  {
    id: "T01",
    slug: "login-at-the-door",
    text: "A stranger should not need an account to find your front door.",
  },
  {
    id: "T02",
    slug: "dead-end",
    text: "Every link that ends in nothing was somebody deciding to visit you.",
  },
  {
    id: "T03",
    slug: "whose-shop",
    text: "The biggest name on your website should be yours.",
  },
  {
    id: "T04",
    slug: "are-you-open",
    text: "People arrive with one question. The first screen should answer it.",
  },
  {
    id: "T05",
    slug: "bell-no-clapper",
    text: "Get in touch means the customer does the work.",
  },
  {
    id: "T06",
    slug: "worries-first",
    text: "Your website greets people with what worries you. They came with a question.",
  },
  {
    id: "T07",
    slug: "best-thing-hidden",
    text: "The thing you'd say in ten seconds at the counter isn't on the site at all.",
  },
  {
    id: "T08",
    slug: "locked-in-file",
    text: "A menu nobody opens is a menu nobody read.",
  },
  {
    id: "T09",
    slug: "stopped-clock",
    text: "Your site is telling people how old it is, not how good you are.",
  },
  {
    id: "T10",
    slug: "swap-test",
    text: "Swap your name for a competitor's. If nothing else needs changing, the site isn't yours.",
  },
];

const force = process.argv.includes("--force");
const voiceArg = process.argv.find((a) => a.startsWith("--voice="));
const forcedKey = voiceArg?.slice("--voice=".length)?.trim() || null;

const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY (e.g. node --env-file=.env …).");
  process.exit(1);
}

const roster = fs.existsSync(ROSTER_PATH)
  ? JSON.parse(fs.readFileSync(ROSTER_PATH, "utf8"))
  : null;

const lookupVoice = (key) => {
  const entry =
    roster?.created?.[key] ||
    roster?.controls?.[key] ||
    (key === "irish-guide"
      ? { name: "Irish Cultural Guide", voice_id: "NPWroowF4phQhaPWjXPj" }
      : null);
  if (!entry?.voice_id) {
    console.error(
      `Unknown voice key "${key}". Use a key from voice-bakeoff/roster.json (created or controls).`,
    );
    process.exit(1);
  }
  return { key, name: entry.name, voice_id: entry.voice_id };
};

const defaultVoice = lookupVoice(roster?.assignments?.X25_VOICE || "harbour-whisper");
const seriousVoice = lookupVoice(
  roster?.assignments?.X25_SERIOUS || roster?.assignments?.X25_VOICE || "rain-glass",
);
const forcedVoice = forcedKey ? lookupVoice(forcedKey) : null;

const voiceForTheme = (themeId) => {
  if (forcedVoice) return forcedVoice;
  if (SERIOUS_THEME_IDS.has(themeId)) return seriousVoice;
  return defaultVoice;
};

fs.mkdirSync(OUT_DIR, { recursive: true });

const generateOne = async (spec) => {
  const basename = `X25-${spec.id}-${spec.slug}.mp3`;
  const target = path.join(OUT_DIR, basename);
  if (fs.existsSync(target) && !force) {
    console.log(`skip ${basename} (exists; pass --force to overwrite)`);
    return { basename, skipped: true };
  }

  const voice = voiceForTheme(spec.id);
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.voice_id}?output_format=${OUTPUT_FORMAT}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: spec.text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: false,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${basename}: ${response.status} ${body}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(target, buffer);
  console.log(`wrote ${basename} (${buffer.length} bytes) [${voice.key}]`);
  return { basename, skipped: false, bytes: buffer.length, voiceKey: voice.key };
};

const results = [];
for (const spec of WHISPERS) {
  results.push(await generateOne(spec));
}

const castSummary = forcedVoice
  ? `${forcedVoice.name} (\`${forcedVoice.voice_id}\`, key \`${forcedVoice.key}\`) — forced for all themes`
  : [
      `${defaultVoice.name} (\`${defaultVoice.voice_id}\`, \`${defaultVoice.key}\`) — default`,
      `${seriousVoice.name} (\`${seriousVoice.voice_id}\`, \`${seriousVoice.key}\`) — T02, T09`,
    ].join("; ");

const sidecar = path.join(OUT_DIR, "X25-whispers.md");
const lines = [
  "# X25 — postcard whispers",
  "",
  `- Date: ${new Date().toISOString().slice(0, 10)}`,
  "- Status: retired after curation; research files only, not a postcard QR destination",
  `- Model: ElevenLabs \`${MODEL_ID}\``,
  `- Voice: ${castSummary}`,
  `- Research cast: \`research/film/clips/studio/voice-bakeoff/roster.json\``,
  `- Prompt source: theme messages in \`research/film/studio-media-experiments.md\` §X8 / §X25`,
  "- Disclosure: synthetic; required wherever these ship guest-facing",
  "",
  "The still postcard format advanced selectively; this audio companion did not.",
  "Do not link a printed QR to these files.",
  "",
  "| File | Theme | Voice | Script |",
  "| --- | --- | --- | --- |",
  ...WHISPERS.map((spec) => {
    const voice = voiceForTheme(spec.id);
    return `| \`X25-${spec.id}-${spec.slug}.mp3\` | ${spec.id} | \`${voice.key}\` | ${spec.text} |`;
  }),
  "",
];
fs.writeFileSync(sidecar, lines.join("\n"));
console.log(`wrote ${path.relative(root, sidecar)}`);
console.log(
  `done: ${results.filter((r) => !r.skipped).length} generated, ${results.filter((r) => r.skipped).length} skipped`,
);
