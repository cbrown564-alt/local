import { OperatingPageStore } from "./OperatingPageStore";
import { renderOperatingPage } from "./OperatingPageView";
import type { SimulatedRequest } from "./types";

function bindRequestLoop(root: HTMLElement, store: OperatingPageStore): void {
  const form = root.querySelector<HTMLFormElement>("[data-request-form]");
  if (!form) return;

  const itemInputs = Array.from(root.querySelectorAll<HTMLInputElement>('.op-item input[name="items"]'));
  const summary = form.querySelector<HTMLElement>("[data-request-items]");
  const reminder = form.querySelector<HTMLElement>("[data-item-reminder]");

  const updateSummary = (): void => {
    const selected = itemInputs.filter((input) => input.checked);
    if (summary) {
      summary.innerHTML = selected.length
        ? selected.map((input) => {
            const title = input.closest(".op-item")?.querySelector("h3")?.textContent ?? input.value;
            return `<span>${title}</span>`;
          }).join("")
        : "<span>Choose from the list above</span>";
    }
    if (reminder) reminder.hidden = true;
  };

  itemInputs.forEach((input) => input.addEventListener("change", updateSummary));
  updateSummary();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = itemInputs.filter((input) => input.checked);
    if (!selected.length) {
      if (reminder) reminder.hidden = false;
      itemInputs[0]?.focus();
      return;
    }

    const fields = new FormData(form);
    const request: SimulatedRequest = {
      id: `request-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(fields.get("name") ?? "Visitor"),
      contact: String(fields.get("phone") ?? fields.get("email") ?? ""),
      collection: String(fields.get("collection") ?? "Not supplied"),
      note: String(fields.get("note") ?? ""),
      itemIds: selected.map((input) => input.value),
      answered: false,
    };
    store.saveRequest(request);
    form.hidden = true;
    const success = root.querySelector<HTMLElement>("[data-request-success]");
    if (success) {
      success.hidden = false;
      success.focus();
    }
  });
}

export function initPublicOperatingPage(): void {
  const root = document.querySelector<HTMLElement>("[data-operating-root]");
  if (!root) return;
  const store = new OperatingPageStore();
  root.innerHTML = renderOperatingPage(store.loadLive());
  bindRequestLoop(root, store);
}
