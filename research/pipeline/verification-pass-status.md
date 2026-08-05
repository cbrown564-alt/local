# Verification pass — state and how to resume

5 August 2026. The census audit (`census-audit-2026-08-05.md`) held the `Shore`
`stage` scale until a full four-step verification pass over the 229 trading
businesses is recorded. This file is where that pass stands.

## Where it stands

| | |
|---|---|
| Trading businesses in scope | 229 |
| Verified records in `verifications.json` | 37 |
| Dark, mapped, trading, never independently confirmed | **141** (was 150) |

Steps 1 and 2 are **automated and complete in evidence terms** for the whole
set. Steps 3 and 4 are **9 of 204 done** and are the remaining work.

## What is done

**Step 1 — fetch the listed site.** `tools/pipeline/probe-sites.mjs` has been
run over all 32 unverified rows carrying a listed domain, plus every domain
found by search since. Of the 32: 4 dead, 1 HTTP-only, 1 unreadable, the rest
live. It found `hamillharty.com` now serving an unrelated consultancy,
`blueclarity.co.uk` redirecting to `whptelecoms.com`, and Kingdom Tattoo's
domain on a Wix `ConnectYourDomain` 404.

**Step 2 — dated trading evidence.** `tools/pipeline/fsa-register.mjs` matched
94 of the 229 rows to the FSA hygiene register, 90 inspected since 2024, 50 at
high confidence. This is dated official evidence for most of the food trade and
costs one command to refresh.

**Steps 3 and 4 — 9 businesses**, recorded in `verifications.json`. Six of the
nine had a website the census called absent, holding the audit's two-in-three.

## How to resume

The remaining 195 need one targeted web search each — by name *and* address,
because most missed sites are missed through a name variant. For each:

1. Search "<name> <town> County Down" plus the street address.
2. Add any domain found to a JSON file and run
   `node tools/pipeline/probe-sites.mjs --in found.json --out probes.json`.
3. Check `fsa-matches.json` for a dated inspection for that row.
4. Confirm it is the right business — same-named businesses elsewhere are the
   standing trap — then append one JSON object per line to a staging file.
5. `node tools/pipeline/merge-verifications.mjs --in staging.jsonl`
6. `node tools/pipeline/normalize-businesses.mjs`
7. `node tools/pipeline/report-census-class.mjs` to watch the unconfirmed count.

Append as you go. The merge is idempotent on town+name, so re-running is safe
and a business re-checked later updates rather than duplicating.

### Prioritising, if the whole set is too much

The 141 dark/mapped/unconfirmed rows are the only ones blocking the published
count and map. Rows already lit need verification least. A random sample of the
141, verified fully, would also support a stated confidence interval on the
dark rate — which is the question the audit says is worth asking *after* the
proportion is known, and is a legitimate answer to it.

## Leads already found, not yet verified

From the audit's sample, probed but without steps 2–4 completed:
`chatterboxkids.co.uk`, `downevets.com`, `seamusdelaneylaw.com`,
`mccreadysfootwear.com`, `rhiannonscakesandbakes.co.uk`, `pizzapalazzo.com`,
`specs-xpress.com`, `homeinstead.co.uk/down-lisburn/`.

Two need care: Rhiannon's Newcastle shop closed in December 2024 while the site
carries 2026 content, so the *business* and the *census row* have different
statuses. Home Instead and Specs Xpress are chains typed as independents.

One audit unknown is now resolved as a lead: the FSA register shows **Black Box
Bakery** inspected 2026-03-21 at the same postcode and street number as the
Primal Coffee row, which is where Black Box Donuts should be looked for.

## Do not

- Publish a count or a map of dark points from the current data. The audit's
  conclusion stands until this pass is much further along.
- Read FSA absence as closure, or a fetch failure on one day as a dead site.
- Write a first-hand "still open" into `verifications.json` as though the full
  protocol had run. Record first-hand *closures* only.
