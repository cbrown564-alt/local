---
target: Mourne Cycles concept UI (src/concepts/mourne-cycles)
total_score: 21
p0_count: 0
p1_count: 3
timestamp: 2026-07-31T23-16-17Z
slug: src-concepts-mourne-cycles
---
Method: dual-agent (A: 85f3b8e0-3075-4ff0-853b-9cdbb33e0459 · B: 182065bf-7922-4927-a8a8-a1ff320cbb6b)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | `aria-current` works; `.mc-stand` reads live but isn’t; dead `#` links give no failure state |
| 2 | Match System / Real World | 3 | Strong LBS voice, but “LBS” jargon in hero quote; nav “Workshop” opens hire/scheme mix |
| 3 | User Control and Freedom | 2 | `Accessories` and “Start your application →” are dead `#` ends |
| 4 | Consistency and Standards | 2 | `.mc-book` → `/hire/` on home, `mailto:` on hire; Hire page titled “Workshop” in nav |
| 5 | Error Prevention | 2 | Indicative price notes help; fake-live stand + dead links invite false confidence |
| 6 | Recognition Rather Than Recall | 3 | Panels/tiers visible; category rail jumps to `#trails` without showing bikes |
| 7 | Flexibility and Efficiency | 2 | Tel/mailto shortcuts exist; no real enquiry form (Donard appointments does) |
| 8 | Aesthetic and Minimalist Design | 1 | Hero packs story + desk + stand + steps + dual foot CTAs + range rail |
| 9 | Error Recovery | 1 | Dead `#` links; no recovery after Accessories / scheme apply |
| 10 | Help and Documentation | 3 | Workshop steps + “call to confirm” + scheme worked example scaffold well |
| **Total** | | **21/40** | **Acceptable — strong voice, weak focus & integrity** |

#### Anti-Patterns Verdict

**Start here.** Does this look AI-generated?

**LLM assessment**: Borderline yes — distinctive workshop system, still several tells. Coal / signal-red / Barlow Condensed italic is a committed LBS lane (not cream+serif terracotta or purple SaaS). Peaks mark, stand ticket rail, and MapPlate trails feel shop-specific. But the first viewport mirrors Donard’s story+desk shell almost beat-for-beat; tracked kickers and `01/02/03` scaffolding appear everywhere; a bike-shop brief ships with zero bike/trail photography; Accessories and scheme-apply are dead `#` placeholders; guest-visible meta (“mourne-cycles.co.uk homepage”, “names on its own site”) leaks research voice; and `@keyframes mc-rise` is defined then never applied.

**Deterministic scan**: CLI `detect.mjs --json src/concepts/mourne-cycles` → exit **0**, findings `[]`. No rule hits. Detector and LLM diverge here: the LLM flags structural/compositional slop (mirrored desk shell, hero overload, missing imagery, orphan motion) that the markup detector does not catch.

**Visual overlays**: No reliable user-visible MCP overlay. cursor-ide-browser could create tabs but could not retain/navigate them (`mcp-browser-tab-unstable`); live-server and `detect.js` injection were skipped. Puppeteer fallback captured home/hire hero + mid-page screenshots at `/tmp/impeccable-mourne-cycles-b/` with empty page consoles.

#### Overall Impression

Mourne Cycles wins the logo fight and loses the first-viewport fight. The coal/red lockup and hire three-panel strip are confident; the home hero is a workshop dashboard competing with itself. Against the same sweep: Scopers owns desire (image-led hero), Donard owns care-path clarity (real appointments form + drawn cast), Mourne Cycles owns typographic aggression without the hero discipline or second-surface integrity to match either.

#### What's Working

1. **Brand system is locked** — `.mc-peaks`, condensed italic lockup, coal/red/paper tokens read as one LBS, not generic Mourne Made chrome. Strongest brand presence of the three.
2. **Local terrain voice in `.mc-rail`** — “Built for Castlewellan reds”, “Newcastle to Dundrum and back” is distinctive shop talk.
3. **Hire second surface (`.mc-service-strip`)** — three clear jobs (hire / service / scheme) with honest “indicative” notices and relative price bars; the black / paper / red color block is the most confident composition on the concept.

#### Priority Issues

**[P1] Hero is a dashboard, not a composition** (`.mc-hero`: `.mc-story` + `.mc-workshop-desk` + `.mc-rail`)
- **Why it matters**: First viewport asks visitors to read a quote, absorb dealer copy, parse a fake queue, learn a 3-step process, and choose among 5+ CTAs. Brand transformation demos need one decisive first impression. Cognitive load: 6/8 checklist failures.
- **Fix**: Cut hero to brand + one thesis + one CTA group + one visual. Move stand + steps below fold or onto `/hire/`. Distill the rail to ≤3 destinations.
- **Suggested command**: `$impeccable distill` (or `$impeccable layout`)

**[P1] Dead ends break trust** (`Accessories` `href="#"`, hire `Start your application →` `href="#"`)
- **Why it matters**: Stress-testers and first-timers hit inert chrome; concept reads unfinished beside Donard’s real appointments form.
- **Fix**: Remove Accessories until real, or route to an honest “ask the shop” panel. Replace scheme apply with `tel:` / `mailto:` / external Cyclescheme URL.
- **Suggested command**: `$impeccable harden`

**[P1] No product imagery on an imagery brief**
- **Why it matters**: A Newcastle bike shop without bikes/trails as the visual plane loses to Scopers’ full-bleed food hero and even Donard’s drawn care cast. Text-industrial alone reads template.
- **Fix**: Full-bleed trail/shop photograph or a dominant drawn bike scene; keep workshop desk as secondary, not co-hero.
- **Suggested command**: `$impeccable bolder`

**[P2] Guest-visible meta / research framing** (`shopVoice.context` = “mourne-cycles.co.uk homepage”; trails lede “names on its own site”)
- **Why it matters**: Violates concept guest voice — visitor should hear the shop, not the research process.
- **Fix**: Attribution as “Mourne Cycles” only. Rewrite trails lede without “own site” framing.
- **Suggested command**: `$impeccable clarify`

**[P2] Motion is dead code** (`@keyframes mc-rise` never assigned; reduced-motion zeroes unused selectors)
- **Why it matters**: Peers ship presence (Scopers steam/rise; Donard pet micro-motion). MC feels static and unfinished.
- **Fix**: Wire rise to `.mc-kicker`, `h1`, `.mc-voice`, `.mc-actions` — or delete the orphan keyframe.
- **Suggested command**: `$impeccable animate`

#### Comparative craft (same sweep)

| Dimension | Leader | Mourne Cycles |
|-----------|--------|---------------|
| Hero composition | **Scopers** | Last — split desk + rail reads as admin |
| Brand presence | **Mourne Cycles** | Ahead — lockup is strongest of the three |
| Distinctive art direction | **Scopers** | Mid — industrial is real but category-generic |
| Motion | **Scopers** · Donard | Last — orphan `mc-rise` |
| Map / illustration | **Donard** · Scopers larder | Behind — MapPlate trails competent, thinner |
| Second-surface | **Donard appointments** | Mid — hire panels sharp; placeholders undercut |
| Overall polish | **Scopers ≈ Donard** | **Behind** this sweep |

#### Persona Red Flags

**Jordan (first-timer)**: Hero quote leads with “LBS” insider slang. Three near-identical CTAs (“Book a service,” “Book a workshop slot,” “Start a workshop enquiry”). Accessories looks real, goes nowhere.

**Casey (mobile)**: Banner + strip + header eat the fold; brand story is a long black scroll before the desk. Header phone hidden ≤940px. Hire stacks better but three panels + repeated “call to confirm” still heavy.

**Riley (stress tester)**: Accessories → `#`. Every `.mc-cell` dumps to `#trails` with no category content. Treats `.mc-stand` as a live queue (no guest honesty). Scheme apply → `#`.

**Local visitor (bike tourist / Newcastle customer)**: Looking for hire bikes or “mountain bike for Castlewellan” — hire is buried under workshop framing; home never shows a bike. Map is atmospheric, not navigable.

#### Minor Observations

- Title/nav mismatch: page is “Hire & service,” nav label is “Workshop.”
- `.mc-stand-tag` duplicates “On the stand” next to the heading.
- Phone appears in strip, header, lede, desk step 03, hire intro — reassurance tips into noise.
- `--paper: #f5f4f1` sits in the warm-cream band; coal panels carry identity, body still drifts “AI paper.”
- Map craft is clean but sparse vs Donard’s care drawings or Scopers’ larder storytelling.
- Hire price honesty in banner is good; home stand queue lacks equivalent guest honesty.

#### Questions to Consider

1. If you removed the workshop desk from the first viewport, would anyone miss it — or would the brand finally breathe?
2. Why does a Trek dealer’s hero quote a self-description about being an “LBS” instead of a reason to ride tomorrow?
3. What would “Bikes” mean if `.mc-rail` actually opened bikes instead of scrolling to a map?
4. Is the Donard-shaped desk shell helping Mourne Cycles, or making three concepts feel like one template with different tokens?
5. Would a single full-bleed Castlewellan red trail photograph out-convert this entire workshop workflow theatre?
