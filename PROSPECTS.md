# Prospects

Working state of the concept pipeline. The data source of truth is
`research/verifications.json` (merged into `src/data/businesses.json` by
`scripts/normalize-businesses.mjs`); this document is the human-readable
summary and must be updated whenever a prospect changes stage.

Snapshot: 20 July 2026 · 16 businesses verified · 10 shortlisted

## Pipeline stages

Every prospect moves through: **Shortlisted → Concept in progress → Concept
published → Contacted → Mock-up requested → Client**. A prospect can also be
**Assessed – not shortlisted** (kept for the knowledge, revisited on refresh).
Record every stage change in `research/verifications.json` and re-run the
normaliser.

Rules of the road:

- No concept work before a verification pass dated within the last month.
- Caveats recorded against a prospect must be resolved before outreach (e.g.
  confirm trading in person where online evidence is soft).
- Concepts stay clearly labelled independent and uncommissioned until a
  business engages (see PRODUCT.md).

## Shortlist — redesign showcases (current website, visible gap)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| Hotel Enniskeen | Newcastle | ~2012 hand-built template site; 2026 reviews, 4.4★ | Imagery-led country-house hotel site, responsive, Bookin1 deep links. Most dramatic contrast of the ten |
| Mourne Cycles | Newcastle | 2014 free-tier Wix brochure; filings current to Mar 2026 | Retail storefront: range, servicing/hire booking, Cyclescheme funnel |
| Donard Veterinary Centre | Newcastle | Listed domain dead; real site is a 2017 Divi build, no booking | Appointment requests, emergency info hierarchy, accessibility fixes |
| South Down Signs | Newcastle | Stale WordPress, content ~2023, no quote flow | Portfolio-led B2B site with quote-request funnel |
| The Buck's Head | Dundrum | Current site, but booking CTAs dead-end at phone/email | Reservations flow and menu UX — functional upgrade, not a rebuild |

## Shortlist — first-website showcases (no site, verified Maps listing)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| Scopers | Dundrum | No site; 4.6★, reviews to Jun 2026; Thursday-only hours | Chef-led brand single-pager with supper club events and booking |
| Cúpla | Dundrum | No site; café founded 2024, hygiene "Good" Jan 2025 | Mobile-first café page with bilingual Irish-language identity |
| The Tool Centre | Newcastle | No site; hardware retail + plant hire | Utilitarian trade site: hire prices, stock categories, hours |
| Kent Amusements | Newcastle | Facebook-only; active (Mar 2026 review, new VR) | Seasonal attraction site: attractions, hours, family offers |
| Newcastle Chamber of Commerce | Newcastle | No site; active into 2026, runs on Gmail | Civic hub: member directory, events, join page — community piece |

## Assessed — not shortlisted

Golf Links House and Avoca Hotel (sites recently rebuilt with booking),
Painted Earth (census missed its live e-commerce site), Dacara and Conlyn
House (fresh rebuilds; their gap is booking capability, a possible future
feature-upgrade case), Hutt Hostel (dated styling but working booking flow —
accommodation runner-up). Details and evidence in
`research/verifications.json`.

## Outstanding caveats before outreach

- **Scopers**: Thursday-only trading — confirm the owner's ambitions first.
- **Cúpla**: Companies House confirmation statement overdue at check — walk
  past or phone before investing design hours.
- **South Down Signs**: weakest trading recency evidence of the ten — confirm
  directly.
- Same-name collisions to keep out of concept content: Tool Centre
  (Newcastle-upon-Tyne shops), Kent Amusements (Dundalk), South Downs Signs
  (England), Newcastle Chamber of Commerce (at least eight worldwide).

## The repeatable cycle

Each round of work follows the same loop, and each loop makes the next one
cheaper because the knowledge lands in versioned files, not in heads:

1. **Select** from the ranked census (`/opportunities`, workbook).
2. **Verify** per the protocol in RESEARCH_METHOD.md; record evidence,
   corrections, and the shortlist/design-task decision in
   `research/verifications.json`.
3. **Normalise** (`node scripts/normalize-businesses.mjs`) so corrections,
   scores, and prospect fields flow into the dataset and summary.
4. **Build** the concept; publish under `/transformations/` with source
   disclosure.
5. **Record the outcome** — stage change, what the concept taught us, any new
   census corrections — back into `research/verifications.json` and this file.
6. **Update the docs** touched by what changed (this file always; README /
   RESEARCH_METHOD / DESIGN when the process itself moved).
