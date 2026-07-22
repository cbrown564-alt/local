# Design system

## Brand

**Mourne & Main** is a local digital studio for Dundrum and Newcastle. The name combines the landscape with the main street: a local frame broad enough to include independent businesses, clubs, charities and public organisations.

The voice is neighbourly, direct and optimistic. It shows a useful change before making a sales claim. Current work is described respectfully; concepts remain clearly separate from commissioned client work.

## Visual language

Bay & Mournes — colour and atmosphere drawn from the Newcastle shore rather than generic studio chrome:

- Sea slate `#23485A` — primary local-studio colour, links and structural emphasis
- Deep sea `#1A3847` — readable accent text
- Gorse yellow `#E0C14D` — calls to action, highlights and annotation markers
- Bay ink `#132029` — type, frames and grounded contrast
- Cool mist `#E6EEF2` — quiet section backgrounds and disclosures
- Foam `#F4F8FA` — main canvas

The homepage opens on Product Stage: brand, one headline, one short supporting sentence, the CTA group and a large featured before/after comparison share the first viewport. Place belonging follows as a full-bleed Newcastle shore moment — sequential, not competing in the same screen. Alternative directions remain at `/prototypes/home/`.

Antonio is the display face. Its narrow proportions provide energy without adding more elements to the page. Atkinson Hyperlegible Next is the body face for open, readable text. The large type is part of the composition; supporting copy stays short.

## Layout

The public homepage is deliberately sparse: product-led opening, two actions, one featured transformation, then place identity and the community commitment. Detailed critique appears only on the transformation page. Content uses a 1180px maximum width, long vertical spacing and a small set of strong alignments.

The comparison page is the core product. It uses equal-sized before and after images, a keyboard-operable range input, a visible split handle, and an optional numbered annotation layer whose pins carry hover/focus tooltips drawn from the notes below. The explanation follows the markers in order below the comparison as a one-open-at-a-time accordion (chosen from four prototyped layouts at `/prototypes/design-notes/`).

## Concept identities

Each concept carries the subject's own visual identity, not the studio's. The
Mourne & Main palette and Antonio display face never appear inside a concept
screen; the standalone concept pages live at `/concepts/<slug>/` with their
own stylesheet at `src/styles/concept-<slug>.css`, scoped by a body class so
identities cannot leak between concepts.

- **Castle Farm** — warm cream and farm green, Georgia serif, produce-led.
- **Enniskeen** — deep pine `#1E3A2C`, cream `#F5EFE2` and honey brass
  `#C9973B` with Cormorant Garamond; a hairline inset frame, an asymmetric
  48/52 split between story and valley view, and an availability bar stitched
  across the seam. Quiet luxury, chosen against the current site's bright blue
  menu bar and centred archive logo.

Concept screenshots are always captured at 1265×710 at 2x so comparisons align
exactly, and concept pages carry a fixed "Independent concept" marker.

## Components

- Wordmark and compact primary navigation
- Primary gorse-yellow button and secondary text link
- Independent-concept disclosure
- Before/after range comparison
- Design-notes accordion with numbered, tooltipped comparison pins
- Source and limitations block
- Request form with recovery and success messages

## Motion and access

Motion includes a short product-stage entrance, a slow bay image drift on the place band, navigation underlines, button feedback and the numbered marker entrance. `prefers-reduced-motion` removes nonessential animation. The comparison and form are keyboard operable, focus remains visible, images have meaningful alternatives, and concept disclosures are present in text rather than colour alone.
