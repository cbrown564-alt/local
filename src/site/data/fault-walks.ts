/**
 * The five fault-walks for /what-we-look-for/ — a curated public reel from
 * the ten-fault taxonomy in research/film/studio-recurring-themes.md, briefed
 * in research/what-we-look-for-brief.md.
 *
 * The discipline is the same as transformation-details.ts: the errands are
 * data, one component walks all five. Every mock is invented — grey blocks,
 * no business name, no real site's fault. Blocks carry a legible label only
 * when the errand needs the mechanism word ("translate", "book", "download
 * menu"); everything else is a placeholder bar.
 *
 * Numbers here are the mock's own. `beforeCost` / `afterCost` are what the
 * wireframe itself does, stated on the static plates. Real measured figures
 * stay on the transformation pages, where the business is named and the
 * audit is dated.
 */

export const FAULT_SHAPES = [
  "a counter business",
  "a place",
  "a product",
  "a care practice",
  "a trade",
] as const;

/** The elevation method's five shapes — the only label a mock ever gets. */
export type FaultShape = (typeof FAULT_SHAPES)[number];

/** The studio's ten-fault taxonomy, from
 *  research/film/studio-recurring-themes.md stage 2. The fault walk publishes
 *  five of the ten as walkable errands; the assembly page
 *  (/how-a-site-goes-together/) answers all ten as layers. Ids and names live
 *  here once so the two pages cannot drift apart. */
export const FAULT_THEMES = {
  t1: "The login at the door",
  t2: "The dead end",
  t3: "Whose shop is this?",
  t4: "Nobody answers “are you open?”",
  t5: "The bell with no clapper",
  t6: "Your worries, in front of their question",
  t7: "The best thing about you is in the footer",
  t8: "Locked in a file",
  t9: "The stopped clock",
  t10: "The swap test",
} as const;

export type FaultThemeId = keyof typeof FAULT_THEMES;

export type FaultBlockKind =
  | "band"
  | "micro"
  | "block"
  | "media"
  | "button"
  | "field"
  | "card"
  | "row"
  | "shield"
  | "mark"
  | "scroll"
  | "empty"
  | "status"
  | "sheet";

export interface FaultBlock {
  /** Position inside the phone frame, in percent of the frame. */
  x: number;
  y: number;
  w: number;
  h: number;
  kind: FaultBlockKind;
  /** The only legible words allowed: the mechanism the errand needs. */
  label?: string;
  /** Panel id this tap leads to. */
  tap?: string;
  /** Tapping this completes the errand. */
  goal?: boolean;
  /** Narration shown when this decoy is tapped. */
  note?: string;
  /** Greyed-out content behind a dialog. */
  dim?: boolean;
  /** Drawn line art for the block, rendered by FaultPanelView through
   *  five-shapes/TheatreArt.astro — used only by the /five-shapes/ plates,
   *  where the theatre beat is a drawn scene, not a hatched placeholder. */
  art?: string;
}

export interface FaultPanel {
  id: string;
  /** Screen-reader announcement when the walk reaches this panel. */
  caption: string;
  /** Narration shown beside the frame while this panel is up. */
  note?: string;
  blocks: FaultBlock[];
}

export interface FaultWalkStop {
  /** "blocked" — the errand cannot be completed; "found" — completed at a cost. */
  kind: "blocked" | "found";
  /** For "blocked" walks, the panel where the errand ends. */
  panel?: string;
  /** The readout when the before-walk ends. Live counts are appended. */
  note: string;
}

export interface FaultWalk {
  kind: "walk";
  id: string;
  theme: string;
  shape: FaultShape;
  /** The line an owner should be able to say back after ten seconds. */
  message: string;
  /** The self-check the owner takes away — one question per fault. */
  check: string;
  /** The reasonable decision behind the fault — somebody was advised to do it. */
  decision: string;
  errand: string;
  /** Panels[0] is where the walk starts. */
  before: FaultPanel[];
  /** The fixed walk: one panel, one productive tap. */
  after: FaultPanel[];
  /** Which panels become the static plates (no-JS and reduced-motion). */
  posters: { before: string; after: string };
  stop: FaultWalkStop;
  /** The readout when the fixed walk completes. */
  fixedNote: string;
  /** Stated on the static plates — the mock's own numbers, as text. */
  beforeCost: string;
  afterCost: string;
  /** Test pin: the before-walk cannot finish in fewer taps. null = never. */
  minBeforeTaps: number | null;
  afterTaps: number;
  /** True when the fault is that the goal is the smallest target on screen. */
  goalIsHidden?: boolean;
}

export interface SwapTestTheme {
  kind: "swap";
  id: string;
  theme: string;
  shape: FaultShape;
  message: string;
  /** The self-check the owner takes away — one question per fault. */
  check: string;
  decision: string;
}

export type WhatWeLookForEntry = FaultWalk | SwapTestTheme;

const band = (
  x: number,
  y: number,
  w: number,
  h: number,
  extra: Partial<FaultBlock> = {},
): FaultBlock => ({ kind: "band", x, y, w, h, ...extra });

/** Reel order: three access faults, one identity fault, the swap test last.
 *  The studio taxonomy still has ten; this page walks the five that earn a
 *  public demonstration. */
export const whatWeLookFor: WhatWeLookForEntry[] = [
  {
    kind: "walk",
    id: "t1",
    theme: "The login at the door",
    shape: "a counter business",
    message: "A visitor should not need an account to find your front door.",
    check: "Can a visitor see what you sell without an account?",
    decision:
      "The social page was free and quick to set up, and the login wall came with it. It felt like having a website.",
    errand: "See what they sell",
    before: [
      {
        id: "gate",
        caption: "A consent dialog covers the greyed-out page.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22, dim: true },
          band(10, 34, 64, 4, { dim: true }),
          band(10, 40, 80, 4, { dim: true }),
          band(10, 46, 52, 4, { dim: true }),
          { kind: "card", x: 14, y: 28, w: 72, h: 42 },
          band(22, 36, 56, 4),
          band(22, 43, 44, 4),
          { kind: "button", x: 22, y: 54, w: 40, h: 7, label: "Accept", tap: "wall" },
          {
            kind: "button",
            x: 22,
            y: 62,
            w: 48,
            h: 7,
            label: "Manage choices",
            note: "A maze of toggles. The page is still behind it.",
          },
        ],
      },
      {
        id: "wall",
        caption: "A login panel. No account, no way past.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22, dim: true },
          band(10, 34, 64, 4, { dim: true }),
          band(10, 40, 80, 4, { dim: true }),
          band(10, 46, 52, 4, { dim: true }),
          { kind: "card", x: 14, y: 24, w: 72, h: 54 },
          band(22, 31, 40, 4),
          { kind: "field", x: 22, y: 39, w: 56, h: 7, label: "email" },
          { kind: "field", x: 22, y: 48, w: 56, h: 7, label: "password" },
          {
            kind: "button",
            x: 22,
            y: 59,
            w: 56,
            h: 8,
            label: "Log in",
            note: "No account. No visit.",
          },
          {
            kind: "band",
            x: 22,
            y: 70,
            w: 56,
            h: 5,
            label: "Create account",
            note: "Twenty minutes of forms, to see a café's page.",
          },
        ],
      },
    ],
    after: [
      {
        id: "open",
        caption: "The page itself. What they sell is the first thing on it.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 24, art: "board" },
          band(10, 36, 56, 5),
          band(10, 43, 80, 4),
          band(10, 49, 72, 4),
          {
            kind: "button",
            x: 10,
            y: 60,
            w: 80,
            h: 11,
            label: "today's board",
            goal: true,
          },
        ],
      },
    ],
    posters: { before: "wall", after: "open" },
    stop: {
      kind: "blocked",
      panel: "wall",
      note: "Stopped. No account, no visit — and you never saw what they sell.",
    },
    fixedNote: "One tap. The content itself, no account.",
    beforeCost: "no way through",
    afterCost: "1 tap",
    minBeforeTaps: null,
    afterTaps: 1,
  },
  {
    kind: "walk",
    id: "t4",
    theme: "Nobody answers “are you open?”",
    shape: "a counter business",
    message: "People arrive with one question. The first screen should answer it.",
    check: "Does your first screen say whether you're open now?",
    decision:
      "The hours are on the site — they're just two screens down, under a translate bar somebody recommended and a video somebody paid for.",
    errand: "Find out if they're open now",
    before: [
      {
        id: "top",
        caption: "First screen: a translation bar and a video. No hours.",
        blocks: [
          {
            kind: "band",
            x: 10,
            y: 8,
            w: 34,
            h: 5,
            label: "translate",
            note: "Twenty-eight languages. None of them say the hours.",
          },
          {
            kind: "media",
            x: 10,
            y: 16,
            w: 80,
            h: 24,
            label: "video",
            note: "A silent video of the bay. No hours.",
          },
          band(10, 44, 64, 4),
          band(10, 50, 80, 4),
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "middle" },
        ],
      },
      {
        id: "middle",
        caption: "Second screen: photographs and a map. No hours.",
        note: "Still looking?",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 38, h: 20 },
          { kind: "media", x: 52, y: 8, w: 38, h: 20 },
          band(10, 32, 80, 4),
          band(10, 38, 58, 4),
          {
            kind: "media",
            x: 10,
            y: 46,
            w: 80,
            h: 18,
            label: "map",
            note: "A map of where they are. Not whether they're open.",
          },
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "deep" },
        ],
      },
      {
        id: "deep",
        caption: "Third screen: the hours, at last, near the foot of the page.",
        blocks: [
          band(10, 10, 80, 4),
          band(10, 16, 58, 4),
          band(10, 24, 80, 4),
          band(10, 30, 70, 4),
          { kind: "status", x: 10, y: 72, w: 56, h: 5, label: "Tue–Sun · 9–4", goal: true },
          band(10, 82, 40, 4),
        ],
      },
    ],
    after: [
      {
        id: "first",
        caption: "The answer is the first line on the first screen.",
        blocks: [
          {
            kind: "status",
            x: 10,
            y: 10,
            w: 68,
            h: 6,
            label: "Open now · until 4 today",
            goal: true,
          },
          { kind: "media", x: 10, y: 22, w: 80, h: 24, art: "arrival" },
          band(10, 50, 64, 4),
          band(10, 56, 80, 4),
        ],
      },
    ],
    posters: { before: "top", after: "first" },
    stop: {
      kind: "found",
      note: "Found them — two screens down, past everything else. Most people stop before that.",
    },
    fixedNote: "One tap. The first screen answers the one question.",
    beforeCost: "3 taps · 2 screens down",
    afterCost: "1 tap",
    minBeforeTaps: 3,
    afterTaps: 1,
  },
  {
    kind: "walk",
    id: "t5",
    theme: "The bell with no clapper",
    shape: "a place",
    message: "“Get in touch” means the visitor does the work.",
    check: "Can someone ask about a date on the page itself?",
    decision:
      "A form felt like a big build. A phone number was already on the page, and everybody knows how a phone works.",
    errand: "Ask whether the 14th is free",
    before: [
      {
        id: "page",
        caption: "A Book button, exactly where it should be.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 24 },
          band(10, 36, 60, 5),
          band(10, 43, 80, 4),
          { kind: "button", x: 10, y: 56, w: 40, h: 8, label: "Book", tap: "number" },
          band(10, 70, 80, 4),
        ],
      },
      {
        id: "number",
        caption:
          "The booking page: a phone number and an email address. The 14th cannot be asked about here.",
        blocks: [
          band(10, 14, 44, 5),
          {
            kind: "band",
            x: 10,
            y: 28,
            w: 64,
            h: 8,
            label: "a phone number",
            note: "Ringing it is you doing the work.",
          },
          {
            kind: "band",
            x: 10,
            y: 41,
            w: 72,
            h: 6,
            label: "an email address",
            note: "An email about the 14th, answered whenever.",
          },
          band(10, 58, 80, 4),
        ],
      },
    ],
    after: [
      {
        id: "ask",
        caption: "Two fields — the date and the party — and one button.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 18, art: "ask" },
          { kind: "field", x: 10, y: 32, w: 80, h: 8, label: "the date" },
          { kind: "field", x: 10, y: 42, w: 80, h: 8, label: "the party" },
          { kind: "button", x: 10, y: 56, w: 80, h: 9, label: "Ask", goal: true },
          band(10, 72, 70, 4),
        ],
      },
    ],
    posters: { before: "number", after: "ask" },
    stop: {
      kind: "blocked",
      panel: "number",
      note: "Stopped. A phone number is not an answer about the 14th — the asking is left to you.",
    },
    fixedNote: "One tap. The date and the party, asked on the page.",
    beforeCost: "no way through",
    afterCost: "1 tap",
    minBeforeTaps: null,
    afterTaps: 1,
  },
  {
    kind: "walk",
    id: "t7",
    theme: "The best thing about you is in the footer",
    shape: "a trade",
    message:
      "The thing you'd say in ten seconds at the counter isn't on the site at all.",
    check: "Is the best reason to choose you the first thing on the page?",
    decision:
      "The record felt like boasting, so it went in the footer, where modest things go to hide.",
    errand: "Find the best reason to choose them",
    before: [
      {
        id: "top",
        caption: "A competent first screen. It could be anyone's.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22 },
          band(10, 34, 56, 5),
          band(10, 41, 80, 4),
          band(10, 47, 68, 4),
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "services" },
        ],
      },
      {
        id: "services",
        caption: "Services, correctly listed. Still anyone's.",
        note: "Still looking?",
        blocks: [
          band(10, 10, 80, 4),
          band(10, 16, 64, 4),
          band(10, 22, 80, 4),
          band(10, 28, 58, 4),
          { kind: "media", x: 10, y: 38, w: 80, h: 20 },
          band(10, 62, 70, 4),
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "foot" },
        ],
      },
      {
        id: "foot",
        caption: "The footer: the years, the award and the accreditations — in small type.",
        blocks: [
          band(10, 12, 80, 4),
          band(10, 18, 60, 4),
          {
            kind: "band",
            x: 6,
            y: 66,
            w: 88,
            h: 5,
            label: "the years · the award · the accreditations",
            goal: true,
          },
          { kind: "mark", x: 16, y: 76, w: 10, h: 10 },
          { kind: "mark", x: 34, y: 76, w: 10, h: 10 },
          { kind: "mark", x: 52, y: 76, w: 10, h: 10 },
        ],
      },
    ],
    after: [
      {
        id: "record",
        caption: "The record is the first thing you meet.",
        blocks: [
          {
            kind: "status",
            x: 2,
            y: 10,
            w: 96,
            h: 6,
            label: "the years · the award · the accreditations",
            goal: true,
          },
          { kind: "mark", x: 16, y: 21, w: 10, h: 10 },
          { kind: "mark", x: 34, y: 21, w: 10, h: 10 },
          { kind: "mark", x: 52, y: 21, w: 10, h: 10 },
          { kind: "media", x: 10, y: 38, w: 80, h: 22, art: "arrival" },
          band(10, 64, 70, 4),
        ],
      },
    ],
    posters: { before: "top", after: "record" },
    stop: {
      kind: "found",
      note: "Found it — three screens down, in the footer. The thing they'd tell you in ten seconds at the counter.",
    },
    fixedNote: "One tap. The best reason is the first screen.",
    beforeCost: "3 taps · 2 screens down",
    afterCost: "1 tap",
    minBeforeTaps: 3,
    afterTaps: 1,
  },
  {
    kind: "swap",
    id: "t10",
    theme: "The swap test",
    shape: "a trade",
    message:
      "Swap your name for a competitor's. If nothing else needs changing, the site isn't yours.",
    check: "Swap your name for a competitor's — would anything else need to change?",
    decision:
      "A clean template with the name dropped in looked like a safe, professional choice. It looked like everyone else's, too.",
  },
];

/* The taxonomy is the single source for ids and names: a walk whose id or
   theme drifts from FAULT_THEMES fails the build, not just a review. */
for (const entry of whatWeLookFor) {
  const name = FAULT_THEMES[entry.id as FaultThemeId];
  if (!name) {
    throw new Error(`fault-walks: "${entry.id}" is not a theme in the shared taxonomy.`);
  }
  if (name !== entry.theme) {
    throw new Error(
      `fault-walks: ${entry.id} is named "${entry.theme}" here but "${name}" in the shared taxonomy.`,
    );
  }
}
