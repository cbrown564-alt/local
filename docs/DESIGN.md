# Design system

## Brand

**Mourne Made** is a local digital studio for Dundrum and Newcastle. The name joins place and practice: work made here for businesses and organisations around the Mournes. It is local without limiting the studio to one street or one kind of client.

The primary identity is the **Side tab maker's stamp**: Mourne and Made stacked in a compact bay-ink field, signed by a narrow gorse-yellow tab. A separate Dundrum + Newcastle place line is used where space permits. At favicon and avatar size, the stamp reduces to two stacked M forms with the same yellow side tab.

The voice is neighbourly, direct and optimistic. It shows a useful change before making a sales claim. Current work is described respectfully; concepts remain clearly separate from commissioned client work.

## Visual language

Bay & Mournes — colour and atmosphere drawn from the Newcastle shore rather than generic studio chrome:

- Sea slate `#23485A` — primary local-studio colour, links and structural emphasis
- Deep sea `#1A3847` — readable accent text
- Gorse yellow `#E0C14D` — calls to action, highlights and annotation markers
- Bay ink `#132029` — type, frames and grounded contrast
- Cool mist `#E6EEF2` — quiet section backgrounds and disclosures
- Foam `#F4F8FA` — main canvas

The homepage opens on Product Stage: a two-column offer pairs one direct headline with a short supporting sentence and CTA, and the featured before/after comparison performs the offer — it arrives fully "before" and sweeps once to the settled split on load (`BeforeAfter`'s `sweep` prop, reduced-motion safe, cancelled by any user takeover). A quiet claim-door link ("if one is yours, it's yours") sits under the hero CTA. Place belonging arrives as the drawn town map: Dundrum and Newcastle with every public transformation pinned, elevated from the former photo band. Alternative directions remain at `/prototypes/home/`.

Antonio is the display face. Its narrow proportions provide energy without adding more elements to the page. Atkinson Hyperlegible Next is the body face for open, readable text. The large type is part of the composition; supporting copy stays short.

## Layout

The public homepage is deliberately sparse: product-led opening with the
reveal sweep, a visual recognition rail of the public transformations
(thumbnails, real names and towns — never the studio's chrome), the town
map, a closing request, and the community commitment. Detailed critique
appears only on the transformation page. Content uses a 1180px maximum
width, long vertical spacing and a small set of strong alignments.

The town map (`src/site/components/TownMap.astro`) is the studio's keepable
artifact: an indicative drawn map of Dundrum and Newcastle — the castle
keep, Murlough, the bay, the Mourne ridges — with a gorse pin per public
transformation. Pins are proof, not a directory: each names and opens its
transformation and nothing else is listed. Pin coordinates live on each
record in `src/site/data/transformations.ts`; the component throws at build
if a public slug has no pin, so a newly published concept never ships
invisible on the map.

The comparison page is the core product. It uses equal-sized before and after images, a keyboard-operable range input, a visible split handle, and an optional numbered annotation layer whose pins carry hover/focus tooltips drawn from the notes below. The explanation follows the markers in order below the comparison as a one-open-at-a-time accordion (chosen from four prototyped layouts at `/prototypes/design-notes/`).

## Concept identities

Each concept carries the subject's own visual identity, not the studio's. The
Mourne Made palette and Antonio display face never appear inside a concept
screen; the standalone concept pages live at `/concepts/<slug>/` with their
own stylesheet at `src/styles/concept-<slug>.css`, scoped by a body class so
identities cannot leak between concepts. `ConceptLayout.astro` owns the shared
HTML head, `noindex` rule, fixed disclosure, case-study return, claim action and
disabled placeholder-link behaviour. `concept-shell.css` owns the repeated
top-strip, direct-header and navigation geometry; each identity sets its
accent, navigation gap and underline-size tokens while keeping its distinct
hero and secondary-page layouts local.

- **Castle Farm** — the farm's navy-and-gold mark, Georgia serif and a disclosed faithful mixed-box visualisation, with the produce-led weekly-box journey kept as the proposed improvement.
- **Enniskeen** — deep pine `#1E3A2C`, cream `#F5EFE2` and honey brass
  `#C9973B` with Cormorant Garamond; a hairline inset frame, an asymmetric
  48/52 split between story and valley view, and an availability bar stitched
  across the seam. Quiet luxury, chosen against the current site's bright blue
  menu bar and centred archive logo. Full linked site since the F1 flagship
  build (23 July 2026): Home · Stay · Dine · The estate · Things to do on a
  shared shell (`src/components/enniskeen/EnniskeenShell.astro`) with a
  pine-deep footer. The availability bars take arrival date and nights only —
  exactly what the hotel's Bookin1 engine accepts — and a small submit handler
  builds the same `#/hotel/ecs/results?date=…&los=…` deep link the hotel's own
  searchbox builds (verified against the live engine on build day). The
  hotel's small Room 6 bathroom photograph is matted on pine at natural scale
  rather than stretched; all imagery is the hotel's own. The flagship case
  study adds Rooms and Dine companion stills plus a one-minute silent film
  covering the current visit, all five concept pages and both routes into
  Bookin1.
- **The Buck's Head** — spruce green, cream and blush-pink signage lettering
  with the antler mark, all taken from the pub's own frontage. Sharpened for
  the F2 journey case (24 July 2026), which is a phone-first argument: the
  hero, booking card and menus rail now stack in the order the errand runs, so
  the date-and-party card lands on the first screen instead of below the menus
  rail; the five-menu tab rail becomes a segmented block on phones, because it
  needed 594 px in a 346 px rail and silently hid Dessert and Drinks behind a
  scrollbar-less overflow. The booking card asks only for date and party size —
  the two parameters the pub's own ResDiary widget honours — so the handoff is
  real rather than decorative.
- **Newcastle Chamber** — harbour navy `#182C3F`, sea mist and civic brass
  with Newsreader; Co. Down strip and seal chrome from the civic direction,
  Main Street finder IA (directory as the product), warmer neighbour join
  voice. Full linked site at `/concepts/newcastle-chamber/`; the unlinked,
  crawler-blocked exploration archive remains at `/prototypes/chamber/`.

### Batch two (24 July 2026)

Ten more concept identities, built to break out of hospitality and to give each
prospect a signature *interaction* rather than only a look. No display face is
reused from batch one, and each carries its own `src/styles/concept-<slug>.css`
scoped by a body class. All verified clean at a true 390 px viewport (measured
via a DevTools-Protocol emulation override, because headless Chrome's window
floor of ~500 px otherwise crops a wider layout into a narrow image and fakes an
overflow that is not there).

- **The Dundrum Inn** (`dundrum-inn`) — **rebuilt 26 July 2026.** The first
  version was a Victorian playbill on slate — Bodoni Moda over Space Mono,
  gorse brass, no photograph — and it was worse than the Inn's own live
  website, which at least shows Dundrum. It also broke the rule directly above
  this list: it wore a mood board's identity, not the subject's.

  The rebuild takes its colour from the Inn's own frontage and the plum quay
  signage over the road — blush `#E2B49E`, cream `#FBF7F2`, quay plum
  `#57263C` — with Petrona for display and Hanken Grotesk for the working
  parts. The place gets a full-width hero (a labelled placeholder until a
  publishable photograph exists). The argument is a **status line and Today
  board built only from what the Inn publishes**: open-or-closed is computed in
  the browser from its winter bar hours in Europe/London, the event comes from
  its events listing, and rooms is a *search* rather than a count. Nothing
  carries an illustrative-sample label because nothing is sampled — the first
  version's kitchen closing time, room count and nightly price were all
  invented, and the Inn publishes none of the three. Journey case; the
  GuestDiary engine is kept and the four fields it takes move to the first
  screen.
- **Murdock Brothers** (`murdock-brothers`) — tanker steel and safety orange,
  Archivo + DM Mono, hazard chevrons. A **fuel-gauge order slider** (real range
  input) with the price left blank because the merchant publishes none.
- **Kelly, McEvoy & Brown** (`kelly-mcevoy-brown`) — **rebuilt 27 July
  2026.** The first version replaced the firm's recognisable identity with an
  architect's blueprint treatment and removed the project photography that
  proves its work. The rebuild carries the firm's own yellow-and-grey mark and
  source-matched photographs into the page. The useful structural change
  remains: a **filterable project register** turns a 53-year portfolio of text
  links into an index without inventing projects or image matches. First
  B2B/trade concept.
- **Betty's Better Butters** (`bettys-butters`) — the maker's real
  mountain-ring mark and butter photograph lead a butter-gold product page,
  with Rozha One for the large flavour language. A ruled **illustrative range**
  shows how flavours, allergens, serving ideas, sizes and delivery could be
  organised without presenting invented products as real.
- **Douglas & Cromie** (`douglas-cromie`) — **rebuilt 27 July 2026.** The
  first version replaced the dealer's identity with garage graphite,
  service-station amber and a number-plate motif, then placed the dead-domain
  diagnosis inside the customer page. The rebuild restores the archived
  slate-and-coral wordmark, Hind typography, vehicle photography, aftercare
  promise, services, hours and direct garage details. It shows no invented
  inventory; current vehicles remain a neutral external check.
- **The Donard Hotel** (`donard-hotel`) — **rebuilt 27 July 2026 after the
  build-day re-check found its new official site.** The invented oxblood,
  Marcellus and D crest are gone. The proposal now carries the hotel's chosen
  navy, soft gold, wide-spaced name and ESTD 1946 date without reusing its
  unlicensed logo artwork. A disclosed faithful visualisation based on Eric
  Jones's CC BY-SA 2.0 exterior photograph puts the Main Street property before
  the destination. The official booking engine remains the handoff, with the
  hotel's published room types and starting rates beside it. The earlier dead
  domain and commission diagnosis survives only as dated case-study history.
- **Newcastle Family Dental Care** (`newcastle-dental`) — clinical periwinkle
  with a coral accent, Plus Jakarta + Instrument Serif. Security *is* the
  concept: a **padlocked secure address bar** answers the insecure redirect the
  practice ships now, above a request form stated as HTTPS.
- **Hugh McCann's** (`hugh-mccanns`) — delicate Italiana over plaster, forest
  and antique gold, tuned to sit *beside* the real site's good voice rather than
  overwrite it. A feature graft: a **date-and-guest-count enquiry** with a
  season strip — the two facts every wedding call starts with.

Concept screenshots are always captured at 1265×710 at 2x so comparisons align
exactly, and concept pages carry a fixed "Independent concept" marker.

## Components

- Wordmark and compact primary navigation
- Primary gorse-yellow button and secondary text link
- Independent-concept disclosure
- Before/after range comparison, with an opt-in load sweep for the homepage hero
- Town map with per-transformation pins and hover/focus name chips
- Click-to-load reel player with WebM/MP4 sources, native keyboard-operable
  controls, a poster-first state and reduced-motion flag. Its eyebrow, note and
  play label are props, so each case study names the business it is *not*
  commissioned by
- Journey case block: a measured tap/screen table beside the side-by-side
  journey film, for cases where the honest argument is the route through a site
  rather than its appearance
- Design-notes accordion with numbered, tooltipped comparison pins
- Source and limitations block
- Request form with recovery and success messages

## Motion and access

Motion includes a short product-stage entrance, the hero comparison's single load sweep, navigation underlines, button feedback and the numbered marker entrance. `prefers-reduced-motion` removes nonessential animation (the sweep renders settled instead). The comparison and form are keyboard operable, map pins are focusable links whose name chips appear on focus, focus remains visible, images have meaningful alternatives, and concept disclosures are present in text rather than colour alone.
