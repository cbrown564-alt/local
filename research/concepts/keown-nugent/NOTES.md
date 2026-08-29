# Keown Nugent Solicitors — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/keown-nugent/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push.

## Kind

Relief (local solicitor’s door). Distinct from Dominic McInerney (123A
Main Street — not named on the guest page). Not Belfast Keown (Cregagh
Road).

## One-liner

Two solicitors at 26 Railway Street. Ring, or write.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/keown-nugent/home.astro` |
| Styles | `src/concepts/keown-nugent/styles.css` |
| Door blotter | `src/concepts/keown-nugent/DoorBlotter.astro` |
| Page wrapper | `src/pages/concepts/keown-nugent.astro` |
| Copy brief | `research/concepts/keown-nugent/keown-nugent-copy-brief.md` |
| Elevation brief | `research/concepts/keown-nugent/keown-nugent-elevation-brief.md` |
| These notes | `research/concepts/keown-nugent/NOTES.md` |

Read against `cbrown564-alt/local` master: newcastle-dental `home.astro` +
`styles.css` (strip / bespoke mark / nav; ConceptLayout; guest voice;
honesty in comments and banner). Dominic McInerney on master **as contrast
only** — packed chamber, AI captions, invented PROP-01 grid, “confidential
consultation” theatre. Do not clone that. Do not clone the day-5 desk
blotter (window, fountain pen, 123A brass). Layout is one-off: brass **26**
as first-screen numeral, Society name-roll, portrait door blotter, letterbox
tel/mailto. Brief pasted unchanged into
`research/concepts/keown-nugent/keown-nugent-elevation-brief.md`.
Live facts re-read 29 August 2026.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.kn-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`. Mark is a green door with brass 26.
- **Airy first screen** — limestone daylight. Giant **26** beside Keown
  Nugent, Railway Street under it, two-solicitor sentence, ring / write.
  Not a packed form (dental). Not a dusk overlay (GitHub Dominic chamber).
- **Magazine middle** — Society name-roll: Anna Marie Nugent PPP and John
  Keown PPP as the two names on this door. LSNI areas of expertise are
  empty — **no invented practice-area grid**.
- **Staged ritual** — letterbox flaps with one-tap `tel:+442843330055` and
  `mailto:info@knsolicitors.com`. Not a generic HTML form. Not “book a
  consult”.
- **Signature artefact** — portrait door blotter at 26 (`DoorBlotter.astro`):
  Brunswick panels, brass 26, Keown Nugent nameplate, Law Society listing
  in the fanlight (LSNI names + 26 Railway Street, Newcastle, BT33 0AL).
  Caption: “The door at 26 Railway Street.”
- **Guest voice** — we / this door / ring or write. No plate questions. No
  page-about-itself.
- **Relief, not drama** — a street door. No gavel. No fake calendar.
  Theatre is none.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters.

**Flagship score: 7/7** on the taste list (strip+mark+nav; airy first
screen; editorial; staged tel/mailto ritual; one artefact; guest voice;
drawing honesty in `bannerNote` only).

## Honesty

- Law Society NI firm page live 29 August 2026:
  https://lawsoc-ni.org/using-a-solicitor/finding-a-solicitor/keown-nugent-solicitors-ltd
  — Keown Nugent Solicitors Ltd; ANNA MARIE NUGENT PPP; JOHN KEOWN PPP;
  26 Railway Street, Newcastle, BT33 0AL; 028 4333 0055;
  info@knsolicitors.com. Areas of expertise empty. Unchanged from harvest.
- **No working website.** `https://knsolicitors.com` 29 Aug 2026: TLS
  unexpected eof (`error:0A000126`). `www` same. `http` timed out. 23 Aug
  harvest: failed TLS/timeout. Do not pretend the domain is a live
  shopfront. Do not deep-link it. Do not snark on the guest page.
- Phone **028 4333 0055** / `tel:+442843330055`.
- Email **info@knsolicitors.com** — LSNI still prints it; that is the write
  action even though the domain does not open as a site.
- Address **26 Railway Street, Newcastle, BT33 0AL**. Not Newry.
- Hours omitted (Google still said Mon–Fri 9–5 at harvest). Live GBP not
  re-readable 29 Aug 2026 (search returned junk directories with conflicting
  clocks). Omit rather than date a clock on the door.
- Companies House NI657258, incorporated 20 November 2018, registered
  office 26 Railway Street, Newcastle, BT33 0AL, SIC 69102, active. Officers:
  John Keown; **Anna Mallett**. Do **not** print “Anna Nugent is Anna
  Mallett”. Guest page uses the LSNI names only. CH number stays off the
  guest UI.
- Belfast Keown Solicitors (Lynden House, 19 Cregagh Road, BT6 8PX;
  FRANCES CATHERINA KEOWN PPP / MARGARET SUSAN KEOWN PPP;
  keownsolicitors.co.uk) — a different firm. Stay off this page.
- Dominic McInerney (123A Main Street) stays off this page.
- Banner note discloses the door blotter as a drawing. Caption does not say
  “not a photograph of…”.

## Identity

- Prefix `kn-`. Body class `concept-page concept-keown-nugent`.
- Fonts passed as `fontHref` (EB Garamond + Public Sans). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: limestone / Brunswick door / brass 26 / Society-card paper.
  Not Dominic cream blotter and oxblood. Not Railway Street Café
  green/gold. Not dental periwinkle. Not Belfast Keown site navy.

## Swap test

Remove Keown Nugent, 26 Railway Street, LSNI names. If any high-street
firm could wear what remains, stop.

## Open on merge

- Add `keown-nugent` to `conceptFonts` if the team prefers the map.
- Add `.kn-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Hours still omitted rather than dated as Google.
- Do not link knsolicitors.com until it opens.
- Do not print Mallett. Do not merge with Cregagh Road.
