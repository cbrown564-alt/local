export type TransformationCategory =
  | "Community & leisure"
  | "Shops & services"
  | "Food & drink"
  | "Hospitality";

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
}

export const transformations: Transformation[] = [
  {
    slug: "newcastle-chamber",
    name: "Newcastle Chamber of Commerce",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "The Co. Down chamber that runs on Gmail and social — given a Main Street finder with civic chrome, a full member directory, events, join and contact.",
    before: "/images/newcastle-chamber-before.jpg",
    after: "/images/newcastle-chamber-after.jpg",
    beforeAlt:
      "Newcastle Chamber of Commerce's current public presence: its Facebook page covered by a login form, with the Chamber's introduction greyed out behind the wall",
    afterAlt:
      "Mourne Made concept opening in harbour navy, sea mist and civic brass: Find a business on Main Street headline, directory search, Halloween events card and trade category rail",
    href: "/transformations/newcastle-chamber/",
  },
  {
    slug: "kent-amusements",
    name: "Kent Amusements",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "The Central Promenade arcade currently behind a Facebook login — given a first page that leads with fifty summers of family fun, attractions and seasonal hours.",
    before: "/images/kent-amusements-before.jpg",
    after: "/images/kent-amusements-after.jpg",
    beforeAlt:
      "Kent Amusements' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the arcade's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in pier navy, spray mist and ticket amber, with the Fifty summers on the Central Promenade headline, a promenade marquee illustration, a proposed hours-and-updates ticket and an attractions rail",
    href: "/transformations/kent-amusements/",
  },
  {
    slug: "tool-centre",
    name: "The Tool Centre",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The Main Street hardware and plant-hire counter — currently behind a Facebook login — given a first screen that leads with Co. Down, hire rates and stock categories.",
    before: "/images/tool-centre-before.jpg",
    after: "/images/tool-centre-after.jpg",
    beforeAlt:
      "The Tool Centre's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the shop's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in yard black, cool concrete and badge yellow, with the Hardware on the shelf Hire on the yard headline, a hire-desk rates board and a stock-category rail",
    href: "/transformations/tool-centre/",
  },
  {
    slug: "cupla",
    name: "Cúpla",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "The bilingual café whose name is the Irish for twins — given an identity built on the pair, with every label twinned in Irish and English.",
    before: "/images/cupla-before.jpg",
    after: "/images/cupla-after.jpg",
    beforeAlt:
      "Cúpla's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the café's name and tagline greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in petrol, oat and caramel, with the bilingual Fáilte isteach Come on in headline, twin-ring mark, an at-the-counter card and a twinned Irish and English rail",
    href: "/transformations/cupla/",
  },
  {
    slug: "scopers",
    name: "Scopers",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "Northern Ireland's first zero-waste hot food bar, currently behind a Facebook login — given a first page that leads with the chef and a standing supper-club invitation.",
    before: "/images/scopers-before.jpg",
    after: "/images/scopers-after.jpg",
    beforeAlt:
      "Scopers' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the bar's introduction greyed out behind them",
    afterAlt:
      "Mourne Made concept opening in cast iron, buttermilk and paprika, with the Northern Ireland's first zero-waste hot food bar headline, a supper club card and a signature-dish rail",
    href: "/transformations/scopers/",
  },
  {
    slug: "bucks-head",
    name: "The Bucks Head",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "The village pub under chef Alex Greene, given a first screen that books tables — date, party and area passing straight into the ResDiary booking system it already runs.",
    before: "/images/bucks-head-before.jpg",
    after: "/images/bucks-head-after.jpg",
    beforeAlt:
      "The Bucks Head's current homepage: a green header with the antler logo and five menu items above a full-width photograph of the owners by Dundrum Bay, with no headline, hours or booking action",
    afterAlt:
      "Mourne Made concept opening in the pub's own spruce green and blush pink, with the Old Charm Modern Flare headline, a book-a-table card over the hearth photograph and a menus rail along the foot",
    href: "/transformations/bucks-head/",
  },
  {
    slug: "donard-veterinary",
    name: "Donard Veterinary Clinic",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The practice's own badge — Mourne silhouette, plum and teal — sets the whole screen, with an appointment-request card up front and the emergency call one tap away.",
    before: "/images/donard-veterinary-before.jpg",
    after: "/images/donard-veterinary-after.jpg",
    beforeAlt:
      "Donard Veterinary Clinic's current homepage: the practice badge and menu above a wall-to-wall collage of stock puppies and kittens, with the auto-opening PetsApp chat panel collapsed so the page is visible",
    afterAlt:
      "Mourne Made concept opening in the practice's plum and teal badge colours, with the Taking Care of Your Pets headline, an appointment request card and a services rail over a Mourne silhouette",
    href: "/transformations/donard-veterinary/",
  },
  {
    slug: "mourne-cycles",
    name: "Mourne Cycles",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "The area's Trek dealer given back its own name — a storefront opening screen with the range, a bookable workshop and the Cycle to Work saving up front.",
    before: "/images/mourne-cycles-before.jpg",
    after: "/images/mourne-cycles-after.jpg",
    beforeAlt:
      "Mourne Cycles' current homepage: a black header with the shop logo and phone number above a collage of Trek, Bontrager and Shimano logos and cut-out bike photographs",
    afterAlt:
      "Mourne Made concept opening on the shop's own black and red identity, the Ride With Us headline, a Trek trail photograph and a numbered range rail with a Cycle to Work cell",
    href: "/transformations/mourne-cycles/",
  },
  {
    slug: "hotel-enniskeen",
    name: "Enniskeen Country House Hotel",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A loved, family-run country house reframed around its valley view — with a direct availability path into the hotel's existing booking system.",
    before: "/images/hotel-enniskeen-before.jpg",
    after: "/images/hotel-enniskeen-after.jpg",
    beforeAlt: "Enniskeen's current homepage with an archive oval logo, blue uppercase menu bar and a photo carousel of the house and valley, arrival cookie prompt closed",
    afterAlt: "Mourne Made concept opening on the valley view from a balcony room, with the hideaway headline and an availability bar",
    href: "/transformations/hotel-enniskeen/",
  },
  {
    slug: "castle-farm",
    name: "Castle Farm Fresh Produce",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "A calmer arrival, a clear shop action and a stronger explanation of the local product — presented as a direct before-and-after.",
    before: "/images/castle-farm-before.jpg",
    after: "/images/castle-farm-after.jpg",
    beforeAlt: "Castle Farm's current public homepage: the CASTLEFARM logo, main navigation and the opening farm-field photograph, with arrival pop-ups closed",
    afterAlt: "Mourne Made concept showing Castle Farm produce, a concise promise and one clear shop action",
    href: "/transformations/castle-farm/",
  },
];

export const featuredTransformation =
  transformations.find((item) => item.slug === "donard-veterinary") ?? transformations[0];
