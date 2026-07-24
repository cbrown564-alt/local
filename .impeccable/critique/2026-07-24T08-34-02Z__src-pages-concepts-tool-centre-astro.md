---
target: The Tool Centre concept
total_score: 24
p0_count: 1
p1_count: 3
timestamp: 2026-07-24T08-34-02Z
slug: src-pages-concepts-tool-centre-astro
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hours/phone always in strip; hire nav marks aria-current. No live stock/availability. |
| 2 | Match System / Real World | 3 | Trade vocabulary lands; "Today's rates" with zero rates is theatrical, not yard-real. |
| 3 | User Control and Freedom | 2 | Hardware/Gas/Hours/Find us are dead `#` / home redirects; escape is Call or Hire only. |
| 4 | Consistency and Standards | 3 | Shared shell tokens across home + hire-list; accent-border cards repeat the same motif. |
| 5 | Error Prevention | 3 | Hire-list notice correctly labels indicative ~ranges; home desk invents urgency without numbers. |
| 6 | Recognition Rather Than Recall | 3 | Categories and rates visible once on hire-list; home forces recall that rates live elsewhere. |
| 7 | Flexibility and Efficiency | 1 | Only path is tel:; no category jump anchors, search, or filter on a 20+ item price board. |
| 8 | Aesthetic and Minimalist Design | 2 | Looks sparse; first viewport still packs story + empty desk + 5-cell rail. |
| 9 | Error Recovery | 2 | Brochure surface; dead nav silently fails; no recovery beyond Call. |
| 10 | Help and Documentation | 2 | "What to bring" helps; hours/Find us promised in nav but never delivered as pages. |
| **Total** | | **24/40** | **Acceptable** |

#### Anti-Patterns Verdict

**Does this look AI-generated?** Partly. Palette and Chivo display feel subject-owned; composition, stripe fill, side-tab notice, and identical price cards are template grammar.

**LLM assessment**: First-order trade reflex (black + hi-vis yellow + heavy sans) is justified by the Facebook mark — that is identity, not costume. Second-order failure: "utilitarian = no photos, flat floor, floating desk card, CSS hatch." That is AI restraint-as-excuse. Zero `<img>` on either page. `.tc-panel` uses banned `repeating-linear-gradient` hatch. Hire desk ships `box-shadow: 0 22px 48px`. Kickers with yellow rule bar on both pages. IBM Plex Sans is on the reflex-reject list and shared with Newcastle Chamber.

**Deterministic scan** (detect.mjs on pages + CSS): 4 warnings — side-tab on `.tc-hl-notice` (L348); border-accent-on-rounded on `.tc-desk` (L182), `.tc-hl-cat` (L379), `.tc-hl-panel` (L465). Markup-only scan was clean `[]`; CSS scan caught the tells.

**Visual overlays**: Live browser injection unavailable this run (cursor-ide-browser could not open a tab). Evidence from capture stills `tool-centre-after-1265.webp`, `tool-centre-after-640.webp`, `tool-centre-hire-list-after-1265.webp`, and `tool-centre-before-1265.webp`.

#### Overall Impression

Honest palette, boring room. The concept correctly steals the Facebook badge colours and speaks trade English, then refuses the physical yard that would make the transformation feel like a place. Hire-list is the stronger surface because it has a job; home is a call button wearing a rate board costume.

#### What's Working

1. **Subject-owned colour commitment** — `--hivis: #f0d000` / `--slate: #0e0e0e` match the real Tool Centre Plant Hire mark (before still), not Mourne Made bay/gorse.
2. **Hire-list as price board** — category heads, tabular rates, weekend row tint, sticky Call panel, "What to bring" — one honest trade errand.
3. **Indicative honesty** — notice + `~£` ranges refuse fake precision; better than inventing exact day rates as fact.

#### Priority Issues

**[P0] Zero real imagery — yard erased**
- **What**: No `<img>` / picture / photo on home or hire-list. Atmosphere is flat `--floor` + CSS hatch.
- **Why**: Facebook-before at least showed stock/yard behind the login wall. A concept that removes the only real visual evidence of the shop fails the transformation brief and the real-imagery rule.
- **Fix**: Full-bleed yard/counter/plant photo as the hero plane; price board can stay type-led as secondary.
- **Suggested command**: `$impeccable bolder` (image-led hero) then `$impeccable layout`

**[P1] Hero budget blown; hire desk is empty theatre**
- **What**: First viewport = kicker + H1 + lede + 2 CTAs + desk listing four "Day rate on request" rows + 5-cell category rail.
- **Why**: Violates hero budget; the interactive card adds no information a phone number does not.
- **Fix**: Cut desk from home or replace with one real rate sample + link to hire-list; move rail below fold.
- **Suggested command**: `$impeccable distill`

**[P1] Brand is header chrome, not hero signal**
- **What**: `.tc-brand-name` is 22px in the header; H1 owns the composition. Brand-test fails if nav is removed.
- **Why**: Subject identity stays as nav stamp; headline could sell any hire yard.
- **Fix**: Promote wordmark/mark to hero scale; let H1 support, not replace.
- **Suggested command**: `$impeccable typeset` + `$impeccable layout`

**[P1] Decorative card system + banned accents**
- **What**: Identical `.tc-hl-cat` card grid; side-tab notice; top-accent + radius + deep shadow on desk.
- **Why**: Detector agrees; cards are containers of choice, not necessity for a price board (a table/list wins).
- **Fix**: Flat ruled lists; drop side-stripe; pick border OR shadow, square the accent edge.
- **Suggested command**: `$impeccable quieter` / `$impeccable distill`

**[P2] Motion and type leftovers**
- **What**: Uniform `tc-rise` stagger only; IBM Plex Sans body; nav promises pages that do not exist.
- **Why**: Motion fails the 2–3 intentional presence bar; body face is monoculture; dead IA undercuts trust.
- **Fix**: One yard-specific motion (e.g. rate-row tick / strip pulse); swap body off Plex; stub Hours/Find us or remove links.
- **Suggested command**: `$impeccable animate`, `$impeccable typeset`, `$impeccable clarify`

#### Persona Red Flags

**Casey (mobile contractor, thumb + interrupt)**: Phone CTA is good and repeated; at ≤940px nav vanishes entirely — Hardware/Gas/Hours unreachable except scroll myths. Category rail wraps into a chip salad under the desk. Primary job (see a rate, call) works; browsing stock does not.

**Jordan (DIY first-timer)**: "Day rate on request" on a card titled "Today's rates" teaches distrust. Kickers and all-caps feel official; dead Find us/Hours links feel broken. Hire-list notice saves them; home does not.

**Riley (stress tester)**: Indicative `~` ranges are labelled — good. Nav `#` and home-redirect "Hardware" fail the promise/test. Fake specificity of stump grinder £80–110 with no source is a probe target for concept honesty.

**Local trade owner (project)**: Will recognise yellow/black. Will ask where the yard photo went. Will notice the concept still cannot show real rates the counter has not published — fair — but will not be impressed by an empty rate board.

#### Minor Observations

- SVG mark is a simplified digger glyph, not the Facebook wordmark blocks — identity adjacent, not accurate.
- Phone appears three times on home (strip, header, desk) — utilitarian redundancy bordering on shout.
- `.tc-hl-cat` icons are cute sketch SVGs; skill bans sketchy illustration as product substitute.
- `prefers-reduced-motion` correctly kills home entrance; hire-list reduces animations that are not defined — dead CSS.
- Capture stills show secondary CTA copy drift historically ("Updates on Facebook" vs current "See hire price list") — current code is the hire-list path; stills may be stale on that string.

#### Questions to Consider

- If the counter will not publish rates, why stage a "Today's rates" desk at all?
- What does Main Street look like at 9am — and why is that not the first viewport?
- Is Chivo+hi-vis enough identity, or is the missing photo the actual brand?
- Would a single scannable price table beat four icon cards?
