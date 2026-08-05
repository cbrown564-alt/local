/* The Kelly, McEvoy & Brown record as data: the patch pins, the two
   unplaced projects and the evidence-pack weights. Places come only from
   kmbni.com site text and published project names — the triage cycle
   removed inferred places once, and this module must not reintroduce one.
   The pin coordinates are a hand-drawn indicative arrangement (from
   Magheralin in the north to Crossmaglen in the south-west), not a survey. */

export const RECORD_READ_ON = "24 July 2026, re-checked 3 August 2026";

export type Sector =
  | "Ecclesiastical"
  | "Healthcare"
  | "Education"
  | "Residential"
  | "Leisure"
  | "Commercial";

export interface PatchPin {
  place: string;
  sector: Sector;
  /** Project disambiguator, where the place alone is not enough. */
  sub?: string;
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  labelDx?: number;
  labelDy?: number;
  leader?: { x: number; y: number };
}

/** Pin marker per sector, so the plate reads sector-keyed before any
    filtering: churches a penned cross, homes a roof, and so on. */
export const sectorGlyphs: Record<Sector, "cross" | "square" | "diamond" | "roof" | "ring" | "disc"> = {
  Ecclesiastical: "cross",
  Healthcare: "square",
  Education: "diamond",
  Residential: "roof",
  Leisure: "ring",
  Commercial: "disc",
};

export const patchPins: PatchPin[] = [
  { place: "Magheralin", sector: "Ecclesiastical", x: 347, y: 98 },
  {
    place: "Saintfield",
    sector: "Commercial",
    x: 668,
    y: 107,
    anchor: "end",
    labelDx: -12,
  },
  { place: "Dechomet", sector: "Ecclesiastical", x: 376, y: 254 },
  { place: "Rathfriland", sector: "Healthcare", x: 427, y: 309, labelDy: 24 },
  {
    place: "Castlewellan",
    sector: "Residential",
    sub: "Mc Kays Road",
    x: 572,
    y: 286,
    anchor: "end",
    labelDx: -12,
    labelDy: -10,
  },
  {
    place: "Castlewellan",
    sector: "Commercial",
    sub: "46–48 Main Street",
    x: 598,
    y: 306,
    anchor: "start",
    labelDx: 12,
    labelDy: 22,
  },
  {
    place: "Dundrum",
    sector: "Education",
    sub: "Knockevin Special School",
    x: 668,
    y: 262,
    anchor: "end",
    labelDx: -12,
    labelDy: -18,
    leader: { x: -6, y: -10 },
  },
  { place: "Newry", sector: "Education", x: 296, y: 364 },
  {
    place: "Crossmaglen",
    sector: "Leisure",
    x: 99,
    y: 456,
    anchor: "start",
    labelDx: 12,
    labelDy: -8,
  },
  {
    place: "Culloville",
    sector: "Leisure",
    x: 128,
    y: 468,
    anchor: "start",
    labelDx: 12,
    labelDy: 18,
  },
  {
    place: "Hacksballscross",
    sector: "Residential",
    x: 172,
    y: 502,
    anchor: "start",
    labelDx: 12,
    labelDy: 8,
  },
];

/** Completed projects whose place the record does not publish; they stand
    beside the plate rather than being invented onto it. */
export const unplacedProjects: { name: string; sector: Sector }[] = [
  { name: "St Luke's Hospital Rosewood & Pinewood Villas", sector: "Healthcare" },
  { name: "Roslyn Place Apartments & Townhouses", sector: "Residential" },
];

/** The accreditation wall told as what it is for a client checking a
    contractor: the marks as the firm's own site lists them, each with its
    plain-English procurement role and nothing further claimed. */
export const evidenceMarks: { mark: string; weight: string }[] = [
  { mark: "ISO 14001", weight: "Environmental management, certified" },
  { mark: "Constructionline", weight: "Pre-qualified supplier register" },
  { mark: "SafeTCert", weight: "Safety management, certified" },
  { mark: "CEF", weight: "Construction Employers Federation" },
  { mark: "NHBC", weight: "Warranty and standards for new homes" },
];

export const sectors: { key: Sector }[] = [
  { key: "Ecclesiastical" },
  { key: "Healthcare" },
  { key: "Education" },
  { key: "Residential" },
  { key: "Leisure" },
  { key: "Commercial" },
];
