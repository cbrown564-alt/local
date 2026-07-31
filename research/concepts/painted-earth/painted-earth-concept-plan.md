# Painted Earth — representative retail prototype, concept plan

The one deliberate exception to the closed portfolio: a full retail treatment
for a shop that already runs a polished, functioning e-commerce site. It exists
to test the **retail form** of the broader Mourne Made offer, not to increase
the concept count. It is a representative prototype until the business agrees
to take part, and it must never be described as a client pilot, client work or
a repair case.

Written 26 July 2026, after a live re-check of the shop's own site and
catalogue. Direction and imagery policy decided by the project owner the same
day. Roadmap entry in `PLAN.md` under "Next milestones" item 1; stage in
`PROSPECTS.md`; verification record in `research/pipeline/verifications.json`.

The dated catalogue snapshot behind the 26 July numbers is
`research/concepts/painted-earth/painted-earth-catalogue-2026-07-26.json`.

**Build-day gate, 27 July 2026.** The shop changed before implementation. Its
collection pages now expose filters for price, brand or artist, product type
and stock state. That directly contradicts the central 26 July finding below.
The broad six-facet catalogue concept was therefore not built. The
representative prototype was narrowed to what survived the re-check:

- familiar product and occasion routes first, with place as an optional route;
- original-art fulfilment visible before checkout;
- recovery from sold work to available work by the same artist or the gallery.

The implemented four-state prototype lives at `/concepts/painted-earth/`. It
remains internal and noindex; implementation is not a Publish decision.

---

## 1. What the shop actually is (re-checked 26 July 2026)

Shopify store, theme "New web design". All figures below come from the shop's
own public endpoints — `/products.json`, `/collections/<handle>/products.json`,
`sitemap_*.xml` — and its rendered HTML.

**Catalogue.** 1,168 products fetched (product sitemaps list 1,169), across
**92 named makers** and ~113 collections. **876 available, 292 unavailable
(25%).** Variant prices £1.50 to £2,950, median £24.

**Shop.** 98 Main Street, Newcastle, Co. Down, BT33 0AE · 028 4372 2510 ·
Mon–Sat 10:00–17:00, Sun 13:00–17:00. Free shipping over £100 UK & NI, other
rates at checkout. Next-day dispatch Mon–Fri; weekend orders go Monday. Free
gift wrap on all orders. 30-day returns, customer pays return postage, tracked
over £75; perishables, personalised items, earrings, personal care, sale goods
and gift cards non-returnable. Two contact addresses in use:
`hello@paintedearthgifts.com` (general) and `shop@paintedearthgifts.com`
(returns and exchanges).

**Gallery.** Light-filled upstairs space, opened spring 2025 (blog post "Art &
Craft Gallery Launch", 15 April 2025). The page's own words: *"Our lightfilled
upstairs gallery space has added a new dimension to Painted Earth. It is the
perfect canvas to showcase our Artist and Craftspeople."* Three named visitor
reviews on the page. Originals £135–£850.

**Voice.** *"a small team with a big dream"* · *"true design and in high
quality, Irish craft"* · *"with the Mourne Mountains rolling in and the sea
tickling our toes"*.

These are strengths, and they stay. The photography is good, the prices are
clear, the identity is carefully made, the catalogue is deep and genuinely
local. This is not a business with a broken website.

## 2. The original argument — superseded 27 July 2026

The following was true on 26 July and explains the original direction. It is
kept as dated research, not as a current claim.

**The shop navigated by supplier, and the customer did not know the
suppliers.**

- The "Shop Collections" menu opens into six categories, but each submenu is a
  list of **supplier names**: ~20 artists under Wall Art & Prints, 13 brands
  under Home & Body, 8 under Ceramics & Glass. That works only if you already
  know Piera Cirefice or Jerpoint Glass.
- A visitor who didn't landed on `/collections/wall-art` — **222 products** —
  or `/collections/irish-craft-jewellery` — **112 products** — with nine sort
  options and **no filter UI of any kind** in the 26 July markup checked.
- The only filter links anywhere are three hardcoded menu entries
  (`?filter.p.product_type=Earrings|Necklace|Bracelet` on
  `/collections/craft-jewellery`). The capability exists in the platform and is
  surfaced three times across 1,168 products.
- No predictive search on the homepage; a plain `/search` form exists.

**And the shop has already done the work that would fix it.** The facets are
sitting in the data it maintains every day:

| Axis | Source field | Coverage |
|---|---|---|
| What it is | `product_type` | Print 177 · Card 154 · Artwork 133 · Book 76 · Earrings 64 · Acrylic Painting 46 · Necklace 43 (21 blank) |
| Who made it | `vendor` | all 1,168 products, 92 makers |
| What it's for | tags | `valentines` 126 · `Christmas gifts` 124 · `Father's day` 88 · `Mothers day gifts` 74 · `wedding day` 41 · `for him` 39 · `Piece of Home` 35 · `for her` 34 · `Souvenir` 33 · `Gift idea` 29 |
| What it costs | variant price | £1.50–£2,950 |
| Where it's of | tags + collections | `mournes` 45, plus nine place collections |
| Can I have it | availability + `shipping quote required` | 292 unavailable · 194 quote-required |

That argument is no longer current. On 27 July, live collection markup exposed
price, brand or artist, product type and stock filters. The shop has already
made a material part of the proposed improvement.

### The problem that survived the re-check

**194 products are collection-only or need a shipping quote, and they sell
through the same button as a £3 greeting card.**

The £850 oil on canvas *Sapphire — The Kingfisher* by Gary Murray (framed,
approx. 71 × 71 cm) carries "COLLECTION ONLY" and *"If you would like to have
this item shipped, please contact us first directly"* — stated twice, in caps,
inside the description body — under a plain **Add to Cart** button identical to
every other product's. It also states *"We cannot offer any returns on Original
Art."* 118 of the 194 quote-required products are already unavailable.

Alongside: **232 original artworks, 124 of them already sold** and still listed.
And **no click-and-collect anywhere on the site**, in a town where a large share
of buyers are standing within a few hundred metres of the counter.

### The third, smallest, and most fixable

**Workshops.** `/collections/creative-workshops` has held four products ever,
£30–£50, and **all four are unavailable**:

| Workshop | Date | Price |
|---|---|---|
| Gel Monoprinting with Jenny Bailie | 26/03/2026 | £30 |
| Needle felting with Deirdre McClorey | 4/6/2026 | £50 |
| Painting with Gemma Marie Blakely | 2/7/2026 | £50 |
| Needle felting with Deirdre McClorey | 6/8/2026 | £50 |

The Gemma Marie Blakely listing opens *"Currently sold out, get in touch to
join our waiting list."* The waiting list is run by hand, in the description
body of a sold-out product. The 6 August date is still ahead and already
unavailable.

## 3. Decision record

**Original direction — chosen 26 July 2026.** *The Shelf*, with place as its
front door and fulfilment as its practical layer.

**Revised direction — agreed and implemented 27 July 2026.** Product and
occasion routes lead because they work for locals, tourists and remote
customers. Place is a secondary, removable shortcut rather than a required
first choice. The complete representative loop is narrowed to original art:
arrival, example shelf, available-work handoff, and sold-work recovery.

This does not claim the live shop lacks filters. The concept names its existing
price, artist, product-type and stock controls on the page. Its addition is
visible fulfilment and recovery for high-value work.

**Imagery — chosen 26 July 2026.** Drawn, visibly-labelled placeholder tiles
carrying **real** titles, makers, types, prices and availability from the dated
snapshot. No catalogue photography is republished.

Reason: `research/image-provenance.md` records that reusing a
business's marketing photography without a recorded licence was a publication
blocker — `mourne-cycles-trail.jpg` (Trek/Bontrager dealer photography) was
deleted on 25 July 2026 to clear it. Painted Earth is the same trap at scale:
its catalogue photography spans 92 third-party makers, and much of it —
OhhDeer, Gill Books, Field Day, Inis, McNutt — is near-certainly supplier
stock the shop does not own. The precedent in the portfolio is Betty's Better
Butters and Douglas & Cromie: real names and prices, labelled placeholder art.

**Hard nuance to hold at build time:** a drawn tile must never read as a named
maker's actual work. Placeholders must be visibly non-photographic and carry a
placeholder label, so that "Piera Cirefice · Mourne Mountains Mugs · £19.00"
attributes the *product record* to her and the *drawing* to nobody.

## 4. Identity

Taken from the shop's own marks, per the `docs/DESIGN.md` rule that a concept
carries the subject's identity and never the studio's.

- **Mark.** A hand-lettered **circular roundel**: "PAINTED" in shadowed display
  caps over "Earth" in a flourished script, ringed by filigree swirls and
  stars inside a double border. This is the strongest identity anchor in the
  portfolio so far and the layout should use its geometry — the ring, the
  seal, the flourish as a divider.
- **Palette**, from the live site's own CSS: deep teal `#094456`, mid teal
  `#3a9198`, antique gold `#aa7f40`, near-black `#231F20`, white.
- **Separation risk.** Antique gold sits close to Enniskeen's honey brass
  `#C9973B` and the Chamber's civic brass. The palette is the shop's own and
  does not change; separation must come from typography, the roundel geometry
  and the density of a catalogue page, none of which the other two share.
- **Type — proposal, settle at build.** No face may be reused from an existing
  concept. Candidate pairing: **Yeseva One** for display (warm, high-contrast,
  faintly art-nouveau — echoes the roundel's lettering without imitating it)
  with **Manrope** for the working parts, which here carry prices, facet
  counts and availability and need to stay quiet and legible. Yeseva One is a
  single weight; if that proves too thin for a catalogue page, **Eczar**
  (400–800) is the fallback. Register the choice in `ConceptLayout.astro`'s
  `conceptFonts` map.

## 5. The implemented prototype

Four states, one loop, phone-first. Multi-page concepts live in
`src/pages/concepts/<slug>/` with a shared shell component, per Enniskeen,
Buck's Head and the Chamber. Slug: `painted-earth`. Stylesheet:
`src/styles/concept-painted-earth.css`, scoped by body class.

**1 · Arrival.** Roundel-derived header, real hours and address, search into
the live shop, and familiar product or occasion routes. Place appears second:
Mournes, Murlough, Tollymore, Newcastle and Royal County Down apply a removable
filter to the example original-art shelf.

**2 · Original-art shelf.** Eight clearly labelled example records exercise
artist, place, price and availability. Desktop controls sit beside the results;
on a phone they move into a native dialog. No-match recovery clears the
prototype filters or opens the live gallery.

**3 · Available detail.** *Rossglass To Mournes* shows collection-only and
shipping-quote choices before handoff. The product action opens Painted
Earth's real product page; the quote action opens its real contact page. No
cart permalink is invented or exercised.

**4 · Sold recovery.** *Cutie The Puffin* routes to available coastal work,
the live original-art collection and the shop's contact page. An available
Gary Murray work is shown as the immediate next choice.

**Handoff.** The prototype stops at the live product or contact page. It does
not add an item, submit a quote, or enter checkout.

## 6. Customer action, upkeep and measurement

Required by `PLAN.md`; recorded here in advance so the build is accountable to it.

**Primary customer action.** Reach an available original on the shop's live
product page with its collection-only status understood. **Secondary:** open
the live contact route to request a shipping quote.

**Upkeep responsibility.** Close to zero *new* work, which is the point: every
facet is generated from `vendor`, `product_type`, `tags`, price and
availability, all of which the shop already edits daily. The one genuine cost
is **tag hygiene**, and it must be named honestly rather than glossed:

- 21 products carry a blank `product_type`.
- The tag vocabulary has near-duplicates that would split facet buckets:
  `Card` / `greetings card` / `Greeting Card`, `original` / `originals` /
  `original art`, `Prints` / `print`, `soap` / `Soaps`.
- `welcome discount ok` (1,067) and `stock checked` (193) are operational tags
  that must never surface to a customer.

So the honest statement is: the facets cost nothing new to run, but they make
tagging load-bearing, and a one-off vocabulary tidy is part of the proposal.

**Measurement plan.** All of these require the shop's own analytics and
therefore **cannot be measured on a prototype** — that limitation is stated on
the page, not implied:

1. Share of original-art collection visits that reach an available product.
2. Shipping-quote enquiries started from an original-art product.
3. Sold-artwork visits that continue to another work by the same artist or the
   gallery instead of exiting.

Baseline before, agreed measure reviewed at 30 days — and only after a business
agrees to a pilot, per the standing constraint.

## 7. What will not be invented

- Stock levels, delivery promises or fulfilment terms beyond the published ones.
- A click-and-collect service. The shop does not offer one today; the concept
  may *propose* it, clearly labelled as a proposal, and must not imply it exists.
- Workshop dates, prices or availability beyond the four real records.
- Maker biographies beyond the makers' own published words.
- Customer results, owner approval, or any suggestion of a relationship.
- Photography attributed to any named maker (see §3).

## 8. Preconditions and gates

- **Build-day re-check completed 27 July 2026.** The central discovery claim
  failed because live collection pages now expose filters. The prototype was
  narrowed and the change recorded here and in `research/pipeline/verifications.json`.
- **Dated sample only.** Counts come from the 26 July snapshot; example
  availability and live collection terms were checked again on 27 July.
- **No real orders.** Automated verification of the cart handoff stops before
  payment. Encode the stop; never complete a purchase on the live store.
- Publication still requires the five checks in `docs/CONCEPT_DESIGN_REVIEW.md`, a
  Publish record in `research/publication.json`, the slug in
  `publicTransformationSlugs`, and stage updates in both `PROSPECTS.md` and
  `research/pipeline/verifications.json`.

## 9. Out of scope

- Any rebuild framing, any "before/after repair" language, any implication the
  current site is failing. This is the honesty line the plan exists to hold.
- Replacing the shop's checkout, payments, theme or photography.
- Secondary pages beyond the four screens — nav stubs stay visibly inert.
- Contacting the business. It has not been contacted, and outreach is a
  separate decision downstream in `PLAN.md`.

## 10. Risks

| Risk | Handling |
|---|---|
| The shop added facets before build day | Pivot completed: the concept no longer claims filtering is absent |
| Real prices in the build go stale and become false | Dated snapshot committed; snapshot date printed on the page; re-pull on build day |
| Drawn tile reads as a named maker's actual work | Visibly non-photographic treatment plus placeholder label on every tile (§3) |
| Reads as a repair case despite the framing | Open on the shop's strengths; the argument is "your data, unused", not "your site is broken" |
| Live product or contact links change | Re-check before any review or publication |
| Antique gold collides with Enniskeen / Chamber brass | Separate on type, roundel geometry and catalogue density; palette stays the shop's own |
| Proposing click-and-collect is mistaken for an existing service | Labelled as a proposal wherever it appears; §7 |

## 11. Open items

1. No decision yet on whether this concept is ever published; it needs the five
   checks and a separate Publish decision either way.
2. A real pilot would need same-day catalogue data rather than the eight-record
   internal example set.
