# Railway Street Café & Brew Bar — day-4 guest concept

Authored 25 August 2026 (Europe/London) under
`/workspace/day4/railway-street/`, mirroring repo paths. No clone.
No CloudAgent. No push.

## Kind

Meal (jar on the side: the roast).

## One-liner

Speciality coffee on Railway Street. No bad days.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/railway-street/home.astro` |
| Styles | `src/concepts/railway-street/styles.css` |
| Street plate | `src/concepts/railway-street/StreetPlate.astro` |
| Page wrapper | `src/pages/concepts/railway-street.astro` |
| Copy brief | `research/concepts/railway-street/railway-street-copy-brief.md` |
| Elevation brief | `research/concepts/railway-street/railway-street-elevation-brief.md` |
| These notes | `NOTES.md` (workspace only) |

Read against `local` master: newcastle-dental `home.astro` + `styles.css`
(strip / bespoke mark / nav; ConceptLayout; guest voice; honesty in comments
and banner). Scopers `home.astro` (editorial meal texture, Facebook for what
moves, no fake board). Brief: `sprint-day2-five`
`research/concepts/railway-street/railway-street-elevation-brief.md`.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.rs-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`.
- **Airy first screen** — railway-paper masthead. RAILWAY ST. as the biggest
  type, 2 Railway Street under it, Walk in / tel. Not a packed form (dental's
  first screen is the form; this one is the door).
- **Magazine middle** — Saturday spread: their tiramisu iced-latte line and
  #nobaddays, with today's cup handed to Facebook / Instagram.
- **Signature artefact** — street fascia / cup rail (`StreetPlate.astro`)
  with Walk in + `tel:+442843725620` (printed 028 4372 5620). Caption names
  the fascia, not the generation method.
- **Guest voice** — we / walk in / our Saturday. No plate questions. No
  page-about-itself.
- **Jar on the side** — Groupwork for the bag only. Not a cloned Shopify
  and not a subscription landing.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one.

## Honesty

- No standalone café site. Handoff: FB/IG `railwaystcoffee` for today;
  `groupworkcoffee.com` for the bag.
- Phone **028 4372 5620** / `tel:+442843725620`. Not 3010.
- Email **railwaystcoffee@gmail.com`.
- Postcode omitted (0AJ vs 0AL unresolved).
- Hours omitted (Google 8:30–4:30 daily as of the 23 Aug 2026 brief).
  If a later pass prints them, date as Google.
- Kitchen-stop ~3pm not printed (AI Overview).
- Barker names omitted. Groupwork.com (fetched 25 Aug 2026) names Stephen
  and Hannah Barker on the roast About; the café has no first-party About,
  so names stay off guest chrome rather than being lifted onto the room.
- FB/IG unread beyond public preview / bio.
- Visit Mourne not checked.
- Banner note discloses the street plate as a drawing. Caption does not
  say “not a photograph of…”.

## Identity

- Prefix `rs-`. Body class `concept-page concept-railway`.
- Fonts passed as `fontHref` (Big Shoulders Display + Source Serif 4).
  Not added to `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: railway paper / enamel platform green / espresso / crema.
  Not dental blue, not scopers chalk, not Shimna linen-avocado, not Smalls
  oxblood. Layout is a timetable masthead + broadsheet Saturday, not a
  Shimna corner clone.

## Swap test

Railway Street, Groupwork, the Saturday tiramisu latte line. Remove those
and any speciality room could wear it.

## Open on merge

- Add `railway-street` to `conceptFonts` if the team prefers the map.
- Add `.rs-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Logged-in Facebook / Instagram bodies still unread.
- Postcode still unresolved; still omitted.
- Whether to print Google hours with a date — still omitted.
