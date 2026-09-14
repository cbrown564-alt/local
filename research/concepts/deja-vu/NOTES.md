# Deja Vu — day-8 guest concept

Authored 14 September 2026 (Europe/London) under
`/workspace/day8/deja-vu/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. Push straight to master via `push-one.sh`.

## Kind

**relief** — a haircut / colour chair. L’Oréal Professionnel salon on
Central Promenade. Not Serenity’s spa hour (55–57). Not Central Hair
Studio’s Timely door.

## One-liner

A L’Oréal Professionnel chair at 33 Central Promenade — cuts, colour,
care. Ring to book.

## Artefact

`ColourCard.astro` — colour formula / chair card naming **33 Central
Promenade**. Drawn. Caption: “The colour card for 33.” Banner note
discloses the drawing. The card names Deja Vu, 33, BT33 0AA — it could
not move to another salon.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/deja-vu/home.astro` |
| Styles | `src/concepts/deja-vu/styles.css` |
| Colour card | `src/concepts/deja-vu/ColourCard.astro` |
| Page wrapper | `src/pages/concepts/deja-vu.astro` |
| Copy brief | `research/concepts/deja-vu/deja-vu-copy-brief.md` |
| Elevation brief | `research/concepts/deja-vu/deja-vu-elevation-brief.md` |
| These notes | `research/concepts/deja-vu/NOTES.md` |

Read against Day 8 refs: stile-glass (relief-adjacent craft, SurveyClip
ritual) and thumbelina (airy door, giant number, drawing honesty in
bannerNote). Layout is one-off: salon daylight + colour-card theatre +
giant **33** — not Serenity linen spa, not Thumbelina ballet paper, not
Stile aluminium.

## Flagship score

**Hit** — strip + bespoke mark + nav; airy salon hero (no packed dusk
form); magazine Cut/Colour/Care; staged ColourCard ritual naming 33;
guest voice; honesty in bannerNote; plate questions / page-about-itself /
“not a photograph of…” captions banned.

- **Strip + mark + nav** — `.dv-strip` / colour-swatch mark / The chair,
  Colour, The card. Prefix `dv`. Not yet in `concept-shell.css`
  `:where()`; add on merge if shared strip list is updated.
- **Airy first screen** — cream salon daylight, Instrument Serif
  Deja Vu, giant pale **33**, Ring / colour-card. Not a packed form.
- **Editorial** — folio on the prom; three stock cards; phone as today’s
  book.
- **Staged ritual** — ColourCard with ring chips. No Timely. No form.
- **One artefact** — `ColourCard.astro`. Caption names the card, not the
  generation method.
- **Guest voice** — we / ring / our chair. No plate questions.
- **Drawing honesty in bannerNote only.**

Fonts via `fontHref` (Instrument Serif + Outfit). No shell edit.
EssenceMedia omitted — no `essence-media.ts` entry.

## Honesty

- Phone **028 4372 2110** / `tel:+442843722110` (L’Oréal locator).
- Address **33 Central Promenade, Newcastle, BT33 0AA**.
- Hours **omitted** (directories disagree; locator openingHours empty).
- No Timely (Central Hair is a different door).
- Facebook unread — omitted from guest chrome.
- No email invented.
- No owner / stylist roster invented.
- Handoff: tel primary; L’Oréal locator secondary.
- Banner note: “The colour card for 33 is a drawing.”

## Identity

- Prefix `dv`. Body class `concept-page concept-deja-vu`.
- Palette: salon cream / champagne / ink plum / copper / ash rose.
  Not Serenity sage linen, not Thumbelina ballet rose, not Stile ice.
- Layout one-off: promenade chair + colour card + giant 33.

## Swap test

Deja Vu, 33, L’Oréal Professionnel, 028 4372 2110. Remove those and any
salon could wear it.

## Open on merge

- Add `deja-vu` to `conceptFonts` if the team prefers the map.
- Add `.dv-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not print hours until first-party.
- Do not add Timely.
- Facebook still unread; still not the handoff.
