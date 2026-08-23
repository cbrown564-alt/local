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
    slug: "dundrum-inn",
    name: "The Dundrum Inn",
    town: "Dundrum",
    category: "Hospitality",
    summary:
      "A 190-year-old inn whose own website publishes bar hours but no full kitchen schedule — given a first screen that works out open or closed from the Inn's published hours, offers Irish beside English in place of the machine-translation dropdown, and keeps the pub's own GuestDiary booking.",
    before: "/media/concepts/dundrum-inn/dundrum-inn-before.jpg",
    after: "/media/concepts/dundrum-inn/dundrum-inn-after.jpg",
    beforeAlt:
      "The Dundrum Inn's current homepage: the GuestDiary site opening on a silent video of a Dundrum signpost, under a two-row menu and a Select language dropdown, with a Book your stay card across the lower right",
    afterAlt:
      "Mourne Made concept in the Inn's plum and cream: the 1834 crest wordmark and a Come for the views, stay for the craic headline over a full-width visualisation of the Inn's yellow-and-black frontage, labelled on the image as AI-generated, with English and Gaeilge offered where the translation dropdown was",
    href: "/transformations/dundrum-inn/",
    pin: { x: 890, y: 288 },
  },
  {
    slug: "kelly-mcevoy-brown",
    name: "Kelly, McEvoy & Brown",
    town: "Dundrum",
    category: "Shops & services",
    summary:
      "A building contractor since 1973 whose thirteen completed projects open one sector at a time, four clicks from the front page — given a single filterable register that shows the whole record at once.",
    before: "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-before.jpg",
    after: "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-after.jpg",
    beforeAlt:
      "Kelly, McEvoy & Brown's current homepage: a small hand-built site opening on a rotating carousel, with the portfolio reached through a sector-by-sector menu",
    afterAlt:
      "Mourne Made concept carrying Kelly, McEvoy & Brown's yellow-and-grey identity and project photography into a filterable register of named work",
    href: "/transformations/kelly-mcevoy-brown/",
    pin: { x: 1070, y: 195 },
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
    pin: { x: 1025, y: 218 },
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
    pin: { x: 230, y: 280 },
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
    pin: { x: 290, y: 475 },
  },
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
      "Mourne Made concept opening in pier navy, spray mist and ticket amber, with the Fifty summers on the Central Promenade headline, a promenade marquee illustration, a proposed hours-and-updates panel and an attractions list",
    href: "/transformations/kent-amusements/",
    pin: { x: 168, y: 504 },
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
      "Mourne Made concept opening in yard black, cool concrete and badge yellow, with the Hardware on the shelf Hire on the yard headline, a hire-desk rates board and stock categories",
    href: "/transformations/tool-centre/",
    pin: { x: 220, y: 495 },
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
      "Mourne Made concept opening in petrol, oat and caramel, with the bilingual Fáilte isteach Come on in headline, the twin-ring mark, paired Irish and English copy and a visualisation of the CÚPLA shopfront beside it",
    href: "/transformations/cupla/",
    pin: { x: 935, y: 265 },
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
    slug: "bucks-head",
    name: "The Bucks Head",
    town: "Dundrum",
    category: "Food & drink",
    summary:
      "The village pub under chef Alex Greene, given a first screen that books tables — date and party passing straight into the ResDiary booking system it already runs.",
    before: "/media/concepts/bucks-head/bucks-head-before.jpg",
    after: "/media/concepts/bucks-head/bucks-head-after.jpg",
    beforeAlt:
      "The Bucks Head's current homepage: a green header with the antler logo and five menu items above a full-width photograph of the owners by Dundrum Bay, with no headline, hours or booking action",
    afterAlt:
      "Mourne Made concept opening in the pub's own spruce green and blush pink, with the Old Charm Modern Flare headline, a book-a-table card over the hearth photograph and a menus list along the foot",
    href: "/transformations/bucks-head/",
    pin: { x: 980, y: 240 },
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
    pin: { x: 1115, y: 178 },
  },
  {
    slug: "painted-earth",
    name: "Painted Earth",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A gift shop and upstairs art gallery whose £700 originals are collection-only, sell through the same Add to Cart button as a £3 card, and stay listed once sold — given a gallery shelf that puts collection and shipping terms before the checkout and a route on from work that has gone.",
    before: "/media/concepts/painted-earth/painted-earth-before.jpg",
    after: "/media/concepts/painted-earth/painted-earth-after.jpg",
    beforeAlt:
      "Painted Earth's current shop homepage: the hand-lettered roundel over a rotating workshop banner, with the Shop Collections menu opening into lists of maker names",
    afterAlt:
      "Mourne Made concept in the shop's own teal and antique gold: a What are you looking for? opening that starts from the piece, the occasion or the price, with drawn placeholder tiles standing in for the makers' work",
    href: "/transformations/painted-earth/",
    pin: { x: 205, y: 455 },
  },
  {
    slug: "bear-necessities",
    name: "Bear Necessities",
    town: "Newcastle",
    category: "Community & leisure",
    summary:
      "A travelling teddy-bear making party whose packs and call-out live on its own site while the diary lives on Facebook — given a first screen that holds the ritual and packs, and hands today's appearances to the feed.",
    before: "/media/concepts/bear-necessities/bear-necessities-before.jpg",
    after: "/media/concepts/bear-necessities/bear-necessities-after.jpg",
    beforeAlt:
      "Labelled placeholder for Bear Necessities's current public presence (bearnecessitieskids.co.uk and the public Facebook page) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Bear Necessities, captured from the local concept route",
    href: "/transformations/bear-necessities/",
    pin: { x: 240, y: 470 },
  },
  {
    slug: "arley-house",
    name: "Arley House",
    town: "Dundrum",
    category: "Hospitality",
    summary:
      "A Dundrum guest house whose public site no longer carries the stay — given a first screen that wakes on Belfast Road, puts Dundrum first, and keeps the enquiry path honest.",
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
    slug: "armstrong-opticians",
    name: "Armstrong Opticians",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A Railway Street practice since 1983 whose public splash and Facebook already trade — given a calm first screen that puts the door and the phone diary first.",
    before: "/media/concepts/armstrong-opticians/armstrong-opticians-before.jpg",
    after: "/media/concepts/armstrong-opticians/armstrong-opticians-after.jpg",
    beforeAlt:
      "Labelled placeholder for Armstrong Opticians's current public presence (the practice splash site and public Facebook page) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Armstrong Opticians, captured from the local concept route",
    href: "/transformations/armstrong-opticians/",
    pin: { x: 310, y: 420 },
  },
  {
    slug: "irelands-appliance-centre",
    name: "Ireland's Appliance Centre",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A harbour appliance shop whose catalogue and Facebook already work hard — given a first screen that leads with living here, the cooker lede, and an honest docket back to the counter.",
    before: "/media/concepts/irelands-appliance-centre/irelands-appliance-centre-before.jpg",
    after: "/media/concepts/irelands-appliance-centre/irelands-appliance-centre-after.jpg",
    beforeAlt:
      "Labelled placeholder for Ireland's Appliance Centre's current public presence (irelandsappliances.com and the public Facebook page) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Ireland's Appliance Centre, captured from the local concept route",
    href: "/transformations/irelands-appliance-centre/",
    pin: { x: 145, y: 530 },
  },
  {
    slug: "villa-vinci",
    name: "Villa Vinci",
    town: "Newcastle",
    category: "Food & drink",
    summary:
      "A Main Street Italian whose own site and Facebook already carry the room — given a promenade-first screen with the table note up front and the phone as the book path.",
    before: "/media/concepts/villa-vinci/villa-vinci-before.jpg",
    after: "/media/concepts/villa-vinci/villa-vinci-after.jpg",
    beforeAlt:
      "Labelled placeholder for Villa Vinci's current public presence (villavinci.co.uk and the public Facebook page) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Villa Vinci, captured from the local concept route",
    href: "/transformations/villa-vinci/",
    pin: { x: 270, y: 460 },
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
    slug: "binghams-menswear",
    name: "Binghams Menswear",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A Main Street menswear and hire counter whose catalogue already names the garments — given a first screen that puts the appointment and hire permanence first without inventing prices.",
    before: "/media/concepts/binghams-menswear/binghams-menswear-before.jpg",
    after: "/media/concepts/binghams-menswear/binghams-menswear-after.jpg",
    beforeAlt:
      "Labelled placeholder for Binghams Menswear's current public presence (binghamsmenswear.com) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Binghams Menswear, captured from the local concept route",
    href: "/transformations/binghams-menswear/",
    pin: { x: 255, y: 450 },
  },
  {
    slug: "cafe-mauds",
    name: "Café Mauds",
    town: "Newcastle",
    category: "Food & drink",
    summary:
      "A Main Street café whose appetite already lives on Facebook and the tourism listing — given a first screen that leads with the dish and the view, and keeps walk-in or ring as the door.",
    before: "/media/concepts/cafe-mauds/cafe-mauds-before.jpg",
    after: "/media/concepts/cafe-mauds/cafe-mauds-after.jpg",
    beforeAlt:
      "Labelled placeholder for Café Mauds's current public presence (the public Facebook page and the council tourism listing) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Café Mauds, captured from the local concept route",
    href: "/transformations/cafe-mauds/",
    pin: { x: 280, y: 440 },
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
  {
    slug: "marine-wellness",
    name: "Marine Wellness",
    town: "Newcastle",
    category: "Shops & services",
    summary:
      "A Castlewellan Road treatment room whose bookings already run on Booksy — given a calm first screen that quotes the clinical offer and hands the diary to the booker they already use.",
    before: "/media/concepts/marine-wellness/marine-wellness-before.jpg",
    after: "/media/concepts/marine-wellness/marine-wellness-after.jpg",
    beforeAlt:
      "Labelled placeholder for Marine Wellness's current public presence (Booksy and the public Facebook page) — not a live-site screenshot; a matched capture was not filed for the 23 August 2026 publish",
    afterAlt:
      "Mourne Made concept opening screen for Marine Wellness, captured from the local concept route",
    href: "/transformations/marine-wellness/",
    pin: { x: 350, y: 390 },
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
