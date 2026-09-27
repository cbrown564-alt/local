/* Kent Amusements — the record the page is built from.
   ============================================================
   This arcade has no first-party voice on the open web: its only channels are
   a Facebook page and an Instagram account, both behind Meta's login wall. So
   the voice on this page belongs to other people, and every borrowed sentence
   below carries its source, its date and its era.

   Sources, in the order they are used:
   - BBC *Your Place and Mine*, Newcastle memory archive (A781698), read via
     research/pipeline/verifications.json and the 4 August 2026 re-read
     recorded in research/concepts/kent-amusements/kent-amusements-elevation-brief.md
   - The Avoca Hotel's Kent Amusements activities page, re-read 5 August 2026
   - research/pipeline/verifications.json, verified 22 July 2026 (Companies
     House NI688147, the March 2026 TripAdvisor review, the promenade tenure)

   Three standing rules, from the brief's honesty constraints:

   1. NO TIME OF DAY, anywhere, in any string in this file or on either page.
      The 25 July 2026 claims-gate failure published invented opening hours.
      Nothing here may carry an hour, a minute or an "open until" — which is
      also why the change-booth memory is quoted with its shift times elided
      rather than in full: "8.30am to 10.30pm" is a 1960s summer job, but on an
      arcade page it would read as opening hours to anyone scanning. The
      elision is marked, so the quote is still verbatim.
   2. The memories stay memories. Era framing travels with every quotation, in
      the visible layer, never only in an alt or a caption class.
   3. The Avoca's words stay the Avoca's. "Premier" and the indoor-dodgems
      scarcity are their claim, quoted and attributed; the concept never says
      either in its own voice.

   Nothing from the same-named arcade in Dundalk touches this file, and the
   Kent Cafe appears only inside the quoted memory that names it. */

export const READ_ON = "4 August 2026";
export const VERIFIED_ON = "22 July 2026";

export const FACEBOOK = "https://www.facebook.com/kentamusementsnewcastle/";
export const INSTAGRAM = "https://www.instagram.com/kentamusementsnewcastle/";
export const BBC_ARCHIVE =
  "https://www.bbc.co.uk/northernireland/yourplaceandmine/down/A781698.shtml";
export const AVOCA = "https://avocahotel.com/activities/uncategorized/kent-amusements/";
export const PHONE = "028 4372 2515";
export const PHONE_HREF = "tel:+442843722515";
export const ADDRESS = "77–79 Central Promenade";

export interface Memory {
  /** Verbatim, with any elision marked. Never edited for tone. */
  quote: string;
  /** Who is speaking and when they are speaking about. Era, always. */
  who: string;
  /** Where it is preserved, and when we read it. */
  source: string;
}

/** The page's emotional centre: a summer job on the promenade in the late
 *  sixties, told by the person who worked it. The shift times the memory also
 *  records are elided — see rule 1 above. */
export const changeMemory: Memory = {
  quote:
    "You had to work long hours … but we didn't care, it was summer and we hadn't a care in the world",
  who: "A summer worker at Kent Amusements, dishing out the change in the late 1960s",
  source: "BBC Your Place and Mine · Newcastle memory archive",
};

/** The second memory, and the far end of the jukebox-to-VR line. The Kent Cafe
 *  is named here and nowhere else on the site: its relationship to the arcade
 *  is not in the record. */
export const jukeboxMemory: Memory = {
  quote: "used to hang out at the Kent Cafe playing the juke-box",
  who: "Newcastle regulars, remembering the same era",
  source: "BBC Your Place and Mine · Newcastle memory archive",
};

/** The Avoca Hotel's description, verbatim from their activities page. Present
 *  tense, because it is a present-day description — but it is theirs. Guest
 *  attribution stays light: who said it, and where — not when we read it. */
export const avoca = {
  quote:
    "Newcastle County Down's premier family entertainment centre. Amusement arcade and one of NI's only homes to indoor Dodgem Cars.",
  who: "The Avoca Hotel",
  source: "avocahotel.com",
};

export interface ArcEntry {
  id: string;
  when: string;
  line: string;
  /** Every entry carries a date. An undated milestone does not go in the band. */
  source: string;
}

/** The timeline runs from an estimated opening year to the VR launch.
 *  1968 is the middle of the late-1960s band the BBC archive dates; that
 *  estimate stays in research comments, not on the guest source line.
 *  No Companies House filler, no undated milestone. */
export const arc: ArcEntry[] = [
  {
    id: "sixties",
    when: "1968",
    line:
      "The Kent name is already on the promenade — change booth, jukebox, Bee Gees on the speaker.",
    source: "BBC · late 1960s",
  },
  {
    id: "twenty-six",
    when: "2026",
    line:
      "The VR zone opens — newest thing on the seafront, inside the oldest. A March review names it.",
    source: "TripAdvisor · March 2026",
  },
];

export type TimelineTick = {
  id: string;
  /** 0–100 along the spine; loose placement between the two ends. */
  at: number;
  band: "above" | "below";
  kind: "memory" | "avoca";
  quote: string;
  who: string;
  source: string;
  era?: string;
  elided?: boolean;
  href?: string;
};

/** Colour on the line: two late-1960s memories and the Avoca's present-tense
 *  description, loosely between the ends. */
export const timelineTicks: TimelineTick[] = [
  {
    id: "jukebox",
    at: 28,
    band: "above",
    kind: "memory",
    quote: jukeboxMemory.quote,
    who: jukeboxMemory.who,
    source: jukeboxMemory.source,
    era: "A memory of the late 1960s",
  },
  {
    id: "change",
    at: 52,
    band: "below",
    kind: "memory",
    quote: changeMemory.quote,
    who: changeMemory.who,
    source: changeMemory.source,
    era: "A memory of the late 1960s",
    /* Shift hours were elided from the quote (rule 1) — that honesty lives in
       research/ and the case study, not in the guest caption. */
    elided: true,
    href: BBC_ARCHIVE,
  },
  {
    id: "avoca",
    at: 76,
    band: "above",
    kind: "avoca",
    quote: avoca.quote,
    who: avoca.who,
    source: avoca.source,
    href: AVOCA,
  },
];

export interface VisitStep {
  id: string;
  step: string;
  name: string;
  line: string;
}

/** An afternoon in the order it happens. Only what the record holds: the
 *  promenade, the change, the arcade floor, the dodgems, the VR, the sea.
 *  No tokens, tickets, 2p machines, party packages or prices — none of those
 *  are verified, and several were invented by earlier drafts. */
export const visit: VisitStep[] = [
  {
    id: "promenade",
    step: "01",
    name: "The promenade",
    line: `${ADDRESS}, with the beach across the road and the Mournes behind the town.`,
  },
  {
    id: "change",
    step: "02",
    name: "The change",
    line:
      "Where a seaside afternoon has always started — change for the machines, same as it was in the sixties.",
  },
  {
    id: "floor",
    step: "03",
    name: "The floor",
    line: "Arcade machines for all ages, lit and loud, the length of the room.",
  },
  {
    id: "dodgems",
    step: "04",
    name: "The dodgems",
    line: "Indoor bumper cars — one of the things people come for.",
  },
  {
    id: "vr",
    step: "05",
    name: "The VR",
    line: "The zone that opened this year — newest thing on the seafront, inside the oldest.",
  },
  {
    id: "sea",
    step: "06",
    name: "Back out to the sea",
    line: "Out the same door, onto the same promenade. That is the whole of it, and it is enough.",
  },
];

/** The three verified attractions, and nothing beyond them. Notes speak to the
 *  visitor, not to the research trail that put each item on the list. */
export const attractions = [
  {
    id: "dodgems",
    name: "Dodgems",
    desc: "Indoor bumper cars",
    note: "On the floor, across from the beach",
  },
  {
    id: "vr",
    name: "VR games",
    desc: "The zone new in 2026",
    note: "Opened 2026",
  },
  {
    id: "arcade",
    name: "Arcade",
    desc: "Machines for all ages",
    note: "Lit and loud, the length of the room",
  },
];

/* The season panel's own words. The arcade's real operating ritual is that
   hours move with the season and get posted on Facebook as they change — so
   the panel states the ritual and hands today's answer to the channel that
   owns it. It never states a time. */
export const season = {
  ritual:
    "Hours change with the season — we post them on Facebook as they change. Family offers go up there when they run.",
  why: "Check before you come — we keep that page up to date as the season turns.",
};

/** Confirmed seasonal hours, when the arcade publishes them.
 *
 *  This is deliberately empty and must stay empty until a published source
 *  exists — it is the designed home the publication record asked for
 *  ("Replace the empty hours layout when the arcade publishes confirmed
 *  seasonal hours", 27 July 2026), landed in advance. Empty renders nothing:
 *  no apologetic rows, no "check Facebook" repeated three times. Adding an
 *  entry here turns the rows on, and every entry needs its source and the
 *  date it was read. */
export const confirmedHours: { label: string; value: string; source: string }[] = [];
