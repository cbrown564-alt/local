/** Shared behaviour for the Donard preview forms: per-step validation, an
 *  in-place confirmation, and "make another request". Nothing is sent —
 *  `confirm` only builds the thank-you text from what was entered. */
export function wireForm(
  form: HTMLFormElement,
  confirm: (data: FormData) => { title: string; copy: string },
) {
  const body = form.querySelector<HTMLElement>("[data-dv-body]")!;
  const done = form.querySelector<HTMLElement>("[data-dv-done]")!;
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>(".dv-field"));

  const check = (step: HTMLFieldSetElement) => {
    const ok = step.querySelector(":invalid") === null;
    step.toggleAttribute("data-invalid", !ok);
    const message = step.querySelector<HTMLElement>("[data-dv-error]");
    if (message) message.hidden = ok;
    return ok;
  };

  // Once a step has been flagged, clear it as soon as it's put right.
  for (const step of steps) {
    const recheck = () => step.hasAttribute("data-invalid") && check(step);
    step.addEventListener("input", recheck);
    step.addEventListener("change", recheck);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const allOk = steps.map(check).every(Boolean);
    if (!allOk) {
      // Fieldsets match :invalid too, but can't take focus.
      form.querySelector<HTMLElement>(":is(input, select, textarea):invalid")?.focus();
      return;
    }
    const { title, copy } = confirm(new FormData(form));
    done.querySelector("[data-dv-done-title]")!.textContent = title;
    done.querySelector("[data-dv-done-copy]")!.textContent = copy;
    body.hidden = true;
    done.hidden = false;
    done.focus();
  });

  form.querySelector("[data-dv-again]")?.addEventListener("click", () => {
    form.reset();
    for (const step of steps) {
      step.removeAttribute("data-invalid");
      const message = step.querySelector<HTMLElement>("[data-dv-error]");
      if (message) message.hidden = true;
    }
    done.hidden = true;
    body.hidden = false;
    form.querySelector<HTMLElement>("input, select, textarea")?.focus();
  });
}

export const firstName = (name: FormDataEntryValue | null) =>
  String(name ?? "").trim().split(/\s+/)[0];
