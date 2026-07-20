# Mourne & Main

A working Astro prototype for a local digital studio serving Dundrum and Newcastle, County Down. The first complete loop lets a visitor browse a concept transformation, compare the current and proposed opening screens, reveal the design reasoning, and submit a no-obligation mock-up request.

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

- `/` — clean public landing page
- `/transformations/` — concept index
- `/transformations/castle-farm/` — full before/after comparison and source disclosure
- `/about/` — local and community commitment
- `/request/` — request form with error and success states
- `/concepts/castle-farm/` — standalone proposed Castle Farm opening screen used in the comparison

The request form is intentionally local-only in this prototype and does not transmit data. Concept work is labelled as independent and uncommissioned.

## Research artifacts

- `src/data/businesses.json` — consolidated public-source dataset (379 records)
- `research/verifications.json` — accumulated per-business verification knowledge: dated trading evidence, census corrections, shortlist decisions and design tasks
- `PROSPECTS.md` — human-readable pipeline state: current shortlist, caveats, and the repeatable select → verify → normalise → build → record cycle
- `RESEARCH_METHOD.md` — source and geographic methodology, plus the verification protocol
- `scripts/research-businesses.mjs` — repeatable discovery pipeline
- `scripts/normalize-businesses.mjs` — deterministic deduplication, enrichment, verification merge and scoring; re-run after editing `research/verifications.json`
- `spreadsheet-work/build-business-workbook.mjs` — workbook builder and checks

