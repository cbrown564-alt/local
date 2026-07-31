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

/** Three-layer safety net, in the practice's own published words. Each layer
 *  carries the vignette drawn for it and the tag on the connector that
 *  brings the call to it — the flow is the mechanism the section draws. */
export const safetyNetLayers = [
  {
    step: "1",
    vignette: "clinic",
    incoming: "During clinic hours",
    title: "Call the clinic",
    copy: "Ring 028 4372 9414 — the number on every page and on the practice's own site.",
    detail: "During clinic hours you reach the team at 8 Railway Street.",
  },
  {
    step: "2",
    vignette: "oncall",
    incoming: "Outside clinic hours",
    title: "Diverted to the on-call vet",
    copy: "Outside clinic hours, the practice's own policy is that you are diverted to the on-call vet.",
    detail: "No out-of-hours shifts for staff — the chain is structural.",
  },
  {
    step: "3",
    vignette: "vidivet",
    incoming: "Free for clients · 24/7",
    title: "VidiVet, free for clients",
    copy: "VidiVet is the practice's trusted partner for out-of-hours support — 24/7 access to expert digital vet advice, free for clinic clients.",
    detail: "Response within minutes, as VidiVet themselves publish.",
    href: vidivetUrl,
  },
] as const;

/** A pet's whole life — structured around services the practice actually
 *  publishes. `cast` places a drawn cast member at that stage on the arc;
 *  the last stage is quiet by design: it honours their bereavement page, so
 *  the card changes register and their own words lead. */
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
    copy: "Structured support when diet and exercise need attention — one of the services Donard Veterinary lists for pets of every age.",
    service: "Weight Clinic",
  },
  {
    marker: "Dental",
    cast: "cat",
    title: "Dental clinic",
    copy: "Dental treatment as a named service — part of the care a pet needs through its life.",
    service: "Dental",
  },
  {
    marker: "Emergency",
    title: "Emergency",
    copy: "When something cannot wait — call 028 4372 9414, with diversion to the on-call vet and VidiVet beyond clinic hours.",
    service: "Emergency",
  },
  {
    marker: "Goodbye",
    tone: "quiet",
    title: "When the time comes",
    copy: "The practice publishes a bereavement page with care for the hardest step. Their own words lead.",
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
    copy: "Donard Veterinary Clinic opened in 2017 — independently owned, 100% small-animal, on Railway Street in Newcastle.",
  },
  {
    marker: "July 2026",
    title: "Growing the team",
    copy: "Nine years in and still independent — the practice was actively recruiting experienced small-animal vets in July 2026.",
    href: recruitmentUrl,
  },
  {
    marker: "Soon",
    title: "Donard Vet Club",
    copy: "Donard Vet Club is coming soon — named as the practice has named it on its own channels.",
  },
] as const;
