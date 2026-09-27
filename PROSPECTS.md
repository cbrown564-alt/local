# Prospects

Human-readable summary of the Mourne Made concept pipeline. The detailed source
of truth is `research/pipeline/verifications.json`; regenerate `src/site/data/businesses.json`
with `node tools/pipeline/normalize-businesses.mjs` after changing it.

This document owns pipeline state. `PLAN.md` and `README.md` link here rather
than repeating a count.

Snapshot: 27 September 2026 · 10 public transformations · 64 concepts archived
in the portfolio review · none withdrawn · two concepts retired · one prospect
held on trading evidence · **one business contacted and replied**

**The pipeline changed shape on 27 September 2026.** The
[portfolio review](research/portfolio-review/portfolio-review-2026-09-27.md)
kept ten businesses (eleven packs) and archived the other 64 packs to
`archive/concepts/`. The ten now move through the
[demand workstream](research/demand/README.md), which records each one's rung
on an evidence ladder. That table, not this file's stage column, is where
progress is tracked until a business reaches **Contacted**.

## Stages

`Shortlisted → Concept in progress → Concept published → Contacted → Mock-up
requested → Client`

Use **Assessed – not shortlisted** when research is worth keeping but no concept
is planned. A local route alone does not change a stage.

**Held** is not a stage. It is a flag laid over whatever stage a business has
reached, recording that it must not be published or contacted until a named
condition is met. A held business keeps its real stage in
`research/pipeline/verifications.json`.

Before publishing a concept:

- verify the business and material claims;
- answer the five checks in `docs/CONCEPT_DESIGN_REVIEW.md`;
- add a Publish record to `research/publication.json`;
- add the slug to `publicTransformationSlugs`;
- update the stage here and in `research/pipeline/verifications.json`.

## Closed publication decisions

Both decisions left open by `PLAN.md` section 2 were answered on 3 August 2026,
each after a live side-by-side at phone and desktop. Both concepts publish,
taking the public portfolio to eighteen.

| Business | Town | Stage | Outcome |
|---|---|---|---|
| Kelly, McEvoy & Brown | Dundrum | Concept published | **Publish** — two blockers cleared |
| Painted Earth | Newcastle | Concept published | **Publish** — project owner's decision |

### Kelly, McEvoy & Brown — published

The 27 July identity blocker is repaired: the concept carries the firm's own
mark, its yellow-and-grey palette and two source-matched project photographs.

The live comparison then found a second, larger problem. The case study's
premise — a portfolio "rendered as plain text links beneath a small carousel" —
is not true of `kmbni.com`. Its `/portfolio` page is a photographed six-sector
grid leading to per-project pages with their own images; only the nav dropdown
is a text list. That claim is gone. The premise now describes the real
improvement: on the live site the work opens one sector at a time and it takes
four clicks to reach a single building, while the concept holds all thirteen
projects in one register filterable by sector. The inert "Contact the team"
button is replaced by the firm's own published phone number and email, carried
across from its live header.

Two of thirteen projects carry an image; the rest wait on confirmed rights.

### Painted Earth — published on the project owner's decision

Recorded plainly because the reviewer and the project owner disagreed. The
review recommended stopping it as an internal exploration: Painted Earth is a
gallery whose strength is photography of real work by named makers, and the
concept cannot show any of it — the shop's catalogue spans 92 makers with no
recorded licence, so every artwork is a drawn placeholder tile. On the fifth
check's "is this better than what they already have", the live gallery wins on
imagery.

The project owner's decision, on 3 August 2026, was to publish: the tiles are
visibly labelled placeholders, the rest of the loop carries enough on its own,
and asking an owner to picture their own photography in place of a labelled
placeholder is a small ask. That is consistent with Betty's Better Butters and
Douglas & Cromie, both public on the same basis.

The concept is limited to what happens around original art — collection and
shipping-quote terms before the buying action, and a route on from work that has
sold. It is not a repair case and must never be presented as one: the shop runs
a polished store and added the catalogue filters that motivated the original
proposal before the concept was built, which the page says in its own words. The
business has not been contacted.

The first improvement to raise if it ever engages is the imagery: replace the
placeholders with the shop's own photography the moment it supplies or licences
it.

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

The ten kept in the 27 September review, in demand-workstream order. The
Avoca Hotel concept (unpublished) rides with Hugh McCann's: one family, both
properties.

| Business | Town | Main concept work | Dossier |
|---|---|---|---|
| Hugh McCann's | Newcastle | Venue-led date and guest-count wedding enquiry | [dossier](research/demand/dossiers/hugh-mccanns.md) |
| Scopers | Dundrum | Zero-waste bar and supper-club night | [dossier](research/demand/dossiers/scopers.md) |
| Coco's Adventure Playground | Newcastle | Walk-in play, party booking path and honest hours | [dossier](research/demand/dossiers/cocos-adventure-playground.md) |
| Mourne Cycles | Newcastle | Storefront, workshop and Cycle to Work | [dossier](research/demand/dossiers/mourne-cycles.md) |
| Newcastle Chamber of Commerce | Newcastle | Directory, events and joining route | [dossier](research/demand/dossiers/newcastle-chamber.md) |
| Hotel Enniskeen | Newcastle | Five-page hotel concept, rooms, dining and Bookin1 handoff | [dossier](research/demand/dossiers/hotel-enniskeen.md) |
| Conlyn House | Newcastle | Named rooms and rates with an honest enquiry path | [dossier](research/demand/dossiers/conlyn-house.md) |
| Arley House | Dundrum | Guest-house front door, village map and phone enquiry | [dossier](research/demand/dossiers/arley-house.md) |
| Donard Veterinary Clinic | Newcastle | Appointment request and emergency information | [dossier](research/demand/dossiers/donard-veterinary.md) |
| Newcastle Family Dental Care | Newcastle | Secure practice front door and appointment panel | [dossier](research/demand/dossiers/newcastle-dental.md) |

Arley House, Conlyn House and Coco's were published on 23 August 2026 with a
labelled placeholder in place of a before capture. Each dossier's first step
is to capture a real one.

## Archived — 27 September 2026

64 packs, including 49 that were public, were taken out of the build. The
reason for each is in
[`research/portfolio-review/verdicts-2026-09-27.json`](research/portfolio-review/verdicts-2026-09-27.json)
and on its card in the
[contact sheet](archive/contact-sheet-2026-09-27.html). In short: 22 solved a
problem the business doesn't have, 26 are walk-in or low-ticket trades where a
bespoke site doesn't pay back, 4 are decided by a group or brand, 7 win work
by referral or habit, 4 aren't confirmed trading, and 1 overlapped the kept
list. Seven carry a named reopen trigger (review, "Worth reopening").

Archiving is not retirement. The research, verification records and
publication reviews are kept, and `archive/README.md` says how to restore a
pack. The July-era case histories above (Kelly, McEvoy & Brown; Painted
Earth; The Buck's Head) are kept as the record of those decisions.

## Withdrawn

None. Kelly, McEvoy & Brown, withdrawn on 27 July 2026 for fifth-check repair,
was republished on 3 August 2026. The two concepts retired at the same review
are below and are not candidates for republication.

## Retired concepts

Both were unpublished on 26 July 2026 and retired outright on 27 July 2026. The
concept pages, styles and media are deleted; the verification records and the
triage records in `research/triage/` are kept, and they carry
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
and that sweep did not catch it. `research/pipeline/verifications.json` now records the
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

The pharmacy stays in `research/pipeline/verifications.json` as an assessed business.
Nothing about its trading status is in doubt.

## Held

| Business | Stage | Reason | Unblock condition |
|---|---|---|---|
| South Down Signs | Shortlisted | Online evidence is stale; no concept work started | Confirm trading in person or from current business evidence |

Murdock Brothers, held since July on trading evidence, was archived on
27 September 2026. The unblock condition travels with it as its reopen
trigger: confirm trading first-hand, then heating-oil season makes it timely.

South Down Signs carries no explicit `stage` in `research/pipeline/verifications.json`;
`tools/pipeline/normalize-businesses.mjs` defaults an unset stage to **Shortlisted**.

The remaining assessed businesses and their evidence stay in
`research/pipeline/verifications.json`. The earlier detailed pipeline, including the
retired v1.1 score history, is archived at
`docs/archive/prospects-before-publication-reset-2026-07-25.md`.
