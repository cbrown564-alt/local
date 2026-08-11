# Impossible local website — sources and limits

Recorded 9 August 2026 for the representative prototype at
`/prototypes/impossible-local/`.

## Subject

Line & Bearing is a synthetic mountain-bike workshop in Newcastle, County
Down. The identity, copy, enquiry and workshop context do not represent a real
business. No visitor submission leaves the browser.

## Terrain

The visible cross-section is baked from
`src/site/data/mourne-terrain.json`. That grid was sampled from AWS Open Data
Terrain Tiles using the Terrarium encoding at zoom 12. The upstream dataset is
SRTM-derived. `tools/pipeline/bake-mourne-terrain.mjs` records the source,
bounding box, grid size and height conversion.

`tools/pipeline/bake-impossible-local-route.mjs` samples five control points
across Newcastle and Mourne high ground, interpolates 121 points and stores
only progress, accumulated distance, accumulated climb and elevation in the
client dataset. The public samples deliberately omit coordinates.

The profile is an expressive cross-section. It is not trail geometry, a
survey, an access statement, a route recommendation or current safety advice.
It contains no weather or trail-status data.

## Rendering and fallback

Canvas 2D renders layered forms from the same 121 elevation samples. It is
decorative and `aria-hidden`. The HTML contains every chapter, fact, control
and action. An inline SVG made from the same samples remains when JavaScript or
Canvas is unavailable; `?renderer=off` provides a deterministic verification
path.

Reduced motion has no automated journey. The five chapter buttons, native
range input and previous/next controls move directly between settled frames.

## Media

No generated image, video, speech or sound ships on the prototype. The two
generated visual studies held under
`media/media-sprint/masters/impossible-local-website/` informed the material
exploration only. They are not loaded by the route and do not supply terrain
evidence.

## Promotion boundary

This is an internal `noindex` representative prototype. Implementation cannot
show that a business wants, can maintain or will profit from this form. A
participating business, business-owned accounts, a named upkeep responsibility,
a recorded baseline action and a dated review are still required before it can
be described as a pilot.
