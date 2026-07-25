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
  category: "hospitality" | "retail" | "health" | "leisure";
  /** Date this business was last verified in research/verifications.json. */
  verified: string;
};

/** Every listing is a real Newcastle business with a dated record in
 *  `research/verifications.json`. The 25 July 2026 re-review failed the claims
 *  gate because the previous list silently mixed real trading names
 *  (Royal County Down Golf Club, Slieve Donard) with invented ones (Bookends
 *  Newcastle, Bay Café, The Linen House), each given a street and a trade, and
 *  nothing told the visitor which was which. Sourcing every entry removes the
 *  ambiguity: the remaining disclaimer is only that the Chamber has not
 *  confirmed these businesses as members, which the page states plainly. */
export const members: Member[] = [
  { name: "Hotel Enniskeen", trade: "Country House Hotel", note: "Bryansford Road · family-run, under the Mournes", category: "hospitality", verified: "2026-07-23" },
  { name: "The Donard Hotel", trade: "Hotel", note: "23–29 Main Street · town-centre rooms", category: "hospitality", verified: "2026-07-24" },
  { name: "Avoca Restaurant and Hotel", trade: "Restaurant & Hotel", note: "Central Promenade · independent, family-run", category: "hospitality", verified: "2026-07-20" },
  { name: "Golf Links House", trade: "Guest House", note: "Golf Links Road · rooms beside the links", category: "hospitality", verified: "2026-07-20" },
  { name: "Conlyn House", trade: "Bed & Breakfast", note: "Newcastle · independent, owner-run", category: "hospitality", verified: "2026-07-20" },
  { name: "Hutt Backpackers Hostel", trade: "Hostel", note: "Newcastle · independent hostel beds", category: "hospitality", verified: "2026-07-20" },
  { name: "Painted Earth", trade: "Jewellery, Art & Gifts", note: "98 Main Street · 20+ years, upstairs gallery", category: "retail", verified: "2026-07-20" },
  { name: "Mourne Cycles", trade: "Bike Shop & Workshop", note: "Castlewellan Road · Trek dealer, workshop", category: "retail", verified: "2026-07-20" },
  { name: "The Tool Centre", trade: "Tool Sales & Plant Hire", note: "107 Main Street · seven-day opening", category: "retail", verified: "2026-07-20" },
  { name: "Donard Veterinary Clinic", trade: "Veterinary Practice", note: "8 Railway Street · independent small-animal clinic", category: "health", verified: "2026-07-21" },
  { name: "Newcastle Family Dental Care", trade: "Dental Practice", note: "Iveagh Court, 2 Railway Street · NHS and private", category: "health", verified: "2026-07-24" },
  { name: "Kent Amusements", trade: "Seaside Amusements", note: "77–79 Central Promenade · fifty years on the seafront", category: "leisure", verified: "2026-07-22" },
  { name: "Hugh McCann's", trade: "Events & Wedding Venue", note: "119–121 Central Promenade · functions and weddings", category: "leisure", verified: "2026-07-24" },
  { name: "Douglas & Cromie", trade: "Car Sales & Service Station", note: "Bryansford Service Station, 23 Bryansford Village", category: "leisure", verified: "2026-07-24" },
];

export const categories = [
  { id: "hospitality" as const, label: "Hospitality & Stays", shortLabel: "Hospitality" },
  { id: "retail" as const, label: "Shops & Trade", shortLabel: "Shops" },
  { id: "health" as const, label: "Health & Wellbeing", shortLabel: "Health" },
  { id: "leisure" as const, label: "Leisure & Services", shortLabel: "Leisure" },
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
