# Day 2 five — inventory and five checks

Research date: **23 August 2026** (Europe/London).
Branch: `sprint-day2-five` from `master`. Day 1 PR 48 left untouched.

Sources: `research/pipeline/verifications.json` (asOf 2026-08-05), PROSPECTS.md,
own sites fetched this pass, Visit Mourne, Booksy, Companies House where named.
No hours, prices, or members invented.

## Dundrum mix

After Day 1 took Arley House, the unused Dundrum independent pool in the
verification set is Brennan's (chain — skipped), Knockevin (school — skipped),
Today's (trading unconfirmed in the file), plus held/retired/published names.
No second Dundrum door elevated today. Conlyn House is Newcastle beachfront;
its own copy names **Dundrum Bay** as the wake-up view.

## Swaps

- **Joe's Quality Meats** — still thin for voice (no owned sentence). Not used.
- **New Peking Corner / Mourne Auto Spares** — already dropped Day 1.
- **The Harbour Shop, Base Coffee, Café 67, Shimna Café, The Clay Project,
  Bike Mourne, Freedom Cosmetics, Dacara, Keown Nugent, Central Hair** —
  fetched or scored this pass; not chosen. Clay Project already takes deposits
  on its own site. Bike Mourne advertises booking. Café 67 has no first-party
  hours. Base Coffee had no owned sentence we could fetch.

## The five

### 1. Conlyn House — stay — `conlyn-house`

- **Voice:** “Wake up to the soothing sounds of the ocean… panoramic views of
  Dundrum Bay and the majestic Slieve Donard…” — conlynhouse.com (fetched
  23 Aug 2026).
- **Geography:** 11 Downs Road, Newcastle, BT33 0AG. Beachfront. 9-iron from
  Royal County Down, in their words.
- **Ritual:** Stay + breakfast 8–10 (their list). Ensuite. Deluxe balcony over
  the beach. Named rooms. Purple front door.
- **Arc:** Newly refurbished B&B; Book Now is an enquiry form (name, phone,
  email, message) — verified 20 Jul 2026 and still true 23 Aug 2026.
- **Mark:** Purple front door (their copy). No logo fetched.
- **Why not thin:** Own first-person, named rooms, breakfast hours from the
  owned page, a real action gap (Book Now ≠ calendar).

### 2. Café Mauds — meal — `cafe-mauds`

- **Voice:** Tourism listing (not Instagram unread): freshly made breakfast,
  lunch, coffee, tea, and Mauds specialist ice cream; Green Tourism Bronze.
  Source: visitmournegullionstrangford.com/food-and-drink/cafe-mauds-p712141
- **Geography:** 106 Waterfoot, Main Street, Newcastle, BT33 0AE.
- **Ritual:** Walk-in café. Hours on that tourism page. Phone 028 4372 6184.
- **Arc:** FSA Café Mauds, rated 5 on 2024-09-25. Facebook + Instagram; no
  owned site.
- **Mark:** Not seen. Do not invent.
- **Why not thin:** Named specialist ice cream, published hours at a public
  tourism source, current hygiene, Facebook-only owned door.

### 3. Binghams Menswear — jar — `binghams-menswear`

- **Voice:** “Whether it’s for an important occasion or a dinner party, we
  would love to arrange an appointment with you.” — binghamsmenswear.com
- **Geography:** 82 Main Street, Newcastle, BT33 0AE.
- **Ritual:** Suit / formal / highland hire by appointment. Named hire styles
  on /suit-hire/. Phone 028 4372 3521, email info@binghamsmenswear.com.
- **Arc:** Own WordPress brochure; 2026 footer; appointment, not checkout.
- **Mark:** Not used. Do not lift suit photos.
- **Why not thin:** Named hire range, appointment mechanism, owned contact,
  a real “when would I open this” (the hired suit on the day).

### 4. Marine Wellness — relief — `marine-wellness`

Census: Beauty Haven / Marine Sports. Current Booksy trading name **Marine
Wellness**, Unit 13, 63A Castlewellan Road, BT33 0JX (fetched 23 Aug 2026).
Do not treat 91 Central Promenade as the live door.

- **Voice:** Booksy service copy and business replies (Patricia McGrady named
  on confirmed-client reviews; replies dated June 2026).
- **Geography:** Unit 13, 63A Castlewellan Road, Newcastle.
- **Ritual:** Booksy diary they do not own. Tailored treatment with Patricia,
  sports massage, Dermalogica, KCR, as listed 23 Aug 2026.
- **Arc:** Rename recorded in verifications.json; Booksy still current.
- **Mark:** Not used.
- **Why not thin:** Named practitioner, live priced diary, 148 reviews, a
  real owned-door gap (platform booking, no site).

### 5. Coco's Adventure Playground — none of the five — `cocos-adventure-playground`

- **Voice:** Own site (indexed 23 Aug 2026; this network received 403 on a
  direct fetch): indoor play, babies to fourteen, party copy, hours, prices.
- **Geography:** 27A Central Promenade, opposite the Newcastle Centre.
- **Ritual:** Walk-in play; parties by phone 028 4372 6226. Coco / Bumper
  party prices as published on their birthdays and prices pages.
- **Arc:** Brochure site, no booking engine (verification 5 Aug 2026). Party
  enquiry form exists; they still tell you to call.
- **Mark:** Not used.
- **Why not thin:** First-party hours, prices, party packs, address, phone,
  email. Not a directory card.

## CONCEPT_DESIGN_REVIEW — five checks (guest doors only)

Not publishing to `/transformations/`. Checks recorded so a later keep/recast
has a baseline.

| Slug | Truthful | Clear | Works as presented | Safe | Owner would recognise |
| --- | --- | --- | --- | --- | --- |
| conlyn-house | Yes — enquiry, not a calendar | Yes — wake here, Dundrum Bay | Yes — mailto draft | Yes — generated windows disclosed | Yes — their rooms, breakfast, purple door |
| cafe-mauds | Yes — hours sourced to Visit Mourne | Yes — walk-in, ice cream named | Yes — no fake reserve | Yes — generated cup disclosed | Yes — Waterfoot / Mauds ice cream |
| binghams-menswear | Yes — appointment, hire list from their page | Yes — occasion then the shop | Yes — mailto draft | Yes — generated jacket disclosed | Yes — named hire styles |
| marine-wellness | Yes — Booksy is the diary; A&E strip honest | Yes — can they see us soon | Yes — handoff to Booksy | Yes — generated room disclosed | Yes — Patricia, Castlewellan Road |
| cocos-adventure-playground | Yes — hours/prices from their pages | Yes — open now / party | Yes — call script | Yes — generated hall disclosed | Yes — Coco / Bumper packs |

Blockers: none for a noindex guest door. Improvements: replace generated
plates with owner photography; Conlyn still has no published rates; Mauds
hours should be re-checked on Facebook before any outreach; Marine Wellness
legal name vs Beauty Haven still a caveat.
