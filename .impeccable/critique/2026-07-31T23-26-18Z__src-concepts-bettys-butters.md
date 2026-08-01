---
target: Betty's Better Butters elevated concept
total_score: 22
p0_count: 1
p1_count: 2
timestamp: 2026-07-31T23-26-18Z
slug: src-concepts-bettys-butters
---
Method: dual-agent (A: 53178b8d-eb2c-4ab7-b116-eeca9c2a4abf · B: 2c21c5b8-0495-4f45-9e1e-5f43fcbf3b31)

# Betty's Better Butters — Design Critique

**Target:** `src/concepts/bettys-butters/` (elevated melt / voice / arc / Tuesday shelf / mark system)
**Peers:** Donard Veterinary, Scopers (same elevation sweep)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Dead `#` CTAs give no feedback; day-part swap is silent |
| 2 | Match System / Real World | 3 | Kitchen language lands; caption/image mismatch and “In their words” undercut it |
| 3 | User Control and Freedom | 2 | In-page anchors work; Shop / Stockists / Order trap on `#` |
| 4 | Consistency and Standards | 3 | System holds; Shop vs See the range splits the primary action |
| 5 | Error Prevention | 2 | Commerce chrome looks live but cannot complete |
| 6 | Recognition Rather Than Recall | 3 | Shelf scannable; mobile hides nav with no substitute |
| 7 | Flexibility and Efficiency | 2 | Quiet day-part caption; otherwise brochure path |
| 8 | Aesthetic and Minimalist Design | 2 | Cream monoculture + `01` + twin cards + credit clutter |
| 9 | Error Recovery | 1 | Broken actions fail silently |
| 10 | Help and Documentation | 2 | Delivery strip helps; “get in touch” with no contact path |
| **Total** | | **22/40** | **Acceptable** |

## Anti-Patterns Verdict

**Does this look AI-generated?** Partly yes — assets are real, scaffolding is not.

**LLM assessment:** The mountain-ring mark, maker butter photo, cocoa founder quote, and Tuesday serving lines are specific and non-generic. The surface around them still reads training-data: cream/warm body (`#fbf4e4`), tracked uppercase eyebrows, a decorative `01`, identical treat/staple twin cards with colored top borders, and a soft wide gold CTA shadow. First viewport has no brand-level H1 — only a seal-sized mark and an appetite caption — so the brand test fails once nav is discounted.

**Deterministic scan:** `detect.mjs --json src/concepts/bettys-butters` → `[]`, exit 0. Peers: Scopers 0, Donard 6 (exit 2). Detector agrees Betty is clean of the rules it knows; it does not catch cream monoculture, fake CTAs, or missing H1. Donard’s higher count is not a craft loss — it flags more interactive/drawn surface.

**Visual overlays:** No reliable user-visible overlay. Cursor browser MCP tabs were ephemeral; mutation preflight and `detect.js` injection skipped. Fallback: Puppeteer screenshots on `http://[::1]:4321`.

## Overall Impression

The elevation brief’s six moves are present and the materials are the strongest of the three peers (real mark + real photo). Composition and conversion honesty did not keep up. Biggest opportunity: put Betty’s name in the first viewport as a hero signal, kill cream scaffolding (`01`, twin cards), and stop dressing dead `#` links as shop buttons.

## What's Working

1. **Maker assets as system** — mountain-ring ornaments and footer seal feel owned, not invented.
2. **Cocoa founder-voice band** — verbatim restaurant-quality / ten-years line is the emotional peak; peers Scopers’ Paul caption.
3. **Tuesday shelf** — coloured dots + ordinary-plate pairings are a distinctive range pattern, not a product-card grid.

## Priority Issues

**[P0] Primary actions are fake**
- **What:** Shop the range / Stockists / Order use `href="#"` while looking live.
- **Why it matters:** First click to buy/order dies; trust collapses on a concept meant to prove a stocked shelf.
- **Fix:** One real outbound (mailto/tel/maker site) or clearly non-interactive treatment — never a pill button on `#`.
- **Suggested command:** `$impeccable harden`

**[P1] First viewport fails the brand test**
- **What:** No brand-level H1; melt band could be any premium butter once nav is removed.
- **Why it matters:** Brand register requires the name as a hero-level signal; Scopers and Donard both pass this.
- **Fix:** “Betty’s Better Butters” (or Betty-owned claim) over/beside the melt; caption stays supporting.
- **Suggested command:** `$impeccable layout` / `$impeccable typeset`

**[P1] Cream AI surface + scaffolding grammar**
- **What:** Cream body, lone `01`, treat/staple eyebrow + twin cards.
- **Why it matters:** Signals “AI made this” despite good assets; Scopers avoids owning cream in the first impression.
- **Fix:** Commit body to cocoa or butter-drench (or chroma-0 off-white); kill `01`; replace twin cards with one asymmetric treat→staple beat.
- **Suggested command:** `$impeccable quieter` then `$impeccable colorize` / `$impeccable distill`

**[P2] Caption / image honesty gap**
- **What:** Evening caption sells melting-over-steak; photo is cold butter on a board; credit reads “Betty’s Better Butters homepage.”
- **Why it matters:** Appetite promise and meta credit both break immersion / guest-voice.
- **Fix:** Align caption to the photo (or imagery to caption); move source credit to banner/`research` only.
- **Suggested command:** `$impeccable clarify`

**[P2] Duplicate primary CTA language**
- **What:** Header “Shop the range” vs band “See the range →”.
- **Why it matters:** Splits attention; implies two destinations.
- **Fix:** One primary verb; secondary = story or delivery only.
- **Suggested command:** `$impeccable distill`

## Persona Red Flags

**Jordan (first-timer):** Shop looks primary → `#` noop. “In their words” reads third-person. Placeholder flavours present as a real range, then “get in touch” with no contact.

**Casey (mobile):** Nav hidden ≤760px with no substitute; Shop sits top-right; strip + studio banner eat first-screen space.

**Riley (stress tester):** Stockists/Order/Shop all `#`; caption vs photo mismatch; guest-visible homepage credit; allergens deferred with no mailto/tel.

## Peer comparison (same sweep)

| | Scopers | Donard | Betty |
|---|---|---|---|
| Craft lead | **Yes** — full-bleed atmosphere, brand claim in hero | Useful care-desk, brand as H1 | Authentic materials; weaker composition |
| Brand in hero | Strong (name + claim) | Strong (name as H1) | Weak (seal only) |
| Surface risk | Controlled cream | Cool clinic palette | Cream AI default owns the page |
| Detector | 0 | 6 | 0 |
| Net | Visual direction winner | Task-clarity winner | Maker-true assets that still need braver composition + live actions |

## Minor Observations

- Steam honors `prefers-reduced-motion`.
- Rozha One + Epilogue pairing is purposeful; letter-spacing stays above −0.04em.
- Delivery triangle in strip + footer is the right charm beat.
- Arc top borders avoid side-stripe ban but still read template-adjacent.
- Guest-voice: “Betty’s Better Butters homepage” credit and “In their words” lean studio/meta.

## Questions to Consider

1. If the body weren’t cream, would Betty still feel like butter — or would cocoa/butter-drench finally make the page hers?
2. What if the first viewport had no caption box — only brand + one CTA — and the melt lived in motion/day-part alone?
3. Is “Shop the range” honest for a concept that cannot sell yet?
