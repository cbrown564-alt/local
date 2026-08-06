/**
 * The ten fault-walks for /prototypes/what-we-look-for/ — the page briefed in
 * research/what-we-look-for-brief.md, staging the fault taxonomy from
 * research/film/studio-recurring-themes.md as invented wireframes.
 *
 * The discipline is the same as transformation-details.ts: the errands are
 * data, one component walks all ten. Every mock is invented — grey blocks,
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

export interface FaultLink {
  /** A public transformation slug — the business named, the audit dated. */
  slug: string;
  name: string;
}

export interface FaultWalk {
  kind: "walk";
  id: string;
  theme: string;
  shape: FaultShape;
  /** The line an owner should be able to say back after ten seconds. */
  message: string;
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
  links: FaultLink[];
}

export interface SwapTestTheme {
  kind: "swap";
  id: string;
  theme: string;
  shape: FaultShape;
  message: string;
  decision: string;
  links: FaultLink[];
}

export type WhatWeLookForEntry = FaultWalk | SwapTestTheme;

const band = (
  x: number,
  y: number,
  w: number,
  h: number,
  extra: Partial<FaultBlock> = {},
): FaultBlock => ({ kind: "band", x, y, w, h, ...extra });

/** Reel order from the taxonomy: access faults first, identity faults
 *  second, the swap test last. */
export const whatWeLookFor: WhatWeLookForEntry[] = [
  {
    kind: "walk",
    id: "t1",
    theme: "The login at the door",
    shape: "a counter business",
    message: "A stranger should not need an account to find your front door.",
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
            y: 63,
            w: 40,
            h: 6,
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
          { kind: "media", x: 10, y: 8, w: 80, h: 24 },
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
    links: [
      { slug: "cupla", name: "Cúpla" },
      { slug: "scopers", name: "Scopers" },
      { slug: "tool-centre", name: "The Tool Centre" },
    ],
  },
  {
    kind: "walk",
    id: "t4",
    theme: "Nobody answers “are you open?”",
    shape: "a counter business",
    message: "People arrive with one question. The first screen should answer it.",
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
          { kind: "media", x: 10, y: 22, w: 80, h: 24 },
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
    links: [
      { slug: "dundrum-inn", name: "The Dundrum Inn" },
      { slug: "bucks-head", name: "The Bucks Head" },
      { slug: "donard-veterinary", name: "Donard Veterinary Clinic" },
    ],
  },
  {
    kind: "walk",
    id: "t5",
    theme: "The bell with no clapper",
    shape: "a place",
    message: "“Get in touch” means the customer does the work.",
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
          { kind: "media", x: 10, y: 8, w: 80, h: 18 },
          { kind: "field", x: 10, y: 32, w: 52, h: 8, label: "the date" },
          { kind: "field", x: 10, y: 42, w: 52, h: 8, label: "the party" },
          { kind: "button", x: 10, y: 56, w: 52, h: 9, label: "Ask", goal: true },
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
    links: [
      { slug: "hugh-mccanns", name: "Hugh McCann's" },
      { slug: "donard-veterinary", name: "Donard Veterinary Clinic" },
      { slug: "mourne-cycles", name: "Mourne Cycles" },
    ],
  },
  {
    kind: "walk",
    id: "t6",
    theme: "Your worries, in front of their question",
    shape: "a product",
    message:
      "Your website greets people with what worries you. They came with a question.",
    decision:
      "The newsletter capture was advised, and the capitalised terms were self-defence. Both made sense when they were added.",
    errand: "Buy the expensive one",
    before: [
      {
        id: "overlay",
        caption: "A newsletter panel opens before the item.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22, dim: true },
          band(10, 34, 50, 5, { dim: true }),
          { kind: "button", x: 10, y: 44, w: 44, h: 8, label: "Add to basket", dim: true },
          band(10, 56, 80, 4, { dim: true }),
          { kind: "card", x: 14, y: 24, w: 72, h: 46 },
          band(22, 32, 48, 4),
          { kind: "field", x: 22, y: 40, w: 56, h: 7, label: "your email" },
          {
            kind: "button",
            x: 22,
            y: 54,
            w: 40,
            h: 6,
            label: "No thanks",
            tap: "item",
          },
          {
            kind: "band",
            x: 22,
            y: 62,
            w: 40,
            h: 5,
            label: "Sign up",
            note: "The newsletter. Not the item.",
          },
        ],
      },
      {
        id: "item",
        caption:
          "The item at last. The terms sit below the button, in capitals, inside the description.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22 },
          band(10, 34, 50, 5),
          band(10, 41, 24, 4),
          { kind: "button", x: 10, y: 49, w: 44, h: 8, label: "Add to basket", goal: true },
          band(10, 61, 80, 3),
          band(10, 66, 76, 3),
          {
            kind: "micro",
            x: 10,
            y: 71,
            w: 64,
            h: 3,
            label: "COLLECTION ONLY",
            note: "There they are. Below the button, in capitals.",
          },
          band(10, 76, 80, 3),
        ],
      },
    ],
    after: [
      {
        id: "terms",
        caption: "The same item. The terms sit beside it, above the button.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22 },
          band(10, 34, 50, 5),
          band(10, 41, 24, 4),
          { kind: "status", x: 10, y: 49, w: 56, h: 6, label: "Collection only" },
          { kind: "button", x: 10, y: 58, w: 44, h: 8, label: "Add to basket", goal: true },
          band(10, 70, 80, 3),
          band(10, 75, 76, 3),
        ],
      },
    ],
    posters: { before: "overlay", after: "terms" },
    stop: {
      kind: "found",
      note: "Bought. And the collection-only terms? Below the button, in capitals, the whole time.",
    },
    fixedNote: "One tap — and the terms were in front of you the whole time.",
    beforeCost: "2 taps · the terms missed",
    afterCost: "1 tap · terms in view",
    minBeforeTaps: 2,
    afterTaps: 1,
    links: [
      { slug: "painted-earth", name: "Painted Earth" },
      { slug: "castle-farm", name: "Castle Farm Fresh Produce" },
      { slug: "dundrum-inn", name: "The Dundrum Inn" },
    ],
  },
  {
    kind: "walk",
    id: "t8",
    theme: "Locked in a file",
    shape: "a counter business",
    message: "A menu nobody opens is a menu nobody read.",
    decision:
      "The PDF was easy — export, upload, done. It was made for the kitchen printer, not for a phone in the street.",
    errand: "Read tonight's main courses",
    before: [
      {
        id: "page",
        caption: "Tonight's menu is a file to download.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 20 },
          band(10, 32, 56, 5),
          band(10, 39, 80, 4),
          {
            kind: "button",
            x: 10,
            y: 50,
            w: 52,
            h: 8,
            label: "Download menu",
            tap: "file",
          },
          band(10, 64, 70, 4),
        ],
      },
      {
        id: "file",
        caption: "The file, shrunk to fit the phone. The mains are in there, at half size.",
        blocks: [
          { kind: "sheet", x: 16, y: 8, w: 68, h: 74 },
          { kind: "micro", x: 22, y: 14, w: 56, h: 1.8 },
          { kind: "micro", x: 22, y: 19, w: 44, h: 1.8 },
          { kind: "micro", x: 22, y: 24, w: 60, h: 1.8 },
          { kind: "micro", x: 22, y: 29, w: 38, h: 1.8 },
          { kind: "micro", x: 22, y: 34, w: 56, h: 1.8 },
          { kind: "micro", x: 22, y: 39, w: 48, h: 1.8 },
          { kind: "micro", x: 22, y: 44, w: 60, h: 1.8 },
          { kind: "micro", x: 22, y: 49, w: 42, h: 1.8 },
          { kind: "micro", x: 22, y: 54, w: 56, h: 1.8 },
          { kind: "micro", x: 22, y: 59, w: 50, h: 1.8 },
          { kind: "micro", x: 22, y: 64, w: 58, h: 1.8 },
          { kind: "micro", x: 22, y: 69, w: 40, h: 1.8 },
          { kind: "micro", x: 22, y: 74, w: 54, h: 1.8 },
          {
            kind: "band",
            x: 10,
            y: 88,
            w: 30,
            h: 5,
            label: "zoom",
            note: "Pinching helps. Reading, not really.",
          },
        ],
      },
    ],
    after: [
      {
        id: "dishes",
        caption: "The dishes are the page.",
        blocks: [
          band(10, 10, 44, 5, { label: "main courses" }),
          { kind: "row", x: 10, y: 20, w: 80, h: 14, label: "the first main", goal: true },
          { kind: "row", x: 10, y: 38, w: 80, h: 14 },
          { kind: "row", x: 10, y: 56, w: 80, h: 14 },
          band(10, 76, 70, 4),
        ],
      },
    ],
    posters: { before: "file", after: "dishes" },
    stop: {
      kind: "blocked",
      panel: "file",
      note: "Stopped. The dishes exist — at half size, inside a file. Nobody reads them.",
    },
    fixedNote: "One tap. Tonight's mains, readable from the street.",
    beforeCost: "no way through",
    afterCost: "1 tap",
    minBeforeTaps: null,
    afterTaps: 1,
    links: [
      { slug: "bucks-head", name: "The Bucks Head" },
      { slug: "hugh-mccanns", name: "Hugh McCann's" },
      { slug: "castle-farm", name: "Castle Farm Fresh Produce" },
    ],
  },
  {
    kind: "walk",
    id: "t2",
    theme: "The dead end",
    shape: "a product",
    message: "Every link that ends in nothing was somebody deciding to visit you.",
    decision:
      "The domain lapsed in a renewal nobody saw, and the sold piece stayed listed because taking it down felt like losing the photograph.",
    errand: "Go to the address on the van",
    before: [
      {
        id: "address",
        caption: "The address from the van, typed in.",
        blocks: [
          {
            kind: "field",
            x: 10,
            y: 12,
            w: 72,
            h: 7,
            label: "the address from the van",
            tap: "nowhere",
          },
          band(10, 30, 80, 4),
          band(10, 36, 60, 4),
        ],
      },
      {
        id: "nowhere",
        caption: "Nothing here. The address leads nowhere.",
        note: "The route ends. The search result below still lists the one thing you came for.",
        blocks: [
          { kind: "empty", x: 10, y: 10, w: 80, h: 44, label: "nothing here" },
          {
            kind: "row",
            x: 10,
            y: 62,
            w: 80,
            h: 9,
            label: "the item you came for",
            tap: "gone",
          },
        ],
      },
      {
        id: "gone",
        caption: "The one item, marked unavailable. Nothing else offered.",
        blocks: [
          { kind: "media", x: 10, y: 10, w: 80, h: 22 },
          band(10, 36, 56, 5),
          { kind: "status", x: 10, y: 44, w: 34, h: 5, label: "unavailable" },
          band(10, 56, 80, 4),
          band(10, 62, 66, 4),
        ],
      },
    ],
    after: [
      {
        id: "detour",
        caption: "The address works. The item is still gone — so three others stand beside it.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 20 },
          band(10, 32, 56, 5),
          { kind: "status", x: 10, y: 39, w: 34, h: 5, label: "unavailable" },
          { kind: "row", x: 10, y: 50, w: 80, h: 8, label: "another one", goal: true },
          { kind: "row", x: 10, y: 60, w: 80, h: 8, label: "another one", goal: true },
          { kind: "row", x: 10, y: 70, w: 80, h: 8, label: "another one", goal: true },
        ],
      },
    ],
    posters: { before: "nowhere", after: "detour" },
    stop: {
      kind: "blocked",
      panel: "gone",
      note: "Stopped. The address goes nowhere, and the one thing you wanted has nowhere after it.",
    },
    fixedNote: "One tap. The address works, and a gone item offers three others.",
    beforeCost: "no way through",
    afterCost: "1 tap",
    minBeforeTaps: null,
    afterTaps: 1,
    links: [
      { slug: "douglas-cromie", name: "Douglas & Cromie" },
      { slug: "newcastle-dental", name: "Newcastle Family Dental Care" },
      { slug: "painted-earth", name: "Painted Earth" },
    ],
  },
  {
    kind: "walk",
    id: "t3",
    theme: "Whose shop is this?",
    shape: "a trade",
    message: "The biggest name on your website should be yours.",
    decision:
      "The supplier assets were free, high-resolution and came with brand guidance. Somebody said they added credibility.",
    errand: "Work out whose business this is",
    before: [
      {
        id: "wall",
        caption:
          "Six supplier shields across the fascia. The business's own mark is here somewhere.",
        blocks: [
          { kind: "shield", x: 6, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 21.6, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 37.2, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 52.8, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 68.4, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 84, y: 14, w: 12, h: 20, note: "A supplier's mark." },
          { kind: "shield", x: 14, y: 40, w: 10, h: 14, note: "A supplier's mark." },
          { kind: "shield", x: 33, y: 40, w: 10, h: 14, note: "A supplier's mark." },
          { kind: "shield", x: 52, y: 40, w: 10, h: 14, note: "A supplier's mark." },
          { kind: "shield", x: 71, y: 40, w: 10, h: 14, note: "A supplier's mark." },
          { kind: "block", x: 40, y: 64, w: 20, h: 28 },
          {
            kind: "mark",
            x: 63,
            y: 66,
            w: 5,
            h: 7,
            label: "the business's own mark",
            goal: true,
          },
        ],
      },
    ],
    after: [
      {
        id: "own",
        caption: "The business's own mark takes the fascia. The suppliers hold one line.",
        blocks: [
          { kind: "mark", x: 20, y: 14, w: 60, h: 18, label: "the business's own mark", goal: true },
          { kind: "shield", x: 14, y: 44, w: 8, h: 8 },
          { kind: "shield", x: 26, y: 44, w: 8, h: 8 },
          { kind: "shield", x: 38, y: 44, w: 8, h: 8 },
          { kind: "shield", x: 50, y: 44, w: 8, h: 8 },
          { kind: "shield", x: 62, y: 44, w: 8, h: 8 },
          { kind: "shield", x: 74, y: 44, w: 8, h: 8 },
          band(10, 60, 70, 4),
          band(10, 66, 52, 4),
          { kind: "block", x: 40, y: 76, w: 20, h: 16 },
        ],
      },
    ],
    posters: { before: "wall", after: "own" },
    stop: {
      kind: "found",
      note: "Found it — an eighth the size of the shields. That's whose shop it is. Probably.",
    },
    fixedNote: "One tap. The biggest name on the page is the business's own.",
    beforeCost: "6 shields · the answer an eighth their size",
    afterCost: "1 tap",
    minBeforeTaps: 1,
    afterTaps: 1,
    goalIsHidden: true,
    links: [
      { slug: "mourne-cycles", name: "Mourne Cycles" },
      { slug: "donard-veterinary", name: "Donard Veterinary Clinic" },
      { slug: "newcastle-dental", name: "Newcastle Family Dental Care" },
    ],
  },
  {
    kind: "walk",
    id: "t9",
    theme: "The stopped clock",
    shape: "a care practice",
    message: "Your site is telling people how old it is, not how good you are.",
    decision:
      "Nobody changed the footer because nobody was looking at the footer. The business moved; the page didn't.",
    errand: "Check they're still running",
    before: [
      {
        id: "top",
        caption: "A tidy first screen. Nothing on it carries a date.",
        blocks: [
          { kind: "media", x: 10, y: 8, w: 80, h: 22 },
          band(10, 34, 60, 5),
          band(10, 41, 80, 4),
          band(10, 47, 72, 4),
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "mid" },
        ],
      },
      {
        id: "mid",
        caption: "Kind words — from three summers ago.",
        note: "Still running? Keep looking.",
        blocks: [
          { kind: "card", x: 10, y: 10, w: 80, h: 22 },
          band(16, 15, 64, 3),
          band(16, 20, 70, 3),
          band(16, 26, 40, 2.5, { label: "three summers ago" }),
          band(10, 38, 80, 4),
          { kind: "card", x: 10, y: 44, w: 80, h: 22 },
          band(16, 49, 60, 3),
          band(16, 54, 68, 3),
          band(16, 60, 40, 2.5, { label: "four summers ago" }),
          { kind: "scroll", x: 10, y: 86, w: 80, h: 8, label: "scroll", tap: "foot" },
        ],
      },
      {
        id: "foot",
        caption: "The foot of the page: a copyright line from three years ago.",
        blocks: [
          band(10, 14, 80, 4),
          band(10, 20, 58, 4),
          {
            kind: "band",
            x: 10,
            y: 80,
            w: 48,
            h: 3.5,
            label: "© three years ago",
            note: "The newest dated thing on the page.",
          },
        ],
      },
    ],
    after: [
      {
        id: "fresh",
        caption:
          "The page holds what doesn't go stale, and hands today to the source that stays fresh.",
        blocks: [
          { kind: "status", x: 10, y: 10, w: 52, h: 6, label: "here this week" },
          {
            kind: "button",
            x: 10,
            y: 20,
            w: 52,
            h: 7,
            label: "today, at the source",
            goal: true,
          },
          { kind: "media", x: 10, y: 33, w: 80, h: 20 },
          band(10, 57, 64, 4),
          band(10, 63, 80, 4),
        ],
      },
    ],
    posters: { before: "foot", after: "fresh" },
    stop: {
      kind: "blocked",
      panel: "foot",
      note: "Stopped. The newest dated thing on the page is three years old. Still running? You can't tell.",
    },
    fixedNote: "One tap. Freshness is handed to the thing that stays fresh.",
    beforeCost: "no way to tell",
    afterCost: "1 tap",
    minBeforeTaps: null,
    afterTaps: 1,
    links: [
      { slug: "hugh-mccanns", name: "Hugh McCann's" },
      { slug: "bettys-butters", name: "Betty's Better Butters" },
      { slug: "kent-amusements", name: "Kent Amusements" },
    ],
  },
  {
    kind: "walk",
    id: "t7",
    theme: "The best thing about you is in the footer",
    shape: "a trade",
    message:
      "The thing you'd say in ten seconds at the counter isn't on the site at all.",
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
            x: 10,
            y: 66,
            w: 76,
            h: 4,
            label: "the years · the award · the accreditations",
            goal: true,
          },
          { kind: "mark", x: 16, y: 74, w: 10, h: 10 },
          { kind: "mark", x: 34, y: 74, w: 10, h: 10 },
          { kind: "mark", x: 52, y: 74, w: 10, h: 10 },
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
            x: 10,
            y: 10,
            w: 80,
            h: 6,
            label: "the years · the award · the accreditations",
            goal: true,
          },
          { kind: "mark", x: 16, y: 21, w: 10, h: 10 },
          { kind: "mark", x: 34, y: 21, w: 10, h: 10 },
          { kind: "mark", x: 52, y: 21, w: 10, h: 10 },
          { kind: "media", x: 10, y: 38, w: 80, h: 22 },
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
    links: [
      { slug: "kelly-mcevoy-brown", name: "Kelly, McEvoy & Brown" },
      { slug: "kent-amusements", name: "Kent Amusements" },
      { slug: "hugh-mccanns", name: "Hugh McCann's" },
    ],
  },
  {
    kind: "swap",
    id: "t10",
    theme: "The swap test",
    shape: "a trade",
    message:
      "Swap your name for a competitor's. If nothing else needs changing, the site isn't yours.",
    decision:
      "A clean template with the name dropped in looked like a safe, professional choice. It looked like everyone else's, too.",
    links: [
      { slug: "kent-amusements", name: "Kent Amusements" },
      { slug: "mourne-cycles", name: "Mourne Cycles" },
    ],
  },
];
