/**
 * The five layers for /how-a-site-goes-together/ — the page briefed in
 * research/how-a-site-goes-together-brief.md, the second of the three
 * approaches mapped in research/three-ways-to-describe-the-work.md. Where the
 * fault walk argues backward from what goes wrong, this page argues forward
 * through what right is made of: one wireframe, empty at the start, built up
 * one decision at a time while the visitor drives.
 *
 * The layers are not invented for the page — they are the ten themes of the
 * shared taxonomy (FAULT_THEMES in fault-walks.ts) answered, in the order the
 * elevation method builds in: access before identity before record. Guest-
 * facing beats get names, never T-ids; T-ids stay in data, anchors and tests.
 *
 * The build order is the argument, so the data is the page: `blocks` are each
 * beat's layer in the fault walk's grey grammar, and a slide for beat N is
 * layers 1..N — stepping back removes a layer by construction. Every beat
 * carries the layer twice: `blocks` for the phone chassis, `desktopBlocks`
 * for the browser-window chassis — the same five decisions re-laid for a wide
 * screen, because the layers are the argument, not the phone. The stop is
 * not a layer: the wireframe reaches for a register and grey has nothing to
 * offer, so the page's one drawn beat (the blank nameplate) lives there.
 *
 * Completeness fails the build here rather than shipping a quiet gap — every
 * beat complete, theme ids valid against the shared taxonomy, the ten themes
 * answered exactly once, no register colour (goal) inside beats 1–5, and
 * exactly one register beat — the brass nameplate — at the stop. Line art on
 * a media block is allowed: it replaces the hatched X, it does not colour
 * the layer.
 */

import type { FaultBlock } from "./fault-walks";
import { FAULT_THEMES, whatWeLookFor, type FaultThemeId } from "./fault-walks";

/** The physical verbs the studio's scene grammar uses in clay
 *  (film/studio-recurring-themes.md stage 3), here done in CSS. One gesture
 *  per layer; the light is spent twice — the two lines that can go stale are
 *  the two that light. */
export const ASSEMBLY_GESTURES = ["seat", "slide", "unfold", "light"] as const;

export type AssemblyGesture = (typeof ASSEMBLY_GESTURES)[number];

/** One fault a layer prevents, in guest language. `walkId` links it to the
 *  fault walk's public demonstration of that fault — only themes the walk
 *  actually walks may be linked, asserted at module load. */
export interface AssemblyPrevent {
  label: string;
  walkId?: FaultThemeId;
}

export interface AssemblyBeat {
  kind: "layer";
  /** Page order, 1–5. The stop is not numbered — it is not a layer. */
  beat: number;
  /** Anchor id — also the reel slide's hash and the exploded key's target. */
  id: string;
  /** The beat's proper noun, in the fault walk's manner ("A door that opens"). */
  name: string;
  /** Two words for the hero fan's key line, lowercase. */
  key: string;
  themeIds: readonly FaultThemeId[];
  /** The owner-scan question on the index strip — first-class data, the way
   *  five-shapes made ownerQuestion data rather than parsing it from prose. */
  question: string;
  /** The customer moment the layer answers — never the studio's craft. */
  narration: string;
  gesture: AssemblyGesture;
  /** The self-check the owner takes away — one question per layer. */
  check: string;
  /** The quiet cross-reference: the documented faults the missing version of
   *  this layer is. The cross-reference does the convincing; no performance
   *  claim is ever made. */
  prevents: AssemblyPrevent[];
  /** Where the numbered marker sits on the exploded plate, percent of frame. */
  marker: { x: number; y: number };
  /** The marker's seat on the desktop plate. */
  desktopMarker: { x: number; y: number };
  /** The layer itself, in the fault walk's grey grammar. Mechanism words
   *  only; no goal. Line art may replace a hatched media block. */
  blocks: FaultBlock[];
  /** The same layer re-laid for the browser-window chassis: header, hero,
   *  main column with a rail, footer — the wide screen's composition of the
   *  same decisions. Same grey-grammar rules, asserted below. */
  desktopBlocks: FaultBlock[];
  /** Never a layer — the one drawn beat belongs to the stop. */
  drawn?: false;
}

export interface AssemblyStop {
  kind: "stop";
  id: string;
  name: string;
  themeIds: readonly FaultThemeId[];
  /** The stop as the exploded key's final entry. */
  keyLine: string;
  /** The page's one drawn beat: the blank nameplate hovering over the
   *  finished chassis — the swap test's own image, landing on our own
   *  chassis as candour: nothing here is anyone's yet. */
  drawn: true;
  /** Which beat's block becomes the register slot in the stop's chassis:
   *  the layer is built, but what it looks like cannot be grey's business. */
  slotBeat: number;
  slotBlock: number;
}

const band = (
  x: number,
  y: number,
  w: number,
  h: number,
  extra: Partial<FaultBlock> = {},
): FaultBlock => ({ kind: "band", x, y, w, h, ...extra });

/* One grid for both chassis. Desktop: 5 / 55 | 3 | 32 / 5. Phone: 8 / 84.
   Header row is name + hours. Meta row is address + record. Body rows are
   stock and the ask, locked to the same three baselines. */
const D = {
  in: 5,
  left: 55,
  rightX: 63,
  right: 32,
  full: 90,
  headY: 13.5,
  headH: 5.2,
  mediaY: 22.5,
  mediaH: 24,
  metaY: 49,
  metaH: 4.2,
  rowH: 5.6,
  row1: 56,
  row2: 63.4,
  row3: 70.8,
  footY: 80.5,
  footH: 5,
} as const;

const P = {
  in: 8,
  w: 84,
  hoursY: 6,
  hoursH: 5,
  nameY: 12.5,
  nameH: 7,
  mediaY: 21.5,
  mediaH: 16,
  addrY: 39.5,
  recY: 44.8,
  metaH: 4.2,
  rowH: 5,
  row1: 51,
  row2: 57,
  row3: 63,
  ask1: 70,
  ask2: 76.2,
  ask3: 82.4,
  askH: 5.4,
  footY: 90.2,
  footH: 4.4,
} as const;

export const assemblyBeats: AssemblyBeat[] = [
  {
    kind: "layer",
    beat: 1,
    id: "beat-1",
    name: "A door that opens, and a first screen that answers",
    key: "the arrival",
    themeIds: ["t1", "t2", "t4"],
    question: "Open now? Where? Right place?",
    narration:
      "Before it is anything, a site is somewhere a visitor can arrive — and most arrive with one question. Open now? Where? Is this the right place?",
    gesture: "light",
    check:
      "Does your first screen say whether you're open now, and where you are — with no account in the way?",
    prevents: [
      { label: "the login at the door", walkId: "t1" },
      { label: "the dead end" },
      { label: "“are you open?” left unanswered", walkId: "t4" },
    ],
    marker: { x: 92, y: P.hoursY + P.hoursH / 2 },
    desktopMarker: { x: D.rightX + D.right, y: D.headY },
    blocks: [
      { kind: "status", x: P.in, y: P.hoursY, w: P.w, h: P.hoursH, label: "open now · until 4 today" },
      { kind: "media", x: P.in, y: P.mediaY, w: P.w, h: P.mediaH, art: "arrival" },
      band(P.in, P.addrY, P.w, P.metaH, { label: "the address" }),
    ],
    desktopBlocks: [
      { kind: "status", x: D.rightX, y: D.headY, w: D.right, h: D.headH, label: "open now · until 4 today" },
      { kind: "media", x: D.in, y: D.mediaY, w: D.full, h: D.mediaH, art: "arrival" },
      band(D.in, D.metaY, 34, D.metaH, { label: "the address" }),
    ],
  },
  {
    kind: "layer",
    beat: 2,
    id: "beat-2",
    name: "The name on the fascia",
    key: "the name",
    themeIds: ["t3"],
    question: "Whose shop is this?",
    narration: "The biggest name on the site is yours. Suppliers get one confident line.",
    gesture: "seat",
    check: "Is your own name the biggest one on the page?",
    prevents: [{ label: "the supplier's name in the biggest type" }],
    marker: { x: 92, y: P.nameY + P.nameH / 2 },
    desktopMarker: { x: D.in + D.left, y: D.headY },
    blocks: [{ kind: "media", x: P.in, y: P.nameY, w: P.w, h: P.nameH, art: "fascia" }],
    desktopBlocks: [{ kind: "media", x: D.in, y: D.headY, w: D.left, h: D.headH, art: "fascia" }],
  },
  {
    kind: "layer",
    beat: 3,
    id: "beat-3",
    name: "The stock, readable",
    key: "the stock",
    themeIds: ["t8"],
    question: "What do they sell — readable here?",
    narration: "What you sell, as it is read on a phone — a page, not a file.",
    gesture: "unfold",
    check: "Can someone read what you sell on a phone, without opening a file?",
    prevents: [{ label: "the menu locked in a file" }],
    marker: { x: 92, y: P.row2 + P.rowH / 2 },
    desktopMarker: { x: D.in + D.left, y: D.row2 },
    blocks: [
      { kind: "row", x: P.in, y: P.row1, w: P.w, h: P.rowH, label: "today's list" },
      { kind: "row", x: P.in, y: P.row2, w: P.w, h: P.rowH, label: "the dish" },
      { kind: "row", x: P.in, y: P.row3, w: P.w, h: P.rowH, label: "the price" },
    ],
    desktopBlocks: [
      { kind: "row", x: D.in, y: D.row1, w: D.left, h: D.rowH, label: "today's list" },
      { kind: "row", x: D.in, y: D.row2, w: D.left, h: D.rowH, label: "the dish" },
      { kind: "row", x: D.in, y: D.row3, w: D.left, h: D.rowH, label: "the price" },
    ],
  },
  {
    kind: "layer",
    beat: 4,
    id: "beat-4",
    name: "An action with a mechanism, and the reason to use it",
    key: "the ask",
    themeIds: ["t5", "t6", "t7"],
    question: "Can I ask about the 14th?",
    narration:
      "Two fields — the date and the number of people — placed in front of your worries, with the thing you'd say in ten seconds at the counter on the first screen instead of in the footer.",
    gesture: "slide",
    check:
      "Can someone ask about a date on the page itself — and is your best reason the first thing they read?",
    prevents: [
      { label: "the bell with no clapper", walkId: "t5" },
      { label: "your worries in front of their question" },
      { label: "the best thing about you in the footer", walkId: "t7" },
    ],
    marker: { x: 92, y: P.ask2 + P.askH / 2 },
    desktopMarker: { x: D.rightX + D.right, y: D.row3 },
    blocks: [
      { kind: "status", x: P.in, y: P.recY, w: P.w, h: P.metaH, label: "the years · the record" },
      { kind: "field", x: P.in, y: P.ask1, w: P.w, h: P.askH, label: "the date" },
      { kind: "field", x: P.in, y: P.ask2, w: P.w, h: P.askH, label: "the party" },
      { kind: "button", x: P.in, y: P.ask3, w: P.w, h: P.askH, label: "ask" },
    ],
    desktopBlocks: [
      { kind: "status", x: D.rightX, y: D.metaY, w: D.right, h: D.metaH, label: "the years · the record" },
      { kind: "field", x: D.rightX, y: D.row1, w: D.right, h: D.rowH, label: "the date" },
      { kind: "field", x: D.rightX, y: D.row2, w: D.right, h: D.rowH, label: "the party" },
      { kind: "button", x: D.rightX, y: D.row3, w: D.right, h: D.rowH, label: "ask" },
    ],
  },
  {
    kind: "layer",
    beat: 5,
    id: "beat-5",
    name: "The honest handoff",
    key: "the handoff",
    themeIds: ["t9"],
    question: "Is this still true today?",
    narration:
      "The page keeps what doesn't go stale, and hands today to the source that is always fresh.",
    gesture: "light",
    check: "Does your site say what is current today — and where the always-fresh version lives?",
    prevents: [{ label: "the stopped clock" }],
    marker: { x: 92, y: P.footY + P.footH / 2 },
    desktopMarker: { x: D.in + D.full, y: D.footY },
    blocks: [band(P.in, P.footY, P.w, P.footH, { label: "today, at the source" })],
    desktopBlocks: [band(D.in, D.footY, D.full, D.footH, { label: "today, at the source" })],
  },
];

export const assemblyStop: AssemblyStop = {
  kind: "stop",
  id: "the-stop",
  name: "The stop",
  themeIds: ["t10"],
  keyLine: "Up to here, every good site is the same site — past here, it has to be yours.",
  drawn: true,
  slotBeat: 2,
  slotBlock: 0,
};

/* --- module-load assertions ------------------------------------------------
   The page's rules, enforced the way five-shapes enforces its one-colour
   rule: incompleteness fails `astro build`, not just the test suite. */

const publicWalkIds = new Set(
  whatWeLookFor.filter((entry) => entry.kind === "walk").map((entry) => entry.id),
);

if (assemblyBeats.length !== 5) {
  throw new Error(`assembly: expected five beats (found ${assemblyBeats.length}).`);
}

for (const [index, beat] of assemblyBeats.entries()) {
  if (beat.beat !== index + 1 || beat.id !== `beat-${index + 1}`) {
    throw new Error(`assembly: ${beat.id} is out of page order.`);
  }
  for (const field of ["name", "key", "question", "narration", "check"] as const) {
    if (!beat[field].trim()) {
      throw new Error(`assembly: ${beat.id} is missing its ${field}.`);
    }
  }
  if (!ASSEMBLY_GESTURES.includes(beat.gesture)) {
    throw new Error(`assembly: ${beat.id} has unknown gesture "${beat.gesture}".`);
  }
  if (beat.blocks.length === 0) {
    throw new Error(`assembly: ${beat.id} brings no layer.`);
  }
  if (beat.desktopBlocks.length === 0) {
    throw new Error(`assembly: ${beat.id} brings no desktop layer.`);
  }
  if (beat.prevents.length === 0) {
    throw new Error(`assembly: ${beat.id} prevents nothing — the cross-reference is the authority.`);
  }
  for (const { x, y } of [beat.marker, beat.desktopMarker]) {
    if (x < 0 || x > 100 || y < 0 || y > 100) {
      throw new Error(`assembly: ${beat.id} marker (${x}, ${y}) is outside 0–100.`);
    }
  }
  for (const prevent of beat.prevents) {
    if (prevent.walkId && !publicWalkIds.has(prevent.walkId)) {
      throw new Error(
        `assembly: ${beat.id} links "${prevent.label}" to ${prevent.walkId}, which has no public walk.`,
      );
    }
  }
  /* Rule 3: beats 1–5 carry no register colour. Line art may replace a hatch. */
  for (const block of [...beat.blocks, ...beat.desktopBlocks]) {
    if (block.goal) {
      throw new Error(`assembly: ${beat.id} smuggles in a colour beat.`);
    }
  }
}

/* The ten themes, answered exactly once across the beats and the stop — one
   data source, so this page and the fault walk cannot drift apart. */
const answered = [...assemblyBeats, assemblyStop].flatMap((entry) => entry.themeIds);
const allThemes = Object.keys(FAULT_THEMES) as FaultThemeId[];
for (const id of answered) {
  if (!allThemes.includes(id)) {
    throw new Error(`assembly: "${id}" is not a theme in the shared taxonomy.`);
  }
}
const seen = new Set<FaultThemeId>();
for (const id of answered) {
  if (seen.has(id)) {
    throw new Error(`assembly: ${id} is answered twice.`);
  }
  seen.add(id);
}
for (const id of allThemes) {
  if (!seen.has(id)) {
    throw new Error(`assembly: ${id} ("${FAULT_THEMES[id]}") is answered by no beat.`);
  }
}

/* Exactly one drawn beat, at the stop. */
const drawnCount =
  assemblyBeats.filter((beat) => beat.drawn).length + (assemblyStop.drawn ? 1 : 0);
if (drawnCount !== 1 || assemblyStop.drawn !== true) {
  throw new Error("assembly: the page carries exactly one drawn beat, and it is the stop.");
}

/* The register slot must be a real block on a real layer. */
const slotBeat = assemblyBeats.find((beat) => beat.beat === assemblyStop.slotBeat);
if (!slotBeat || !slotBeat.blocks[assemblyStop.slotBlock]) {
  throw new Error("assembly: the stop's register slot points at no block.");
}
