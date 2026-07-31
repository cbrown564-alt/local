/** Shared, sourced copy for the Mourne Cycles concept.
 *
 *  Quotes, trail names and scheme wording come from the shop's public website
 *  (read 31 July 2026) or from verifiable public trail designations named on
 *  that site under "Our local Trails". Nothing here invents product SKUs,
 *  prices or workshop tickets. */

export const siteUrl = "https://www.mourne-cycles.co.uk/";

/** Verbatim from the shop homepage — the parenthetical is the best line on the site. */
export const shopVoice = {
  text: "one of Northern Ireland's premier local bike shops (or \"LBS\" to bike aficionados)",
  attribution: "Mourne Cycles",
  context: "mourne-cycles.co.uk homepage",
  source: siteUrl,
} as const;

/** Five showroom categories mapped to local terrain — no product data exists. */
export const rangeCategories = [
  {
    index: "01",
    name: "Electric",
    terrain: "The coast road without the hills",
  },
  {
    index: "02",
    name: "Road",
    terrain: "Newcastle to Dundrum and back",
  },
  {
    index: "03",
    name: "Mountain",
    terrain: "Built for Castlewellan reds",
  },
  {
    index: "04",
    name: "Hybrid",
    terrain: "Town runs and forest greenways",
  },
  {
    index: "05",
    name: "Kids",
    terrain: "First spins on flat loops",
  },
] as const;

/** Map pins: indicative positions only. Named features are either the shop's
 *  own address or public trail designations the shop points to in its trails
 *  section — no invented routes or gradings beyond published trail colours. */
export const trailPins = [
  {
    id: "shop",
    label: "Mourne Cycles",
    note: "63A Castlewellan Road · the trailhead",
    x: 168,
    y: 318,
  },
  {
    id: "castlewellan",
    label: "Castlewellan Forest",
    note: "Red-graded MTB trails",
    x: 292,
    y: 214,
  },
  {
    id: "tollymore",
    label: "Tollymore Forest",
    note: "Forest trails",
    x: 418,
    y: 248,
  },
  {
    id: "donard",
    label: "Slieve Donard",
    note: "Mountain access",
    x: 536,
    y: 132,
  },
  {
    id: "coast",
    label: "Coast road",
    note: "Newcastle seafront spin",
    x: 648,
    y: 286,
  },
] as const;

/** Illustrative workshop queue — every LBS has a stand and a ticket rail. */
export const standToday = [
  { ticket: "084", job: "Bottom bracket — creak under load" },
  { ticket: "085", job: "Puncture repair — rear wheel" },
  { ticket: "086", job: "Puncture repair — front wheel" },
  { ticket: "087", job: "Full service — mountain bike" },
] as const;

/** Worked Cycle to Work example — figures illustrative, scheme name sourced. */
export const schemeExample = {
  scheme: "Cyclescheme",
  salaryBand: "£30,000 gross per year",
  bikePackage: "£1,200 bike package",
  term: "12-month salary sacrifice",
  monthlySacrifice: "£100 per month",
  illustrativeSaving: "around £34 a month in tax and NI",
  steps: [
    "Your employer registers with Cyclescheme",
    "Choose a bike and accessories within your limit",
    "Monthly sacrifice begins — Mourne Cycles confirms the order",
  ],
} as const;
