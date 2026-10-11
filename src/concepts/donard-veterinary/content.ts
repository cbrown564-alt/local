/** Shared, sourced copy for the Donard Veterinary page.
 *
 *  Contact details, hours, services, catchment villages and the out-of-hours
 *  wording come from the practice's own pages (re-read 11 October 2026:
 *  home, emergency-treatment, opening-consultation-hours, contact-us, faqs,
 *  pet-passport, repeat-prescription, vidivet) and the July 2026 recruitment
 *  listing (in-house lab, digital x-ray, videoscope). See
 *  research/concepts/donard-veterinary/donard-veterinary-elevation-brief.md.
 *  Nothing here is invented for atmosphere. */
export type GlyphName =
  | "call"
  | "book"
  | "prescription"
  | "advice"
  | "routine"
  | "diagnostics"
  | "surgery"
  | "dental"
  | "weight"
  | "passport";

export const clinicPhone = "028 4372 9414";
export const clinicPhoneHref = "tel:+442843729414";
export const clinicEmail = "info@donardveterinaryclinic.co.uk";
export const vidivetUrl = "https://donardveterinaryclinic.co.uk/vidivet/";
export const bereavementUrl =
  "https://donardveterinaryclinic.co.uk/when-the-time-comes-to-say-goodbye/";
export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Donard+Veterinary+Clinic+8+Railway+Street+Newcastle+BT33+0AL";

/** The practice's own sentence, quoted verbatim from its goodbye page. */
export const bereavementQuote = {
  text: "As pet owners ourselves we fully understand",
  source: bereavementUrl,
} as const;

/** Published opening hours. No Sunday line is published, so none is shown. */
export const openingHours = [
  { days: "Monday, Tuesday", hours: "8:30am – 6:30pm" },
  { days: "Wednesday", hours: "8:30am – 7:00pm" },
  { days: "Thursday, Friday", hours: "8:30am – 6:30pm" },
  { days: "Saturday", hours: "9:00am – 1:00pm" },
] as const;

/** Villages the practice names on its emergency page. */
export const catchmentVillages = [
  "Castlewellan",
  "Dundrum",
  "Bryansford",
  "Clough",
  "Annalong",
  "Kilcoo",
  "Hilltown",
] as const;

/** The published service list. `reason` matches a value in the booking
 *  form's "What's it for?" choices so "Book for this" can preselect it. */
export const services: ReadonlyArray<{
  glyph: GlyphName;
  title: string;
  copy: string;
  reason: string;
}> = [
  {
    glyph: "routine",
    title: "Routine health care",
    copy: "Vaccinations, health checks, worm and flea treatment: the everyday care that keeps them well.",
    reason: "Check-up or vaccination",
  },
  {
    glyph: "diagnostics",
    title: "Diagnostics",
    copy: "Our own in-house lab, digital x-ray and videoscope, so answers come quickly.",
    reason: "Unwell or injured",
  },
  {
    glyph: "surgery",
    title: "Surgery and hospitalisation",
    copy: "Routine operations every day, under gaseous anaesthesia with your pet closely monitored throughout.",
    reason: "Surgery",
  },
  {
    glyph: "dental",
    title: "Dental clinic",
    copy: "Checks and treatment for teeth and gums, as part of lifelong care.",
    reason: "Dental",
  },
  {
    glyph: "weight",
    title: "Weight clinic",
    copy: "Support and a plan when diet and exercise need attention.",
    reason: "Weight clinic",
  },
  {
    glyph: "passport",
    title: "Pet passports",
    copy: "Paperwork and treatments for travelling abroad. Please allow plenty of time before you go.",
    reason: "Pet passport",
  },
];

export const bookingReasons = [
  "Check-up or vaccination",
  "Unwell or injured",
  "Dental",
  "Weight clinic",
  "Surgery",
  "Pet passport",
  "Something else",
] as const;
