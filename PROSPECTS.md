# Prospects

Human-readable summary of the Mourne Made concept pipeline. The detailed source
of truth is `research/verifications.json`; regenerate `src/data/businesses.json`
with `node scripts/normalize-businesses.mjs` after changing it.

This document owns pipeline state. `PLAN.md` and `README.md` link here rather
than repeating a count.

Snapshot: 28 July 2026 · sixteen public transformations · one concept withdrawn
for fifth-check repair · two concepts retired · one active next prospect · two
prospects held on trading or suitability evidence · **one business contacted
and replied**

## Stages

`Shortlisted → Concept in progress → Concept published → Contacted → Mock-up
requested → Client`

Use **Assessed – not shortlisted** when research is worth keeping but no concept
is planned. A local route alone does not change a stage.

**Held** is not a stage. It is a flag laid over whatever stage a business has
reached, recording that it must not be published or contacted until a named
condition is met. A held business keeps its real stage in
`research/verifications.json`.

Before publishing a concept:

- verify the business and material claims;
- answer the five checks in `CONCEPT_DESIGN_REVIEW.md`;
- add a Publish record to `research/concept-reviews/publication.json`;
- add the slug to `publicTransformationSlugs`;
- update the stage here and in `research/verifications.json`.

## Active next prospect

| Business | Town | Stage | Planned work |
|---|---|---|---|
| Painted Earth | Newcastle | Shortlisted | Internal representative prototype: existing live filters preserved; product and occasion routes lead, place remains optional, and the original-art loop exposes collection/shipping terms and sold-work recovery |

The concept is planned in
[`research/painted-earth-concept-plan.md`](research/painted-earth-concept-plan.md)
(updated after the 27 July 2026 build-day re-check), with its dated catalogue
evidence in `research/painted-earth-catalogue-2026-07-26.json`. The internal
noindex prototype is implemented at `/concepts/painted-earth/`; it has not
passed publication review and is not part of the public transformation list.

Painted Earth already has a functioning, polished ecommerce site. It is not a
repair case and must not be presented as one. The project owner selected it on
26 July 2026 because its strong starting point makes it a better test of
proportionate improvement than another absent or failed website. The business
has not been contacted. The work remains an independent prototype unless the
business agrees to a pilot.

The 27 July re-check contradicted the original claim that collection pages had
no filters: the live shop now exposes price, artist or brand, product-type and
stock controls. The broad catalogue treatment was stood down. The surviving
prototype is limited to visible original-art fulfilment and sold-work recovery.

## Outreach responses

| Business | Stage | Reported response | Next action |
|---|---|---|---|
| The Buck's Head | Contacted | A director replied on 27 July 2026 that a new website has already been built and will launch when the accommodation is ready. | Stop the redesign pitch. Re-check after the accommodation and site launch, or reply sooner only if invited. |

This is recorded as **no current opportunity**, not as a rejection: the reply
establishes that replacement work is already complete, but it does not state a
launch date or rule out future contact. The existing public concept remains
dated portfolio work for now. Re-review it against the launched site before
using it in any later outreach.

## Public concepts

| Business | Town | Main concept work |
|---|---|---|
| Hotel Enniskeen | Newcastle | Five-page hotel concept, rooms, dining and Bookin1 handoff |
| The Buck's Head | Dundrum | Table booking and HTML menus |
| Mourne Cycles | Newcastle | Storefront, workshop and Cycle to Work |
| Newcastle Chamber of Commerce | Newcastle | Directory, events and joining route |
| Kent Amusements | Newcastle | Attractions and seasonal-hours structure |
| Donard Veterinary Clinic | Newcastle | Appointment request and emergency information |
| Cúpla | Dundrum | Bilingual café opening and sample menu |
| The Tool Centre | Newcastle | Hardware and plant-hire desk with hire-list |
| Scopers | Dundrum | Zero-waste bar and supper-club night |
| The Dundrum Inn | Dundrum | Tonight board and GuestDiary journey |
| The Donard Hotel | Newcastle | Property-first arrival, published room rates and official booking handoff |
| Newcastle Family Dental Care | Newcastle | Secure practice front door and appointment panel |
| Hugh McCann's | Newcastle | Venue-led date and guest-count wedding enquiry |
| Betty's Better Butters | Dundrum | Product-led range using the maker's real mark and butter photography |
| Douglas & Cromie | Newcastle | Restored garage identity, direct contact details and current-vehicle check |
| Castle Farm Fresh Produce | Dundrum | Produce-led weekly-box journey with the farm's navy-and-gold identity |

## Withdrawn for fifth-check repair

These concepts remain as internal, noindex work but are no longer public
transformations. Each is back at **Concept in progress** until the named
identity blocker is repaired and all five publication checks pass again.

| Business | Town | Unblock condition |
|---|---|---|
| Kelly, McEvoy & Brown | Dundrum | Carry the firm's yellow-and-grey mark and project photography into the filterable register |

## Retired concepts

Both were unpublished on 26 July 2026 and retired outright on 27 July 2026. The
concept pages, styles and media are deleted; the verification records and the
triage records in `research/concept-reviews/triage/` are kept, and they carry
the full reasoning. Neither is a candidate for republication.

### Tonn Ruray Café · Dundrum

**The concept was worse than the website it proposed to replace, and all four
checks passed it.** Tonn Ruray is a new business whose site is personal and
deliberate: its own shopfront photograph in low golden light, its own food
photography, a Gertrude Stein quote on coffee that someone chose because they
liked it, a hand-drawn squiggle under *See the Menu*, one consistent dusty-pink
and italic-serif identity. The concept deleted the photography in favour of
typography on cream, compressed the owners' chosen quote into a grotesk slogan
and credited it back to them, replaced their palette with the studio's, rendered
all seven of its links as struck-through dead placeholders, and printed a remark
about the owners' own room pricing inside the page being offered to them.

The gap on that site is real but it is not a design gap: a menu PDF stamped
JUN24, two years stale, and a *BOOK NOW* that resolves to a contact form. Those
are maintenance problems, and a redesign does not fix them.

**A false claim was found during the retirement.** The published case study and
the before-clip alt text both stated that the homepage opens on *Sea View Luxury
Apartments* and nightly rates with the café second beneath the accommodation.
The capture we published shows the homepage opening on the café shopfront with
`EAT` first in the navigation, and no apartments or rates anywhere in the
captured scroll. The first of the three case-study notes rested entirely on that
claim. This is a fourth false sourcing claim of the class corrected on 26 July,
and that sweep did not catch it. `research/verifications.json` now records the
apartment-first reading as contradicted.

### Groves Chemist · Dundrum and Killough

**The concept proposed to rebuild something the pharmacy came off.** The live
domain serves a centralised platform's deactivation notice — *"If you are the
pharmacy owner, please contact The Pharmacy Centre to re-activate"* — so what
was switched off was The Pharmacy Centre / Medicine Chest product, not something
Groves built. The design task was written as *restore the capability that was
switched off*, which presumes they want it back. The evidence establishes only
that it stopped, and not whether they opted out, let it lapse, or had it retired
for them. Offering to rebuild it is offering work they have already declined.

The pharmacy stays in `research/verifications.json` as an assessed business.
Nothing about its trading status is in doubt.

## Held

| Business | Stage | Reason | Unblock condition |
|---|---|---|---|
| Murdock Brothers | Concept in progress | Trading status is not confirmed strongly enough for public use | Confirm trading from a current authoritative or first-hand source |
| South Down Signs | Shortlisted | Online evidence is stale; no concept work started | Confirm trading in person or from current business evidence |

South Down Signs carries no explicit `stage` in `research/verifications.json`;
`scripts/normalize-businesses.mjs` defaults an unset stage to **Shortlisted**.

The remaining assessed businesses and their evidence stay in
`research/verifications.json`. The earlier detailed pipeline, including the
retired v1.1 score history, is archived at
`docs/archive/prospects-before-publication-reset-2026-07-25.md`.
