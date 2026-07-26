# Archived concept review — Donard Veterinary Clinic — 25 July 2026

Status: Revise

Concept: `/concepts/donard-veterinary/`  
Reviewed commit: `efadf8a` (working tree verified against the reviewed fingerprint;
`git rev-parse --short HEAD` reports `5138d7f`, and
`node scripts/check-concept-reviews.mjs --fingerprint donard-veterinary` returns the
fingerprint below, so the material concept sources are the reviewed ones)  
Reviewed source fingerprint: `sha256:63771ed5fce81841073287431720a3c7bb6cb08ea7f5d743c2fb86abb1a6473e`  
Creator: Codex root agent (second repair pass, 25 July 2026, against the second-round findings)  
Independent reviewer: independent non-creator agent `donard_veterinary_v11_review3`
(did not create or repair this concept)

This is the third independent v1.1 review, of the source repaired after the owner
reopened all five Phase Q candidates under the explicit-designation clause. Earlier
verdicts: **Revise at 5.93** (24 July, first v1.1) and **Revise at 6.53** (25 July,
re-review of the shared repair pass). Both are preserved in the Re-review section.
Every score below comes from my own live measurement of the current source.

## Candidate

Visitor job: Ask this clinic for an appointment for a named kind of pet on a chosen
day and get a call back — or, if the animal is in trouble now, reach the number that
gets a vet without reading anything else.

Current presence and verification: `research/verifications.json`, census join key
`"Donard Veterinary Centre"` (Newcastle), `verifiedOn` 2026-07-21, with
`corrections.name` now reading **"Donard Veterinary Clinic"** — the correction the
second round asked for has been made, so a later truth refresh can no longer reverse
the concept back to the wrong trading name. The record also carries
`corrections.website` (`donardveterinaryclinic.co.uk`) and `corrections.instagram`
(`donardvetclinic`).

Truth checked at: 2026-07-25. I re-fetched the practice's own live pages during this
review rather than relying on the record or the earlier reviews — see Evidence bundle.

Primary loop: `/concepts/donard-veterinary/` → "Request an appointment" →
`/concepts/donard-veterinary/appointments/` → name, pet, preferred day, phone →
"Prepare email request" → a labelled handoff panel offering a pre-filled `mailto:`
draft the visitor reviews and sends themselves.

Review boundary:

- Start screen/state: `/concepts/donard-veterinary/`, first visit.
- Successful end screen/state: `/concepts/donard-veterinary/appointments/` with
  `[data-dv-handoff]` unhidden (`offsetHeight` 112) and holding focus, reading "Your
  details are ready. Open the draft, check it, then press send in your email app.",
  and `[data-dv-email-link].href` resolved to a `mailto:` URI carrying all four
  collected values.
- Important failure states: (a) submit with the required `name`/`phone` empty;
  (b) a phone value that is not a phone number; (c) editing any field after a draft
  has been prepared.
- Recovery: (a) native constraint validation blocks submission and focus moves to the
  first invalid control; (b) same, on `validity.patternMismatch`; (c) the prepared
  draft is withdrawn and a visible message asks the visitor to press the button again.

Exposed routes and actions outside the loop:

- `/concepts/donard-veterinary/appointments/` — real companion route, works.
- Header brand link → `/concepts/donard-veterinary/` — real route, works.
- Header nav "Our practice" → real route from the appointments page; inert on the home
  page (it is the current page).
- Header nav "PetsApp" (both routes) and "Open PetsApp on the clinic website"
  (appointments card) → `https://donardveterinaryclinic.co.uk/`. Real destinations,
  `rel="external"`, but **no `target`, no external affordance and no label saying the
  visitor is leaving the prototype for the practice's live site**. A nav item named
  "PetsApp" still reads as a section of this site. Unrepaired from the second round.
- Nav "Pet services", "FAQs", "Contact" and the six home services-rail cells →
  `data-concept-placeholder`. Confirmed in the DOM: `href` removed,
  `aria-disabled="true"`, `title="Concept preview — this link is not active"`,
  computed `text-decoration-line: line-through`. `document.querySelectorAll('a[href="#"]').length === 0`
  on both routes.
- Five `tel:+442843729414` links and two `mailto:info@…` links → real.
- Shared "Is this your business? Claim this concept →" → `/request/?business=…`.

Declared placeholders, stubs and limitations:

- Ten (home) / three (appointments) inert nav and service links, marked with
  `data-concept-placeholder` and rendered struck through with `aria-disabled="true"`.
  No bare `href="#"` survives into the rendered DOM.
- The request form declares itself three times: "Prepare an email with these details.
  Nothing is sent until you review and send it from your email app." above the fields;
  "Open the draft, check it, then press send in your email app." in the handoff; and
  "this independent concept does not send appointment requests itself" below the button.
- Shared fixed disclosure on both routes: "Independent concept by Mourne Made. Not the
  live Donard Veterinary Clinic website." `bannerNote` is still **empty**, so the
  disclosure states no thesis.
- No sources-and-limitations block exists on either route. Nothing on either page
  carries a visible source for any claim.

Closest portfolio neighbours (chosen over Donard Hotel and Castle Farm because these
two share the visitor job, the sector and the town — the two most likely to expose
portfolio repetition):

- **Newcastle Family Dental Care** (`/concepts/newcastle-dental/`) — same town, **same
  street** (2 Railway Street vs 8 Railway Street), same healthcare register, and the
  same primary loop: a request form collecting name + phone + a categorical selector,
  promising a call back rather than a booking.
- **Groves Chemist** (`/concepts/groves-chemist/`) — same healthcare lane, the identical
  `concept-shell.css` chassis (top strip, brand-left / nav-centre / pill-CTA-right
  header), the same "restore the capability the current site lacks" argument, and the
  same struck-through placeholder nav in the first viewport.

## Evidence bundle

- Current capture: still none in the bundle. The current presence is documented in the
  verification record and was re-fetched live by me during this review.
- Desktop after, 1265×710: `.tmp/rr-dv/home-desktop.png`, `.tmp/rr-dv/appt-desktop.png`
  (+ `-full.png`), captured by me.
- Phone first screen, 390×844: `.tmp/rr-dv/home-phone.png`, `.tmp/rr-dv/appt-phone.png`
  (+ `-full.png`), captured by me.
- Capture method: `puppeteer-core` with `defaultViewport: null` plus
  `Emulation.setDeviceMetricsOverride`, `captureBeyondViewport: false` and an explicit
  clip. `document.documentElement.clientWidth` asserted as 1265 / 390 in every run
  before any measurement was trusted.
- Primary-loop walkthrough: `.tmp/rr-dv-loop.mjs` (pointer at 1265 and 390, full
  keyboard run, all three failure states). Phone handoff state at
  `.tmp/rr-dv/appt-phone-handoff.png`.
- Failure and recovery evidence: `.tmp/rr-dv-loop.mjs`, steps A/B/D/E — quoted in
  Complete loop below.
- Hit-test evidence: `.tmp/rr-dv-hittest.mjs` — `elementFromPoint` at each control's
  centre at scroll 0, mid and max on both routes at both sizes.
- Contrast and focus-ring evidence: `.tmp/rr-dv-contrast.mjs` — every element holding a
  direct text node, foreground alpha-composited over the resolved ancestor background
  stack; focus rings measured by focusing each control and comparing the resolved
  `outlineColor` against the adjacent background.
- Layout/semantics evidence: `.tmp/rr-dv-final.mjs`, `.tmp/rr-dv-probe.mjs`,
  `.tmp/rr-dv/focus-strip.png`.
- Sources, asset credits and limitations: `public/images/place/ATTRIBUTION.md` line 12;
  `research/verifications.json`. Nothing on-page.
- Asset source and public-use rights status:
  `public/images/donard-veterinary-exterior-2023.jpg`, measured **1024×644** —
  "Donard Veterinary Clinic, Newcastle, photographed by Eric Jones on 28 February 2023.
  Geograph image 7425069, licensed CC BY-SA 2.0." The licence permits publication. The
  on-page figcaption gives author, year and licence *name* only — **no licence URI, no
  link or number for the source photograph, and no statement that the file was resized
  and is cropped in place** (`object-fit: cover; object-position: 62% 50%`). Unrepaired
  from the second round.
- External destination and accepted parameters: `mailto:` handoff verified in the DOM.
  Name "Conor Brown", pet "Cat", day "Thursday", phone "07700 900123" produced
  `mailto:info@donardveterinaryclinic.co.uk?subject=Appointment+request+for+a+cat&body=…Name%3A+Conor+Brown…Pet%3A+Cat…Preferred+day%3A+Thursday…Phone%3A+07700+900123…`.
  All four collected values survive. The body is built with `URLSearchParams`, so
  spaces encode as `+` — RFC 6068 does not define `+` as a space in a `mailto` body and
  several desktop clients render it literally.
- Keyboard check: pass on operability, **fail on visible focus**. 17 stops in DOM order
  on `/appointments/`, every control reachable, Enter on the submit button runs the same
  handler as pointer submit, and the tab stop after the handoff is "Open email draft".
  But the focus ring is `--concept-focus: #3a2247` everywhere, which measures 1.04:1 on
  the emergency strip and 1.24:1 on the emergency card — see Responsive use.
- Contrast check: **clean.** 140 text nodes across both routes at both sizes, **0 below
  threshold** (29 / 23 / 47 / 41 measured on home-desktop, home-phone, appt-desktop,
  appt-phone). The four emergency-card failures that decided the second round are gone.
- Reduced-motion check: pass. Under `Emulation.setEmulatedMedia
  prefers-reduced-motion: reduce`, `.dv-appt-intro`, `.dv-appt-grid`,
  `.dv-emergency-card` and `.dv-request` all resolve to `animation-name: none` with
  transitions collapsed to `1e-05s`, and a document-wide sweep returns **zero** elements
  with a running animation.
- `pnpm build`: **not re-run this round.** The production preview that served this
  review was owned by another process and stopped mid-session; the brief forbids
  starting a build. I verified instead that `dist/` matches the reviewed source
  (`data-dv-stale` present, `pattern="[0-9\s+\-\(\)]{7,}"` present, the repaired
  `dv-emergency-hours-closed{…color:#ffffffdb}` present in
  `dist/_astro/concept-donard-veterinary.CSt-YOpZ.css`) and served that build read-only
  on port 4399 for every measurement.
- `pnpm test:concepts`: not re-run. Independently corroborated for this concept —
  `documentElement.scrollWidth === clientWidth` at 1265 and 390 on both routes, no
  clipped header actions, no `href="#"` placeholders, no console errors, no failed
  requests.
- `pnpm test:reviewed-concepts`: not re-run (creator reports 14/14). The two assertions
  that matter here were verified by hand: the invalid-phone refusal and the
  draft-withdrawal on edit. Note that the suite's existing "must say PetsApp and not
  VidiVet" assertion is what locks in the claims defect below.
- Relevant journey or interaction check: I re-fetched `donardveterinaryclinic.co.uk`
  and `donardveterinaryclinic.co.uk/emergency-treatment/` on review day. Confirmed
  verbatim: name "Donard Veterinary Clinic"; "028 4372 9414"; "8 Railway Street
  Newcastle Co Down Northern Ireland BT33 0AL"; Mon/Tue/Thu/Fri 8:30am–6:30pm, Wed
  8:30am–7pm, Sat 9am–1pm, **no Sunday line**; services "Routine Health Care,
  Diagnostics, Surgery and Hospitalisation, Dental clinic, Weight Clinic, Pet Passport,
  Emergency treatment"; and — the finding that decides the claims gate — **"VidiVet"**
  presented as offering "24/7 access to expert digital vet advice" and, on the emergency
  page, as "our trusted partner for out-of-hours support, offering instant veterinary
  triage advice at no extra cost", alongside "you will be diverted to the on-call vet"
  when the clinic number is called out of hours. PetsApp is a script-injected floating
  widget and does not appear in a text fetch; it is evidenced only by the 21 July
  build-time recheck in the verification record.
- Browser console: clean. Zero console errors, zero page errors, zero failed requests
  across both routes at both viewports and through every loop and failure run.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification dated 2026-07-21, four days old, and independently re-confirmed by me against the practice's own pages on review day. The concept preserves the practice's real name, phone, email, address, hours and services rather than inventing replacements, and the fixed disclosure names it an independent concept on both routes. Criticism of the current 2017-era site lives in the verification record, not on the page. `corrections.name` has been added, closing the second round's recorded correction. |
| Claims are honest | **Fail** | The out-of-hours card is materially wrong about the practice's out-of-hours provision, in the one component the concept exists to deliver. Under the heading "OUT-OF-HOURS EMERGENCY" the only online guidance reads: "For non-emergency online chat, open PetsApp from the clinic's current website. Availability and response times are shown there." The practice's own emergency page — fetched by me today — names **VidiVet** as "our trusted partner for out-of-hours support, offering instant veterinary triage advice at no extra cost" with "24/7 access to expert digital vet advice". So the concept takes the practice's free 24/7 out-of-hours triage service, removes it, substitutes a chat widget, and tells the visitor the online route is explicitly *not* for emergencies — the opposite of the real arrangement. This was named as required repair #4 after the second round and was not made; worse, `test:reviewed-concepts` asserts the page says PetsApp and *not* VidiVet, so the omission is now locked into the suite. Two supporting defects in the same card: "Availability and response times are shown there" is an unsourced claim about a third-party widget (the verification evidences an opening-hours popup, not response times), and "Sunday — Closed" is an inference the practice publishes nowhere, presented as fact in an emergency panel. Nothing on either page carries a visible source. Everything else checks out exactly: name, address, phone, all six published hour lines, the six named services, and the out-of-hours routing to the clinic number, which is the practice's own published policy. |
| Real visitor loop | Pass | Verified in the DOM, not assumed. Submission is intercepted, validated and produces a `mailto:` URI containing all four typed values; the panel unhides, takes focus, and states "Nothing is sent until you review and send it from your email app." Empty submit is blocked with focus moved to `input[name=name]`. An invalid phone is genuinely refused — `input.validity.patternMismatch === true` for `not-a-phone!!!` and for `abc`, confirmed through the validity API rather than the presence of the attribute. Editing any field after preparing a draft withdraws it. This is an explicitly labelled prototype handoff and all three of the second round's loop defects are closed. |
| Subject proof | Pass | A real, dated, licensed documentary photograph of the actual premises — Geograph 7425069, Eric Jones, 28 February 2023 — with the "Donard Veterinary Clinic / PROFESSIONAL · CARING · COMPASSIONATE / Tel: 028 4372 9414" fascia and the teal shopfront in frame, credited in a figcaption bonded to the image. At 1265×710 the fascia lettering is plainly legible in the fold and the proof is convincing. It passes on the desktop fold; the phone fold is measured as a first-viewport composition defect rather than a gate failure — see First viewport. |
| Responsive and keyboard usable | **Fail** | Structure and operability are clean, but the gate requires the primary action and controls to work by keyboard **with visible focus**, and they do not. `--concept-focus: #3a2247` measures **1.04:1** against the `--plum-deep` emergency strip — the first tab stop on every page, and it is the emergency phone number; the ring is imperceptible in the capture at `.tmp/rr-dv/focus-strip.png`. It measures **1.24:1** against the plum emergency card, where it rings the "Call us directly / 028 4372 9414" button and the "Open PetsApp" control (2.48:1 against the button's own teal fill — below 3:1 on both adjacent sides), and **1.25:1** on the shared disclosure's own claim link. WCAG 2.2 SC 1.4.11 requires 3:1. This is a defect **introduced by this repair round**, which replaced the studio's gorse focus ring with a concept token and chose a value with no contrast against the concept's own dark surfaces. Second defect: at 1265×710 default scroll on `/appointments/`, `elementFromPoint` at each control's centre returns `ASIDE.mm-concept-banner` for the "Your pet" and "Preferred day" selects and `A.mm-concept-claim` for the emergency call button — three first-viewport controls, including the emergency call, are not hittable until the visitor scrolls. Third: `.dv-nav` and `.dv-phone` are `display: none` below 940px with no replacement. Overflow itself is clean (`scrollWidth === clientWidth` at both sizes on both routes) and the 17-stop tab order is complete and logical. |
| Readable and motion-safe | Pass | **Resolved.** 140 text nodes measured from computed styles across both routes at both sizes: **0 below threshold**. "Closed" now computes well above 4.5:1 (`rgba(255,255,255,0.86)` italic, replacing the 2.56:1 value), and the hours title, call label and PetsApp control all clear. Alt text is specific and useful ("The teal-fronted Donard Veterinary Clinic beside the Post Office on Railway Street in Newcastle"). Reduced motion removes every `dv-rise` entrance — zero elements animating document-wide under emulation. (Focus-ring contrast is scored under the responsive/keyboard gate, which is where the standard places keyboard visibility.) |

Review disposition: Revise

Evidence still needed to judge the design: none. `pnpm build`, `pnpm test:concepts` and
`pnpm test:reviewed-concepts` were not re-run this round for the reason stated above;
that affects the repository-checks release condition, not the design score.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Blocked | CC BY-SA 2.0 (Geograph 7425069, Eric Jones, 2023) is recorded in `ATTRIBUTION.md`, so a publishable licence exists — but the licence's conditions are still not met on the page. The figcaption names author, year and licence but gives no licence URI, no link or number for the source photograph, and no note that the file was resized and is cropped. At 390 the credit sits 164px below the fold, so the share-alike attribution does not travel with the image in the phone first viewport. Unrepaired from the second round. |
| Truth check current within 90 days | Pass | Verified 2026-07-21 and independently re-confirmed by me against the practice's own live pages on 2026-07-25. `corrections.name` now records the real trading name. |
| Independent-concept safeguards and honest public disclosure | Pass for internal route | `noindex, nofollow`, the fixed disclosure and the claim action are present on both routes and the disclosure is `position: fixed` at both sizes. `bannerNote` remains empty, so the disclosure carries no thesis — supply one before any public case study. |
| Repository and journey checks | **Not verified this round** | Not re-run: the production preview was owned by another process and stopped mid-session, and the brief forbids starting a build. Mitigation: the served `dist/` was byte-checked against the reviewed source, the fingerprint matches, and my own overflow, clipped-action, console and network checks are clean at both sizes on both routes. Re-run before any release decision. |

## Creator self-review

No creator self-score was filed for this repaired source, so the self-review table is omitted.

## Independent review

First-glance order at desktop (1265×710): **first** the plum emergency strip and,
immediately under it, the 76px Fraunces "Donard Veterinary *Clinic*" wordmark filling
the left half; **second** the photograph occupying the whole right half — where the eye
actually lands on the red POST OFFICE sign at its centre before finding the clinic's
fascia at the right edge; **third** the plum "Request an appointment" pill. The
struck-through "Our practice · Pet services · FAQs · Contact" in the header, and the six
struck-through service names in the rail at the foot of the fold, are the fourth thing
seen and are hard to unsee: ten crossed-out links in one screen.

First-glance order on phone (390×844): **first** the plum strip with the emergency
number; **second** the wordmark / "Professional care, close to home." / lede stack,
which owns the middle of the screen; **third** the "Request an appointment" pill. The
photograph does not begin until y=687 and the fixed disclosure covers y=749–834, so the
image contributes **62 unobstructed CSS px — 7.4% of the fold** — and that strip shows
roofline, sky and a streetlamp: no fascia, no teal frontage, nothing identifiable. Its
credit is 164px below the fold. On a phone this is a typography-only page.

Remove-nav test: **passes well.** Strip the header and the hero still says "Donard
Veterinary Clinic" as the H1, "8 RAILWAY STREET · NEWCASTLE" as the kicker, and shows a
photograph of the actual shopfront with its own fascia lettering. This remains the
strongest single thing about the concept.

Swap-the-business test: the photograph, the address kicker, the phone number, the hours
and the strapline "Professional · Caring · Compassionate" (lifted verbatim from the real
fascia) would all break. Everything else survives a swap to any small-animal practice
unchanged: the plum/lavender palette, the Slieve Donard mountain badge, "Professional
care, close to home.", the six category service names, and the whole appointments page
including the emergency card. One photograph and one strapline do all the
subject-specific work.

Closest-neighbour test: against **Newcastle Family Dental Care** — same street, same
town, same register, same visitor job, near-identical field set. Donard differs
materially in two ways: it leads its first viewport with a real exterior photograph
where Dental leads with a CSS artefact, and it separates emergency from booking so the
urgent path never sits behind the form. But Dental puts its request form *in* the first
viewport beside the signature interaction that *is* its thesis, while Donard's home page
still has **no interaction at all** — its only interactive surface is a conventional
four-field form one route away. Against **Groves Chemist** — both are "restore the
capability the current site lacks" arguments on the identical shared shell, and both
open on a struck-through placeholder nav. Groves earns its own surface with the
dispensing-label form; Donard adds nothing to the shared chassis except the photograph.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 6.5 | 0.975 | Verification 4 days old; I independently re-fetched the practice's own homepage and emergency page on review day and confirmed name, phone, address, all six hour lines and the service list verbatim. `corrections.name` now closes the second round's recorded correction. | The claim most likely to be invented — that the daytime landline is the out-of-hours route — is the practice's own published policy ("you will be diverted to the on-call vet"), quoted almost exactly. The strapline is lifted verbatim from the real fascia. | The out-of-hours card removes **VidiVet**, the practice's named free 24/7 out-of-hours triage partner, and substitutes PetsApp framed as "non-emergency online chat" — a material misstatement of the business's own emergency provision, named as required repair #4 after the second round, not made, and now hard-asserted by `test:reviewed-concepts`. "Availability and response times are shown there" is unsourced; "Sunday — Closed" is an unpublished inference stated as fact in an emergency panel; nothing on either page carries a visible source; the CC BY-SA attribution is still incomplete. |
| Visitor outcome and concept thesis | 15% | 7.0 | 1.050 | The practice's real Book Appointments page offers only a phone number and an email address. The concept collects four structured fields and hands over a pre-written, reviewable draft; the emergency number sits in a persistent strip at the top of every page, above the fold at both sizes. | The emergency path is genuinely faster than the current site and never sits behind the booking form — the right call for a vet, and the declared design task delivered. The appointment job is materially easier than "find the email address and compose from scratch". | "Emergency information →" does not anchor to the emergency card: at 390 it lands the visitor at the top of `/appointments/` with the card 1,193px down the document and its call button at 1,469px — 625px of scrolling past a whole appointment form. The opening still speaks to nobody in particular ("Professional care, close to home." would fit any practice), and `bannerNote` is still empty, so the concept never states its own argument where both neighbours do. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.900 | Remove-nav passes on the photograph, H1 and address kicker; Fraunces + Karla is used nowhere else in the portfolio; `lang="en-GB"`. | The fascia strapline "Professional · Caring · Compassionate" is taken straight off the building and used as the brand sub-line — real identity, sourced from the subject and verifiable in the photograph beside it. | The dominant colour is invented **and its provenance is misstated in the source**. `concept-donard-veterinary.css` line 2 claims "deep plum, Mourne lavender, caring teal — drawn from the clinic's own circular logo", while the clinic's actual logo and frontage — visible in the very photograph placed next to them — are blue and teal with a white oval animal mark. There is no plum anywhere in the real identity, and at 1265 the invented plum header sits directly above the real blue fascia, making the mismatch visible in the first viewport. The badge is a Slieve Donard mountain, not the practice's mark. Unrepaired from the second round. |
| First viewport and visual composition | 15% | 6.0 | 0.900 | `.tmp/rr-dv/home-desktop.png`, `.tmp/rr-dv/home-phone.png`, `.tmp/rr-dv/phone-fold-image.png`; hit-test at three scroll positions; measured image and banner rects. | The home page's banner occlusion is genuinely fixed: `--mm-banner-space` reserves real layout room and `elementFromPoint` returns the control itself for **all 18 first-viewport controls at every scroll position** at 1265×710, where the second round found all six service cells trapped. At desktop this is one calm, legible composition with a real dominant visual plane, a clear brand, a short proposition and one primary action. | Three costs remain. (1) The visible navigation reads as mostly disabled: four of five header items and all six service-rail cells compute `text-decoration-line: line-through` in the desktop fold — ten crossed-out links in one screen, an entire content block presented as unavailable. (2) The crop gives the loudest element to the red POST OFFICE sign at centre, with cars and road across the lower 40%; the clinic holds roughly the right 30%. (3) At 390 the photograph contributes 62 unobstructed px of the 844px fold (7.4%) — roofline, sky and a streetlamp, with no fascia and no frontage — and its credit is 164px below the fold, so on a phone the subject proof effectively is not in the first viewport. |
| Complete loop and functional integrity | 15% | 7.0 | 1.050 | Pointer at 1265 and 390 and a full keyboard run, all verified in the DOM. Valid submit: `handoff.hidden === false`, `document.activeElement === handoff`, href carrying `Name%3A+Conor+Brown`, `Pet%3A+Cat`, `Preferred+day%3A+Thursday`, `Phone%3A+07700+900123`. Empty submit: blocked, `activeElement === input[name=name]`, "Please fill in this field.", URL unchanged. `not-a-phone!!!`: `validity.patternMismatch === true`, handoff stays hidden. Edit after prepare: `handoff.hidden === true`, `stale.hidden === false`, message "Your details changed. Press Prepare email request again so the draft matches what you typed." Confirmed for `<select>` changes as well as text input. Keyboard Enter on the button runs the identical handler; the next tab stop is "Open email draft". | All three of the second round's loop defects are closed with evidence: the superseded draft is now withdrawn rather than left pointing at old values, and the phone field genuinely refuses a non-phone — the `pattern` compiles (the `v`-flag escaping is correct) and `patternMismatch` fires, which is the only way to know it is not being silently ignored. | Errors are still native-bubble only: `aria-invalid` is never set, `aria-describedby` is null on all four controls, and no persistent in-page error message exists — required repair #3 was half-implemented (refusal yes, announcement no). The stale-draft notice is `role="status"` but focus does not move to it and it renders where the now-hidden handoff was, so a keyboard user who edits a field gets no focus cue. The withdrawn link's href is hidden, not rebuilt. The body is `URLSearchParams`-encoded, so spaces become `+` (`Name:+Conor+Brown`), which RFC 6068 does not define as a space. `method="post"` with no `action` posts to the same route without JS. The "PetsApp" nav item and the emergency card link leave the prototype for the practice's live site in the same tab, unlabelled. |
| Responsive use and accessibility | 15% | 6.0 | 0.900 | 140 text nodes measured from computed styles; focus rings measured per control; hit-test at three scroll positions; reduced motion under CDP emulation; `.tmp/rr-dv/focus-strip.png`. | Two real repairs land. **Text contrast is now completely clean — 0 of 140 nodes below threshold at both sizes on both routes**, including the "Closed" line that measured 2.56:1 and decided the second round. Reduced motion removes every entrance with zero elements animating document-wide. Structure is sound: zero overflow, zero console errors, a complete 17-stop tab order, implicit labels on all four fields, one H1 per route, labelled landmarks, specific alt text. | The repair traded one defect for another. `--concept-focus: #3a2247` gives a **1.04:1** focus ring on the emergency strip — the first tab stop on every page, on the emergency phone number — and **1.24:1** on the emergency card, ringing the "Call us directly" button and the PetsApp control (2.48:1 against the button's own fill; below 3:1 on both adjacent sides), and 1.25:1 on the disclosure's claim link. WCAG 2.2 SC 1.4.11 requires 3:1; the ring is imperceptible in the capture. Separately, at 1265×710 default scroll on `/appointments/` the fixed disclosure makes the two selects and the emergency call button un-hittable (`elementFromPoint` returns the banner), and `.dv-nav`/`.dv-phone` vanish below 940px with no replacement. |
| Craft and finish | 10% | 5.5 | 0.550 | Captures at both sizes on both routes; clean console and network; measured element rects; `concept-donard-veterinary.css` lines 93–103, 201–280, 219–227, 304, 399, 516–517; `src/pages/concepts/donard-veterinary.astro` lines 49–57. | A deliberate typographic voice — the italic Fraunces "Clinic" against the roman wordmark, a figcaption bonded to the image rather than floating free, consistent control treatment — and not one console error or failed request across every run. The `pattern`-escaping comment in `DonardRequestForm.astro` documents a real trap rather than hiding it. | Five defects, two newly found and three unrepaired from a list that named them. **New:** `.dv-request-hint` inherits `text-transform: uppercase` from `.dv-request label`, so the format helper renders as "DIGITS, SPACES, + ( ) AND - ONLY" — a shouted 12px line; and the hero declares `width="1024" height="682"` against a source measured at **1024×644**, so the reserved intrinsic aspect ratio is wrong. **Unrepaired:** `@keyframes dv-rise` still drives `.dv-appt-intro`, `.dv-appt-grid` and `.dv-emergency-card` — the "generic rise animation" the rubric names by name; the desktop appointments page still has a dead 393px gap (form card ends x=426, emergency card starts x=819) while the contact row beneath it runs to x=787, so the left column is two different widths stacked; and `.dv-mournes` plus the home-page `.dv-request` block are dead CSS for elements that no longer exist in either route. |
| **Total** | **100%** | | **6.33** | | | |

## Verdict

Weighted score: `(6.5×.15) + (7.0×.15) + (6.0×.15) + (6.0×.15) + (7.0×.15) + (6.0×.15) + (5.5×.10)`
= `0.975 + 1.050 + 0.900 + 0.900 + 1.050 + 0.900 + 0.550` = **6.325** → **6.33**/10
(`scripts/check-concept-reviews.mjs` is the canonical calculator and rounds half-up;
the score is nowhere near the 7.0 threshold either way.)

Core category floors at 7.0 met: No — Evidence 6.5 and Responsive use 6.0 are below.
(Visitor outcome 7.0 and Complete loop 7.0 meet the floor.)

Supporting category floors at 6.0 met: No — Craft and finish is 5.5.
(Identity 6.0 and First viewport 6.0 meet the floor.)

All design gates pass: No — "Claims are honest" and "Responsive and keyboard usable" fail.

All public release conditions pass: No — asset permission is blocked on incomplete
CC BY-SA attribution, and repository/journey checks were not verified this round.

Verdict: **Revise**

The two defects that decided the previous round are genuinely fixed, and I confirmed
both from my own measurements: text contrast is now clean everywhere (0/140 nodes below
threshold, against four failures last time), and the superseded draft is withdrawn the
moment any field changes. The invalid-phone state is real, not decorative — I confirmed
`patternMismatch` fires rather than trusting the attribute. The home page's
banner-occlusion defect is fixed outright. This is the third consecutive round in which
the repair did what it targeted.

It fails on two axes, one old and one self-inflicted. The old one is the emergency card
still substituting a chat widget for the practice's real, free, 24/7 out-of-hours triage
partner — named as required repair #4 a round ago and left. The self-inflicted one is
the new `--concept-focus` token, introduced by this very repair to keep the studio's
gorse out of the concept, which produces a 1.04:1 focus ring on the first tab stop of
every page. Both are cheap. Neither is a reason to keep extending the direction
indefinitely without an owner decision: this is now three Revise verdicts, and the
pattern is that each round closes the previous round's list and exposes a new one at the
same depth of inspection.

Required repairs in priority order:

1. **Emergency truth.** The out-of-hours card must state the practice's actual
   out-of-hours provision. Acceptance check: the card names VidiVet as the free 24/7
   out-of-hours triage partner *and* the clinic number that diverts to the on-call vet,
   PetsApp is described as what it is rather than as the out-of-hours option, the
   unsourced "Availability and response times are shown there" is removed or sourced,
   and "Sunday — Closed" is either sourced or labelled as an inference. Relax the
   `test:reviewed-concepts` assertion from "must not say VidiVet" to "must not present
   VidiVet as the booking tool" so the suite stops enforcing the defect.
2. **Focus-ring visibility.** `--concept-focus: #3a2247` measures 1.04:1 on
   `--plum-deep`, 1.24:1 on `--plum` and 1.25:1 on the disclosure. Acceptance check:
   every focusable control's focus indicator computes ≥3:1 against every adjacent
   background it is drawn on, measured from computed styles, with the emergency strip
   link and the emergency call button explicitly covered; add the measurement as a
   `test:reviewed-concepts` assertion across all reopened concepts, since the token is
   shared.
3. **First-viewport controls under the disclosure on `/appointments/`.** At 1265×710
   default scroll, `elementFromPoint` returns the banner for both selects and the
   emergency call button. Acceptance check: every first-viewport control on both routes
   returns itself from `elementFromPoint` at scroll 0, as the home page now does.
4. **Emergency information hierarchy at 390.** "Emergency information →" lands 1,193px
   above the emergency card. Acceptance check: the link targets the card's anchor, or
   the card precedes the form in phone source order.
5. **Complete the CC BY-SA attribution.** Acceptance check: the figcaption links
   "CC BY-SA 2.0" to the licence deed, names or links Geograph 7425069, states that the
   image was resized and is cropped, and the credit is inside the 390px fold with the
   image it describes.
6. **Accessible error announcement.** Acceptance check: an invalid or empty field sets
   `aria-invalid="true"` and is referenced by `aria-describedby` to a persistent in-page
   message, not only the native bubble; and the stale-draft notice moves focus or is
   otherwise announced.
7. **Craft pass.** Acceptance check: the phone hint is not uppercase; the hero's
   declared `height` matches the 1024×644 source; the desktop appointments left column
   is one width; `dv-rise` is replaced with motion that has character or removed; dead
   `.dv-mournes` / home `.dv-request` rules are deleted.
8. **Composition cost of the struck-through fold, and the unlabelled external jump.**
   Ten inert links render with line-through in the home page's first screen, and the
   "PetsApp" nav item leaves the prototype for the live site unlabelled. Acceptance
   check: the nav is reduced to what the prototype has, or inert items read as a quiet
   "not in this prototype" affordance; external destinations are visibly marked as
   leaving the concept.

## Appeal

Appeal requested: No  
Reason: —  
Appeal reviewer: —  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: —  
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25 (third independent review)  
Commit: `efadf8a` — fingerprint
`sha256:63771ed5fce81841073287431720a3c7bb6cb08ea7f5d743c2fb86abb1a6473e`  
Checks repeated: first-glance at 1265×710 and a true 390×844 on both routes; complete
pointer and keyboard primary loop with DOM inspection of every state; all three failure
states (empty required, invalid phone verified through `validity.patternMismatch`,
edit-after-prepare verified for both text inputs and `<select>` elements); every exposed
route and action enumerated from the DOM; contrast computed from resolved styles for all
140 text nodes; focus-ring contrast measured per control; `elementFromPoint` hit-testing
at three scroll positions on both routes at both sizes; reduced motion via
`Emulation.setEmulatedMedia`; horizontal overflow, clipped header actions, console and
network; remove-nav, swap-the-business and closest-neighbour tests; independent live
re-fetch of the practice's homepage and emergency page.

Earlier verdicts, preserved:

- **24 July 2026 — first v1.1 review: Revise at 5.93.** Gates failed: claims, real
  visitor loop, subject proof. Deciding defects: the appointment form was a decorative
  `mailto` GET that opened a blank email and discarded every typed field; the concept
  named "VidiVet" as the practice's tool when the live site had added PetsApp; no pet or
  clinic imagery.
- **25 July 2026 — second review, of the shared repair pass: Revise at 6.53.** Gate
  failed: readable and motion-safe. Deciding defects: four contrast failures inside the
  out-of-hours emergency card — "Closed" at 2.56:1, the PetsApp control at 3.38:1, the
  hours title at 3.25:1, the call label at 3.34:1 — in the one component the concept
  exists to deliver; and the post-submit handoff link froze, so a visitor who corrected
  a typo sent the original details. Category scores: 7.5 / 7.0 / 6.0 / 6.0 / 7.0 / 6.0 /
  6.0.

Earlier defect disposition:

- **Readable and motion-safe (was Fail, the second round's only failed gate) →
  resolved.** All four named contrast failures are fixed and I found no replacement:
  0 of 140 text nodes below threshold across both routes at both sizes. "Closed" now
  carries its meaning by weight and italics at a passing ratio. Reduced motion and
  alternatives pass. The gate now passes.
- **Stale handoff link (named loop defect) → resolved.** Preparing a draft, then editing
  the name, hides `[data-dv-handoff]` and shows "Your details changed. Press Prepare
  email request again so the draft matches what you typed." Confirmed for `<select>`
  changes too. A visitor correcting a typo can no longer send the original details.
- **No invalid-value state (named loop defect) → partly resolved.** The refusal is real:
  `not-a-phone!!!` and `abc` both produce `validity.patternMismatch === true`, so the
  `pattern` is compiling and not being silently ignored. But the second half of the
  repair — `aria-invalid`, `aria-describedby` and a persistent in-page message — was not
  implemented; errors remain native-bubble only.
- **Controls trapped under the disclosure (portfolio-wide defect) → resolved on the home
  page, not on `/appointments/`.** All 18 home first-viewport controls now return
  themselves from `elementFromPoint` at every scroll position, where the second round
  found all six service cells trapped. On `/appointments/` at 1265×710 default scroll,
  both selects and the emergency call button are still returned as the banner.
- **Restore VidiVet to the out-of-hours panel (required repair #4) → not done.** The
  practice's own emergency page, re-fetched today, still names VidiVet as its free 24/7
  out-of-hours triage partner. The card still names only PetsApp and still calls the
  online route "non-emergency". This is what fails the claims gate this round.
- **Complete the CC BY-SA attribution (required repair #5) → not done.** No licence URI,
  no source link, no modification note; the credit is below the fold at 390.
- **Struck-through fold, missing thesis and signature interaction (required repairs
  #6–#7) → not done.** Ten inert links still render line-through in the home fold;
  `bannerNote` is still empty; the home page still has no interaction.
- **Mis-sourced palette provenance (named identity defect) → not done.** The stylesheet
  still states the plum and lavender come from "the clinic's own circular logo"; the
  real frontage in the hero photograph is blue and teal.
- **New defect introduced by this repair round: focus-ring visibility.** The repair
  replaced the inherited gorse focus ring with `--concept-focus: #3a2247`, which
  measures 1.04:1 on the concept's own emergency strip and 1.24:1 on its emergency card.
  The previous ring was flagged for putting the studio brand inside a concept screen at
  1.66:1; the replacement is worse on contrast, on the highest-consequence controls.

Final score: **6.33**/10  
Final verdict: **Revise**

If the final verdict is Revise:

Retired from public queue: the concept has been internal and `noindex` throughout and
does not return to `/transformations/` without a Pass. This is the third Revise; the one
focused repair cycle was consumed by the second round and the third was granted by the
owner's 25 July explicit designation. Whether a fourth is granted is an owner decision,
not a reviewer one.  
Condition required to reopen: an explicit owner decision, as before. The case for one is
that the remaining work is eight cheap, concrete items with real subject photography, an
honest and now genuinely defended loop, and clean text contrast already in place. The
case against is that three rounds have each closed the prior list and exposed a new one
at the same depth of inspection, and that the two deciding defects this round — a truth
error named a round ago and left, and an accessibility regression introduced by the
repair itself — are process failures rather than direction failures.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — practice site live; recruiting via vetni.co.uk (adverts dated
8 July 2026 and 10 March 2026); RCVS Find-a-Vet listed.  
Current public presence: `https://donardveterinaryclinic.co.uk/` — 2017-era Divi build,
`© 2017` footer, zoom-blocking viewport, PetsApp chat/booking bubble added since the
census pass (evidenced by the 21 July build-time recheck; the widget is script-injected
and does not appear in a text fetch). Book Appointments still lists only phone and
email. VidiVet is prominently presented as the practice's out-of-hours partner.  
Primary external handoff: `mailto:info@donardveterinaryclinic.co.uk` — recipient matches
the practice's published address.  
Material claims: name "Donard Veterinary Clinic", "8 Railway Street Newcastle Co Down
BT33 0AL", "028 4372 9414", Mon/Tue/Thu/Fri 8:30am–6:30pm, Wed 8:30am–7pm, Sat 9am–1pm,
no published Sunday line, and the six named services — all confirmed verbatim against
the practice's own pages today. One material claim on the concept is **wrong by
substitution**: the out-of-hours online provision is VidiVet, not "non-emergency online
chat" via PetsApp.  
Asset permission: CC BY-SA 2.0 licence valid; on-page attribution incomplete (no licence
URI, no source link, no modification note) and below the fold at 390.  
Material change found: No — the concept's error is not a change in the business.  
Affected categories to re-review: none arising from the business; the recorded defects
are in the concept.  
Public status: Remove pending re-review — the concept is not public and must not become
public while two design gates fail.
