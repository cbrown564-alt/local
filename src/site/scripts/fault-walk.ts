/**
 * Behaviour for /what-we-look-for/ — the walkable errand and the swap test,
 * from research/what-we-look-for-brief.md.
 *
 * Both controls are progressive enhancement. No JS or prefers-reduced-motion
 * leaves the static plates in place: the two wireframe states side by side
 * with the tap counts stated as text. The panels themselves are rendered by
 * Astro; this layer only switches them, counts the visitor's own taps, and
 * announces state changes.
 */

interface FaultBlockData {
  tap?: string;
  goal?: boolean;
  note?: string;
}

interface FaultPanelData {
  id: string;
  caption: string;
  note?: string;
  blocks: FaultBlockData[];
}

interface FaultGraph {
  id: string;
  minBeforeTaps: number | null;
  afterTaps: number;
  goalIsHidden: boolean;
  stop: { kind: "blocked" | "found"; panel?: string; note: string };
  fixedNote: string;
  before: FaultPanelData[];
  after: FaultPanelData[];
}

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

function mountWalk(root: HTMLElement): void {
  const blob = root.querySelector("script[data-fault-graph]");
  const staticLayer = root.querySelector<HTMLElement>("[data-fw-static]");
  const live = root.querySelector<HTMLElement>("[data-fw-live]");
  const frame = root.querySelector<HTMLElement>("[data-fw-frame]");
  if (!blob?.textContent || !staticLayer || !live || !frame) return;

  const graph = JSON.parse(blob.textContent) as FaultGraph;
  const tapsEl = live.querySelector<HTMLElement>("[data-fw-taps]");
  const screensEl = live.querySelector<HTMLElement>("[data-fw-screens]");
  const noteEl = live.querySelector<HTMLElement>("[data-fw-note]");
  const outcomeEl = live.querySelector<HTMLElement>("[data-fw-outcome]");
  const actualsEl = live.querySelector<HTMLElement>("[data-fw-actuals]");
  const fixButton = live.querySelector<HTMLButtonElement>("[data-fw-fix]");
  const badgeEl = live.querySelector<HTMLElement>("[data-fw-badge]");
  const sr = live.querySelector<HTMLElement>("[data-fw-sr]");
  const panels = [...live.querySelectorAll<HTMLElement>("[data-panel]")];
  if (!tapsEl || !screensEl || !noteEl || !outcomeEl || !actualsEl || !fixButton || !sr) {
    return;
  }

  let mode: "before" | "after" = "before";
  let taps = 0;
  let screens = 0;
  let ended = false;
  let currentPanel: string | null = null;

  const panelsData = () => (mode === "before" ? graph.before : graph.after);

  const setNote = (text: string) => {
    noteEl.textContent = text;
  };

  /* A quick scale tick as the visitor's own count climbs — the number is the
     lesson, so it gets a pulse. The whole live layer only mounts when motion
     is allowed, so no reduced-motion guard is needed here. */
  const pop = (el: HTMLElement) => {
    el.animate(
      [
        { transform: "scale(1.22)", color: "var(--blue)" },
        { transform: "scale(1)" },
      ],
      { duration: 220, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
  };

  const updateCounts = () => {
    tapsEl.textContent = String(taps);
    screensEl.textContent = String(screens);
    pop(tapsEl);
    if (screens > 0) pop(screensEl);
  };

  const showPanel = (id: string, byVisitor = false) => {
    let shown: HTMLElement | null = null;
    for (const panel of panels) {
      const visible = panel.dataset.mode === mode && panel.dataset.panel === id;
      panel.hidden = !visible;
      if (visible) shown = panel;
    }
    if (!shown || currentPanel === id) return;
    currentPanel = id;
    shown.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 200, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
    const data = panelsData().find((panel) => panel.id === id);
    setNote(data?.note ?? "");
    if (byVisitor) {
      screens += 1;
      updateCounts();
      if (data) sr.textContent = data.caption;
      shown.focus({ preventScroll: true });
    }
  };

  const endWalk = () => {
    ended = true;
    const note = mode === "before" ? graph.stop.note : graph.fixedNote;
    outcomeEl.textContent = note;
    actualsEl.textContent = `Your walk: ${plural(taps, "tap")} · ${plural(screens, "screen")}.`;
    sr.textContent = `${note} You took ${plural(taps, "tap")} across ${plural(screens, "screen")}.`;
    fixButton.classList.add("is-ready");
    fixButton.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.045)" },
        { transform: "scale(1)" },
      ],
      { duration: 340, easing: "ease-out" },
    );
  };

  frame.addEventListener("click", (event) => {
    const block = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-tap], [data-goal], [data-note]",
    );
    taps += 1;
    updateCounts();
    if (ended) {
      if (block?.dataset.note) setNote(block.dataset.note);
      return;
    }
    if (block?.dataset.goal === "true") {
      endWalk();
      return;
    }
    if (block?.dataset.tap) {
      const next = block.dataset.tap;
      showPanel(next, true);
      if (mode === "before" && graph.stop.kind === "blocked" && graph.stop.panel === next) {
        endWalk();
      }
      return;
    }
    if (block?.dataset.note) setNote(block.dataset.note);
  });

  fixButton.addEventListener("click", () => {
    mode = mode === "before" ? "after" : "before";
    taps = 0;
    screens = 0;
    ended = false;
    currentPanel = null;
    live.dataset.fwMode = mode;
    if (badgeEl) badgeEl.textContent = mode === "after" ? "the fix" : "the fault";
    updateCounts();
    outcomeEl.textContent = "";
    actualsEl.textContent = "";
    fixButton.classList.remove("is-ready");
    fixButton.textContent = mode === "after" ? "Show the fault again" : "Fix it";
    const first = panelsData()[0];
    showPanel(first.id);
    setNote(mode === "after" ? "Same job. Try it again." : (first.note ?? ""));
    sr.textContent =
      mode === "after" ? "The fixed version. Same job." : "The fault, again.";
  });

  staticLayer.hidden = true;
  live.hidden = false;
  showPanel(graph.before[0].id);
}

function mountSwap(root: HTMLElement): void {
  const staticLayer = root.querySelector<HTMLElement>("[data-swap-static]");
  const live = root.querySelector<HTMLElement>("[data-swap-live]");
  if (!staticLayer || !live) return;

  const shops = [...live.querySelectorAll<HTMLElement>("[data-swap-shop]")];
  const plate = live.querySelector<HTMLButtonElement>("[data-swap-plate]");
  const detailsButton = live.querySelector<HTMLButtonElement>("[data-swap-details]");
  const outcomeEl = live.querySelector<HTMLElement>("[data-swap-outcome]");
  const sr = live.querySelector<HTMLElement>("[data-swap-sr]");
  const [left, right] = shops;
  if (!left || !right || !plate || !detailsButton || !outcomeEl || !sr) return;

  let phase: "start" | "seated" | "refusing" = "start";

  const say = (text: string) => {
    outcomeEl.textContent = text;
    sr.textContent = text;
  };

  const shopHolding = () => plate.closest("[data-swap-shop]");
  const otherShop = () => (shopHolding() === left ? right : left);

  const movePlateTo = (shop: HTMLElement) => {
    const slot = shop.querySelector("[data-swap-slot]");
    if (!slot || plate.parentElement === slot) return;
    const from = plate.getBoundingClientRect();
    slot.appendChild(plate);
    plate.style.transform = "";
    const to = plate.getBoundingClientRect();
    plate.animate(
      [
        { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px)` },
        { transform: "translate(0, 0)" },
      ],
      { duration: 340, easing: "cubic-bezier(.3,.7,.3,1)" },
    );
  };

  const refuse = () => {
    plate.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)" },
        { transform: "translate(16%, 8%) rotate(-7deg)", offset: 0.45 },
        { transform: "translate(0, 0) rotate(0deg)" },
      ],
      { duration: 520, easing: "ease-out" },
    );
    say("It won't seat. You aren't generic — the website was.");
  };

  const seat = (target: HTMLElement) => {
    if (phase === "refusing" && target === right) {
      refuse();
      return;
    }
    movePlateTo(target);
    if (phase === "start" && target === right) {
      phase = "seated";
      say("It seats perfectly. Nothing else needs changing — and that is the problem.");
      detailsButton.hidden = false;
    }
  };

  detailsButton.addEventListener("click", () => {
    phase = "refusing";
    live.setAttribute("data-swap-details", "shown");
    detailsButton.hidden = true;
    movePlateTo(left);
    say("The hill in the glass, the worn step, the door number. Now try the plate again.");
  });

  let dragStart: { x: number; y: number } | null = null;
  let dragging = false;
  let suppressClick = false;

  plate.addEventListener("pointerdown", (event) => {
    dragStart = { x: event.clientX, y: event.clientY };
    dragging = false;
    plate.setPointerCapture(event.pointerId);
  });

  plate.addEventListener("pointermove", (event) => {
    if (!dragStart) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    if (!dragging && Math.hypot(dx, dy) > 6) {
      dragging = true;
      plate.classList.add("is-dragging");
    }
    if (dragging) plate.style.transform = `translate(${dx}px, ${dy}px) rotate(-3deg)`;
  });

  plate.addEventListener("pointerup", (event) => {
    if (!dragStart) return;
    const wasDragging = dragging;
    dragStart = null;
    dragging = false;
    plate.classList.remove("is-dragging");
    if (!wasDragging) return;
    suppressClick = true;
    plate.style.transform = "";
    const target = otherShop();
    const bounds = target.getBoundingClientRect();
    const over =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (over) seat(target);
  });

  plate.addEventListener("pointercancel", () => {
    dragStart = null;
    dragging = false;
    plate.classList.remove("is-dragging");
    plate.style.transform = "";
  });

  plate.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    seat(otherShop());
  });

  staticLayer.hidden = true;
  live.hidden = false;
}

/** Mount every fault-walk and the swap test. Under reduced motion the static
 *  plates stay — the page's required no-motion layer. */
export function mountFaultWalks(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document
    .querySelectorAll<HTMLElement>("[data-fault-walk]")
    .forEach((root) => mountWalk(root));
  document
    .querySelectorAll<HTMLElement>("[data-swap-test]")
    .forEach((root) => mountSwap(root));
}
