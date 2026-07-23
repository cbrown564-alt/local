/** Shared content for Newcastle Chamber concept + exploration prototypes.
 *  Real contact / place facts from verification; member names and
 *  non-Halloween events are illustrative concept placeholders. */

export const chamber = {
  name: "Newcastle Chamber of Commerce",
  shortName: "Newcastle Chamber",
  placeLine: "Newcastle, Co. Down",
  address: "50A Main Street, Newcastle, Co. Down, BT33 0AD",
  email: "newcastlechamber2023@gmail.com",
  emailHref: "mailto:newcastlechamber2023@gmail.com",
  phone: "028 4372 4903",
  phoneHref: "tel:+442843724903",
  facebook: "https://www.facebook.com/newcastlechamberofcommerce/",
  instagram: "https://www.instagram.com/newcastlechamber_/",
  linkedin: "https://uk.linkedin.com/company/newcastle-chamber",
  relaunchYear: 2023,
};

export type Member = {
  name: string;
  trade: string;
  note: string;
  category: "hospitality" | "food" | "retail" | "services";
};

export const members: Member[] = [
  { name: "Slieve Donard Resort & Spa", trade: "Hotel & Spa", note: "Downs Road · Newcastle's landmark hotel", category: "hospitality" },
  { name: "Enniskeen Country House Hotel", trade: "Country House Hotel", note: "98 Bryansford Road · under the Mournes", category: "hospitality" },
  { name: "The Anchor Inn", trade: "Hotel & Bar", note: "Main Street · bar and accommodation", category: "hospitality" },
  { name: "Shore View Guest House", trade: "Bed & Breakfast", note: "Central Promenade · seafront stays", category: "hospitality" },
  { name: "The Harbour Bar & Kitchen", trade: "Pub & Restaurant", note: "Main Street · food and live music", category: "food" },
  { name: "Bay Café", trade: "Café", note: "Promenade · all-day breakfast", category: "food" },
  { name: "Mourne Seafood Bar", trade: "Restaurant", note: "Main Street · locally caught fish", category: "food" },
  { name: "The Corner Bakehouse", trade: "Bakery & Café", note: "South Promenade · bread and pastries", category: "food" },
  { name: "Sandy Brae Ice Cream", trade: "Café & Takeaway", note: "Main Street · seasonal, family run", category: "food" },
  { name: "Mourne Gallery & Gifts", trade: "Art & Gifts", note: "Main Street · local prints and crafts", category: "retail" },
  { name: "Newcastle Outdoor & Leisure", trade: "Outdoor & Sports", note: "Main Street · walking and cycling gear", category: "retail" },
  { name: "The Linen House", trade: "Home & Textiles", note: "Central Promenade · Irish linen", category: "retail" },
  { name: "Bookends Newcastle", trade: "Independent Bookshop", note: "Main Street · new and second-hand", category: "retail" },
  { name: "Royal County Down Golf Club", trade: "Golf Club", note: "Golf Links Road · world-ranked links course", category: "services" },
  { name: "Newcastle Pharmacy", trade: "Pharmacy", note: "Main Street · prescription and healthcare", category: "services" },
  { name: "Mourne Heritage Trust", trade: "Tourism & Conservation", note: "Central Promenade · Mourne walks and heritage", category: "services" },
  { name: "Newcastle Credit Union", trade: "Financial Services", note: "Main Street · member-owned savings and loans", category: "services" },
];

export const categories = [
  { id: "hospitality" as const, label: "Hospitality & Stays", shortLabel: "Hospitality" },
  { id: "food" as const, label: "Food & Drink", shortLabel: "Food & Drink" },
  { id: "retail" as const, label: "Retail & Gifts", shortLabel: "Retail" },
  { id: "services" as const, label: "Services & Leisure", shortLabel: "Services" },
];

export type EventItem = {
  title: string;
  date: string;
  dateSort: string;
  blurb: string;
  place: string;
  /** Confirmed from public sources vs illustrative concept filler */
  real: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export const events: EventItem[] = [
  {
    title: "Halloween in Newcastle",
    date: "Saturday 31 October 2026",
    dateSort: "2026-10-31",
    blurb:
      "Family night on the town — planned primarily by the Chamber with Newry, Mourne and Down District Council. Further details on Facebook and Instagram as they land.",
    place: "Newcastle town centre",
    real: true,
    ctaLabel: "Follow updates on Facebook",
    ctaHref: chamber.facebook,
  },
  {
    title: "Main Street traders' morning",
    date: "Monthly · midweek",
    dateSort: "2026-08-15",
    blurb:
      "A short coffee catch-up for members — what's working on the street, what's coming up, and who needs a hand.",
    place: "50A Main Street",
    real: false,
    ctaLabel: "Ask about the next date",
    ctaHref: chamber.emailHref,
  },
  {
    title: "Winter lights & late opening",
    date: "December",
    dateSort: "2026-12-05",
    blurb:
      "Town-centre evening opening with member shops staying late — the kind of seasonal night the calendar can hold as dates firm up.",
    place: "Main Street & Promenade",
    real: false,
    ctaLabel: "Email the chamber",
    ctaHref: chamber.emailHref,
  },
];

export const joinBenefits = [
  {
    title: "Be found on Main Street",
    body: "A standing directory listing that puts your trade in front of locals and visitors looking for businesses in town.",
  },
  {
    title: "Town events, together",
    body: "Halloween and the calendar of town nights are planned with the council and the street. Members hear first and can take part.",
  },
  {
    title: "A voice for the town",
    body: "Volunteer-run since the 2023 relaunch — a single inbox and a committee that speaks for traders under the Mournes.",
  },
  {
    title: "Neighbours who trade with neighbours",
    body: "Meet the other businesses on the street: hospitality, food, retail and services that keep Newcastle open year-round.",
  },
];

export const aboutParagraphs = [
  "Newcastle Chamber of Commerce is the volunteer-run hub for traders on Main Street and beyond in Co. Down. Reformed in 2023, it still answers from the same Gmail and social channels the committee already uses.",
  "The Chamber's job is practical: help people find member businesses, keep the town calendar visible, and give traders a clear door to join. It works with Newry, Mourne and Down District Council on nights like Halloween in Newcastle.",
  "This concept site is independent design exploration by Mourne Made. It is not a live Chamber website and does not claim committee approval.",
];
