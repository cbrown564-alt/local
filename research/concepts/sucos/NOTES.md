# Sucos — day-8 guest concept

Authored 14 September 2026 (Europe/London) under
`/workspace/day8/sucos/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. Push straight to master via `push-one.sh`.

## Kind

**meal** — consume-now promenade juice bar. Juices, smoothies, milkshakes,
desserts. Walk up to 21 Central Promenade, order at the counter, take the
cup to the sea. Not John Mac’s (chippy at 9 — battered haddock, paging
queue). Not Morelli’s (scoop jar at 73 — cone to the prom). Not Savoy
(Main Street daytime café with site and hours).

## One-liner

Shake N Juice at 21 Central Promenade — juices, smoothies and shakes
walked straight to the seafront.

## Artefact

`CupSleeve.astro` — cardboard cup sleeve naming **Sucos**, **Shake N Juice**,
and **21 Central Promenade**. Drawn. Caption: “The cup sleeve at 21.”
Banner note discloses the drawing. The plate names the door — it could not
move to another juice bar.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/sucos/home.astro` |
| Styles | `src/concepts/sucos/styles.css` |
| Cup sleeve | `src/concepts/sucos/CupSleeve.astro` |
| Page wrapper | `src/pages/concepts/sucos.astro` |
| Copy brief | `research/concepts/sucos/sucos-copy-brief.md` |
| Elevation brief | `research/concepts/sucos/sucos-elevation-brief.md` |
| These notes | `research/concepts/sucos/NOTES.md` |

Read against Day 8 FACTS §4 and flagship refs Thumbelina (strip / mark /
nav; jar ritual; drawing honesty) and Savoy Cafe (meal counter appetite;
airy first screen). Layout is one-off: citrus paper + seafoam strip + cup
sleeve board — not Savoy enamel, not Thumbelina ballet walnut, not
Morelli’s scoop awning.

## Flagship score

**8 / 10** — all seven flagship hits; hours and FSA badge correctly kept
off the guest page; tel-only handoff honest.

- **Strip + mark + nav** — `.su-strip` / citrus cup mark / The board, The
  cup, The door. Prefix `su`. Not yet in `concept-shell.css` `:where()`;
  add on merge. Mark is drawn, not a lifted logo.
- **Airy first screen** — bright citrus paper, Fraunces Sucos, giant pale
  **21**, Walk up / tel. Not a packed dusk form.
- **Editorial** — folio on the prom; three-column juice / smoothie / shake
  board; stock as lines, not a priced catalogue.
- **Staged counter ritual** — seafoam bar, three beats (walk up / we blend /
  take the cup to the sea), tel + Walk up. No form.
- **One artefact** — `CupSleeve.astro`. Caption names the sleeve, not the
  generation method.
- **Guest voice** — we / walk up / our counter. No plate questions. No
  page-about-itself.
- **Drawing honesty in bannerNote only** — “The cup sleeve is a drawing of
  the door at 21.” Caption does not say “not a photograph of…”.

Fonts via `fontHref` (Fraunces + Figtree). No shell edit. EssenceMedia
omitted — no `essence-media.ts` entry.

## Live-fact checklist (14 Sep 2026)

- [x] Address **21 Central Promenade, Newcastle, BT33 0AA**
- [x] Phone **028 4372 5795** · `tel:+442843725795`
- [x] Trading name Sucos Shake N Juice (FSA: SUCOS SHAKE 'N' JUICE)
- [x] Stock: juices, smoothies, milkshakes, desserts
- [x] No verified own domain — tel handoff only
- [x] Hours omitted (directory conflict)
- [x] FSA 5 Very Good 7 Aug 2024 FHRS 728682 — kept in research, not guest chrome
- [x] Distinct from John Mac’s at 9 and Morelli’s at 73 (unnamed on page)
- [x] No invented flavours, prices, delivery, or social handles

## Honesty

- No site. Phone is the handoff.
- Phone **028 4372 5795**.
- Postcode **BT33 0AA** printed.
- Hours omitted.
- No email on file — not invented.
- Social unread / unverified — omitted.
- Neighbours at 9 and 73 unnamed.
- Banner note discloses the cup sleeve as a drawing.

## Identity

- Prefix `su`. Body class `concept-page concept-sucos`.
- Fonts passed as `fontHref` (Fraunces + Figtree). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: citrus paper / lime / mango / berry / seafoam / ink. Not Savoy
  enamel burgundy, not Thumbelina ballet rose, not Morelli’s ice-cream cream.

## Swap test

Sucos, 21, Shake N Juice, the cup sleeve. Remove those and any juice bar
could wear it.

## Open on merge

- Add `sucos` to `conceptFonts` if the team prefers the map.
- Add `.su-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not print hours until first-party dated.
- Do not invent a domain or social handle.
