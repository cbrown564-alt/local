/**
 * The sensory system's one scheduler.
 *
 * Every canvas effect on the site registers here rather than holding its own
 * `requestAnimationFrame` loop. One loop drives all of them, so two effects on
 * the same screen cost one frame budget rather than two, and a hidden tab or a
 * scrolled-past effect costs nothing at all.
 *
 * Reduced motion is a state, not a switch: a registered effect is still drawn,
 * once, at the settled time it nominates, and redrawn whenever its canvas is
 * resized out from under it. (A `ResizeObserver` firing after that single paint
 * clears the canvas — the prototype found this trap and this module closes it.)
 *
 * See `docs/sensory-system-plan.md`, "Cross-cutting requirements".
 */

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Seconds since the effect first became visible. */
type Frame = (t: number) => void;

interface Effect {
  el: HTMLElement;
  frame: Frame;
  /** Time passed to `frame` for the single reduced-motion paint. */
  settledAt: number;
  /** Stop after this many seconds of play. `Infinity` runs until unregistered. */
  duration: number;
  visible: boolean;
  /** rAF timestamp at which this effect's clock started. */
  start: number;
  done: boolean;
}

const effects = new Set<Effect>();
let raf = 0;

function tick(now: number): void {
  raf = 0;
  let live = false;

  for (const effect of effects) {
    if (!effect.visible || effect.done) continue;
    if (!effect.start) effect.start = now;
    const t = (now - effect.start) / 1000;
    if (t >= effect.duration) {
      // Land exactly on the final frame rather than wherever rAF happened to
      // fall, so a run-once effect always settles on its designed last state.
      effect.frame(effect.duration);
      effect.done = true;
      continue;
    }
    effect.frame(t);
    live = true;
  }

  if (live) schedule();
}

function schedule(): void {
  if (raf || document.hidden) return;
  raf = requestAnimationFrame(tick);
}

let wired = false;
function wire(): void {
  if (wired) return;
  wired = true;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      // A tab that comes back should not fast-forward through the time it
      // spent hidden: each effect restarts its clock from the next frame.
      for (const effect of effects) if (!effect.done) effect.start = 0;
    } else {
      schedule();
    }
  });
}

export interface RegisterOptions {
  /** Time handed to `frame` for the one reduced-motion paint. Default 6s. */
  settledAt?: number;
  /** Seconds of play before the effect holds its last frame. Default endless. */
  duration?: number;
  /** How far outside the viewport the effect starts running. Default 120px. */
  rootMargin?: string;
}

/**
 * Runs `frame(t)` while `el` is on screen, the tab is visible and motion is
 * allowed. Returns a function that unregisters the effect.
 */
export function register(
  el: HTMLElement,
  frame: Frame,
  options: RegisterOptions = {},
): () => void {
  const { settledAt = 6, duration = Infinity, rootMargin = "120px" } = options;

  if (prefersReducedMotion()) {
    const canvas = el.querySelector("canvas");
    const paint = () => requestAnimationFrame(() => frame(settledAt));
    paint();
    // Sizing a canvas clears it, and the settled paint has already happened.
    if (canvas) {
      const observer = new ResizeObserver(paint);
      observer.observe(canvas);
      return () => observer.disconnect();
    }
    return () => undefined;
  }

  wire();
  const effect: Effect = {
    el,
    frame,
    settledAt,
    duration,
    visible: false,
    start: 0,
    done: false,
  };
  effects.add(effect);

  const observer = new IntersectionObserver(
    ([entry]) => {
      effect.visible = entry.isIntersecting;
      if (effect.visible) schedule();
    },
    { rootMargin },
  );
  observer.observe(el);

  return () => {
    observer.disconnect();
    effects.delete(effect);
  };
}

export interface Stage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** CSS pixels — draw in these; the transform handles device resolution. */
  w: number;
  h: number;
}

/** Sizes a canvas to its box at device resolution and keeps it there. */
export function stage(canvas: HTMLCanvasElement): Stage | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const s: Stage = { canvas, ctx, w: 0, h: 0 };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    s.w = Math.max(1, Math.round(rect.width));
    s.h = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(s.w * dpr);
    canvas.height = Math.round(s.h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  new ResizeObserver(resize).observe(canvas);
  return s;
}

/** Smooth 0→1 ramp. */
export const smoothstep = (a: number, b: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Resolves once an already-in-DOM image has pixels to draw. */
export function ready(img: HTMLImageElement): Promise<HTMLImageElement> {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve(img);
  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => resolve(img), { once: true });
    img.addEventListener("error", reject, { once: true });
  });
}
