# Three ways to describe the work

*Written 6 August 2026. [`what-we-look-for-brief.md`](what-we-look-for-brief.md)
staged the fault taxonomy as a public page, and working on it surfaced that it
is one of three plausible answers to the same underlying brief — a public
surface that says what the studio does, and what the general contours of a
good local website are, without a lecture. This file maps the three against
each other once, in one place, so each brief can argue its own page instead of
re-litigating the family.*

The three briefs:

| | Approach | Brief | Status |
| --- | --- | --- | --- |
| **A** | The diagnosis — ten faults, walked | [`what-we-look-for-brief.md`](what-we-look-for-brief.md) | Brief done; study started at `src/pages/prototypes/what-we-look-for.astro` |
| **B** | The assembly — one site, built in front of you | [`how-a-site-goes-together-brief.md`](how-a-site-goes-together-brief.md) | Brief done |
| **C** | The shapes — a drawn, annotated pattern book | [`five-shapes-brief.md`](five-shapes-brief.md) | Brief done |

## One method, three directions

Nothing on any of the three pages is invented for it. Twenty concepts produced
two bodies of knowledge — the fault taxonomy
([`film/studio-recurring-themes.md`](film/studio-recurring-themes.md)) and the
elevation method ([`docs/the-elevation-method.md`](../docs/the-elevation-method.md))
— and between them they already hold what goes wrong, what right is made of,
and why right differs per business. Each approach publishes one facet:

| | Walks | Argues | The owner it catches |
| --- | --- | --- | --- |
| **A** | backward from the fault | we know what goes wrong, specifically | "something is wrong with mine and I can't name it" |
| **B** | forward through the decisions | every part is there for a reason | "what would I actually be getting?" |
| **C** | sideways across the variation | the result is yours, not a template | "websites all look the same anyway" |

A is the diagnosis, B is the anatomy, C is the typology. Same taxonomy, three
reading directions — which is why the three do not compete for one URL, and
why B and C borrow the fault walk's wireframe grammar and its data (theme ids,
shape labels) rather than inventing their own.

## The tension between B and C, resolved before either ships

B builds "the idealised form of a modern site". C's opening thesis is that no
single idealised form exists. Unmanaged, the two contradict each other on
adjacent pages.

The resolution is structural, and both briefs carry it: **the ideal form is
real, and it runs out exactly one layer before the end.** B assembles the
invariant chassis — the part of every good site that is the same because
*visitors* are the same: they arrive with an errand, one question, and no
intention of creating an account. Its final beat is a stop: the wireframe
reaches for a register and grey has nothing to offer, and the page admits the
last layer cannot be drawn without knowing the business. That admission is C's
first sentence. B ends where C begins; C is the variation B refuses to fake.
Competence, then recognition — the method's own split, published as two pages.

## Order of work

**A, then C, then B.**

- **A first** because it is furthest along — the brief is written, the study
  route exists, and PLAN.md §8 already names it as the next pick-up in
  parallel with the gen slate.
- **C second** because it is the cheapest to make honest: static drawn plates,
  a taxonomy that already exists verbatim in the method doc, worked examples
  already shipped, and a near-zero interaction budget. It also feeds B — the
  assembly's stop lands on the shapes page, so C existing first gives B its
  ending.
- **B last** because it is the most expensive and carries the genre risk: a
  scroll-narrated construction is the SaaS product-reveal's home turf, and the
  anti-references in `PRODUCT.md` point straight at it. It borrows A's
  wireframe grammar and lands on C's question, so it is strictly better built
  third.

Could all three ship? They answer different owner questions, so in principle
yes — but not before the section 3 outreach conversations say anything about
which question real owners actually arrive with. Ship A, watch, then decide
whether C and B become pages or remain briefs. None of the three outranks the
request path.

## Rules that propagate to all three

Restated once here; each brief carries the ones it needs.

- **No real business's fault appears on a public page.** Recorded faults about
  real businesses go one-to-one on a postcard, never onto these surfaces.
- **Tallies are not prevalence.** Per-theme counts describe the studio's own
  case-study notes and are never read as claims about websites at large. No
  score, grade or count is ever applied to a named business.
- **Wireframes and plates are drawn, not generated** — CSS and SVG, no
  provenance entries, no disclosures. Only the clips carry that weight.
- **Request path wins on attention weight.** If any of these pages out-shouts
  `/request/`, the page loses, not the form.
- **`/prototypes/` first.** Every novel control gets a study route before a
  public URL.
- **Reduced motion gets a designed settled state**, not an off-switch. The
  static plate of each page is designed first, and it is also the print story.
