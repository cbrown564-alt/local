# Portfolio review — 27 September 2026

The whole portfolio, looked at in one sitting: every concept pack rendered
and screenshotted, every research folder, the verification records, the
July market audit and the one outreach response. The question was not "which
concepts look good". It was **which of these businesses has a problem a
website can solve, and could pay for the fix**.

Result: **11 packs kept** (10 businesses; the Avoca Hotel rides with Hugh
McCann's), **64 archived**. The public portfolio goes from 59 to 10.

- Contact sheet of all 75, grouped by verdict: [`archive/contact-sheet-2026-09-27.html`](../../archive/contact-sheet-2026-09-27.html)
- Verdict data, one line per concept: [`verdicts-2026-09-27.json`](verdicts-2026-09-27.json)
- What the archive holds and how to restore a pack: [`archive/README.md`](../../archive/README.md)
- The next workstream, for the ten that remain: [`research/demand/`](../demand/README.md)

## What the review found

**1. The build proved speed, not demand.** 75 packs exist; 59 were public.
Two months after the first one-sheet was ready, one business has been
contacted. The Buck's Head replied that a new site was already built. The
Scopers and Cúpla sheets were built, checked and never handed over. Demand
evidence so far: **n = 1, answer = no current opportunity.** Nothing in the
repository contradicts the premise of this review, that there is little
evidence anyone wants this yet.

**2. Most of the portfolio was made in two batches, and it shows.**
The first 18 (July) were each verified, captured against the real site,
reviewed against five checks, and in several cases withdrawn and repaired
when a claim turned out false. The next 41 were published between 23 August
and 14 September as "first-50 grafts". **All 41 used a labelled placeholder
in place of a real before capture**, and their case-study notes are the same
three paragraphs with the name swapped. A further 16 were built on 13–15
September and never published. The later summaries read like a template
filling itself in: "given a [adjective] hero, [noun] showcase, and direct
phone booking". Several use the same drawn generic shopfront (Great Jones, KD
Hair, McCready's, The Joke and Toy Shop, Dundrum Physio).

**3. The July market audit already said who would pay, and the portfolio
mostly ignored it.** The audit's ROI map (research/pipeline/Newcastle_Dundrum_Commercial_Digital_Landscape_2026.pdf, p.18–19)
puts accommodation, weddings, destination dining and high-value services in
the high-return zone, and walk-in cafés, takeaways and seasonal
micro-operators in the lean-presence zone, where "one live information page
plus Google and social" is the right-sized answer. **26 of the 75 packs are
lean-presence businesses** given a bespoke multi-section site.

**4. A large share of the concepts solve nothing the business has.** 22
packs restyle a business whose own route already works (a Shopify store, a
ResDiary or GuestDiary engine, Booksy, a 2025 rebuild), or had just been
replaced (The Buck's Head, The Donard Hotel). The pipeline's own rule, the
"Buck's Head rule" (on a maintained site, the only honest case is the
journey, not the appearance), was written in July and stopped being applied
in August.

**5. The good concepts share one trait: a specific, checkable failure that
costs the business money.** A wedding venue with no way to send a date. A
guest house whose "Book Now" is a contact form with a typo on the button. A
dental practice whose domain hands patients to a different practice over
plain HTTP. A bike shop on a free-tier 2014 Wix site with no workshop booking.
Every one of these can be said to the owner in one sentence, without
mentioning design.

## How each concept was judged

Four questions, in this order. A concept had to clear all four to stay.

| # | Question | Evidence used |
|---|---|---|
| 1 | **Is there a business problem?** A specific failure on the route to a booking, order or enquiry, not a look. | Verification records (`research/pipeline/verifications.json`), elevation briefs, recorded faults T1–T10 |
| 2 | **Can a fix pay back?** High or medium-high on the audit's ROI map: value per customer action × ability to attribute it. | July audit p.18–19 |
| 3 | **Is the decision made at this door?** Independent, local, reachable; not a branch of a group or brand. | Verification caveats, briefs |
| 4 | **Does the concept show the fix?** A working mechanism (enquiry, booking handoff, order) rather than a hero with "walk in / ring us". | The contact sheet, the concept routes, per-page pins |

Trading status is a gate before all four: an unconfirmed business can't be
pitched at all.

## Kept — 10 businesses, 11 packs

| Business | Town | Lane | The problem, in one sentence | Why it can pay |
|---|---|---|---|---|
| Enniskeen Country House Hotel | Newcastle | Accommodation | A c.2012 template with 2013 tracking tags stands in front of a working Bookin1 engine. | Room nights; direct booking avoids OTA commission |
| Hugh McCann's (+ Avoca Hotel) | Newcastle | Weddings + accommodation | A venue that sells dates has no way to send one; the sister hotel is on a hibu legacy brochure with no prominent booking route. | One wedding is a large booking; one family owns both |
| Arley House | Dundrum | Accommodation | Rooms are only for sale on Booking.com / Airbnb or by phone; the house's own domain is a parked frameset. | Commission on every OTA night. The audit named it an immediate prospect |
| Conlyn House | Newcastle | Accommodation | Nine named rooms and a £80–£120 rate card, and "Book Now" is a contact form whose button reads "Sumbit". | Visitors who want to book now leave for an OTA |
| Scopers | Dundrum | Destination food + events | Supper clubs sell only on Facebook / Instagram; logged out, the next date can't be found. | Ticketed nights and vouchers. The audit named it an immediate prospect |
| Mourne Cycles | Newcastle | Specialist retail + workshop | A Trek dealer since 2002 on a free-tier 2014 Wix site: no range, no prices, no workshop booking. | Bikes, servicing, Cycle to Work |
| Donard Veterinary Clinic | Newcastle | High-value service | A 2017 site that blocks zoom; "Book Appointments" is a phone number; the census domain is dead. | Appointment requests from a lifelong client base |
| Newcastle Family Dental Care | Newcastle | High-value service | Both of the practice's domains send patients over plain HTTP to another practice's page. | Private patients; a privacy liability to remove |
| Coco's Adventure Playground | Newcastle | Attraction / parties | Opening status and party terms live on a Facebook widget "updated about 5 years ago". | Parties at £12.50–£13.50 a head, £100 minimum (its own published prices) |
| Newcastle Chamber of Commerce | Newcastle | Collective infrastructure | The town's chamber runs on a Gmail address and social pages. | Not revenue: a channel to every member business, and the audit's shared-platform case |

Arley House, Conlyn House and Coco's were among the 41 grafts, so they carry
a placeholder before. Capturing a real one is the first item on each dossier.

Donard Veterinary is also the homepage's live worked example. That's a
coincidence, not the reason it stays; it would have been kept anyway.

## Archived — 64 packs

Grouped by the first question each failed. The full one-line reason for every
concept is in [`verdicts-2026-09-27.json`](verdicts-2026-09-27.json) and on
its contact-sheet card.

| Group | Count | Concepts |
|---|---:|---|
| **Already solved or only restyled.** Their own route works, or was just replaced. | 22 | The Buck's Head, Fish & Farm, The Donard Hotel, The Dundrum Inn, Castle Farm, Painted Earth, Kelly McEvoy & Brown, Marine Wellness, Piccolo Kitchen, Harbour House, Black Box Donuts, Dacara, Stile Glass, Newcastle Tennis Club, Ireland's Appliance Centre, Brunel's, Great Jones, First 4 Floors, The Clay Project, BSW Autohouse, Binghams Menswear, Villa Vinci |
| **Walk-in or low-ticket.** The audit's lean-presence lane. | 26 | Cúpla, Kent Amusements, Café Mauds, Birch, Café 67, Niki's Kitchen, Railway Street, Tip Top, Shimna Café, Savoy Cafe, Sucos, John Mac's, Joe's Quality Meats, Small's Butchers, The Cookie Jar, Thumbelina, The Joke and Toy Shop, Vintage etc., Deja Vu, KD Hair, Charlotte's Web, Shimna Taxis, McCready's Footwear, Betty's Better Butters, Bear Necessities, The Tool Centre |
| **Decision sits elsewhere.** Group, brand or head office. | 4 | MediCare Thorntons, Morelli's, Mourne Seafood Dundrum, Bardan Cottage |
| **Demand arrives by relationship.** Referral, regulation, waiting list. | 7 | Dominic McInerney, Keown Nugent, Stephen Morgan, Chatterbox, Dundrum Physio, Armstrong Opticians, Terry King & Sons |
| **Not confirmed.** Trading or site state unverified. | 4 | Murdock Brothers, Serenity, Bonny's Caravan Park, Douglas & Cromie |
| **Overlap.** A real case, but the kept list already has the shape. | 1 | The Hutt Hostel |

### Worth reopening, and when

Archiving is not a judgement that these businesses are poor prospects for
ever. Seven carry a named trigger:

| Concept | Reopen when |
|---|---|
| Murdock Brothers | Trading is confirmed at the yard. Heating-oil season (October–February) makes an order-a-fill page timely. |
| Douglas & Cromie | They are confirmed still selling cars. It's the clearest "your site is gone" conversation we have. |
| Bonny's Caravan Park | A re-probe finds the site still down. Holiday-home sales are high value. |
| The Hutt Hostel | An accommodation pilot works and there is a pattern to repeat. |
| The Tool Centre | A presence-repair package exists (Google profile + one page). This is its first local test. |
| Armstrong Opticians | The shop refit finishes; a reopening is a natural relaunch moment. |
| McCready's Footwear | We are ever in the shop: the live Lorem ipsum is a one-hour favour, not a sale. |

## Limits of this review

- **It's one reviewer's reading.** No second reviewer signed it, and the
  standing rule (decision register C12) applies: don't describe it as
  independently reviewed.
- **The evidence is outside-in.** Nothing here measures what any business
  earns, spends or wants. That's the job of the demand workstream, and it
  may overturn verdicts in either direction.
- **Economic lanes are sector-level.** A walk-in café with a strong private-
  hire or catering line may be a better prospect than its lane suggests. The
  reopen triggers are where such exceptions go.
- **Screenshots were taken with reduced motion on**, so video heroes show
  their settled frame, as the method requires.
