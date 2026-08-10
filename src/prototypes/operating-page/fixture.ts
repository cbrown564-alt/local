import type { OperatingPage, SimulatedRequest } from "./types";

export const initialOperatingPage: OperatingPage = {
  business: {
    name: "Salt & Stem",
    contact: "hello@saltandstem.example",
    area: "Dundrum, Newcastle and the roads between",
  },
  publicState: "open",
  period: {
    startsAt: "2026-08-13T09:00:00+01:00",
    endsAt: "2026-08-15T17:00:00+01:00",
    cutoffAt: "2026-08-13T18:00:00+01:00",
    returnsAt: "2026-08-20T09:00:00+01:00",
  },
  ownerNote: "Three late-summer things, cooked in Dundrum and packed for Friday collection or Saturday delivery.",
  items: [
    {
      id: "galette",
      name: "Tomato + fennel galette",
      description: "Roast local tomatoes, fennel, goat’s cheese and thyme in a rough-puff crust.",
      priceNote: "£18 · serves 4",
      availability: "available",
      unit: "8 left this week",
      image: "/media/prototypes/operating-page/tomato-fennel-galette.webp",
    },
    {
      id: "buns",
      name: "Blackberry rye buns",
      description: "Six sticky morning buns with blackberry, rye crumb and brown sugar.",
      priceNote: "£15 · box of 6",
      availability: "limited",
      unit: "4 boxes left",
      image: "/media/prototypes/operating-page/blackberry-rye-buns.webp",
    },
    {
      id: "chicken",
      name: "Lemon herb chicken tray",
      description: "Whole roast chicken, new potatoes, courgettes, garlic and a lemon-herb finish.",
      priceNote: "£32 · feeds 4–5",
      availability: "available",
      unit: "6 trays left",
      image: "/media/prototypes/operating-page/lemon-herb-chicken.webp",
    },
  ],
  fulfilment: [
    { label: "Requests close", at: "Thursday 13 August · 6:00pm", note: "We reply to confirm every request." },
    { label: "Collect", at: "Friday 14 August · 4:00–6:00pm", note: "From the synthetic Dundrum kitchen." },
    { label: "Local delivery", at: "Saturday 15 August · 10:00am–1:00pm", note: "Dundrum, Newcastle and the route between." },
  ],
  requestFields: ["name", "phone", "collection", "note"],
  publishedAt: "2026-08-09T19:40:00+01:00",
  publishedBy: "Mara at Salt & Stem",
};

export const seededRequests: SimulatedRequest[] = [
  {
    id: "demo-1",
    createdAt: "2026-08-09T18:12:00+01:00",
    name: "Aoife M.",
    contact: "07700 900111",
    collection: "Friday collection",
    note: "One galette, please. No rush on the reply.",
    itemIds: ["galette"],
    answered: false,
  },
  {
    id: "demo-2",
    createdAt: "2026-08-09T18:34:00+01:00",
    name: "Sam R.",
    contact: "sam@example.test",
    collection: "Saturday delivery",
    note: "Could I request the chicken tray and a box of buns?",
    itemIds: ["chicken", "buns"],
    answered: false,
  },
];
