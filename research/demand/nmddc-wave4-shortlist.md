# Newry, Mourne and Down — Wave 4 verified shortlist (26 November 2026)

Fourth district-wide batch of 10 verified independent businesses across Newry, Mourne and Down, drawn from `research/pipeline/nmddc-high-roi-discovery.json` and live-verified on **26 November 2026**.

Every entry below is **Rung 0** (no outreach yet). Run a 5-minute Step 0 phone check before contacting any owner.

---

## Verified shortlist — 10 businesses across 9 settlements & 9 sectors

| # | Business | Town (Corridor) | Sector | Verified live fault (26 Nov 2026) | Private concept link |
|---|---|---|---|---|---|
| 1 | **Murlands Solicitors** | Ballynahinch & Downpatrick | Legal practice (191 years) | `murlands.co.uk` prints `"It is recommended that you update your browser. To view the latest browsers please visit outdatedbrowser.com"`, raw `-->` HTML comment leak, and duplicated main nav. | `/for/murlands-solicitors-m4l8/` |
| 2 | **McVeigh Property Services** | Newry City | Estate agent & valuations | `mcveighpropertyservices.com` prints `"You are using an outdated browser. Please upgrade your browser to improve your experience."` right above its navigation. | `/for/mcveigh-property-m5v2/` |
| 3 | **Tory Bush Cottages** | Kilcoo / Tollymore | Self-catering cottages & equestrian | `torybush.com` prints raw `-->` leak, still advertises **`2024 Prices`** in its main navigation, and links `/contact-us/` over plain HTTP despite a live SuperControl booking calendar (`ownerID=173&siteID=243`). | `/for/tory-bush-t7c4/` |
| 4 | **The Cuan** | Strangford Village | Harbourside inn & seafood | `thecuan.com` prints raw `-->` leak and duplicates its entire accommodation menu twice (`Packages Luxury Rooms Cuan House Book Online`) around its live ResDiary (`22900`), rooms & voucher links. | `/for/the-cuan-c6s9/` |
| 5 | **Mount Panther Farm Park** | Clough / Downpatrick | Family farm park & events | `mountpanther.com` duplicates its entire header and navigation twice across the top of the page around its live Digitickets online box office. | `/for/mount-panther-m3p7/` |
| 6 | **Chestnutt Holiday Parks** | Cranfield / Kilkeel | Blue Flag beach holiday parks | `chestnuttholidayparks.com` leaks placeholder email **`johnsmith@gmail.com`** in page markup and misspells `/accomodation/` across URLs despite operating 4 Mourne coast parks and live online bookings. | `/for/chestnutt-parks-c8k3/` |
| 7 | **Carrive Grove Garden Centre** | Forkhill (Ring of Gullion) | Plant nursery & hedging | `carrivegrovegardencentre.co.uk` misspells **`"Specimin Hedging"`** in its primary navigation and uses an ageing text-heavy WordPress layout with no hedging/planting enquiry flow. | `/for/carrive-grove-c2g5/` |
| 8 | **Woodhill Kitchens** | Drumaness / Ballynahinch | Bespoke kitchens & sliderobes | `https://www.woodhillkitchens.co.uk/` fails with **`ERR_TLS_CERT_ALTNAME_INVALID`**, blocking visitors with a browser security error and leaving only bare directory listings. | `/for/woodhill-kitchens-w6k4/` |
| 9 | **Ross Cycles** | Castlewellan | Bikes, e-bikes & servicing | **No standalone owned website** (`rosscycles.co.uk` is an unrelated shop in Caterham, Surrey); relies on Facebook and CycleScheme/Volt Bikes dealer profiles right beside Castlewellan MTB Trails. | `/for/ross-cycles-r9b6/` |
| 10 | **Guru Indian Cuisine** | Newry City | Fine Indian dining & takeaway | `gurunewry.co.uk` duplicates its entire navigation twice and uses plain `http://gurunewry.co.uk/` as its ordering return URL around its live Postree ordering & VoucherHub gift cards. | `/for/guru-indian-g4n7/` |

---

## Verified contacts & live hand-offs preserved in each concept

1. **Murlands Solicitors:** 2 Dromore St, Ballynahinch BT24 8AG (`028 9756 2209`) & Downpatrick (`028 4461 9980`) · `law@murlands.co.uk`.
2. **McVeigh Property Services:** 1 Kildare St, Newry · `028 3025 6387` · `info@mcveighps.com`.
3. **Tory Bush Cottages:** 79 Tullyree Rd, Kilcoo, Newry BT34 5LD · `028 4372 4348` · Live SuperControl (`ownerID=173&siteID=243`).
4. **The Cuan:** 6–12 The Square, Strangford BT30 7ND · `028 4488 1222` · Live ResDiary (`22900`), rooms & `giveavoucher.com/thecuan`.
5. **Mount Panther Farm Park:** 39 Dundrum Rd, Clough, Downpatrick BT30 8SJ · `028 4426 0011` · `info@mountpanther.com` · Live Digitickets portal.
6. **Chestnutt Holiday Parks:** 3 Grange Rd, Cranfield West, Kilkeel BT34 4LW · `028 4176 2653` · `info@chestnuttholidayparks.com` · Live `chestnuttholidaybookings.com`.
7. **Carrive Grove Garden Centre:** 79 Carrive Rd, Forkhill, Newry BT35 9TF · `028 3088 9188` / `07752 719 472`.
8. **Woodhill Kitchens:** 6 Cumber Rd, Drumaness, Ballynahinch BT24 8SG · `028 9756 2727`.
9. **Ross Cycles:** 44 Clarkhill Rd, Castlewellan BT31 9BL · `028 4377 8029`.
10. **Guru Indian Cuisine:** 3 Kildare St, Newry BT34 1DQ · `028 3005 3659` · Mon–Thu 17:00–22:30, Fri–Sat 16:00–23:00, Sun 12:30–21:00 · Live Postree ordering & `gurunewry.voucherhub.ie`.
