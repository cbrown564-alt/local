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
      "A 190-year-old inn with a real booking engine and a 43-language translate widget — given a first screen that answers tonight: is the kitchen on, is there a room, what's the tide, what's on.",
    before: "/images/dundrum-inn-before.jpg",
    after: "/images/dundrum-inn-after.jpg",
    beforeAlt:
      "The Dundrum Inn's current homepage: the GuestDiary site opening on a photograph with a machine-translation bar offering more than forty languages across the top",
    afterAlt:
      "Mourne Made concept in slate and gorse brass: a Come for the views, stay for the craic playbill headline beside a Tonight board showing kitchen, rooms, tide and what's on, over the pub's own GuestDiary booking",
    href: "/transformations/dundrum-inn/",
  },
  {
    slug: "groves-chemist",
    name: "Groves Chemist",
    town: "Dundrum",
    category: "Shops & services",
    summary:
      "A pharmacy whose full website — repeat prescriptions, both branches, delivery map — was switched off, leaving a live URL that tells patients nothing. The concept turns the capability back on.",
    before: "/images/groves-chemist-before.jpg",
    after: "/images/groves-chemist-after.jpg",
    beforeAlt:
      "Groves Chemist's current website: groveschemist.com showing a deactivation notice — 'This website is no longer available' — where a working pharmacy site used to be",
    afterAlt:
      "Mourne Made concept in clinical pharmacy green: a Your repeat prescription, ordered before you forget headline beside a dispensing-label order form with a perforated tear edge",
    href: "/transformations/groves-chemist/",
  },
  {
    slug: "tonn-ruray",
    name: "Tonn Ruray Café",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "A café that shares one site with luxury apartments and loses every fight for billing — given its own front door and a live menu in place of a two-year-old PDF.",
    before: "/images/tonn-ruray-before.jpg",
    after: "/images/tonn-ruray-after.jpg",
    beforeAlt:
      "Tonn Ruray's current homepage: the Webflow site opening on Sea View Luxury Apartments and nightly rates, with the café second beneath the accommodation",
    afterAlt:
      "Mourne Made concept in warm chalk, tide teal and coral: a Coffee is a lot more than just a drink headline for the café alone, beside a through-the-day service card",
    href: "/transformations/tonn-ruray/",
  },
  {
    slug: "kelly-mcevoy-brown",
    name: "Kelly, McEvoy & Brown",
    town: "Dundrum",
    category: "Shops & services",
    summary:
      "A building contractor since 1973 whose 53-year portfolio is rendered as plain text links — given a filterable project register that makes the work visible by sector.",
    before: "/images/kelly-mcevoy-brown-before.jpg",
    after: "/images/kelly-mcevoy-brown-after.jpg",
    beforeAlt:
      "Kelly, McEvoy & Brown's current homepage: a small hand-built site with a carousel and the portfolio listed underneath as plain text links",
    afterAlt:
      "Mourne Made concept on an architect's blueprint grid: a Build on experience headline beside a project register with drawing numbers, sector filters and named projects",
    href: "/transformations/kelly-mcevoy-brown/",
  },
  {
    slug: "bettys-butters",
    name: "Betty's Better Butters",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "A chef-founded flavoured-butter maker whose two-page site shows no product at all and is still titled 'Home Page' — given a shelf that finally shows the food.",
    before: "/images/bettys-butters-before.jpg",
    after: "/images/bettys-butters-after.jpg",
    beforeAlt:
      "Betty's Better Butters' current homepage: a two-page ProSite site whose navigation still reads 'Home Page' and 'Our Store', with no product shown",
    afterAlt:
      "Mourne Made concept in churned cream and butter gold with a Rozha One didone: a Restaurant flavour, brought home headline above a shelf of butter rounds with wax-paper labels, flavours marked placeholder",
    href: "/transformations/bettys-butters/",
  },
  {
    slug: "douglas-cromie",
    name: "Douglas & Cromie",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A 50-year car dealer whose domain no longer resolves, its stock stranded on a marketplace it doesn't control — given a forecourt of its own.",
    before: "/images/douglas-cromie-before.jpg",
    after: "/images/douglas-cromie-after.jpg",
    beforeAlt:
      "Douglas & Cromie's current website: a muted card standing in for douglasandcromie.co.uk, which does not resolve — the domain returns no page at all",
    afterAlt:
      "Mourne Made concept in garage graphite and service-station amber with a number-plate motif: a Your forecourt, not someone else's headline beside stock cards the dealer owns, vehicles marked placeholder",
    href: "/transformations/douglas-cromie/",
  },
  {
    slug: "donard-hotel",
    name: "The Donard Hotel",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A trading Main Street hotel whose own site is dead, so every booking runs through a travel site on commission — given a book-direct front door.",
    before: "/images/donard-hotel-before.jpg",
    after: "/images/donard-hotel-after.jpg",
    beforeAlt:
      "The Donard Hotel's current website: donardhotel.com returning a 404 with no secure version — the hotel is reachable only through booking sites that take commission",
    afterAlt:
      "Mourne Made concept in oxblood and warm stone with Marcellus caps: an A Main Street welcome, booked straight from us headline beside a direct-versus-travel-site panel and an availability bar",
    href: "/transformations/donard-hotel/",
  },
  {
    slug: "newcastle-dental",
    name: "Newcastle Family Dental Care",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A dental practice whose own domain hands patients — over plain HTTP — to a different practice's page. The concept is simply its own door, served securely.",
    before: "/images/newcastle-dental-before.jpg",
    after: "/images/newcastle-dental-after.jpg",
    beforeAlt:
      "Newcastle Family Dental Care's current website: its domain redirecting over insecure HTTP to a different practice, DJ Maguire Dentists' Newcastle location page",
    afterAlt:
      "Mourne Made concept in clinical periwinkle: a Your dentist, on your own address headline with a padlocked secure address bar and an appointment-request form stated as HTTPS",
    href: "/transformations/newcastle-dental/",
  },
  {
    slug: "hugh-mccanns",
    name: "Hugh McCann's",
    town: "Newcastle",
    category: "Hospitality",
    summary:
      "A maintained, well-written wedding venue with no way to enquire online — given the one feature every venue needs: check your date and guest count before you phone.",
    before: "/images/hugh-mccanns-before.jpg",
    after: "/images/hugh-mccanns-after.jpg",
    beforeAlt:
      "Hugh McCann's current homepage: the Boutique Wedding Venue & Gardens site, well photographed and maintained, with no enquiry form or date capture anywhere",
    afterAlt:
      "Mourne Made concept in plaster, forest and antique gold with a delicate Italiana display: a We do headline beside an Is our day free enquiry with a date field, guest-count slider and season strip",
    href: "/transformations/hugh-mccanns/",
  },
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

export const publicTransformationSlugs = [] as const;

const publicSlugSet = new Set<string>(publicTransformationSlugs);

export const transformations: Transformation[] = transformationCandidates.filter(
  (item) => publicSlugSet.has(item.slug),
);

export const featuredTransformation =
  transformations.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates.find((item) => item.slug === "donard-veterinary") ??
  transformationCandidates[0];
