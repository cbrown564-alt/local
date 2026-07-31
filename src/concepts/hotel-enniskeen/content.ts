/** Shared content for the Hotel Enniskeen full-site concept.
 *
 *  Every fact here is the hotel's own published material, re-read page by
 *  page on 23 July 2026 (see research/pipeline/verifications.json). The concept
 *  reorders what the hotel already says — no invented services, rooms,
 *  or prices. Each block carries the live URL it was taken from.
 */

const site = "https://www.enniskeenhotel.co.uk";

export const enniskeen = {
  name: "Enniskeen Country House Hotel",
  brand: "Enniskeen",
  brandSub: "Country House Hotel · Shimna Valley",
  placeLine: "Newcastle, Co. Down",
  /** Street address as verified for the Chamber concept (the hotel's own
   *  site publishes only a map embed, phone and email). */
  address: "98 Bryansford Road, Newcastle, Co. Down",
  phone: "028 4372 2392",
  phoneHref: "tel:+442843722392",
  email: "info@enniskeenhotel.com",
  emailHref: "mailto:info@enniskeenhotel.com",
  facebook: "https://www.facebook.com/enniskeenhotel",
  twitter: "https://twitter.com/EnniskeenHotel",
  /** ${site}/index.html */
  directions:
    "Just 45 minutes from Belfast and 1 hour 30 minutes from Dublin, on the outskirts of Newcastle, Co. Down.",
};

/** Bookin1 — the hotel's own booking engine (hotel code ECS).
 *  Deep-link format read from the hotel's own searchbox.min.js: arrival
 *  date and length of stay travel in the hash fragment on the /results
 *  route; the engine takes no guests parameter. */
export const bookin1 = {
  engine: "https://www.bookin1.com/bookingEngine/index.jsp?ID=ecs&hotelCode=ecs#/hotel/ecs",
  /** Required query params, kept as hidden inputs for the no-JS fallback. */
  params: { ID: "ecs", hotelCode: "ecs" },
  deepLink: (dateIso: string, nights: number | string) =>
    `https://www.bookin1.com/bookingEngine/index.jsp?ID=ecs&hotelCode=ecs#/hotel/ecs/results?date=${dateIso}&los=${nights}`,
  vouchers: "https://shop.bookin1.com/property/ecs/vouchers/list",
};

export const base = "/concepts/hotel-enniskeen";

/** Disclosed AI-generated imagery for the independent concept.
 *
 * The house and named Room 6 bathroom visual are faithful visualisations made
 * from reference photographs of the real Enniskeen. The remaining scenic and
 * interior images are atmospheric concept visuals rather than documentary
 * photographs. The shared concept banner discloses both statuses on every
 * route.
 */
export const generatedVisuals = {
  house: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-faithful-house.png",
    width: 1819,
    height: 865,
    alt: "Enniskeen Country House Hotel — rendered gabled façade, turret and ivy",
  },
  estate: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-estate.jpg",
    width: 1717,
    height: 916,
    alt: "A country house in a wooded Mourne estate",
  },
  balcony: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-balcony.jpg",
    width: 1536,
    height: 1024,
    alt: "A country-house bedroom opening toward a mountain valley",
  },
  bathPink: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-faithful-room6.png",
    width: 1024,
    height: 1536,
    alt: "Room 6's matching pink basin and bath with chrome cross-head taps",
  },
  restaurant: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-restaurant.jpg",
    width: 1536,
    height: 1024,
    alt: "A small country-house restaurant overlooking mountain slopes",
  },
  afternoonTea: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-afternoon-tea.jpg",
    width: 1536,
    height: 1024,
    alt: "Afternoon tea on a stone terrace above a wooded valley",
  },
  lounge: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-lounge.jpg",
    width: 1536,
    height: 1024,
    alt: "A country-house lounge beside an open fire",
  },
  woodland: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-woodland.jpg",
    width: 1825,
    height: 862,
    alt: "A woodland path beside a river in the Mourne foothills",
  },
  walker: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-walker.jpg",
    width: 1536,
    height: 1024,
    alt: "A hillwalker above a reservoir in the Mournes",
  },
  cycling: {
    src: "/media/concepts/hotel-enniskeen/enniskeen-generated-cycling.jpg",
    width: 1774,
    height: 887,
    alt: "Two leisure cyclists descending a wooded Mourne road",
  },
  royalCountyDown: {
    src: "/media/concepts/hotel-enniskeen/royal-county-down-golf.png",
    width: 1536,
    height: 1024,
    alt: "Royal County Down Golf Club — the 1889 stone marker beside the clubhouse, links fairways and the Mournes at golden hour",
  },
} as const;

/** Day-part hero.
 *
 *  The same faithful visualisation of the house at three times of day, swapped
 *  on the visitor's local clock so an owner opening the concept in the evening
 *  meets their own building with the windows lit.
 *
 *  Each variant is a separate generation from the same reference photograph and
 *  the same composition as `generatedVisuals.house` — see
 *  `research/concepts/hotel-enniskeen/enniskeen-day-part-hero-brief.md` for the prompts and the standing
 *  reference boundary. A variant appears only once its file is actually present
 *  in `public/`, so the page is never wrong about what it is showing: drop the
 *  generation in, rebuild, and it joins the rotation. With one variant present
 *  the hero is a plain static image and no swap script is emitted.
 */
const dayPartSources = [
  {
    id: "dawn",
    /** Local hours, inclusive of `from`, exclusive of `to`. */
    from: 4,
    to: 10,
    src: "/media/concepts/hotel-enniskeen/enniskeen-faithful-house-dawn.jpg",
    width: 1820,
    height: 864,
    alt: "Enniskeen Country House Hotel at dawn, mist across the valley behind its gabled façade, turret and ivy",
    caption: "The house at dawn",
  },
  {
    id: "day",
    from: 10,
    to: 18,
    src: generatedVisuals.house.src,
    width: generatedVisuals.house.width,
    height: generatedVisuals.house.height,
    alt: generatedVisuals.house.alt,
    caption: "The house · built 1890s",
  },
  {
    id: "dusk",
    from: 18,
    to: 4,
    src: "/media/concepts/hotel-enniskeen/enniskeen-faithful-house-dusk.jpg",
    width: 1818,
    height: 865,
    alt: "Enniskeen Country House Hotel at dusk, its windows lit against the darkening Shimna Valley",
    caption: "The house at dusk",
  },
] as const;

export type DayPart = (typeof dayPartSources)[number];

/** The declared set. Which of these actually ship is resolved against
 *  `public/` in `EnkHero.astro` — this module is imported by the booking
 *  component's client script, so it must stay free of Node built-ins. */
export const dayParts: readonly DayPart[] = dayPartSources;

export const nav = [
  { id: "home", href: `${base}/`, label: "Home" },
  { id: "rooms", href: `${base}/rooms/`, label: "Stay" },
  { id: "dine", href: `${base}/dine/`, label: "Dine" },
  { id: "estate", href: `${base}/estate/`, label: "The estate" },
  { id: "things-to-do", href: `${base}/things-to-do/`, label: "Things to do" },
] as const;

export type NavId = (typeof nav)[number]["id"];

/** ${site}/index.html */
export const home = {
  lede:
    "Family-run, in twelve wooded acres beneath the Mournes — the river trail from the door, Mourne Honey afternoon tea on the terrace, and a quiet nightcap in the Brandy Pad Lounge.",
  welcome:
    "Enniskeen Country House Hotel is a mountainside hideaway resting in the lush Shimna Valley just outside Newcastle, Co. Down — explore the twelve-acre estate and the winding woodland trail down to the Shimna River, enjoy the views over Slieve Donard and the Irish Sea, or spot wildlife roaming the gardens.",
};

/** A real guest's own words, quoted verbatim from the hotel's public
 *  TripAdvisor page — one of the ~389 reviews behind its 4.4 rating (see
 *  research/pipeline/verifications.json). The studio writes none of this: the sentence
 *  is contiguous in the original, trimmed only of its leading "First,", and
 *  the reviewer's display name and city are quoted as TripAdvisor publishes
 *  them. Read 31 July 2026.
 *
 *  Withdraw it if the review is edited or removed — a quotation that no longer
 *  exists at its source is exactly the kind of unverifiable atmosphere the
 *  rest of this file exists to avoid. */
export const review = {
  text:
    "This country house is beautiful, the grounds are beautiful, and our room was absolutely lovely.",
  attribution: "Carolyn K · Asheville, North Carolina",
  context: "Reviewed on TripAdvisor, 22 July 2026 · stayed July 2026",
  source: "https://www.tripadvisor.co.uk/Hotel_Review-g186478-d1462012",
};

/** ${site}/Rooms.html */
export const rooms = {
  intro:
    "Accommodation at Enniskeen comprises 12 traditionally furnished rooms, many with striking mountain and sea views. Rooms are all en suite and include a flat-screen TV, tea and coffee making facilities and a hair dryer. Every booking includes breakfast, parking and Wi-Fi.",
  character:
    "Each room is individually styled and many reflect the house's history.",
  closing:
    "Savour the peace and quiet of this unique country estate and drift off to sleep knowing the only sound likely to awaken you is that of morning birdsong.",
  featured: [
    {
      name: "Room 6",
      detail: "The original pink art-deco bathroom",
      note: "One of the house's period survivors — individually styled, like every room at Enniskeen.",
      image: generatedVisuals.bathPink.src,
      imageWidth: generatedVisuals.bathPink.width,
      imageHeight: generatedVisuals.bathPink.height,
      alt: generatedVisuals.bathPink.alt,
    },
    {
      name: "Room 15",
      detail: "In the turret · panoramic mountain, forest and sea views",
      note: "Perched in the turret at the top of the house.",
      image: generatedVisuals.house.src,
      imageWidth: generatedVisuals.house.width,
      imageHeight: generatedVisuals.house.height,
      alt: generatedVisuals.house.alt,
    },
    {
      name: "Balcony rooms",
      detail: "French doors onto the Shimna Valley",
      note: "Many rooms carry striking mountain and sea views; the balcony rooms open straight onto them.",
      image: generatedVisuals.balcony.src,
      imageWidth: generatedVisuals.balcony.width,
      imageHeight: generatedVisuals.balcony.height,
      alt: generatedVisuals.balcony.alt,
    },
  ],
  /** Included with every booking (Rooms.html; facilities from OurFacilities.html). */
  included: [
    { title: "Breakfast included", note: "Every booking includes breakfast" },
    { title: "Free Wi-Fi", note: "Included with every booking" },
    { title: "Free parking", note: "Car parking at the house" },
    { title: "All rooms en suite", note: "With flat-screen TV, tea & coffee, hair dryer" },
  ],
};

/** ${site}/Restaurant.html, AfternoonTea.html, SpecialOccasions.html */
export const dine = {
  restaurant: {
    name: "The Oak Restaurant",
    copy:
      "The Oak Restaurant is renowned for its 'Old World' ambience, traditional Northern Irish cuisine, and service that is professional, discreet and attentive. Enjoy the very best in fresh, locally sourced seasonal food and fine wines, as you look out across the garden at the views over Newcastle, the Mountains of Mourne and the Irish Sea.",
  },
  afternoonTea: {
    name: "Mourne Honey Afternoon Tea",
    copy:
      "The afternoon tea menu is inspired by local Mourne Honey, sourced from a bee guru who keeps a small apiary close by on the slopes of Slieve Donard. On a good year the bees gather from the Mourne bell and ling heathers — and from fuchsia, sycamore, dandelion, bramble, clover and blackberry — and the honey is harvested by hand, spun from the wax frames.",
    booking: "Advance booking is required — call 028 4372 2392 to reserve a table.",
  },
  brandyPad: {
    name: "The Brandy Pad Lounge",
    copy:
      "After a delicious dessert, retire to the 'Brandy Pad' lounge — named for the old smugglers' route through the Mournes — where you can sit back, relax in the peace and quiet, and let the world go by.",
  },
  occasions: {
    name: "Special occasions",
    copy:
      "For a small wedding, anniversary, christening, birthday or family gathering, the Bay Room seats up to 30 guests, and the house takes intimate parties of 10 through to banquets of up to 75 — guaranteed to be the only function in the house on the day.",
  },
  /**
   * Menus transcribed from the hotel's own published PDFs
   * (${site}/menus/…, re-read 31 July 2026). Shown on-page so a visitor can
   * read them without downloading; each panel still links the source PDF.
   * Prices and dishes may change — the house is the authority.
   */
  menus: [
    {
      id: "dinner",
      label: "Dinner",
      subtitle: "Table d'hôte · evenings",
      href: `${site}/menus/Enniskeen%20-%20Dinner.pdf`,
      hours: "5.00 – 7.30 p.m.",
      priceNote: "Table d'hôte £38.00 · house wine £6.50 / 175 ml, £22.00 / bottle",
      columns: [
        {
          sections: [
            {
              head: "To begin",
              dishes: [
                { name: "Chilled fan of melon", desc: "With an Enniskeen sorbet" },
                { name: "Seafood medley", desc: "With mixed salad Marie Rose" },
                { name: "Julienne of Armagh bacon with egg mayonnaise", desc: "With mixed salad" },
                { name: "Entrée day special" },
                { name: "Homemade soup of the day", desc: "Served with Enniskeen bread assortment" },
              ],
            },
            {
              head: "To finish",
              dishes: [
                { name: "Home-made desserts", desc: "A tempting selection from the kitchen" },
                { name: "Assam tea or American blend coffee", desc: "Served with favours" },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "Mains",
              dishes: [
                { name: "Catch of the day" },
                { name: "Roast leg of Mourne lamb", desc: "With mint sauce and gravy" },
                { name: "Day special" },
                {
                  name: "Roast County Down turkey with ham",
                  desc: "Homemade stuffing and cranberry sauce",
                },
                {
                  name: "Sirloin steak 10 oz",
                  desc: "French fried onions, chips, peppered sauce or garlic butter",
                  price: "+ £10.00",
                },
                { name: "Vegetarian dish of the day" },
              ],
              note: "Chef's selection of local vegetables and potatoes.",
            },
          ],
        },
      ],
    },
    {
      id: "early-evening",
      label: "Early evening",
      subtitle: "5.00 – 6.15 p.m.",
      href: `${site}/menus/Enniskeen%20-%20Early%20Evening%20Din.pdf`,
      hours: "5.00 – 6.15 p.m.",
      priceNote: "Main course £22.50 · two courses £30.00 · three courses £37.50",
      columns: [
        {
          sections: [
            {
              head: "Starters",
              dishes: [
                { name: "Classic prawn cocktail", desc: "Marie Rose", price: "+ £4.00" },
                {
                  name: "Julienne of Armagh bacon and egg mayonnaise",
                  desc: "With salad",
                },
                { name: "Fan of melon", desc: "With Enniskeen sorbet" },
                {
                  name: "Dressed stuffed mushrooms",
                  desc: "Cream cheese and garlic, salad and hazelnut dressing",
                },
                { name: "Homemade soup of the day" },
              ],
            },
            {
              head: "Side orders",
              dishes: [
                { name: "French fries or boiled potatoes", price: "£5.00" },
                { name: "Spicy potato wedges", price: "£5.00" },
                { name: "French fried onions", price: "£5.00" },
                { name: "Sauté mushrooms", price: "£5.00" },
                { name: "Peppered broccoli", price: "£5.00" },
                { name: "Vegetable of the day", price: "£5.00" },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "Main courses",
              dishes: [
                {
                  name: "Catch of the day in batter",
                  desc: "Fries, mushy or garden peas, tartar sauce",
                },
                {
                  name: "Deep fried fillet of plaice",
                  desc: "Tartar sauce, fries, garden peas",
                },
                {
                  name: "Golden Ardglass scampi",
                  desc: "Lightly battered, tartar sauce, fries, garden peas",
                },
                {
                  name: "Roast Crossgar chicken with Armagh gammon",
                  desc: "Carrots, green beans, homemade stuffing, boiled potatoes, rich gravy",
                },
                {
                  name: "Roast of the day",
                  desc: "Seasonal vegetables, boiled and roast potatoes, roast gravy",
                },
                {
                  name: "Duo of slow roasted pork belly and Armagh stuffed pork fillet",
                  desc: "Bramley apple sauce, carrots, green beans, roast gravy, boiled and roast potatoes",
                },
                {
                  name: "Grilled prime Irish sirloin steak (10 oz)",
                  desc: "French fried onions, peppered sauce, fries",
                  price: "+ £10.00",
                },
              ],
            },
            {
              head: "Desserts",
              dishes: [
                { name: "Home-made desserts", desc: "A selection from the kitchen" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "weekday-lunch",
      label: "Weekday lunch",
      subtitle: "Table d'hôte · Mon–Sat",
      href: `${site}/menus/Enniskeen%20-%20Lunch%20Wkday.pdf`,
      hours: "12.30 – 2.30 p.m. · Monday to Saturday",
      priceNote: "Two courses £28.50 · three courses £33.50 · children £17.50",
      columns: [
        {
          sections: [
            {
              head: "To begin",
              dishes: [
                {
                  name: "Chilled fan of melon",
                  desc: "Honeydew with strawberry yoghurt dressing",
                },
                { name: "Seafood salad medley", desc: "With Marie Rose" },
                {
                  name: "Julienne of Armagh bacon with egg mayonnaise",
                  desc: "Served with mixed salad",
                },
                {
                  name: "Homemade soup of the day",
                  desc: "With Enniskeen bread assortment",
                },
              ],
            },
            {
              head: "To finish",
              dishes: [
                { name: "Home-made desserts", desc: "A tempting selection from the kitchen" },
                {
                  name: "Tea and coffee",
                  desc: "Assam tea or American blend £3.00 · cappuccino, latte, Americano £4.00",
                },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "Mains",
              dishes: [
                { name: "Catch of the day", desc: "With tartar sauce" },
                { name: "Day special" },
                { name: "Roast leg of Mourne lamb", desc: "With mint sauce and gravy" },
                {
                  name: "Roast County Down turkey with Armagh ham",
                  desc: "Homemade stuffing and cranberry sauce",
                },
                { name: "Vegetarian dish of the day" },
              ],
              note: "Chef's selection of local vegetables and potatoes.",
            },
          ],
        },
      ],
    },
    {
      id: "sunday-lunch",
      label: "Sunday lunch",
      subtitle: "Roasts from the carving",
      href: `${site}/menus/Enniskeen%20-%20Lunch%20Sunday.pdf`,
      hours: "12.30 – 2.30 p.m. · Sunday",
      priceNote: "Two courses £30.00 · three courses £35.00 · children £17.50",
      columns: [
        {
          sections: [
            {
              head: "To begin",
              dishes: [
                {
                  name: "Chilled fan of melon",
                  desc: "Honeydew with strawberry yoghurt dressing",
                },
                {
                  name: "Dressed mushrooms",
                  desc: "Cream cheese, hint of garlic, roasted hazelnut dressing",
                },
                {
                  name: "Seafood salad medley",
                  desc: "Prawns with smoked haddock, salmon and salad Marie Rose",
                },
                {
                  name: "Julienne of Armagh bacon with egg mayonnaise",
                  desc: "Served with mixed salad",
                },
                {
                  name: "Chicken Caesar salad",
                  desc: "Cos lettuce, bacon and croutons",
                },
                {
                  name: "Homemade vegetable soup",
                  desc: "With Enniskeen bread assortment",
                },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "Sunday roasts & mains",
              dishes: [
                { name: "Fillet of salmon", desc: "With creamed leeks" },
                {
                  name: "Prime roast Irish beef",
                  desc: "Gravy, Yorkshire pudding, horseradish sauce",
                },
                { name: "Roast leg of Mourne lamb", desc: "With mint sauce and gravy" },
                {
                  name: "Roast County Down turkey with Armagh ham",
                  desc: "Homemade stuffing and cranberry sauce",
                },
                {
                  name: "Roast stuffed fillet of Armagh pork",
                  desc: "Homemade stuffing, Bramley apple sauce",
                },
                { name: "Roast Irish chicken", desc: "With a peppercorn sauce" },
                {
                  name: "Cheese, broccoli & sundried tomato flan",
                  desc: "With tossed salad leaves",
                },
              ],
              note: "Chef's selection of local vegetables and potatoes. Choose from a tempting selection of home-made desserts.",
            },
          ],
        },
      ],
    },
    {
      id: "tea",
      label: "Honey afternoon tea",
      subtitle: "Mourne honey · from £27",
      href: `${site}/menus/Enniskeen%20-%20Honey%20Aft%20Tea.pdf`,
      hours: "1.00 – 4.30 p.m. · every day",
      priceNote: "£27.00 per person · minimum of two persons · advance booking required",
      columns: [
        {
          sections: [
            {
              head: "Finger sandwiches",
              dishes: [
                { name: "Mourne honey baked Armagh ham", desc: "White bread" },
                { name: "Poached Irish salmon with dill", desc: "Wholemeal bread" },
                { name: "Roasted Lissara Farm chicken", desc: "White bread" },
                {
                  name: "Murlough Farm free-range eggs with salad",
                  desc: "Granary bread",
                },
              ],
            },
            {
              head: "From the bakery",
              dishes: [
                {
                  name: "Freshly baked scones",
                  desc: "Homemade strawberry jam, fresh cream and Mourne honey",
                },
                {
                  name: "Traditional Irish tea brack",
                  desc: "With local Abernethy hand-churned butter",
                },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "Sweet things",
              dishes: [
                { name: "Mourne honey and strawberry Victoria sponge" },
                { name: "Homemade cream meringues" },
                { name: "Chocolate éclairs" },
                { name: "Almond slice" },
              ],
            },
            {
              head: "To drink",
              dishes: [
                {
                  name: "Thompson's traditional tea",
                  desc: "Green tea, fruit tea and freshly ground coffee on request",
                },
              ],
              note: "Menu may vary with seasonality and availability of local produce.",
            },
          ],
        },
      ],
    },
    {
      id: "bar",
      label: "Bar snacks",
      subtitle: "Cocktail lounge · daytime",
      href: `${site}/menus/Enniskeen%20-%20Bar%20Menu.pdf`,
      hours: "12.30 – 2.30 p.m. · Monday to Saturday",
      priceNote: "Served in the cocktail lounge · table d'hôte lunch also available in the dining room",
      columns: [
        {
          sections: [
            {
              head: "Savouries",
              dishes: [
                {
                  name: "Fresh soup of the day",
                  desc: "Home-baked Enniskeen wheaten or bread roll",
                  price: "£7.00",
                },
                { name: "Garlic bread", price: "£2.50" },
                { name: "Freshly made sandwiches", desc: "Various fillings", price: "£7.00" },
                { name: "Soup and sandwich combo", price: "£13.50" },
                {
                  name: "Toasted sandwiches with salad",
                  desc: "Ham and cheddar, chicken and mango chutney, ham and pineapple, or cheddar and tomato",
                  price: "£9.00",
                },
                {
                  name: "Open sandwiches on home-baked wheaten",
                  desc: "Ardglass smoked salmon with creamy Philadelphia · Kilkeel prawns, Marie Rose",
                  price: "from £13.50",
                },
                {
                  name: "Paninis",
                  desc: "Sweet chilli chicken, or Irish back bacon with brie and cranberry",
                  price: "£13.95",
                },
                {
                  name: "Homemade Enniskeen steak burger",
                  desc: "Brioche bun, salad, chips and onion relish · cheese or bacon £1 extra",
                  price: "£16.50",
                },
                {
                  name: "Chef's chicken and ham pie",
                  desc: "Salad, or hot vegetables and potatoes, or fries",
                  price: "£14.95",
                },
                {
                  name: "Chicken goujons with French fries",
                  desc: "Garlic, sweet chilli, or curried mayo dip",
                  price: "£14.95",
                },
              ],
            },
          ],
        },
        {
          sections: [
            {
              head: "From the fryer & board",
              dishes: [
                {
                  name: "Lightly battered fillet of Ardglass haddock",
                  desc: "Chips and mushy peas",
                  price: "£21.50",
                },
                {
                  name: "Golden Ardglass scampi",
                  desc: "Lightly battered, tartar sauce and chips",
                  price: "£21.50",
                },
                { name: "Chicken Caesar salad", price: "£15.50" },
                { name: "Classic Caesar salad", price: "£14.00" },
                {
                  name: "Home-cooked Armagh ham",
                  desc: "With a mixed salad",
                  price: "£14.50",
                },
                {
                  name: "Enniskeen quiche",
                  desc: "With salad or French fries",
                  price: "£14.50",
                },
                { name: "Today's Enniskeen special", price: "£18.50" },
              ],
            },
            {
              head: "Desserts",
              dishes: [
                { name: "Warm chocolate fudge gateau", price: "£7.50" },
                {
                  name: "Hot pie of the day",
                  desc: "Custard, ice cream or fresh cream",
                  price: "£7.50",
                },
                { name: "Fruit pavlova", price: "£7.50" },
                { name: "Banoffee pie and cream", price: "£7.50" },
                { name: "Strawberry meringue glacé", price: "£7.50" },
                {
                  name: "Cheese board",
                  desc: "Trio of Irish cheese, crackers and Enniskeen chutney",
                  price: "£8.50",
                },
              ],
            },
          ],
        },
      ],
    },
  ] as const,
};

/** ${site}/WoodlandRiverTrail.html, History.html, index.html */
export const estate = {
  intro:
    "Enniskeen House has a beautiful twelve-acre estate to explore — take a stroll along the woodland trail past the picturesque Wishing Well, then find a quiet spot by the Shimna River, bring a picnic, and let the world go by.",
  wildlife:
    "The gardens look over Slieve Donard — Northern Ireland's highest mountain — and out to the Irish Sea, with wildlife roaming the grounds.",
  history: {
    built:
      "Enniskeen House was built in the late 1890s by R.W. Murray, principal of the Murray Sons & Co. tobacco house ('Erinmore', 'Murray's Mellow Mixture') and a director of Belfast Ropeworks — then the biggest rope maker in the world.",
    titanic:
      "The house later passed to linen manufacturer H. Liddell, whose table linens dressed the finest dining rooms aboard RMS Titanic — including the Captain's table. In the 1960s the house became a hotel.",
  },
  /** The same History.html facts as a dated band. Only the two dates the
   *  hotel actually publishes are given as dates; the Liddell era is
   *  undated there, so it stays undated here. */
  timeline: [
    {
      marker: "Late 1890s",
      title: "Built for a tobacco man",
      copy:
        "R.W. Murray — principal of the Murray Sons & Co. tobacco house behind 'Erinmore' and 'Murray's Mellow Mixture', and a director of the Belfast Ropeworks, then the biggest rope maker in the world — builds Enniskeen House above the Shimna Valley.",
    },
    {
      marker: "The linen years",
      title: "Table linen for the Titanic",
      copy:
        "The house passes to linen manufacturer H. Liddell, whose table linens dressed the finest dining rooms aboard RMS Titanic — including the Captain's table.",
    },
    {
      marker: "1960s",
      title: "The house becomes a hotel",
      copy:
        "Enniskeen opens its doors as a country house hotel, keeping the rooms individually styled — the turret room, the pink art-deco bathroom — rather than matching them to one another.",
    },
    {
      marker: "Today",
      title: "Family-run, twelve acres",
      copy:
        "Twelve wooded acres, the woodland trail past the Wishing Well down to the Shimna, and the Brandy Pad Lounge — named for the old smugglers' route through the Mournes above the house.",
    },
  ],
};

/** ${site}/Walking.html, Golf.html, BikeHire.html, Mourne-FoodsFilms-CycleTour.html */
export const thingsToDo = {
  walking: {
    title: "Walking",
    copy:
      "Stroll the hotel's own woodland trail to the Shimna River, dander through neighbouring Tollymore Forest Park to the Hermitage, or conquer Slieve Donard itself — at 853 m the highest of the compact ring of twelve Mourne summits on the doorstep.",
    routes: [
      "Slieve Donard — Northern Ireland's highest mountain",
      "The Brandy Pad — an old smugglers' route through the Mournes",
      "Tollymore Forest Park — the Shimna River and the Hermitage",
      "Murlough Blue Flag beach and sand dunes",
      "Silent Valley Reservoir and the Mourne Way",
    ],
    support:
      "Many of the staff are keen walkers: the house keeps a drying room with dehumidifiers, laminated maps and route advice, packed lunches and thermos flasks, guided walks, and a mini-coach shuttle for pick-ups and bag transfers.",
  },
  golf: {
    title: "Golf",
    copy:
      "The house sits beside the globally renowned Royal County Down links — Tom Watson, a many-time Enniskeen guest, called the outward half 'as fine a nine holes as I have ever played' — with the friendlier Annesley Links alongside.",
    support:
      "The hotel arranges tee times, runs its mini-coach to Royal County Down, Ardglass (40 minutes) and Royal Belfast (an hour), and keeps the drying room ready for your kit.",
  },
  cycling: {
    title: "Bike hire & the Foods and Films tour",
    copy:
      "Bicycle hire from £15 (electric bikes £35), with a shuttle bus up to Spelga Dam in the heart of the Mournes — then it's all downhill back to Enniskeen for afternoon tea.",
    tour:
      "The hotel devised the self-guided Mourne Foods & Films Cycle Tour: freewheel down the Shimna Valley past filming locations from Game of Thrones, The Fall, Philomena and Dracula Untold, tasting artisan produce like Abernethy's hand-churned butter on the way. From £49.95 per person for hotel guests, including Mourne Honey afternoon tea, bike, trail pack and shuttle — book with Clearsky Adventure on 028 4372 3933.",
  },
  nearby: [
    { label: "Royal County Down", href: "https://www.royalcountydown.org/" },
    { label: "Tollymore Forest Park", href: "https://discovernorthernireland.com/Tollymore-Forest-Park-Newcastle-P2888/" },
    { label: "Murlough Beach", href: "http://www.outdoorni.com/local-outdoors/venues/murlough-beach/" },
    { label: "Silent Valley", href: "https://discovernorthernireland.com/Silent-Valley-Mountain-Park-Kilkeel-Newry-P16373/" },
    { label: "Castle Ward", href: "https://www.nationaltrust.org.uk/castle-ward" },
    { label: "St Patrick Centre", href: "http://www.saintpatrickcentre.com/" },
  ],
};

/** Source URLs for the transformation page and design notes. */
export const sources = {
  home: `${site}/index.html`,
  rooms: `${site}/Rooms.html`,
  restaurant: `${site}/Restaurant.html`,
  afternoonTea: `${site}/AfternoonTea.html`,
  occasions: `${site}/SpecialOccasions.html`,
  facilities: `${site}/OurFacilities.html`,
  history: `${site}/History.html`,
  trail: `${site}/WoodlandRiverTrail.html`,
  walking: `${site}/Walking.html`,
  golf: `${site}/Golf.html`,
  bikeHire: `${site}/BikeHire.html`,
  cycleTour: `${site}/Mourne-FoodsFilms-CycleTour.html`,
  contact: `${site}/Contact.html`,
};
