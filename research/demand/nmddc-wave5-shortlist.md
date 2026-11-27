# NMDDC Wave 5 Concept Shortlist (27 November 2026)

Ten live-verified, actively trading Newry, Mourne and Down District Council (NMDDC) businesses selected for Wave 5 of the Mourne Made concept portfolio. Every website, contact detail, address, and WGS84 coordinate below was live-checked on **27 November 2026**.

Wave 5 expands the portfolio from **92 to 102 bespoke concept sites**, covering **8 settlements** (Rostrevor, Newry, Castlewellan, Kilkeel, Drumintee/Ring of Gullion, Strangford, Crossgar/Downpatrick, Maghera, and Killyleagh) across **9 distinct sectors**.

---

## Wave 5 Roster

| # | Business | Slug | Private Outreach URL | Town & Postcode | Coordinates (WGS84) | Live Website & Verified Fault | Direct Contacts |
|---|---|---|---|---|---|---|---|
| 1 | **The Kilbroney Centre** | `kilbroney-centre` | `/for/kilbroney-centre-k5r3/` | Rostrevor, `BT34 3BT` | `54.1017, -6.1969` | `http://kilbroneycentre.com/` — runs HTTP-only (expired SSL), leaks broken HTML attribute fragments (`"> for all ages"> of grounds">`), carries `© 2019` | `07342 883538` / `028 4173 9104` · `booking@kilbroneycentre.com` · FB `KilbroneyCentre` |
| 2 | **Maurice Murphy Car Sales** | `maurice-murphy-cars` | `/for/maurice-murphy-m8c4/` | Newry, `BT34 1QA` | `54.1892, -6.3355` | `mauricemurphycarsales.co.uk` — duplicates its full search bar and welcome heading twice on a dated UsedCarsNI template | `07708 164585` / `028 3026 0584` · `mauricemurphycars@btinternet.com` · Mon–Fri 09:00–17:00, Sat 09:00–15:00 |
| 3 | **Evvrclean** | `evvrclean-newry` | `/for/evvrclean-newry-e7c2/` | Newry, `BT35 6PS` | `54.1863, -6.3445` | `evvrclean.co.uk` — bloated Website-Editor builder loading 13 Google font families simultaneously around commercial/domestic cleaning & laundrette services | `028 3005 0330` · `Enquiries@evvrclean.co.uk` · `customersupport@evvrclean.co.uk` · FB/IG `EVVRCLEAN` |
| 4 | **Whitewater Brewing Co.** | `whitewater-brewery` | `/for/whitewater-brewery-w4b8/` | Castlewellan, `BT31 9RH` | `54.2796, -5.9447` | `whitewaterbrewery.com` — outputs empty cart notice (`"0 was successfully added to your cart."`) at top of page and buries Beer Dough Pizzeria & guided tours under WooCommerce chrome | `028 4377 8900` · Lakeside Brae, Clarkhill Road · FB `WhitewaterBeer` · IG `whitewaterbeer` |
| 5 | **Beer Hut Brewing** | `beer-hut-brewing` | `/for/beer-hut-brewing-b3h6/` | Kilkeel, `BT34 4BH` | `54.0615, -5.9941` | `beerhutbrewing.co.uk` — duplicates its entire 10-item Shopify nav bar twice, obscuring Saturday taproom, artisan pizza, Sub Club & Running Club | `07885 566599` · 32A Greencastle St / Unit 14 Binnian Enterprise Park · `beerhutbrewing.co.uk` |
| 6 | **Ring of Gullion Cycles** | `ring-of-gullion-cycles` | `/for/ring-gullion-cycles-r5g9/` | Drumintee, Newry, `BT35 8SY` | `54.0980, -6.4161` | `ringofgullioncycles.co.uk` — renders title as lowercase unspaced `ringofgullioncycles` on a generic Shopify theme mixing Cube/Cannondale/Colnago/Fuji/Transition bikes with Rolly Toys | `028 3088 8352` · `ringofgullioncycles@outlook.com` · Mon–Fri 09:30–17:30, Sat 10:00–17:00, Sun 12:00–16:00 |
| 7 | **The Artisan Cookhouse** | `artisan-cookhouse` | `/for/artisan-cookhouse-a4c7/` | Strangford, `BT30 7LJ` | `54.3703, -5.5570` | `artisancookhouse.com` — duplicates its entire header navigation twice across dining, rooms, culinary experiences, and gift vouchers | `028 4488 1654` · 4 Kildare Street, Strangford · `artisancookhouse.com` |
| 8 | **Meadow Farm Shop** | `meadow-farm-shop` | `/for/meadow-farm-shop-m9f4/` | Crossgar / Downpatrick, `BT30 9EH` | `54.3708, -5.7401` | `meadowfarmpotatoes.com/farm-shop` — blocks automated requests and link previews behind a hard Cloudflare 403 challenge | `028 4483 1543` · 123 Downpatrick Road, Crossgar / Downpatrick |
| 9 | **The Maghera Inn** | `the-maghera-inn` | `/for/maghera-inn-m6i2/` | Maghera, Castlewellan, `BT31 9HE` | `54.2413, -5.8992` | `themagherainn.com` — duplicates Gift Vouchers links in top bar and fragments live ResDiary booking, menus, and private receptions | `028 4372 2236` · `enquiries@themagherainn.com` · ResDiary `THEMAGHERAINN/21858` · Pub 11:30–23:00 (Fri–Sat 01:00) |
| 10 | **East Down Yacht Club** | `east-down-yacht-club` | `/for/east-down-yc-e3y5/` | Killyleagh, `BT30 9QZ` | `54.4136, -5.6463` | `edyc.co.uk` — serves an empty JS shell (`"EDYC"` only) with zero server-rendered HTML for search engines or link previews despite hosting RYA sailing and Strangford Lough caravan & camping | `028 4482 8375` · 62 Comber Road, Moymore, Killyleagh · `edyc.co.uk` |

---

## Bespoke System Features Built in Wave 5

- **Interactive Trade Tools (4 concepts):**
  - `KbcGroupMatcher.astro` (`kilbroney-centre`): Youth/Children's Groups, Family Weekends, Summer Camps, and Adult Retreats planner with instant group notes.
  - `MmcStockBrief.astro` (`maurice-murphy-cars`): Part-Exchange Valuation, Test Drive Booking, and Vehicle Sourcing & Finance brief builder.
  - `EvcQuoteBuilder.astro` (`evvrclean-newry`): Commercial Contracts, Domestic Cleaning, Commercial Laundrette, and Free Site Visit selector.
  - `BhbTaproomTabs.astro` (`beer-hut-brewing`): Saturday Taproom & Pizza, Online Cans & Kegs, Sub Club & Running Club, and Trade Stockists guide.
  - `EdycClubTabs.astro` (`east-down-yacht-club`): Sailing & Dinghy Racing, Caravan & Camping Park, RYA Training Centre, and Clubhouse & Membership tabs.
- **Native `<dialog>` `SpecimenSheet` Guides (5 concepts):**
  - `whitewater-brewery` (`#ww-tap-sheet`), `ring-of-gullion-cycles` (`#rgc-brands-sheet`), `artisan-cookhouse` (`#ac-guide-sheet`), `meadow-farm-shop` (`#mf-shop-sheet`), `the-maghera-inn` (`#mi-menu-sheet`).
- **Live UK Opening Hours (`VERIFIED_SCHEDULES` in `concept-polish.ts`):**
  - `maurice-murphy-cars` (`.mmc-hours-list`), `ring-of-gullion-cycles` (`.rgc-hours-list`), `the-maghera-inn` (`.mi-hours-list`).
- **WGS84 `LocalAreaMap` on all 10 concepts** (with `showFerry={true}` on both Strangford Lough concepts: `artisan-cookhouse` and `east-down-yacht-club`).
- **20 AI-generated editorial visualisations** (2 per business, processed into `.jpg`, `-1265.webp`, and `-640.webp`), logged in `research/image-provenance.md` and visibly disclosed in `<figcaption>` and `bannerNote`.
- **10 bespoke 1200×630 OG social cards** (`public/media/og/<slug>.jpg`).
