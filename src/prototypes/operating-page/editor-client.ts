import { OperatingPageEditor } from "./OperatingPageEditor";
import { OperatingPageStore } from "./OperatingPageStore";

export function initOperatingPageEditor(): void {
  const gate = document.querySelector<HTMLElement>("[data-owner-gate]");
  const host = document.querySelector<HTMLElement>("[data-editor-host]");
  const button = document.querySelector<HTMLButtonElement>("[data-enter-owner]");
  if (!gate || !host || !button) return;
  const store = new OperatingPageStore();

  const enter = (): void => {
    store.startSession();
    gate.hidden = true;
    host.hidden = false;
    new OperatingPageEditor(host, store).mount();
    host.querySelector<HTMLElement>(".op-owner-state")?.focus();
  };

  button.addEventListener("click", enter);
  if (store.hasSession()) enter();
}
