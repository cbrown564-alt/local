# Stephen Morgan Funeral Directors — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/stephen-morgan/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push. No merge. No publish.

## Kind

Relief. A family that needs a door tonight. Distinct from Dominic McInerney
Solicitors (123A Main Street — cream blotter, daylight desk, practice-area
cards). This is **14 Main Street**, funerals, any hour.

## One-liner

14 Main Street. A dignified, professional and caring service. Any hour.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/stephen-morgan/home.astro` |
| Styles | `src/concepts/stephen-morgan/styles.css` |
| Night door plate | `src/concepts/stephen-morgan/NightDoorPlate.astro` |
| Page wrapper | `src/pages/concepts/stephen-morgan.astro` |
| Copy brief | `research/concepts/stephen-morgan/stephen-morgan-copy-brief.md` |
| Elevation brief | `research/concepts/stephen-morgan/stephen-morgan-elevation-brief.md` |
| These notes | `research/concepts/stephen-morgan/NOTES.md` |

Read against `cbrown564-alt/local` **master**: Dominic McInerney
`home.astro` + `styles.css` + `DeskBlotter.astro` for quiet professional
chrome (strip / bespoke mark / nav; ConceptLayout; guest voice; honesty
in comments and banner). Layout is one-off — night door, funeral
register, no 123A ledger cards, no daylight blotter. Brief:
`stephen-morgan-elevation-brief.md` (pasted here unchanged). Live facts
re-read 29 August 2026: Funeral Times listing + Google.

## Flagship hits

- **Strip + mark + nav** — Dominic chrome, `sm-` identity. Mark is a
  brass **14** on a dark door, not 123A on cream.
- **Airy first screen** — quiet lamp paper. Stephen Morgan as the
  biggest type; 14 Main Street under it; the dignified-service sentence;
  ring / write. Not a packed form. Not a café. Not a cinematic hearse.
- **Editorial texture** — a funeral director’s register (ruled folio,
  their Funeral Times list as lines). Not a solicitor practice-area grid.
- **Signature artefact** — staged night door plate at 14
  (`NightDoorPlate.astro`) with one-tap `tel:+442843758323` and
  `mailto:smorganfunerals@gmail.com`. Caption: “The door at 14 Main Street.”
- **Guest voice** — we / the door / 14. No plate questions. No
  page-about-itself. No condolence theatre.
- **Relief, not drama** — a door that is attended. No stock hearse. No
  named deceased. Theatre is none.

EssenceMedia omitted — no `essence-media.ts` entry for this slug. No
rasters.

**Flagship score: 7 / 7** (strip+mark+nav; airy first screen; register
texture; door ritual with tel/mailto; one artefact; guest voice;
drawing honesty in `bannerNote` only).

## Honesty — live facts 29 August 2026

- **No owned website.** Funeral Times listing is the public copy home.
  Facebook page exists (`facebook.com/SMorganFuneralDirectors/`) — not
  the action; not printed on the guest page.
- Phone **028 4375 8323** / `tel:+442843758323`. Funeral Times displays
  the same digits as `028 437 58323`. Guest page uses the Newcastle
  grouping **028 4375 8323** (matches the elevation tests and
  `businesses.json`).
- Email **smorganfunerals@gmail.com** (Funeral Times, 29 Aug 2026).
- Address **14 Main Street, Newcastle, BT33 0AD**.
- Funeral Times copy (quote only these sentences on the guest page):
  “a dignified, professional and caring service”; “We offer a 24 hour
  personal service, guiding families through the practical and legal
  requirements of a funeral.”; “We offer pre arranged funerals, coffin
  ranges, floral tributes, order of service, newspaper notices, modern
  fleet of vehicles and highly qualified staff.”
- Google: **Open 24 hours.** GBP widget not readable from this
  environment (JS/CAPTCHA). Corroborated by Chamber of Commerce UK
  (24 Hours every day at 14 Main St) and the Funeral Times 24 hour
  line. **Do not invent chapel hours.** Print Open 24 hours / 24 hour
  personal service only.
- Handoff: [Funeral Times](https://www.funeraltimes.com/stephen-morgan-funeral-directors)
  for current notices. Do not publish a recent-funeral list. The FT
  table of named deceased (re-read 29 Aug 2026) stays off this page.
- Action: phone and email. No contact-form theatre.
- Do not claim NAFD/SAIF. localfuneral.co.uk shows an empty “trade body”
  boilerplate — not a membership.
- Do not confuse with McKeague Morgan (Belfast accountants; a Stephen
  Morgan is a partner there) or Stephen Magee Electrical.
- Do not invent “established”.
- Banner note discloses the door plate as a drawing. Caption does not
  say “not a photograph of…”.

## Live-fact changes (vs 23 Aug brief / 5 Aug pipeline)

- **Email now on the guest page.** `businesses.json` (verified 5 Aug
  2026) had `email: ""`. Funeral Times 29 Aug 2026 prints
  `smorganfunerals@gmail.com` — used.
- **Phone grouping.** Tests keep `028 4375 8323`. FT still shows
  `028 437 58323` (same number). localfuneral.co.uk call-through
  **028 9124 4295** is a directory error — not printed.
- **No owned website** reconfirmed (Funeral Guide: not a member; no
  first-party URL; pipeline `websiteStatus: "No website found"`).
- **Open 24 hours** treated as Google’s hours label, not a chapel
  timetable. Brief already had “Any hour.”
- Funeral Times still holds named listings — still unpublished here.
- Facebook still exists — still not the mechanism.

## Identity

- Prefix `sm-`. Body class `concept-page concept-stephen-morgan`.
- Fonts passed as `fontHref` (Spectral + Public Sans). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit. Distinct from
  Dominic’s Libre Baskerville + Source Sans 3.
- Palette: night door / lamp paper / quiet brass / register ink. Not
  Dominic oxblood, not dental periwinkle, not a café enamel fascia.

## Swap test

Remove Stephen Morgan, 14 Main Street, the 24-hour line. If any funeral
firm could wear what remains, stop.

## Open on merge

- Add `stephen-morgan` to `conceptFonts` if the team prefers the map.
- Add `.sm-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not add a recent-funeral list. Do not add a contact form.
- Do not print NAFD/SAIF or the localfuneral 028 9124 4295 number.
- Chapel hours still uninvented.
