import { OperatingPageStore } from "./OperatingPageStore";
import { describeChanges, renderOperatingPage } from "./OperatingPageView";
import type { OperatingPage, SimulatedRequest } from "./types";

type EditorMode = "live" | "draft" | "preview";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const escapeHtml = (value: string): string => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const formatInboxDate = (value: string): string => new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
}).format(new Date(value));

export class OperatingPageEditor {
  private store: OperatingPageStore;
  private host: HTMLElement;
  private live: OperatingPage;
  private draft: OperatingPage;
  private mode: EditorMode = "live";
  private failNextPublish = false;
  private message = "Live page loaded.";
  private error = "";

  constructor(host: HTMLElement, store = new OperatingPageStore()) {
    this.host = host;
    this.store = store;
    this.live = store.loadLive();
    this.draft = store.loadDraft();
  }

  mount(): void {
    this.render();
  }

  private changed(): string[] {
    return describeChanges(this.live, this.draft);
  }

  private pendingRequests(): SimulatedRequest[] {
    return this.store.loadInbox().filter((request) => !request.answered);
  }

  private render(): void {
    const page = this.mode === "live" ? this.live : this.draft;
    const ownerMode = this.mode === "draft";
    const pending = this.pendingRequests();
    this.host.innerHTML = `
      <div class="op-owner-shell" data-editor-mode="${this.mode}">
        <header class="op-owner-bar">
          <div class="op-owner-state" tabindex="-1"><span>${this.mode === "live" ? "Live" : this.mode === "draft" ? "Draft" : "Exact preview"}</span><p>${escapeHtml(this.message)}</p></div>
          <div class="op-owner-actions">
            <button type="button" class="op-owner-button op-owner-inbox" data-open-inbox>Inbox <span>${pending.length}</span></button>
            ${this.mode === "live" ? `<button type="button" class="op-owner-button op-owner-primary" data-start-edit>Edit this week</button>` : ""}
            ${this.mode === "draft" ? `<button type="button" class="op-owner-button" data-preview>Preview</button>` : ""}
            ${this.mode === "preview" ? `<button type="button" class="op-owner-button" data-return-edit>Keep editing</button>` : ""}
            ${this.mode !== "live" ? `<button type="button" class="op-owner-button op-owner-primary" data-publish>Publish this week</button>` : ""}
            <details class="op-owner-more"><summary aria-label="Prototype controls">•••</summary><label><input type="checkbox" data-fail-publish ${this.failNextPublish ? "checked" : ""} /> Make the next publish fail</label><p>Prototype control for checking recovery.</p></details>
          </div>
        </header>
        <div class="op-owner-alert" role="alert" ${this.error ? "" : "hidden"} tabindex="-1"><strong>Nothing went live.</strong><span>${escapeHtml(this.error)}</span><button type="button" data-retry>Return to draft</button></div>
        <div class="op-owner-page" data-owner-page tabindex="-1">${renderOperatingPage(page, ownerMode)}</div>
        <div class="op-owner-live-region" aria-live="polite" aria-atomic="true">${escapeHtml(this.message)}</div>
      </div>
      <dialog class="op-owner-dialog" data-close-warning aria-labelledby="close-warning-title">
        <div><p>Before this list closes</p><h2 id="close-warning-title">${pending.length} request${pending.length === 1 ? " is" : "s are"} still waiting for a reply.</h2><p>Closing the public list will not answer or remove them. You can still publish the closed state.</p><div class="op-dialog-actions"><button type="button" data-cancel-close>Go to inbox</button><button type="button" data-confirm-close>Publish anyway</button></div></div>
      </dialog>
      <dialog class="op-owner-dialog op-publish-dialog" data-publish-dialog aria-labelledby="publish-title"></dialog>
      <dialog class="op-owner-dialog op-inbox-dialog" data-inbox-dialog aria-labelledby="inbox-title"></dialog>`;
    this.bind();
  }

  private bind(): void {
    this.host.querySelector<HTMLButtonElement>("[data-start-edit]")?.addEventListener("click", () => {
      this.mode = "draft";
      this.message = "Draft is local. The public page has not changed.";
      this.render();
      this.host.querySelector<HTMLElement>("[data-draft-field]")?.focus();
    });
    this.host.querySelector<HTMLButtonElement>("[data-preview]")?.addEventListener("click", () => {
      this.mode = "preview";
      this.message = `${this.changed().length} change${this.changed().length === 1 ? "" : "s"} in exact preview.`;
      this.render();
      this.host.querySelector<HTMLElement>("[data-owner-page]")?.focus();
    });
    this.host.querySelector<HTMLButtonElement>("[data-return-edit]")?.addEventListener("click", () => {
      this.mode = "draft";
      this.message = "Back in draft. Saved locally.";
      this.render();
    });
    this.host.querySelector<HTMLInputElement>("[data-fail-publish]")?.addEventListener("change", (event) => {
      this.failNextPublish = (event.currentTarget as HTMLInputElement).checked;
    });
    this.host.querySelector<HTMLButtonElement>("[data-publish]")?.addEventListener("click", () => this.requestPublish());
    this.host.querySelector<HTMLButtonElement>("[data-retry]")?.addEventListener("click", () => {
      this.error = "";
      this.mode = "draft";
      this.message = "Draft recovered locally. Ready to try again.";
      this.render();
    });
    this.host.querySelector<HTMLButtonElement>("[data-open-inbox]")?.addEventListener("click", () => this.openInbox());

    this.host.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[data-draft-field]").forEach((input) => {
      input.addEventListener("input", () => {
        const field = input.dataset.draftField;
        if (field === "publicState") this.draft.publicState = input.value as OperatingPage["publicState"];
        if (field === "ownerNote") this.draft.ownerNote = input.value;
        if (field === "cutoffAt") this.draft.period.cutoffAt = input.value ? new Date(input.value).toISOString() : null;
        this.store.saveDraft(this.draft);
        this.message = "Draft saved locally. Not published.";
        const liveRegion = this.host.querySelector<HTMLElement>(".op-owner-live-region");
        if (liveRegion) liveRegion.textContent = this.message;
      });
    });

    this.host.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-item-field]").forEach((input) => {
      const saveItemChange = (): void => {
        const item = this.draft.items.find((candidate) => candidate.id === input.dataset.itemId);
        if (!item) return;
        if (input.dataset.itemField === "availability") item.availability = input.value as typeof item.availability;
        if (input.dataset.itemField === "unit") item.unit = input.value || null;
        this.store.saveDraft(this.draft);
        this.message = `${item.name} saved to draft.`;
        const liveRegion = this.host.querySelector<HTMLElement>(".op-owner-live-region");
        if (liveRegion) liveRegion.textContent = this.message;
      };
      input.addEventListener("change", saveItemChange);
      if (input instanceof HTMLInputElement) input.addEventListener("input", saveItemChange);
    });
  }

  private requestPublish(): void {
    const pending = this.pendingRequests();
    if ((this.draft.publicState === "closed" || this.draft.publicState === "between-weeks") && pending.length) {
      const dialog = this.host.querySelector<HTMLDialogElement>("[data-close-warning]");
      dialog?.showModal();
      this.host.querySelector<HTMLButtonElement>("[data-cancel-close]")?.addEventListener("click", () => {
        dialog?.close();
        this.openInbox();
      }, { once: true });
      this.host.querySelector<HTMLButtonElement>("[data-confirm-close]")?.addEventListener("click", () => {
        dialog?.close();
        void this.publish();
      }, { once: true });
      return;
    }
    void this.publish();
  }

  private async publish(): Promise<void> {
    const button = this.host.querySelector<HTMLButtonElement>("[data-publish]");
    if (button) {
      button.disabled = true;
      button.textContent = "Publishing…";
    }
    const changes = this.changed();
    const shouldFail = this.failNextPublish;
    this.failNextPublish = false;
    try {
      const result = await this.store.publish(this.draft, shouldFail);
      this.live = result.live;
      this.draft = clone(result.live);
      this.mode = "live";
      this.error = "";
      this.message = "Published. The complete previous week can be restored.";
      this.render();
      this.openPublishConfirmation(changes);
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Publishing failed before the public page changed.";
      this.message = "Publish failed. Live stayed unchanged and the draft was kept.";
      this.render();
      this.host.querySelector<HTMLElement>(".op-owner-alert")?.focus();
    }
  }

  private openPublishConfirmation(changes: string[]): void {
    const dialog = this.host.querySelector<HTMLDialogElement>("[data-publish-dialog]");
    if (!dialog) return;
    const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(this.live.publishedAt));
    dialog.innerHTML = `<div><p>Now live</p><h2 id="publish-title">This week was published.</h2><p>${escapeHtml(time)}</p><ul>${changes.map((change) => `<li>${escapeHtml(change)}</li>`).join("")}</ul><div class="op-copy-row"><input value="${window.location.origin}/prototypes/operating-page/" readonly aria-label="Owned page link" /><button type="button" data-copy-link>Copy link</button></div><div class="op-dialog-actions"><button type="button" data-undo-publish>Undo last publish</button><button type="button" data-done-publish>Done</button></div></div>`;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("[data-copy-link]")?.addEventListener("click", async (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/prototypes/operating-page/`);
        target.textContent = "Link copied";
      } catch {
        dialog.querySelector<HTMLInputElement>(".op-copy-row input")?.select();
        target.textContent = "Select and copy";
      }
    });
    dialog.querySelector<HTMLButtonElement>("[data-undo-publish]")?.addEventListener("click", () => {
      const restored = this.store.rollback();
      if (!restored) return;
      dialog.close();
      this.live = restored;
      this.draft = clone(restored);
      this.mode = "live";
      this.message = "Previous public version restored in full.";
      this.render();
      this.host.querySelector<HTMLElement>(".op-owner-state")?.focus();
    });
    dialog.querySelector<HTMLButtonElement>("[data-done-publish]")?.addEventListener("click", () => dialog.close());
  }

  private openInbox(): void {
    const dialog = this.host.querySelector<HTMLDialogElement>("[data-inbox-dialog]");
    if (!dialog) return;
    const inbox = this.store.loadInbox();
    dialog.innerHTML = `<div><p>Simulated delivery inbox</p><h2 id="inbox-title">Requests follow this week’s list.</h2><p>No request shown here is a confirmed order.</p><div class="op-inbox-list">${inbox.map((request) => `<article data-inbox-request="${escapeHtml(request.id)}"><div><strong>${escapeHtml(request.name)}</strong><span>${escapeHtml(formatInboxDate(request.createdAt))}</span></div><p>${escapeHtml(request.itemIds.map((id) => this.live.items.find((item) => item.id === id)?.name ?? id).join(" · "))}</p><p>${escapeHtml(request.collection)} · ${escapeHtml(request.contact)}</p>${request.note ? `<small>${escapeHtml(request.note)}</small>` : ""}${request.answered ? `<b>Answered</b>` : `<button type="button" data-mark-answered="${escapeHtml(request.id)}">Mark answered</button>`}</article>`).join("")}</div><button type="button" class="op-dialog-close" data-close-inbox>Close inbox</button></div>`;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("[data-close-inbox]")?.addEventListener("click", () => dialog.close());
    dialog.querySelectorAll<HTMLButtonElement>("[data-mark-answered]").forEach((button) => button.addEventListener("click", () => {
      this.store.markRequestAnswered(button.dataset.markAnswered ?? "");
      dialog.close();
      this.message = "Request marked answered.";
      this.render();
      this.openInbox();
    }));
  }
}
