# John Mac's — day-8 guest concept

Authored 14 September 2026 (Europe/London) under
`/workspace/day8/john-macs/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. Push straight to master via `push-one.sh`.

## Kind

**meal** — seaside takeaway on the Central Promenade. Battered haddock,
hand-cut chips, sausage, fish cakes, scampi. Paging system for queues.
Walk up / ring. Not Savoy (daytime café). Not Harbour House (sea-wall
restaurant). Not Morelli's (scoop). Not Sucos (juice).

## One-liner

Traditional fish and chips at 9 Central Promenade — battered haddock,
hand-cut chips, a pager while you wait with the sea.

## Artefact

`SupperTicket.astro` — drawn paper supper ticket + pager disc naming
**9 Central Promenade**, John Mac's, and the board shorthand. Caption:
“The supper ticket for 9 Central Promenade.” Banner note discloses the
drawing. The plate names John Mac's and 9 — it could not move to another
chippy.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/john-macs/home.astro` |
| Styles | `src/concepts/john-macs/styles.css` |
| Supper ticket | `src/concepts/john-macs/SupperTicket.astro` |
| Page wrapper | `src/pages/concepts/john-macs.astro` |
| Copy brief | `research/concepts/john-macs/john-macs-copy-brief.md` |
| Elevation brief | `research/concepts/john-macs/john-macs-elevation-brief.md` |
| These notes | `research/concepts/john-macs/NOTES.md` |

## Flagship score

**8 / 10** — strip + bespoke mark + nav; airy promenade hero (no dusk form);
magazine board + pager editorial; staged walk-up / ring; one drawn
SupperTicket naming 9 Central Promenade; guest voice; honesty in bannerNote
only. Deduct: thin first-party record (no site / no hours / no social to
handoff beyond tel); no EssenceMedia / photoreal plate.

Flagship hits:

- **Strip + mark + nav** — `.jm-strip` / compact ticket mark / The board,
  The pager, The ticket, The door. Prefix `jm`.
- **Airy first screen** — salt-paper cream, sea navy, Oswald John Mac's,
  Walk up / Ring. Board rail beside the mast. No form. Not packed dusk.
- **Editorial** — board cells (haddock / chips / the rest); pager ritual
  band; ticket artefact with door address.
- **Staged counter ritual** — walk up / take a pager / collect / ring.
- **One artefact** — `SupperTicket.astro`. Caption names the ticket, not the
  generation method.
- **Guest voice** — we / walk up / ring. No plate questions. No
  page-about-itself.
- **Drawing honesty in bannerNote only** — “The supper ticket is a drawing.”
  Caption does not say “not a photograph of…”.

Layout is one-off: chip-paper cream + sea navy + vinegar amber + pager gold.
Not cloned from Savoy (enamel burgundy), Railway Street (green platform),
or Tip Top (raspberry jars). Fonts via `fontHref` (Oswald + Source Serif 4).
No shell edit. EssenceMedia omitted. Hours omitted. No invent Facebook.

## Locked-fact checklist (14 Sep 2026)

- [x] Address **9 Central Promenade, Newcastle, BT33 0AA** (prefer 9 over 7)
- [x] Phone printed **028 4372 6119** (`tel:+442843726119`)
- [x] Stock: battered haddock, hand-cut chips, sausage, fish cakes, scampi
- [x] Paging system named
- [x] No own website — handoff tel only
- [x] Hours **omitted** (directories conflict)
- [x] No delivery claim
- [x] Kind **meal**; action walk up / ring
- [x] No plate questions / page-about-itself / “not a photograph of…” captions

## Wiring on master

1. Push `src/` and `research/` trees via `push-one.sh`.
2. Optional later: add `.jm-strip` to shared strip `:where()` in
   `concept-shell.css`. Not required to ship the guest page.
3. Do **not** mount EssenceMedia until a record exists.
4. Do **not** add to `/transformations` until Conor clears publish.
5. Do not invent a social handoff.

## Swap test

Without John Mac's, 9 Central Promenade, the pager, and the named board
(haddock / hand-cut chips / scampi), the page is any seaside chippy. Those
four stay.
