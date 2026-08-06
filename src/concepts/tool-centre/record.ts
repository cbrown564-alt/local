/* The Tool Centre — the record the pages are built from.
   ============================================================
   Sources, with read dates:
   - research/pipeline/verifications.json, verified 20 July 2026, build-day
     re-read 22 July 2026 (address, phone, the two service lines, the Facebook
     trading name, the Newcastle-upon-Tyne search burial)
   - Big Red Directory listing, read 22 July 2026 and re-read 5 August 2026 —
     both reads returned Mon–Sat 9–5, Sun 10–4 at 107 Main St BT33 0AE
   - Calor cylinder-dealer listing, read 22 July 2026 (bottled gas)

   Three standing rules, from the honesty constraints in
   research/concepts/tool-centre/tool-centre-elevation-brief.md:

   1. NO RATE ON EITHER PAGE IS THE SHOP'S. Every figure here is a suggestion
      the counter has never seen, and `INDICATIVE` says so in the same words on
      the hire desk, the hire list and the case study. The desk board carries no
      figure at all — it asks. Real rates arrive through `confirmedHire`, empty
      below, and only from the shop.
   2. NO INVENTED STOCK, SERVICES OR TERMS. The two service lines, the four
      hire categories and the Calor dealership are the verified list. What a
      hirer must bring, what fuel costs and what a weekend multiplies by are
      *not* in the record — so the sidebar asks those as questions rather than
      answering them as terms.
   3. THE ARC IS EMPTY AND STAYS EMPTY. No founding date, no history, no
      "serving Newcastle since". The record holds none, and that is a finding.

   Nothing from the same-named shops in Newcastle-upon-Tyne touches this file.
   The mark in the header is concept work suggested by the shop's yellow-and-
   black Facebook badge — it is not the badge. */

export const VERIFIED_ON = "20 July 2026";
export const READ_ON = "5 August 2026";

export const PHONE = "028 4372 5010";
export const PHONE_HREF = "tel:+442843725010";
export const ADDRESS = "107 Main Street";
export const POSTCODE = "BT33 0AE";
export const FACEBOOK = "https://www.facebook.com/Toolcentreplanthire/";

/** Directory name and Facebook trading name. Guests meet the shop as The Tool
 *  Centre; the Plant Hire name appears once, on the Facebook link — not as a
 *  structural claim about two businesses. */
export const NAME_COUNTER = "The Tool Centre";
export const NAME_YARD = "Tool Centre Plant Hire";

/** Stated wherever a stranger meets the shop for the first time. Search puts
 *  the same-named Newcastle-upon-Tyne shops above this one on every query, so
 *  the county is not decoration — it is the disambiguation. */
export const TOWN = "Newcastle, Co. Down";
export const UNDER = "under the Mournes";
export const PLACE = `${TOWN} · ${UNDER}`;

export const HOURS = "Mon–Sat 9–5 · Sun 10–4";
/** Provenance only — not guest-facing. Hours on the page carry no directory stamp. */
export const HOURS_SOURCE = `Big Red Directory (${READ_ON})`;

/** Move 3's one sentence, in the same words on all three surfaces: the hire
 *  desk board, the hire list notice and the case study's Sources & limits
 *  block. It has to be true on a board that shows no figures as well as on a
 *  sheet full of them, which is why it talks about rates rather than pages. */
export const INDICATIVE =
  "No rate here is the shop's own — call the counter for today's rate and terms.";

export interface OfferSide {
  id: string;
  /** SHELF or YARD — the pair the h1 names. */
  label: string;
  name: string;
  lines: { name: string; note: string }[];
}

/** Two offers, short. The shelf side is short because the record is short —
 *  four hire categories are named and the retail side is not itemised anywhere
 *  public. No trading-as lines: guests do not need the Facebook name twice. */
export const shelf: OfferSide = {
  id: "shelf",
  label: "On the shelf",
  name: "Hardware & DIY",
  lines: [
    { name: "Trade counter", note: "tools, fixings and DIY stock" },
    { name: "Bottled gas", note: "Calor cylinder dealer" },
  ],
};

export const yard: OfferSide = {
  id: "yard",
  label: "On the yard",
  name: "Plant & tool hire",
  lines: [
    {
      name: "Day hire",
      note: "power, garden, plant & site, access",
    },
    { name: "Collect out the back", note: `seven days · ${HOURS}` },
  ],
};

export interface HireItem {
  name: string;
  rate: string;
}

export interface HireCategory {
  id: string;
  name: string;
  /** Weekend and week terms are not in the record, so every card asks. */
  extra: string;
  items: HireItem[];
}

/** Suggested lines only — the sheet a hire counter of this shape would print,
 *  offered so the shop can correct it. Not one of these items or figures has
 *  been confirmed by the shop; `INDICATIVE` says so on the page, beside every
 *  card and above the whole sheet. Weekend multipliers were removed on
 *  5 August 2026: "1.5× day rate" read as the shop's real term. */
export const proposedHire: HireCategory[] = [
  {
    id: "power",
    name: "Power tools",
    extra: "Weekend and week rates — ask at the counter",
    items: [
      { name: "Angle grinder (115/230 mm)", rate: "~£18–25 / day" },
      { name: "SDS rotary hammer drill", rate: "~£20–30 / day" },
      { name: "Random orbital sander", rate: "~£14–18 / day" },
      { name: "Jigsaw / circular saw", rate: "~£16–22 / day" },
      { name: "Demolition hammer / breaker", rate: "~£35–55 / day" },
    ],
  },
  {
    id: "garden",
    name: "Garden machinery",
    extra: "Weekend and week rates — ask at the counter",
    items: [
      { name: "Petrol rotavator / tiller", rate: "~£45–60 / day" },
      { name: "Lawn scarifier / aerator", rate: "~£35–50 / day" },
      { name: "Petrol pressure washer", rate: "~£40–55 / day" },
      { name: "Petrol hedge trimmer", rate: "~£25–35 / day" },
      { name: "Stump grinder (mid-size)", rate: "~£80–110 / day" },
    ],
  },
  {
    id: "plant",
    name: "Plant & site",
    extra: "Weekend and week rates — ask at the counter",
    items: [
      { name: "Wacker plate compactor", rate: "~£40–55 / day" },
      { name: "Petrol generator (2–3 kVA)", rate: "~£35–50 / day" },
      { name: "Cement / mortar mixer (130–150 L)", rate: "~£30–45 / day" },
      { name: "Submersible pump", rate: "~£25–35 / day" },
      { name: "Site lighting / tripod", rate: "~£18–25 / day" },
    ],
  },
  {
    id: "access",
    name: "Access equipment",
    extra: "Weekend and week rates — ask at the counter",
    items: [
      { name: "Aluminium tower scaffold (low)", rate: "~£35–50 / day" },
      { name: "Extension ladder (3-section)", rate: "~£12–18 / day" },
      { name: "Platform step ladder", rate: "~£10–15 / day" },
      { name: "Hop-up / mini scaffold", rate: "~£14–20 / day" },
    ],
  },
];

/** The shop's own sheet, when the shop sends one.
 *
 *  Deliberately empty, and the whole of move 4 of the brief: the hire list is
 *  one engagement away from being the page the counter prints. Filling this
 *  array turns the suggested sheet off, turns the "ask at the counter" labels
 *  off, and turns the page into a rate sheet — so nothing here may be filled
 *  from a directory, a competitor or an estimate. Only from the shop, with the
 *  date it was supplied. */
export const confirmedHire: HireCategory[] = [];

export const hireIsConfirmed = confirmedHire.length > 0;
export const hire: HireCategory[] = hireIsConfirmed ? confirmedHire : proposedHire;

/** What the sheet is, in one line, switched by the gate above. */
export const hireStanding = hireIsConfirmed
  ? `Rates supplied by the counter · ${HOURS}`
  : "Call the counter for today's rates";

/** The questions the sidebar asks instead of the terms an earlier draft stated.
 *  Photo ID, a card deposit, fuel liability and damage waiver were all written
 *  as this shop's conditions on 22 July 2026; none of them is in the record.
 *  The shop runs on being asked, so the panel asks. */
export const askAtTheCounter = [
  "What to bring — the ID and deposit they want on collection",
  "Whether it is on the yard the day you need it",
  "The day rate, and what a weekend comes to",
  "Fuel, and who loads it into the car",
];

/** Customer sentences — one for the shop floor, one for the yard.
 *
 *  Primary Maps reads supplied 6 August 2026 — see
 *  research/concepts/tool-centre/voice-harvest.md. No star rating ships.
 *  Names that appear inside a quotation (Tony, Gerard) are the record gaining
 *  them from that source; they are not used elsewhere. */
export interface CustomerVoice {
  /** Verbatim. Any elision marked. Never edited for tone. */
  quote: string;
  /** Who wrote it, as they are published — no more identifying than that. */
  who: string;
  /** Where it is published, and a reasonable date — month and year, not the
   *  studio read stamp. */
  source: string;
  href?: string;
}

/** Landing page — the stocked shop. Reviewer display name is "Tony's Reviews"
 *  (a Local Guide); that is not a claim about the owner's name. */
export const shopVoice: CustomerVoice | null = {
  quote:
    "What an incredible shop, a true aladdins cave of everything you need for home DIY and more, the shop is well and truly stocked from floor to ceiling with so many things.",
  who: "Tony's Reviews",
  source: "Google review · October 2025",
};

/** Hire list — hiring their kit. "2 years ago" on Maps as of 6 August 2026. */
export const hireVoice: CustomerVoice | null = {
  quote:
    "I hire the large range of hoists from them and they always go the extra mile to ensure the best service possible.",
  who: "chris keag",
  source: "Google review · August 2024",
};
