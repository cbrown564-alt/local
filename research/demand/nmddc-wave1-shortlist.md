# Newry, Mourne and Down — Wave 1 verified shortlist (26 November 2026)

First district-wide high-ROI sweep outside Dundrum and Newcastle, following the
expansion recorded in `docs/decision-register.md` (`C17`).

**Sources:**
- OpenStreetMap Overpass high-ROI sweep inside the `Newry, Mourne and Down District` boundary (`research/pipeline/nmddc-high-roi-discovery.json`, 656 rows across 26 settlements; 545 outside Dundrum and Newcastle)
- Food Standards Agency FHRS register, Authority 145 (`research/pipeline/nmddc-fsa-matches.json`, 1,748 establishments checked)
- Mechanical website probe (`research/pipeline/nmddc-site-probes.json`, 93 listed URLs outside Dundrum and Newcastle)
- Manual Step 3–4 website hunt, disambiguation, and live HTML/HTTP inspection on **26 November 2026**

**Standing rules that still apply:**
- No speculative concept builds until a real discovery conversation confirms the problem (`C6`, `C16`).
- Every entry below is **Rung 0** (no contact yet). Do a 5-minute Step 0 live check on a phone the day before any call or visit.
- Never criticise the current site to an owner's face; name the concrete job a customer cannot finish.

---

## Verified shortlist — 9 businesses across 4 corridors

Ordered by **verifiable commercial urgency**, grouped by geography so in-person visits can be clustered rather than driven one door at a time.

| # | Business | Town (Corridor) | Lane | Verified fault (26 Nov 2026) | Trading evidence | Fault IDs |
|---|---|---|---|---|---|---|
| 1 | **The Lobster Pot** | Strangford (Lecale) | Destination seafood | Listed domain `thelobsterpotstrangford.com` does not resolve (DNS dead). No owned website; relies on Facebook and phone (`028 4488 1288`). | FSA high-confidence, inspected **2026-06-18** (`7–11 The Square, BT30 7ND`) | T1, T2 |
| 2 | **Flagstaff Lodge** | Newry / Cloughoge (Newry & South Armagh) | Hotel, dining, weddings | Working NetAffinity room engine on `flagstafflodgenewry.com`, but the **Gift Vouchers link (`/vouchers.html`) returns 404** right ahead of Christmas, footer is `© 2020`, and dining booking is phone-only. | FSA high-confidence, inspected **2025-07-17** (`11 Forkhill Rd, BT35 8LZ`) | T2, T5, T9 |
| 3 | **Yew Wood Cottage** | Forkhill / Jonesborough (Newry & South Armagh) | 4-star self-catering cottage | `yewwoodcottage.co.uk/contact` under "Book Your Stay Today" prints raw builder placeholder copy **`"Why should visitor fill out form?"`**. Booking is phone-only or Booking.com OTA; `yewwoodcottage.com` (matching `stay@yewwoodcottage.com`) fails to resolve. | Listed on Discover NI & Booking.com (`25 Foughilletra Rd, BT35 8JE`) | T2, T5, T9 |
| 4 | **The Old School House** | Rostrevor (Carlingford Lough / Mournes) | Bistro, pizzeria & stays | Live site `http://oldschoolhouserostrevor.com/` serves **HTTP only** (no HTTPS), carries `"Order Online Coming Soon!"` with no ordering or table-booking mechanism, and has a Stays section with no detected booking engine. *(Note: `theoldschoolhouse1889.com` is an unrelated pub in Liverpool.)* | FSA medium-confidence, inspected **2025-11-24** (`Church St, BT34 3BA`) | T2, T5 |
| 5 | **Millers Close Holiday Cottages** | Castlewellan / Tollymore (Mournes / Slieve Croob) | Luxury self-catering cottages | Wix homepage (`millersclose.com`) prints **raw unescaped Google AdSense `<script>` HTML as visible text** at the very top of the page, despite having a live `booking-directly.com` widget underneath. | Active on Booking.com, Expedia, Discover NI | T2, T9 |
| 6 | **Crossgar Dental Practice** | Crossgar (Rowallane / Lecale) | Private & NHS dental | `crossgardentalpractice.co.uk` turns "Book an appointment" into a phone number (`028 4483 2585`) with no detected online appointment flow, and carries a visible typo in the main nav (`"About Crossgar dEntal Pracice"`). | Active practice (`48 Killyleagh St, BT30 9DQ`) | T5, T9 |
| 7 | **Bridgend Studios** | Crossgar (Rowallane / Lecale) | Wedding & commercial photography | `http://www.bridgendstudios.com/` runs over **plain HTTP** (no HTTPS), blocks pinch-to-zoom on mobile, and has no enquiry form on `/contact`. | Active studio (`1 Kilmore Rd, BT30 9HJ`) | T2, T5 |
| 8 | **Belleek Country House** | Belleeks / Camlough (Newry & South Armagh) | Restaurant, bar & wedding venue | Clean 2025 WordPress site (`belleekcountryhouse.com`) advertising Weddings, Christenings, Hen Parties, Birthdays and Dining, with no online table-booking or event-date enquiry mechanism (phone/Facebook only). | FSA high-confidence, inspected **2026-09-24** (`16 Main St, Belleeks, BT35 7PH`) | T5 |
| 9 | **The Mulberry Tree** | Seaforde / Clough (Rowallane / Lecale) | Destination dining & outside catering | `restaurantseaforde.co.uk` still displays a Google+ header icon and raw HTML comment fragments (`-->`) in the page source, with phone/generic contact form only for tables and outside catering. *(Note: `mulberrytree.co.uk` is unrelated in Norfolk.)* | FSA high-confidence, inspected **2025-03-11** (`2 Main St, Seaforde, BT30 8PA`) | T5, T9 |

---

## Brief pitch hypotheses & Step 0 checks

### 1. The Lobster Pot · Strangford
- **Private concept:** `https://mournemade.co.uk/for/lobster-pot-s4t8/` (single page, unlisted, `noindex`; source in `src/concepts/the-lobster-pot/`)
- **One-sentence opener:** *"If someone searches for The Lobster Pot before getting off the ferry or planning a Sunday drive, the old website address doesn't load and everything sits behind Facebook."*
- **Smallest paid scope:** Presence repair + direct table/voucher enquiry (hours, current menus, direct click-to-call or table-booking handoff, seasonal vouchers).
- **Timing:** Immediate (Christmas dining & gift vouchers) or quiet winter months ahead of spring ferry/tourist season.
- **Step 0:** Confirm `thelobsterpotstrangford.com` is still NXDOMAIN and check recent Facebook posts for opening days/hours and any booking partner.

### 2. Flagstaff Lodge · Newry
- **Private concept:** `https://mournemade.co.uk/for/flagstaff-lodge-f7m2/` (single page, unlisted, `noindex`; source in `src/concepts/flagstaff-lodge/`)
- **One-sentence opener:** *"Your room booking works fine through NetAffinity, but clicking Gift Vouchers on the homepage hits a 404 right before Christmas."*
- **Smallest paid scope:** Immediate fix of the voucher route and dining/wedding enquiry flow, without touching the working NetAffinity room engine.
- **Timing:** **Urgent (now → mid-December)** for Christmas gift vouchers, then January engagement/wedding enquiry season.
- **Step 0:** Click `Gift Vouchers`, `Book Your Stay`, and `Wedding Enquiry` on a phone to confirm `/vouchers.html` is still 404 and whether NetAffinity already hosts a live voucher URL that just isn't linked.

### 3. Yew Wood Cottage · Forkhill / Jonesborough
- **Private concept:** `https://mournemade.co.uk/for/yew-wood-cottage-y6w3/` (single page, unlisted, `noindex`; source in `src/concepts/yew-wood-cottage/`)
- **One-sentence opener:** *"Your Booking.com listing sells stays at commission, and on your own site the booking page still has placeholder text ('Why should visitor fill out form?') and no way to check dates."*
- **Smallest paid scope:** Clean one-page/small cottage site on an owned domain (`.co.uk` + fix `.com` email/domain alignment) with direct date enquiry or a lightweight booking engine.
- **Timing:** Winter planning ahead of 2027 spring/summer stays.
- **Step 0:** Open `https://www.yewwoodcottage.co.uk/contact` on a phone to verify the placeholder line is still visible, and check Booking.com availability/reviews for 2026 activity.

### 4. The Old School House · Rostrevor
- **Private concept:** `https://mournemade.co.uk/for/old-school-house-r9k4/` (single page, unlisted, `noindex`; source in `src/concepts/old-school-house-rostrevor/`)
- **One-sentence opener:** *"Your site is still on plain HTTP with 'Order Online Coming Soon!' on the front page — visitors on a phone get a security warning before they see your menus or Stays."*
- **Smallest paid scope:** HTTPS + mobile-first menus, clear ordering/table booking route, and direct Stays route.
- **Timing:** Winter / pre-spring tourist season (or immediate for festive bistro/vouchers).
- **Step 0:** Open `http://oldschoolhouserostrevor.com/` and its `/stays` page in a real browser; check Facebook/Instagram to confirm current bistro/pizza trading.

### 5. Millers Close Holiday Cottages · Castlewellan
- **Private concept:** `https://mournemade.co.uk/for/millers-close-m3c7/` (single page, unlisted, `noindex`; source in `src/concepts/millers-close/`)
- **One-sentence opener:** *"Your direct booking engine works, but right at the top of the homepage your Wix site is printing raw `<script>` code as visible text."*
- **Smallest paid scope:** Clean front door in front of the existing `booking-directly.com` engine (same non-rip-and-replace approach as Hotel Enniskeen).
- **Timing:** Winter planning ahead of 2027 bookings.
- **Step 0:** Open `https://www.millersclose.com/` in Chrome to screenshot the visible `<script>` text on mobile and desktop.

### 6. Crossgar Dental Practice · Crossgar
- **Private concept:** `https://mournemade.co.uk/for/crossgar-dental-c5d2/` (single page, unlisted, `noindex`; source in `src/concepts/crossgar-dental/`)
- **One-sentence opener:** *"New private patients looking up the practice on a phone can't send an appointment request online, and there's a typo right in the main menu."*
- **Smallest paid scope:** Clean front door + private-patient appointment request panel (same shape as Donard Vet / Newcastle Dental).
- **Timing:** Any time; no seasonal rush.
- **Step 0:** Check whether the practice is independent (not corporate group), inspect `/contact` in a real browser to confirm whether any online booking widget loads via JS.

### 7. Bridgend Studios · Crossgar
- **Private concept:** `https://mournemade.co.uk/for/bridgend-studios-b8s4/` (single page, unlisted, `noindex`; source in `src/concepts/bridgend-studios/`)
- **One-sentence opener:** *"Your wedding and commercial portfolio runs over plain HTTP, so modern browsers flag it as 'Not Secure' and mobile visitors can't zoom in on galleries or send a date enquiry."*
- **Smallest paid scope:** HTTPS portfolio + wedding/commercial date enquiry form.
- **Timing:** Now → February (Christmas/New Year wedding engagement enquiries).
- **Step 0:** Confirm recent 2025/2026 trading activity on Michael Sheppard's Facebook/Instagram before contacting.

### 8. Belleek Country House · Belleeks / Camlough
- **Private concept:** `https://mournemade.co.uk/for/belleek-country-house-b2h9/` (single page, unlisted, `noindex`; source in `src/concepts/belleek-country-house/`)
- **One-sentence opener:** *"Your site shows off weddings, family functions and dining well, but someone enquiring about a wedding or party date on a Sunday evening has no way to send their date and headcount."*
- **Smallest paid scope:** Direct event/wedding date-and-guest-count enquiry + table booking route (same shape as Hugh McCann's).
- **Timing:** Now → January (Christmas dining + New Year engagement/event bookings).
- **Step 0:** Check `/contact-us/` and `/weddings/` in a real browser to confirm no hidden booking form exists.

### 9. The Mulberry Tree · Seaforde
- **Private concept:** `https://mournemade.co.uk/for/mulberry-tree-m7t5/` (single page, unlisted, `noindex`; source in `src/concepts/mulberry-tree-seaforde/`)
- **One-sentence opener:** *"You have both destination dining and outside catering on the site, but catering enquiries and table requests go through an ageing template that still shows a Google+ icon."*
- **Smallest paid scope:** Refresh dining + structured outside-catering enquiry (date, headcount, menu style).
- **Timing:** Winter / pre-spring communion, wedding & event catering season.
- **Step 0:** Inspect `https://www.restaurantseaforde.co.uk/` in a browser and check recent Facebook/TripAdvisor reviews for 2026 trading.

---

## Held — needs a real browser or first-hand check before judging

| Business | Town | Reason held | Unblock step |
|---|---|---|---|
| **Kilmorey Arms Hotel** | Kilkeel | FSA high-confidence (**2026-07-06**), but `kilmoreyarmshotel.co.uk` returned HTTP 403 WAF to automated fetch. | Open in Chrome to check whether direct room/dining booking works. |
| **The Yellow Heifer** | Camlough | FSA high-confidence (**2026-05-29**), listed site `theyellowheifer.co.uk` failed TLS/fetch (`fetch failed`). | Open in Chrome over HTTP and HTTPS; if broken TLS, promote immediately to shortlist (T2). |
| **Byrne's Nursery** | Clough / Ballydugan | `byrnesnursery.co.uk` timed out on both HTTP and HTTPS; no dated 2025/2026 public trading evidence yet. | Confirm trading in person or by phone before outreach. |

---

## Eliminated in Step 3–4 (do not pitch — recorded so we do not re-check)

| Business | Town | Reason eliminated |
|---|---|---|
| **Mourne Scan Clinic** | Newry | Already solved: live WordPress 7.1.5 site with working `online-booking.semble.io` booking. |
| **Slieve Gullion Getaways** | Forkhill / Meigh | Already solved: live WordPress 7.1.5 site with working `portal.freetobook.com` booking & vouchers. |
| **The Sands B&B** | Rostrevor | Already solved: live 2026 site with Check-In/Check-Out search on the homepage. |
| **The Oystercatcher** | Rostrevor | Already solved: live `oystercatcher.ie` Eviivo direct booking portal. |
| **Spice India** | Newry | Already solved: OSM listed dead `.com`, but live OrderDirectly ordering runs at `spiceindianewry.org`. |
| **The Rock Caravan Site** | Castlewellan | Micro-operator: 5-pitch C&CC Certificated Site (lean-presence lane). |
| **Dufferin Arms** | Killyleagh | Actively maintained (`Christmas Menu 2026` live); phone-only table booking is a minor gap compared with shortlist above. |
