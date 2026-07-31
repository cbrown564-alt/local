/** Shared content for the Hotel Enniskeen full-site concept.
 *
 *  Every fact here is the hotel's own published material, re-read page by
 *  page on 23 July 2026 (see research/verifications.json). The concept
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
    src: "/images/enniskeen-faithful-house.png",
    width: 1819,
    height: 865,
    alt: "AI-generated faithful visualisation of Enniskeen Country House Hotel, preserving its rendered gabled façade, turret and ivy",
  },
  estate: {
    src: "/images/enniskeen-generated-estate.jpg",
    width: 1717,
    height: 916,
    alt: "AI-generated visualisation of a fictional country house in a wooded Mourne estate",
  },
  balcony: {
    src: "/images/enniskeen-generated-balcony.jpg",
    width: 1536,
    height: 1024,
    alt: "AI-generated visualisation of a country-house bedroom opening toward a mountain valley",
  },
  bathPink: {
    src: "/images/enniskeen-faithful-room6.png",
    width: 1024,
    height: 1536,
    alt: "AI-generated faithful visualisation of Room 6's distinctive matching pink basin and bath with chrome cross-head taps",
  },
  restaurant: {
    src: "/images/enniskeen-generated-restaurant.jpg",
    width: 1536,
    height: 1024,
    alt: "AI-generated visualisation of a small country-house restaurant overlooking mountain slopes",
  },
  afternoonTea: {
    src: "/images/enniskeen-generated-afternoon-tea.jpg",
    width: 1536,
    height: 1024,
    alt: "AI-generated visualisation of afternoon tea on a stone terrace above a wooded valley",
  },
  lounge: {
    src: "/images/enniskeen-generated-lounge.jpg",
    width: 1536,
    height: 1024,
    alt: "AI-generated visualisation of a country-house lounge beside an open fire",
  },
  woodland: {
    src: "/images/enniskeen-generated-woodland.jpg",
    width: 1825,
    height: 862,
    alt: "AI-generated visualisation of a woodland path beside a river in the Mourne foothills",
  },
  walker: {
    src: "/images/enniskeen-generated-walker.jpg",
    width: 1536,
    height: 1024,
    alt: "AI-generated visualisation of a hillwalker above a reservoir in the Mournes",
  },
  cycling: {
    src: "/images/enniskeen-generated-cycling.jpg",
    width: 1774,
    height: 887,
    alt: "AI-generated visualisation of two leisure cyclists descending a wooded Mourne road",
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
 *  `research/enniskeen-day-part-hero-brief.md` for the prompts and the standing
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
    src: "/images/enniskeen-faithful-house-dawn.jpg",
    width: 1820,
    height: 864,
    alt: "AI-generated faithful visualisation of Enniskeen Country House Hotel at dawn, mist across the valley behind its gabled façade, turret and ivy",
    caption: "Provisional visualisation · the house at dawn",
  },
  {
    id: "day",
    from: 10,
    to: 18,
    src: generatedVisuals.house.src,
    width: generatedVisuals.house.width,
    height: generatedVisuals.house.height,
    alt: generatedVisuals.house.alt,
    caption: "Provisional visualisation · house built 1890s",
  },
  {
    id: "dusk",
    from: 18,
    to: 4,
    src: "/images/enniskeen-faithful-house-dusk.jpg",
    width: 1818,
    height: 865,
    alt: "AI-generated faithful visualisation of Enniskeen Country House Hotel at dusk, its windows lit against the darkening Shimna Valley",
    caption: "Provisional visualisation · the house at dusk",
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
 *  research/verifications.json). The studio writes none of this: the sentence
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
  /** The hotel's own menu PDFs, linked in place (${site}/…Menu.html pages). */
  menus: [
    { label: "Dinner", href: `${site}/menus/Enniskeen%20-%20Dinner.pdf` },
    { label: "Early evening", href: `${site}/menus/Enniskeen%20-%20Early%20Evening%20Din.pdf` },
    { label: "Weekday lunch", href: `${site}/menus/Enniskeen%20-%20Lunch%20Wkday.pdf` },
    { label: "Sunday lunch", href: `${site}/menus/Enniskeen%20-%20Lunch%20Sunday.pdf` },
    { label: "Honey afternoon tea", href: `${site}/menus/Enniskeen%20-%20Honey%20Aft%20Tea.pdf` },
    { label: "Bar snacks", href: `${site}/menus/Enniskeen%20-%20Bar%20Menu.pdf` },
  ],
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
