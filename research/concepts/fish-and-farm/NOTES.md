# Fish & Farm — day-8 guest concept

Authored 14 September 2026 (Europe/London) under
`/workspace/day8/fish-and-farm/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. Push straight to master via `push-one.sh`.

## Kind

**jar** — prepared fish and farm dishes you take home, plus a deli
counter you can sit with. Not a restaurant reserve (Buck’s Head). Not
a sweet-shop pound (Tip Top). Not a bakery loaf (Cookie Jar).

## One-liner

Alex and Bronagh’s take-home kitchen at 18 Main Street — chowder, pies,
fresh fish, and a deli seat — live presence on chefalexgreene.co.uk.

## Artefact

`CounterTicket.astro` — a paper deli ticket / kitchen pass naming
**18 Main Street**, Fish & Farm, and the take-home lines. Drawn, not a
lifted logo. Caption: “The ticket at 18.” Banner note discloses the
drawing. The plate could not move to Belfast or to Buck’s Head.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/fish-and-farm/home.astro` |
| Styles | `src/concepts/fish-and-farm/styles.css` |
| Counter ticket | `src/concepts/fish-and-farm/CounterTicket.astro` |
| Page wrapper | `src/pages/concepts/fish-and-farm.astro` |
| Copy brief | `research/concepts/fish-and-farm/fish-and-farm-copy-brief.md` |
| Elevation brief | `research/concepts/fish-and-farm/fish-and-farm-elevation-brief.md` |
| These notes | `research/concepts/fish-and-farm/NOTES.md` |

Read against day-8 refs: Thumbelina (airy mast, door artefact, omit
hours), Tip Top (jar how-its-made, walk-in action), Railway Street
(strip / mark / nav chrome; honest handoff). Flagship taste from
Arley / Dental / Enniskeen notes in agent memory.

## Flagship score

**Target 8+/10**

- **Strip + mark + nav** — `.ff-strip` / fish-and-leaf mark / The counter,
  Take home, The door. Prefix `ff`. Mark is drawn SVG, not a lifted logo.
- **Airy first screen** — cream butcher paper, Fraunces Fish & Farm as
  biggest type, Walk in / Ring. No packed dusk overlay. No form.
- **Editorial** — magazine stock spread in their register (take-home /
  deli sit-in / sister door); not two plain paragraphs.
- **Staged ritual** — counter ticket as the object, not a generic HTML form.
- **One artefact** — `CounterTicket.astro`. Caption guest voice only.
- **Guest voice** — we / walk in / our counter. No plate questions. No
  page-about-itself lines.
- **Drawing honesty in bannerNote only** — “The counter ticket is a
  drawing of the 18 Main Street plate.”

Layout is one-off: atlantic slate + farm sage + copper ticket clip on
butcher paper. Not Tip Top raspberry jars. Not Thumbelina ballet paper.
Not Railway Street enamel brew-bar.

## Honesty

- Door: **18 Main Street, Newcastle, BT33 0AD**.
- Phone: **028 4379 8550** (`tel:+442843798550`) — directory/leadquest;
  not reconfirmed on a live first-party Fish & Farm site.
- Owners: Alex Greene & Bronagh McCormick (chefalexgreene.co.uk/story, press).
- Opened 2019; relaunched January 2024 with deli sit-in (Home2024 archive /
  brand site).
- **fishandfarm.co.uk is dead** (Hostinger WordPress stub). Do not CTA it.
  Handoff: https://chefalexgreene.co.uk/ (Visit Fish & Farm) and that brand’s
  Instagram presence.
- Hours omitted (not first-party locked).
- FSA 5 (28 Jun 2024, FHRS 1299455) kept off the guest page; prefer guest
  voice over hygiene scores.
- Sister: The Buck’s Head (shared gift vouchers) — named lightly, not as a
  booking engine on this page.
- No fake cart. Action: walk in / ring.

## Swap test

Remove Fish & Farm, 18 Main Street, Alex & Bronagh, take-home chowder /
pies / fresh fish, and the chefalexgreene handoff — if any deli could
wear what remains, stop.

## Open on merge

- Add `.ff-strip` to shared strip `:where()` list if desired.
- Add `fish-and-farm` to `conceptFonts` only if the team prefers the map
  over page-level `fontHref`.
- Do **not** add to `/transformations` until Conor clears publish.
