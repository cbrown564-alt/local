# Archived batch review summary — Gemini — 25 July 2026

Independent v1.1 design re-review of the five Phase Q candidate concept sites following their shared repair and subject-proof passes (24–25 July 2026).

## Executive Verdict

**All 5 candidates returned a verdict of REVISE.**

None of the five candidates met the publication standard set in [`docs/CONCEPT_DESIGN_REVIEW.md`](../../docs/CONCEPT_DESIGN_REVIEW.md) (minimum 7.0/10 weighted score, all core category floors $\ge 7.0$, all supporting category floors $\ge 6.0$, and 100% design gates passing).

While the shared repair pass successfully addressed several major baseline defects (such as inert brand links, missing subject photography, and raw unlabelled claims), detailed browser inspection at 1265×710 (desktop) and 390×844 (phone) revealed recurring gate failures—specifically contrast/readability deficiencies, orphaned phone navigation routes, missing loop states, and unlabelled/invented claims.

---

## Batch Score & Gate Summary

| Concept | Slug | Earlier Craft (Historical) | First v1.1 Verdict (24 July) | Re-Review Score | Re-Review Verdict | Gates Passed | Core Category Floors ($\ge 7.0$) Met? | Key Failure Drivers |
|---|---|---:|---|---:|---|---|---|---|
| **Donard Veterinary Clinic** | `donard-veterinary` | 5.0 | Revise (5.93) | **6.53** | **Revise** | 5 / 6 | No (1/4 met: Outcome 7.0, Loop 7.0; Resp/A11y 6.0) | Emergency card contrast failures (Closed 2.56:1, PetsApp 3.38:1); stale `mailto:` handoff link on edit; incomplete CC BY-SA attribution. |
| **Newcastle Chamber of Commerce** | `newcastle-chamber` | 6.0 | Revise (6.28) | **5.87** | **Revise** | 1 / 6 | No (0/4 met: Evidence 6.5, Outcome 6.5, Loop 6.0, Resp 5.0) | Directory listings mix real & invented names without distinction; phone nav hidden (orphans 3 routes); invisible contact CTA (1.00:1); 0 photo proof on phone fold. |
| **Mourne Cycles** | `mourne-cycles` | 6.5 | Revise (5.93) | **5.78** | **Revise** | 3 / 6 | No (0/4 met: Evidence 6.0, Outcome 6.0, Loop 5.5, Resp 5.0) | Unsourced "TREK MAIN DEALER FOR THE AREA" claim; AI hero disclosure off-screen at 390px; ~20 contrast failures on honesty labels; zero failure/recovery state. |
| **Cúpla** | `cupla` | 5.0 | Revise (6.43) | **5.78** | **Revise** | 3 / 6 | No (1/4 met: Evidence 7.0; Outcome 5.5, Loop 5.0, Resp 4.5) | Phone nav `display:none` orphans `/menu/` route; English menu gloss contrast 3.42:1–4.21:1; inverted `lang="ga-IE"` markup; fixed disclosure covers menu rows. |
| **Kent Amusements** | `kent-amusements` | 5.5 | Revise (5.88) | **5.42** | **Revise** | 2 / 6 | No (0/4 met: Evidence 5.5, Outcome 6.0, Loop 5.0, Resp 4.0) | Unlabelled invented seasonal hours; 390px phone attractions grid 100% overlap bug; disclosure banner occludes desktop bottom rail; primary phone CTA contrast 3.50:1. |

---

## Detailed Category Breakdown

```
Category Weights:
- Evidence, truthfulness & respect: 15%
- Visitor outcome & thesis: 15%
- Subject identity & distinctiveness: 15%
- First viewport & composition: 15%
- Complete loop & functional integrity: 15%
- Responsive use & accessibility: 15%
- Craft & finish: 10%
```

| Concept | Evidence | Outcome | Identity | Viewport | Loop | Resp/A11y | Craft | Weighted Score |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **Donard Veterinary** | 7.5 | 7.0 | 6.0 | 6.0 | 7.0 | 6.0 | 6.0 | **6.53** |
| **Newcastle Chamber** | 6.5 | 6.5 | 6.0 | 5.5 | 6.0 | 5.0 | 5.5 | **5.87** |
| **Mourne Cycles** | 6.0 | 6.0 | 6.0 | 6.0 | 5.5 | 5.0 | 6.0 | **5.78** |
| **Cúpla** | 7.0 | 5.5 | 6.5 | 6.0 | 5.0 | 4.5 | 6.0 | **5.78** |
| **Kent Amusements** | 5.5 | 6.0 | 6.0 | 6.0 | 5.0 | 4.0 | 5.5 | **5.42** |

---

## Portfolio-Wide Findings & Systemic Regressions

1. **Phone Navigation Removal (`display: none` below 940px):**
   In multiple concepts (Newcastle Chamber, Donard Veterinary, Cúpla, Kent Amusements), responsiveness was achieved below 940px by hiding the navigation bar without providing a mobile drawer/hamburger or replacement links. This directly violates the responsive gate by hiding essential content (e.g. Cúpla's menu route is completely unreachable from the home page on phone; Chamber orphans 3 routes).

2. **Honesty Copy Contrast Paradox:**
   Labels introduced to ensure compliance with the `Claims are honest` gate (e.g. "Illustrative sample menu", "Provisional prices", "Not verified packages") were styled in light muted greys or low-contrast tones (`--steel`, `#a56a24`, etc.). As a result, the very text holding up the claims gate failed the `Readable and motion-safe` contrast gate (often measuring 3.25:1 to 4.21:1 against background planes).

3. **Shared Shell Disclosure Banner Occlusion:**
   The fixed bottom banner (`ASIDE.mm-concept-banner`) frequently overlaps and occludes interactive bottom rails or page content at 1265×710 desktop viewports (e.g. Kent Amusements' attractions rail, Cúpla's specials strip & menu items, Newcastle Chamber's directory CTA).

4. **Mobile First-Viewport Disclosure Placement:**
   On mobile viewports (390×844), while hero imagery was introduced, the accompanying AI disclosure figcaptions and independent concept banners landed 50–450px below the fold. Consequently, mobile visitors meeting the first screen view photorealistic imagery without seeing the required disclosure.

---

## Files in this Directory

- [`mourne-cycles.md`](mourne-cycles.md) — Re-review record for Mourne Cycles (5.78 / Revise)
- [`newcastle-chamber.md`](newcastle-chamber.md) — Re-review record for Newcastle Chamber of Commerce (5.87 / Revise)
- [`kent-amusements.md`](kent-amusements.md) — Re-review record for Kent Amusements (5.42 / Revise)
- [`donard-veterinary.md`](donard-veterinary.md) — Re-review record for Donard Veterinary Clinic (6.53 / Revise)
- [`cupla.md`](cupla.md) — Re-review record for Cúpla, Dundrum (5.78 / Revise)
