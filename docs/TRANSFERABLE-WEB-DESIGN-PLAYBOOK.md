# Transferable web design playbook

This playbook distils patterns that are implemented and reviewed in Local. It
is a guide for a separate redesign, including Elizabeth Norman International
(Liz); it is not a second owner for Local's brand system. Local's current
identity remains owned by [`DESIGN.md`](DESIGN.md).

## 1. Start with the visitor's task

Define who arrives, on what device, from where, and what they need to do next.
Design the first screen for that moment rather than for an abstract audience.

- Give the page one primary job. Let the headline, proof and main action answer
  it together.
- Put the outcome before the organisation's process. Local's homepage shows
  the change before explaining the service; its request page shows a concrete
  example beside the form.
- Keep secondary routes visible but quieter. The primary and secondary actions
  should not look equally urgent.
- Order mobile content by the visitor's errand, not by the desktop column
  order. The Buck's Head concept moved date and party size above menus because
  booking was the first phone task.

**Use for Liz:** decide which arrival is primary before composing the homepage:
a professional exploring roles, a hiring team seeking talent, or someone who
already knows the firm. Give the primary visitor an immediate route to the next
useful action; keep the other audience door clear but subordinate.

## 2. Earn distinctiveness from evidence

Inventory the organisation before choosing an aesthetic: its strongest words,
history, working rituals, specialist knowledge, audience and existing visual
identity. Preserve deliberate choices that still work. Design should reveal
specific knowledge, not apply a category costume.

Run two tests:

1. **Swap test:** if a competitor's name can replace the organisation's name
   without changing the page, the design is still generic.
2. **Recognition test:** would staff, candidates and clients recognise their
   field and the way the organisation works, or only see a polished template?

Local's rebuilt concepts are evidence of this rule: the stronger versions
restored real marks, photography, language and working routes that earlier
visual treatments had replaced. The reusable lesson is preservation and
specificity, not any of those businesses' aesthetics.

**Use for Liz:** derive character from its real role taxonomy, sector
expertise, candidate language, consultant knowledge and track record. Do not
default to generic corporate recruitment photography, abstract data graphics,
or a tech-SaaS treatment merely because analytics and data are among the
disciplines.

## 3. Build a proof-led page narrative

A dependable marketing-page sequence is:

1. a specific promise and primary action;
2. visible proof that makes the promise credible;
3. the smallest explanation needed to understand the offer;
4. deeper routes for visitors who need detail;
5. a closing action after enough evidence has accumulated.

Keep one dominant idea per section and use long, deliberate spacing between
ideas. Prefer a few strong alignments and real artifacts over many equal cards.
Number sections only when order carries meaning.

Local examples:

- The homepage pairs a direct promise with a working visual demonstration.
- The transformations index uses named, filterable examples rather than a
  generic capability list.
- Detailed reasoning sits after the visual proof in a one-open-at-a-time
  accordion.
- The request page puts privacy, recovery and the next step at the point of
  action rather than in distant explanatory copy.

**Use for Liz:** proof may be current specialist roles, placements or tenure
data that can be substantiated, named sector expertise, consultant profiles,
or concise candidate/client accounts. Do not invent metrics, testimonials,
employer relationships or job volume to fill the layout.

## 4. Visual taste

- Choose a distinctive visual register from the organisation, not from the
  recruitment category. Palette, type and imagery should express the same
  character.
- Use committed typographic hierarchy: fluid display sizes, short supporting
  copy, readable body type and controlled line length.
- Use colour with intent. Maintain strong text contrast and avoid muted grey
  copy that becomes hard to read on tinted backgrounds.
- Let real imagery or real work artifacts carry visual weight. One decisive,
  well-art-directed image is stronger than a row of interchangeable stock
  photographs.
- Use whitespace to group and pace content. Do not turn every idea into a
  bordered, rounded card.
- Avoid generic SaaS signals: dashboard theatre, abstract automation art,
  repeated icon-card grids, decorative metrics, and a tiny uppercase label
  above every heading.

Local's narrow display face, highly readable body face, restrained maximum
width, fluid spacing and subject-specific concept identities demonstrate these
principles. The actual fonts, colours and coastal imagery do **not** transfer.

## 5. Trusted page and component patterns

| Pattern | Evidence in Local | Appropriate Liz use |
|---|---|---|
| Outcome-first hero | Homepage promise, action and working demonstration share the opening | Pair a precise recruitment promise with a useful role, expertise or proof artifact |
| Filterable visual index | Transformations can be filtered without loading every heavy comparison | Jobs or insights index with a short, comprehensible filter set and a useful empty state |
| Progressive detail | Numbered design notes open one at a time after the comparison | FAQs, process detail or sector explanations that support rather than delay the main task |
| Contextual conversion form | The request form pre-fills known context, removes irrelevant fields and has success/recovery states | Carry role, discipline or employer context into an application, registration or hiring brief |
| Shared shell, local expression | Common concept chrome owns navigation and access behaviour; each concept owns its identity | Keep global navigation, forms and access behaviour consistent while allowing sector pages to use relevant proof and imagery |
| Responsive media | `ResponsiveImage` supplies right-sized formats; video is poster-first and click-to-load | Optimise consultant, event and insight media; never make a video download the price of reading a role |
| Visual plus equivalent list | The town map has semantic links and a simpler mobile index | Give any visual role map, taxonomy or data view an equivalent readable list |

Extract a shared pattern only after it repeats with the same intent. Similar
appearance alone is not enough.

## 6. Interaction and motion

- Make the useful state available in server-rendered HTML. Enhancement must
  not leave content blank when scripts, animation or media fail.
- Use one purposeful entrance or reveal when it demonstrates the offer. Avoid
  identical fade-on-scroll motion on every section.
- User input takes priority. Local's comparison sweep cancels immediately when
  the visitor drags, uses the slider or selects a view.
- Give every pointer interaction a keyboard route and an explicit state such
  as `aria-expanded`, `aria-pressed` or `aria-current`.
- Prefer native controls for important tasks. Local's comparison is driven by
  a real range input, and video keeps native controls.
- Under reduced motion, provide a designed settled frame rather than merely
  removing the experience.

## 7. Mobile guidance

- Review at a true narrow viewport (Local uses 390 px), not only by narrowing a
  desktop browser window.
- Recompose rather than shrink: stack columns, shorten gaps, make primary
  actions full width where useful, and move the core task earlier.
- Replace wide or precision-heavy controls with a clearer small-screen mode.
  Local's comparison adds explicit Before/After buttons; its map replaces
  dense pins with a grouped index.
- Avoid hidden horizontal choices. A concept's five-menu rail became a
  segmented block after two options were silently clipped on a phone.
- Keep touch controls at least 44 px high and test long headings, labels, error
  messages and real content for overflow.
- Lazy-load below-the-fold media and serve sizes matched to the viewport.

## 8. Accessibility baseline

- Use semantic headings, landmarks, labels and native controls.
- Provide a skip link and visible, high-contrast focus indicators.
- Make every core path keyboard operable; show hover information on focus too.
- Announce dynamic results with restrained live regions. Move focus to the
  first invalid field or the resulting confirmation when appropriate.
- Keep labels visible. Do not rely on placeholder text, colour or motion alone
  to convey meaning.
- Write useful alternative text for meaningful images; hide decorative images
  from assistive technology.
- Meet WCAG contrast targets: 4.5:1 for body text and 3:1 for large text and
  meaningful interface graphics.
- Honour `prefers-reduced-motion` and verify the replacement state directly.
- Put privacy, disclosure and limitations where the claim or collection occurs.

Local evidence includes the global skip link and focus treatment,
keyboard-operable comparison, focusable map links, live filter/form status,
form error focus, reduced-motion states and visible concept disclosures.

## 9. Quality checks before release

Inspect the experience in the medium where it will be used:

1. Render the important pages at phone and desktop sizes.
2. Complete the primary action and its failure and recovery path.
3. Use keyboard-only navigation and inspect focus order and focus visibility.
4. Force reduced motion and inspect the settled design.
5. Test real long titles, sparse results, no results and missing media.
6. Verify responsive image sizes, lazy loading and poster-first video.
7. Check every claim, quote, result, role and relationship against its owner
   source; record image rights and generated-media disclosure.
8. Run the swap and recognition tests against the current site and credible
   competitors at the same viewport.
9. Run the repository's type, build and automated journey checks. Keep
   high-value visual behaviour pinned with a behavioural assertion where
   practical.

Call work **implemented** when it exists, **verified** when these relevant
checks pass, and **validated** only when representative candidates, hiring
teams or domain reviewers support it.

## 10. What should transfer to Liz

Transfer the method and proven interaction patterns:

- one clearly prioritised audience and action per arrival page;
- an outcome-first opening with substantiated proof nearby;
- a browsable, fast role index with useful filters and empty states;
- role pages that keep the job, employer context, expectations and action easy
  to scan on a phone;
- candidate and hiring-team forms that inherit known context, ask only what is
  needed, and handle errors and completion clearly;
- sector and consultant pages distinguished by real expertise and evidence,
  while sharing navigation, form and accessibility behaviour;
- purposeful motion, responsive media, strong typography and a non-generic
  visual identity;
- accessibility, evidence and end-to-end journey checks as release criteria.

Do **not** copy Local's palette, typefaces, town map, before-and-after metaphor,
community story, concept disclosure language, or business-specific content.
Choose Liz's visual register only after auditing its existing brand, content,
roles, audiences and measurable proof.

## Project evidence

- [`PRODUCT.md`](../PRODUCT.md) — audience, positioning, design principles and
  evidence boundary
- [`DESIGN.md`](DESIGN.md) — implemented visual language, components, motion
  and access behaviour
- [`REVIEW.md`](REVIEW.md) — verified strengths, failures and fixes
- [`CONCEPT_DESIGN_REVIEW.md`](CONCEPT_DESIGN_REVIEW.md) — phone/desktop,
  action, truth, recognition and publication checks
- [`the-elevation-method.md`](the-elevation-method.md) — inventory, swap,
  recognition and visitor-moment tests
- [`shell-elevation-brief.md`](shell-elevation-brief.md) — proof-led homepage
  decisions and the resulting implementation record
- [`BeforeAfter.astro`](../src/site/components/BeforeAfter.astro),
  [`TownMap.astro`](../src/site/components/TownMap.astro),
  [`request.astro`](../src/pages/request.astro) and
  [`global.css`](../src/site/styles/global.css) — implementation evidence
