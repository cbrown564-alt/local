# Typography & layout audit — 2026-07-31

Defect-first craft review of all 16 public concept pages. Screenshots: desktop hero (1280×800), desktop full page, mobile hero (390×844). No code was changed.

**Totals:** Critical 6 · High 34 · Medium 54 · Low 27

## Cross-cutting themes

1. **`.concept-link-inert` strikethrough** — Placeholder links (`data-concept-placeholder`) render as struck-through / 50% opacity. Reads as broken UI on Castle Farm, Newcastle Dental, Betty's, Hugh McCann's, Mourne Cycles, Donard Vet, Tool Centre, Cúpla, and others. Highest leverage single fix in `ConceptLayout` / `concept-shell.css`.
2. **`ch`-capped headlines** — Narrow `max-width` (8–15ch) plus manual `<br>` forces ugly towers (Douglas & Cromie, Donard Hotel, Betty's, Dundrum mobile).
3. **Hero text on busy photos without enough scrim** — Dundrum Inn, Hugh McCann's (mobile kicker/body).
4. **Mobile first-viewport priority** — Brand or primary action pushed below fold (Cúpla, Scopers, Bucks Head, Enniskeen booking bar).

## Ranked by severity score (Critical×10 + High×3 + Medium)

| Rank | Concept | C | H | M | L | Report |
|---:|---|---:|---:|---:|---:|---|
| 1 | Castle Farm | 2 | 1 | 3 | 2 | [castle-farm.md](./castle-farm.md) |
| 2 | Hugh McCann's | 1 | 3 | 4 | 1 | [hugh-mccanns.md](./hugh-mccanns.md) |
| 3 | Newcastle Family Dental Care | 1 | 2 | 4 | 2 | [newcastle-dental.md](./newcastle-dental.md) |
| 4 | Cúpla | 1 | 2 | 3 | 1 | [cupla.md](./cupla.md) |
| 5 | The Dundrum Inn | 1 | 2 | 3 | 1 | [dundrum-inn.md](./dundrum-inn.md) |
| 6 | Betty's Better Butters | 0 | 4 | 2 | 1 | [bettys-butters.md](./bettys-butters.md) |
| 7 | Mourne Cycles | 0 | 3 | 3 | 2 | [mourne-cycles.md](./mourne-cycles.md) |
| 8 | Scopers | 0 | 3 | 3 | 2 | [scopers.md](./scopers.md) |
| 9 | Douglas & Cromie | 0 | 3 | 2 | 1 | [douglas-cromie.md](./douglas-cromie.md) |
| 10 | The Bucks Head | 0 | 2 | 4 | 1 | [bucks-head.md](./bucks-head.md) |
| 11 | Donard Veterinary Clinic | 0 | 2 | 4 | 2 | [donard-veterinary.md](./donard-veterinary.md) |
| 12 | Kent Amusements | 0 | 2 | 4 | 2 | [kent-amusements.md](./kent-amusements.md) |
| 13 | The Tool Centre | 0 | 2 | 4 | 2 | [tool-centre.md](./tool-centre.md) |
| 14 | The Donard Hotel | 0 | 2 | 3 | 1 | [donard-hotel.md](./donard-hotel.md) |
| 15 | Enniskeen Country House Hotel | 0 | 1 | 4 | 3 | [hotel-enniskeen.md](./hotel-enniskeen.md) |
| 16 | Newcastle Chamber of Commerce | 0 | 0 | 4 | 3 | [newcastle-chamber.md](./newcastle-chamber.md) |

## Critical issues (fix first)

| Concept | Issue |
|---|---|
| Castle Farm | Primary CTAs struck through + failed contrast when inert |
| Hugh McCann's | Gold kicker illegible over bright sky (mobile) |
| Newcastle Dental | Primary CTAs rendered inert (strikethrough + 50% opacity) |
| Cúpla | Mobile first viewport shows counter panel, not the brand name |
| Dundrum Inn | Hero headline loses contrast on bright photo |

## Suggested review order for fixes

1. **Shared shell:** restyle `.concept-link-inert` (affects ~10 concepts).
2. **Hero legibility:** Dundrum Inn scrim; Hugh McCann's mobile kicker/body.
3. **Headline measure:** Douglas & Cromie `8ch`, Donard Hotel `12ch`, Betty's `10ch`.
4. **Mobile fold priority:** Cúpla brand, Scopers supper club, Bucks Head booking.
5. **One-offs:** Mourne Cycles "Trekdealer"; Kent coral contrast; Tool Centre tagline; Castle Farm CTA hierarchy after inert fix.

## Agents

- [Batch A](c685071c-4762-4ec0-9874-321cb1602e6a) — Dundrum, Douglas & Cromie, Donard Hotel, Betty's
- [Batch B](db636572-3f90-460f-9555-ae39c10e83ee) — Dental, Hugh McCann's, Chamber, Kent
- [Batch C](0ffd5285-e24e-4e25-a6c2-61a3baf75eb7) — Tool Centre, Cúpla, Scopers, Bucks Head
- [Batch D](b2be6e80-2710-4bf8-a101-63424f629a2a) — Donard Vet, Mourne Cycles, Enniskeen, Castle Farm
