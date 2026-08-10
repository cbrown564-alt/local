import { register, smoothstep, stage } from "../../site/scripts/motion";
import { chapters, concerns, route, type JourneyChapter } from "./journey";

type ProgressSource = "auto" | "chapter" | "pointer" | "range" | "step";

const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

const sampleAt = (progress: number) => {
  const index = progress * (route.samples.length - 1);
  const from = route.samples[Math.floor(index)];
  const to = route.samples[Math.min(route.samples.length - 1, Math.ceil(index))];
  const mix = index - Math.floor(index);
  return {
    distanceKm: from.distanceKm + (to.distanceKm - from.distanceKm) * mix,
    elevationM: from.elevationM + (to.elevationM - from.elevationM) * mix,
    cumulativeClimbM:
      from.cumulativeClimbM +
      (to.cumulativeClimbM - from.cumulativeClimbM) * mix,
  };
};

const chapterAt = (progress: number): JourneyChapter => {
  let active = chapters[0];
  for (const chapter of chapters) {
    if (progress >= chapter.progress - 0.012) active = chapter;
  }
  return active;
};

const highGroundAmount = (progress: number): number => {
  if (progress <= 0.5) return smoothstep(0.24, 0.5, progress);
  return 1 - smoothstep(0.5, 0.79, progress);
};

const profileY = (elevation: number, base: number, scale: number): number => {
  const normal =
    (elevation - route.summary.minElevationM) /
    Math.max(1, route.summary.maxElevationM - route.summary.minElevationM);
  return base - normal * scale;
};

const makeRenderer = (
  root: HTMLElement,
  canvas: HTMLCanvasElement,
): ((progress: number) => void) | null => {
  if (new URLSearchParams(window.location.search).get("renderer") === "off") {
    return null;
  }

  const canvasStage = stage(canvas);
  if (!canvasStage) return null;
  const { ctx } = canvasStage;

  const draw = (progress: number) => {
    const { w, h } = canvasStage;
    const high = highGroundAmount(progress);
    const descent = smoothstep(0.56, 0.88, progress);
    const workshop = smoothstep(0.86, 1, progress);

    ctx.clearRect(0, 0, w, h);

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, high > 0.45 ? "#263342" : "#080b10");
    sky.addColorStop(0.52, high > 0.45 ? "#121a24" : "#0b0f15");
    sky.addColorStop(1, "#030407");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    if (high > 0.05) {
      const sea = ctx.createLinearGradient(0, h * 0.22, 0, h * 0.48);
      sea.addColorStop(0, `rgba(198, 217, 236, ${0.14 * high})`);
      sea.addColorStop(0.08, `rgba(130, 155, 182, ${0.23 * high})`);
      sea.addColorStop(1, "rgba(24, 38, 56, 0)");
      ctx.fillStyle = sea;
      ctx.fillRect(0, h * 0.2, w, h * 0.3);
    }

    const pad = Math.max(24, w * 0.035);
    const usable = w - pad * 2;
    const scale = h * (0.42 + high * 0.1);
    const centreX = pad + progress * usable;
    const layerCount = 8;

    for (let layer = layerCount - 1; layer >= 0; layer -= 1) {
      const depth = layer / Math.max(1, layerCount - 1);
      const spread = 1 + high * depth * 0.22;
      const base = h * (0.79 - depth * high * 0.058 + depth * descent * 0.018);
      const layerScale = scale * (1 - depth * 0.075);

      ctx.beginPath();
      route.samples.forEach((sample, index) => {
        const rawX = pad + sample.progress * usable;
        const x = centreX + (rawX - centreX) * spread;
        const y = profileY(sample.elevationM, base, layerScale);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(w + pad, h + 2);
      ctx.lineTo(-pad, h + 2);
      ctx.closePath();
      ctx.fillStyle = `rgba(${7 + layer * 3}, ${10 + layer * 5}, ${16 + layer * 7}, ${0.72 - depth * 0.045})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(183, 198, 214, ${0.13 + (1 - depth) * 0.25})`;
      ctx.lineWidth = layer === 0 ? 1.7 : 1;
      ctx.stroke();
    }

    if (high > 0.12) {
      ctx.save();
      ctx.strokeStyle = `rgba(224, 235, 246, ${0.8 * high})`;
      ctx.lineWidth = 1;
      for (let index = 43; index <= 75; index += 4) {
        const sample = route.samples[index];
        const x = pad + sample.progress * usable;
        const y = profileY(sample.elevationM, h * 0.79, scale);
        const normal =
          (sample.elevationM - route.summary.minElevationM) /
          (route.summary.maxElevationM - route.summary.minElevationM);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - (14 + normal * 88) * high);
        ctx.stroke();
      }
      ctx.restore();
    }

    const routeGradient = ctx.createLinearGradient(pad, 0, w - pad, 0);
    routeGradient.addColorStop(0, "#9eabb8");
    routeGradient.addColorStop(0.42, "#f4f7fb");
    routeGradient.addColorStop(0.62, "#7797ff");
    routeGradient.addColorStop(1, "#c8d1da");
    ctx.beginPath();
    route.samples.forEach((sample, index) => {
      const x = pad + sample.progress * usable;
      const y = profileY(sample.elevationM, h * 0.79, scale);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = routeGradient;
    ctx.lineWidth = Math.max(2.5, w / 420);
    ctx.shadowColor = "rgba(224, 235, 246, .7)";
    ctx.shadowBlur = 9;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.setLineDash([2, 5]);
    ctx.strokeStyle = "rgba(255,255,255,.78)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    const active = sampleAt(progress);
    const activeY = profileY(active.elevationM, h * 0.79, scale);
    const activeX = pad + progress * usable;
    ctx.beginPath();
    ctx.arc(activeX, activeY, 8 + high * 3, 0, Math.PI * 2);
    ctx.fillStyle = "#2357ff";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(activeX, activeY, 14 + high * 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(139, 167, 255, .75)";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (workshop > 0) {
      ctx.fillStyle = `rgba(5, 6, 9, ${0.78 * workshop})`;
      ctx.fillRect(0, h * 0.74, w, h * 0.26);
      ctx.strokeStyle = `rgba(184, 195, 207, ${0.55 * workshop})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.75);
      ctx.lineTo(w, h * 0.75);
      ctx.stroke();
    }
  };

  const observer = new ResizeObserver(() => draw(Number(root.dataset.progress ?? 0)));
  observer.observe(canvas);
  return draw;
};

const initForm = (root: HTMLElement) => {
  const form = root.querySelector<HTMLFormElement>("[data-workshop-form]");
  const success = root.querySelector<HTMLElement>("[data-form-success]");
  const reset = root.querySelector<HTMLButtonElement>("[data-reset-form]");
  if (!form || !success || !reset) return;

  const showError = (field: HTMLInputElement | HTMLTextAreaElement) => {
    const target = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    let message = "";
    if (field.validity.valueMissing) message = "Add this before preparing the request.";
    else if (field.validity.typeMismatch) message = "Use an email address in the form name@example.com.";
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    if (target) target.textContent = message;
    return !message;
  };

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]").forEach((field) => {
    field.addEventListener("blur", () => showError(field));
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) showError(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]"),
    );
    const valid = fields.map(showError).every(Boolean);
    if (!valid) {
      fields.find((field) => !field.checkValidity())?.focus();
      return;
    }
    success.hidden = false;
    success.focus();
  });

  reset.addEventListener("click", () => {
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
    form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((error) => {
      error.textContent = "";
    });
    success.hidden = true;
    const selectedConcern = document.querySelector<HTMLInputElement>(
      "input[name='journey-concern']:checked",
    );
    const concern = concerns.find((item) => item.id === selectedConcern?.value);
    const context = form.querySelector<HTMLInputElement>("[data-journey-context]");
    if (context) context.value = concern?.context ?? "No concern chosen";
    form.querySelector<HTMLInputElement>("input[name='name']")?.focus();
  });
};

const initJourney = (root: HTMLElement) => {
  root.dataset.enhanced = "";
  root.dataset.progress = "0";

  const canvas = root.querySelector<HTMLCanvasElement>("[data-terrain-canvas]");
  const stageElement = root.querySelector<HTMLElement>("[data-journey-stage]");
  const range = root.querySelector<HTMLInputElement>("[data-progress-input]");
  const output = root.querySelector<HTMLOutputElement>("[data-progress-output]");
  const distance = root.querySelector<HTMLElement>("[data-distance]");
  const elevation = root.querySelector<HTMLElement>("[data-elevation]");
  const climb = root.querySelector<HTMLElement>("[data-climb]");
  const live = root.querySelector<HTMLElement>("[data-live-region]");
  const play = root.querySelector<HTMLButtonElement>("[data-play-journey]");
  const playLabel = root.querySelector<HTMLElement>("[data-play-label]");
  const previous = root.querySelector<HTMLButtonElement>("[data-previous]");
  const next = root.querySelector<HTMLButtonElement>("[data-next]");
  const chapterButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-chapter-button]"),
  );
  const chapterPanels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-chapter-panel]"),
  );
  const concernSummary = root.querySelector<HTMLElement>("[data-concern-summary]");
  const journeyContext = root.querySelector<HTMLInputElement>("[data-journey-context]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (
    !canvas ||
    !stageElement ||
    !range ||
    !output ||
    !distance ||
    !elevation ||
    !climb ||
    !live ||
    !play ||
    !playLabel ||
    !previous ||
    !next
  ) return;

  root.toggleAttribute("data-reduced-motion", reducedMotion);
  let render = makeRenderer(root, canvas);
  if (!render) {
    root.dataset.rendererFailed = "";
    canvas.hidden = true;
  }

  let progress = 0;
  let activeChapter = chapters[0];
  let stopPlaying: (() => void) | null = null;

  const cancelPlaying = () => {
    stopPlaying?.();
    stopPlaying = null;
    play.removeAttribute("data-playing");
    playLabel.textContent = progress >= 0.999 ? "Take the line again" : "Continue the line";
  };

  const syncChapter = (chapter: JourneyChapter, announce: boolean) => {
    const changed = chapter.id !== activeChapter.id;
    activeChapter = chapter;
    root.dataset.chapter = chapter.id;
    chapterButtons.forEach((button) => {
      if (button.dataset.chapterButton === chapter.id) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    chapterPanels.forEach((panel) => {
      const active = panel.dataset.chapterPanel === chapter.id;
      panel.toggleAttribute("data-active", active);
      panel.hidden = !active;
    });
    const chapterIndex = chapters.findIndex((item) => item.id === chapter.id);
    previous.disabled = chapterIndex === 0;
    next.disabled = chapterIndex === chapters.length - 1;
    output.textContent = chapter.label;
    if (changed && announce) {
      live.textContent = `${chapter.label}. ${chapter.heading}`;
    }
  };

  const setProgress = (nextProgress: number, source: ProgressSource) => {
    if (source !== "auto") cancelPlaying();
    progress = clamp(nextProgress);
    root.dataset.progress = String(progress);
    range.value = String(Math.round(progress * 1000));
    const sample = sampleAt(progress);
    distance.textContent = `${sample.distanceKm.toFixed(1)} km`;
    elevation.textContent = `${Math.round(sample.elevationM)} m`;
    climb.textContent = `${Math.round(sample.cumulativeClimbM)} m`;
    syncChapter(chapterAt(progress), source !== "auto" || progress === 1);
    render?.(progress);
  };

  chapterPanels.forEach((panel) => {
    panel.hidden = panel.dataset.chapterPanel !== "street";
  });

  chapterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setProgress(Number(button.dataset.progress ?? 0), "chapter");
    });
  });

  range.addEventListener("input", () => {
    setProgress(Number(range.value) / 1000, "range");
  });

  const stepChapter = (direction: -1 | 1) => {
    const current = chapters.findIndex((chapter) => chapter.id === activeChapter.id);
    const target = chapters[clamp(current + direction, 0, chapters.length - 1)];
    setProgress(target.progress, "step");
  };
  previous.addEventListener("click", () => stepChapter(-1));
  next.addEventListener("click", () => stepChapter(1));

  let pointerActive = false;
  const progressFromPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    setProgress((event.clientX - rect.left) / Math.max(1, rect.width), "pointer");
  };
  canvas.addEventListener("pointerdown", (event) => {
    pointerActive = true;
    canvas.setPointerCapture(event.pointerId);
    progressFromPointer(event);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (pointerActive) progressFromPointer(event);
  });
  canvas.addEventListener("pointerup", (event) => {
    pointerActive = false;
    canvas.releasePointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointercancel", () => {
    pointerActive = false;
  });

  play.addEventListener("click", () => {
    if (stopPlaying) {
      cancelPlaying();
      return;
    }
    if (reducedMotion) return;
    if (progress >= 0.999) setProgress(0, "auto");
    const startProgress = progress;
    let elapsed = 0;
    let previousTime = 0;
    const remaining = 1 - startProgress;
    const duration = Math.max(7, 18 * remaining);
    play.dataset.playing = "";
    playLabel.textContent = "Pause the line";
    stopPlaying = register(
      stageElement,
      (time) => {
        if (time < previousTime) previousTime = time;
        elapsed += Math.max(0, time - previousTime);
        previousTime = time;
        const raw = clamp(elapsed / duration);
        let travelled: number;
        if (startProgress >= 0.5) {
          travelled = raw;
        } else if (raw < 0.43) {
          travelled = (raw / 0.43) * 0.5;
        } else if (raw < 0.56) {
          travelled = 0.5;
        } else {
          travelled = 0.5 + ((raw - 0.56) / 0.44) * 0.5;
        }
        setProgress(startProgress + travelled * remaining, "auto");
        if (raw >= 1) cancelPlaying();
      },
      { duration: duration + 1, rootMargin: "0px" },
    );
  });

  root.querySelectorAll<HTMLInputElement>("input[name='journey-concern']").forEach((radio) => {
    radio.addEventListener("change", () => {
      const concern = concerns.find((item) => item.id === radio.value);
      if (!concern || !concernSummary || !journeyContext) return;
      concernSummary.textContent = concern.label;
      journeyContext.value = concern.context;
    });
  });

  setProgress(0, "auto");
  requestAnimationFrame(() => render?.(progress));
  initForm(root);
};

export const initImpossibleLocalJourney = (): void => {
  document.querySelectorAll<HTMLElement>("[data-journey-root]").forEach(initJourney);
};
