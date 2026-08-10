# The owner’s operating page

Full representative-prototype specification. Written 9 August 2026.

## Decision

Build this first, in its purest form.

The owner’s operating page is a very small public website and an equally small
private editing experience. It is for a business whose most useful information
changes often enough that a conventional brochure site becomes stale.

The proposition is not “a simpler CMS.” The proposition is:

> The public page and the act of keeping it true are one designed object.

The prototype must prove that an owner can change what matters from a phone in
less time than it takes to write a social post, understand exactly what the
visitor will see, recover safely from a mistake, and leave everything else
alone.

This is a representative prototype, not a product launch or pilot. It does not
show demand, commercial results or an owner’s willingness to maintain it.

## Why this exists

Mourne Made currently demonstrates how a business could look and how a visitor
could act. It does not yet demonstrate how the result stays accurate after
handover. That is a serious gap: `PRODUCT.md` requires every delivered site to
name who maintains changing information and to check hours, prices, events,
menus, forms and booking paths.

Many local businesses do not need a larger website. They need a small owned
page that reliably answers the live question:

- what is available now;
- what is happening next;
- whether the business is open or taking requests;
- what has changed this week;
- and what the visitor should do.

Social media is good at broadcasting change but poor as the only current,
business-owned answer. A traditional content system can solve ownership while
creating more upkeep than the business can sustain. This prototype tests the
space between them.

## The pure form

The public experience is one composed page, not a miniature multi-page site.
The private experience edits that same composition directly. There is no
dashboard home, page tree, plugin area, analytics theatre or generic block
library.

The owner sees the page as visitors see it. The few editable parts reveal
themselves only after the owner enters editing mode. Publishing is one explicit
act. The previous public version remains safe until that act succeeds.

The pure form has four qualities:

1. **Immediate.** A visitor gets the changing answer in the first viewport.
2. **Finite.** The owner can see every thing they are responsible for.
3. **Direct.** Editing happens on the page, in context.
4. **Forgiving.** A mistake never destroys the last good public version.

## Departure rules

This prototype must not resemble the current Mourne Made concepts merely with
editing controls added.

Do not reuse:

- `ConceptLayout`, the concept shell or existing concept navigation;
- the studio’s Antonio / Atkinson typography pairing;
- the bay-ink, sea-slate and gorse palette;
- current hero, card, filter, calendar or booking compositions;
- a before-and-after comparison as the central device;
- existing business imagery as the art direction;
- a generic admin sidebar, settings page or dashboard.

Existing concepts may supply evidence about what changes and where human
judgement belongs. They do not supply the visual answer.

The new visual direction should feel like a beautifully made physical working
surface: a prep list, chalked board, packing sheet, order rail or counter ticket
translated into a calm digital object. This is not permission to imitate one
of those objects decoratively. Its structure must come from the owner’s actual
repeated work.

## Representative subject

Use a clearly labelled, synthetic seasonal food-and-delivery business for the
first prototype. The working name and content are provisional.

This deliberately avoids rebuilding Castle Farm, Scopers or another existing
concept. Their research informs the task shape—weekly availability, a cutoff,
a route and a request—but the prototype begins with new content, identity and
composition.

The business has one weekly cycle:

1. decide what is available;
2. set the order cutoff;
3. publish the week;
4. collect requests;
5. close the list;
6. prepare the next week.

That cycle is complex enough to expose the product question and small enough
to build completely.

## The complete loop

### Owner loop

1. The owner opens a private link on their phone.
2. The current public page appears, with a quiet `Edit this week` action.
3. They mark three items available, change one quantity note, and set the
   request cutoff.
4. They preview the exact public page, including its open or closed state.
5. They publish.
6. A confirmation shows what changed, when it went live and how to undo it.
7. They copy the owned page link for a social post or message.

Target time for the prepared usability task: under two minutes without
instruction.

### Visitor loop

1. A visitor arrives from Google, a message or social post.
2. The first viewport says what this week is, whether requests remain open and
   when the list closes.
3. They choose one or more available items.
4. They give only the details required for the business to respond.
5. The page confirms that a request—not a guaranteed order—has been sent.
6. The owner receives the request in a form that follows the same weekly list.

### Failure and recovery loop

- If publishing fails, the old public version remains live and the owner’s
  changes remain locally recoverable.
- If the owner tries to close the week with unanswered requests, the system
  names that consequence without preventing the action.
- If a published fact is wrong, `Undo last publish` restores the complete prior
  version rather than asking the owner to remember each old field.
- If JavaScript fails on the public page, the latest published week and direct
  contact route remain readable and usable.
- If the editing link is opened without a valid session, no business data or
  unpublished change is exposed.

## Public page specification

The page has five parts. Their visual expression may be radical; their jobs
must remain clear.

### 1. This week

The first screen carries:

- the week or date range;
- the state: `Requests open`, `Nearly full`, `List closed` or `Back next week`;
- the cutoff in ordinary language and an absolute date/time;
- one plain sentence from the owner;
- the primary visitor action.

The state is text, not colour alone. Do not invent urgency from stock counts or
timers.

### 2. Available now

This is a finite list controlled by the owner. Each item may contain:

- name;
- short description;
- price or price note when the business publishes one;
- availability state;
- optional quantity/unit;
- optional photograph with known rights;
- dietary or collection note where relevant.

No item may imply real-time inventory unless the underlying data really is
transactional. For the representative prototype, availability is the owner’s
weekly statement.

### 3. How this week moves

A short timeline or route explains the business’s real rhythm: requests close,
packing happens, collection or delivery follows. It earns its place only if it
removes a repeated question.

### 4. Request

The visitor chooses from the current published list. The page asks for the
minimum contact and fulfilment details. It states whether this is a request,
reservation or completed order.

For the prototype, this is a request awaiting owner confirmation. Do not build
payments or claim live allocation.

### 5. Trust footer

Keep direct contact, location/area, accessibility information if supplied, the
last public update and the person responsible for the page visible. `Updated
Tuesday at 7:40pm by the business` is useful; internal workflow detail is not.

## Editing experience specification

### Entering editing mode

The prototype may stub authentication, but it must present the intended
boundary: a time-limited private link or passkey, not a public `admin` button.
The prototype must never imply that the stub is production security.

### Editing in place

- Editable areas reveal a concise affordance when editing mode starts.
- Selecting an area opens the smallest suitable control beside or over it.
- The owner never edits raw markup, block structures or page layout.
- Required fields explain why they are required.
- Dates are displayed in Europe/London and include the calendar date wherever
  relative language could become ambiguous.
- Destructive changes show the effect in the preview before publishing.

### Draft, preview and publish

There are only three states:

- **Live:** the last successful public version.
- **Draft:** the owner’s unpublished changes.
- **Preview:** the draft rendered exactly as visitors will receive it.

`Save` is automatic and local to the draft. `Publish this week` is explicit.
The confirmation names the changed fields in owner language. Do not expose
revision identifiers or deployment terminology.

### Closing and reopening

Closing the list is a first-class operation, not the deletion of every item.
The owner chooses what visitors see next:

- closed with a return date;
- closed with a notification request;
- direct contact for exceptions;
- or no promise beyond `Back next week`.

Reopening restores the last draft or starts the next week from a chosen prior
week. It never silently republishes old dates.

## Content and state model

The representative prototype should use one typed record:

```ts
type OperatingPage = {
  business: {
    name: string;
    contact: string;
    area: string;
  };
  publicState: "open" | "nearly-full" | "closed" | "between-weeks";
  period: {
    startsAt: string;
    endsAt: string;
    cutoffAt: string | null;
    returnsAt: string | null;
  };
  ownerNote: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    priceNote: string | null;
    availability: "available" | "limited" | "unavailable";
    unit: string | null;
    image: string | null;
  }>;
  fulfilment: Array<{
    label: string;
    at: string;
    note: string;
  }>;
  requestFields: Array<"name" | "email" | "phone" | "collection" | "note">;
  publishedAt: string;
  publishedBy: string;
};
```

The model is deliberately closed. Adding a new content type should require a
product decision, not be possible through an unbounded block picker.

## Visual and interaction direction

The public page should feel composed from the changing information itself.
When only three things are available, those three things should occupy the
page decisively. When the list closes, the composition should settle into a
clear closed state rather than showing a disabled shop.

Design qualities:

- bold scale with very little interface chrome;
- one saturated identity colour and one high-contrast working colour;
- large, readable state language;
- direct manipulation rather than form-heavy editing;
- physical feedback through crisp movement, alignment and state changes;
- a beautiful static frame before any animation runs;
- no decorative dashboards, generic cards or soft neutral “CMS” styling.

The editing layer should not make the public page ugly. It may temporarily
change the page’s rhythm, but it must feel authored for this object.

## Prototype architecture

Build under `/prototypes/operating-page/` and keep it `noindex`.

The first build may use:

- a local typed fixture as the last published version;
- `localStorage` or an in-memory adapter for drafts and publish history;
- a simulated request delivery inbox inside the prototype;
- a clearly labelled authentication stub;
- one public route and one private editing route or mode.

Do not build a database, general CMS, account system, multi-tenant abstraction,
payment flow or reusable theme engine before the representative loop works.

Suggested separation:

- `OperatingPageView` renders published or preview state;
- `OperatingPageEditor` owns direct editing and draft state;
- `OperatingPageStore` exposes `loadLive`, `loadDraft`, `saveDraft`, `publish`
  and `rollback`;
- the prototype adapter is replaceable without changing the experience.

## Accessibility and resilience

- The complete visitor loop and complete owner loop must work by keyboard.
- Editing affordances must expose accessible names and state.
- Focus must move deliberately when controls open or publishing completes.
- Status changes use an `aria-live` region without repeating the entire page.
- Every state must meet text contrast requirements.
- Reduced motion uses immediate, designed state changes.
- No-JS visitors receive the last published information and direct contact.
- The phone experience is the primary owner experience; test at 390px before
  adapting desktop.

## Honesty boundaries

- The subject and operating data are synthetic and labelled as such.
- The prototype must not imply stock synchronisation, confirmed orders or live
  delivery tracking.
- `Nearly full` may appear only when the owner chooses it or real capacity data
  supports it.
- A relative date is always paired with an absolute date.
- Public `last updated` reflects publication, not a draft edit.
- Prototype task completion is not evidence that a real owner can maintain the
  page; that requires a pilot.

## What the prototype must prove

### Direct verification

- A prepared owner task can be completed in under two minutes on a phone.
- The owner can identify what is live, what is draft and what will change.
- Publish, failed publish and rollback all preserve a coherent public page.
- A visitor can understand the current state and submit a request without
  consulting another channel.
- The closed state remains useful.
- The page is visually compelling in open, closed, sparse and full states.

### Later pilot evidence

Only a participating business can validate:

- whether the owner actually updates it over several cycles;
- whether its vocabulary matches the work;
- whether requests arrive with better information;
- whether maintaining this is easier than the current approach;
- and whether the business trusts the public state.

## Build sequence

1. Create four paper/static compositions: open and closed, each at phone and
   desktop. Pick the one whose state is clearest and whose identity is least
   like the existing portfolio.
2. Build the public page with synthetic data and the visitor request loop.
3. Add editing in place for the smallest weekly change.
4. Add draft, exact preview, publish failure and rollback.
5. Exercise the full owner loop at 390px.
6. Capture the open, closed, editing, failed-publish and recovered states.
7. Record what should become reusable only after the loop works.

## Stop conditions

Stop and redesign if:

- the owner must understand pages, blocks or content-management vocabulary;
- upkeep expands beyond the one repeated weekly operation;
- the public page becomes a small ecommerce catalogue;
- the editor looks like a separate generic product;
- the experience depends on invented real-time inventory;
- or the result could be reskinned for ten unrelated businesses without
  changing its interaction.

## Decision ledger

| Question | Decision | Evidence | Consequence | Owner |
| --- | --- | --- | --- | --- |
| What is being tested? | One owner-maintained weekly public page, not a general CMS. | `PRODUCT.md` requires right-sized scope and named upkeep. | No multi-page or multi-tenant work in the representative slice. | This spec |
| What is real? | Public state, visitor request, draft/preview/publish/rollback and phone editing. | These are the experience’s consequential claims. | Authentication and persistence may be stubbed but visibly so. | This spec |
| What subject is used? | A new synthetic seasonal business. | Existing concepts would anchor the art direction and confuse exploration with extension. | Existing research informs constraints only. | This spec |
| What does success mean? | The loop works and can be judged; no commercial validation is claimed. | `docs/CONTEXT.md` separates representative prototypes from pilots. | Real maintenance behaviour remains a later pilot question. | `docs/CONTEXT.md` |
| What must survive failure? | The last good public version. | Accuracy is more important than publishing speed. | Publish is atomic and rollback is first-class. | This spec |

## Definition of implemented

The representative prototype is implemented only when the owner and visitor
loops, the failed-publish recovery, the closed state, phone editing and
reduced-motion treatment all exist in the working tree. A polished public page
without the upkeep loop does not satisfy this specification.
