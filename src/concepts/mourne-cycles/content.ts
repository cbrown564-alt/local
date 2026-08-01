/** Shared, sourced copy for the Mourne Cycles concept.
 *
 *  Quotes, trail names and scheme wording come from the shop's public website
 *  (read 31 July 2026) or from verifiable public trail designations named on
 *  that site under "Our local Trails". Nothing here invents product SKUs,
 *  prices or workshop tickets. */

export const siteUrl = "https://www.mourne-cycles.co.uk/";

/** Shop thesis — guest voice speaks as Mourne Cycles, not about them. */
export const shopVoice = {
  text: "We're one of Northern Ireland's premier local bike shops — or \"LBS\" to bike aficionados.",
} as const;

/** Showroom categories mapped to local terrain — no product SKUs exist.
 *  `bikeTypes` are the three rails with real destinations (terrain panels).
 *  Hybrid / Kids stay in the wider list for research; they are not on the rail. */
export const bikeTypes = [
  {
    id: "bike-electric",
    index: "01",
    name: "Electric",
    terrain: "The coast road without the hills",
    forWhom: "Riders who want Newcastle seafront miles without grinding every rise.",
    rides: "Coast road spins, harbour loops, and easy range for everyday riding around town.",
    mapNote: "Coast road on the trails map",
    image: "/media/concepts/mourne-cycles/mourne-cycles-bike-electric.jpg",
    imageAlt: "Electric bike for coast riding around Newcastle",
  },
  {
    id: "bike-road",
    index: "02",
    name: "Road",
    terrain: "Newcastle to Dundrum and back",
    forWhom: "Riders chasing clean miles on the corridor between Newcastle and Dundrum.",
    rides: "Tarmac days out, group spins, and the road routes we send people toward.",
    mapNote: "Coast road and town approaches",
    image: "/media/concepts/mourne-cycles/mourne-cycles-bike-road.jpg",
    imageAlt: "Road bike for Newcastle to Dundrum tarmac",
  },
  {
    id: "bike-mountain",
    index: "03",
    name: "Mountain",
    terrain: "Built for Castlewellan reds",
    forWhom: "Riders headed into Castlewellan Forest and the red-graded trails beyond.",
    rides: "Forest singletrack, trail-centre days, and bikes that come back to the workshop muddy.",
    mapNote: "Castlewellan Forest on the trails map",
    image: "/media/concepts/mourne-cycles/mourne-cycles-bike-mountain.jpg",
    imageAlt: "Mountain bike for Castlewellan Forest red trails",
  },
] as const;

/** Full five-category list kept for research parity; rail uses `bikeTypes`. */
export const rangeCategories = [
  ...bikeTypes.map(({ index, name, terrain }) => ({ index, name, terrain })),
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
    "Monthly sacrifice begins — we confirm the order",
  ],
} as const;
