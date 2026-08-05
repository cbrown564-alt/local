# Census audit — can we publish a count?

5 August 2026. Commissioned by ADR 0004, which held the `Shore` `stage` scale
until the census could support a published number. This is the answer: **it
cannot, and the gap is much wider than expected.**

## What was measured

`src/site/data/businesses.json` holds 379 rows from the 17 July 2026 census.
`tools/pipeline/census-class.mjs` now classifies every row, because a census row
is a *listed place*, not a business (see `docs/CONTEXT.md`):

| Class | rows | lit | dark | mapped |
|---|---|---|---|---|
| **Trading business** | **229** | 51 | 178 | 190 |
| Place, not a business | 59 | 20 | 39 | 59 |
| Community organisation | 29 | 3 | 26 | 28 |
| Chain branch | 27 | 12 | 15 | 27 |
| Public service | 17 | 6 | 11 | 15 |
| Infrastructure | 13 | 6 | 7 | 10 |
| Needs review | 4 | 0 | 4 | 0 |
| Closed | 1 | 0 | 1 | 1 |

That alone corrects the headline: not "281 of 379 have no website" but **155
trading businesses, placeable on a map, flagged dark** — of which **150 had
never been independently confirmed**.

Reproduce with `node tools/pipeline/report-census-class.mjs`.

## The sample

A systematic sample of 25 was drawn from those 150 (sorted by town then name,
every 6th row). Sixteen were checked before the result became unambiguous and
further checking stopped.

**Method, stated plainly:** one targeted web search per business, matching on
name plus street address in Newcastle or Dundrum. This is *not* the four-step
verification in `docs/RESEARCH_METHOD.md` — no direct site fetch, no dated
trading evidence, no Companies House check. It is sufficient to answer "did the
census miss a website" and insufficient to correct the dataset. The URLs below
are leads for a full pass, not verified corrections.

### Had a website the census missed — 10 of 16

| Business | Website found |
|---|---|
| Arley Guest House, Dundrum | `arleyhousedundrum.co.uk` (trades as **Arley House**) |
| Bear Necessities, Newcastle | `bearnecessitieskids.co.uk` |
| Chatterbox Day Nursery | `chatterboxkids.co.uk` |
| Downe Veterinary Clinic | `downevets.com` |
| Home Instead Care Agency | `homeinstead.co.uk/down-lisburn/` |
| Seamus Delaney Solicitors | `seamusdelaneylaw.com` (trades as **Seamus Delaney Law**) |
| McCready Shoe Style | `mccreadysfootwear.com` (trades as **McCready Footwear**) |
| Rhiannon's Cakes and Bakes | `rhiannonscakesandbakes.co.uk` |
| Pizza Palazzo | `pizzapalazzo.com`, with online ordering |
| Specs Xpress | `specs-xpress.com` |

### Genuinely without a website of their own — 3 of 16

- **Terry King & Sons** — directory listings only.
- **Joyland Amusement Centres** — directory listings only.
- **Vintage etc** — Instagram and Facebook only. This is *social page only*, a
  different census status from *no website found*.

### Unresolved — 3 of 16

- **Black Box Donuts** — Facebook, Instagram and national press, no own domain
  located. Now a wholesale brand supplying 50+ stores.
- **Mourne Magic House** — sold through Booking.com and LateRooms; no own site
  confirmed either way.
- **Newcastle Footcare** — nothing found under this name. The podiatry clinic at
  that address trades as *Lower Limb*. Name may be stale or wrong.

## Findings

**1. The dark flag is wrong about two times in three.** Ten of sixteen sampled
businesses have a website the census missed. Even reading every unresolved case
as genuinely dark, at most 6 of 16 are dark — so the true figure behind the
"155 dark" headline is plausibly nearer 50 than 155. We do not know which 50.

**2. The census also overstates trading.** Rhiannon's Cakes closed its Newcastle
shop in December 2024, twenty months before the census recorded it. One in
sixteen, in a sample never selected for closure risk.

**3. Entity types are wrong in both directions.** Home Instead is a national
franchise and Specs Xpress a two-branch NI chain; both were typed as
independents. `census-class.mjs` catches the ones with a chain keyword in the
name and cannot catch these.

**4. Some names are corrupt.** "Cryral Clean" returns nothing at all;
"Art Gallery and Picture Framining" [sic] is in the dataset as typed. A wrong
name cannot be verified and cannot be published.

## Conclusion

**No count may be published from this census, and no map of dark points may be
drawn from it.** A picture of 155 dark premises would be wrong about roughly a
hundred of them, each one a real business in a town of 7,500 people, several of
whom have perfectly good websites we simply failed to find.

The `Shore` `stage` scale stays held. The `band` scale is unaffected — it
carries the horizon only and makes no claim.

## What would unblock it

A full verification pass over the 229 trading businesses using the four-step
method in `docs/RESEARCH_METHOD.md`, recorded in
`research/pipeline/verifications.json` so the normaliser merges the corrections.
That is roughly 200 businesses at four checks each.

Only then is the confidence question worth asking: what proportion of the set
must be independently confirmed before a number and a map of locations may be
published? That decision is deliberately left open here — this audit exists to
show that the current proportion, **7 of 155**, is not a candidate answer.

## Progress against that (5 August 2026, later the same day)

Steps 1 and 2 of the four are now scripted and have been run over the whole
set — see `verification-pass-status.md` for state and
`docs/RESEARCH_METHOD.md` for what the tools may and may not be read as saying.
Steps 3 and 4 stand at 9 of 204, and six of those nine had a website the census
called absent: the two-in-three finding above holds on a fresh sample.

Unconfirmed dark rows: **150 → 141**. The conclusion is unchanged — no count,
no map — and the `Shore` `stage` scale stays held.

## Progress against that (5 August 2026, steps 3 and 4 complete)

Steps 3 and 4 were run over every dark, mapped, trading row. Unconfirmed dark
rows: **150 → 141 → 0**. About three in five of that blocking set gained a
website the census had missed, matching the sample's direction. Seven closures
were recorded. Trading universe after merges and closures: 216 rows, of which
107 lit and 88 dark-and-mapped — all of those dark points now carry a
verification object.

The audit's original conclusion — that a count must not be published from the
*unverified* census — is satisfied for the blocking set. Whether a number and
map may now be published is the confidence question the audit left open; that
decision is still not taken here.

Franchise and entity-type misclassifications flagged in the sample and the
verification pass were corrected the same day — see
`verification-pass-status.md`. Trading universe after reclass: **201** rows
(96 lit, 85 dark-and-mapped, all of those verified).

## Confidence decision (same day)

Taken explicitly in `census-confidence-decision-2026-08-05.md`: **website-status
bar**. Shore `stage` may publish a dated aggregate count and anonymous lights
for dark ∩ mapped ∩ Trading rows that carry a verification object. Current
figure **85 of 166** (~half) — never “most”. The audit’s hold on publishing
from the *unverified* census stands; the verified set under that bar is now
cleared to ship.
