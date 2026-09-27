import { publicTransformationSlugs } from "../../../api/public-transformation-slugs.mjs";

export { publicTransformationSlugs };

export type TransformationCategory =
  | "Community & leisure"
  | "Shops & services"
  | "Food & drink"
  | "Hospitality";

export interface TransformationMapPin {
  /** Position on the town map, in SVG viewBox units. Hand-placed per business
      when the map lands (docs/shell-elevation-brief.md, move 3); the build
      then fails if a public slug has no pin. */
  x: number;
  y: number;
}

export interface Transformation {
  slug: string;
  name: string;
  town: "Dundrum" | "Newcastle";
  category: TransformationCategory;
  summary: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  href: string;
  pin?: TransformationMapPin;
}

/**
 * Internal candidates remain available to noindex concept routes while they
 * await Phase Q review. Public portfolio membership is controlled only by
 * `publicTransformationSlugs` (re-exported from the request allow-list).
 */
export const transformationCandidates: Transformation[] = [
  {
    slug: "newcastle-dental",
    name: "Newcastle Family Dental Care",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A dental practice whose own domain hands patients — over plain HTTP — to a DJ Maguire Dentists location page branded Newcastle Family Dental Care. The concept is simply its own door, served securely.",
    before: "/media/concepts/newcastle-dental/newcastle-dental-before.jpg",
    after: "/media/concepts/newcastle-dental/newcastle-dental-after.jpg",
    beforeAlt:
      "Newcastle Family Dental Care's current website: its domain redirecting over insecure HTTP to a DJ Maguire Dentists location page branded Newcastle Family Dental Care",
    afterAlt:
      "Mourne Made concept in clinical periwinkle: a Your family dentist, close to home headline with a padlocked secure address bar and an appointment-request form stated as HTTPS",
    href: "/transformations/newcastle-dental/",
    pin: { x: 335, y: 435 },
  },
  {
    slug: "hugh-mccanns",
    name: "Hugh McCann's",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A maintained, well-written wedding venue with no way to enquire online — given a simple way to check your date and guest count before you phone.",
    before: "/media/concepts/hugh-mccanns/hugh-mccanns-before.jpg",
    after: "/media/concepts/hugh-mccanns/hugh-mccanns-after.jpg",
    beforeAlt:
      "Hugh McCann's current homepage: the Boutique Wedding Venue & Gardens site, well photographed and maintained, with no enquiry form or date capture anywhere",
    afterAlt:
      "Mourne Made concept carrying Hugh McCann's dining-room view towards the Mournes: a From Today Until Your Day, We Do headline beside an Is our day free enquiry with a date field and guest-count slider",
    href: "/transformations/hugh-mccanns/",
    pin: { x: 120, y: 550 },
  },
  {
    slug: "newcastle-chamber",
    name: "Newcastle Chamber of Commerce",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "The Co. Down chamber that runs on Gmail and social — given a Main Street finder with a local business directory, events, joining and contact.",
    before: "/media/concepts/newcastle-chamber/newcastle-chamber-before.jpg",
    after: "/media/concepts/newcastle-chamber/newcastle-chamber-after.jpg",
    beforeAlt:
      "Newcastle Chamber of Commerce's current public presence: its Facebook page covered by a login form, with the Chamber's introduction greyed out behind the wall",
    afterAlt:
      "Mourne Made concept opening in harbour navy, sea mist and civic brass: Find a business on Main Street headline, directory search, Halloween events card and trade categories",
    href: "/transformations/newcastle-chamber/",
    pin: { x: 515, y: 428 },
  },
  {
    slug: "scopers",
    name: "Scopers",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "Northern Ireland's first zero-waste hot food bar, currently behind a Facebook login — given a first page that leads with the chef and keeps the supper club visible.",
    before: "/media/concepts/scopers/scopers-before.jpg",
    after: "/media/concepts/scopers/scopers-after.jpg",
    beforeAlt:
      "Scopers' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the bar's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in cast iron, buttermilk and paprika, with the Northern Ireland's first zero-waste hot food bar headline, a supper club card and a signature-dish list",
    href: "/transformations/scopers/",
    pin: { x: 848, y: 312 },
  },
  {
    slug: "donard-veterinary",
    name: "Donard Veterinary Clinic",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The practice's own badge — Mourne silhouette, plum and teal — sets the whole screen, with an appointment-request card up front and the emergency call one tap away.",
    before: "/media/concepts/donard-veterinary/donard-veterinary-before.jpg",
    after: "/media/concepts/donard-veterinary/donard-veterinary-after.jpg",
    beforeAlt:
      "Donard Veterinary Clinic's current homepage: the practice badge and menu above a wall-to-wall collage of stock puppies and kittens, with the auto-opening PetsApp chat panel collapsed so the page is visible",
    afterAlt:
      "Mourne Made concept opening in the practice's plum and teal badge colours, with the Donard Veterinary Clinic wordmark, We're here when you need us subhead, drawn pets above the care desk and an appointment request card",
    href: "/transformations/donard-veterinary/",
    pin: { x: 377, y: 401 },
  },
  {
    slug: "mourne-cycles",
    name: "Mourne Cycles",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The area's Trek dealer given back its own name — a storefront opening screen with the range, a bookable workshop and the Cycle to Work saving up front.",
    before: "/media/concepts/mourne-cycles/mourne-cycles-before.jpg",
    after: "/media/concepts/mourne-cycles/mourne-cycles-after.jpg",
    beforeAlt:
      "Mourne Cycles' current homepage: a black header with the shop logo and phone number above a collage of Trek, Bontrager and Shimano logos and cut-out bike photographs",
    afterAlt:
      "Mourne Made concept opening on the shop's own black and red identity, the kinetic Mourne Cycles wordmark riding in over a generated trail plate, and a terrain-mapped range rail with a Cycle to Work option",
    href: "/transformations/mourne-cycles/",
    pin: { x: 250, y: 445 },
  },
  {
    slug: "hotel-enniskeen",
    name: "Enniskeen Country House Hotel",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A loved, family-run country house reframed around its valley view — with a direct availability path into the hotel's existing booking system.",
    before: "/media/concepts/hotel-enniskeen/hotel-enniskeen-before.jpg",
    after: "/media/concepts/hotel-enniskeen/hotel-enniskeen-after.jpg",
    beforeAlt: "Enniskeen's current homepage with an archive oval logo, blue uppercase menu bar and a photo carousel of the house and valley, arrival cookie prompt closed",
    afterAlt: "Mourne Made concept opening on the valley view from a balcony room, with the hideaway headline and an availability bar",
    href: "/transformations/hotel-enniskeen/",
    pin: { x: 420, y: 355 },
  },
  {
    slug: "arley-house",
    name: "Arley House",
    town: "Dundrum",
    category: "Hospitality",
    summary:
      "A Dundrum guest house whose public record shows everything but the rooms — given a front door that wakes on Belfast Road, a hand-drawn map of the village and the bay, and an enquiry path that is the phone call it has always been.",
    before: "/media/concepts/arley-house/arley-house-before.jpg",
    after: "/media/concepts/arley-house/arley-house-after.jpg",
    beforeAlt:
      "Labelled placeholder for Arley House's current public presence (the public Facebook page (own site thin / not carrying the stay)) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Arley House, captured from the local concept route",
    href: "/transformations/arley-house/",
    pin: { x: 1050, y: 210 },
  },
  {
    slug: "conlyn-house",
    name: "Conlyn House",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A Central Promenade guest house whose site still holds named rooms and rates while 'Book Now' is only a form — given a first screen that wakes on the promenade and keeps the enquiry honest.",
    before: "/media/concepts/conlyn-house/conlyn-house-before.jpg",
    after: "/media/concepts/conlyn-house/conlyn-house-after.jpg",
    beforeAlt:
      "Labelled placeholder for Conlyn House's current public presence (conlynhouse.com) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Conlyn House, captured from the local concept route",
    href: "/transformations/conlyn-house/",
    pin: { x: 195, y: 485 },
  },
  {
    slug: "cocos-adventure-playground",
    name: "Coco's Adventure Playground",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "A soft-play and party hall whose own site already carries sessions — given a first screen that puts play and the party booking path first, and hands today's hours to the sources it can keep honest.",
    before: "/media/concepts/cocos-adventure-playground/cocos-adventure-playground-before.jpg",
    after: "/media/concepts/cocos-adventure-playground/cocos-adventure-playground-after.jpg",
    beforeAlt:
      "Labelled placeholder for Coco's Adventure Playground's current public presence (cocosplayground.co.uk) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Coco's Adventure Playground, captured from the local concept route",
    href: "/transformations/cocos-adventure-playground/",
    pin: { x: 175, y: 515 },
  },
];

const publicSlugSet = new Set<string>(publicTransformationSlugs);

export const transformations: Transformation[] = transformationCandidates.filter(
  (item) => publicSlugSet.has(item.slug),
);

export const featuredTransformation =
  transformations.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates[0];
