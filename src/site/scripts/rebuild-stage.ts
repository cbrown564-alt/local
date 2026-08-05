/**
 * 03 Rebuild — the before/after handover drawn as a build.
 *
 * The current site comes apart in tiles on a diagonal wave and the concept
 * lands in its place. It runs once, when the stage is scrolled into view, and
 * then hands over to the manual comparison underneath: the canvas fades out,
 * the drag handle sweeps to its settled split, and from that point the reader
 * is in charge. The build replaces the passive state of the comparison, not
 * the comparison itself.
 *
 * Both frames are drawn from the `<img>` elements already in the page, so the
 * effect costs no additional bytes over the comparison it decorates. The canvas
 * is `aria-hidden`; the meaning lives in the images and the handle beneath it.
 *
 * See `docs/sensory-system-plan.md`, phase 1.
 */
import { prefersReducedMotion, ready, register, smoothstep, stage } from "./motion";

const COLS = 14;
const ROWS = 9;

/** Hold on the before image before the first tile turns. */
const HOLD = 0.45;
/** Length of the build itself. */
const BUILD = 2.3;
/** Beat on the finished concept before the comparison takes over. */
const REST = 0.5;
const RUN = HOLD + BUILD + REST;

/**
 * Page screenshots are anchored to the top of frame — the first screen is the
 * thing being judged, so it must never be cropped away. This matches the
 * `object-fit: cover; object-position: top` the underlying images use, so the
 * canvas and the images it covers are pixel-aligned.
 */
function cover(img: HTMLImageElement, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  return {
    dw: img.naturalWidth * scale,
    dh: img.naturalHeight * scale,
    ox: (w - img.naturalWidth * scale) / 2,
    oy: 0,
  };
}

async function mount(root: HTMLElement): Promise<void> {
  // Whatever happens below, the comparison underneath must end up settled and
  // usable. It waits on this event rather than on a timer.
  const handOver = () => {
    root.dataset.rebuildState = "settled";
    root.dispatchEvent(new CustomEvent("rebuild:settled"));
  };

  const canvas = root.querySelector<HTMLCanvasElement>("[data-rebuild-canvas]");
  const before = root.querySelector<HTMLImageElement>("[data-rebuild-before]");
  const after = root.querySelector<HTMLImageElement>("[data-rebuild-after]");

  if (!canvas || !before || !after || prefersReducedMotion()) {
    handOver();
    return;
  }

  const s = stage(canvas);
  if (!s) {
    handOver();
    return;
  }

  try {
    await Promise.all([ready(before), ready(after)]);
  } catch {
    // A broken image is the comparison's problem to show, not ours to animate.
    handOver();
    return;
  }

  // Only now does the canvas cover the images: until it can draw the *before*
  // frame it must not hide anything.
  root.dataset.rebuildState = "armed";

  register(
    root,
    (t) => {
      const { ctx, w, h } = s;
      const sweep = smoothstep(HOLD, HOLD + BUILD, t);

      const b = cover(before, w, h);
      ctx.drawImage(before, b.ox, b.oy, b.dw, b.dh);

      const a = cover(after, w, h);
      const tw = w / COLS;
      const th = h / ROWS;
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          // Diagonal wave: mostly left-to-right, with a top-to-bottom lean.
          const wave = (col / COLS) * 0.65 + (row / ROWS) * 0.35;
          const local = smoothstep(wave * 0.8, wave * 0.8 + 0.3, sweep);
          if (local <= 0) continue;
          ctx.save();
          ctx.globalAlpha = local;
          // Tiles drop the last few pixels into place.
          const drop = (1 - local) * 10;
          ctx.beginPath();
          ctx.rect(col * tw, row * th, tw + 0.5, th + 0.5);
          ctx.clip();
          ctx.drawImage(after, a.ox, a.oy - drop, a.dw, a.dh);
          ctx.restore();
        }
      }

      // The canvas is now showing exactly the concept. Fading it out reveals
      // the same pixels underneath, so the handover is invisible; the sweep
      // that follows is what tells the reader the split can be dragged.
      if (t >= RUN) handOver();
    },
    { duration: RUN, settledAt: RUN, rootMargin: "80px" },
  );
}

export function mountRebuildStages(): void {
  document
    .querySelectorAll<HTMLElement>("[data-rebuild-stage]")
    .forEach((root) => void mount(root));
}
