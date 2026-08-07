# Local business research method

## Scope

The initial census covers named public listings within a 2.2 km radius of Dundrum village centre and a 3.5 km radius of Newcastle town centre. Where those circles overlap, an OpenStreetMap feature is assigned to the nearer centre.

This is a source-bounded public-listing census. It cannot prove that every trading business has registered online, remains active, or publishes contact details. Missing fields are retained as missing; they are never inferred.

## Discovery sources

1. OpenStreetMap Overpass: named `shop`, `amenity`, `office`, `craft`, `tourism`, `leisure`, and `healthcare` features within the two radii.
2. Google Maps: the complete visible result list returned by one broad “businesses in [town], County Down” search per town on 17 July 2026.
3. Newcastle County Down local directory: visible Food, Pubs/Clubs, Accommodation, Shops, and Services category listings.

Each record stores its source URLs and the research date. A generated Google Maps search URL is labelled separately from a verified direct Maps listing.

## Contact and digital records

Public website, email, phone, address, social profile, and location fields are taken from the named source. Website state is classified as no site found, social-only, HTTP, HTTPS, or needs review.

Google ratings and review counts are blank unless directly observed on the Maps listing. A blank metric means “not collected”, not zero.

## Publish bar for aggregate lit/dark claims

Shore `stage` and any public count of darkness use the **website-status bar**
recorded in `research/pipeline/census-confidence-decision-2026-08-05.md`:
Trading businesses only; dated fraction of mapped rows with no owned site;
anonymous lights; never “most” when the figure is about half; never raw census
rows. Confirmation means a joined `verification` object after the four-step
pass — not a leftover confidence string.

## Selection model (gap class)

Shortlisting is a human decision (`docs/CONTEXT.md`). The priority score is a
**secondary sort inside a filtered bucket**, not the selector.

**Selector = gap class → composition → gates → dated selection record.**

| Gap class | Signal | Pitch shape |
|---|---|---|
| Dead site | Listed domain DNS/TLS/builder-dead; business still trading | Restore / replace |
| First website | No owned site; not platform-booked | First owned surface |
| Platform / social only | Bookings or presence on Instagram/Booksy/etc., no owned site | Own the handoff |
| Redesign | Live owned site, dated or weak | Rebuild identity/structure |
| Journey / feature | Maintained site with a specific capability gap | One journey fix |

**Pre-select gates:** Trading class only; closed zeroed; alias-deduped; not
already published/contacted/held without unblock; dead-site and OSM-only need
trading evidence before selection; probe listed domains (one-day fetch failure
is not “dead”).

**Composition** is chosen per batch and written into a dated
`research/pipeline/batch-*-selection.md` (town mix, category novelty, gap mix).

## Priority score (triage aid only)

Kept as a within-bucket sort. Not a claim about revenue or ownership, and not
a shortlist threshold.

- Digital need: missing website, social-only presence, HTTP-only website, missing public email/phone, and an unverified Maps record.
- Payment likelihood: organisation type, category fit for visual digital work, and evidence of established public contact channels.
- Priority score: 55% digital need and 45% payment likelihood.
- Community opportunity: charities, clubs, public services, public attractions, and organisations with high need but lower estimated payment likelihood.

Ownership is marked “unverified” unless a source explicitly identifies it. No owner names, personal emails, revenue, or affordability assumptions are invented.

## Verification stage

Before any concept work or outreach, a candidate receives a per-business
verification pass (first pass: 20 July 2026, 16 businesses):

1. Fetch the listed website directly: HTTPS validity, redirects, CMS/builder
   and staleness signals (generator metas, copyright years, content dates),
   and whether real booking/ordering exists or the site is brochure-only.
2. Search dated public sources for trading evidence: review dates, Companies
   House filings, food-hygiene ratings, council and tourism listings, job
   adverts. Prefer evidence with a visible date.
3. Hunt for websites the census missed and for social profiles.
4. Disambiguate same-named businesses elsewhere before accepting any result.
5. Record **which of the ten faults** the public surface actually shows, with
   dated evidence for each. See "Fault taxonomy" below. This is the step that
   turns a gap class into a pitch sentence, and it replaces deriving the three
   case-study notes from scratch at design time.

Findings are recorded in `research/pipeline/verifications.json`: dated trading
evidence with source URLs, corrections to census fields, and the shortlist
decision with its design task. `tools/pipeline/normalize-businesses.mjs` merges this
file into the dataset — corrections overwrite census values, scores are
recomputed from the corrected fields, and verified records carry
`verification` and `prospect` objects plus an updated data-confidence line.
Unconfirmed facts are recorded as unconfirmed, never inferred.

### Tooling for steps 1 and 2 (5 August 2026)

Two of the four steps are mechanical and are now scripted, so the manual effort
goes to steps 3 and 4, which genuinely need judgement.

- `tools/pipeline/probe-sites.mjs --in urls.json --out probes.json` answers
  step 1 for any list of domains: DNS, HTTPS and HTTP, redirect chain, builder,
  copyright and content dates, and whether a customer can actually transact.
  It separates the failure modes rather than collapsing them — dead DNS,
  refused TLS, Wix `ConnectYourDomain`, parked and "coming soon" pages that
  return 200, and redirects to a *different* business.
- `tools/pipeline/fsa-register.mjs --out fsa-matches.json` answers step 2 for
  every food-handling business from the Food Standards Agency register. A
  hygiene inspection is a dated official visit to premises that were open,
  which is the strongest dated evidence available here and exactly what
  OpenStreetMap-only rows lack. It matched 94 of the 229 trading rows, 90 of
  them inspected since 2024.
- `tools/pipeline/merge-verifications.mjs --in staging.jsonl` folds findings
  into `verifications.json` one line at a time, so a pass this long survives
  interruption, and rejects any record claiming a status with neither a source
  nor a stated basis.

**What the scripts may not be read as saying.** FSA *absence* is not evidence of
closure — a solicitor or barber never appears, because they handle no food. FSA
*presence* proves trading on the inspection date, not today. A live site is not
a live business, and a name match is not an identity match: every FSA match
carries a confidence, and only `high` should be accepted without a human look.

### Limitations observed in the third round (5 August 2026)

- **"No website" and "no digital presence" are different findings.** Beauty
  Haven has no site and takes real bookings through Booksy. Counting it as dark
  would be true about the domain and false about the business. Platform-only
  traders need their own status.
- **Franchise branches hide inside the independent count.** Brennan's trades as
  a SPAR, whose web presence comes from the brand. `census-class.mjs` catches
  chains by keyword and cannot catch a franchise trading under a family name.
- **Businesses trade under names the census never recorded**, which is the
  mechanism behind most missed websites: Arley Guest House is Arley House B&B,
  Binghams is Binghams Menswear, Beauty Haven is Marine Sports Beauty Haven. A
  name-only search under-reports; search the address too.
- **A fetch failure on the day is not a dead site.** `bonnys.net` is indexed and
  advertised and returned HTTP 500 when probed. Recorded as unconfirmed.
- **Some live sites serve no crawlable text**, so the probe can confirm the
  domain resolves and say nothing about the site. Never describe such a site's
  quality without opening it.

### Limitations observed in the fourth round (5 August 2026) — steps 3 and 4

Steps 3 and 4 were completed for every dark, mapped, trading row. The blocking
count (dark, mapped, trading, never independently confirmed) fell **150 → 0**.
See `research/pipeline/verification-pass-status.md`.

- **A name correction orphans the verification unless the alias table grows.**
  Corrections overwrite `name` in `businesses.json`; the next normalise keys by
  the new name and misses the verification record keyed by the old one. Every
  rename this pass was added to the alias maps in
  `normalize-businesses.mjs` and `merge-verifications.mjs`.
- **The business and the census row can have different statuses.** Rhiannon's
  still trades in Craigavon and Portadown; the Newcastle shop closed December
  2024. Record the *row*'s status, and say so in caveats.
- **National-brand location pages are live sites and not local websites.**
  Home Instead, Specs Xpress, Fix Auto, McKeevers, Toals — counting them as
  "lit independents" overstates local digital maturity the same way counting
  them dark overstated need.
- **Azure WAF 403 is not a dead domain.** `bundlebaby.com` resolves and blocks
  the probe; open it before calling it dead.
- **Same-named businesses elsewhere remain the standing trap**, especially
  Newcastle-upon-Tyne restaurant closures and Newcastle Ontario retailers.
  Address match is mandatory before accepting a result.
- **Do not alias distinct premises that share a trading name.** Cookie Jar at
  Unit 4 and Cookie Jar at 121 Main Street are separate FSA establishments;
  Hale's on Main Street and Hales Fruit Wholesale on Dundrum Road likewise.
  Alias only when two census rows are the same door.
- **Franchise and brand branches found in steps 3–4 must be reclassified**, not
  left as dark or lit independents. `census-class.mjs` `CHAIN_NAMES` now covers
  Brennan's/SPAR, Home Instead, Specs Xpress, Fix Auto, McKeevers, MediCare
  Thorntons, Herrons CFC, Around A Pound, Toals, Morelli's, Simon Brien Bradley
  and Emo Oil. Wrong entity types that made Tollymore Forest, YMCA and Royal
  County Down look like chains were corrected by name/tag rules.

### Census limitations observed in the first pass

- A Google Maps listing can omit a live website (Painted Earth), so "no
  website found" needs verification before it drives outreach.
- Website-state flags go stale: sites get rebuilt and gain HTTPS between
  census and use (Golf Links House).
- Listed domains can be dead or misspelled while the real site lives at
  another address (Donard Veterinary).
- Name variants create duplicate records ("The Tool Centre"/"Tool Centre",
  "The Avoca Hotel"/"Avoca Restaurant and Hotel") — resolved via the alias
  table in the normaliser.
- Keyword-derived entity types can mislabel (the "castle" inside "Newcastle");
  derivation rules now use word boundaries plus public-service/community
  keyword checks.

### Selection limitations observed in the second round (24 July 2026)

- **The priority score cannot rank the site-less band.** Every record without a
  website scores 80–81 — over a hundred businesses — so selection inside that
  band is judgement plus fresh evidence, never the ranking.
- **Name-variant duplicates create false-highs.** Four records scored 76–81 as
  "no website found" while the same business traded on a live site under a
  second record (`Donard Hotel`, `Quinns`, `Hugh McCanns`, `Percy French`).
  Thirteen further duplicate pairs remain unmerged. **Dedupe before selecting**,
  and extend the alias table in `tools/pipeline/normalize-businesses.mjs`.
- **Listed websites go dead, not just stale.** A liveness probe over candidate
  domains found DNS failures, HTTPS listeners refusing connections, Wix
  "ConnectYourDomain" 404s, and a domain silently redirecting to a different
  business. Probe DNS and both schemes; distinguish `ENOTFOUND` from a 404 from
  a refused TLS connection, and record which.
- **A dead domain does not prove a live business.** It is equally consistent
  with closure. Trading evidence is required *before* the gap is used in a
  pitch, not after.
- **OpenStreetMap-only records carry no trading evidence at all.** A node is a
  map feature that was true once. Nothing in the census separates a business
  trading today from one that closed years ago — and the priority model rewards
  that silence with a top-band score, because a closed business has no website.
  Squid Shack scored 80 and had already ceased trading. **Confirm OSM-only
  records first-hand before selecting them, not after.**
- **A closure has no effect unless it is recorded.** Priority is computed from
  the listing, not from trading status, so a shut business keeps the score its
  missing website earned it. `tools/pipeline/normalize-businesses.mjs` now zeroes the
  priority of any record whose `tradingStatus` is `Closed` and sorts it last,
  and the workbook's live formulas do the same, so the listing is retained
  without resurfacing. Regenerate the workbook after any closure:
  `node tools/spreadsheet/build-business-workbook.mjs`.
- **Local first-hand knowledge is the cheapest source available and outperforms
  every online one for trading status.** It has now corrected the census three
  times where no dated public source existed. It is not a verification pass,
  though: record a first-hand *closure* (it ends the assessment), but do not
  write a first-hand "still open" into `research/pipeline/verifications.json` as if the
  full protocol had been run. Records without sources must not claim
  public-source verification — the normaliser now states the basis honestly.
- **Copyright-year staleness is weak evidence on its own.** Hugh McCann's shows
  © 2018 in a footer over content maintained into 2026. Read the content dates,
  not the footer.
- **Census records can go stale by repurposing.** `hamillharty.com` now serves
  an unrelated personal consultancy, so the listed business is no longer at its
  recorded domain.

## Fault taxonomy — which of the ten (added 6 August 2026)

Twenty published concepts carry three documented before-states each in
`src/site/data/transformation-details.ts` — roughly sixty observed faults. Ten
patterns account for nearly all of them. The taxonomy, with the evidence behind
each pattern, is
[`research/film/studio-recurring-themes.md`](../research/film/studio-recurring-themes.md).

Why it belongs in the research method rather than only in marketing: the gap
class says *there is a gap*, and its "pitch shape" column is deliberately
coarse. The fault IDs say **which gap and what the first sentence to the owner
is**. Recording them at verification time means design starts with the pitch
already found, and the case-study notes are written from the record instead of
rediscovered.

| ID | Fault | Gap classes it usually accompanies |
|---|---|---|
| T1 | The front door is somebody else's login | First website; Platform / social only |
| T2 | The route ends in nothing — dead domain, off-domain redirect, unavailable item | Dead site; Redesign |
| T3 | Suppliers, stock imagery or a parent brand outrank the business's own mark | Redesign |
| T4 | The arrival question — open? where? how much? — is not answered on the first screen | Journey / feature; Redesign |
| T5 | The action exists as a word, not a mechanism | Journey / feature |
| T6 | The business's own worries sit in front of the customer's question | Journey / feature |
| T7 | The strongest true thing about the business is in the footer, or absent | Redesign |
| T8 | The information is present in the wrong shape — a file, a wall of prose, an insider taxonomy | Journey / feature |
| T9 | The page's clock has stopped while the business has not | Redesign; Platform / social only |
| T10 | Swap the name for a competitor's and nothing breaks | Redesign (and the closer for every class) |

### What is already mechanical

`tools/pipeline/probe-sites.mjs` (step 1) already produces three of the ten
without a human look, because it separates failure modes rather than collapsing
them:

- **T2** — dead DNS, refused TLS, `ConnectYourDomain`, parked and "coming soon"
  200s, and redirects to a *different* business.
- **T9** — copyright years, content dates, builder staleness signals.
- **T5** — whether a customer can actually transact, or the site is
  brochure-only.

**T1** falls out of the census plus the `digitalPresence` finding. **T8** is
cheap to add and not yet detected: content reachable only as a linked file.
The remaining five — **T3, T4, T6, T7, T10** — need a human opening the page,
and T4 needs it rendered at phone width rather than fetched. Same division of
labour as steps 1–2 versus 3–4: script what is mechanical, spend judgement on
the rest.

### How a fault is recorded

Add a `faults` array to the business's record in
`research/pipeline/verifications.json`, beside `digitalPresence` and
`designTask`:

```json
"faults": [
  {
    "id": "T7",
    "observed": "Established 1973 and thirteen named projects; the fifty-three-year record appears on no single screen, and five accreditation marks sit only in the footer.",
    "where": "https://example.com/",
    "seenOn": "2026-08-06",
    "basis": "human"
  }
]
```

Rules, in the same register as the rest of this file:

- **A fault is an observation, not a verdict.** `observed` describes what is on
  the page. It never rates the business, never guesses intent, and never
  compares to a competitor.
- **`basis` is `probe` or `human`.** A probe result may be recorded without a
  human look; the other six may not. Arley House is the standing warning: *do
  not describe its quality without opening it.*
- **Undated means unrecorded.** Anything that will appear in outreach needs
  `seenOn`, because the postcard and the case study both quote it back.
- **Four at most.** More than four is a survey of somebody's website, not a
  pitch. Rank and keep the ones a fix would actually change.
- **No fault recorded is a valid finding** for a maintained, well-run site.
  Buck's Head is the model: current, well photographed, actively maintained,
  and the case was made on two measurable errands rather than on a fault list.

### What the counts may not be read as saying

The tallies in the taxonomy brief — T7 on six concepts, T1 on five — count
**what the studio chose to write up in its own case-study notes**, three per
concept because the page template takes three. They are not a survey of small
business websites, and the ratio of faults to concepts is an artifact of that
template. Two things therefore never get said, on any surface:

- Any prevalence claim about websites in general ("most small business sites
  have three of these"). The arithmetic is the template's, not the world's.
- Any score, grade or count applied to a named business ("your site fails six
  of ten"). The taxonomy names faults on pages; it does not rate businesses.

Downstream users of this pass: `research/outreach-postcards.md` (which theme
gets sent, and the evidence line it quotes) and
`research/what-we-look-for-brief.md` (the public page, which walks five of
these ten as invented wireframes and never a real business's fault).

## Refresh protocol

Re-run the research script for current OpenStreetMap data, refresh Google Maps/direct search metrics for the highest-ranked prospects, verify trading status against the official website or a recent source, and keep the research date visible. Outreach should use only current published business contact channels and comply with applicable UK privacy and direct-marketing rules.
