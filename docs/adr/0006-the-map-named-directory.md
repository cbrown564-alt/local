# `/the-map/` is the civic directory; named, at listed coordinates

[ADR 0005](0005-the-lights-route-and-anonymity.md) decided an anonymous,
displaced-lights page at `/the-lights/` with no JavaScript and no named dark
businesses. The same day, 14 August 2026, the tree shipped `/the-map/`: a
searchable Leaflet directory of trading businesses, named, at listed
coordinates. Privacy copy and CONTEXT.md still described ADR 0005.

On 20 August 2026 the product choice was made explicit: **keep `/the-map/`**.
This records that choice and what it supersedes.

## Decided

**The civic surface is `/the-map/`.** It is a named directory of trading
businesses drawn from public listings: name, town, category, public address and
phone where listed, website link where listed, and a pin at the coordinates
already on the census row. Visitors may search, filter, and open a listing.

**ADR 0005’s product shape is superseded:** no `/the-lights/` route, no
requirement that published points be displaced or anonymous, no ban on naming
a trading business that has no owned website. The page may show that a listing
has a website (it currently uses a “Website available” tag). Absence of that
tag is visible.

**What still must not be published:** internal assessments, gap class, priority
scores, pipeline stage, outreach notes, and verification commentary. Lit/dark
remains research vocabulary (`docs/CONTEXT.md`). A published **count** is still
only over trading businesses, dated, and never “most.”

**Census numbers from ADR 0005 still stand** until the next sweep: 188 trading
(96 lit / 92 dark). `/the-map/` itself currently shows per-town listing counts,
not that pair of headlines. Do not invent a “most have no website” line on the
directory.

**Removal still stands.** If a business asks to be taken off the directory, it
is removed from the published map and from outreach. The name is kept only in
an unpublished suppression record so a later scrape cannot put it back.

**`/privacy/` must describe this page**, not the superseded lights product.

## Alternatives rejected

**Restore `/the-lights/` and retire the directory.** Safer against
misidentifying a dark premises, and closer to the 5–14 August honesty work.
Rejected: the shipped page is already the public civic object, and the 20
August decision was to keep it rather than unwind it.

**Both routes, different jobs.** Possible later. Not the current product. Do
not add `/the-lights/` alongside `/the-map/` without a new decision.

## Consequences

- `docs/CONTEXT.md` lit/dark anonymity rule is rewritten to match this ADR.
- `research/the-lights-brief.md` is historical; do not build from it.
- `src/site/data/lights.json` and its bake/check path are leftover plant from
  ADR 0005. They must not be read as the public product. Retire or retarget
  them in a later rework item — not by silently wiring them back into the
  directory.
- `Shore` `band` in the footer is unchanged (ADR 0004). `stage` has no route
  until a new decision gives it one.
- Further `/the-map/` features assume a named directory, not anonymous lights.
