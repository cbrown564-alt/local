# Batch two — selection record

Selected 24 July 2026. Ten new prospects for the second round of the
select → verify → normalise → build → record cycle in `PROSPECTS.md`.

This document is the **Select** step only. Nothing here is verified: the site
probes below are dated liveness evidence gathered to make the selection
defensible, not a verification pass. Every prospect still needs the full
protocol in `RESEARCH_METHOD.md` before any concept work, and the
month-old-evidence rule applies from the verification date, not from this one.

## Why the ranked census could not make this choice

The census priority score could not discriminate. Every record without a
website scores 80–81, which is 100+ businesses in a flat band, and the top of
that band is wrong in a way that matters.

### Four false-highs — scored as "no website found" while trading on a live site

| Record | Score | Reality |
|---|---|---|
| `Donard Hotel` | 81 | Second record `The Donard Hotel` carries `donardhotel.com` |
| `Quinns` | 80 | Second record `Quinn's` carries `quinnsbarnewcastle.com` |
| `Hugh McCanns` | 80 | Trades on `hughmccanns.com`, found via the `Little Haven Guest House` record |
| `Percy French` | 76 | Second record `The Percy French` carries `thepercyfrench.com` |

Selecting off the top of the score would have picked four businesses that
already have websites, and pitched a first website to each of them.

### Thirteen duplicate name-variant pairs

The local directory and OpenStreetMap disagree on names, and the alias table in
`scripts/normalize-businesses.mjs` holds only five entries. Unmerged pairs found
this round:

`Cafe Mauds`/`Mauds Cafe` · `Graham's`/`Grahams Ice Cream` ·
`Harbour House`/`Harbour House Inn` · `John Mac's Fish and Chips`/`John Macs` ·
`Morelli`/`Morellis` · `Nutty Chef`/`Nutty Chefs` · `Savoy`/`Savoy Cafe` ·
`Tip Top`/`Tip Top Sweet Shop` · `Granite Trail`/`The Granite Trail` ·
`Peking Corner`/`New Peking Corner` · `The Strand`/`The Strand Ice Cream and Coffee` ·
`Hugh McCann's Cafe/Bar`/`Hugh McCanns` · `Tollymore Forest`/`Tollymore Forest Park`

Plus `Reencon Development Services Ltd` and `Reencon Chartered Surveyors`, which
are one business: `reencon.co.uk` redirects to `reenconsurveyors.co.uk`.

The pool of genuinely site-less Newcastle independents is therefore materially
smaller than the census implies. **Fixing the alias table is a prerequisite for
the batch-three selection**, not for this one — the duplicates are now known by
name and were excluded by hand.

## A third gap class: the site that is gone

Batch one worked two pitches — redesign a dated site, or build a first website.
A liveness probe across every candidate domain on 24 July 2026 found a third,
and it is the most verifiable of the three: businesses that are trading while
their website is broken, dead, or pointing somewhere else. The owner usually
does not know.

Donard Veterinary already earned its batch-one place this way (listed domain
dead). It was treated as a one-off. It is not.

### Probe evidence — 24 July 2026

| Domain | Result |
|---|---|
| `douglasandcromie.co.uk` | **ENOTFOUND** on apex and `www` — DNS does not resolve at all |
| `donardhotel.com` | Resolves `50.2.255.252`; HTTP **404**, HTTPS **ECONNREFUSED** (no TLS listener) |
| `newcastlefamilydentalcare.com` | `www` ENOTFOUND; apex **301 → `http://www.djmaguiredentists.co.uk/location-newcastle.html`** — a different practice, over plain HTTP |
| `murdocksoilcoalandgas.co.uk` | Wix **404 "ConnectYourDomain Error"** — paid builder, domain never connected |
| `exploiting-technology.com` | DNS **ENODATA** — dead (not selected; likely dormant IT consultancy) |
| `hamillharty.com` | Live, but repurposed to "Ryan Harty – Strategy to Grow Your Business" — **census record is stale**, no longer the Dundrum contractor (not selected) |
| `aroundapound.com` | Live WordPress, footer **© 2015** (not selected — reserve) |
| `mountpanther.com` | **403** Cloudflare challenge; needs a real browser to assess (not selected — reserve) |

## The ten

Six Dundrum, four Newcastle. Composition chosen 24 July 2026 to weight home
turf and to leave hospitality: batch one was eight of ten hospitality or
consumer-facing, and the whole pitch apparatus (journey audits, menus, booking)
is tuned to it. Nothing here tests whether the offer lands with a trade, a
health practice, or a product brand.

### Dundrum (6)

| # | Business | Category | Gap class | Selection evidence |
|---|---|---|---|---|
| 1 | **The Dundrum Inn** — 143–145 Main Street | Pub / B&B | Journey | Live custom site, mobile viewport, live booking, multi-language, 2026 content. **Not a rebuild case** |
| 2 | **Murdock Brothers** | Fuel — oil, coal, gas | Dead site | Wix 404 ConnectYourDomain. New category; a trade with recurring delivery customers |
| 3 | **Groves Chemist** — 165 Main Street | Pharmacy | First website | No site found. New category; health retail |
| 4 | **Tonn Ruray Café** — 61 Main Street | Café + apartments | Redesign | Live site, three discovery sources including official website verification, address and phone on record. Dual model: café/restaurant plus luxury apartment lets |
| 5 | **Kelly, McEvoy & Brown** | Building contractor | Redesign | Live 9.7 KB hand-built site, established 1973, ecclesiastical + healthcare portfolio. B2B — the design task South Down Signs is holding |
| 6 | **Betty's Better Butters** (Dundrum Butters Ltd) — 10 Main Street | Food producer | Redesign | Two-page BaseKit site whose `<title>` and nav are still the builder default **"Home Page"**. Chef-founded, "over 10 years in professional kitchens" |

### Newcastle (4)

| # | Business | Category | Gap class | Selection evidence |
|---|---|---|---|---|
| 7 | **Douglas and Cromie** — 23 Bryansford Road | Car dealer / garage | Dead site | Domain does not resolve. Highest-scoring Newcastle record that has a listed website (54) |
| 8 | **The Donard Hotel** — 23–29 Main Street | Hotel | Dead site | 404, no HTTPS listener. The Enniskeen method transfers directly |
| 9 | **Newcastle Family Dental Care** — 2 Railway Street | Dental | Dead site | Redirects to another practice's insecure page. New category |
| 10 | **Hugh McCann's** — 119 Central Promenade | Wedding venue | Feature | Boutique wedding venue, gardens, restaurant, Little Haven accommodation. Footer says © 2018 but content runs to 2026 — **maintained, so not a rescue**. Highest-value single target in the batch |

**Mix**: 4 dead-site · 5 redesign/feature · 1 first-website.
**Categories new to the pipeline**: fuel merchant, pharmacy, building
contractor, food producer, car dealer, dental practice, wedding venue.

Only one first-website case survives, against five in batch one. That is
acceptable: the first-website pitch is the one batch one proved most thoroughly,
and batch two exists to break categories rather than to repeat it.

### The walk

Five of the six Dundrum prospects are doors on Main Street — 10, 61, 143–145 and
165, plus Murdock Brothers locally — alongside batch one's Buck's Head, Scopers,
Cúpla and Castle Farm. The M3 Dundrum walk goes from four doors to roughly nine
on one street in one afternoon.

## Correction — Squid Shack removed the day it was selected

**Squid Shack (81 Main Street) no longer exists.** Local first-hand report,
24 July 2026, within hours of its selection. Recorded in
`research/verifications.json` as `tradingStatus: "Closed"` so the OpenStreetMap
node stops resurfacing near the top of the site-less band in every future
selection round. **Tonn Ruray Café takes the slot.**

This is the third time local knowledge has corrected the census where no public
source would have — after Scopers' opening hours and Cúpla's trading status on
21 July 2026 — and the first time it removed a prospect rather than confirming
one.

The lesson is specific and cheap to apply. **OpenStreetMap-only records carry no
trading evidence at all.** A node is a map feature that was true once; nothing
in the census distinguishes a business trading today from one that closed years
ago, and the priority model rewards exactly that silence with a top-band score,
because a closed business has no website. Squid Shack scored 80.

**Confirm OSM-only records first-hand before selecting them, not after.**

### Confirmed trading by local first-hand report, 24 July 2026

Asked in the same breath, at no research cost:

| Record | Status | Effect |
|---|---|---|
| **Groves Chemist** — 165 Main Street | Trading | Stays in the batch; its OSM-only caveat is resolved |
| **Brennan's** — 12 Main Street | Trading | Bench confirmed |
| **Today's** | Trading | Bench confirmed — but check whether it is a symbol-group franchise whose web presence is decided nationally |
| **Arley Guest House** | Trading | Bench confirmed; address still unrecorded |
| **Douglas and Cromie** | Trading | Dead-site pitch is safe to make |
| **The Donard Hotel** | Trading | Dead-site pitch is safe to make |
| **Newcastle Family Dental Care** | Trading | Dead-site pitch is safe to make, but see the DJ Maguire question below — trading under *which name* is still open |

**Murdock Brothers remains unconfirmed** — the only one of the four dead-site
cases where the pitch is not yet safe to make.

These are **not** recorded in `research/verifications.json`. A first-hand "yes,
it is open" is not a verification pass, and writing one in would let the dataset
claim more confidence than was earned. Squid Shack is recorded because a closure
is decisive on its own — it ends the assessment rather than starting it.

## Carried over, not counted

**Castle Farm Fresh Produce** sits outside these ten by decision (24 July 2026).
It has a published public transformation and no verification record at all, so
it needs a full pass regardless — but it is batch-one cleanup, not batch-two
discovery. Recording it inside the ten would have overstated new coverage.
Site live, © 2026, trading.

## Open questions for the verification pass

Recorded now so they are not rediscovered later:

- **The Dundrum Inn phone conflict.** Census says `028 4375 1211`; the site
  says `028 4372 9933`. One is wrong — resolve before any printed piece.
- **Dundrum Inn and Hugh McCann's are both maintained.** The Buck's Head lesson
  applies: find the journey or capability gap, or drop them. A rebuild pitch to
  either would be dishonest.
- **Murdock Brothers**: confirm it is still trading *before* leaning on "your
  site is gone". A dead domain is equally consistent with a closed business, and
  that is the one way this pitch can embarrass us at a door. The other three
  dead-site cases were confirmed trading on 24 July 2026; this one was not.
- **Newcastle Family Dental Care** may have been absorbed by DJ Maguire
  Dentists. Establish who trades at 2 Railway Street today, and under whose
  name, before treating it as a prospect at all.
- **Tonn Ruray runs two businesses off one domain** — a café/restaurant and
  luxury apartment lets. Establish which one the site is failing before choosing
  a design task; they have different visitors and different bookings.
- **Same-name collisions** to check before any concept copy, per the standing
  rule: Douglas and Cromie, Savoy, Morelli, The Strand.

Resolved 24 July 2026 by local first-hand report: Groves Chemist is trading, so
its OpenStreetMap-only caveat is closed. Squid Shack is not, and was removed
from the batch the day it was selected.
