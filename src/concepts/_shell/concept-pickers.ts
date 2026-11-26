/* Accessible, brand-themed custom form pickers for Mourne Made concepts.
   Progressively enhances <select>, <input type="date">, and <input type="number">
   while keeping native controls in the DOM for FormData, validation, and scripts. */

const CHEVRON_SVG = `<svg class="mm-cp-icon mm-cp-icon--chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHECK_SVG = `<svg class="mm-cp-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CAL_SVG = `<svg class="mm-cp-icon mm-cp-icon--cal" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3.2" width="12" height="10.8" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M5 1.8v2.6M11 1.8v2.6M2 6.5h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`;
const PREV_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5L5.5 8 10 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const NEXT_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_MON = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

let uid = 0;
const nextId = (prefix: string) => `${prefix}-${++uid}`;
const supportsPopover = typeof HTMLElement !== "undefined" && Object.hasOwn(HTMLElement.prototype, "popover");

type ActiveController = {
  close: () => void;
  reposition: () => void;
};
let activeCtrl: ActiveController | null = null;

function closeActive() {
  if (activeCtrl) {
    const fn = activeCtrl.close;
    activeCtrl = null;
    fn();
  }
}

function showPopover(el: HTMLElement) {
  if (supportsPopover) {
    try {
      el.showPopover();
    } catch {
      el.classList.add("is-open");
    }
  } else {
    el.classList.add("is-open");
  }
}

function hidePopover(el: HTMLElement) {
  if (supportsPopover) {
    try {
      el.hidePopover();
    } catch {
      el.classList.remove("is-open");
    }
  } else {
    el.classList.remove("is-open");
  }
}

function positionPopover(trigger: HTMLElement, pop: HTMLElement, matchWidth: boolean) {
  const rect = trigger.getBoundingClientRect();
  const gap = 6;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (matchWidth) {
    pop.style.width = `${Math.round(rect.width)}px`;
  }

  // Measure panel height after it is rendered in top layer
  const popRect = pop.getBoundingClientRect();
  const popH = popRect.height || 260;
  const popW = popRect.width || rect.width;

  const spaceBelow = vh - rect.bottom - gap;
  const spaceAbove = rect.top - gap;
  const openTop = spaceBelow < popH && spaceAbove > spaceBelow;

  const top = openTop
    ? Math.max(8, rect.top - popH - gap)
    : Math.min(vh - popH - 8, rect.bottom + gap);
  const left = Math.max(12, Math.min(rect.left, vw - popW - 12));

  pop.dataset.placement = openTop ? "top" : "bottom";
  pop.style.top = `${Math.round(top)}px`;
  pop.style.left = `${Math.round(left)}px`;
}

function parseIsoDate(str: string | null | undefined): Date | null {
  if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatUkDate(str: string): string {
  const d = parseIsoDate(str);
  if (!d) return "";
  return `${SHORT_DAYS[d.getDay()]} ${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function enhanceSelect(select: HTMLSelectElement) {
  if (select.dataset.mmEnhanced) return;
  select.dataset.mmEnhanced = "1";

  const listId = nextId("mm-listbox");
  const wrap = document.createElement("span");
  wrap.className = "mm-cp-wrap";
  select.parentNode?.insertBefore(wrap, select);
  wrap.appendChild(select);
  select.classList.add("mm-visually-hidden");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "mm-cp-trigger mm-cp-select-trigger";
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", listId);

  const labelEl = select.closest("label");
  const labelText = labelEl?.querySelector("span")?.textContent?.trim();
  if (labelText) trigger.setAttribute("aria-label", labelText);

  const valueSpan = document.createElement("span");
  valueSpan.className = "mm-cp-value";
  trigger.appendChild(valueSpan);
  trigger.insertAdjacentHTML("beforeend", CHEVRON_SVG);
  wrap.appendChild(trigger);

  const pop = document.createElement("div");
  pop.className = "mm-cp-popover";
  if (supportsPopover) pop.setAttribute("popover", "manual");

  const listbox = document.createElement("ul");
  listbox.className = "mm-cp-listbox";
  listbox.id = listId;
  listbox.setAttribute("role", "listbox");
  pop.appendChild(listbox);
  document.body.appendChild(pop);

  let isOpen = false;
  let activeIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;

  const optionEls: HTMLLIElement[] = [];

  const syncFromSelect = () => {
    const idx = select.selectedIndex >= 0 ? select.selectedIndex : 0;
    const opt = select.options[idx];
    valueSpan.textContent = opt ? opt.textContent?.trim() || opt.value : "";
    optionEls.forEach((li, i) => {
      li.setAttribute("aria-selected", String(i === idx));
    });
    activeIndex = idx;
  };

  Array.from(select.options).forEach((opt, idx) => {
    const li = document.createElement("li");
    li.className = "mm-cp-option";
    li.setAttribute("role", "option");
    li.id = nextId("mm-opt");
    li.dataset.index = String(idx);
    const text = document.createElement("span");
    text.textContent = opt.textContent?.trim() || opt.value;
    li.appendChild(text);
    li.insertAdjacentHTML("beforeend", CHECK_SVG);
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      choose(idx);
    });
    listbox.appendChild(li);
    optionEls.push(li);
  });

  syncFromSelect();

  const setActive = (idx: number) => {
    const clamped = Math.max(0, Math.min(optionEls.length - 1, idx));
    activeIndex = clamped;
    optionEls.forEach((li, i) => li.classList.toggle("is-active", i === clamped));
    const el = optionEls[clamped];
    if (el) {
      trigger.setAttribute("aria-activedescendant", el.id);
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (top < listbox.scrollTop) {
        listbox.scrollTop = top;
      } else if (bottom > listbox.scrollTop + listbox.clientHeight) {
        listbox.scrollTop = bottom - listbox.clientHeight;
      }
    }
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    hidePopover(pop);
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-activedescendant");
    if (activeCtrl?.close === close) activeCtrl = null;
  };

  const reposition = () => {
    if (!isOpen) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      close();
      return;
    }
    positionPopover(trigger, pop, true);
  };

  const open = () => {
    if (isOpen) return;
    closeActive();
    syncFromSelect();
    isOpen = true;
    showPopover(pop);
    positionPopover(trigger, pop, true);
    trigger.setAttribute("aria-expanded", "true");
    setActive(select.selectedIndex >= 0 ? select.selectedIndex : 0);
    activeCtrl = { close, reposition };
  };

  const choose = (idx: number) => {
    if (idx >= 0 && idx < select.options.length) {
      select.selectedIndex = idx;
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncFromSelect();
    }
    close();
    trigger.focus();
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) close();
    else open();
  });

  trigger.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) open();
      else setActive(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) open();
      else setActive(activeIndex - 1);
    } else if (e.key === "Home" && isOpen) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && isOpen) {
      e.preventDefault();
      setActive(optionEls.length - 1);
    } else if ((e.key === "Enter" || e.key === " ") && isOpen) {
      e.preventDefault();
      choose(activeIndex);
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      close();
    } else if (e.key === "Tab" && isOpen) {
      close();
    }
  });

  // Keep synced when external concept scripts update select.value
  select.addEventListener("change", syncFromSelect);
  const valDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
  if (valDesc?.get && valDesc?.set) {
    Object.defineProperty(select, "value", {
      configurable: true,
      get() {
        return valDesc.get!.call(this);
      },
      set(v: string) {
        valDesc.set!.call(this, v);
        syncFromSelect();
      },
    });
  }
}

function enhanceDateInput(input: HTMLInputElement) {
  if (input.dataset.mmEnhanced) return;
  input.dataset.mmEnhanced = "1";

  const dialogId = nextId("mm-cal");
  const wrap = document.createElement("span");
  wrap.className = "mm-cp-wrap";
  input.parentNode?.insertBefore(wrap, input);
  wrap.appendChild(input);
  input.classList.add("mm-visually-hidden");
  input.tabIndex = -1;
  input.setAttribute("aria-hidden", "true");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "mm-cp-trigger mm-cp-date-trigger";
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", dialogId);

  const labelText = input.closest("label")?.querySelector("span")?.textContent?.trim();
  if (labelText) trigger.setAttribute("aria-label", labelText);

  const valueSpan = document.createElement("span");
  valueSpan.className = "mm-cp-value";
  trigger.appendChild(valueSpan);
  trigger.insertAdjacentHTML("beforeend", CAL_SVG);
  wrap.appendChild(trigger);

  const pop = document.createElement("div");
  pop.className = "mm-cp-popover mm-cp-calendar";
  pop.id = dialogId;
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", labelText ? `Choose ${labelText}` : "Choose date");
  if (supportsPopover) pop.setAttribute("popover", "manual");
  document.body.appendChild(pop);

  let isOpen = false;
  let viewDate = parseIsoDate(input.value) || parseIsoDate(input.min) || new Date();

  const syncDisplay = () => {
    const formatted = formatUkDate(input.value);
    if (formatted) {
      valueSpan.textContent = formatted;
      valueSpan.classList.remove("is-placeholder");
    } else {
      valueSpan.textContent = "Select date";
      valueSpan.classList.add("is-placeholder");
    }
  };
  syncDisplay();

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    hidePopover(pop);
    trigger.setAttribute("aria-expanded", "false");
    if (activeCtrl?.close === close) activeCtrl = null;
  };

  const reposition = () => {
    if (!isOpen) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      close();
      return;
    }
    positionPopover(trigger, pop, false);
  };

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7; // Mon=0 .. Sun=6
    const todayIso = toIsoDate(new Date());
    const minIso = input.min || "";
    const maxIso = input.max || "";
    const selectedIso = input.value || "";

    pop.innerHTML = "";

    const head = document.createElement("div");
    head.className = "mm-cp-cal-head";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "mm-cp-cal-nav";
    prevBtn.setAttribute("aria-label", "Previous month");
    prevBtn.innerHTML = PREV_SVG;
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      viewDate = new Date(year, month - 1, 1);
      renderCalendar();
    });

    const title = document.createElement("span");
    title.className = "mm-cp-cal-month";
    title.textContent = `${MONTHS[month]} ${year}`;

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "mm-cp-cal-nav";
    nextBtn.setAttribute("aria-label", "Next month");
    nextBtn.innerHTML = NEXT_SVG;
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      viewDate = new Date(year, month + 1, 1);
      renderCalendar();
    });

    head.append(prevBtn, title, nextBtn);
    pop.appendChild(head);

    const dow = document.createElement("div");
    dow.className = "mm-cp-cal-dow";
    WEEKDAYS_MON.forEach((d) => {
      const s = document.createElement("span");
      s.textContent = d;
      dow.appendChild(s);
    });
    pop.appendChild(dow);

    const grid = document.createElement("div");
    grid.className = "mm-cp-cal-grid";
    for (let i = 0; i < startOffset; i++) {
      const pad = document.createElement("span");
      pad.className = "mm-cp-day-pad";
      grid.appendChild(pad);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isoStr = toIsoDate(d);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mm-cp-day";
      btn.textContent = String(day);
      btn.dataset.iso = isoStr;
      if (isoStr === todayIso) btn.classList.add("is-today");
      if (isoStr === selectedIso) {
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
      }
      if ((minIso && isoStr < minIso) || (maxIso && isoStr > maxIso)) {
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = isoStr;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        syncDisplay();
        close();
        trigger.focus();
      });
      grid.appendChild(btn);
    }
    pop.appendChild(grid);

    const foot = document.createElement("div");
    foot.className = "mm-cp-cal-foot";

    const todayBtn = document.createElement("button");
    todayBtn.type = "button";
    todayBtn.className = "mm-cp-cal-action";
    todayBtn.textContent = "Today";
    todayBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetIso = minIso && todayIso < minIso ? minIso : todayIso;
      input.value = targetIso;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      syncDisplay();
      close();
      trigger.focus();
    });

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "mm-cp-cal-action mm-cp-cal-action--muted";
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      syncDisplay();
      close();
      trigger.focus();
    });

    foot.append(todayBtn, clearBtn);
    pop.appendChild(foot);
  };

  const open = () => {
    if (isOpen) return;
    closeActive();
    viewDate = parseIsoDate(input.value) || parseIsoDate(input.min) || new Date();
    renderCalendar();
    isOpen = true;
    showPopover(pop);
    positionPopover(trigger, pop, false);
    trigger.setAttribute("aria-expanded", "true");
    activeCtrl = { close, reposition };
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) close();
    else open();
  });

  trigger.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      if (!isOpen) {
        e.preventDefault();
        open();
      }
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      close();
    }
  });

  pop.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      trigger.focus();
    }
  });

  input.addEventListener("change", syncDisplay);
  const valDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  if (valDesc?.get && valDesc?.set) {
    Object.defineProperty(input, "value", {
      configurable: true,
      get() {
        return valDesc.get!.call(this);
      },
      set(v: string) {
        valDesc.set!.call(this, v);
        syncDisplay();
      },
    });
  }
}

function enhanceNumberInput(input: HTMLInputElement) {
  if (input.dataset.mmEnhanced) return;
  input.dataset.mmEnhanced = "1";

  const min = input.min ? Number(input.min) : 1;
  const max = input.max ? Number(input.max) : 99;
  const step = input.step ? Number(input.step) : 1;

  const wrap = document.createElement("span");
  wrap.className = "mm-cp-stepper";
  input.parentNode?.insertBefore(wrap, input);
  wrap.appendChild(input);
  input.classList.add("mm-visually-hidden");
  input.tabIndex = -1;
  input.setAttribute("aria-hidden", "true");

  const decBtn = document.createElement("button");
  decBtn.type = "button";
  decBtn.className = "mm-cp-step-btn";
  decBtn.setAttribute("aria-label", "Decrease");
  decBtn.textContent = "−";

  const valEl = document.createElement("span");
  valEl.className = "mm-cp-step-val";
  valEl.setAttribute("aria-live", "polite");

  const incBtn = document.createElement("button");
  incBtn.type = "button";
  incBtn.className = "mm-cp-step-btn";
  incBtn.setAttribute("aria-label", "Increase");
  incBtn.textContent = "+";

  const sync = () => {
    const val = Number(input.value || min);
    valEl.textContent = String(val);
    decBtn.disabled = val <= min;
    incBtn.disabled = val >= max;
  };

  const apply = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    input.value = String(clamped);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    sync();
  };

  decBtn.addEventListener("click", (e) => {
    e.preventDefault();
    apply(Number(input.value || min) - step);
  });
  incBtn.addEventListener("click", (e) => {
    e.preventDefault();
    apply(Number(input.value || min) + step);
  });

  wrap.append(decBtn, valEl, incBtn);
  sync();
}

export function initConceptPickers() {
  if (!document.body.classList.contains("concept-page")) return;

  document.querySelectorAll<HTMLSelectElement>("main form select").forEach(enhanceSelect);
  document.querySelectorAll<HTMLInputElement>('main form input[type="date"]').forEach(enhanceDateInput);
  document.querySelectorAll<HTMLInputElement>('main form input[type="number"]').forEach(enhanceNumberInput);

  document.addEventListener("click", (e) => {
    const target = e.target as Node | null;
    if (!target) return;
    if ((target as Element).closest?.(".mm-cp-popover, .mm-cp-trigger")) return;
    closeActive();
  });

  window.addEventListener("scroll", () => activeCtrl?.reposition(), { passive: true });
  window.addEventListener("resize", () => activeCtrl?.reposition(), { passive: true });
}
