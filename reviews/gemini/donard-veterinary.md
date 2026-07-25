# Concept review — Donard Veterinary Clinic — 25 July 2026

Status: Revise

Concept: `/concepts/donard-veterinary/`  
Reviewed commit: `8987095`  
Reviewed source fingerprint: `sha256:b5f4caa3a7cb2b4f3da19cb6e0ac004750e7253913a1e12361e4bc6960725e2b`  
Creator: Codex root agent (shared repair pass, 24 July 2026)  
Independent reviewer: independent non-creator agent `donard_veterinary_v11_rereview`

This is the re-review of the repaired source after the first v1.1 verdict
(Revise at 5.93, 24 July 2026). Scoring was completed from direct browser
inspection before the "Phase Q review batch" table, the "Post-review shared
repair pass" table or `releases.json` were opened; those were read once
afterwards only to record the earlier-defect disposition, and no score changed.

## Candidate

Visitor job: Ask this clinic for an appointment for a specific pet on a
specific day and get a call back — or, if the animal is in trouble now, find
the number that reaches a vet without reading anything else.

Current presence and verification: `research/verifications.json`, record named
"Donard Veterinary Centre" (Newcastle), `verifiedOn` 2026-07-21. The record's
`name` field is stale census data; its own `corrections.website` points at
`donardveterinaryclinic.co.uk`, its `corrections.instagram` at
`donardvetclinic`, and the practice's own site, the vetni.co.uk recruitment
advert and the fascia in the reviewed hero photograph all read **Donard
Veterinary Clinic**. The concept names the business correctly; the verification
record is the thing that is out of date, and it should carry a `name`
correction so a later truth refresh does not "fix" the concept back to the
wrong name.

Truth checked at: 2026-07-25 (reviewer re-verified every material claim against
the practice's own live pages on the day of review; see Evidence bundle).

Primary loop: `/concepts/donard-veterinary/` → "Request an appointment" →
`/concepts/donard-veterinary/appointments/` → fill name, pet, preferred day,
phone → "Prepare email request" → an explicitly labelled handoff panel offering
a pre-filled `mailto:` draft the visitor sends themselves.

Review boundary:

- Start screen/state: `/concepts/donard-veterinary/`, first visit.
- Successful end screen/state: `/concepts/donard-veterinary/appointments/`
  with `[data-dv-handoff]` unhidden and focused, reading "Your details are
  ready. Open the draft, check it, then press send in your email app.", and
  `[data-dv-email-link]` resolved to a `mailto:` URI containing all four
  collected values.
- Important failure state: same route, submit with the required `name` and
  `phone` empty.
- Recovery: native constraint validation blocks submission, focus moves to the
  first invalid control, the visitor types a value and resubmits successfully.

Exposed routes and actions outside the loop:

- `/concepts/donard-veterinary/appointments/` — real companion route, works.
- Header brand link → `/concepts/donard-veterinary/` — real route, works.
- Header nav "Our practice" → real route on the appointments page; rendered
  struck-through and inert on the home page (it is the current page).
- Header nav "PetsApp" (both routes) and "Open PetsApp on the clinic website"
  (appointments) → `https://donardveterinaryclinic.co.uk/`. Both resolve to a
  real destination, but **neither is labelled as leaving the prototype**: same
  tab, no external affordance, and a nav item named "PetsApp" reads as a
  section of this site rather than a jump to the practice's live 2017 site.
- Nav "Pet services", "FAQs", "Contact" → `data-concept-placeholder`; the
  layout script strips the href, sets `aria-disabled="true"` and
  `title="Concept preview — this link is not active"`, and the CSS renders
  `text-decoration-line: line-through`. Confirmed in the DOM.
- Home services rail — six `data-concept-placeholder` links, same treatment.
- Five `tel:+442843729414` links and two `mailto:info@…` links → real.
- Shared "Is this your business? Claim this concept →" → `/request/?business=…`.

Declared placeholders, stubs and limitations:

- Nine (home) / three (appointments) inert nav and service links, marked with
  `data-concept-placeholder`, struck through and `aria-disabled`. No bare
  `href="#"` survives into the rendered DOM.
- The request form declares itself twice: "Prepare an email with these details.
  Nothing is sent until you review and send it from your email app." above the
  fields, and "this independent concept does not send appointment requests
  itself" below the button.
- Shared fixed disclosure: "Independent concept by Mourne Made. Not the live
  Donard Veterinary Clinic website." `bannerNote` is **empty**, so unlike
  Groves Chemist and Newcastle Family Dental Care this concept's disclosure
  states no thesis.
- No sources-and-limitations block exists on either route.

Closest portfolio neighbours (chosen over Donard Hotel and Castle Farm because
these two share the visitor job, the sector and the town):

- **Newcastle Family Dental Care** (`/concepts/newcastle-dental/`) — the
  closest by a distance. Same town, **same street** (2 Railway Street vs 8
  Railway Street), same healthcare register, and the same primary loop: a
  "Request an appointment" form collecting name + phone + a categorical
  selector, promising a call back rather than a booking.
- **Groves Chemist** (`/concepts/groves-chemist/`) — same batch-two healthcare
  lane, same shared top-strip/direct-header/pill-CTA chassis from
  `concept-shell.css`, same "restore the capability the current site lacks"
  argument, same struck-through placeholder nav in the first viewport.

## Evidence bundle

- Current capture: none supplied in the bundle; the current presence is
  described in the verification record (2017-era Divi build, `© 2017` footer,
  zoom-blocking viewport, PetsApp bubble added since the census pass).
- Desktop after, 1265×710: `.tmp/dv/home-desktop.png`,
  `.tmp/dv/appt-desktop.png` (+ `-full.png`), captured by the reviewer.
- Phone first screen, 390×844: `.tmp/dv/home-phone.png`,
  `.tmp/dv/appt-phone.png` (+ `-full.png`), captured by the reviewer.
- **Supplied bundle is unreliable.** The pre-captured evidence in
  `research/concept-reviews/evidence/phase-q-rereview/` was made with
  Puppeteer's default 800×600 viewport still in force under the CDP metrics
  override, so `donard-veterinary__desktop-1265x710.png` is an 800px-wide
  layout letterboxed into a 1265px frame and `…__phone-390x844.png` is the same
  800px layout clipped to 390px with the right-hand text sliced off. Every
  capture in this record was retaken with `defaultViewport: null` plus
  `Emulation.setDeviceMetricsOverride`, which reports `clientWidth` 1265 / 390
  as expected.
- Primary-loop walkthrough: `.tmp/dv-loop.mjs`, `.tmp/dv-loop2.mjs`;
  handoff state captured at `.tmp/dv/appt-phone-handoff.png`.
- Failure and recovery evidence: `.tmp/dv-loop.mjs` — empty submit leaves
  `[data-dv-handoff].hidden === true`, `document.activeElement` is
  `input[name=name]`, `validationMessage` is "Please fill in this field.",
  URL unchanged.
- Sources, asset credits and limitations: `public/images/place/ATTRIBUTION.md`
  line 12; `research/verifications.json`. Nothing on-page.
- Asset source and public-use rights status:
  `public/images/donard-veterinary-exterior-2023.jpg` (1024×644) —
  "Donard Veterinary Clinic, Newcastle, photographed by Eric Jones on 28
  February 2023. Geograph image 7425069, licensed CC BY-SA 2.0." Licence
  permits publication; the on-page figcaption gives author, year and licence
  name but **no licence URI, no link to the source photograph, and no
  indication that the file was resized and is cropped in place**.
- External destination and accepted parameters: `mailto:` handoff verified.
  Submitting name "Conor Brown", pet "Cat", day "Thursday", phone
  "07700 900123" produced
  `mailto:info@donardveterinaryclinic.co.uk?subject=Appointment+request+for+a+cat&body=…Name:+Conor+Brown…Pet:+Cat…Preferred+day:+Thursday…Phone:+07700+900123…`.
  All four collected fields survive. Note the `URLSearchParams` encoding uses
  `+` for spaces (see Complete loop).
- Keyboard check: full pass. 17 stops in DOM order on the appointments route,
  every one with a visible 3px solid focus ring (gorse `rgb(224,193,77)` on
  links/buttons, teal `rgb(47,157,130)` on form controls). Enter on the submit
  button runs the same handler as pointer submit; Tab from the button lands on
  "Open email draft". Inert placeholder links are correctly absent from the tab
  order because the layout script removes their `href`.
- Contrast check: **four failures, all inside the emergency card** — see
  Responsive use and accessibility. Computed from resolved `color` blended
  against the resolved ancestor background stack, not estimated.
- Reduced-motion check: pass. Under
  `Emulation.setEmulatedMedia prefers-reduced-motion: reduce`, the three
  `dv-rise` entrances on `.dv-appt-intro`, `.dv-appt-grid` and
  `.dv-emergency-card` resolve to `animation-name: none`, and the global
  reduced-motion rule collapses transitions to `1e-05s`.
- `pnpm build`: pass — release check ran, 71 pages built in 1.26s.
- `pnpm test:concepts`: not re-run by the reviewer; creator reports 72/72.
  Independently corroborated for this concept — `documentElement.scrollWidth`
  equals `clientWidth` (1265 and 390) on both routes, no clipped header
  actions, no console errors, no failed requests.
- `pnpm test:reviewed-concepts`: pass, 7/7.
- Relevant journey or interaction check: reviewer re-verified every material
  claim against the practice's own live pages on 2026-07-25 —
  `donardveterinaryclinic.co.uk` (name, "8 Railway Street Newcastle Co Down
  BT33 0AL", "028 4372 9414", the six weekday/Saturday hour lines, and the
  service list "Routine Health Care, Diagnostics, Surgery and Hospitalisation,
  VidiVet, Dental clinic, Weight Clinic, Pet Passport, …, Emergency treatment")
  and `donardveterinaryclinic.co.uk/emergency-treatment/` ("Should an emergency
  occur out of working hours, contact us on our clinic number and you will be
  diverted to the on-call vet"; "VidiVet is our trusted partner for
  out-of-hours support, offering instant veterinary triage advice… provided to
  Donard Veterinary Clinic clients at no extra cost").
- Browser console: clean. Zero errors, zero page errors, zero failed requests
  across both routes at both viewports.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification dated 2026-07-21, four days old. The concept preserves the practice's real phone, email, address, hours and services rather than replacing them, and the disclosure names it an independent concept on both routes. Criticism of the current site lives in the verification record, not on the page. |
| Claims are honest | Pass | Every material fact checked against the practice's own pages on review day is correct: name, "8 Railway Street · Newcastle", "028 4372 9414" (also legible on the fascia in the hero photograph), all six published hour lines, and the six named services. Critically, the emergency claim is **accurate**: the practice publishes "contact us on our clinic number and you will be diverted to the on-call vet", so routing out-of-hours emergencies to 028 4372 9414 is the practice's own stated policy, not an invention. Weaknesses that stop short of failure: "Sunday — Closed" is an inference (the practice publishes no Sunday line); "Availability and response times are shown there" about PetsApp is unverified; nothing on-page carries a source. |
| Real visitor loop | Pass | Verified in the DOM after submit, not assumed. Submission is intercepted (`preventDefault`), validated, and produces a `mailto:` URI containing all four typed values; the panel is unhidden, focused, and states "Nothing is sent until you review and send it from your email app". This is an explicitly labelled prototype handoff. The earlier decorative GET form is gone. |
| Subject proof | Pass | A real, dated documentary photograph of the actual premises — Geograph 7425069, Eric Jones, 28 February 2023 — with the "Donard Veterinary Clinic / PROFESSIONAL · CARING · COMPASSIONATE / www.donardveterinaryclinic.co.uk / Tel: 028 4372 9414" fascia and the teal shopfront in frame, credited in a figcaption. At 1265 the fascia lettering is plainly legible in the fold. At 390 it is marginal — the image occupies only the bottom 154px of the 844px fold and the fascia lettering renders at roughly 6 CSS px — but the teal-and-blue frontage and its logo oval are in the first viewport, and the credit follows the image on the same figure. Passes, marginally at phone size. |
| Responsive and keyboard usable | Pass | `scrollWidth === clientWidth` at 1265×710 and 390×844 on both routes; no clipped header actions; no essential content lost (the emergency number persists in the top strip after `.dv-nav` and `.dv-phone` go `display: none` at ≤940px). Full keyboard operation of navigation, all four controls, the primary action and the handoff link, with visible focus throughout. |
| Readable and motion-safe | **Fail** | Four measured contrast failures, all inside the out-of-hours emergency card on `/appointments/`: `.dv-emergency-hours-closed` "Closed" `rgba(255,255,255,0.35)` over `#593C69` = **2.56:1**; `.dv-emergency-hours-title` "CLINIC OPENING HOURS" `rgba(255,255,255,0.45)` = **3.25:1**; `.dv-emergency-call-label` "CALL US DIRECTLY" `rgba(255,255,255,0.65)` over `#22755F` = **3.34:1**; and `.dv-emergency-petsapp` "Open PetsApp on the clinic website" — an interactive control — `#2F9D82` over `#4D2D5E` = **3.38:1**. All are body-size text or controls needing 4.5:1; three are 10–13px. Alternatives and reduced motion pass; contrast does not. |

Review disposition: Revise

Evidence still needed to judge the design: none. The supplied capture bundle
was unusable and was replaced by reviewer captures; a correct current-site
"before" capture is still absent from the bundle but the verification record
describes the current presence adequately for scoring.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Blocked | The hero is CC BY-SA 2.0 (Geograph 7425069, Eric Jones, 2023) and `ATTRIBUTION.md` records it, so a publishable licence exists — but the licence's own conditions are not fully met on the page. Unblock: add the licence URI (link "CC BY-SA 2.0" to the deed), link or name the Geograph source, and state that the file was resized and is cropped. Cheap fix, but until it is done the licence does not cover the public use. |
| Truth check current within 90 days | Pass | Verified 2026-07-21 and independently re-confirmed against the practice's own pages on 2026-07-25. Update the verification record's stale `name` field ("Donard Veterinary Centre") at the next refresh. |
| Independent-concept safeguards and honest public disclosure | Pass for internal route | `noindex, nofollow`, the fixed disclosure and the claim action are present on both routes. The empty `bannerNote` means the disclosure carries no thesis; supply one before any public case study. |
| Repository and journey checks | Pass for reviewed source | `pnpm build` completes (release check first, 71 pages); `pnpm test:reviewed-concepts` 7/7; fingerprint matches the reviewed source; reviewer's own overflow, clipped-action and console checks clean at both sizes on both routes. |

## Creator self-review

No creator self-score was filed for this repaired source, so the self-review
table is omitted; the shared repair pass was recorded as an implementation
record rather than a scored candidate.

## Independent review

First-glance order at desktop (1265×710): **first** the plum emergency strip
and immediately below it the 68px Fraunces "Donard Veterinary *Clinic*"
wordmark filling the left half; **second** the photograph occupying the whole
right half, where the eye actually lands on the red POST OFFICE sign at its
centre before finding the clinic's blue fascia at the right edge; **third** the
plum "Request an appointment" pill. The struck-through "Our practice · Pet
services · FAQs · Contact" in the header is the fourth thing seen and is hard
to unsee afterwards.

First-glance order on phone (390×844): **first** the plum strip with the
emergency number; **second** the wordmark/"Professional care, close to home."/
lede stack, which consumes the middle 55% of the screen; **third** the
"Request an appointment" pill. The photograph does not begin until y≈690 and
contributes only a 154px letterbox of roofline and signage at the very bottom
edge; its credit line is below the fold. For 82% of the phone fold this is a
typography-only page.

Remove-nav test: **passes well.** Strip the header and the hero still says
"Donard Veterinary Clinic" as the H1, "8 Railway Street · Newcastle" as the
kicker, and shows a photograph of the actual shopfront with its own fascia
lettering. This is the strongest single thing about the concept.

Swap-the-business test: the photograph, the address kicker, the phone number,
the hours and the strapline "Professional · Caring · Compassionate" (lifted
verbatim from the real fascia) would all break. Everything else would survive a
swap to any small-animal practice unchanged: the plum/lavender palette, the
Slieve Donard mountain badge, "Professional care, close to home.", the six
category service names, and the entire appointments page including the
emergency card. Roughly one photograph and one strapline are doing all the
subject-specific work.

Closest-neighbour test: against **Newcastle Family Dental Care** — same street
(2 vs 8 Railway Street), same town, same healthcare register, same visitor job
and near-identical field set ("Your name" + a phone field + a categorical
selector, both promising a call back). Donard differs materially in two ways:
it leads its first viewport with a real exterior photograph where Dental leads
with a CSS artefact, and it separates emergency from booking so the urgent path
never sits behind the form. But Dental puts its request form *in* the first
viewport beside a signature interaction (the padlocked address bar that *is*
its thesis), while Donard's home page has **no interaction at all** — its only
interactive surface is a conventional four-field form one route away. Against
**Groves Chemist** — both are "restore the capability the current site lacks"
arguments on the identical shared shell (top strip, brand-left/nav-centre/
pill-CTA-right header, struck-through placeholder nav). Groves earns its own
surface with the dispensing-label form; Donard adds nothing to the shared
chassis except the photograph. Batch two was built to give each prospect a
signature *interaction* rather than only a look; this is the one that did not
get one.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.5 | 1.125 | Every material fact independently re-verified against the practice's own pages on review day: name, address, phone, all six hour lines, all six services, and the out-of-hours routing ("you will be diverted to the on-call vet"). Verification 4 days old. | The claim most likely to be invented — that the daytime landline is the out-of-hours emergency route — turns out to be the practice's own published policy, quoted almost exactly. The strapline is lifted verbatim from the real fascia. | The out-of-hours card omits VidiVet, the practice's named free out-of-hours triage partner, and substitutes PetsApp framed as "non-emergency online chat" — and `test:reviewed-concepts` now hard-asserts the page says PetsApp and *not* VidiVet, locking the omission into the suite. In a redesign whose declared task is a clear emergency hierarchy, the free out-of-hours triage service is the one thing missing from the out-of-hours panel. Nothing on either page carries a visible source. |
| Visitor outcome and concept thesis | 15% | 7.0 | 1.050 | The practice's real Book Appointments page offers only a phone number and an email address. The concept collects four structured fields and hands over a pre-written, reviewable draft; the emergency number and hours sit in a persistent strip on every page. | The emergency path is genuinely faster than the current site and never sits behind the booking form — the right call for a vet, and the stated design task delivered. | The opening speaks to nobody in particular: the H1 is the business name at 68px and the thesis line is "Professional care, close to home.", a brochure sentence that would fit any practice. The concept also never states its own argument — `bannerNote` is empty, where both neighbours use it to name the problem they solve. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.900 | Remove-nav passes on the photograph, H1 and address kicker; Fraunces + Karla is not reused elsewhere in the portfolio. | The fascia strapline "Professional · Caring · Compassionate" is taken straight off the building and used as the brand sub-line — real identity, sourced from the subject. | The dominant colour is invented and mis-sourced. The stylesheet header claims "deep plum, Mourne lavender, caring teal — drawn from the clinic's own circular logo", but the clinic's actual logo and frontage — visible in the very photograph placed beside them — are mid-blue and teal with a white oval dog/cat mark. There is no plum anywhere in the real identity, and at 1265 the invented plum header sits directly above the real blue fascia, making the mismatch visible in the first viewport. The badge is a Slieve Donard mountain, not the practice's mark. |
| First viewport and visual composition | 15% | 6.0 | 0.900 | Desktop and phone captures at `.tmp/dv/home-desktop.png` and `.tmp/dv/home-phone.png`; first-glance orders above. | At desktop it is one calm, legible composition with a genuine dominant visual plane, a clear brand, a short proposition and a single primary action — chrome does not consume the scene. | Three obvious costs. (1) The visible navigation reads as mostly disabled: four of five nav items render with `text-decoration-line: line-through` in the fold, and the home page's second section is six more struck-through links in a two-column grid, so a whole content block reads as crossed out. (2) The crop gives the loudest element to the red POST OFFICE sign at centre with cars and road across the lower 40%; the clinic holds roughly the right 30%. (3) On phone the image contributes only the bottom 18% of the fold, so the first screen is typography for 690 of 844px, and the phone header wraps the brand name over three lines and the strapline over three more. |
| Complete loop and functional integrity | 15% | 7.0 | 1.050 | Verified in the DOM after submit: `[data-dv-handoff].hidden === false`, `document.activeElement === handoff`, href containing `Name:+Conor+Brown`, `Pet:+Cat`, `Preferred+day:+Thursday`, `Phone:+07700+900123`. Empty submit blocked, focus moved to `input[name=name]`, message "Please fill in this field.", URL unchanged. Pointer and keyboard paths identical. | The handoff is honest and complete: nothing is discarded, the end state is explicitly a draft the visitor must send, and the page says so twice before and once after the button. A full repair of the earlier blank-email defect. | **Stale handoff.** After a successful submit the panel stays visible with a frozen href. Changing the name to "Someone Else" and the pet to "Dog" left "Open email draft" still resolving to `Name: Conor Brown … Pet: Cat`, with no cue that it is out of date — a visitor correcting a typo and clicking the button already on screen sends the wrong details. Also: no invalid-value state exists at all (`type="tel"` with no pattern accepts `not-a-phone!!!` and carries it verbatim into the body); errors set no `aria-invalid` and leave no persistent in-page message; the body is built with `URLSearchParams`, so spaces become `+` (`Name:+Conor+Brown`), which RFC 6068 does not define as a space and several desktop clients render literally; `method="post"` with no `action` posts to the same route without JS; and the "PetsApp" links leave the prototype for the practice's live site in the same tab with no label. |
| Responsive use and accessibility | 15% | 6.0 | 0.900 | Overflow, keyboard, semantics, contrast and reduced-motion results in the Evidence bundle and the gate table. | Everything structural is clean: zero overflow and zero clipped actions at both sizes on both routes, a complete and logical 17-stop tab order with a visible 3px focus ring on every control, implicit `<label>` on all four fields, one H1 per route, labelled landmarks, `lang="en-GB"`, specific alt text, and reduced motion verified to remove all three entrances. | Four measured contrast failures, all concentrated in the out-of-hours emergency card — the component the whole concept is built around. "Closed" at **2.56:1** is the least legible text on the page and is the one line that tells an owner the clinic is shut; "Open PetsApp on the clinic website" is an interactive control at **3.38:1**. Secondarily, at ≤940px `.dv-nav` and `.dv-phone` are set to `display: none` with no replacement menu, so the only live nav link is unreachable on a phone. |
| Craft and finish | 10% | 6.0 | 0.600 | Captures at both sizes on both routes, clean console, clean build, `concept-donard-veterinary.css` lines 303, 398, 506–507. | Deliberate typographic voice — the italic Fraunces "Clinic" against the roman wordmark, consistent focus treatment, a figcaption that sits on the image rather than floating free, and not one console error or failed request. | `@keyframes dv-rise { from { opacity: 0; transform: translateY(14px); } }` is applied to `.dv-appt-intro`, `.dv-appt-grid` and `.dv-emergency-card` — precisely the "generic rise animation" the rubric names as a craft defect. The appointments page has a dead 393px column at desktop (form card ends at x≈425, emergency card starts at x≈818) while the contact row *below* the form runs to x≈787, so the left column is two different widths stacked. The fixed Mourne Made banner permanently covers the "Your pet"/"Preferred day" row at the default scroll position at 1265×710. The hero is upscaled: a 1024×644 source, `sizes="45vw"` picking the 640×403 webp, rendered `object-fit: cover` into a 569×487 box — about 1.21× beyond its own pixels. |
| **Total** | **100%** | | **6.53** | | | |

## Verdict

Weighted score: `(7.5×.15) + (7.0×.15) + (6.0×.15) + (6.0×.15) + (7.0×.15) + (6.0×.15) + (6.0×.10)`
= `1.125 + 1.050 + 0.900 + 0.900 + 1.050 + 0.900 + 0.600` = **6.53**/10

Core category floors at 7.0 met: No — Responsive use and accessibility is 6.0.
(Evidence 7.5, Visitor outcome 7.0 and Complete loop 7.0 all meet the floor.)

Supporting category floors at 6.0 met: Yes — Identity 6.0, First viewport 6.0,
Craft 6.0.

All design gates pass: No — "Readable and motion-safe" fails.

All public release conditions pass: No — asset permission is blocked on
incomplete CC BY-SA attribution.

Verdict: **Revise**

This is a real and substantial repair. All three gates that failed the first
v1.1 review — claims, real visitor loop and subject proof — now pass on my own
inspection, and the score moves 5.93 → 6.53. It fails on a different axis: a
contrast defect that was previously recorded as passing, concentrated in the
one component the concept exists to deliver. Per the acceptance rule this
consumes the concept's one focused repair cycle; the remaining work is small
and specific, and the owner should decide whether to spend the cycle here.

Required repairs in priority order:

1. **Emergency-card contrast.** `.dv-emergency-hours-closed` measures 2.56:1,
   `.dv-emergency-hours-title` 3.25:1, `.dv-emergency-call-label` 3.34:1 and
   the `.dv-emergency-petsapp` control 3.38:1. Acceptance check: every text and
   control inside `.dv-emergency-card` computes ≥4.5:1 against its resolved
   background, measured from computed styles, with the Sunday "Closed" state
   at least as legible as the open-day rows. Add the measurement as a
   `test:reviewed-concepts` assertion so it cannot regress.
2. **Stale handoff link.** Acceptance check: after a successful submit, an
   `input`/`change` on any field either re-hides `[data-dv-handoff]` or
   rebuilds `[data-dv-email-link].href` from current values; a browser
   assertion types a name, submits, edits the name, and confirms the href
   contains the edited value and not the original.
3. **No invalid-value state.** Acceptance check: a phone value with no digits
   is rejected before the handoff appears, with a persistent in-page message
   referenced by `aria-describedby` and `aria-invalid="true"` on the control,
   not only the native bubble.
4. **Restore VidiVet to the out-of-hours panel.** The practice publishes
   VidiVet as its free out-of-hours triage partner; the concept's out-of-hours
   card names only PetsApp. Acceptance check: the emergency card states both —
   PetsApp for chat/booking and VidiVet for out-of-hours triage — and the
   reviewed-concepts assertion is relaxed from "must not say VidiVet" to "must
   not present VidiVet as the booking tool".
5. **Complete the CC BY-SA attribution.** Acceptance check: the figcaption
   links "CC BY-SA 2.0" to the licence deed, names or links Geograph 7425069,
   and states that the image was resized and is cropped.
6. **Composition cost of the struck-through fold.** Ten inert links render with
   line-through in the home page's first two screens, four of them in the
   header. Acceptance check: either the nav is reduced to the items the
   prototype actually has, or inert items are presented as a quiet
   "not in this prototype" affordance rather than crossed-out text — judged at
   1265×710 and 390×844.
7. **Give the concept a thesis and a signature interaction.** `bannerNote` is
   empty and the home page has no interactive surface. Acceptance check: the
   disclosure names the argument (as Groves and Dental do), and the home page
   carries one interaction that only this subject would need.

## Appeal

Appeal requested: No  
Reason: —  
Appeal reviewer: —  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: —  
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25  
Commit: `8987095`  
Checks repeated: first-glance at 1265×710 and 390×844 on both routes; full
pointer and keyboard primary loop with DOM inspection of the post-submit state;
empty-required and invalid-value failure states with recovery; every exposed
route and action; contrast computed from resolved styles; reduced motion via
`Emulation.setEmulatedMedia`; horizontal overflow and clipped header actions;
console and network errors; remove-nav, swap-the-business and closest-neighbour
tests; independent re-verification of every material claim against the
practice's own live pages; `pnpm build` and `pnpm test:reviewed-concepts`.

Earlier defect disposition:

- **Claims (was Fail) → resolved.** The concept no longer names VidiVet as the
  clinic's tool; it names PetsApp, which the 21 July verification confirms was
  added to the live site. Every other material fact independently checks out
  against the practice's own pages, including the out-of-hours routing that the
  practice itself publishes. Residual weakness, not a failure: the out-of-hours
  card now omits VidiVet entirely, which is the practice's free out-of-hours
  triage partner.
- **Real visitor loop (was Fail) → resolved.** The decorative `mailto` GET form
  is gone. Submission is intercepted, validated, and every typed field survives
  into a reviewable draft; the end state is explicitly labelled as a prototype
  handoff. Verified in the DOM, not assumed. A residual stale-link defect
  remains but does not reopen the gate.
- **Subject proof (was Fail) → resolved.** A real, dated, licensed 2023
  photograph of the actual premises with the clinic's own fascia in frame,
  credited on the image. Marginal at 390px, where only the bottom 154px of the
  fold carries it.
- **New failure not present in the earlier record: Readable and motion-safe.**
  The first v1.1 record marked this gate `true`. Four measured failures inside
  the emergency card say otherwise. The card was not changed by the repair
  pass, so this is a defect the earlier review did not catch rather than a
  regression the repair introduced.

Final score: **6.53**/10  
Final verdict: **Revise**

If the final verdict is Revise:

Retired from public queue: not yet — this re-review consumes the one focused
repair cycle allowed after the first Revise. Under the rule, a core category
still below 7.0 and a gate still failing on re-review means the concept is
retired from the public queue and kept internal from 2026-07-25.  
Condition required to reopen: the seven repairs above are cheap and concrete
and the concept is now within 0.5 of the bar with real subject photography and
an honest loop already in place — so this is a strong candidate for an explicit
owner flagship decision to extend the direction, rather than a direction that
has run out of road. Absent that decision it stays internal.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — practice site live, recruiting via vetni.co.uk (adverts
dated 8 July 2026 and 10 March 2026), RCVS Find-a-Vet listed.  
Current public presence: `https://donardveterinaryclinic.co.uk/` — 2017-era
Divi build, `© 2017` footer, zoom-blocking viewport, PetsApp chat/booking
bubble added since the census pass; Book Appointments still lists only phone
and email.  
Primary external handoff: `mailto:info@donardveterinaryclinic.co.uk` —
recipient matches the practice's published address.  
Material claims: unchanged and confirmed — name "Donard Veterinary Clinic",
"8 Railway Street Newcastle Co Down BT33 0AL", "028 4372 9414", Mon/Tue/Thu/Fri
8:30am–6:30pm, Wed 8:30am–7pm, Sat 9am–1pm, and the six named services. One
correction required in the source record, not the concept: `verifications.json`
still carries the census-era `name` "Donard Veterinary Centre" with no `name`
entry in `corrections`.  
Asset permission: CC BY-SA 2.0 licence valid; on-page attribution incomplete
(no licence URI, no source link, no modification note).  
Material change found: No  
Affected categories to re-review: none  
Public status: Remove pending re-review — the concept is not public and must
not become one while a design gate fails.
