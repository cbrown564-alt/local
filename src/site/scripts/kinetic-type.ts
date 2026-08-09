/**
 * Kinetic type for the Mourne Cycles concept — the "freedom — the ride"
 * register carried by the typography itself.
 *
 * The `ride` effect brings a heading in character by character with a lean,
 * then settles. It runs once and the scheduler lands it exactly on the final
 * frame.
 *
 * Reduced motion is the designed settled state by construction: the
 * scheduler paints a single frame at `settledAt`: the untransformed text.
 * The static condensed italic caps are the design.
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

/** Scans for `[data-kinetic]` headings and mounts each effect once. */
export function mountKineticType(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-kinetic]").forEach((el) => {
    if (el.dataset.kinetic === "ride") mountRide(el);
  });
}
