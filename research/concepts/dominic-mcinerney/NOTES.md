# Dominic McInerney Solicitors — day-5 guest concept

Authored 26 August 2026 (Europe/London) under
`/workspace/day5/dominic-mcinerney/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push.

## Kind

Relief. Distinct from Keown Nugent (26 Railway Street — not named on the
guest page).

## One-liner

A private firm on Main Street. All cases handled personally.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/dominic-mcinerney/home.astro` |
| Styles | `src/concepts/dominic-mcinerney/styles.css` |
| Desk blotter | `src/concepts/dominic-mcinerney/DeskBlotter.astro` |
| Page wrapper | `src/pages/concepts/dominic-mcinerney.astro` |
| Copy brief | `research/concepts/dominic-mcinerney/dominic-mcinerney-copy-brief.md` |
| Elevation brief | `research/concepts/dominic-mcinerney/dominic-mcinerney-elevation-brief.md` |
| These notes | `research/concepts/dominic-mcinerney/NOTES.md` |

Read against `cbrown564-alt/local` master: newcastle-dental `home.astro` +
`styles.css` (strip / bespoke mark / nav; ConceptLayout; guest voice;
honesty in comments and banner). Railway Street day-4 guest (airy first
screen, not a packed form; signature artefact; banner discloses drawing;
caption never “not a photograph of…”). Brief: `sprint-day2-five`
`research/concepts/dominic-mcinerney/dominic-mcinerney-elevation-brief.md`
(pasted here unchanged). Live site re-read 26 August 2026.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.dm-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`.
- **Airy first screen** — quiet Main Street daylight. Dominic McInerney as
  the biggest type, 123A Main Street under it, the personal-service sentence,
  ring / write. Not a packed form (dental’s first screen is the form; this
  one is the desk on Main Street).
- **Magazine middle** — practice-area ledger as tactile cards (their
  homepage list, 26 August 2026, nothing added). 1998 strapline as
  letterhead furniture, not a research essay.
- **Signature artefact** — staged desk blotter at 123A (`DeskBlotter.astro`)
  with one-tap `tel:+442843725238` and `mailto:dmcinerney@btconnect.com`.
  Practice-area chips are labels / mailto subject hints, not a generic HTML
  form box. Caption: “The desk at 123A.”
- **Guest voice** — we / our clients / the desk. No plate questions. No
  page-about-itself.
- **Relief, not drama** — calm desk. No gavel. No fake calendar. Theatre
  is none.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters.

## Honesty

- Site live at https://www.dominicmcinerney.co.uk (re-read 26 August 2026).
  Handoff for forms / area pages. Do not deep-link `/doctor/` CMS paths.
- Phone **028 4372 5238** / `tel:+442843725238`.
- Email **dmcinerney@btconnect.com** (site). LSNI snippet
  `law@dominicmcinerney.co.uk` not printed.
- Address **123A Main Street, Newcastle, BT33 0AE**.
- Practice areas as the homepage listed them on 26 August 2026:
  Conveyancing; Employment Law; Medical Negligence; Wills and Estates;
  Family Law / Divorce/Family Matters; Debt Recovery; Litigation; Personal
  Injury; Power of Attorney. Sublines only where the homepage tiles carry
  them. No areas added.
- Logo strapline **SOLICITORS — Established 1998** treated as their mark,
  not a history essay.
- Site footer © 2013 — not printed on the guest page.
- Hours omitted (Google Mon–Fri 9–5; Google-only, not on the site).
- Facebook URL on their site is unavailable — not pretended live.
- Do not merge with Keown Nugent. Do not mention Keown. Do not mention
  Tomás McInerney. Do not invent NAFD or club-runner notes.
- Banner note discloses the blotter as a drawing. Caption does not say
  “not a photograph of…”.

## Identity

- Prefix `dm-`. Body class `concept-page concept-dominic`.
- Fonts passed as `fontHref` (Libre Baskerville + Source Sans 3).
  Not added to `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: cream blotter / Main Street ink / quiet oxblood rule / paper
  grey. Not dental periwinkle, not a gavel, not a café enamel fascia.

## Swap test

Remove Dominic McInerney, 123A, “handled personally”. If any high-street
solicitor could wear what remains, stop.

## Open on merge

- Add `dominic-mcinerney` to `conceptFonts` if the team prefers the map.
- Add `.dm-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Hours still omitted rather than dated as Google.
- LSNI email still omitted (site inbox only).
