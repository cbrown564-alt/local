import type { ItemAvailability, OperatingPage, PublicState } from "./types";

const stateCopy: Record<PublicState, { label: string; short: string }> = {
  open: { label: "Requests open", short: "Open" },
  "nearly-full": { label: "Nearly full", short: "Owner-set" },
  closed: { label: "List closed", short: "Closed" },
  "between-weeks": { label: "Back next week", short: "Between weeks" },
};

const availabilityCopy: Record<ItemAvailability, string> = {
  available: "Available",
  limited: "Limited this week",
  unavailable: "Not on this week’s list",
};

const escapeHtml = (value: string | null | undefined): string => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const formatDate = (value: string, options: Intl.DateTimeFormatOptions): string => new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  ...options,
}).format(new Date(value));

const formatInputDate = (value: string | null): string => {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}T${pick("hour")}:${pick("minute")}`;
};

const renderOwnerWeekControls = (page: OperatingPage): string => `
  <details class="op-edit-panel" open>
    <summary>Edit this week <span>Saved locally as you type</span></summary>
    <div class="op-edit-fields">
      <label>
        <span>What visitors see</span>
        <select name="publicState" data-draft-field="publicState">
          ${(["open", "nearly-full", "closed", "between-weeks"] as PublicState[]).map((value) => `<option value="${value}"${page.publicState === value ? " selected" : ""}>${stateCopy[value].label}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>Request cutoff <small>Calendar date prevents an ambiguous “Thursday”.</small></span>
        <input type="datetime-local" name="cutoffAt" value="${escapeHtml(formatInputDate(page.period.cutoffAt))}" data-draft-field="cutoffAt" />
      </label>
      <label class="op-edit-note">
        <span>Your note</span>
        <textarea name="ownerNote" rows="3" data-draft-field="ownerNote">${escapeHtml(page.ownerNote)}</textarea>
      </label>
    </div>
  </details>`;

const renderItem = (item: OperatingPage["items"][number], index: number, ownerMode: boolean): string => {
  const selectable = item.availability !== "unavailable";
  return `
    <article class="op-item op-item-${index + 1}" data-item-id="${escapeHtml(item.id)}" data-availability="${item.availability}">
      ${item.image ? `<figure class="op-item-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)} on a cobalt enamel tray" width="1200" height="1200" loading="${index === 0 ? "eager" : "lazy"}" /></figure>` : ""}
      <div class="op-item-copy">
        <p class="op-availability"><span aria-hidden="true"></span>${availabilityCopy[item.availability]}</p>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="op-item-facts">
          ${item.priceNote ? `<strong>${escapeHtml(item.priceNote)}</strong>` : ""}
          ${item.unit ? `<span>${escapeHtml(item.unit)}</span>` : ""}
        </div>
        ${ownerMode ? `
          <div class="op-item-editor" aria-label="Edit ${escapeHtml(item.name)}">
            <label><span>Availability</span><select data-item-field="availability" data-item-id="${escapeHtml(item.id)}">
              ${(["available", "limited", "unavailable"] as ItemAvailability[]).map((value) => `<option value="${value}"${item.availability === value ? " selected" : ""}>${availabilityCopy[value]}</option>`).join("")}
            </select></label>
            <label><span>Quantity note</span><input type="text" value="${escapeHtml(item.unit)}" data-item-field="unit" data-item-id="${escapeHtml(item.id)}" placeholder="e.g. 6 trays left" /></label>
          </div>` : selectable ? `
          <label class="op-pick">
            <input type="checkbox" name="items" value="${escapeHtml(item.id)}" />
            <span>Add to my request</span>
          </label>` : `<p class="op-unavailable-note">Shown for this week’s record, but it cannot be requested.</p>`}
      </div>
    </article>`;
};

const renderRequestFields = (page: OperatingPage): string => {
  const has = (field: OperatingPage["requestFields"][number]) => page.requestFields.includes(field);
  return `
    ${has("name") ? `<label><span>Your name</span><input name="name" autocomplete="name" required /></label>` : ""}
    ${has("email") ? `<label><span>Email</span><input type="email" name="email" autocomplete="email" required /></label>` : ""}
    ${has("phone") ? `<label><span>Phone or email</span><input name="phone" autocomplete="tel" required /></label>` : ""}
    ${has("collection") ? `<label><span>How would you like it?</span><select name="collection" required><option value="">Choose one</option><option>Friday collection</option><option>Saturday delivery</option></select></label>` : ""}
    ${has("note") ? `<label class="op-request-note"><span>Anything we should know? <small>Optional</small></span><textarea name="note" rows="3"></textarea></label>` : ""}`;
};

export function renderOperatingPage(page: OperatingPage, ownerMode = false): string {
  const state = stateCopy[page.publicState];
  const closed = page.publicState === "closed" || page.publicState === "between-weeks";
  const period = `${formatDate(page.period.startsAt, { day: "numeric" })}–${formatDate(page.period.endsAt, { day: "numeric", month: "long", year: "numeric" })}`;
  const cutoff = page.period.cutoffAt
    ? `${formatDate(page.period.cutoffAt, { weekday: "long" })}, ${formatDate(page.period.cutoffAt, { day: "numeric", month: "long", year: "numeric" })} at ${formatDate(page.period.cutoffAt, { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "")}`
    : "No cutoff published";
  const returnDate = page.period.returnsAt
    ? formatDate(page.period.returnsAt, { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "next week";
  const published = formatDate(page.publishedAt, { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
  const items = page.items.map((item, index) => renderItem(item, index, ownerMode)).join("");

  return `
    <div class="op-page" data-public-state="${page.publicState}" data-owner-mode="${ownerMode}">
      <header class="op-masthead">
        <a class="op-wordmark" href="#top" aria-label="${escapeHtml(page.business.name)} home"><span>Salt</span><b>&amp;</b><span>Stem</span></a>
        <p><strong>Synthetic business</strong><span>Generated serving imagery</span></p>
      </header>

      <section class="op-hero" id="top" aria-labelledby="op-title">
        <div class="op-hero-state">
          <p class="op-week">This week · ${escapeHtml(period)}</p>
          <h1 id="op-title">${escapeHtml(state.label)}</h1>
          <p class="op-cutoff">${closed ? `Next list: ${escapeHtml(returnDate)}` : `Requests close ${escapeHtml(cutoff)}`}</p>
        </div>
        <div class="op-hero-note">
          <p>${escapeHtml(page.ownerNote)}</p>
          ${closed
            ? `<a class="op-primary op-primary-light" href="mailto:${escapeHtml(page.business.contact)}?subject=Salt%20%26%20Stem%20next%20list">Ask about the next list</a>`
            : `<a class="op-primary" href="#request">Choose this week’s food <span aria-hidden="true">↓</span></a>`}
        </div>
        <p class="op-state-ticket"><span>${escapeHtml(state.short)}</span><b>${closed ? "Next list soon" : "Owner updated"}</b></p>
      </section>

      ${ownerMode ? renderOwnerWeekControls(page) : ""}

      <section class="op-available" aria-labelledby="available-title">
        <div class="op-section-heading">
          <h2 id="available-title">${closed ? "What was on this list" : "Available now"}</h2>
          <p>${closed ? "Kept here so the week closes clearly, without pretending requests are still open." : "Availability is Mara’s weekly statement, not live stock tracking."}</p>
        </div>
        <div class="op-item-list">${items}</div>
      </section>

      <section class="op-route" aria-labelledby="route-title">
        <div class="op-route-intro"><h2 id="route-title">How this week moves</h2><p>One list, then the kitchen gets on with the work.</p></div>
        <ol>
          ${page.fulfilment.map((stop) => `<li><span>${escapeHtml(stop.label)}</span><strong>${escapeHtml(stop.at)}</strong><p>${escapeHtml(stop.note)}</p></li>`).join("")}
        </ol>
      </section>

      <section class="op-request" id="request" aria-labelledby="request-title">
        ${closed ? `
          <div class="op-closed-message">
            <p class="op-closed-stamp">List closed</p>
            <h2 id="request-title">Nothing disappears. Nothing looks orderable.</h2>
            <p>The next Salt &amp; Stem list is due ${escapeHtml(returnDate)}. This prototype does not send notifications, but the direct contact route remains visible.</p>
            <a class="op-primary" href="mailto:${escapeHtml(page.business.contact)}?subject=Salt%20%26%20Stem%20next%20list">Email about the next list</a>
          </div>` : `
          <div class="op-request-intro">
            <p>Request, then confirmation</p>
            <h2 id="request-title">Tell us what you’d like.</h2>
            <p>This does not reserve stock or take payment. Salt &amp; Stem would reply before anything is confirmed.</p>
          </div>
          <form class="op-request-form" data-request-form action="mailto:${escapeHtml(page.business.contact)}" method="post">
            <fieldset><legend>Your list</legend><div data-request-items></div><p data-item-reminder hidden>Please choose at least one item.</p></fieldset>
            <div class="op-request-fields">${renderRequestFields(page)}</div>
            <button class="op-submit" type="submit">Send request <span aria-hidden="true">→</span></button>
            <p class="op-form-small">Prototype only: this goes to a simulated inbox, not a real business.</p>
          </form>
          <div class="op-request-success" data-request-success hidden tabindex="-1">
            <p>Request sent to the simulated inbox.</p>
            <h2>It still needs a reply.</h2>
            <p>Nothing has been charged, reserved or confirmed. In the real service, the owner would respond using the details you provided.</p>
          </div>`}
      </section>

      <footer class="op-footer">
        <a class="op-wordmark op-wordmark-footer" href="#top"><span>Salt</span><b>&amp;</b><span>Stem</span></a>
        <div><p>${escapeHtml(page.business.area)}</p><a href="mailto:${escapeHtml(page.business.contact)}">${escapeHtml(page.business.contact)}</a></div>
        <div><p>Updated ${escapeHtml(published)} by ${escapeHtml(page.publishedBy)}.</p><p>Synthetic subject and operating data. Generated serving imagery.</p></div>
      </footer>
    </div>`;
}

export function describeChanges(before: OperatingPage, after: OperatingPage): string[] {
  const changes: string[] = [];
  if (before.publicState !== after.publicState) changes.push(`Public state: ${stateCopy[before.publicState].label} → ${stateCopy[after.publicState].label}`);
  if (before.period.cutoffAt !== after.period.cutoffAt) changes.push("Request cutoff");
  if (before.ownerNote !== after.ownerNote) changes.push("Your note");
  for (const item of after.items) {
    const oldItem = before.items.find((candidate) => candidate.id === item.id);
    if (!oldItem) continue;
    if (oldItem.availability !== item.availability) changes.push(`${item.name}: availability`);
    if (oldItem.unit !== item.unit) changes.push(`${item.name}: quantity note`);
  }
  return changes.length ? changes : ["Publication time only"];
}
