# Terry King & Sons — day-5 guest concept

Authored 26 August 2026 (Europe/London) under
`/workspace/day5/terry-king/`, mirroring repo paths. No clone.
No CloudAgent. No push.

## Kind

Ride (the van / the bay, not a shop window). Ireland's Appliance class.

## One-liner

The bay on Dundrum Road. Ring — that is how a job starts.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/terry-king/home.astro` |
| Styles | `src/concepts/terry-king/styles.css` |
| Bay plate | `src/concepts/terry-king/BayPlate.astro` |
| Page wrapper | `src/pages/concepts/terry-king.astro` |
| Copy brief | `research/concepts/terry-king/terry-king-copy-brief.md` |
| Elevation brief | `research/concepts/terry-king/terry-king-elevation-brief.md` |
| These notes | `research/concepts/terry-king/NOTES.md` |

Read against `cbrown564-alt/local` master: newcastle-dental `home.astro` + `styles.css`
(strip / bespoke mark / nav; ConceptLayout; guest voice; honesty in comments
and banner). Railway Street day-4 shape for copy brief + notes. Brief:
`sprint-day2-five` `research/concepts/terry-king/terry-king-elevation-brief.md`
(pasted here unchanged).

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.tk-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`.
- **Airy first screen** — daylight bay masthead (amber wash, faint MOT box),
  not a dusk overlay, not a form box. TERRY KING & SONS as the biggest type,
  84 Dundrum Road under it, Ring / tel. Dental's first screen is the form;
  Ireland's is harbour-dark. This one is the open bay in daylight.
- **Magazine middle** — garage register: MOT / car / van / diagnostics as
  MOT-bay cards, Facebook for whatever they last posted.
- **Staged action** — JOB CARD / BAY DOCKET with chips (MOT, car, van,
  diagnostics) that toggle for the call and do not submit. Primary mechanism
  is RING (`tel:+442843723644`). No booking widget.
- **Signature artefact** — `BayPlate.astro`: 84 Dundrum Road fascia, open
  MOT bay, van on the lift, amber lights, painted MOT box. Could not wear
  another garage's name. Caption names the bay, not the generation method.
- **Guest voice** — we / the bay / ring. No plate questions. No
  page-about-itself.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters.

## Honesty

- Trading name **Terry King & Sons** (not Google's "King Terry & Sons").
- Phone **028 4372 3644** / `tel:+442843723644`. Directory fax 028 4372 2029
  omitted.
- Email Office@terrykingandsons.co.uk omitted (directory-only).
- No working website. terrykingandsons.co.uk was HTTP 500 / ARR error
  23 Aug 2026 — research only; not deep-linked; not snarked on the guest page.
- Facebook is `facebook.com` plus the search string
  "Terry King & Sons | Newcastle". No confirmed page URL. Wall dated
  19 Aug 2025 in harvest — not claimed as a 2026 post.
- FB intro quoted verbatim, spelling kept ("buy fully trained technicians").
- Hours omitted (Google Mon–Fri 9–5:30, weekend closed). If a later pass
  prints them, date as Google.
- Owner unnamed. Gavin Mulholland off. Callum off. Dissolved Ltd /
  Companies House / Sunningdale Drive off.
- Spectrum Splashbacks (same yard) not mentioned.
- Dundrum Road Industrial Estate not used as a first-party name.
- Sales: one honest line from FB ("We service and sell") — no used-car grid.
- Banner note discloses the bay plate as a drawing. Caption does not
  say "not a photograph of…".

## Identity

- Prefix `tk-`. Body class `concept-page concept-terry`.
- Fonts passed as `fontHref` (IBM Plex Sans + IBM Plex Mono).
  Not added to `ConceptLayout` `conceptFonts` map — no shell edit.
  Same pairing as Ireland's; palette and layout are not: workshop grey,
  amber bay light, Dundrum tarmac, safety yellow. Not harbour navy, not
  Tool Centre Chivo / hivis.

## Swap test

Terry King, Dundrum Road, the FB service sentence. Remove those and any
garage could wear it.

## Open on merge

- Add `terry-king` to `conceptFonts` if the team prefers the map.
- Add `.tk-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Logged-in Facebook body still unread beyond the public intro.
- Whether to print Google hours with a date — still omitted.
- Directory email still omitted.
