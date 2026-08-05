# Generated map implementation plan

## Current state

The first generated map set is saved in `public/media/maps/`. The town map is
the current representative slice: its geography has been corrected and its
generated markers removed so the site can add them as HTML.

## Work sequence

1. Review each saved image against its current SVG iteration for geography,
   hierarchy, crop, contrast, and mobile legibility. Record corrections before
   integration.
2. Polish accepted images with targeted generation passes. Keep labels, pins,
   legends, and interaction affordances out of the raster artwork.
3. Add each generated asset to `research/image-provenance.md` and disclose
   generated artwork in the visible guest-facing layer where it is used.
4. Replace the inline SVG in `TownMap.astro` with the raster image and rebuild
   labels, pins, focus states, hover cards, and links as HTML. Preserve the
   existing keyboard, screen-reader, responsive, and reduced-motion behavior.
5. Verify the town map at desktop and mobile sizes, then apply the proven
   image-plus-HTML pattern to the five concept maps.
6. Run `pnpm build`, the relevant concept checks, and representative desktop
   and mobile captures. Inspect image loading, overlay alignment, focus states,
   contrast, and overflow.

## Saved previews

- `public/media/maps/town-coverage-generated.png`
- `public/media/maps/enniskeen-estate-generated.png`
- `public/media/maps/donard-catchment-generated.png`
- `public/media/maps/mourne-cycles-trails-generated.png`
- `public/media/maps/scopers-larder-generated.png`
- `public/media/maps/dundrum-inn-place-generated.png`

## Implementation record — 5 August 2026

- Reviewed all six rasters against their SVG predecessors. The accepted town
  artwork keeps the two-town, coast, forest and mountain hierarchy clear; the
  five concept plates retain their published place relationships. Baked-in
  trail lines and food/place vignettes are treated as illustrative background,
  never as navigation, surveyed positions or supplier evidence.
- Replaced the town SVG with the generated raster and HTML town labels,
  business pins, focus rings, hover cards and links. The full business index is
  the small-screen interaction path; decorative overlays are hidden there.
- Added a shared generated-map figure for the five concept plates. Raster
  artwork is decorative to assistive technology; descriptions, visible
  disclosures and mobile text keys carry the meaning in HTML.
- Updated `research/image-provenance.md` from planned integration to in-use
  status. Every map visibly says that its artwork is AI-generated and
  indicative.
- Verified `pnpm build` and representative 1440 px / 375 px captures for the
  town, Enniskeen, Donard Veterinary, Mourne Cycles, Scopers and Dundrum Inn
  maps. Captures are disposable and remain under `.scratch/map-captures/`.
