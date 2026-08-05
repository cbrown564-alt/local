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
 *  tense, because it is a present-day description — but it is theirs. */
export const avoca = {
  quote:
    "Newcastle County Down's premier family entertainment centre. Amusement arcade and one of NI's only homes to indoor Dodgem Cars.",
  who: "The Avoca Hotel's activities page",
  source: "Read 5 August 2026 · their words, not ours",
};

export interface ArcEntry {
  id: string;
  when: string;
  line: string;
  /** Every entry carries a date. An undated milestone does not go in the band. */
  source: string;
  quote?: Memory;
}

/** Fifty summers, dated at both ends: the jukebox in the archive, the VR zone
 *  in a review from this year. No entry without a date. */
export const arc: ArcEntry[] = [
  {
    id: "sixties",
    when: "Late 1960s",
    line:
      "The Kent name is already on the promenade. Somebody is in the booth dishing out the change, the jukebox is on, and the Bee Gees are on the jukebox.",
    source: `BBC memory archive · read ${READ_ON}`,
    quote: jukeboxMemory,
  },
  {
    id: "fifty",
    when: "Over fifty summers",
    line:
      "The arcade opens on the same Central Promenade site, summer after summer, while the Pierrots, the bandstand and the Palace go from the seafront around it.",
    source: `Same site verified ${VERIFIED_ON} · the lost seafront from the BBC memory archive, read ${READ_ON}`,
  },
  {
    id: "twenty-five",
    when: "November 2025",
    line: "The company files its confirmation statement. Still going, still on the promenade.",
    source: `Companies House NI688147 · verified ${VERIFIED_ON}`,
  },
  {
    id: "twenty-six",
    when: "2026",
    line:
      "The VR zone opens — the newest thing on the seafront, inside the oldest thing on it. A visitor's review in March picks it out by name.",
    source: `TripAdvisor review, March 2026 · verified ${VERIFIED_ON}`,
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
      "Where a seaside afternoon has always started. In the sixties somebody handed it over from a booth, and the archive holds a whole summer of it.",
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
    line: "Indoor bumper cars — the Avoca Hotel calls them one of NI's only indoor Dodgem Cars.",
  },
  {
    id: "vr",
    step: "05",
    name: "The VR",
    line: "The zone that opened this year, and the reason a March 2026 review singled the place out.",
  },
  {
    id: "sea",
    step: "06",
    name: "Back out to the sea",
    line: "Out the same door, onto the same promenade. That is the whole of it, and it is enough.",
  },
];

/** The three verified attractions, and nothing beyond them. */
export const attractions = [
  {
    id: "dodgems",
    name: "Dodgems",
    desc: "Indoor bumper cars",
    note: "Named on the Avoca Hotel's activities page",
  },
  {
    id: "vr",
    name: "VR games",
    desc: "The zone new in 2026",
    note: "Picked out by a March 2026 visitor review",
  },
  {
    id: "arcade",
    name: "Arcade",
    desc: "Machines for all ages",
    note: `Verified ${VERIFIED_ON}`,
  },
];

/* The season panel's own words. The arcade's real operating ritual is that
   hours move with the season and get posted on Facebook as they change — so
   the panel states the ritual and hands today's answer to the channel that
   owns it. It never states a time. */
export const season = {
  ritual:
    "Hours change with the season — the arcade posts them on Facebook as they change. Family offers are posted there when they run.",
  why: "That page is the freshest source there is, because the arcade updates it itself.",
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
