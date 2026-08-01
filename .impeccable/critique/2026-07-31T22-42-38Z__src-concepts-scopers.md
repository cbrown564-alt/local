---
target: Scopers concept UI (src/concepts/scopers)
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-07-31T22-42-38Z
slug: src-concepts-scopers
---
Method: dual-agent (A: 5bec432f-75cc-4c36-9a9f-71b7c14305e9 · B: c93fe909-10ea-444f-819b-c4e9d310dc39)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Day-part swap is silent; hours only on Facebook; booking is Instagram DM with no on-page confirm |
| 2 | Match System / Real World | 3 | Kitchen voice is strong; invented August courses and unexplained "Mourne Larder" for first-timers |
| 3 | User Control and Freedom | 3 | Clear nav + back link; external DM handoff is a soft trap if IG fails |
| 4 | Consistency and Standards | 2 | CTA labels thrash across Book / Supper club / Open the invitation / Message to reserve / Book your place |
| 5 | Error Prevention | 2 | Honest hours handoff is good; sample 11-course list can over-promise a menu that isn't theirs |
| 6 | Recognition Rather Than Recall | 3 | Dishes, date, address named; map pins collapse on mobile |
| 7 | Flexibility and Efficiency | 2 | FB/IG shortcuts exist; no on-page hours/menu; long scroll is the only path |
| 8 | Aesthetic and Minimalist Design | 2 | Crafted, but kicker scaffolding + dual hero jobs + cream monoculture adjacency |
| 9 | Error Recovery | 2 | No forms; recovery = message again off-site |
| 10 | Help and Documentation | 2 | Find-us + social links; no pricing/access until DM |
| **Total** | | **23/40** | **Acceptable** |

#### Anti-Patterns Verdict

**LLM assessment**: Buttermilk is intentional brand, but warm paper + paprika + kelp + tracked uppercase kickers on nearly every band still flirts with the 2026 artisanal-food AI default. The map, Paul's caption, and the date-led invitation pull it out of SaaS; the four identical counter cards and section-kicker grammar push it back. Evening day-part shows supper theatre under a hot-food-bar claim, hiding the risograph signature for half the day.

**Deterministic scan**: CLI exit 2 — `side-tab` ×3 in styles.css (figcaption accents; likely soft false positives for "card" framing). Live overlay (puppeteer fallback): 15 findings — `repeated-section-kickers`×5, `text-overflow`×4 (SVG), `wide-tracking`×4, `all-caps-body`×3, `tiny-text`×3, `side-tab`×2, `low-contrast`×2 (#7a7060 on #f7f2e3, 4.3:1), `hero-eyebrow-chip`×1, `line-length`×1, `cream-palette`×1.

**Visual overlays**: Injected via puppeteer fallback (cursor-ide-browser tab lifecycle failed). No reliable MCP [Human] overlay tab.

#### Overall Impression

The elevation landed real craft: Paul's voice, a geography-true larder map, and a supper invitation that treats the date as the pitch. The first screen still fights itself — evening plate vs lunch-bar claim, header supper CTA vs food CTA — and the middle still sounds like a well-briefed AI restaurant page until the map arrives.

#### What's Working

1. **Date-as-pitch on the invitation** — `.sc-invite-date` outranks the title; seal-on-buttermilk stages the game.
2. **Paul's voice elevated** — caption quote + larder anchor with dated attribution a chef can verify.
3. **Map as keepable artifact** — real Inner Bay / Murlough / Slieve Donard / castle geography; the clearest non-feed permanence move.

#### Priority Issues

- **[P1] Evening day-part vs hot-food-bar H1** — From 18:00 the plate is banquet theatre while overlay sells the lunch bar; risograph midday cover is dark half the day. Fix: shift evening overlay/CTA to supper register, or gate evening plate behind the supper path.
- **[P1] First-screen dual primary** — Header `.sc-book` pushes supper while H1 + `.sc-cta` push food; club card repeats supper. Fix: one primary per viewport on home; move book weight to `/supper-club/`.
- **[P1] Invented "What August brings" 11-course list** — Atmosphere invention Paul will smell. Fix: documented dishes only, or short "season decides" without numbered fantasia.
- **[P2] Mobile chrome + map collapse** — ~258px chrome before hero; map ~346×318 with dense labels. Fix: collapse strip; mobile map legend / taller crop.
- **[P2] Kicker monoculture + cream adjacency** — `.sc-kicker` on every band; cream+paprika+olive reads as training-data artisanal. Fix: kill kickers on 3–4 bands; more iron/kelp drench.
- **[P2] Guest-voice leak** — carrot figcaption "a generated riff on Scopers' own Instagram post" is studio meta on the guest surface.
- **[P2] Hero IntersectionObserver bug** — `entry.target.pause is not a function` (observer watches figure, not video).

#### Persona Red Flags

**Jordan**: Banquet hero + supper header CTA under "hot food bar" → thinks booking restaurant; hours not on page.
**Casey**: Mobile chrome tax; duplicate "Supper club" label (nav + button); counter four-card slog; map unreadable.
**Paul the owner**: Recognises badge, GBM, carrot caption — then hits generated riff caption + invented tasting menu and trust closes.

#### Minor Observations

- Side-tab paprika borders on figcaptions (detector hit).
- Counter cells read as card grid, not chalkboard counter.
- CTA vocabulary thrash across pages.
- Low-contrast muted text on buttermilk (~4.3:1).
- Supper mobile invite hero very tall (~830px).

#### Questions to Consider

- If Instagram already sells appetite, should the concept open on philosophy/map/invitation instead?
- Would Paul rather see his real counter than four generated dish cards?
- What if home had no supper header CTA — only the sealed invite after the carrot proof?
- Is buttermilk the room, or should iron/kelp own 40%+ of the scroll?
- Does day-part earn its complexity if the risograph is dark half the day?
