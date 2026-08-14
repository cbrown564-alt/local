/**
 * /how-a-site-goes-together/ — the scroll-driven build. The build section is
 * tall and its stage is sticky, so scroll position is time: each scroll
 * window seats the next layer with its gesture (seat, slide, unfold, light)
 * while its annotation rises beside the chassis, and scrolling back lifts
 * layers off again. Nothing runs on a timer — every state change is a scroll
 * position, a tick click, or a replay ask.
 *
 * The gestures are CSS keyframes; this script only moves layers between four
 * states — hidden, playing in, seated, playing out — by class. A jump of
 * more than one layer (a tick, a checklist link, a hash) seats or lifts the
 * skipped layers instantly and animates only the edge layer.
 *
 * After the build, the vignettes: each replay ask re-runs the arriving
 * layer's gesture in place, and each vignette replays once the first time it
 * scrolls into view.
 *
 * Progressive enhancement, the fault walk's contract: no JS or
 * prefers-reduced-motion keeps the server-rendered exploded plate — the full
 * argument as a labelled drawing — and this never mounts.
 */

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollBehavior = (): ScrollBehavior => (reduceMotion() ? "auto" : "smooth");

/** One scroll window per layer, plus one for the empty page at the start. */
const WINDOWS = 6;

export function mountAssemblyBuild(): void {
  if (reduceMotion()) return;

  const assembly = document.querySelector<HTMLElement>("[data-hasg-assembly]");
  if (!assembly) return;

  const staticLayer = assembly.querySelector<HTMLElement>("[data-hasg-static]");
  const build = assembly.querySelector<HTMLElement>("[data-hasg-live]");
  if (!staticLayer || !build) return;

  const layers = [...build.querySelectorAll<HTMLElement>(".hasg-layer")];
  const notes = [...build.querySelectorAll<HTMLElement>(".hasg-note")];
  const ticks = [...build.querySelectorAll<HTMLButtonElement>(".hasg-tick")];
  const markers = [...build.querySelectorAll<HTMLElement>(".hasg-build-marker")];
  const pageLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-hasg-page]")];
  if (layers.length === 0) return;

  /* Two chassis render the same build (phone and browser window, one shown
     per breakpoint), so each layer number and each beat marker exists twice —
     every state change lands on all of them at once. */
  const layerCount = new Set(layers.map((layer) => layer.dataset.layer)).size;
  const layersFor = (n: number) => layers.filter((layer) => layer.dataset.layer === String(n));

  /* "Play out" ends floating off-frame in the gesture's from-state; the
     animation's end is the cue to drop the class and let the base rule hide
     the layer. For unfold the animation lives on the row blocks, so the last
     row's end answers for the layer. */
  for (const layer of layers) {
    layer.addEventListener("animationend", (event) => {
      if (!layer.classList.contains("hasg-unplay")) return;
      const rows = layer.querySelectorAll(".fwb");
      const lastRow = rows[rows.length - 1];
      if (event.target === layer || event.target === lastRow) {
        layer.classList.remove("hasg-unplay");
      }
    });
  }

  let current = 0;

  const syncUi = () => {
    for (const note of notes) {
      const on = Number(note.dataset.note) === current;
      note.classList.toggle("is-on", on);
      if (on) note.removeAttribute("aria-hidden");
      else note.setAttribute("aria-hidden", "true");
    }
    for (const [index, tick] of ticks.entries()) {
      tick.classList.toggle("is-built", index < current);
      tick.classList.toggle("is-current", index === current - 1);
    }
    for (const marker of markers) {
      marker.classList.toggle("is-on", marker.dataset.marker === `beat-${current}`);
    }
  };

  const setLayer = (n: number, state: "hidden" | "seated" | "play" | "unplay") => {
    for (const layer of layersFor(n)) {
      layer.classList.remove("hasg-play", "hasg-unplay", "is-seated");
      /* The gesture keyframes are one name each way (hasg-seat arrives and
         departs), so a class swap alone would update the old animation in
         place instead of restarting it — the reflow forces a fresh run. */
      void layer.offsetWidth;
      if (state === "seated") layer.classList.add("is-seated");
      if (state === "play") layer.classList.add("hasg-play");
      if (state === "unplay") layer.classList.add("hasg-unplay");
    }
  };

  const goTo = (next: number, animate = true) => {
    const target = Math.max(0, Math.min(layerCount, next));
    if (target === current) return;
    if (!animate) {
      for (let n = 1; n <= layerCount; n++) setLayer(n, n <= target ? "seated" : "hidden");
    } else if (target > current) {
      for (let n = current + 1; n < target; n++) setLayer(n, "seated");
      setLayer(target, "play");
    } else {
      for (let n = current; n > target + 1; n--) setLayer(n, "hidden");
      setLayer(target + 1, "unplay");
    }
    current = target;
    syncUi();
  };

  const metrics = () => {
    const rect = build.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    return { top: rect.top + window.scrollY, total, seg: total / WINDOWS };
  };

  const computeFromScroll = (animate = true) => {
    const { top, total, seg } = metrics();
    const scrolled = Math.min(Math.max(window.scrollY - top, 0), total);
    goTo(Math.min(layerCount, Math.floor(scrolled / seg)), animate);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      computeFromScroll();
    });
  };

  const scrollToBeat = (n: number, behavior: ScrollBehavior = scrollBehavior()) => {
    const { top, seg } = metrics();
    /* Land just inside the layer's window, so the gesture has room to play. */
    window.scrollTo({ top: top + seg * n + 2, behavior });
  };

  for (const [index, tick] of ticks.entries()) {
    tick.addEventListener("click", () => scrollToBeat(index + 1));
  }

  /* Checklist links (and any other pointer at a beat) scroll the build to
     the layer instead of jumping to the plate's anchor. */
  for (const link of pageLinks) {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("data-hasg-page");
      const beatNumber = Number(id?.replace("beat-", ""));
      if (!beatNumber || beatNumber < 1 || beatNumber > layerCount) return;
      event.preventDefault();
      scrollToBeat(beatNumber);
      history.replaceState(null, "", `#${id}`);
    });
  }

  /* --- the vignettes: replay a layer's arrival on ask, and once on first
     sight. The replay class is left in place after the gesture — fill mode
     holds the seated state, and the next ask removes, reflows and re-adds.
     Replaying on click adds a crisp micro-settling pulse to the frame and
     spins the replay icon to reinforce the physical seating metaphor. */
  const replayVignette = (vignette: HTMLElement, isManualClick = false) => {
    const fresh = vignette.querySelector<HTMLElement>(".hasg-layer--fresh");
    const frame = vignette.querySelector<HTMLElement>(".hgv-frame");
    const icon = vignette.querySelector<HTMLElement>(".hgv-replay-icon");

    if (fresh) {
      fresh.classList.remove("hasg-play");
      void fresh.offsetWidth;
      fresh.classList.add("hasg-play");
    }

    if (frame) {
      frame.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(1.5px)", offset: 0.65 },
          { transform: "translateY(-0.4px)", offset: 0.85 },
          { transform: "translateY(0)" },
        ],
        { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }

    if (isManualClick && icon) {
      icon.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 0.9, 0.32, 1)" },
      );
    }
  };

  const vignettes = [...document.querySelectorAll<HTMLElement>(".hgv")];
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        replayVignette(entry.target as HTMLElement, false);
        seen.unobserve(entry.target);
      }
    },
    { threshold: 0.55 },
  );
  for (const vignette of vignettes) {
    vignette.querySelector(".hgv-replay")?.addEventListener("click", () => {
      replayVignette(vignette, true);
    });
    seen.observe(vignette);
  }

  /* The state is settled before the live build is revealed: a mid-page load
     (or a #beat-N hash) seats its layers instantly rather than playing the
     whole build at once. */
  staticLayer.hidden = true;
  build.hidden = false;

  const hashId = window.location.hash.replace(/^#/, "");
  const hashBeat = Number(hashId.replace("beat-", ""));
  if (hashBeat >= 1 && hashBeat <= layerCount) {
    goTo(hashBeat, false);
    scrollToBeat(hashBeat, "auto");
  } else {
    computeFromScroll(false);
  }
  syncUi();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}
