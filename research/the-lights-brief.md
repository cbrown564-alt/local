# `/the-lights/` — one horizon, and the half of the town that is dark on it

*Written 14 August 2026. This brief promotes Shore `stage` out of a held
section of `/about/` and gives it a route of its own. It does not reopen the
decisions that made it publishable: [`docs/adr/0004-shore-horizon-and-lights.md`](../docs/adr/0004-shore-horizon-and-lights.md)
owns the component, and
[`census-confidence-decision-2026-08-05.md`](pipeline/census-confidence-decision-2026-08-05.md)
owns what the lights may say. Both were settled on 5 August 2026 and neither
has been built. Fourth sibling to the three explainer pages
([`three-ways-to-describe-the-work.md`](three-ways-to-describe-the-work.md)) —
those three describe the work; this one describes the place the work is done
in.*

## The point of the page in one line

The three explainer pages argue that a local site can be better. This page is
the only surface that says **how much of this actually needs doing, here, on a
dated count we can defend** — and it says it as a picture of the town rather
than as a statistic about the town.

## The name does the tonal work

Not `/who-has-a-website/` — that is a register, and a register invites the
reader to look for a name. Not `/dark-town/` or `/the-gap/` — both make the
absence the subject, and the absence is other people's businesses. Not
`/the-map/` — we have a town map already and it does a different job
(`TownMap.astro` places our own work).

**`/the-lights/`** names what is lit. The dark is present in the image as
absence, which is the only form in which we are permitted to publish it, and
the name does not ask the reader to hunt. It also inherits the vocabulary the
ADR already set: the horizon is identity, the lights are evidence.

Working headline: **Half the independent traders here have no website of their
own.** Subhead: eighty-five of the hundred and sixty-six we could place on a
map, reviewed in August 2026 — drawn on the real Mourne skyline, and nobody
named.

## What is already decided, and what this brief may not touch

This is the load-bearing section. Everything below it is subordinate to this
table, which is copied from the confidence decision, not restated from memory.

| Rule | Value |
|---|---|
| Universe | `censusClass === "Trading business"` only |
| Count | Dated fraction of **mapped** trading businesses with no owned site |
| Current figure | **85 of 166** (~half) — never "most" |
| Map | Anonymous lights at dark ∩ mapped coordinates |
| Dark identity | Never named, labelled, linked, or hoverable |
| Evidence | Joined `verification` object after the four-step website hunt |
| Trading strength | `Open — unconfirmed` accepted for this **aggregate** claim only |

Reproduce with `node tools/pipeline/report-census-class.mjs`. Confirmed
reproducing on 14 August 2026: 201 trading, 96 lit, 105 dark, 166 mapped, 85
dark-and-mapped, **0 unconfirmed**.

Forbidden wordings, verbatim from the decision: *"most local businesses have no
website"*; any count over raw census rows; naming, labelling or making
hoverable any dark point.

**The count in prose and the lights on the canvas must be derived from the same
array**, in the same build step, so the picture cannot say something the
sentence does not. This is `docs/sensory-system-plan.md` phase 3b and it is the
single most important build constraint on the page.

## What exists, and what this page is actually asking to be built

Worth stating plainly, because the ADR reads as though `Shore` shipped.

| Piece | State on 14 August 2026 |
|---|---|
| ADR 0004 (`Shore` at two scales) | Decided 5 August. **Not implemented.** No `Shore` component exists in `src/`. |
| `band` in `Footer.astro` | Not built. `Footer.astro` has no reference to it. |
| `MourneMotif.astro` | Still present and still shipping — the ADR says it is deleted when `band` ships. |
| `stage` | Gate open since 5 August. Not built. |
| The lights renderer | Proven — `demoLights()` in `src/site/scripts/showcase-demos.ts`, at 340px. |
| The horizon data | Baked — `src/site/data/mourne-terrain.json`, 224×224 heights, AWS terrain tiles, 4 August. |
| The census classifier | Built — `tools/pipeline/census-class.mjs`, `report-census-class.mjs`. |

So this brief asks for one component, at two scales, plus one page. The
mechanism is proven twice over; what has never existed is the surface.

**Do this work in ADR order.** `band` ships first and deletes `MourneMotif`,
because that is the decision of record and because it forces the horizon to be
house style rather than one page's trick. `/the-lights/` is `stage` given a
room of its own.

## The device: one image, three depths of attention

Not a dashboard, not a filterable directory, not a data-viz page with a legend.
A **drawn horizon at dusk with the town beneath it**, in the same grey-and-lit
grammar as the fault walk's mocks and the `why-its-yours` plates — the studio's
existing hand, applied to real coordinates.

Three depths, in this order down the page:

```
┌────────────────────────────────────────────────────────────┐
│  ARRIVE                                                    │
│    the Mournes, drawn from baked elevation.                │
│    the town below, unlit. one line of type.                │
│                                                            │
│  ██████████████████████████████████████████████            │
│    ╱╲    ╱╲╱╲      ╱╲                                      │
│   ╱  ╲__╱     ╲__╱   ╲___                                  │
│   · ·  ·   ·  · ·   ·  ·  ·      ← every trader, dark      │
│                                                            │
│  STAND                                                     │
│    ninety-six lights come up, one at a time, over          │
│    about four seconds. eighty-five points stay grey.       │
│    the sentence writes itself beside the image, from       │
│    the same array.                                         │
│                                                            │
│   ·✦· ✦  ·   ✦ ·✦   ·  ✦  ·                                │
│   "96 of 166 mapped independent traders in Dundrum and     │
│    Newcastle have a website of their own. Reviewed         │
│    5 August 2026."                                         │
│                                                            │
│  ASK                                                       │
│    one field. what we hold for your business, and how      │
│    to correct it. see below — this is the delicate part.   │
└────────────────────────────────────────────────────────────┘
```

**The lit ones arrive; the dark ones were already there.** That ordering is the
whole argument and it is already how `demoLights` behaves — dark points settle
first at low opacity, lit points come up individually after. Keep it. It reads
as *the town is here, and some of it is switched on*, which is a statement
about opportunity. The reverse ordering — lights going out — would read as
decline, which is both untrue and unkind.

**No flicker at production scale.** `demoLights` flickers each light on a sine.
Charming at 340px; at full width it reads as instability, and these are real
premises. Lights settle and hold.

## The interaction I wanted, why it is forbidden, and what replaces it

The obvious feature is: type your business, find your light, click through to a
diagnosis. **Two thirds of that is unpublishable and the brief has to say so
before anyone builds it.**

A search box over this dataset makes the dark set *queryable*. Anyone could
type a neighbour's name and learn that Mourne Made holds them as having no
website. Functionally that is labelling — it is the labelling rule defeated by
an input field rather than by a tooltip — and `docs/CONTEXT.md` is explicit: *a
dark business is never named, labelled, linked or made hoverable.* A lookup
that answers differently for lit and dark businesses is a hoverable dark point
with extra steps.

It is also the failure mode the audit already caught us in once. Before the
four-step hunt, the dark flag was **wrong about two times in three** on a
sample of sixteen — ten of them had a website the census had missed, including
a solicitor, a vet and an optician. That pass closed the gap for the aggregate,
but the lesson stands: our record of a business is not the business.

**What replaces it: the lookup answers about our record, never about the
business, and answers identically for everyone.**

```
   Is your business on this map?
   ┌──────────────────────────────┐
   │ your business name           │   [ check ]
   └──────────────────────────────┘

   → matched, we hold a site:
     "We have kellymcevoybrown.example listed for Kelly, McEvoy &
      Brown, Dundrum, checked 5 August 2026. Wrong? Tell us."

   → matched, we hold none:
     "We don't hold a website for that name. That may be our
      record being out of date rather than the fact — we've had
      that wrong before. If you have one, tell us and we'll
      correct it."

   → no match:
     "We don't have that name. Tell us and we'll add it."
```

Three answers, one posture: **every branch is an admission about our dataset
and an invitation to correct it.** None of them asserts anything about a
business. The dark branch never says *dark*, never says *no website*, and never
implies the business is behind — it says our record is empty and may be wrong,
which is true and which we have documented evidence for.

The output of that box is not a lead. It is a **correction path into
`verifications.json`** — the same four-step method, opened to the people who
know the answer best. That is what makes the page civic rather than
extractive, and it is the strongest argument for building it at all: the
dataset gets better because the town uses the page.

**Correction submissions are not requests.** They go to the same endpoint with
a distinct `source`, they are not treated as interest in buying anything, and
replying to one with a pitch would poison the whole mechanism. Write that in
the handler, not just in the brief.

## Five rules that keep this from being a shaming device

1. **No ranking, ever.** No league table, no per-town comparison, no
   "Newcastle is ahead of Dundrum". The moment the page ranks, it is a
   judgement, and half of the judged never asked to be measured.
2. **Dark is not a verdict.** Copy anywhere near the map says *no website of
   their own that we could find* — with the "that we could find" intact. It is
   longer and it is the truth.
3. **A business that asks to be removed is removed that day**, lit or dark, no
   questions and no retention. Say so on the page. One line, near the map.
4. **Aggregate only, forever.** The rule survives improvements to the data. A
   future round with perfect confidence does not unlock naming, because the
   objection was never only about accuracy — it is about publishing a judgement
   on a business that never asked for one.
5. **No date, no page.** The count carries its review date in the same
   sentence, always. An undated count is a claim about now, and this one is a
   claim about 5 August 2026.

## Page structure

```
1  The horizon        Real Mourne skyline, town unlit, one line of type.
                      Nothing moves until the reader is at it.

2  The lights         96 arrive. 85 stay grey. The dated sentence sits
                      beside the canvas, derived from the same array.

3  What this counts   Trading business, mapped, reviewed — what each of
                      those words excludes, in plain prose. Graveyards,
                      walking trails, chain branches and the fire station
                      are not in this picture, and saying so is the
                      credibility of the whole page.

4  How we got it      The four-step hunt, and the finding that our own
   wrong first        dark flag was wrong two times in three before it ran.
                      Links /what-we-got-wrong/. This paragraph is why the
                      number is believable.

5  Is your business   The lookup. Three answers, one posture, correction
   on this map?       path in.

6  Close              → /request/. Quieter than section 5, and never
                      phrased as "you are dark, buy something".
```

Section 4 is not optional and is not modesty. It is the section that converts
a number a visitor cannot check into a number a visitor can trust, and it is
the same move `/where-it-fails/` makes by showing every fault as a decision
that looked reasonable.

## Budget, motion and degradation

The sensory system's whole budget is **25KB**, and Lit Town — the three.js hero
that did this more spectacularly — was retired for costing 132KB of script plus
46KB of terrain grid. Do not resurrect it.

- Canvas 2D. No three.js on this route. `demoLights` is already plain canvas.
- The horizon ships as a baked profile of ~200 numbers, as `band` does — not
  the 224×224 grid, which stays a build-time input.
- The points ship as a lean array: `{ lat, lon, lit }` and nothing else. **No
  names, no ids, no addresses in the client payload.** If the name is not in
  the bundle, no amount of devtools makes a dark point identifiable — the
  privacy rule is enforced by the data shape rather than by the UI. This is the
  single most important line in this section.
- `prefers-reduced-motion`: lights are already up on arrival. No sequence.
- No JS: a static SVG horizon and the dated sentence in prose. The sentence is
  the deliverable; the canvas is how it is felt. If the canvas never runs, the
  page still makes its claim.

`PLAN.md` §3 stands — the request path outranks this page for attention weight
on any surface they share.

## Why this is worth doing before more concepts

Stated honestly, because it competes with outreach for time.

The pipeline problem in `PLAN.md` is not concept quality. Eighteen are public
and one business has been contacted. Outreach is hand-delivered one-sheets to a
shortlist, which is the right method and does not scale past a few doors a
week. `/the-lights/` is the only proposed surface that is **linkable by someone
else** — the Chamber, a local paper, a councillor, another trader — because it
is about the town and not about the studio. It is the inbound counterpart to
the one-sheet, and it costs one component the ADR already specified.

It is also the honest home for the census work. That research exists, it was
expensive, it was audited hard, and today it is visible nowhere.

## Build notes

- Route `/the-lights/`. One component, `Shore`, two scales, per ADR 0004.
- Ship `band` first; delete `MourneMotif.astro` in the same commit, as the ADR
  requires. `Shore` becomes a sitewide dependency — treat a change to it as a
  change to every page.
- Derive both the count and the point array in one build step from
  `census-class.mjs` output. Two code paths reading the same JSON is not the
  same guarantee.
- **Pin the forbidden wordings.** A static check over `dist/` that fails on
  "most local businesses", on any count that does not carry a date within the
  same sentence, and on any business `name` string appearing in the lights
  payload. `docs/the-elevation-method.md` §5: unpinned magic regresses, and the
  thing regressing here is a promise about real people.
- Pin the arithmetic too: the rendered count must equal the length of the
  filtered array, asserted, not eyeballed.
- The horizon is real elevation and needs no provenance entry — it is data, not
  a generated image. Nothing on this page is generated media.
- Keyboard and screen reader: the canvas is `aria-hidden` decoration; the
  sentence, the exclusions and the lookup carry the entire meaning in text.

## Open questions

- Does the lookup belong on this page at all, or on `/request/`? It is the one
  element that could turn a civic artefact into a lead magnet, and the answer
  may be that it lives here but posts nowhere near the request handler.
- Should lit points be clickable through to the business's own website? It is
  public information and it is generous — the page would send traffic to
  ninety-six local traders. But it makes the map asymmetric in exactly the
  dimension we promised not to expose. Leaning no.
- Does the Chamber prototype (`/prototypes/chamber/`) want this as a component
  rather than a link? A directory whose members can see the town's coverage is
  a genuinely different pitch to a chamber than a website redesign.
- Refresh cadence. A dated count ages. Is this reviewed quarterly, or does it
  stand at 5 August 2026 until a reason to re-run appears? Prefer the latter,
  stated on the page, over an implied freshness we do not maintain.
