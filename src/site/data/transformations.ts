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
 * `publicTransformationSlugs` below.
 */
export const transformationCandidates: Transformation[] = [
  {
    slug: "dundrum-inn",
    name: "The Dundrum Inn",
    town: "Dundrum",
    category: "Hospitality",
    summary:
      "A 190-year-old inn whose own website never says when the kitchen is on — given a first screen that works out open or closed from the Inn's published hours, offers Irish beside English in place of the machine-translation dropdown, and keeps the pub's own GuestDiary booking.",
    before: "/media/concepts/dundrum-inn/dundrum-inn-before.jpg",
    after: "/media/concepts/dundrum-inn/dundrum-inn-after.jpg",
    beforeAlt:
      "The Dundrum Inn's current homepage: the GuestDiary site opening on a silent video of a Dundrum signpost, under a two-row menu and a Select language dropdown, with a Book your stay card across the lower right",
    afterAlt:
      "Mourne Made concept in the Inn's plum and cream: the 1834 crest wordmark and a Come for the views, stay for the craic headline over a full-width visualisation of the Inn's yellow-and-black frontage, labelled on the image as AI-generated, with English and Gaeilge offered where the translation dropdown was",
    href: "/transformations/dundrum-inn/",
    pin: { x: 920, y: 365 },
  },
  {
    slug: "kelly-mcevoy-brown",
    name: "Kelly, McEvoy & Brown",
    town: "Dundrum",
    category: "Shops & services",
    summary:
      "A building contractor since 1973 whose 53-year portfolio is rendered as plain text links — given a filterable project register that makes the work visible by sector.",
    before: "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-before.jpg",
    after: "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-after.jpg",
    beforeAlt:
      "Kelly, McEvoy & Brown's current homepage: a small hand-built site with a carousel and the portfolio listed underneath as plain text links",
    afterAlt:
      "Mourne Made concept carrying Kelly, McEvoy & Brown's yellow-and-grey identity and project photography into a filterable register of named work",
    href: "/transformations/kelly-mcevoy-brown/",
    pin: { x: 940, y: 345 },
  },
  {
    slug: "bettys-butters",
    name: "Betty's Better Butters",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "A chef-founded flavoured-butter maker whose two-page site publishes no named product, size or price — given a product-led range structure that keeps the maker's own mark and butter imagery.",
    before: "/media/concepts/bettys-butters/bettys-butters-before.jpg",
    after: "/media/concepts/bettys-butters/bettys-butters-after.jpg",
    beforeAlt:
      "Betty's Better Butters' current homepage: its mountain-ring mark, a butter photograph and navigation reading 'Home Page' and 'Our Store'",
    afterAlt:
      "Mourne Made concept carrying Betty's mountain-ring mark and butter photograph into a Restaurant flavour, brought home opening and clearly illustrative range",
    href: "/transformations/bettys-butters/",
    pin: { x: 990, y: 405 },
  },
  {
    slug: "douglas-cromie",
    name: "Douglas & Cromie",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A 50-year car dealer whose domain no longer resolves — restored with its own wordmark, vehicle photography, aftercare promise and direct garage details.",
    before: "/media/concepts/douglas-cromie/douglas-cromie-before.jpg",
    after: "/media/concepts/douglas-cromie/douglas-cromie-after.jpg",
    beforeAlt:
      "Douglas & Cromie's current website: a muted card standing in for douglasandcromie.co.uk, which does not resolve — the domain returns no page at all",
    afterAlt:
      "Mourne Made concept preserving Douglas & Cromie's slate wordmark and colourful vehicle photography beside a Drive away with confidence headline and direct phone action",
    href: "/transformations/douglas-cromie/",
    pin: { x: 370, y: 340 },
  },
  {
    slug: "donard-hotel",
    name: "The Donard Hotel",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A property-first feature proposal for The Donard's new official site: its real navy-and-gold identity, Main Street frontage, published room rates and existing direct-booking route on one screen.",
    before: "/media/concepts/donard-hotel/donard-hotel-before.jpg",
    after: "/media/concepts/donard-hotel/donard-hotel-after.jpg",
    beforeAlt:
      "The Donard's current official homepage in navy and gold: its building logo and navigation above a wide Mournes landscape, welcome line and booking search",
    afterAlt:
      "Mourne Made feature concept carrying The Donard's navy-and-gold identity: a disclosed visualisation of its Main Street frontage beside published room rates and an official booking handoff",
    href: "/transformations/donard-hotel/",
    pin: { x: 290, y: 465 },
  },
  {
    slug: "newcastle-dental",
    name: "Newcastle Family Dental Care",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A dental practice whose own domain hands patients — over plain HTTP — to a different practice's page. The concept is simply its own door, served securely.",
    before: "/media/concepts/newcastle-dental/newcastle-dental-before.jpg",
    after: "/media/concepts/newcastle-dental/newcastle-dental-after.jpg",
    beforeAlt:
      "Newcastle Family Dental Care's current website: its domain redirecting over insecure HTTP to a different practice, DJ Maguire Dentists' Newcastle location page",
    afterAlt:
      "Mourne Made concept in clinical periwinkle: a Your family dentist, close to home headline with a padlocked secure address bar and an appointment-request form stated as HTTPS",
    href: "/transformations/newcastle-dental/",
    pin: { x: 420, y: 400 },
  },
  {
    slug: "hugh-mccanns",
    name: "Hugh McCann's",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A maintained, well-written wedding venue with no way to enquire online — given the one feature every venue needs: check your date and guest count before you phone.",
    before: "/media/concepts/hugh-mccanns/hugh-mccanns-before.jpg",
    after: "/media/concepts/hugh-mccanns/hugh-mccanns-after.jpg",
    beforeAlt:
      "Hugh McCann's current homepage: the Boutique Wedding Venue & Gardens site, well photographed and maintained, with no enquiry form or date capture anywhere",
    afterAlt:
      "Mourne Made concept carrying Hugh McCann's dining-room view towards the Mournes: a We do headline beside an Is our day free enquiry with a date field, guest-count slider and season strip",
    href: "/transformations/hugh-mccanns/",
    pin: { x: 145, y: 525 },
  },
  {
    slug: "newcastle-chamber",
    name: "Newcastle Chamber of Commerce",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "The Co. Down chamber that runs on Gmail and social — given a Main Street finder with civic chrome, a full member directory, events, join and contact.",
    before: "/media/concepts/newcastle-chamber/newcastle-chamber-before.jpg",
    after: "/media/concepts/newcastle-chamber/newcastle-chamber-after.jpg",
    beforeAlt:
      "Newcastle Chamber of Commerce's current public presence: its Facebook page covered by a login form, with the Chamber's introduction greyed out behind the wall",
    afterAlt:
      "Mourne Made concept opening in harbour navy, sea mist and civic brass: Find a business on Main Street headline, directory search, Halloween events card and trade category rail",
    href: "/transformations/newcastle-chamber/",
    pin: { x: 330, y: 450 },
  },
  {
    slug: "kent-amusements",
    name: "Kent Amusements",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "The Central Promenade arcade currently behind a Facebook login — given a first page that leads with fifty summers of family fun, attractions and seasonal hours.",
    before: "/media/concepts/kent-amusements/kent-amusements-before.jpg",
    after: "/media/concepts/kent-amusements/kent-amusements-after.jpg",
    beforeAlt:
      "Kent Amusements' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the arcade's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in pier navy, spray mist and ticket amber, with the Fifty summers on the Central Promenade headline, a promenade marquee illustration, a proposed hours-and-updates ticket and an attractions rail",
    href: "/transformations/kent-amusements/",
    pin: { x: 200, y: 500 },
  },
  {
    slug: "tool-centre",
    name: "The Tool Centre",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The Main Street hardware and plant-hire counter — currently behind a Facebook login — given a first screen that leads with Co. Down, hire rates and stock categories.",
    before: "/media/concepts/tool-centre/tool-centre-before.jpg",
    after: "/media/concepts/tool-centre/tool-centre-after.jpg",
    beforeAlt:
      "The Tool Centre's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the shop's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in yard black, cool concrete and badge yellow, with the Hardware on the shelf Hire on the yard headline, a hire-desk rates board and a stock-category rail",
    href: "/transformations/tool-centre/",
    pin: { x: 370, y: 430 },
  },
  {
    slug: "cupla",
    name: "Cúpla",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "The bilingual café whose name is the Irish for twins — given an identity built on the pair, with every label twinned in Irish and English.",
    before: "/media/concepts/cupla/cupla-before.jpg",
    after: "/media/concepts/cupla/cupla-after.jpg",
    beforeAlt:
      "Cúpla's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the café's name and tagline greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in petrol, oat and caramel, with the bilingual Fáilte isteach Come on in headline, twin-ring mark, an at-the-counter card and a twinned Irish and English rail",
    href: "/transformations/cupla/",
    pin: { x: 955, y: 385 },
  },
  {
    slug: "scopers",
    name: "Scopers",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "Northern Ireland's first zero-waste hot food bar, currently behind a Facebook login — given a first page that leads with the chef and a standing supper-club invitation.",
    before: "/media/concepts/scopers/scopers-before.jpg",
    after: "/media/concepts/scopers/scopers-after.jpg",
    beforeAlt:
      "Scopers' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the bar's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in cast iron, buttermilk and paprika, with the Northern Ireland's first zero-waste hot food bar headline, a supper club card and a signature-dish rail",
    href: "/transformations/scopers/",
    pin: { x: 1025, y: 425 },
  },
  {
    slug: "bucks-head",
    name: "The Bucks Head",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "The village pub under chef Alex Greene, given a first screen that books tables — date, party and area passing straight into the ResDiary booking system it already runs.",
    before: "/media/concepts/bucks-head/bucks-head-before.jpg",
    after: "/media/concepts/bucks-head/bucks-head-after.jpg",
    beforeAlt:
      "The Bucks Head's current homepage: a green header with the antler logo and five menu items above a full-width photograph of the owners by Dundrum Bay, with no headline, hours or booking action",
    afterAlt:
      "Mourne Made concept opening in the pub's own spruce green and blush pink, with the Old Charm Modern Flare headline, a book-a-table card over the hearth photograph and a menus rail along the foot",
    href: "/transformations/bucks-head/",
    pin: { x: 1060, y: 440 },
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
      "Mourne Made concept opening in the practice's plum and teal badge colours, with the Taking Care of Your Pets headline, an appointment request card and a services rail over a Mourne silhouette",
    href: "/transformations/donard-veterinary/",
    pin: { x: 500, y: 435 },
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
      "Mourne Made concept opening on the shop's own black and red identity, the Ride With Us headline, a Trek trail photograph and a numbered range rail with a Cycle to Work cell",
    href: "/transformations/mourne-cycles/",
    pin: { x: 250, y: 480 },
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
    pin: { x: 230, y: 300 },
  },
  {
    slug: "castle-farm",
    name: "Castle Farm Fresh Produce",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "A calmer arrival, a clear shop action and a stronger explanation of the local product — presented as a direct before-and-after.",
    before: "/media/concepts/castle-farm/castle-farm-before.jpg",
    after: "/media/concepts/castle-farm/castle-farm-after.jpg",
    beforeAlt: "Castle Farm's current public homepage: the CASTLEFARM logo, main navigation and the opening farm-field photograph, with arrival pop-ups closed",
    afterAlt: "Mourne Made concept showing Castle Farm produce, a concise promise and one clear shop action",
    href: "/transformations/castle-farm/",
    pin: { x: 950, y: 310 },
  },
];

export const publicTransformationSlugs = [
  "hotel-enniskeen",
  "bucks-head",
  "mourne-cycles",
  "newcastle-chamber",
  "kent-amusements",
  "donard-veterinary",
  "cupla",
  "tool-centre",
  "scopers",
  "dundrum-inn",
  "donard-hotel",
  "newcastle-dental",
  "hugh-mccanns",
  "bettys-butters",
  "douglas-cromie",
  "castle-farm",
] as const;

const publicSlugSet = new Set<string>(publicTransformationSlugs);

export const transformations: Transformation[] = transformationCandidates.filter(
  (item) => publicSlugSet.has(item.slug),
);

export const featuredTransformation =
  transformations.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates[0];
