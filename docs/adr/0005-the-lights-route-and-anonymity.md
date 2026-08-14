# `/the-lights/` carries the census claim, and its map is deliberately imprecise

[ADR 0004](0004-shore-horizon-and-lights.md) adopted `Shore` at two scales and
unblocked `stage` for a dated aggregate count over anonymous lights. It placed
`stage` on `/about/` and left the surface unbuilt.
[`research/the-lights-brief.md`](../../research/the-lights-brief.md) then asked
for a route of its own. Grilling that brief on 14 August 2026 found that three
of its proposals would each, on their own, have published the identities of the
eighty-five dark businesses it promised never to name. This records what was
decided instead.

Nothing here reopens the confidence decision
(`research/pipeline/census-confidence-decision-2026-08-05.md`). It constrains
only how that count and those points may be drawn.

## The publishable pair, corrected

The brief's canvas sentence read "96 of 166 mapped independent traders … have a
website of their own." **96 is lit across all 201 trading businesses, not
lit-and-mapped.** Reproduced 14 August 2026:

| Set | Total | Lit | Dark |
|---|---|---|---|
| Trading | 201 | 96 | 105 |
| Trading ∩ mapped — **the publishable universe** | **166** | **81** | **85** |
| Trading, unmapped | 35 | 15 | 20 |

The dark half is the larger one (85 of 166, 51.2%), so "most have one" is as
forbidden as "most have none". Published copy states the lit half as its
subject and the gap as the remainder, keeps the word *mapped*, and carries the
review date in the same sentence.

Evidence is not evenly spread and the page says so: all 85 dark-and-mapped rows
carry a verification object from the four-step hunt; **18 of the 81 lit rows do
not**, and rest on the census scrape of 17 July 2026 alone. The asymmetry is
acceptable because the risky half is the evidenced half — a wrongly-lit point
credits a business with a website it does not have, which is correctable and
not a judgement.

## Decided

**`stage` appears on exactly one route, `/the-lights/`.** This supersedes ADR
0004's placement of `stage` on `/about/`, which links to it in prose instead.
Two surfaces carrying one claim doubles the pinning surface and guarantees
drift the first time a correction lands. It also changes what the claim means:
on its own route the page is about the town, and is therefore linkable by the
Chamber, a paper or a councillor; on `/about/` the same 85 points become a
supporting argument for hiring the studio. `/about/` still gains the horizon,
because `band` is in every footer.

**The horizon and the lights are two registers, not one picture.**
`skylineProfile()` takes the maximum height per longitude column — a
silhouette, latitude collapsed, y = elevation. The lights are a plan view, y =
latitude. Stacked as one image they share only the x-axis, and a reader parses
a Dundrum trader as a business up the mountainside. The horizon is drawn as a
band above (identity); the lights are a map below (evidence); no copy claims
the lights sit on the skyline.

**Published coordinates are displaced.** Every point is offset by a seeded
pseudorandom vector of up to ~50m and rounded to 4 decimal places, in the build
step, so true coordinates never enter `src/site/data/lights.json` or the
bundle. Lit and dark are displaced identically. The page states the
displacement in one line near the map.

**No lookup.** The correction path is a single nameless field posting to
`api/request.ts` with a distinct `source`, acknowledged identically for
everyone. Correction submissions are not leads and are never answered with a
pitch.

**No clickable points.** Generosity toward the lit traders takes the form of a
prose list of their sites below the map, in no order that implies ranking.

**Removal means erasure plus suppression.** A business that asks is removed
from the published dataset, the count's denominator and the outreach pool.
Its name is retained, unpublished, in `research/pipeline/removals.json` and
applied by `normalize-businesses.mjs`, because without it the next census
scrape silently restores the point.

**Two dates, two meanings.** *Review date* is the day the whole set was last
swept — 5 August 2026 — and rides in the same sentence as the count. *Last
corrected* is the day any single record last changed. Corrections apply
immediately and do move the count, so when the two differ the page shows both.
There is no refresh cadence, and the page says there isn't one.

## Alternatives rejected

**The three-branch lookup.** The brief proposed a name field answering
"we hold a site for you" / "we hold none" / "no match". Every branch is phrased
as an admission about the dataset, which is genuinely better than a tooltip —
but it is still a two-valued oracle over the dark set, and 166 requests
reconstruct the map. It fails the brief's own test: *a lookup that answers
differently for lit and dark businesses is a hoverable dark point with extra
steps.* Client-side it would ship the name index the payload rule forbids;
server-side it would need a second serverless function whose whole purpose is
answering questions about businesses that never asked to be asked about.

**Exact coordinates with the `name` field dropped.** The brief called this the
privacy rule "enforced by the data shape rather than by the UI". The
coordinates in `businesses.json` carry seven decimal places — centimetre
accuracy. A dark point pasted into any map names the premises, and from the
premises the business. Dropping `name` does not anonymise the payload; it moves
the lookup from our bundle to Google's. Either the dots sit on real premises
and are identifiable, or they are anonymous and approximate. The trade is
unavoidable, and an imprecise map is worth more than a precise one we would
have to take down.

**Displacing only the dark points.** The displacement would itself be the tell:
a point matching a known premises exactly is lit, an offset one is dark.

**A string scan over `dist/` for business names.** The brief asked for a check
failing on any business `name` appearing in the lights payload. `/concepts/`
pages name real local businesses throughout `dist/`, so the scan fires
constantly and would be disabled within a week. The enforceable form is
shape-based: `check-lights-payload.mjs` parses the emitted payload and asserts
every value is a number or boolean. With no strings in the array, no name can
be in it, and the check cannot false-positive.

## Consequences

- One build step, `tools/pipeline/bake-lights.mjs`, derives the count and the
  point array from the same filtered array and asserts the arithmetic before
  writing: `points.length === mapped`, `lit + dark === mapped`, and every point
  carrying exactly the keys `lat`, `lon`, `lit`.
- `pnpm build` gains a post-build stage; it currently has none.
- The map is knowingly wrong about where every business is, by up to ~50m. It
  is an impression of the town, and the page says so.
- `MourneMotif.astro` leaves `src/site/components/` when `band` ships, as ADR
  0004 requires. Its markup and its block in `place-identity.css` move into the
  prototype record so `prototypes/home/bay`, `window` and `product` still
  render as they were designed. Repointing those studies at `Shore` was
  rejected: a dated study should not show a component that did not exist when
  it was made.
- Three commits, in this order: `Shore` + `band` with the motif retired; the
  bake step and its checks; the `/the-lights/` route.
