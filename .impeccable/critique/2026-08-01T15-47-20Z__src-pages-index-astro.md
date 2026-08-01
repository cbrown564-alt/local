---
target: homepage
total_score: 27
p0_count: 0
p1_count: 2
timestamp: 2026-08-01T15-47-20Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Comparison states are clear. |
| 2 | Match with the real world | 3 | Local language is strong; commercial outcomes are vague. |
| 3 | User control and freedom | 3 | Comparison controls and navigation work clearly. |
| 4 | Consistency and standards | 3 | Coherent visual and interaction system. |
| 5 | Error prevention | 2 | The request journey is not explained near the decision point. |
| 6 | Recognition rather than recall | 3 | Named local work makes the offer concrete. |
| 7 | Flexibility and efficiency | 3 | Several routes to browse and compare exist. |
| 8 | Aesthetic and minimalist design | 2 | Proof and actions repeat excessively. |
| 9 | Error recovery | 2 | Limited relevance on a landing page. |
| 10 | Help and documentation | 3 | Disclosure is clear, but the offer could be more explicit. |
| **Total** | | **27/40** | **Acceptable, close to good** |

## Anti-patterns verdict

Low AI-slop risk. The real business comparison, drawn local map, typography, and place-specific language give the page a recognizable voice. The deterministic detector returned zero findings. Desktop and mobile renders had no horizontal overflow or clipped headings. No visible overlay was available because browser evidence used headless Puppeteer.

## Overall impression

The page proves visual transformation well and feels genuinely local. Its biggest opportunity is editing: the same portfolio proof appears in the hero, concept strip, and map/list, while the business result—booking, order, enquiry, or direct customer action—remains understated.

## What's working

- The hero comparison demonstrates the service before explaining it.
- Named businesses, towns, disclosures, and the map establish unusually strong local credibility.
- The typography, square controls, palette, focus styles, semantic structure, and responsive containment form a coherent system.

## Priority issues

### [P1] Proof inventory overwhelms the story

The concept strip and TownMap both enumerate the same 16 concepts. On mobile, the map/list section is about 1,605px tall and pushes the closing action far down. Keep one curated set of four to six examples, make the map the distinctive browsing device, and link to the full index rather than reproducing it.

### [P1] The commercial outcome is missing above the fold

“At its best” and “what’s possible” can imply a cosmetic makeover. Add one short, evidence-safe line connecting the concept to a clearer route to a booking, order, or enquiry.

### [P2] The hero action hierarchy is crowded

The request CTA competes with the ownership link, browse link, full-comparison link, and several comparison controls. Keep one primary action and one secondary browse route. Move the full-comparison action into the caption and introduce ownership when named concepts are being browsed.

### [P2] The palette does not yet feel vibrant

Most of the page is navy and foam, so energy comes mainly from concept screenshots. A small warm accent could distinguish the CTA, focus states, map pins, or key dividers while preserving contrast.

### [P2] Condensed display type is overused for long sentences

Long headings become compressed on phones. Keep the display face for short decisive phrases, shorten longer headings, and let the body face carry explanations.

## Persona red flags

- A first-time visitor may understand the free concept but infer a visual makeover rather than a route to bookings, orders, or enquiries.
- A distracted mobile visitor reaches the main proof quickly, then meets repeated comparison controls and a long duplicated portfolio directory before the closing CTA.
- A local owner may admire the work while still wondering what practical customer action improves and what they would need to maintain.

## Minor observations

- “Already made” is more process-focused than the surrounding voice.
- The map introduction repeats the cumbersome “we’ve already made a free concept for” construction.
- The desktop map is a signature artifact; on mobile it becomes a thumbnail plus conventional directory.
- Ending on the community promise rather than the CTA is warm but should be a deliberate choice.

## Questions to consider

- Is the map meant to create local recognition or serve as the complete portfolio index?
- Could each preview name the customer action it improves—book, order, or enquire—rather than only showing a visual after?
- Would fewer businesses shown more personally feel more neighbourly than listing all 16 twice?
