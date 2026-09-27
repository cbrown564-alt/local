/** Shared, sourced copy for the Betty's Better Butters concept.
 *
 *  Quotes and delivery details come from the maker's own public website
 *  (read 31 July 2026 — see research/pipeline/verifications.json). Flavour
 *  names and serving suggestions are illustrative structure only. Serving
 *  plates are AI-generated illustrative visualisations — disclosed in the
 *  concept banner; guest captions describe the plate, not the method. */

export const website = "https://www.bettysbetterbutters.com/";

/** Move 1 — the maker's voice, verbatim. Spoken as the brand on the page;
 *  source kept here for provenance, not shown as a guest attribution. */
export const founderVoice = {
  lead: "Bringing you restaurant quality flavours to the comfort of your own home",
  detail:
    "Flavoured butters using recipes collected from over 10 years in professional kitchens",
  source: website,
} as const;

/** Move 4 — treat and staple in their own structure. */
export const treatStaple = {
  treat: "a one off treat",
  staple: "a new staple ingredient of your kitchen",
  source: website,
} as const;

/** Move 6 — the delivery triangle, told as charm. */
export const delivery = {
  line:
    "Posted from 10 Main Street, Dundrum — collected at the door, delivered locally, or sent by Royal Mail anywhere in the UK.",
} as const;

/** Move 2 — melt moments in the table register.
 *
 *  Hero uses an illustrative butter-on-board plate (same family as the maker's
 *  own photograph). Day-part swaps change appetite caption, not availability. */
export const butterPhoto = {
  src: "/media/concepts/bettys-butters/bettys-butters-generated-melt.jpg",
  width: 1024,
  height: 682,
  alt: "A knife slicing through soft butter on a wooden board",
} as const;

export const meltMoments = [
  {
    id: "morning",
    from: 5,
    to: 14,
    caption: "Maple & sea salt, ready for hot toast",
    context: "Breakfast butter",
    steam: false,
  },
  {
    id: "evening",
    from: 14,
    to: 5,
    caption: "Café de Paris, waiting for the steak",
    context: "Dinner butter",
    steam: false,
  },
] as const;

export type MeltMoment = (typeof meltMoments)[number];

/** Treat / staple plates — illustrative servings, not the maker's range. */
export const plates = {
  treat: {
    src: "/media/concepts/bettys-butters/bettys-butters-generated-treat.jpg",
    width: 1024,
    height: 682,
    alt: "Steak with a melting knob of herb butter",
    caption: "The dinner-party finish",
  },
  staple: {
    src: "/media/concepts/bettys-butters/bettys-butters-generated-staple.jpg",
    width: 1024,
    height: 682,
    alt: "New potatoes with herb butter melting through",
    caption: "The jar beside the hob",
  },
} as const;

/** Move 3 — what it does to a Tuesday. Serving suggestions the live store
 *  promises but cannot deliver; paired with illustrative flavour names.
 *  Cubes are AI-generated illustrative product stills for the range wheel. */
export const jars = [
  {
    name: "Garlic & Herb",
    note: "the everyday one",
    tone: "herb",
    register: "staple" as const,
    tuesday: "Mash through new potatoes beside a midweek roast chicken",
    angle: -90,
    slot: "w" as const,
    cube: {
      src: "/media/concepts/bettys-butters/bettys-butters-generated-cube-herb.jpg",
      width: 1024,
      height: 1024,
      alt: "A cube of garlic and herb butter",
    },
    ph: true,
  },
  {
    name: "Chilli & Lime",
    note: "for corn, for steak",
    tone: "chilli",
    register: "staple" as const,
    tuesday: "Brush over corn on the cob or finish a pan-seared sirloin",
    angle: 90,
    slot: "e" as const,
    cube: {
      src: "/media/concepts/bettys-butters/bettys-butters-generated-cube-chilli.jpg",
      width: 1024,
      height: 1024,
      alt: "A cube of chilli and lime butter",
    },
    ph: true,
  },
  {
    name: "Café de Paris",
    note: "the restaurant classic",
    tone: "paris",
    register: "treat" as const,
    tuesday: "One knob over steak — the dinner-party move on a Tuesday",
    angle: 0,
    slot: "n" as const,
    cube: {
      src: "/media/concepts/bettys-butters/bettys-butters-generated-cube-paris.jpg",
      width: 1024,
      height: 1024,
      alt: "A cube of Café de Paris butter",
    },
    ph: true,
  },
  {
    name: "Maple & Sea Salt",
    note: "breakfast, upgraded",
    tone: "maple",
    register: "treat" as const,
    tuesday: "Melts into hot toast or morning porridge",
    angle: 180,
    slot: "s" as const,
    cube: {
      src: "/media/concepts/bettys-butters/bettys-butters-generated-cube-maple.jpg",
      width: 1024,
      height: 1024,
      alt: "A cube of maple and sea salt butter",
    },
    ph: true,
  },
] as const;
