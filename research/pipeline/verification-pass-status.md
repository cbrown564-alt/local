# Verification pass — state and how to resume

5 August 2026. The census audit (`census-audit-2026-08-05.md`) held the `Shore`
`stage` scale until a full four-step verification pass over the trading
businesses is recorded. This file is where that pass stands.

## Where it stands

| | |
|---|---|
| Trading businesses in scope | 216 (was 229; closures and alias merges) |
| Verified records in `verifications.json` | 178 |
| Dark, mapped, trading, never independently confirmed | **0** (was 150 → 141 → 0) |

Steps 1 and 2 were scripted earlier the same day. Steps 3 and 4 — hunt missed
websites/socials, disambiguate same-named businesses — are **done for every
dark, mapped, trading row that was blocking the published count**. Lit rows that
were never in that blocking set remain lower priority.

## What is done

**Step 1 — fetch the listed site.** `tools/pipeline/probe-sites.mjs` over the
unverified listed domains, then over 54 domains found during steps 3–4
(`research/pipeline/probes-all-new.json`). Of those 54: 41 live brochure-only,
6 transactional, 4 almost no crawlable text, 3 dead or blocked.

**Step 2 — dated trading evidence.** `tools/pipeline/fsa-register.mjs` matched
94 rows to the FSA hygiene register (90 since 2024, 50 high confidence).

**Steps 3 and 4 — full dark/mapped pass.** 141 records staged in
`research/pipeline/staging-all.jsonl` and merged. Rough outcomes among those
141: about 59 gained a website the census missed; 7 confirmed closed
(including Rhiannon's Newcastle shop, Pizza Umami, Glenada, Bú, The Rock Pool);
others are open without an owned site, social/platform-only, or still
unconfirmed after search. Alias table extended so name corrections survive
re-normalise.

## How to resume (remaining lit / non-blocking work)

The blocking metric is cleared. If extending the pass to lit trading rows that
still lack a verification object:

1. Search "<name> <town> County Down" plus the street address.
2. Probe any new domain:
   `node tools/pipeline/probe-sites.mjs --in found.json --out probes.json`.
3. Check `fsa-matches.json` for a dated inspection.
4. Disambiguate, then append JSONL and
   `node tools/pipeline/merge-verifications.mjs --in staging.jsonl`
5. `node tools/pipeline/normalize-businesses.mjs`
6. `node tools/pipeline/report-census-class.mjs`

## Closures recorded this pass

- **Bú** — Bu Trading Limited dissolved 2026-03-03 (Companies House).
- **Downe Property Services** — closed (see record).
- **Glenada** — holiday centre sold; not in regular community use for 5+ years.
- **Pacha** — third-party closed listing only (status Closed with that caveat).
- **Pizza Umami** — voluntary winding-up 2024-12-31; in liquidation.
- **Rhiannon's Cakes and Bakes** — Newcastle shop closed December 2024; business
  continues elsewhere (Craigavon / Portadown).
- **The Rock Pool** — council seawater pool closed since ~2019; Heritage at Risk.

## Misclassification pass (same day, after steps 3–4)

Franchise/brand branches and wrong entity types were moved out of the
independent trading count via `tools/pipeline/census-class.mjs`:

| Moved to | Examples |
|---|---|
| Chain branch (27 → 34) | Brennan's/SPAR, Home Instead, Specs Xpress, Fix Auto, McKeevers, MediCare Thorntons, Herrons CFC, Around A Pound, Toals, Morelli's, Simon Brien Bradley, Emo Oil |
| Place | Rock Pool, Tollymore Forest |
| Public service | Newcastle Centre, Tropicana, Knockevin Early Years |
| Community | YMCA, Dromara & Drumgooland Credit Union |
| Infrastructure | Banking Hub |
| Trading (was false chain) | Royal County Down Golf Course |

Publishable trading universe after reclass: **201** (96 lit / 85 dark-and-mapped,
all verified). Unconfirmed dark remains **0**.

## Do not

- Publish a count or a map of dark points without an explicit confidence
  decision — the blocking verification gap is closed, but the audit still
  leaves that decision open.
- Read FSA absence as closure, or a fetch failure on one day as a dead site
  (`mackensbar.co.uk` DNS-failed the probe while still indexed and advertised).
- Write a first-hand "still open" into `verifications.json` as though the full
  protocol had run. Record first-hand *closures* only.
- Alias distinct premises that share a name (two Cookie Jars, Hale's vs Hales
  Wholesale).
