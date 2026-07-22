# Mourne & Main

A working Astro prototype for a local digital studio serving Dundrum and Newcastle, County Down. The first complete loop lets a visitor browse a concept transformation, compare the before and after opening screens, reveal the design reasoning, and submit a no-obligation mock-up request.

## Run locally

```powershell
pnpm install
pnpm dev
```

Production check:

```powershell
pnpm build
```

## Main routes

- `/` — product-stage landing page (before/after first; place belonging next)
- `/prototypes/home/` — homepage alternatives explored before shipping Product Stage
- `/transformations/` — concept index
- `/transformations/cupla/` — first-website comparison for Cúpla
- `/transformations/scopers/` — first-website comparison for Scopers
- `/transformations/bucks-head/` — before/after comparison for The Bucks Head
- `/transformations/donard-veterinary/` — before/after comparison for Donard Veterinary Clinic
- `/transformations/mourne-cycles/` — before/after comparison for Mourne Cycles
- `/transformations/hotel-enniskeen/` — before/after comparison for Enniskeen Country House Hotel
- `/transformations/castle-farm/` — before/after comparison for Castle Farm Fresh Produce
- `/about/` — local and community commitment
- `/request/` — request form with error and success states
- `/concepts/cupla/`, `/concepts/scopers/`, `/concepts/bucks-head/`, `/concepts/donard-veterinary/`, `/concepts/mourne-cycles/`, `/concepts/hotel-enniskeen/`, `/concepts/castle-farm/` — standalone proposed opening screens used in the comparisons

The request form is intentionally local-only in this prototype and does not transmit data. Concept work is labelled as independent and uncommissioned.

## Research artifacts

- `src/data/businesses.json` — consolidated public-source dataset (379 records)
- `research/verifications.json` — accumulated per-business verification knowledge: dated trading evidence, census corrections, shortlist decisions and design tasks
- `PROSPECTS.md` — human-readable pipeline state: current shortlist, caveats, and the repeatable select → verify → normalise → build → record cycle
- `RESEARCH_METHOD.md` — source and geographic methodology, plus the verification protocol
- `scripts/research-businesses.mjs` — repeatable discovery pipeline
- `scripts/normalize-businesses.mjs` — deterministic deduplication, enrichment, verification merge and scoring; re-run after editing `research/verifications.json`
- `scripts/capture-concept-screens.mjs` — matched before/after screenshots via system Chrome; run `pnpm build && pnpm preview` first, then `node scripts/capture-concept-screens.mjs <slug>`
- `spreadsheet-work/build-business-workbook.mjs` — workbook builder and checks

