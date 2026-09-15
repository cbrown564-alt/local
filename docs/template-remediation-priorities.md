# Template remediation priorities

Source audit: `scratch/template-audit-report.txt` (palette / font / class / DOM-skeleton
similarity across all published concepts, cross-referenced with first-commit dates).

Three template families were identified where the same layout chassis — and in places the
same palette — was applied across very different businesses with only renamed sections:

- **Family C** (built 2026-08-26): `hero-veil / hero-stage` skeleton + `section-header/section-lead` vocabulary.
- **Family B** (built 2026-08-29 → 09-14, 16 concepts): `strip → header → hero(kicker, say, lede, actions, theatre) → photo-card sections → door-section(door-card, door-btns)`.
- **Family A** (built 2026-08-24): `eyebrow / say / lede / hero-grid / section-head` chassis, warm cream-brown palette.

The 2026-08-23 batch and the 2026-07-31 first wave were audited and are genuinely
differentiated — no action needed there.

Rule for remediation: within each family, the concept whose business genuinely fits the
chassis keeps it; the others get rebuilt or re-dressed. Palettes may be shared only when
the trade justifies it (the two butchers are fine).

---

## Tier 1 — jarring business/style mismatch (fix first)

1. **stephen-morgan** (funeral directors, Family B). Shares a dark + amber palette
   (0.63 quantized overlap) and CTA-heavy `door-btn` sales layout with a taxi firm and a
   flooring shop. Needs a quiet, restrained, text-led single column; no sales-chrome CTAs.
2. **dominic-mcinerney** (solicitor, Family C). Identical skeleton to a pottery studio, a
   hostel, a glass merchant and a garage; palette 0.64 overlap with hutt-hostel. Solicitor
   wants sober, typographic, document-like — covenant language is right, the shared
   stage/veil hero is not.
3. **shimna-taxis** (Family B). A taxi firm on a hospitality "theatre hero" layout with a
   restaurant's palette (0.75 overlap with fish-and-farm). Utility-first rebuild: phone
   number, booking, coverage — not a photo theatre.
4. **thumbelina** (toy shop) and **chatterbox** (day nursery, Family B). Children's
   businesses on the same adult hospitality chassis as pubs and restaurants. Both need
   playful, warm, parent-facing layouts; currently only token playfulness inside a formal
   skeleton.
5. **sucos** (juice bar, Family B). Skeleton similarity 0.84 with fish-and-farm — the
   single most literal clone in the audit. Bright, menu-forward rebuild.

## Tier 2 — layout clones, palette mostly distinct (re-dress, not full rebuild)

Family B remainder — same chassis, lighter intervention (restructure hero + contact
block, vary section rhythm):

- **morellis** (ice cream parlour) — deserves a joyful promenade register, not a formal
  restaurant layout.
- **bonnys** (caravan park) — booking-led, outdoors; not a restaurant hero.
- **deja-vu** (hairdresser) — style-led, appointment CTA; not a door-section sales card.
- **john-macs** (fish & chips) — counter/menu-forward.
- **keown-nugent** (solicitor) — should converge with the rebuilt dominic-mcinerney
  register, not sit between a nursery and a funeral director.
- **harbour-house** (pub), **piccolo-kitchen** (restaurant), **savoy-cafe** (cafe),
  **fish-and-farm** (seafood) — hospitality chassis is defensible here; keep one as the
  reference implementation (suggest fish-and-farm), vary section rhythm and hero for the
  other three so they stop reading as reskins.
- **first-4-floors** (flooring), **joes-quality-meats** (butcher) — chassis tolerable;
  joes palette (0.8 vs smalls-butchers) is fine since both are butchers.

Family C remainder:

- **hutt-hostel** — rugged map-led register suits a hostel; candidate to keep the chassis.
- **terry-king** (garage) — IBM Plex mono/industrial suits the trade; keep dark base but
  break the shared hero so it stops matching stile-glass.
- **stile-glass** (glass merchant) — light, transparent, cyan-on-white would differentiate
  from terry-king's dark + amber (currently 0.5 palette overlap, same skeleton).
- **clay-project** (pottery) — tactile, kiln-warm; keep the chassis only if dominic-
  mcinerney and hutt-hostel both move off it.

## Tier 3 — palette-only reuse (re-colour, keep layout)

Family A (cookie-jar, serenity-newcastle, shimna-cafe, smalls-butchers, vintage-etc):

- **cookie-jar ~ vintage-etc** palette overlap 0.75; **cookie-jar ~ shimna-cafe** 0.64.
  The warm cream/brown belongs to the bakery (cookie-jar keeps it). Vintage-etc wants a
  more eclectic, era-mixed palette; shimna-cafe already has a rust accent to build on.
- **serenity-newcastle** (gifts/beauty) is wearing the bakery palette — move it toward the
  calm, pale register its name and trade imply.
- Layout vocabulary is shared (`eyebrow / section-head`) but structures diverge enough
  that re-colouring plus hero variation is sufficient.

Also cross-batch: **cafe-67** sits in the same cream cluster (0.6–0.64 vs cookie-jar /
vintage-etc / savoy-cafe) — check when those are re-coloured that it doesn't land back in
the same bucket.

## Process guard (so the next batch doesn't repeat this)

- Batch-built concepts (same-day waves) must declare which chassis they inherit from, and
  no chassis may serve more than one business category per wave.
- Add a similarity check to `pnpm build` alongside the guest-voice guard: flag any new
  concept with skeleton similarity ≥ 0.5 or quantized-palette overlap ≥ 0.5 against an
  existing concept in a different business category (allow same-trade pairs like the two
  butchers). The audit script at `scratch/template-audit.mjs` is the working prototype.

---

## 2026-09-15 Batch (5 newly pulled concepts) — Audit & Remediation

All 5 newly pulled concepts (`mccreadys-footwear`, `joke-and-toy-shop`, `dundrum-physio`,
`kd-hair`, `great-jones`) were stamped out from the same **Family B** chassis
(`fish-and-farm` origin):
- Exact same stylesheet length: **815 lines** each.
- Normalized CSS class overlap with each other: **0.97** (0.97 with `fish-and-farm`).
- DOM skeleton similarity: **0.98 – 1.00** across all 5 pairs (0.83–0.85 with `fish-and-farm`).
- Shared typography: identical `Fraunces` (display serif) + `DM Sans` pairings across all 5.
- Scaffolding copy comments leaked across disparate trades: `dundrum-physio` (clinic) and
  `great-jones` (restaurant) literally contain the comment *"warm cream, mahogany, leather,
  brass clip"* inherited from `mccreadys-footwear`.

### Tier 1 — Jarring business/style mismatch (full rebuild required)

1. **dundrum-physio** (physiotherapy & sports clinic, Parterre, Dundrum)
   - *Mismatch*: A medical rehabilitation and musculoskeletal clinic trapped inside a
     hospitality gourmet-food chassis (`hero-theatre` + 3-course photo grid + commercial door
     card).
   - *Prescription*: Clinical clarity and practitioner trust. Single-column triage flow,
     conditions treated (spinal, sports, post-operative), clinical appointment handoff,
     calm clinic linen/sage palette without restaurant promo cards.

2. **joke-and-toy-shop** (seaside novelty, jokes & toys, 43 Central Promenade)
   - *Mismatch*: A seaside pocket-money joke shop forced into a luxury editorial template with
     stately `Fraunces` serif and a somber mahogany/cream palette.
   - *Prescription*: High-energy seaside promenade character (similar to `thumbelina` /
     `morellis`). Bins, shelves, novelty tags, vibrant seaside coral/marine tones, punchy
     casual typography; abolish the formal restaurant hero theatre.

3. **kd-hair** (residential neighbourhood hair salon, 16 Mourne Rise)
   - *Mismatch*: A quiet residential salon forced into the sprawling commercial 6-section
     food market skeleton.
   - *Prescription*: Intimate, appointment-led neighbourhood chair. Focus on personal
     consultation, colour/styling portfolio, single-chair warmth, simple contact/booking
     rhythm; strip away multi-tier commercial sales chrome.

### Tier 2 — Layout clones, trade fits chassis (re-dress & vary rhythm)

4. **mccreadys-footwear** (traditional shoe shop, 85 Main Street)
   - *Diagnosis*: The trade (leather, fitting bench, brass measure) justifies the warm
     mahogany/cream palette and the `ShoeTicket` artefact is authentic, but the DOM skeleton
     is a 1:1 duplicate of `fish-and-farm`.
   - *Prescription*: Retail fitting journey: foot measurement, school/walking boot sizing,
     leather care advice, and physical shop counter hours. Break the restaurant photo-theatre
     into a footwear fitting bench view.

5. **great-jones** (craft kitchen & bar, Main Street)
   - *Diagnosis*: As a dining room and craft kitchen, the hospitality chassis is trade-appropriate,
     but it currently has 0.88 palette overlap with `cookie-jar` and identical markup to
     `fish-and-farm`.
   - *Prescription*: Keep the hospitality register, but rebuild the hero around table
     tickets, craft plates, and copper counter dining. Decouple section rhythm from
     `fish-and-farm` so it doesn't read as a duplicate reskin.

