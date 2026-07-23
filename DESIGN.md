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

The homepage opens on Product Stage: a two-column offer pairs one direct headline with a short supporting sentence and CTA. The featured before/after comparison follows immediately at full width, without forcing all of the content into one viewport. Place belonging then arrives as a full-bleed Newcastle shore moment. Alternative directions remain at `/prototypes/home/`.

Antonio is the display face. Its narrow proportions provide energy without adding more elements to the page. Atkinson Hyperlegible Next is the body face for open, readable text. The large type is part of the composition; supporting copy stays short.

## Layout

The public homepage is deliberately sparse: product-led opening, two actions,
one featured transformation, then place identity, a closing request, and the
community commitment. Detailed critique appears only on the transformation
page. Content uses a 1180px maximum width, long vertical spacing and a small
set of strong alignments.

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

- **Castle Farm** — warm cream and farm green, Georgia serif, produce-led.
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
  hotel's two small bathroom photographs are matted on pine at natural scale
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

Concept screenshots are always captured at 1265×710 at 2x so comparisons align
exactly, and concept pages carry a fixed "Independent concept" marker.

## Components

- Wordmark and compact primary navigation
- Primary gorse-yellow button and secondary text link
- Independent-concept disclosure
- Before/after range comparison
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

Motion includes a short product-stage entrance, a slow bay image drift on the place band, navigation underlines, button feedback and the numbered marker entrance. `prefers-reduced-motion` removes nonessential animation. The comparison and form are keyboard operable, focus remains visible, images have meaningful alternatives, and concept disclosures are present in text rather than colour alone.
