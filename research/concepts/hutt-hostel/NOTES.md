# The Hutt Hostel — day-5 guest concept

Authored 26 August 2026 (Europe/London) under
`/workspace/day5/hutt-hostel/`, mirroring repo paths. No clone.
No CloudAgent. No push. Do not publish these notes.

## Kind

Stay.

## One-liner

Wake up beside the sea. 30 Downs Road. Reception from five.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/hutt-hostel/home.astro` |
| Styles | `src/concepts/hutt-hostel/styles.css` |
| Padd plate | `src/concepts/hutt-hostel/PaddPlate.astro` |
| Page wrapper | `src/pages/concepts/hutt-hostel.astro` |
| Copy brief | `research/concepts/hutt-hostel/hutt-hostel-copy-brief.md` |
| Elevation brief | `research/concepts/hutt-hostel/hutt-hostel-elevation-brief.md` |
| These notes | `research/concepts/hutt-hostel/NOTES.md` (workspace only — do not publish) |

Read against `local` master: newcastle-dental `home.astro` + `styles.css`
(strip / bespoke mark / nav; ConceptLayout; guest voice; honesty in comments
and banner). Railway Street NOTES shape. Stay class: Conlyn / Arley — morning
light, not a packed dusk overlay. Brief:
`research/concepts/hutt-hostel/hutt-hostel-elevation-brief.md`.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.hh-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`. Mark is 30 on navy with a brick corner.
- **Airy first screen** — morning sea-light masthead. THE HUTT as the
  biggest type, 30 Downs Road under it, Wake beside the sea. Reception
  from five / tel sit in the header and under the name — not a packed
  form and not identity + booking crammed into one bottom utility box.
- **Magazine middle** — hostel register: 72 beds including The Padd as
  a tactile apartment card (kitchen / shower room / toilet / lounge), a
  quiet ledger of who they already host (educational, sports, religious,
  backpackers), and the About line as a pull. Not two plain paragraphs.
- **Ritual staging** — reception ledger / blotter. Chips for tonight /
  a group / The Padd. Primary actions: `tel:+442843722133`,
  `mailto:info@hutthostel.com`, and `http://hutthostel.com`. No fake
  calendar. No invented availability. No generic HTML form.
- **Signature artefact** — `PaddPlate.astro`: The Padd / 30 Downs Road /
  Donard next door. Could not move to another hostel. Caption names the
  Padd, not the generation method.
- **Guest voice** — we / wake / our site. No plate questions. No
  page-about-itself. No "independently reviewed".

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No raster under `/media`.

## Honesty

- Booking / site **http://hutthostel.com**. HTTPS failed 23 Aug 2026
  (`ERR_CONNECTION_CLOSED`). Do not deep-link https as if it works.
- Phone **028 4372 2133** / `tel:+442843722133`.
- Email **info@hutthostel.com`.
- Address **30 Downs Road, Newcastle, BT33 0AG**. Corner of Donard Place.
  Just beside the Slieve Donard Hotel and Percy French Bar.
- Reception hours first-party: **Mon–Sun 5.00pm–9.00pm**. Google
  check-in from 5, out by 12 — checkout omitted rather than dated as
  Google on the door.
- 72 beds including The Padd — verbatim from About, live 26 Aug 2026.
- Owner unnamed. Steph is manager from an FB snippet — omitted rather
  than labelled.
- No rates. No room names beyond The Padd. No booking engine of our own.
- Banner note discloses the Padd plate as a drawing / concept
  visualisation. Caption does not say “not a photograph of…”.

## Identity

- Prefix `hh-`. Body class `concept-page concept-hutt`.
- Fonts passed as `fontHref` (Literata + Outfit). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: morning sea-light / salt white / Downs Road brick / hostel
  navy. Not dental blue, not Conlyn purple-dusk, not a packed overlay.
  Layout is a morning masthead + hostel register + reception blotter,
  not a Railway timetable clone.

## Swap test

30 Downs Road, The Padd, Donard and Percy French, 72 beds. Remove those
and any hostel could wear it.

## Open on merge

- Add `hutt-hostel` to `conceptFonts` if the team prefers the map.
- Add `.hh-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not deep-link `https://hutthostel.com` until the certificate
  answers.
- Logged-in Facebook / Instagram bodies still unread.
- Steph still omitted unless labelled as manager from Facebook.
- Whether to print Google checkout (out by 12) with a date — still
  omitted; prefer their 5–9 reception line.
