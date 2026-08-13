/**
 * The five plates for /five-shapes/ — the page briefed in
 * research/five-shapes-brief.md, publishing the shape → register table from
 * docs/the-elevation-method.md the way the fault walk publishes the fault
 * taxonomy.
 *
 * One component draws all five plates (components/five-shapes/ShapePlate.astro);
 * the answers are data. Every plate answers the same five questions in the same
 * order — the parallel structure is the argument: held constant everywhere
 * else, the differences that remain are exactly the ones the business forces.
 * The screens are invented — grey blocks, mechanism words only, no business's
 * name, palette or typeface (a plate with a finish becomes the template
 * gallery this page exists not to be). The one exception is the theatre
 * beat: that block carries a drawn scene (`art`) in the same line hand —
 * the windows at dusk, the steaming dish, the melt, the safety net, the
 * open road — because staging is the one thing a wireframe can only name.
 * The wrong-register control from the brief is deliberately absent: the page
 * must be complete without it, and it has not survived a prototype.
 *
 * Shape labels reuse the fault walk's exact wording, so the two pages teach
 * one vocabulary. Worked-example links go only to public transformations,
 * asserted at module load so a withdrawn concept fails the build rather than
 * shipping a dead link.
 */

import { publicTransformationSlugs } from "../../../api/public-transformation-slugs.mjs";
import type { FaultBlock, FaultPanel, FaultShape } from "./fault-walks";

/** The five questions every plate answers, in plate order. */
export const SHAPE_QUESTIONS = {
  buys: "What does the visitor buy?",
  firstScreen: "What is the first screen for?",
  action: "What does the action ask?",
  handoff: "What must stay current, and where does that live?",
  theatre: "What is worth staging?",
} as const;

export type ShapeAnswerKey = keyof typeof SHAPE_QUESTIONS;

export const SHAPE_ANSWER_ORDER = [
  "buys",
  "firstScreen",
  "action",
  "handoff",
  "theatre",
] as const satisfies readonly ShapeAnswerKey[];

export interface ShapeAnswer {
  /** The plate's answer to the question — what this shape needs, never how
   *  common anything is (the prevalence prohibition propagates here). */
  answer: string;
  /** Where the numbered marker sits on the plate, in percent of the frame. */
  marker: { x: number; y: number };
}

export interface ShapeExample {
  /** A public transformation slug — checked against
   *  publicTransformationSlugs at module load. */
  slug: string;
  name: string;
}

export interface ShapePlate {
  /** Anchor id and reel order: place, counter, product, care, trade. */
  id: "place" | "counter" | "product" | "care" | "trade";
  /** The fault walk's exact wording — the only label a plate gets. */
  shape: FaultShape;
  /** Where the essence lives, from the method's table. */
  essence: string;
  /** The first-screen question an owner scans for themselves — the strip
   *  under the opening, not derived from the answer prose. */
  ownerQuestion: string;
  /** One answer per SHAPE_QUESTIONS entry — a plate missing any of the
   *  five is incomplete by construction. */
  answers: Record<ShapeAnswerKey, ShapeAnswer>;
  /** The drawn first screen, in the fault walk's grey grammar. Exactly one
   *  block carries goal — the theatre moment, the plate's one colour beat. */
  screen: FaultPanel;
  examples: ShapeExample[];
  /** How this kind of site adapts the foundation parts from /how-its-made/. */
  buildFocus?: {
    beatId: string;
    part: number;
    text: string;
  };
}

/** Desktop plate layout — written onto the stage as CSS variables. */
export const SHAPE_PLATE_LAYOUT = {
  frameWidthPx: 200,
  /** Air between the phone and the numbered notes. */
  gapPx: 50,
} as const;

const band = (
  x: number,
  y: number,
  w: number,
  h: number,
  extra: Partial<FaultBlock> = {},
): FaultBlock => ({ kind: "band", x, y, w, h, ...extra });

export const fiveShapes: ShapePlate[] = [
  {
    id: "place",
    shape: "a place",
    essence: "The essence lives in the grounds and the building.",
    ownerQuestion: "Is this where I want to wake up?",
    buildFocus: {
      beatId: "beat-1",
      part: 1,
      text: "expands the arrival into the full first screen",
    },
    answers: {
      buys: {
        answer: "A stay. Every other line on this plate follows from that one.",
        marker: { x: 30, y: 40.5 },
      },
      firstScreen: {
        answer:
          "Is this where I want to wake up? The grounds and the windows answer before any word does.",
        marker: { x: 88, y: 12 },
      },
      action: {
        answer: "The dates and the party — the two things a stay is made of, asked on the page.",
        marker: { x: 88, y: 71.5 },
      },
      handoff: {
        answer:
          "The season's occasions go stale weekly, so they live at the source. The rooms don't move.",
        marker: { x: 86, y: 85 },
      },
      theatre: {
        answer: "Atmosphere — the windows lit at dusk. The stay, shown at its best moment.",
        marker: { x: 22, y: 26 },
      },
    },
    screen: {
      id: "screen",
      caption:
        "Grey layout of a place's first screen: the windows lit at dusk above the business's name, fields for the dates and the party, one button to ask about a stay, and the season handed to the source.",
      blocks: [
        { kind: "media", x: 10, y: 8, w: 80, h: 26, label: "the windows at dusk", goal: true, art: "dusk" },
        band(10, 38, 54, 5),
        band(10, 45, 70, 4),
        { kind: "field", x: 10, y: 55, w: 38, h: 8, label: "the dates" },
        { kind: "field", x: 52, y: 55, w: 38, h: 8, label: "the party" },
        { kind: "button", x: 10, y: 67, w: 80, h: 9, label: "ask about a stay" },
        band(10, 83, 72, 4, { label: "the season, at the source" }),
      ],
    },
    examples: [
      { slug: "hotel-enniskeen", name: "Enniskeen Country House Hotel" },
      { slug: "dundrum-inn", name: "The Dundrum Inn" },
      { slug: "donard-hotel", name: "The Donard Hotel" },
    ],
  },
  {
    id: "counter",
    shape: "a counter business",
    essence: "The essence lives in appetite and the week's rhythm.",
    ownerQuestion: "What's on today, and until when?",
    buildFocus: {
      beatId: "beat-2",
      part: 2,
      text: "places today’s board and the week’s rhythm on the street",
    },
    answers: {
      buys: {
        answer: "A meal — often decided from the street, often today.",
        marker: { x: 30, y: 50.5 },
      },
      firstScreen: {
        answer: "What's on today, and until when? The one question, answered before the scroll.",
        marker: { x: 86, y: 11 },
      },
      action: {
        answer: "Nothing. The page shows the week and the walk-in — the deciding happens on it.",
        marker: { x: 86, y: 61.5 },
      },
      handoff: {
        answer:
          "Today's board and hours live at the source that stays fresh. The week's rhythm is the page's.",
        marker: { x: 88, y: 90 },
      },
      theatre: {
        answer: "Appetite — one dish, steaming, at its best moment.",
        marker: { x: 22, y: 32 },
      },
    },
    screen: {
      id: "screen",
      caption:
        "Grey layout of a counter business's first screen: open-now hours at the top, one steaming dish, the business's name, the week in rows, a walk-in line, and today's board handed to the source. No button anywhere.",
      blocks: [
        { kind: "status", x: 10, y: 8, w: 72, h: 6, label: "open now · until 3 today" },
        { kind: "media", x: 10, y: 20, w: 80, h: 24, label: "steaming", goal: true, art: "steam" },
        band(10, 48, 52, 5),
        { kind: "row", x: 10, y: 58, w: 80, h: 7, label: "the week" },
        { kind: "row", x: 10, y: 68, w: 80, h: 7 },
        band(10, 79, 44, 4, { label: "walk in as you are" }),
        band(10, 88, 76, 4, { label: "today's board, at the source" }),
      ],
    },
    examples: [
      { slug: "scopers", name: "Scopers" },
      { slug: "cupla", name: "Cúpla" },
      { slug: "hugh-mccanns", name: "Hugh McCann's" },
    ],
  },
  {
    id: "product",
    shape: "a product",
    essence: "The essence lives in the moment the product is for.",
    ownerQuestion: "When would I open this?",
    buildFocus: {
      beatId: "beat-3",
      part: 3,
      text: "makes the stock readable before the price",
    },
    answers: {
      buys: {
        answer: "A jar — something opened at a table, not an account to manage.",
        marker: { x: 30, y: 40.5 },
      },
      firstScreen: {
        answer: "When would I open this? The moment the product is for comes before the price.",
        marker: { x: 88, y: 13 },
      },
      action: {
        answer:
          "Where to find it near you — the stockists and the market days, not a basket and a login.",
        marker: { x: 72, y: 60 },
      },
      handoff: {
        answer:
          "Live stock and market days move weekly, so they live on the feed. The moment doesn't move.",
        marker: { x: 88, y: 86 },
      },
      theatre: {
        answer: "The table — the melt. The product doing the one thing it was bought for.",
        marker: { x: 22, y: 28 },
      },
    },
    screen: {
      id: "screen",
      caption:
        "Grey layout of a product's first screen: the product at its moment above the product's name, one button to find it near you, the stockists, and market days handed to the source.",
      blocks: [
        { kind: "media", x: 10, y: 8, w: 80, h: 26, label: "the melt", goal: true, art: "melt" },
        band(10, 38, 52, 5),
        band(10, 45, 68, 4),
        { kind: "button", x: 10, y: 56, w: 58, h: 8, label: "find it near you" },
        { kind: "row", x: 10, y: 70, w: 80, h: 7, label: "the stockists" },
        band(10, 84, 74, 4, { label: "market days, at the source" }),
      ],
    },
    examples: [
      { slug: "bettys-butters", name: "Betty's Better Butters" },
      { slug: "painted-earth", name: "Painted Earth" },
    ],
  },
  {
    id: "care",
    shape: "a care practice",
    essence: "The essence lives in emotion under management.",
    ownerQuestion: "Can they see us, and soon?",
    buildFocus: {
      beatId: "beat-4",
      part: 4,
      text: "puts the action in front of the worries",
    },
    answers: {
      buys: {
        answer: "Relief. Somebody arrives worried; the page's job is to worry less than they do.",
        marker: { x: 30, y: 22.5 },
      },
      firstScreen: {
        answer: "Can they see us, and soon? Reassurance before the list of services.",
        marker: { x: 88, y: 11 },
      },
      action: {
        answer:
          "Who needs seen, and when — with the emergency route unmissable, never behind a form.",
        marker: { x: 88, y: 72.5 },
      },
      handoff: {
        answer: "Today's availability moves with the diary; the phone holds it. The page holds still.",
        marker: { x: 88, y: 86 },
      },
      theatre: {
        answer: "Reassurance — the safety net, stated plainly. The calmest plate here, on purpose.",
        marker: { x: 88, y: 42.5 },
      },
    },
    screen: {
      id: "screen",
      caption:
        "Grey layout of a care practice's first screen: a seeing-patients-today line, the practice's name, the emergency route as the one solid button, fields asking who needs seen and when, and today's diary handed to the source.",
      blocks: [
        { kind: "status", x: 10, y: 8, w: 74, h: 6, label: "seeing patients today" },
        band(10, 20, 56, 5),
        band(10, 27, 72, 4),
        { kind: "button", x: 10, y: 38, w: 80, h: 9, label: "the emergency route", goal: true, art: "net" },
        { kind: "field", x: 10, y: 54, w: 38, h: 8, label: "who needs seen" },
        { kind: "field", x: 52, y: 54, w: 38, h: 8, label: "when" },
        { kind: "button", x: 10, y: 68, w: 80, h: 9, label: "ask for a slot" },
        band(10, 84, 74, 4, { label: "today's diary, at the source" }),
      ],
    },
    examples: [
      { slug: "donard-veterinary", name: "Donard Veterinary Clinic" },
      { slug: "newcastle-dental", name: "Newcastle Family Dental Care" },
    ],
  },
  {
    id: "trade",
    shape: "a trade",
    essence: "The essence lives in access and expertise.",
    ownerQuestion: "Do they know their stuff, and can they fix mine?",
    buildFocus: {
      beatId: "beat-4",
      part: 4,
      text: "brings the track record out of the footer",
    },
    answers: {
      buys: {
        answer: "A ride — the fixed bike, the right tool, the job done.",
        marker: { x: 32, y: 48.5 },
      },
      firstScreen: {
        answer: "Do they know their stuff, and can they fix mine? The record is the first line.",
        marker: { x: 90, y: 11 },
      },
      action: {
        answer: "The job and the week you need it — two fields, no account.",
        marker: { x: 88, y: 60 },
      },
      handoff: {
        answer: "The queue moves daily, so it lives at the counter. The page holds the expertise.",
        marker: { x: 88, y: 88 },
      },
      theatre: {
        answer: "Freedom — the open road. The thing the fixing is for.",
        marker: { x: 24, y: 30 },
      },
    },
    screen: {
      id: "screen",
      caption:
        "Grey layout of a trade's first screen: the record as the first line, the open road beneath it, the shop's name, fields for the job and the week, one button to book the bench, and the queue handed to the counter.",
      blocks: [
        { kind: "status", x: 10, y: 8, w: 88, h: 6, label: "the years · the record" },
        { kind: "media", x: 10, y: 20, w: 80, h: 22, label: "the open road", goal: true, art: "road" },
        band(10, 46, 54, 5),
        { kind: "field", x: 10, y: 56, w: 38, h: 8, label: "the job" },
        { kind: "field", x: 52, y: 56, w: 38, h: 8, label: "the week" },
        { kind: "button", x: 10, y: 70, w: 80, h: 9, label: "book the bench" },
        band(10, 86, 74, 4, { label: "the queue, at the counter" }),
      ],
    },
    examples: [
      { slug: "mourne-cycles", name: "Mourne Cycles" },
      { slug: "tool-centre", name: "The Tool Centre" },
    ],
  },
];

/* Completeness fails the build here rather than shipping a quiet gap:
   worked examples must be public, each plate needs its strip question, the
   theatre beat must be exactly one block, and markers stay inside the frame. */
const publicSlugs = new Set<string>(publicTransformationSlugs);
for (const plate of fiveShapes) {
  if (!plate.ownerQuestion.trim()) {
    throw new Error(`five-shapes: ${plate.id} is missing its ownerQuestion.`);
  }
  const goals = plate.screen.blocks.filter((block) => block.goal);
  if (goals.length !== 1) {
    throw new Error(
      `five-shapes: ${plate.id} needs exactly one theatre beat (found ${goals.length}).`,
    );
  }
  for (const key of SHAPE_ANSWER_ORDER) {
    const { x, y } = plate.answers[key].marker;
    if (x < 0 || x > 100 || y < 0 || y > 100) {
      throw new Error(
        `five-shapes: ${plate.id}.${key} marker (${x}, ${y}) is outside 0–100.`,
      );
    }
  }
  for (const example of plate.examples) {
    if (!publicSlugs.has(example.slug)) {
      throw new Error(
        `five-shapes: ${plate.id} names non-public transformation "${example.slug}" as a worked example.`,
      );
    }
  }
}
