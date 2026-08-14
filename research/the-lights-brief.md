# `/the-lights/` — one horizon, and the half of the town that is dark on it

*Written 14 August 2026, revised the same day after a grilling pass. This brief
promotes Shore `stage` out of a held section of `/about/` and gives it a route
of its own. It does not reopen the decisions that made it publishable:
[`docs/adr/0004-shore-horizon-and-lights.md`](../docs/adr/0004-shore-horizon-and-lights.md)
owns the component, and
[`census-confidence-decision-2026-08-05.md`](pipeline/census-confidence-decision-2026-08-05.md)
owns what the lights may say. Both were settled on 5 August 2026 and neither
has been built.*

*The grilling pass found that three of the first draft's proposals — the
lookup, the exact coordinates, and clickable lit points — would each on their
own have identified the ninety-two businesses this page promises never to
name, and that its headline figure was a category error. Those are settled in
[`docs/adr/0005-the-lights-route-and-anonymity.md`](../docs/adr/0005-the-lights-route-and-anonymity.md),
which is now the live document; this brief is the argument for the page and has
been brought into line with it. Fourth sibling to the three explainer pages
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

The headline obeys the same logic the name does — presence is the subject, the
gap is the remainder:

> **Ninety-six of the hundred and eighty-eight independent traders here have a
> website of their own.**
> The other ninety-two have none that we could find. Reviewed 5 August 2026.
> Nobody here is named.

The first draft's headline — *"Half the independent traders here have no
website of their own"* — is retired twice over. It made the absence the
grammatical subject of ninety-two real businesses, which is exactly what the
page's name refuses to do. And it counted a denominator the confidence decision
never authorised.

The word *mapped* has since stopped doing any work and is dropped from the
sentence: the 14 August census pass recovered coordinates for every trading
business, so the mapped set and the trading universe are now the same 188 rows.
Keep the qualifier out while that holds, and put it back the day it stops
holding — a denominator that silently excludes anyone must say so.

## What is already decided, and what this brief may not touch

This is the load-bearing section. Everything below it is subordinate to this
table, which is copied from the confidence decision and ADR 0005, not restated
from memory.

| Rule | Value |
|---|---|
| Universe | `censusClass === "Trading business"` only |
| Count | Dated fraction of **mapped** trading businesses with no owned site |
| Current figures | **96 lit / 92 dark of 188 trading** — never "most", in either direction |
| Map | Anonymous lights at dark ∩ mapped coordinates, **displaced ~50m** |
| Dark identity | Never named, labelled, linked, hoverable, or precisely placed |
| Evidence | Joined `verification` object after the four-step website hunt |
| Trading strength | `Open — unconfirmed` accepted for this **aggregate** claim only |

Reproduce with `node tools/pipeline/report-census-class.mjs`, and bake with
`pnpm bake:lights`. Confirmed on 14 August 2026, after the coordinate and
deduplication pass: **188 trading, 96 lit, 92 dark, all 188 mapped, 0
unconfirmed dark**.

**The publishable pair is 96 and 92.** It has been wrong twice, in two
different ways, and both are worth keeping on the record because the page's
whole claim is that its numbers can be trusted. The first draft put "96 of 166"
beside the canvas — 96 was lit across all trading businesses, not
lit-and-mapped, so the sentence and the subhead disagreed inside one document.
The corrected pair, 81 and 85 of 166, then lasted about an hour: the census
pass on 14 August recovered coordinates for 16 businesses whose position had
been dropped by an ingestion bug, folded 12 duplicate scrape rows into their
canonical records, and closed one business, leaving 188 trading rows with 100%
coordinate coverage.

The split is near-even — 96 to 92, 51.1% against 48.9% — so "most have one" is
as forbidden as "most have none". Note that the dark half was the larger one
before the fix and is the smaller one after; a page built on either phrasing
would now be wrong. This is the argument for the constraint below, made twice
in one day at our own expense.

Forbidden wordings, verbatim from the decision: *"most local businesses have no
website"*; any count over raw census rows; naming, labelling or making
hoverable any dark point.

**The count in prose and the lights in the picture must be derived from the same
array**, in the same build step, so the picture cannot say something the
sentence does not. This is `docs/sensory-system-plan.md` phase 3b and it is the
single most important build constraint on the page.

## What exists, and what this page is actually asking to be built

Worth stating plainly, because the ADR reads as though `Shore` shipped.

| Piece | State on 14 August 2026 |
|---|---|
| ADR 0004 (`Shore` at two scales) | Decided 5 August. **Not implemented.** No `Shore` component exists in `src/`. |
| `band` in `Footer.astro` | Not built. `Footer.astro` has no reference to it. |
| `MourneMotif.astro` | Still present and still shipping — four call sites, three of them prototype home studies. |
| `stage` | Gate open since 5 August. Not built. |
| The lights renderer | Proven as canvas — `demoLights()` in `src/site/scripts/showcase-demos.ts`, at 340px. Production ships SVG instead; see below. |
| The horizon data | Baked — `src/site/data/mourne-terrain.json`, 224×224 heights, AWS terrain tiles, 4 August. |
| The census classifier | Built — `tools/pipeline/census-class.mjs`, `report-census-class.mjs`. |

So this brief asks for one component, at two scales, plus one page. What has
never existed is the surface — and, as the grilling found, the *composition*:
the horizon and the lights have each been drawn, never together.

**Do this work in ADR order.** `band` ships first and retires `MourneMotif`,
because that is the decision of record and because it forces the horizon to be
house style rather than one page's trick. Ship `stage` first and the site
carries a true skyline on `/the-lights/` while an invented one still sits on
the homepage — the exact incoherence ADR 0004 rejected. `/the-lights/` is
`stage` given a room of its own, and it is the only room it gets: `/about/`
links to it in prose rather than carrying a second copy of the claim.

## The device: two registers, one page

Not a dashboard, not a filterable directory, not a data-viz page with a legend.
A **drawn horizon at dusk with the town beneath it**, in the same grey-and-lit
grammar as the fault walk's mocks and the `why-its-yours` plates — the studio's
existing hand, applied to real elevation and real coordinates.

But they are two registers stacked, not one picture, and the copy must not
claim otherwise. `skylineProfile()` takes the maximum height in each longitude
column: a silhouette, latitude collapsed, y = elevation. The lights are a plan
view, y = latitude. They share only the x-axis. Draw them as one image and a
reader parses a Dundrum trader as a business up the mountainside — and on a
page whose entire currency is credibility, a picture that quietly misstates the
geography is a bad thing to spend it on. So: **the horizon is a band above
(identity), the lights are a map below (evidence)**, and the subhead says "the
real Mourne skyline above, every mapped trader below" rather than the first
draft's "drawn on the real Mourne skyline".

Three depths, in this order down the page:

```
┌────────────────────────────────────────────────────────────┐
│  ARRIVE                                                    │
│    the Mournes, drawn from baked elevation.                │
│    the town below, unlit. one line of type.                │
│                                                            │
│  ██████████████████████████████████████████████            │
│    ╱╲    ╱╲╱╲      ╱╲                                      │
│   ╱  ╲__╱     ╲__╱   ╲___     ← identity. a silhouette.    │
│  ────────────────────────────────────────────              │
│   · ·  ·   ·  · ·   ·  ·  ·   ← evidence. a plan view.     │
│                                 every trader, dark         │
│                                                            │
│  STAND                                                     │
│    ninety-six lights come up, one at a time, over          │
│    about four seconds. ninety-two points stay grey.        │
│    the sentence sits beside the picture, from the          │
│    same array.                                             │
│                                                            │
│   ·✦· ✦  ·   ✦ ·✦   ·  ✦  ·                                │
│   "96 of 188 independent traders in Dundrum and Newcastle  │
│    have a website of their own. The other 92 have none     │
│    we could find. Reviewed 5 August 2026."                 │
│                                                            │
│  ASK                                                       │
│    one field. not who you are — what we hold, and how      │
│    to tell us it is wrong. see below.                      │
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
premises. Lights settle and hold — once, not on the twelve-second repeat the
demo runs.

## The interaction I wanted, why it is forbidden, and what replaces it

The obvious feature is: type your business, find your light, click through to a
diagnosis. **All of that is unpublishable and the brief has to say so before
anyone builds it.**

A search box over this dataset makes the dark set *queryable*. Anyone could
type a neighbour's name and learn that Mourne Made holds them as having no
website. Functionally that is labelling — it is the labelling rule defeated by
an input field rather than by a tooltip — and `docs/CONTEXT.md` is explicit: *a
dark business is never named, labelled, linked or made hoverable.* A lookup
that answers differently for lit and dark businesses is a hoverable dark point
with extra steps.

The first draft tried to save it by making every branch an admission about our
own record rather than a claim about the business. That is a real improvement
and it is still not enough: three answers that differ by lit and dark are a
two-valued oracle over the dark set, and the census names are themselves public
listings, so a hundred and eighty-eight requests reconstruct the map. Client-side
it would ship the name index the payload rule forbids; server-side it would be
a second serverless function whose only job is answering questions about
businesses that never asked to be asked about.

It is also the failure mode the audit already caught us in once. Before the
four-step hunt, the dark flag was **wrong about two times in three** on a
sample of sixteen — ten of them had a website the census had missed, including
a solicitor, a vet and an optician. That pass closed the gap for the aggregate,
but the lesson stands: our record of a business is not the business.

**What replaces it: a form that answers nothing.**

```
   If we hold something wrong about your business, tell us.
   ┌──────────────────────────────┐
   │ your business, and what's    │   [ send ]
   │ wrong                        │
   └──────────────────────────────┘
   email, if you'd like a reply — optional

   → every time, for everyone:
     "Thank you. We'll go and look again, and correct what we
      hold. We've had this wrong before."
```

The submitter names their own business — that is the point of the form. What
they never get back is an answer about anyone. One acknowledgement, no
branches, nothing to probe.

**A correction is evidence, not an instruction.** It triggers a re-run of the
four-step hunt on that row; the record changes because the evidence changed,
not because someone asked. Otherwise any stranger can flip any point —
including a competitor flipping a lit trader dark — and the dataset that
survived the audit becomes writable from a form. So the page promises to go and
look again, not to change the record on request. Removal is the exception, and
is honoured on its face.

The output of that box is still a **correction path into `verifications.json`**
— the same four-step method, opened to the people who know the answer best.
That is what makes the page civic rather than extractive, and it is the
strongest argument for building it at all: the dataset gets better because the
town uses the page.

**Correction submissions are not requests.** `lights-correction` joins the
`normaliseSource` allow-list in `api/request.ts` as an explicit non-claim
source, the mail arrives subject-prefixed `CORRECTION`, and the email field is
optional — requiring contact details would turn a civic form into lead capture.
Replying to one with a pitch would poison the whole mechanism. Write that in
the handler, not just in the brief.

## Five rules that keep this from being a shaming device

1. **No ranking, ever.** No league table, no per-town comparison, no
   "Newcastle is ahead of Dundrum". The moment the page ranks, it is a
   judgement, and half of the judged never asked to be measured.
2. **Dark is not a verdict.** Copy anywhere near the map says *no website of
   their own that we could find* — with the "that we could find" intact. It is
   longer and it is the truth.
3. **A business that asks to be removed is removed as soon as we read it**,
   lit or dark, no questions. Removal means out of the published dataset, out
   of the count's denominator, and out of outreach — not a hidden dot that is
   still counted. Their name is kept, unpublished, in
   `research/pipeline/removals.json` and applied by the normaliser, because
   without it the next census scrape silently puts them back. Say all of that
   on the page: the one uncomfortable clause is the proof the promise is real.
4. **Aggregate only, forever.** The rule survives improvements to the data. A
   future round with perfect confidence does not unlock naming, because the
   objection was never only about accuracy — it is about publishing a judgement
   on a business that never asked for one.
5. **No date, no page.** The count carries its review date in the same
   sentence, always. *Review date* is the day the whole set was last swept —
   5 August 2026. *Last corrected* is the day any single record last changed;
   corrections apply immediately and do move the count, so when the two differ
   the page shows both. There is no refresh cadence, and the page says there
   isn't one.

## Page structure

```
1  The horizon        Real Mourne skyline, town unlit, one line of type.
                      Nothing moves until the reader is at it.

2  The lights         96 arrive. 92 stay grey. The dated sentence sits
                      beside the picture, derived from the same array.
                      One line: points are placed to within about fifty
                      metres, on purpose.

3  What this counts   Trading business, mapped, reviewed — what each of
                      those words excludes, in plain prose. Graveyards,
                      walking trails, chain branches and the fire station
                      are not in this picture, and saying so is the
                      credibility of the whole page. Social-only counts
                      as none. Every trading business we hold is on the
                      picture — coordinate coverage is complete as of
                      14 August 2026, so nothing is counted that is not
                      drawn and nothing is drawn that is not counted.
                      Anyone who asked to be left out is not counted
                      at all.

4  How we got it      The four-step hunt, and the finding that our own
   wrong first        dark flag was wrong two times in three before it ran.
                      Also: the census was collected 17 July 2026, and 28
                      of the 96 lit points rest on that listing alone.
                      Links /what-we-got-wrong/. This paragraph is why the
                      number is believable.

5  Tell us we're      The correction form. One answer, for everyone.
   wrong

6  The lit ones       Ninety-six local traders' own sites, in prose, in no
                      order that implies ranking. The generous thing this
                      page can do without compromising the map.

7  Close              → /request/. Quieter than sections 5 and 6, and never
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

**This route ships no JavaScript at all.** The first draft assumed canvas
because `demoLights` is canvas, but production asks for no flicker, one settled
frame under `prefers-reduced-motion`, and a static SVG fallback — so the end
state is a static picture, and the only thing canvas buys is the four-second
arrival. So:

- The horizon is a `<polyline>` of the ~200-point baked profile. The 224×224
  grid stays a build-time input.
- The lights are `<circle>` elements, written at build time.
- The arrival is CSS: a fade with a per-circle `animation-delay`, dark settling
  first, lit coming up over ~4s, running **once** and holding.
  `prefers-reduced-motion` disables it in one rule.
- The fallback and the real thing are now the same artefact, so the degraded
  path cannot rot from never being exercised, and the page survives reader
  mode, a printout, and a councillor's screenshot.

**The points are displaced, and this is what actually enforces the privacy
rule.** The first draft said the rule was enforced by shipping `{ lat, lon,
lit }` and no names — "the single most important line in this section". It was
wrong. The coordinates in `businesses.json` carry seven decimal places;
centimetre accuracy. A dark point pasted into any map names the premises, and
from the premises the business. Dropping `name` does not anonymise anything, it
moves the lookup from our bundle to Google's.

So every point is offset by a seeded pseudorandom vector of up to ~50m and
rounded to 4 decimal places **in the build step**, so true coordinates never
enter the emitted page. Lit and dark are displaced identically — displace only
the dark and the displacement is itself the tell. Either the dots sit on real
premises and are identifiable, or they are anonymous and approximate; the map
is knowingly wrong about where everything is, and the page says so in a line.

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
- Ship `band` first; retire `MourneMotif` in the same commit. Its markup and
  its block in `place-identity.css` move into the prototype record so
  `prototypes/home/bay`, `window` and `product` still render as designed —
  repointing three dated studies at a component that did not exist when they
  were made would falsify the record. `Shore` becomes a sitewide dependency —
  treat a change to it as a change to every page.
- Derive the counts and the point array in one build step,
  `tools/pipeline/bake-lights.mjs`, from `census-class.mjs` output. Two code
  paths reading the same JSON is not the same guarantee. It emits the verified
  counts (96 lit, 92 dark of 188) for the caption beside the picture and
  supporting copy, with 100% coordinate coverage across the trading universe.
- Pin the arithmetic: assert `points.length === mapped`, `lit + dark ===
  mapped`, and every point carrying exactly `lat`, `lon`, `lit` — before
  writing, not eyeballed after.
- **Pin the forbidden wordings** in the existing pre-build idiom beside
  `check-prose-counts.mjs`: "most local businesses", and any count that does
  not carry a date within the same sentence.
- Pin the payload by **shape, not by string**. The first draft asked for a scan
  of `dist/` for business names; `/concepts/` pages name real local businesses
  throughout `dist/`, so that check fires constantly and would be disabled
  within a week. Instead `check-lights-payload.mjs` runs after `astro build`
  (the `build` script currently has no post-build stage) and asserts every
  emitted point carries nothing but numbers and a lit/dark class. No names in
  the point set means none can leak, and the check cannot false-positive.
- `/privacy/` gains a census section **before this route ships**, and the page
  links to it. Today that page describes only people who chose to contact the
  studio, while `businesses.json` holds names, addresses, phones and scored
  assessments for 373 places that opted into nothing. Publishing an aggregate
  from that file and inviting the town to write in about it makes its existence
  public, and someone will reasonably ask what else is held.
- The horizon is real elevation and needs no provenance entry — it is data, not
  a generated image. Nothing on this page is generated media.
- Keyboard and screen reader: the picture is `aria-hidden` decoration; the
  sentence, the exclusions, the lit list and the correction form carry the
  entire meaning in text.

Three commits, in this order: `Shore` + `band` with the motif retired; the bake
step and its checks; the `/the-lights/` route.

## Open questions

Four of the first draft's five are now closed in ADR 0005: the lookup is gone,
lit points are not clickable (they get a prose list instead), the Chamber gets
a link rather than a component, and there is no refresh cadence. What remains:

- **How does anyone find this page?** It is argued for as an inbound surface,
  but nothing above puts it in the nav, and `PLAN.md` §3 says the request path
  outranks it on any surface they share. A page nobody links to is a page
  nobody links *from*.
- **How fast is "we'll go and look again"?** The re-verification promise has no
  stated turnaround. A trader who writes in and sees nothing change for a
  fortnight has been told a soft version of nothing.
- **What re-runs the count, and who notices?** "No cadence, re-run when there's
  reason to" is right, but nothing defines a reason or watches for one. The
  most likely real trigger is a batch of corrections arriving.
- **Does the lit list belong on the page or behind a link?** It is generous and
  it is also the one element that lets someone diff the published lit set
  against the public census and infer the rest. That inference needs a dataset
  the reader does not have, which is why it survived — but it is the weakest
  seam left in the page.
