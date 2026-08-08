/**
 * The Mourne Cycles ridgeline — the theatre moment of the trails page.
 *
 * The real skyline above Newcastle (sampled from open elevation data at
 * build time and handed over in `data-profile`) draws itself in over ~2.6s
 * when the section scrolls into view; then a marker walks the ridge and the
 * readout names the height under it. Meaning lives in the DOM — the canvas
 * is aria-hidden decoration over real text.
 *
 * Registered with the one scheduler (`motion.ts`): reduced motion paints
 * the fully drawn skyline once — the settled frame, not a disabled version.
 */

import { register, smoothstep, stage } from "./motion";

const DRAW_SECONDS = 2.6;

export function mountMcRidgeline(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-ridgeline]").forEach((el) => {
    const canvas = el.querySelector("canvas");
    if (!canvas) return;
    const s = stage(canvas);
    if (!s) return;

    const profile: number[] = JSON.parse(el.dataset.profile ?? "[]");
    if (profile.length < 2) return;
    const min = Number(el.dataset.min ?? 0);
    const max = Number(el.dataset.max ?? 1);
    const readout = el.querySelector<HTMLElement>("[data-ridge-readout]");

    const styles = getComputedStyle(el);
    const ink = styles.getPropertyValue("--coal").trim() || "#0f1013";
    const red = styles.getPropertyValue("--red").trim() || "#d7282f";

    register(
      el,
      (t) => {
        const { ctx, w, h } = s;
        ctx.clearRect(0, 0, w, h);

        const drawn = smoothstep(0, DRAW_SECONDS, t);
        const baseline = h - 10;
        const amp = h * 0.72;
        const pointAt = (i: number) =>
          [(i / (profile.length - 1)) * w, baseline - profile[i] * amp] as const;

        const last = Math.max(1, Math.floor(drawn * (profile.length - 1)));

        ctx.beginPath();
        ctx.moveTo(0, baseline);
        for (let i = 0; i <= last; i += 1) {
          const [x, y] = pointAt(i);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(pointAt(last)[0], baseline);
        ctx.closePath();
        const fill = ctx.createLinearGradient(0, 0, 0, h);
        fill.addColorStop(0, "rgba(15, 16, 19, 0.18)");
        fill.addColorStop(1, "rgba(15, 16, 19, 0.02)");
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.beginPath();
        for (let i = 0; i <= last; i += 1) {
          const [x, y] = pointAt(i);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.stroke();

        if (drawn >= 1) {
          // The marker walks the massif, not the coastal flat.
          const WALK_TO = 0.62;
          const walk =
            (Math.sin((t - DRAW_SECONDS) * 0.45) * 0.5 + 0.5) *
            (profile.length - 1) *
            WALK_TO;
          const wi = Math.round(walk);
          const [mx, my] = pointAt(wi);
          ctx.beginPath();
          ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = red;
          ctx.fill();
          if (readout) {
            readout.textContent = `${Math.round(min + profile[wi] * (max - min))} m`;
          }
        }
      },
      // The settled frame is the full skyline with the marker up on the massif.
      { settledAt: DRAW_SECONDS + 0.29 },
    );
  });
}
