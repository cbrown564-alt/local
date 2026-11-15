export const paintedEarthBase = "/concepts/painted-earth";
export const paintedEarthLive = "https://www.paintedearthgifts.com";

export type PaintedEarthArtwork = {
  slug: string;
  title: string;
  artist: string;
  price: number;
  place: string;
  medium: string;
  available: boolean;
  theme: string;
  livePath: string;
};

export const paintedEarthArtworks: PaintedEarthArtwork[] = [
  {
    slug: "rossglass-to-mournes",
    title: "Rossglass To Mournes",
    artist: "Gary Murray",
    price: 700,
    place: "Mournes",
    medium: "Original painting",
    available: true,
    theme: "mountain",
    livePath: "/products/rossglass-to-mournes",
  },
  {
    slug: "tide",
    title: "Tide",
    artist: "Gary Murray",
    price: 575,
    place: "Sea",
    medium: "Original painting",
    available: true,
    theme: "tide",
    livePath: "/products/tide",
  },
  {
    slug: "ruby-the-robin",
    title: "Ruby the Robin",
    artist: "Gary Murray",
    price: 495,
    place: "County Down",
    medium: "Original painting",
    available: true,
    theme: "robin",
    livePath: "/products/ruby-the-robin",
  },
  {
    slug: "soft-breeze",
    title: "Soft Breeze",
    artist: "Deirdre Oram",
    price: 425,
    place: "Sea",
    medium: "Original painting",
    available: true,
    theme: "breeze",
    livePath: "/products/soft-breeze-original-painting",
  },
  {
    slug: "bloom-in-the-broken",
    title: "Bloom In The Broken",
    artist: "Julieanne Ashfield",
    price: 395,
    place: "Garden",
    medium: "Original painting",
    available: true,
    theme: "bloom",
    livePath: "/products/bloom-in-the-broken",
  },
  {
    slug: "evening-light",
    title: "Evening light on Slieve Donard",
    artist: "John O'Flaherty-Lynch",
    price: 650,
    place: "Mournes",
    medium: "Original painting",
    available: true,
    theme: "evening",
    livePath: "/products/evening-light-on-slieve-donard",
  },
  {
    slug: "cutie-the-puffin",
    title: "Cutie The Puffin",
    artist: "Gary Murray",
    price: 650,
    place: "Sea",
    medium: "Original painting",
    available: false,
    theme: "puffin",
    livePath: "/products/cutie-the-puffin",
  },
  {
    slug: "willow-the-badger",
    title: "Willow the Badger",
    artist: "Gary Murray",
    price: 650,
    place: "County Down",
    medium: "Original painting",
    available: false,
    theme: "badger",
    livePath: "/products/willow-the-badger",
  },
];

export const paintedEarthPlaces = [
  { name: "Mournes", count: 45, theme: "mountain" },
  { name: "Murlough", count: 18, theme: "dunes" },
  { name: "Tollymore", count: 14, theme: "forest" },
  { name: "Newcastle", count: 9, theme: "town" },
  { name: "Royal County Down", count: 7, theme: "links" },
];

/* The elevation record — moves 1–3 of
   research/concepts/painted-earth/painted-earth-elevation-brief.md.
   ============================================================
   Sources, with read dates:
   - research/concepts/painted-earth/painted-earth-catalogue-2026-07-26.json
     (snapshot of the shop's own public endpoints, 26 July 2026, re-checked
     27 July): the maker names and counts, the 92-maker total, the four
     workshop records, the fulfilment figures
   - research/concepts/painted-earth/painted-earth-concept-plan.md (26–27 July
     2026): the shop's published fulfilment terms, the waiting-list sentence,
     the gallery opening date
   - the shop's public Art & Craft Gallery page, read 6 August 2026: the
     gallery's own sentence and the three named visitor reviews. Full harvest
     trail in research/concepts/painted-earth/voice-harvest.md.

   Standing rules, from the brief's honesty constraints:

   1. SNAPSHOT DISCIPLINE. Every maker, count, price and availability figure
      below is the 26 July 2026 snapshot, presented as of that date. Nothing
      here claims to be the live catalogue, and no studio re-check date ever
      stands beside the figures on the page.
   2. NO PHOTOGRAPHY. The catalogue's imagery spans 92 makers with no recorded
      licence, so no raster catalogue image may appear and no drawn tile may
      read as a named maker's work. The product record belongs to the maker;
      the drawing belongs to nobody.
   3. VOICE STAYS LIGHT. The gallery's sentence and the visitor review are
      verbatim. Attribution on the page is who spoke and where — never a read
      stamp, never "shown as". No review date is invented: the gallery page
      publishes none.
   4. THE FOUR WORKSHOPS ARE THE WHOLE WORKSHOP TRUTH. No new dates, no
      prices, no tutors, no "regular programme". The waiting-list answer is a
      labelled proposal — the shop runs its list by hand today, and the page
      says the proposal is a proposal. */

export const paintedEarthCatalogueDate = "26 July 2026";
export const paintedEarthMakerTotal = 92;

export type PaintedEarthMaker = {
  name: string;
  /** Products in the snapshot, where the snapshot counted them. */
  pieces: number | null;
};

/** The names the record holds: the twenty most-stocked makers from the dated
 *  snapshot, then the makers the snapshot's sample shelves name. "Painted
 *  Earth" itself — the shop's own label — is not a maker and is not listed.
 *  Each name links to that maker's live collection on the shop's own site. */
export const paintedEarthMakers: PaintedEarthMaker[] = [
  { name: "OhhDeer", pieces: 79 },
  { name: "Gill Books", pieces: 61 },
  { name: "Hunter Paper Co.", pieces: 56 },
  { name: "Field Day", pieces: 47 },
  { name: "Once upon a Dandelion", pieces: 46 },
  { name: "Piera Cirefice", pieces: 39 },
  { name: "Alison McIlkenny", pieces: 36 },
  { name: "Alan Ardiff", pieces: 34 },
  { name: "Fiddle Fig", pieces: 29 },
  { name: "Gemma Marie", pieces: 27 },
  { name: "Dasalee Textile Art", pieces: 26 },
  { name: "Derek Melville", pieces: 24 },
  { name: "Rhea Hanlon", pieces: 24 },
  { name: "Gary Murray", pieces: 23 },
  { name: "Polly Gribben Art", pieces: 23 },
  { name: "Linda Connolly", pieces: 21 },
  { name: "Wild About Soap", pieces: 20 },
  { name: "Irish Socksciety", pieces: 18 },
  { name: "Figment Ceramics", pieces: 18 },
  { name: "Norma Slack", pieces: 18 },
  { name: "Amber Jordan Design", pieces: null },
  { name: "John O'Flaherty-Lynch", pieces: null },
  { name: "Kate Broderick", pieces: null },
  { name: "Kevin Collins", pieces: null },
  { name: "Liz Christy", pieces: null },
  { name: "Pocket Mountains", pieces: null },
];

export const paintedEarthMakerHref = (name: string) =>
  `${paintedEarthLive}/collections/vendors?q=${encodeURIComponent(name)}`;

/** The gallery's own sentence, verbatim from the shop's gallery page. The
 *  page speaks as the shop, so it stands as our own words — no attribution. */
export const paintedEarthGalleryWords =
  "Our lightfilled upstairs gallery space has added a new dimension to Painted Earth. It is the perfect canvas to showcase our Artist and Craftspeople.";

export type PaintedEarthVoice = {
  /** Verbatim, hyphen and all. Any elision marked. Never edited for tone. */
  quote: string;
  /** Who wrote it, as published — no more identifying than that. */
  who: string;
  /** Where it is published. The gallery page carries no review dates, so no
   *  date is invented — the read date stays in research/. */
  source: string;
};

/** One harvest from the gallery page's three named visitor reviews. */
export const paintedEarthVisitorVoice: PaintedEarthVoice = {
  quote: "A beautiful gallery - a splendid space of calm and inspiration!",
  who: "Joanna",
  source: "On our gallery page",
};

/** The handover, told straight — every term is the shop's own published one
 *  (concept plan §1, re-checked 27 July 2026). */
export const paintedEarthHandoverTerms = [
  "Collection from 98 Main Street — original art is not posted",
  "A shipping quote, arranged by asking us first",
  "Free gift wrap on every order",
  "Next-day dispatch Monday to Friday",
  "No returns on original art",
];

export type PaintedEarthWorkshop = {
  title: string;
  tutor: string;
  /** Snapshot date, rendered in words. */
  date: string;
  price: number;
};

/** The four real records, all fully booked in the snapshot. Nothing beyond
 *  them: no next dates, no programme, no availability claims. */
export const paintedEarthWorkshops: PaintedEarthWorkshop[] = [
  { title: "Gel Monoprinting", tutor: "Jenny Bailie", date: "26 March 2026", price: 30 },
  { title: "Needle felting", tutor: "Deirdre McClorey", date: "4 June 2026", price: 50 },
  { title: "Painting", tutor: "Gemma Marie Blakely", date: "2 July 2026", price: 50 },
  { title: "Needle felting", tutor: "Deirdre McClorey", date: "6 August 2026", price: 50 },
];

/** The shop's own answer today, verbatim from the sold-out listing that
 *  carries it. The list runs by hand — the effort is the finding. */
export const paintedEarthWaitingListWords =
  "Currently sold out, get in touch to join our waiting list.";

export const paintedEarthWorkshopsHref = `${paintedEarthLive}/collections/creative-workshops`;
