/**
 * Kinetic type for the Mourne Cycles concept — the "freedom — the ride"
 * register carried by the typography itself.
 *
 * Two effects, both driven by the one scheduler (`motion.ts`):
 *
 *  - `ride`  — a heading rides in character by character with a lean, then
 *    settles. Run-once; the scheduler lands it exactly on the final frame.
 *  - `lean`  — display type leans into scroll velocity and eases back, the
 *    way a rider corners. Endless while the heading is on screen.
 *
 * Reduced motion is the designed settled state by construction: the
 * scheduler paints a single frame at `settledAt`, which for both effects is
 * the untransformed text — the static condensed italic caps are the design.
 */

import { register, smoothstep } from "./motion";

const RIDE_STAGGER = 0.024;
const RIDE_CHAR = 0.55;

function mountRide(el: HTMLElement): void {
  const chars = Array.from(el.querySelectorAll<HTMLElement>(".mc-kin-char"));
  if (!chars.length) return;
  const total = (chars.length - 1) * RIDE_STAGGER + RIDE_CHAR;

  const frame = (t: number) => {
    for (let i = 0; i < chars.length; i += 1) {
      const p = smoothstep(i * RIDE_STAGGER, i * RIDE_STAGGER + RIDE_CHAR, t);
      const char = chars[i];
      if (p >= 1) {
        char.style.opacity = "";
        char.style.transform = "";
      } else {
        char.style.opacity = String(p);
        char.style.transform = `translateY(${(1 - p) * 0.42}em) rotate(${(1 - p) * 7}deg)`;
      }
    }
  };

  // Hide the characters before the first scheduled frame so the heading
  // never flashes settled-then-restarts.
  frame(0);
  register(el, frame, { duration: total, settledAt: total });
}

function mountLean(el: HTMLElement): void {
  let lastY = window.scrollY;
  let lastT = 0;
  let skew = 0;

  const frame = (t: number) => {
    const y = window.scrollY;
    const dt = Math.max(t - lastT, 1 / 120);
    // Viewport-heights per second, clamped: fast scroll corners hard,
    // stillness settles upright.
    const v = ((y - lastY) / dt / window.innerHeight) * 3.2;
    lastY = y;
    lastT = t;
    const target = Math.max(-7, Math.min(7, v * 7));
    skew += (target - skew) * 0.12;
    // Scrolling down leans the type further into its italic — a rider
    // carrying speed; scrolling up checks back against it.
    el.style.transform =
      Math.abs(skew) < 0.05 ? "" : `skewX(${skew.toFixed(2)}deg)`;
  };

  register(el, frame, { settledAt: 0 });
}

/** Scans for `[data-kinetic]` headings and mounts each effect once. */
export function mountKineticType(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-kinetic]").forEach((el) => {
    if (el.dataset.kinetic === "ride") mountRide(el);
    else if (el.dataset.kinetic === "lean") mountLean(el);
  });
}
