# Flagstaff Lodge — Elevation brief

**Subject:** Flagstaff Lodge (formerly *The Newry Golf Inn*), 11 Forkhill Road, Cloughoge, Newry, BT35 8LZ  
**Private link:** `/for/flagstaff-lodge-f7m2/` (also `/concepts/flagstaff-lodge/`, both `noindex`, excluded from sitemap)  
**Date:** 26 November 2026

## Live site findings (26 November 2026)

1. **Working room booking engine:** `flagstafflodgenewry.com` runs NetAffinity (`FLAGSTAFIBE01`) at `bookings.html#!/accommodation/rooms/date/{start}/{end}`. We preserve it rather than proposing a rip-and-replace.
2. **Gift Vouchers returns 404 (T2):** Clicking *Gift Vouchers* in the header goes to `/vouchers.html` → HTTP 404 right ahead of Christmas.
3. **Blank / broken subpages & stale chrome (T2, T9):** `/offers.html` is empty; Bistro lives at misspelled `/our-bistrio.html`; footer reads `© 2020` and displays a placeholder fax number (`+353 0123 4567`).
4. **Phone-only dining & JS-gated forms (T5):** Table bookings, wedding dates and delegate enquiries require calling reception or using old JS-gated forms.

## What the single-page concept changes

1. **First-screen room availability:** Date picker hands straight into Flagstaff Lodge's own NetAffinity engine (`bookings.html#!/accommodation/rooms/date/YYYY-MM-DD/YYYY-MM-DD`).
2. **Working Gift Voucher & Event Desk:** Interactive four-tab composer (*Gift Voucher*, *Bistro Table*, *Wedding / Event*, *Conference*) composing a structured email to `info@flagstafflodgenewry.com`.
3. **Single clear page:** All 18 rooms (6 room types + included standards), real serving hours (Sunday Carvery 11:30am–3:30pm, Bistro, Lounge Bar Saturday live music, residents' breakfast), licensed civil weddings, 25–30 delegate boardroom, and real A1/M1 corridor distances on one fast, phone-first page.

## Sources & non-invention boundary

- Live site pages fetched 26 November 2026: `/`, `/accommodation.html`, `/family-rooms.html`, `/classic-double.html`, `/dining.html`, `/sunday-dining.html`, `/our-bistrio.html`, `/lounge-bar.html`, `/weddings.html`, `/civil-ceremonies-and-partnerships.html`, `/meetings-and-events.html`, `/location.html`, `/contact-us.html`.
- Food Standards Agency FHRS register (Authority 145 — Newry, Mourne and Down), inspected 2025-07-17.
- No room prices, menu prices, staff names or photography invented. The crest emblem and Slieve Gullion ridgeline are SVG drawings disclosed in `ConceptLayout` `bannerNote`.
