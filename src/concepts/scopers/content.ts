/** Shared, sourced copy for the Scopers concept.
 *
 *  Dish names, quotes and dates come from the bar's own public posts (read
 *  31 July 2026 — see research/concepts/scopers/scopers-image-brief.md) or
 *  from dated third-party features named in the case study. Nothing here is
 *  invented for atmosphere. */
export const instagram = "https://www.instagram.com/scopersdundrum/";
export const facebook =
  "https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/";
export const directions =
  "https://www.google.com/maps/search/?api=1&query=Scopers%2C%20169%20Main%20Street%2C%20Dundrum%2C%20Co%20Down";

/** Paul's own caption, verbatim — the best sentence the business ever wrote
 *  about itself on the feed. Source: carrots side post, 26 March 2026. */
export const paulCaption = {
  text: "Carrots like you've never tasted them before",
  attribution: "Paul Cunningham",
  context: "Instagram, 26 March 2026",
  source: instagram,
} as const;

/** One ingredient traced end-to-end through the week's cooking, anchored on
 *  the carrot caption and the Mourne Larder claim in the bar's own words. */
export const carrotTrace = [
  {
    title: "What the Larder gives",
    copy:
      "Fresh, local, seasonal — only what the mountains, the coast and the farms around Dundrum actually provide.",
  },
  {
    title: "Picked at peak",
    copy:
      "The side dish that carries the week's best roots: heritage carrots from the Mourne patch, not a garnish.",
  },
  {
    title: "Cooked properly",
    copy:
      "Glazed, seasoned and finished in the pass — the same attention the burgers get.",
  },
  {
    title: "Nothing wasted",
    copy:
      "Trim, peel and pot liquor go back into the kitchen. Zero-waste is kitchen logic here, not a sticker.",
  },
] as const;

export const dishes = [
  {
    image: "/media/concepts/scopers/scopers-generated-chicken-burger.jpg",
    name: "Buttermilk chicken burger",
    note: "wild garlic mayo · tomato salsa",
    copy: "Proper quality chicken, marinated in buttermilk and breaded to order, with homemade wild garlic mayo and tomato salsa, in a home-baked milk bread bun.",
    alt: "A buttermilk-fried chicken burger in a seeded milk bread bun",
  },
  {
    image: "/media/concepts/scopers/scopers-generated-loaded-fries.jpg",
    name: "BBQ pork loaded fries",
    note: "chipotle mayo · crispy jalapeños",
    copy: "Slow-cooked BBQ pork over thick-cut chips, chipotle mayo and crisp jalapeños. The takeaway box that tastes like a kitchen.",
    alt: "Chips loaded with BBQ pork, chipotle mayo and jalapeños",
  },
  {
    image: "/media/concepts/scopers/scopers-generated-carrots.jpg",
    name: "Seasonal carrots",
    note: "fresh · local · seasonal",
    copy: "“Carrots like you've never tasted them before.” The plate that carries the week's best roots.",
    alt: "Glazed carrots with sesame, spring onion and edible flowers",
  },
  {
    image: "/media/concepts/scopers/scopers-generated-bread.jpg",
    name: "Bread baked each day",
    note: "every bun, every loaf",
    copy: "Fresh bread baked each day on the premises — including the milk bread buns the burgers are built on.",
    alt: "Two rustic loaves cooling on a wire rack",
  },
] as const;

/** Day-part hero: appetite states, never availability. Hours stay on Facebook.
 *  The midday signature is the risograph cover (still + 4 s loop, delivered
 *  7 August 2026 — research/concepts/scopers/scopers-image-brief.md §7);
 *  morning and evening stay photoreal stills from the original set.
 *  `video` is a basename — the frame upgrades to <video> only when both the
 *  .webm and .mp4 exist in public/. `tone: "light"` flips the cover type to
 *  dark-on-paper for pale plates. */
type DayPartSource = {
  id: string;
  from: number;
  to: number;
  src: string;
  video?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  steam: boolean;
  tone?: "light";
  position?: string;
};

const dayPartSources: readonly DayPartSource[] = [
  {
    id: "morning",
    from: 4,
    to: 10,
    src: "/media/concepts/scopers/scopers-generated-bread.jpg",
    width: 1402,
    height: 1122,
    alt: "Bread baked each morning at Scopers",
    caption: "Bread baked each morning",
    steam: true,
  },
  {
    id: "midday",
    from: 10,
    to: 18,
    src: "/media/concepts/scopers/risograph-chicken-burger.jpg",
    video: "/media/concepts/scopers/risograph-chicken-burger",
    width: 1536,
    height: 1024,
    alt: "A risograph-style illustration of the buttermilk chicken burger with wild garlic mayo",
    caption: "The buttermilk chicken burger · wild garlic mayo",
    steam: false,
    tone: "light",
    position: "72% 50%",
  },
  {
    id: "evening",
    from: 18,
    to: 4,
    src: "/media/concepts/scopers/scopers-generated-supper-table.jpg",
    width: 1402,
    height: 1122,
    alt: "A supper-club table in the Mourne countryside",
    caption: "The supper-club table · location revealed the week before",
    steam: false,
  },
];

export type DayPart = DayPartSource;

export const dayParts: readonly DayPart[] = dayPartSources;

/** Chef's arc — dates only where documented in the bar's public presence. */
export const chefTimeline = [
  {
    marker: "2021",
    title: "Great British Menu",
    copy:
      "Paul Cunningham cooks on Great British Menu — the national stage before the counter.",
  },
  {
    marker: "Home",
    title: "Back to Dundrum",
    copy:
      "He comes home to open a hot food bar on his grandfather's foraging — forage what is there, use every part, waste nothing.",
  },
  {
    marker: "July 2022",
    title: "Scopers opens",
    copy:
      "Northern Ireland's first zero-waste hot food bar opens at 169 Main Street — breakfast, brunch and lunch from the Mourne Larder.",
  },
  {
    marker: "July 2026",
    title: "Four years at the counter",
    copy:
      "Four years in, still the only zero-waste hot food bar of its kind in Northern Ireland — and still baking every bun at dawn.",
  },
  {
    marker: "The game",
    title: "The supper clubs",
    copy:
      "Secret pop-up tables in unique Mourne locations — up to eleven courses, the address revealed to guests the week before.",
  },
] as const;

/** Map pins: indicative positions only. Drawn from what Scopers publicly says
 *  about the Mourne Larder — no named farms, no invented suppliers. Optional
 *  label offsets nudge text clear of the drawing. */
type LarderPin = {
  id: string;
  label: string;
  dish: string;
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  labelDx?: number;
  labelDy?: number;
  dishDy?: number;
  /** End of an optional leader line from the dot toward the label,
   *  relative to the dot. */
  leader?: { x: number; y: number };
};

export const larderPins: readonly LarderPin[] = [
  {
    id: "hedgerows",
    label: "The hedgerows",
    dish: "Seasonal carrots",
    x: 140,
    y: 118,
  },
  {
    id: "foothills",
    label: "The foothills",
    dish: "Wild garlic for the mayo",
    x: 470,
    y: 448,
    anchor: "end",
    labelDx: -40,
    labelDy: -28,
    dishDy: -14,
    leader: { x: -34, y: -22 },
  },
  {
    id: "counter",
    label: "169 Main Street",
    dish: "Bread baked here · the counter",
    x: 378,
    y: 272,
    anchor: "start",
    labelDx: 44,
    labelDy: -32,
    dishDy: -18,
    leader: { x: 38, y: -26 },
  },
];

export const supperClub = {
  /** Re-verify on the morning of any outreach: 12 August was announced
   *  3 July and replaced by this date on 10 July
   *  (research/concepts/scopers/scopers-pitch.md). */
  nextDate: "Wednesday 26 August 2026",
  nextTime: "7 pm",
} as const;
