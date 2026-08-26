# Stile Glass — day-5 guest concept

Authored 26 August 2026 (Europe/London) under
`/workspace/day5/stile-glass/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push.

## Kind

None of the five / trade workshop. Ireland's class: quote, survey,
install — not a café.

## One-liner

Bespoke glass from Newcastle. Every project surveyed and quoted at
63 Castlewellan Road.

## Artefact

Survey clipboard for the workshop at 63 (`SurveyClip.astro`). Drawn.
Caption: “The survey clip for 63.” Banner note discloses the drawing.
Not “not a photograph of…”. The clip names 63 Castlewellan Road,
Newcastle, BT33 0JX — it could not move to a Belfast glazier.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/stile-glass/home.astro` |
| Styles | `src/concepts/stile-glass/styles.css` |
| Survey clip | `src/concepts/stile-glass/SurveyClip.astro` |
| Page wrapper | `src/pages/concepts/stile-glass.astro` |
| Copy brief | `research/concepts/stile-glass/stile-glass-copy-brief.md` |
| Elevation brief | `research/concepts/stile-glass/stile-glass-elevation-brief.md` |
| These notes | `research/concepts/stile-glass/NOTES.md` |

Read against `cbrown564-alt/local` master: newcastle-dental `home.astro` +
`styles.css` (strip / bespoke mark / nav; ConceptLayout; guest voice;
honesty in comments and banner). Railway Street `home.astro` (airy first
screen, magazine middle, staged artefact, no packed form). Brief:
`research/concepts/stile-glass/stile-glass-elevation-brief.md` (23 August
2026, pasted unchanged). Live facts re-read 26 August 2026 from
stileglass.com home + news 31 July 2026.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.sg-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Channel mark is drawn,
  not a lifted logo.
- **Airy first screen** — workshop daylight / glass edge. STILE GLASS as
  the biggest type, 63 Castlewellan Road under it, site visit / tel.
  Not a packed dusk form (dental's first screen is the form; this one
  is the workshop door).
- **Magazine middle** — systems as tactile cards (frameless / spigots,
  channel, Juliet, windbreakers), the 10-year line as a pull-quote,
  news handoff to stileglass.com. Not a second catalogue.
- **Ritual** — staged survey clipboard with chips (site visit / quote /
  showroom) and one-tap `tel:+442843723260` + `mailto:sales@stileglass.com`.
  Their mechanism already exists. No fake configurator.
- **Signature artefact** — `SurveyClip.astro` of 63 Castlewellan Road.
  Caption names the clip, not the generation method.
- **Guest voice** — we / survey / our team. No plate questions. No
  page-about-itself.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters.

## Honesty

- Quote, survey, install. Not a café. Not a product grid clone.
- Phone **028 4372 3260** / `tel:+442843723260`.
- Primary inbox **sales@stileglass.com**. **info@stileglass.com** also
  on the site; printed on the address, not as the primary action.
- **63 Castlewellan Road, Newcastle, BT33 0JX.** Distinct from Unit 2,
  63a — neighbour unnamed on this guest chrome.
- Hours printed as theirs from the site harvest: Mon–Fri 9–5; Sat 10–12;
  Sun closed (26 August 2026).
- **£370/m omitted.** Live OG still says From £370/m; news 31 July 2026
  does not print it — pricing varies, get a quote. Guest page points to
  a free site visit instead.
- “Over 10 years” / “10 Years of Quality” — not a founding year. **2016
  not invented.**
- Owner unnamed. Stephen O'Higgins is the byline on the 31 July 2026
  news post only — name omitted on the guest page.
- Service area is NI + east/midlands Ireland (news also Antrim, Down,
  Belfast, Newry and throughout NI). Not shrunk to the promenade.
- Building regs quoted: toughened laminated safety glass, BS 6180:2011
  and Technical Booklet H — as they print. Not a claim we originated.
- 40 vs 41 Google reviews unresolved in the 23 August brief — omitted
  rather than inflated.
- FB/IG not opened (brief). Socials omitted.
- Banner note discloses the survey clip as a drawing. Caption does not
  say “not a photograph of…”.

## Identity

- Prefix `sg`. Body class `concept-page concept-stile`.
- Fonts passed as `fontHref` (Syne + IBM Plex Sans). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: cool glass / aluminium channel silver / Newcastle workshop
  charcoal / a thin coastal green. Not café linen, not packed overlay,
  not a neighbour's flooring showroom.

## Swap test

Stile Glass, Newcastle, 63 Castlewellan Road. Remove those and any
glass firm could wear it.

## Open on merge

- Add `stile-glass` to `conceptFonts` if the team prefers the map.
- Add `.sg-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not print £370/m while the live news asks for a quote.
- Owner still unnamed. Byline still omitted.
- Neighbour at 63a still unnamed.
