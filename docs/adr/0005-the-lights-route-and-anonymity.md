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

Investigation on 14 August 2026 closed the coordinate and deduplication gaps in
the census. The original 35 "unmapped" trading rows broke down into:
- 16 businesses (15 lit, 1 dark) whose coordinates were embedded in their
  `googleMapsUrl` place parameter (`!3d...!4d...`) but dropped by an ingestion
  bug in `research-businesses.mjs`;
- 12 duplicate dark listings created by minor spelling variants in the directory
  scrape, now canonicalised into their OpenStreetMap/verified rows via aliases;
- 1 closed business (`Vanilla`, dissolved and succeeded by Cafe 67);
- 6 independent Newcastle businesses (5 physical premises on Main Street /
  Central Promenade and 1 mobile trade), now verified and accurately geocoded.

With deduplication and coordinate recovery applied, the trading universe is 188
businesses (96 lit, 92 dark), and 100% of the trading universe is mapped:

| Set | Total | Lit | Dark |
|---|---|---|---|
| Trading (and mapped) — **the publishable universe** | **188** | **96** | **92** |
| Trading, unmapped | 0 | 0 | 0 |

The split is near-even (96 lit to 92 dark, 51.1% vs 48.9%), so "most have one"
is as forbidden as "most have none". Published copy states the lit count as its
subject and the gap as the remainder, and carries the review date in the same
sentence.

Evidence is not evenly spread and the page says so: all 92 dark-and-mapped rows
carry a verification object from the four-step hunt; **28 of the 96 lit rows do
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
Chamber, a paper or a councillor; on `/about/` the same 92 points become a
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
pseudorandom vector of **25–50m** and rounded to 4 decimal places, in the build
step, so true coordinates never enter `src/site/data/lights.json` or the
bundle. The floor is the part that matters: sampling uniformly over a disc,
as first specified, leaves about one point in a hundred within 5m of its own
premises — one or two businesses published at their front door, chosen by a
seed. The offset is drawn from an annulus instead, so nothing lands where it
started. Lit and dark are displaced identically. The page states the
displacement in one line near the map.

**The picture is inline SVG, generated at build time, and this route ships no
JavaScript.** The horizon is a `<polyline>` of the baked profile; the lights
are `<circle>` elements at displaced coordinates; the arrival is a CSS fade
with a per-circle `animation-delay` written at build time, running once and
holding. `prefers-reduced-motion` disables it in one rule. Canvas was inherited
from `demoLights`, whose sequence restarts on `t % 12` — a loop production had
to cut anyway, leaving rAF redrawing one unchanging frame. Making the picture
markup collapses the no-JS fallback and the real thing into one artefact, so
the degraded path cannot rot from never being exercised, and the page survives
reader mode, a printout and a screenshot. The 25KB sensory budget is untouched
by this route. `band` is a static polyline on the same reasoning: ADR 0004
already found it has nothing left to animate.

**No lookup.** The correction path is an answer-free form posting to
`api/request.ts` with a distinct `source`. The submitter names their own
business — that is the point of the form — but the page returns the same
acknowledgement to everyone and never reveals what is held about anyone.
Correction submissions are not leads and are never answered with a pitch:
`lights-correction` joins the `normaliseSource` allow-list as an explicit
non-claim source, its mail arrives subject-prefixed `CORRECTION`, and the email
field is optional — requiring contact details would turn a civic form into lead
capture.

**A correction is evidence, not an instruction.** It triggers a re-run of the
four-step hunt on that row; the record changes because the evidence changed,
not because someone asked. Otherwise any stranger can flip any point, including
a competitor flipping a lit trader dark, and the dataset that survived the
audit becomes writable from a form. The page therefore promises to go and look
again, not to change the record on request. Removal is the exception and is
honoured on its face: nobody asks to be taken off a map they are not on, and
honouring a false removal costs nothing.

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
but it is still a two-valued oracle over the dark set, and 188 requests
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

**The lights as a component inside the Chamber prototype.** That prototype
lists named real businesses. A named member directory beside a coverage map is
joinable by anyone with both pages open, and every rule above falls to
adjacency without one of them being broken explicitly. The pitch is also only
valuable in its forbidden form: a Chamber that can see *who* is dark has a
recruitment list, and a Chamber that can see "85 of 166" learns nothing a
public page would not tell it. `/the-lights/` is a link from that prototype.
A coverage view for a membership body is a separate product with its own
consent basis — their member list, their infrastructure, behind a login,
covering only businesses that consented by joining. The census gives us consent
from nobody; membership gives it from members.

**Displacing only the dark points.** The displacement would itself be the tell:
a point matching a known premises exactly is lit, an offset one is dark.

**A string scan over `dist/` for business names.** The brief asked for a check
failing on any business `name` appearing in the lights payload. `/concepts/`
pages name real local businesses throughout `dist/`, so the scan fires
constantly and would be disabled within a week. The enforceable form is
shape-based: `check-lights-payload.mjs` parses the emitted picture and asserts
every point carries nothing but numbers — `cx`, `cy` and a lit/dark class. With
no names anywhere in the emitted markup's point set, none can leak, and the
check cannot false-positive.

## Consequences

- One build step, `tools/pipeline/bake-lights.mjs`, derives the count and the
  point array from the same filtered array and asserts the arithmetic before
  writing: `points.length === mapped`, `lit + dark === mapped`, and every point
  carrying exactly the keys `lat`, `lon`, `lit`. It emits the verified counts
  (96 lit, 92 dark of 188) for the caption beside the picture and supporting
  copy, with 100% coordinate coverage across the trading universe.
- `pnpm build` gains a post-build stage; it currently has none.
- The map is knowingly wrong about where every business is, by up to ~50m. It
  is an impression of the town, and the page says so.
- `MourneMotif.astro` leaves `src/site/components/` when `band` ships, as ADR
  0004 requires. Its markup and its block in `place-identity.css` move into the
  prototype record so `prototypes/home/bay`, `window` and `product` still
  render as they were designed. Repointing those studies at `Shore` was
  rejected: a dated study should not show a component that did not exist when
  it was made.
- `/privacy/` gains a census section before this route ships, and the page
  links to it. Today that page describes only people who chose to contact the
  studio, while `businesses.json` holds names, addresses, phones and scored
  assessments for 373 places that opted into nothing — personal data, for the
  sole traders among them. Publishing an aggregate from that file, and inviting
  the town to write in about it, makes its existence public and someone will
  reasonably ask what else is held. The section states what is held, that the
  basis is legitimate interests in researching the trade, that only aggregates
  and displaced anonymous points are published, and that removal is honoured on
  request and then kept unpublished so a future update cannot undo it.
- Three commits, in this order: `Shore` + `band` with the motif retired; the
  bake step and its checks; the `/the-lights/` route.
