# One horizon, drawn from real elevation, in every footer

The sensory system survey (`research/sensory-system.md`) approved two ideas
whose end product was left explicitly undecided: **01 Ridgeline**, the real
Mourne skyline drawn from baked elevation, and **04 Lights**, every reviewed
local business as a point of light at its real coordinates. Both were proven at
340px in `/prototypes/showcase/`. Neither had a surface.

`docs/sensory-system-plan.md` phase 0 proposed merging them into one component,
`Shore`, at three scales. This records what was decided on 5 August 2026, and
why. It is an ADR because `Shore` lands in `Footer.astro` and is therefore a
dependency of every page on the site.

## Decided

**`Shore` is adopted at two scales, not three.**

| Scale | Where | What it draws |
|---|---|---|
| `band` | Inside `Footer.astro`, every page, ~120px | Horizon only |
| `stage` | `/about/`, ~50vh | Horizon, lights, and a dated count in prose |

`band` ships now. `stage` is held (see below). The proposed third scale,
`rule` — a 28px section divider filling with scroll progress — is cut.

The governing distinction:

> **The horizon is identity. The lights are evidence.** Identity can go
> anywhere. Evidence only appears where prose can stand beside it.

## Alternatives rejected

**Lit Town, the three.js hero.** `/prototypes/home/lit-town/` already unified
terrain and lights as a single spectacular homepage hero, and was further along
than `Shore`. Measured in a real build it costs **132KB gzipped for the script
and 46KB for the terrain grid**, against a 25KB budget for the entire sensory
system — and `PLAN.md` §3 makes the request path outrank everything in this
plan. It is also, being one hero on one page, the one shape that could never
become a house style. Retired to the prototype record.

**Keeping `MourneMotif` alongside `Shore`.** `MourneMotif` is an invented
skyline — a hand-drawn zigzag path. The entire argument for Ridgeline is that
it is the real one. A site that shows a true horizon and a made-up one has no
truth claim left, so `band` replaces it rather than joining it.

**Lights in the footer band.** A footer has no room for prose, so lights there
would assert something about real businesses silently, on every page, including
`/privacy/`. At 120px they are texture, not information: all of the honesty
exposure, none of the evidence. Removing them also settles whether the band
animates — there is nothing left to animate.

**A scroll-tracking `rule`.** It would put the same image on the same page with
two behaviours: frozen in the footer, animating mid-page. And a progress
indicator that cannot be clicked, dragged, or read a position from is
decoration wearing a control's costume.

## Consequences

- `MourneMotif.astro` is deleted when `band` ships, and the homepage loses its
  standalone motif band.
- Every page gains ~2KB: a terrain profile of roughly 200 numbers baked at build
  time, never the 50k-point grid.
- The site gains a sitewide dependency. A change to `Shore` is a change to every
  page, and should be treated as one.

## Why `stage` is held

`stage` was to carry the census claim — that most local businesses here have no
website of their own. The claim did not survive contact with the data.

Of 379 rows in `src/site/data/businesses.json`, 281 are marked as having no
website. That set includes Royal County Down Golf Course; ten national chains
where the flag means *this branch* has no site; the police station, fire
station, primary school and tourist information centre; two graveyards, four
walking trails, and a road called "High Mournes scenic loop". Several rows are
duplicates. **246 of the 281** carry `dataConfidence: "Public listing;
ownership and trading status not independently confirmed"`.

Filtering to independent, trading, non-duplicate commercial businesses leaves
213, of which 187 are placeable on a map and 156 are dark — a defensible shape,
but **149 of those 156 remain unconfirmed**. Publishing the figure would assert
that 156 specific premises are behind, on evidence we had ourselves labelled
unconfirmed. `docs/sensory-system-plan.md` requires that a claim we cannot
evidence is removed rather than softened.

The root cause was a glossary gap: `Prospect` was defined as "a local business
assessed against the census", and *census* was never defined — so a scraped
catalogue of listed places was read as a list of businesses. `docs/CONTEXT.md`
now defines **Census**, **Trading business** and **Lit / dark**.

`stage` ships only after a further research round refines the census to trading
businesses and verifies website status as far as is possible digitally, and
after a separate decision on what level of confidence is required to publish
both a number and the locations.
