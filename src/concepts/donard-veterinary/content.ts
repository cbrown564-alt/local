/** Shared, sourced copy for the Donard Veterinary concept.
 *
 *  Quotes, services, catchment villages and dates come from the practice's own
 *  public pages and the July 2026 recruitment listing (read 31 July 2026 — see
 *  research/concepts/donard-veterinary/donard-veterinary-elevation-brief.md).
 *  Nothing here is invented for atmosphere. */

export const clinicPhone = "028 4372 9414";
export const clinicPhoneHref = "tel:+442843729414";
export const clinicEmail = "info@donardveterinaryclinic.co.uk";
export const vidivetUrl = "https://donardveterinaryclinic.co.uk/vidivet/";
export const bereavementUrl =
  "https://donardveterinaryclinic.co.uk/when-the-time-comes-to-say-goodbye/";
export const recruitmentUrl =
  "https://vetni.co.uk/2026/07/08/pt-ft-experienced-sa-vet-donard-vet-clinic-newcastle/";

/** The practice's own bereavement-page sentence — the best line they publish
 *  about themselves. Quoted verbatim; source named on the page. */
export const bereavementQuote = {
  text: "As pet owners ourselves we fully understand",
  context: "When the time comes to say goodbye",
  source: bereavementUrl,
} as const;

/** Call routing: one number, two conditional routes. VidiVet is companion
 *  cover for clients, not a third step in the call path. */
export const safetyRoutes = [
  {
    id: "clinic",
    vignette: "clinic" as const,
    when: "During clinic hours",
    title: "You reach the clinic",
    copy: "Ring 028 4372 9414 and you speak to the team at 8 Railway Street.",
    detail: "Mon–Fri 8:30–6:30 · Wednesday until 7 · Saturday 9–1.",
  },
  {
    id: "oncall",
    vignette: "oncall" as const,
    when: "Outside clinic hours",
    title: "Diverted to the on-call vet",
    copy: "Outside clinic hours, you are diverted to the on-call vet — the same number, day or night.",
    detail: "No need to find a different line.",
  },
] as const;

export const vidivetCover = {
  title: "VidiVet, free for our clients",
  copy: "Alongside the phone, our clients have free 24/7 access to expert digital vet advice through VidiVet.",
  detail: "Response within minutes.",
  badge: "Free for clients · 24/7",
  href: vidivetUrl,
} as const;

/** A pet's whole life — structured around services the practice actually
 *  publishes. `cast` places a drawn cast member at that stage on the arc;
 *  the last stage is quiet by design: it honours their bereavement page. */
export const lifeStages = [
  {
    marker: "Routine",
    cast: "dog",
    title: "Routine health care",
    copy: "Vaccinations, health checks and the everyday care that keeps a pet well — the first jabs and the annual visits.",
    service: "Routine Health Care",
  },
  {
    marker: "Weight",
    cast: "rabbit",
    title: "Weight clinic",
    copy: "Structured support when diet and exercise need attention — for pets of every age.",
    service: "Weight Clinic",
  },
  {
    marker: "Dental",
    cast: "cat",
    title: "Dental clinic",
    copy: "Dental checks and treatment as part of lifelong care — not an afterthought.",
    service: "Dental",
  },
  {
    marker: "Emergency",
    title: "Emergency",
    copy: "When something cannot wait — call 028 4372 9414. Outside hours you are diverted to the on-call vet, with VidiVet alongside.",
    service: "Emergency",
  },
  {
    marker: "Goodbye",
    tone: "quiet",
    title: "When the time comes",
    copy: "We understand how hard this day is. Support is here when you need it.",
    service: "Bereavement support",
    href: bereavementUrl,
  },
] as const;

/** Catchment villages named by the practice itself. Newcastle is the clinic
 *  town and is drawn separately as the clinic vignette. Positions, label
 *  placements and anchors are indicative drawing data for the map plate —
 *  relative geography, not a survey. */
export const catchmentPlaces = [
  { id: "dundrum", label: "Dundrum", x: 568, y: 60, lx: 545, ly: 48, anchor: "start" },
  { id: "clough", label: "Clough", x: 452, y: 150, lx: 432, ly: 140, anchor: "start" },
  { id: "castlewellan", label: "Castlewellan", x: 262, y: 92, lx: 236, ly: 80, anchor: "start" },
  { id: "bryansford", label: "Bryansford", x: 410, y: 225, lx: 378, ly: 255, anchor: "end", halo: { x: 294, y: 242, width: 88, height: 18 } },
  { id: "kilcoo", label: "Kilcoo", x: 295, y: 330, lx: 277, ly: 316, anchor: "start" },
  { id: "hilltown", label: "Hilltown", x: 144, y: 356, lx: 122, ly: 349, anchor: "start" },
  { id: "annalong", label: "Annalong", x: 524, y: 414, lx: 538, ly: 428, anchor: "start" },
] as const;

/** Independence arc — dates only where documented: 2017 is on record, the
 *  July 2026 recruitment listing is on record, the Vet Club tease is theirs.
 *  Nothing in between is asserted. */
export const independenceTimeline = [
  {
    marker: "2017",
    title: "Opened by Catherine Savage",
    copy: "We opened in 2017 — independently owned, 100% small-animal, on Railway Street in Newcastle.",
  },
  {
    marker: "July 2026",
    title: "Growing the team",
    copy: "Nine years in and still independent — we're recruiting experienced small-animal vets.",
    href: recruitmentUrl,
  },
  {
    marker: "Soon",
    title: "Donard Vet Club",
    copy: "Donard Vet Club is coming soon.",
  },
] as const;
