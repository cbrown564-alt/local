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

## Priority model

The initial ranking is a prospecting aid, not a claim about revenue or ownership.

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

Findings are recorded in `research/verifications.json`: dated trading
evidence with source URLs, corrections to census fields, and the shortlist
decision with its design task. `scripts/normalize-businesses.mjs` merges this
file into the dataset — corrections overwrite census values, scores are
recomputed from the corrected fields, and verified records carry
`verification` and `prospect` objects plus an updated data-confidence line.
Unconfirmed facts are recorded as unconfirmed, never inferred.

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
  and extend the alias table in `scripts/normalize-businesses.mjs`.
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
  missing website earned it. `scripts/normalize-businesses.mjs` now zeroes the
  priority of any record whose `tradingStatus` is `Closed` and sorts it last,
  and the workbook's live formulas do the same, so the listing is retained
  without resurfacing. Regenerate the workbook after any closure:
  `node spreadsheet-work/build-business-workbook.mjs`.
- **Local first-hand knowledge is the cheapest source available and outperforms
  every online one for trading status.** It has now corrected the census three
  times where no dated public source existed. It is not a verification pass,
  though: record a first-hand *closure* (it ends the assessment), but do not
  write a first-hand "still open" into `research/verifications.json` as if the
  full protocol had been run. Records without sources must not claim
  public-source verification — the normaliser now states the basis honestly.
- **Copyright-year staleness is weak evidence on its own.** Hugh McCann's shows
  © 2018 in a footer over content maintained into 2026. Read the content dates,
  not the footer.
- **Census records can go stale by repurposing.** `hamillharty.com` now serves
  an unrelated personal consultancy, so the listed business is no longer at its
  recorded domain.

## Refresh protocol

Re-run the research script for current OpenStreetMap data, refresh Google Maps/direct search metrics for the highest-ranked prospects, verify trading status against the official website or a recent source, and keep the research date visible. Outreach should use only current published business contact channels and comply with applicable UK privacy and direct-marketing rules.
