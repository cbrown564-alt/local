#!/usr/bin/env node
/**
 * Studio voice bake-off — design distinct ElevenLabs voices, save preview
 * audio, optionally create library voices, then generate comparable sample
 * reads for X25 / radio-play / proverb casting.
 *
 *   node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs
 *   node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --design-only
 *   node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --create
 *   node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --samples
 *   node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --all
 *
 * Defaults: design + samples against premades + any already-created MM voices.
 * Pass --create to promote preview[0] of each design into the library
 * (consumes voice slots; account was at 25/30 when this was written).
 */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const OUT_DIR = path.join(
  root,
  "research",
  "film",
  "clips",
  "studio",
  "voice-bakeoff",
);
const STATE_PATH = path.join(OUT_DIR, "bakeoff-state.json");
const DESIGN_MODEL = "eleven_ttv_v3";
const TTS_MODEL = "eleven_multilingual_v2";
const OUTPUT_FORMAT = "mp3_44100_128";

/** Shared preview text for Voice Design (must be 100–1000 chars). */
const DESIGN_PREVIEW_TEXT = [
  "People arrive with one question. The first screen should answer it.",
  "A stranger should not need an account to find your front door.",
  "That was somebody deciding to visit you. Your front door should open without their password.",
  "I don't want an account. I want to know if you're open.",
].join(" ");

/**
 * Designed cast — exploratory roles for studio audio (X6, X8, X17, X25…).
 * Descriptions avoid cartoon NI parody; near-miss accents are worse than neutral.
 *
 * @type {{
 *   key: string;
 *   name: string;
 *   role: string;
 *   mood: string;
 *   jobs: string[];
 *   description: string;
 *   guidance_scale?: number;
 * }[]}
 */
const DESIGNS = [
  {
    key: "harbour-whisper",
    name: "MM Harbour Whisper",
    role: "Intimate postcard whisper",
    mood: "close, dry, after-hours counter",
    jobs: ["X25", "X8 soft takes"],
    description:
      "A soft-spoken middle-aged woman with a light Northern Irish coastal accent, " +
      "close-mic intimate whisper as if leaning over a shop counter after closing. " +
      "Warm, dry, quietly confident. Never breathy ASMR parody, never theatrical, " +
      "never cartoon Irish. Natural County Down neighbour tone, low energy, clear consonants.",
    guidance_scale: 4.5,
  },
  {
    key: "slate-narrator",
    name: "MM Slate Narrator",
    role: "Calm proverb / radio narrator",
    mood: "dry documentary, obvious-and-a-little-sad",
    jobs: ["X8", "X6 narrator", "X18 VO"],
    description:
      "A calm middle-aged British male narrator with a dry coastal quality. " +
      "Low-energy radio documentary register. Speaks as if stating something " +
      "obvious and slightly sad. No sales polish, no RP announcer boom, no smile in the voice. " +
      "Clear, measured, neighbourly intelligence.",
    guidance_scale: 5,
  },
  {
    key: "boots-visitor",
    name: "MM Boots Visitor",
    role: "Visitor / customer",
    mood: "practical, wry, politely impatient",
    jobs: ["X6 visitor", "X17 Heard"],
    description:
      "A young adult British woman, practical and slightly impatient but polite. " +
      "The voice of someone who only wanted to know if a shop was open. " +
      "Dry humour at the edges. Not posh, not cockney caricature, not American. " +
      "Natural conversational British, mid register, living room not stage.",
    guidance_scale: 5,
  },
  {
    key: "shop-owner",
    name: "MM Shop Owner",
    role: "Owner defending the old site",
    mood: "earnest, warm, a bit defensive",
    jobs: ["X17 Meant", "X6 contrast"],
    description:
      "A middle-aged Irish male shopkeeper, earnest and slightly defensive, " +
      "warm but tired. Someone explaining why they put the rules up front. " +
      "Soft Ulster colour without cartoon. Not a tour guide, not a salesman. " +
      "Honest counter conversation.",
    guidance_scale: 4.5,
  },
  {
    key: "consent-bot",
    name: "MM Consent Bot",
    role: "UI / voice-from-nowhere antagonist",
    mood: "flat corporate courtesy",
    jobs: ["X6 Voice from nowhere", "X9 right channel"],
    description:
      "A completely flat mid-Atlantic synthetic UI voice. Pleasant corporate " +
      "nothingness — the voice of a consent dialog and account wall. " +
      "Emotionless courtesy, even pacing, no regional colour, no warmth, no menace. " +
      "Sounds like default product voiceover, slightly hollow.",
    guidance_scale: 6,
  },
  {
    key: "brass-deadpan",
    name: "MM Brass Deadpan",
    role: "Dry humour punchline",
    mood: "bone-dry, understated comedy",
    jobs: ["X6 punch", "X8 wry takes", "X20 caption VO"],
    description:
      "A middle-aged British male with bone-dry deadpan comedy timing. " +
      "Understated, almost bored delivery of sharp observations. " +
      "Late-night local radio without forced jokes. Harbour-town dryness. " +
      "Low affect, perfect timing, never sneering.",
    guidance_scale: 5,
  },
  {
    key: "rain-glass",
    name: "MM Rain Glass",
    role: "Serious / weighty truths",
    mood: "quiet authority, slight melancholy",
    jobs: ["X25 T2/T9", "X8 solemn", "X26 VO"],
    description:
      "A soft-spoken British woman, serious and clear, slightly melancholic. " +
      "Quiet authority for weighty truths. Not breathy, not glamorous actress. " +
      "Think rain on glass and a stopped clock — composed, humane, unsentimental.",
    guidance_scale: 5,
  },
  {
    key: "harbour-brass",
    name: "MM Harbour Brass",
    role: "Warm neighbour ask",
    mood: "warm, low, un-salesy invitation",
    jobs: ["X18 ask", "X13 end card", "request path VO"],
    description:
      "A warm lower-register British male, neighbourly harbour-town warmth. " +
      "The voice that makes a small ask without selling. Steady, kind, " +
      "unhurried. Not preacher, not podcast bro. Coastal evening light in the tone.",
    guidance_scale: 5,
  },
];

/** Premade / existing library voices as controls in the sample pass. */
const LIBRARY_CONTROLS = [
  {
    key: "control-irish-guide",
    name: "Irish Cultural Guide (baseline)",
    voice_id: "NPWroowF4phQhaPWjXPj",
    role: "Current X25 baseline — known weak",
    mood: "tour-guide Irish",
    jobs: ["X25 current"],
  },
  {
    key: "control-village-elder",
    name: "Old Irish Village Elder",
    voice_id: "eEzkfaTvgdaH5to7Cn0M",
    role: "Existing Irish elder",
    mood: "aged, folkloric",
    jobs: ["contrast"],
  },
  {
    key: "control-george",
    name: "George",
    voice_id: "JBFqnCBsd6RMkjVDRZzb",
    role: "Warm British storyteller",
    mood: "captivating, mature",
    jobs: ["X8 / narrator candidate"],
  },
  {
    key: "control-daniel",
    name: "Daniel",
    voice_id: "onwK4e9ZLuTAKqWW03F9",
    role: "Steady broadcaster",
    mood: "formal BBC-ish",
    jobs: ["X6 narrator candidate"],
  },
  {
    key: "control-lily",
    name: "Lily",
    voice_id: "pFZP5JQG7iQjIQuC4Bku",
    role: "Velvety British actress",
    mood: "confident, smooth",
    jobs: ["serious / whisper candidate"],
  },
  {
    key: "control-alice",
    name: "Alice",
    voice_id: "Xb7hH8MSUJpSbSDYk0k2",
    role: "Clear British educator",
    mood: "engaging, clear",
    jobs: ["proverb candidate"],
  },
  {
    key: "control-river",
    name: "River",
    voice_id: "SAz9YHcvj6GT2YYXdXww",
    role: "Neutral informative",
    mood: "calm, accent-light",
    jobs: ["safe neutral / UI-adjacent"],
  },
  {
    key: "control-bill",
    name: "Bill",
    voice_id: "pqHfZKP75CvOlQylNhV4",
    role: "Wise mature American",
    mood: "balanced, old",
    jobs: ["deadpan / weight contrast"],
  },
];

/** Apples-to-apples sample lines — cover whisper, proverb, visitor, owner, bot, punch. */
const SAMPLE_LINES = [
  {
    id: "x25-whisper",
    label: "X25 whisper (T4)",
    text: "People arrive with one question. The first screen should answer it.",
    settings: { stability: 0.55, similarity_boost: 0.75, style: 0.15, use_speaker_boost: false },
  },
  {
    id: "x8-proverb",
    label: "X8 proverb (T1)",
    text: "A stranger should not need an account to find your front door.",
    settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
  },
  {
    id: "x6-visitor",
    label: "X6 visitor",
    text: "I don't want an account. I want to know if you're open.",
    settings: { stability: 0.4, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true },
  },
  {
    id: "x17-owner",
    label: "X17 owner",
    text: "We put the important notes up front so nobody's disappointed.",
    settings: { stability: 0.45, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true },
  },
  {
    id: "x6-bot",
    label: "X6 consent bot",
    text: "Create an account to continue. Accept all.",
    settings: { stability: 0.85, similarity_boost: 0.5, style: 0.0, use_speaker_boost: false },
  },
  {
    id: "x6-punch",
    label: "X6 deadpan punch",
    text: "That was somebody deciding to visit you.",
    settings: { stability: 0.55, similarity_boost: 0.75, style: 0.1, use_speaker_boost: true },
  },
];

const argv = process.argv.slice(2);
const onlyArg = argv.find((a) => a.startsWith("--only="));
const onlyKeys = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;
const args = new Set(argv.filter((a) => !a.startsWith("--only=")));
const noFlags = [...args].every((a) => a === "--force");
// default / no flags: design + samples (no create — spare voice slots)
const doDesign = noFlags || args.has("--all") || args.has("--design") || args.has("--design-only");
const doCreate = args.has("--all") || args.has("--create");
const doSamples =
  (noFlags || args.has("--all") || args.has("--samples") || args.has("--design")) &&
  !args.has("--design-only");
const allowKey = (key) => !onlyKeys || onlyKeys.has(key);

const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY (e.g. node --env-file=.env …).");
  process.exit(1);
}

fs.mkdirSync(path.join(OUT_DIR, "design-previews"), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, "samples"), { recursive: true });

const loadState = () => {
  if (!fs.existsSync(STATE_PATH)) return { designs: {}, created: {} };
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
};

const saveState = (state) => {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const designVoice = async (spec) => {
  console.log(`\n▸ designing ${spec.key}…`);
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-voice/design", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      voice_description: spec.description,
      model_id: DESIGN_MODEL,
      text: DESIGN_PREVIEW_TEXT,
      auto_generate_text: false,
      loudness: 0.3,
      guidance_scale: spec.guidance_scale ?? 5,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`design ${spec.key}: ${response.status} ${body}`);
  }

  const payload = await response.json();
  const previews = payload.previews ?? [];
  const saved = [];

  for (let i = 0; i < previews.length; i++) {
    const preview = previews[i];
    const basename = `${spec.key}-p${i + 1}.mp3`;
    const target = path.join(OUT_DIR, "design-previews", basename);
    const buffer = Buffer.from(preview.audio_base_64, "base64");
    fs.writeFileSync(target, buffer);
    saved.push({
      index: i + 1,
      generated_voice_id: preview.generated_voice_id,
      file: `design-previews/${basename}`,
      bytes: buffer.length,
      duration_secs: preview.duration_secs ?? null,
    });
    console.log(`  wrote ${basename} (${buffer.length} bytes)`);
  }

  return {
    key: spec.key,
    name: spec.name,
    role: spec.role,
    mood: spec.mood,
    jobs: spec.jobs,
    description: spec.description,
    previews: saved,
    preferred_preview: 1,
  };
};

const createVoice = async (design, previewIndex = 1) => {
  const preview = design.previews.find((p) => p.index === previewIndex) ?? design.previews[0];
  if (!preview) throw new Error(`no preview for ${design.key}`);

  console.log(`\n▸ creating library voice ${design.name} from p${preview.index}…`);
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-voice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      voice_name: design.name,
      voice_description: `${design.role} — ${design.mood}. ${design.description}`,
      generated_voice_id: preview.generated_voice_id,
      labels: {
        project: "mourne-made-studio",
        role: design.role,
        mood: design.mood,
        bakeoff: design.key,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`create ${design.key}: ${response.status} ${body}`);
  }

  const voice = await response.json();
  console.log(`  voice_id ${voice.voice_id}`);
  return {
    key: design.key,
    name: design.name,
    voice_id: voice.voice_id,
    from_preview: preview.index,
    role: design.role,
    mood: design.mood,
    jobs: design.jobs,
  };
};

const tts = async (voiceId, line, outPath) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: line.text,
      model_id: TTS_MODEL,
      voice_settings: line.settings,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`tts ${path.basename(outPath)}: ${response.status} ${body}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  return buffer.length;
};

const writeCastMd = (state) => {
  const createdList = Object.values(state.created ?? {});
  const designList = Object.values(state.designs ?? {});

  const lines = [
    "# Studio voice bake-off",
    "",
    `- Date: ${new Date().toISOString().slice(0, 10)}`,
    `- Design model: \`${DESIGN_MODEL}\``,
    `- Sample TTS model: \`${TTS_MODEL}\``,
    `- Prompt home: \`research/film/studio-media-experiments.md\` (X6, X8, X17, X25)`,
    "- Disclosure: all voices synthetic; required wherever audio ships guest-facing",
    "",
    "## Why",
    "",
    "X25 whispers were generated with a single voice (Irish Cultural Guide).",
    "One voice cannot cover whisper intimacy, dry proverb, visitor frustration,",
    "owner earnestness, UI antagonist flatness, and deadpan punch. This bake-off",
    "casts 8 designed voices plus library controls so we can pick by ear.",
    "",
    "## Listen order (suggested)",
    "",
    "1. Play every `samples/*-x25-whisper.mp3` first — that is the X25 job.",
    "2. Then `x6-punch` and `x8-proverb` for narrator / proverb shortlist.",
    "3. Then role-specialist lines: `x6-visitor`, `x17-owner`, `x6-bot`.",
    "4. Design previews in `design-previews/` show fuller takes (longer script).",
    "",
    "## Designed cast",
    "",
    "| Key | Name | Role | Mood | Jobs | Previews |",
    "| --- | --- | --- | --- | --- | --- |",
    ...designList.map((d) => {
      const previewLinks = (d.previews ?? [])
        .map((p) => `\`p${p.index}\``)
        .join(" ");
      return `| \`${d.key}\` | ${d.name} | ${d.role} | ${d.mood} | ${(d.jobs ?? []).join(", ")} | ${previewLinks || "—"} |`;
    }),
    "",
    "## Created library voices (slot-consuming)",
    "",
    createdList.length === 0
      ? "_None yet. Run with `--create` after picking preferred previews in `bakeoff-state.json` (`preferred_preview`)._"
      : [
          "| Key | Name | voice_id | From preview |",
          "| --- | --- | --- | --- |",
          ...createdList.map(
            (c) =>
              `| \`${c.key}\` | ${c.name} | \`${c.voice_id}\` | p${c.from_preview} |`,
          ),
        ].join("\n"),
    "",
    "## Library controls",
    "",
    "| Key | Name | voice_id | Role |",
    "| --- | --- | --- | --- |",
    ...LIBRARY_CONTROLS.map(
      (c) => `| \`${c.key}\` | ${c.name} | \`${c.voice_id}\` | ${c.role} |`,
    ),
    "",
    "## Sample lines",
    "",
    "| ID | Label | Text |",
    "| --- | --- | --- |",
    ...SAMPLE_LINES.map((l) => `| \`${l.id}\` | ${l.label} | ${l.text} |`),
    "",
    "## Score sheet (fill by ear)",
    "",
    "| Voice | X25 whisper | X8 proverb | Visitor | Owner | Bot | Punch | Keep? | Notes |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...[...designList.map((d) => d.key), ...LIBRARY_CONTROLS.map((c) => c.key)].map(
      (key) => `| \`${key}\` | | | | | | | | |`,
    ),
    "",
    "## Casting targets (after listen)",
    "",
    "| Job | Wanted quality | Winner (fill) |",
    "| --- | --- | --- |",
    "| X25 whisper | Intimate, dry, ≤8s belief, not tour-guide | |",
    "| X8 proverb series | One consistent calm voice, memorable | |",
    "| X6 narrator | Dry, local-not-salesy | |",
    "| X6 visitor | Practical, wry | |",
    "| X6 voice-from-nowhere | Flat UI courtesy | |",
    "| X17 owner (Meant) | Earnest, not mocking | |",
    "| X17 visitor (Heard) | Short, human loss | |",
    "| Deadpan punch | Bone-dry, no sneer | |",
    "",
    "## Regenerator notes",
    "",
    "Preferred winners should be copied into `tools/pipeline/generate-x25-whispers.mjs`",
    "(and later into per-experiment generators) once the score sheet is filled.",
    "Near-miss Irish accents lose to a clear neutral British neighbour voice.",
    "",
    "## Commands",
    "",
    "```bash",
    "node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --design-only",
    "node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --create",
    "node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --samples",
    "```",
    "",
  ];

  fs.writeFileSync(path.join(OUT_DIR, "CAST.md"), lines.join("\n"));
  console.log(`\nwrote ${path.relative(root, path.join(OUT_DIR, "CAST.md"))}`);
};

const main = async () => {
  const state = loadState();
  state.designs ??= {};
  state.created ??= {};

  if (doDesign) {
    for (const spec of DESIGNS) {
      if (!allowKey(spec.key)) continue;
      if (state.designs[spec.key]?.previews?.length && !args.has("--force")) {
        console.log(`skip design ${spec.key} (exists; pass --force to redesign)`);
        continue;
      }
      state.designs[spec.key] = await designVoice(spec);
      saveState(state);
      await sleep(400);
    }
  }

  if (doCreate) {
    let createdCount = 0;
    for (const spec of DESIGNS) {
      if (!allowKey(spec.key)) continue;
      if (state.created[spec.key] && !args.has("--force")) {
        console.log(`skip create ${spec.key} (already created)`);
        continue;
      }
      const design = state.designs[spec.key];
      if (!design) {
        console.warn(`cannot create ${spec.key}: no design state`);
        continue;
      }
      const preferred = design.preferred_preview ?? 1;
      try {
        state.created[spec.key] = await createVoice(design, preferred);
        saveState(state);
        createdCount += 1;
        await sleep(400);
      } catch (err) {
        console.error(String(err));
        console.error(
          `(stopping create early — check voice slot limit; created ${createdCount} this run)`,
        );
        break;
      }
    }
  }

  if (doSamples) {
    /** @type {{ key: string; name: string; voice_id: string; role: string }[]} */
    const roster = [
      ...LIBRARY_CONTROLS.map((c) => ({
        key: c.key,
        name: c.name,
        voice_id: c.voice_id,
        role: c.role,
      })),
      ...Object.values(state.created).map((c) => ({
        key: c.key,
        name: c.name,
        voice_id: c.voice_id,
        role: c.role,
      })),
    ];

    // If nothing created yet, still sample controls; also try TTS against
    // generated_voice_id is not supported — need create. So without --create,
    // samples are controls only unless prior created voices exist.
    if (roster.length === LIBRARY_CONTROLS.length) {
      console.log(
        "\n(no created MM voices yet — sampling library controls only; run --create after picking previews)",
      );
    }

    for (const voice of roster) {
      for (const line of SAMPLE_LINES) {
        const basename = `${voice.key}__${line.id}.mp3`;
        const target = path.join(OUT_DIR, "samples", basename);
        if (fs.existsSync(target) && !args.has("--force")) {
          console.log(`skip sample ${basename}`);
          continue;
        }
        process.stdout.write(`▸ sample ${basename}… `);
        try {
          const bytes = await tts(voice.voice_id, line, target);
          console.log(`${bytes} bytes`);
        } catch (err) {
          console.log("FAIL");
          console.error(String(err));
        }
        await sleep(250);
      }
    }
  }

  writeCastMd(state);
  console.log("\ndone.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
