/* Castle Farm's weekly round, as the farm publishes it.
   ============================================================
   Every value below was read from the farm's own About and Delivery pages on
   4 August 2026 (castlefarmni.com). Nothing here is inferred: no town appears
   that the farm does not list, no day is claimed for a town the schedule does
   not name, and the figures are carried with the date they were read because
   they move — the October 2025 archive already shows the local minimum going
   from £36 to £40.

   The page renders these lists in full and the town lookup indexes the
   rendered DOM, so what the lookup answers and what the page shows can never
   drift apart. See research/concepts/castle-farm/castle-farm-elevation-brief.md.

   Re-verify before any outreach; these are live business facts. */

export const ROUND_READ_ON = "4 August 2026";
export const SHOP_URL = "https://www.castlefarmni.com/";
/** Live box listings — the handoff for "shop this week's produce". */
export const BOXES_URL = "https://www.castlefarmni.com/collections/meal-deal-boxes";
/** Published schedule and delivery terms — source of truth for the figures. */
export const DELIVERY_URL = "https://www.castlefarmni.com/pages/delivery-schedule";
/** The farm's blog index. Individual recipe posts are not currently listed in
 *  the shop sitemap (checked 5 August 2026), so dishes below hand off here. */
export const BLOG_URL = "https://www.castlefarmni.com/blogs/news";
export const PHONE = "07568 436413";
export const PHONE_HREF = "tel:+447568436413";

export interface RoundDay {
  id: string;
  day: string;
  /** The direction the farm gives the day, in its own terms. */
  heading: string;
  /** Only towns the published schedule names. */
  towns: string[];
  /** The farm's own lists end "and more" — say so rather than imply completeness. */
  andMore: boolean;
  note?: string;
}

export const roundDays: RoundDay[] = [
  {
    id: "tuesday",
    day: "Tuesday",
    heading: "North and east",
    towns: [
      "Dundrum",
      "Newcastle",
      "Castlewellan",
      "Downpatrick",
      "the Ards",
      "Bangor",
      "Belfast",
      "Lisburn",
      "Hillsborough",
      "Dromore",
      "Dromara",
    ],
    andMore: true,
  },
  {
    id: "wednesday",
    day: "Wednesday",
    heading: "South",
    towns: [
      "Clough",
      "Kilkeel",
      "Annalong",
      "Warrenpoint",
      "Newry",
      "Armagh",
      "Portadown",
      "Craigavon",
      "Banbridge",
      "Castlewellan",
    ],
    andMore: true,
  },
  {
    id: "thursday",
    day: "Thursday",
    heading: "The peninsula loop",
    towns: [
      "Tyrella",
      "Ardglass",
      "Strangford",
      "Portaferry",
      "the Ards Peninsula",
      "North Down",
    ],
    andMore: false,
  },
  {
    id: "friday",
    day: "Friday",
    heading: "Further north",
    towns: ["Saintfield", "Antrim", "Larne", "Carrickfergus"],
    andMore: true,
  },
  {
    id: "saturday",
    day: "Saturday",
    heading: "By arrangement",
    towns: [],
    andMore: false,
    note: `Ring ${PHONE} to arrange it.`,
  },
];

export interface Cutoff {
  id: string;
  /** Sunday = 0, matching Date#getDay. */
  weekday: number;
  hour: number;
  orderBy: string;
  covers: string;
}

/** Bespoke orders close at 3pm; the two cutoffs cover the whole round. */
export const cutoffs: Cutoff[] = [
  {
    id: "midweek",
    weekday: 0,
    hour: 15,
    orderBy: "Sunday, 3pm",
    covers: "Tuesday, Wednesday and Thursday deliveries",
  },
  {
    id: "endweek",
    weekday: 3,
    hour: 15,
    orderBy: "Wednesday, 3pm",
    covers: "Friday and Saturday deliveries",
  },
];

export interface Term {
  id: string;
  label: string;
  value: string;
}

/** The published numbers. Each appears once on the page, beside its source. */
export const terms: Term[] = [
  { id: "local", label: "Minimum order, local areas", value: "£40" },
  { id: "outlying", label: "Minimum order, outlying postcodes", value: "£76" },
  { id: "delivery", label: "Delivery, added at checkout", value: "£4" },
];

export interface Stock {
  name: string;
  line: string;
}

/** Reared, grown or laid on the farm. Nothing beyond what the farm publishes. */
export const fromTheFarm: Stock[] = [
  { name: "Mourne Aberdeen Angus beef", line: "Our own herd." },
  { name: "Free-range Mourne lamb", line: "Behind it, a 300-ewe commercial flock, and growing." },
  { name: "Gloucestershire Old Spot pork", line: "A rare breed, kept the slow way." },
  { name: "Free-range eggs", line: "Laid here." },
  { name: "Potatoes and vegetables", line: "In season, and only in season." },
];

/** The farm names no individual supplier publicly, so neither does this list. */
export const neighbours = {
  lead: "Other small local producers and businesses in the area",
  line: "Their food travels the round with ours, which gives a small producer a platform right across Ulster.",
};

/** Dishes named on the farm's recipe blog as read on ROUND_READ_ON. The shop's
    current sitemap lists only the blog index and one news post, so each dish
    hands off to the blog rather than inventing a per-post URL. */
export const recipes = [
  { name: "Beef bourguignon", href: BLOG_URL },
  { name: "Shepherd's cottage pie", href: BLOG_URL },
  { name: "Goulash", href: BLOG_URL },
];
