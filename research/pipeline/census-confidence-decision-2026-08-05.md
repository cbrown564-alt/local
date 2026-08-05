# Census confidence decision — website-status bar

5 August 2026. Closes the question left open by
`census-audit-2026-08-05.md` and ADR 0004: what level of confidence is required
before Shore `stage` may publish a number and a map of dark locations.

## Decision

**Website-status bar.** Shore `stage` may publish a dated aggregate count and
anonymous lights for trading businesses whose website status was checked in the
four-step pass recorded in `verifications.json`.

| Rule | Value |
|---|---|
| Universe | `censusClass === Trading business` only |
| Count | Dated fraction of **mapped** trading businesses with no owned site |
| Current figure | **85 of 166** (~half) — never “most” |
| Map | Anonymous lights at those dark ∩ mapped coordinates |
| Dark identity | Never named, labelled, linked, or hoverable |
| Evidence | Joined `verification` object after the website hunt |
| Trading strength | `Open — unconfirmed` / `Unconfirmed` accepted for this **aggregate** claim only |

Reproduce the numbers with `node tools/pipeline/report-census-class.mjs`.

## Why this bar, not a stronger one

The audit’s failure mode was false darkness: the census missed owned websites.
Steps 3 and 4 of the verification pass were run over every dark, mapped,
trading row specifically to close that failure. Unconfirmed dark-mapped rows
fell **150 → 0**.

A stronger bar — only points with solid `tradingStatus: Open` — would shrink
the map for a residual risk the aggregate claim does not need to deny. Weak
trading confirmation remains a **pitch gate** (dead-site and OSM-only still
need trading evidence before outreach); it is not a publish gate for anonymous
lights.

## Wording

Allowed shapes:

- “85 of 166 mapped independent traders here have no website of their own
  (reviewed [date]).”
- “About half of the mapped independent traders we reviewed have no site of
  their own.”

Forbidden:

- “Most local businesses have no website.”
- Any count over raw census rows.
- Naming, labelling, or making hoverable any dark point.

The count in prose and the lights on the canvas must be derived from the same
array so they cannot disagree (`docs/sensory-system-plan.md` phase 3b).

## What this does not unlock

- Building Shore `stage` itself — gate is open; implementation is still phase 3b.
- Pitching or shortlisting from the dark set without the usual Select gates.
- Publishing social-only / platform-only as the same claim as “no website”
  without saying so when a surface needs that distinction.
- Treating lit or unmapped trading rows that still lack a verification object
  as part of this claim (they are out of the mapped dark set).

## Related

- Pass state: `verification-pass-status.md`
- Audit that held the gate: `census-audit-2026-08-05.md`
- ADR: `docs/adr/0004-shore-horizon-and-lights.md`
- Method: `docs/RESEARCH_METHOD.md`
