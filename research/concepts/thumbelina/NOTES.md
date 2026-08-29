# Thumbelina — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/thumbelina/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push. No merge. No publish.

## Kind

**jar** — a thing you take home. Traditional toy shop. Audrey behind
the counter. A ballet dancer at the door. Not a party factory (Bear
Necessities: packs, invitation form, circuit). Not the café at 2
(Railway Street: meal, Saturday board, Groupwork bag).

## One-liner

A traditional toy shop at 10A. Audrey at the counter. A ballet dancer
at the door.

## Artefact

`DancerDoor.astro` — 10A Railway Street door plate with the ballet
dancer and flowers at her feet. Drawn, not childhood-stock clipart.
Caption: “The dancer at 10A.” Banner note discloses the drawing.
The plate names Thumbelina, 10A, Railway Street — it could not move
to another toy shop.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/thumbelina/home.astro` |
| Styles | `src/concepts/thumbelina/styles.css` |
| Door plate | `src/concepts/thumbelina/DancerDoor.astro` |
| Page wrapper | `src/pages/concepts/thumbelina.astro` |
| Copy brief | `research/concepts/thumbelina/thumbelina-copy-brief.md` |
| Elevation brief | `research/concepts/thumbelina/thumbelina-elevation-brief.md` |
| These notes | `research/concepts/thumbelina/NOTES.md` |

Read against `cbrown564-alt/local` master (fetched, not cloned):
Railway Street `home.astro` + `StreetPlate.astro` + `styles.css`
(strip / mark / nav; airy door; Instagram handoff; drawing honesty in
bannerNote; hours omitted when Google-only). Bear Necessities
`home.astro` as the **contrast** — party factory with packs, invitation
desk, circuit map; Thumbelina refuses that class. Brief:
`research/concepts/thumbelina/thumbelina-elevation-brief.md` (23 August
2026, pasted unchanged). Live facts re-read 29 August 2026.

## Flagship score

**8 / 10** — all seven flagship hits; hours and duration counts
correctly omitted rather than dated.

- **Strip + mark + nav** — `.tb-strip` / painted-dancer mark / The shop,
  The counter, The door. Prefix `tb`. Not yet in `concept-shell.css`
  `:where()`; add on merge. Mark is drawn, not a lifted logo.
- **Airy first screen** — cream shop-window, Bodoni italic Thumbelina,
  giant pale **10A**, Walk in / tel. Not a packed form. Not Railway
  Street’s timetable masthead.
- **Editorial** — folio in Slieve Donard’s shadow; Audrey’s April 2023
  sentence as a pull; stock list as a line, not a catalogue; Instagram
  for what is on the shelf today.
- **Staged counter ritual** — walnut bar, three beats (walk in / Audrey
  finds the toy / take it home), tel + Walk in. No form.
- **One artefact** — `DancerDoor.astro`. Caption names the dancer, not
  the generation method.
- **Guest voice** — we / walk in / our counter. No plate questions. No
  page-about-itself.
- **Drawing honesty in bannerNote only** — “The dancer at the door is a
  drawing of the 10A plate.” Caption does not say “not a photograph of…”.

Layout is one-off: ballet-paper + walnut counter + giant 10A. Not
cloned from Railway Street (enamel fascia, Saturday spread, cup rail)
or Bear Necessities (Baloo, packs, invitation JS). Fonts via `fontHref`
(Bodoni Moda + Plus Jakarta Sans). No shell edit. EssenceMedia omitted
— no `essence-media.ts` entry.

## Live-fact changes (29 August 2026)

Re-read against the known facts in the 23 August brief:

| Fact | 29 Aug 2026 | Guest page |
| --- | --- | --- |
| 10A Railway Street, Newcastle, BT33 0AL | Confirmed across directories | Printed |
| 028 4372 7444 | Confirmed | Printed · `tel:+442843727444` |
| No website | Confirmed. `thumbelinatoys.co.uk` is a Tenterden shop — different door | No URL printed. |
| Google Sun closed; Mon–Sat 10–5 | **Not re-confirmed.** Maps JS-walled; aggregator hours incomplete / conflicting | **Omitted** rather than dated |
| IG @thumbelinatoyshop · bio: Established 20 years, one to one customer advice. AudreyByrne | Profile exists. Body login-walled; bio not re-read beyond the given line | Handle printed. “One-to-one customer advice” kept. Duration count **not** printed (counts move) |
| Belfast Live 1 Apr 2023: Slieve Donard’s shadow; ballet dancer with flowers at her feet; Audrey Byrne behind the counter | Article re-read and confirmed | Folio / say / quote / dancer artefact |
| Action: walk-in / ring. No form. Handoff: Instagram | Still the mechanism | Walk in + tel. No form. IG handoff |
| Audrey named | Press, IG, and a Facebook personal page (`thumbelinatoyshop.audreybyrne`) already name her | Named on the counter. Facebook unread — not used as handoff |
| Founding year | Still none first-party. 2020 “15 years” / 2023 “18” / “nearly 20” / IG “Established 20 years” | **Not invented. Not printed.** |

Unverified search chatter (closure / break-in) not sourced — omitted.

## Honesty

- No site. Instagram is today’s shelf.
- Phone **028 4372 7444**.
- Postcode **BT33 0AL** printed (unlike Railway Street’s 0AJ/0AL split).
- Hours omitted.
- Founding year omitted.
- Duration counts omitted.
- No email on file — not invented.
- Facebook unread; omitted from the guest chrome.
- Neighbour at 2 Railway Street unnamed.
- Banner note discloses the door plate as a drawing.

## Identity

- Prefix `tb`. Body class `concept-page concept-thumbelina`.
- Fonts passed as `fontHref` (Bodoni Moda + Plus Jakarta Sans). Not
  added to `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: ballet paper / slipper / rose / walnut / brass 10A. Not
  railway enamel green, not Bear Necessities party Baloo, not stile
  aluminium.

## Swap test

Thumbelina, 10A, Audrey, the ballerina. Remove those and any toy shop
could wear it.

## Open on merge

- Add `thumbelina` to `conceptFonts` if the team prefers the map.
- Add `.tb-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not print hours until Google is dated.
- Do not print a founding year or a duration count.
- Logged-in Instagram still unread.
- Facebook still unread; still not the handoff.
