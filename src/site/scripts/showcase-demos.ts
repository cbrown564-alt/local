/**
 * Sensory system — miniature demonstrations.
 *
 * Eight small, self-contained demos used by the internal prototype at
 * `/prototypes/showcase/`. Each one is a scaled-down proof of a technique we
 * could carry across the whole site, small enough to judge on the merits
 * without building the full surface.
 *
 * Every demo:
 *   - boots only when its tile is on screen, and stops when it leaves;
 *   - renders one settled frame and stops under `prefers-reduced-motion`;
 *   - never plays sound without a click.
 *
 * Terrain comes from `src/site/data/mourne-terrain.json` (baked from open
 * SRTM-derived elevation by `tools/pipeline/bake-mourne-terrain.mjs`).
 * Business points are passed in from the page as JSON so the client bundle
 * does not carry the whole dataset.
 */
import terrain from "../data/mourne-terrain.json";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Stage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** CSS pixels, not device pixels — draw in these. */
  w: number;
  h: number;
}

/** Sizes a canvas to its box at device resolution and keeps it there. */
function stage(root: HTMLElement): Stage | null {
  const canvas = root.querySelector("canvas");
  if (!canvas) return null;
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
    // Resizing a canvas clears it. Animated demos redraw on the next frame
    // anyway; a reduced-motion demo has already drawn its one and only frame,
    // so it needs telling.
    canvas.dispatchEvent(new CustomEvent("stage:resize"));
  };
  resize();
  new ResizeObserver(resize).observe(canvas);
  return s;
}

/**
 * Runs `frame(t)` on rAF while the tile is on screen. `frame` gets seconds
 * since the demo first became visible. Under reduced motion it is called once
 * with a settled time and never again.
 */
function loop(root: HTMLElement, frame: (t: number) => void): void {
  if (reducedMotion()) {
    // One settled frame — late enough in each demo's own timeline that
    // everything has arrived — redrawn whenever the canvas is resized out
    // from under it.
    const settle = () => requestAnimationFrame(() => frame(6));
    settle();
    root.querySelector("canvas")?.addEventListener("stage:resize", settle);
    return;
  }

  let raf = 0;
  let start = 0;
  const tick = (now: number) => {
    if (!start) start = now;
    frame((now - start) / 1000);
    raf = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !raf) {
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { rootMargin: "120px" },
  );
  observer.observe(root);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Smooth 0→1 ramp. */
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ */
/* The ridgeline — our real skyline, drawn from elevation data          */
/* ------------------------------------------------------------------ */

/**
 * The Mourne skyline as seen from the bay: the highest ground in each
 * north–south column of the baked terrain grid, normalised to 0–1.
 */
function skylineProfile(samples: number): number[] {
  const { width, height, heights, minHeight, maxHeight } = terrain;
  const range = maxHeight - minHeight || 1;
  const out: number[] = [];
  for (let i = 0; i < samples; i += 1) {
    const col = Math.round((i / (samples - 1)) * (width - 1));
    let peak = -Infinity;
    for (let row = 0; row < height; row += 1) {
      const v = heights[row * width + col];
      if (v > peak) peak = v;
    }
    out.push((peak - minHeight) / range);
  }
  return out;
}

const SKYLINE = skylineProfile(180);

function demoRidgeline(root: HTMLElement): void {
  const s = stage(root);
  if (!s) return;
  const line = root.querySelector<HTMLElement>("[data-ridge-readout]");

  loop(root, (t) => {
    const { ctx, w, h } = s;
    ctx.clearRect(0, 0, w, h);

    // The line draws itself in over 2.6s, then a marker walks it forever —
    // sitewide this is the scroll position, so the reader's progress is
    // literally a walk along the Mournes.
    const drawn = smoothstep(0, 2.6, t);
    const baseline = h - 10;
    const amp = h * 0.72;

    const pointAt = (i: number) => {
      const x = (i / (SKYLINE.length - 1)) * w;
      const y = baseline - SKYLINE[i] * amp;
      return [x, y] as const;
    };

    ctx.beginPath();
    ctx.moveTo(0, baseline);
    const last = Math.max(1, Math.floor(drawn * (SKYLINE.length - 1)));
    for (let i = 0; i <= last; i += 1) {
      const [x, y] = pointAt(i);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(pointAt(last)[0], baseline);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, "rgba(35, 72, 90, 0.30)");
    fill.addColorStop(1, "rgba(35, 72, 90, 0.02)");
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i <= last; i += 1) {
      const [x, y] = pointAt(i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#23485a";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    if (drawn >= 1) {
      const walk = (Math.sin((t - 2.6) * 0.5) * 0.5 + 0.5) * (SKYLINE.length - 1);
      const [mx, my] = pointAt(Math.round(walk));
      ctx.beginPath();
      ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#c2571f";
      ctx.fill();
      if (line) {
        const metres = Math.round(
          terrain.minHeight +
            SKYLINE[Math.round(walk)] * (terrain.maxHeight - terrain.minHeight),
        );
        line.textContent = `${metres} m`;
      }
    }
  });
}

/* ------------------------------------------------------------------ */
/* Depth — a flat photograph given a camera move                        */
/* ------------------------------------------------------------------ */

/**
 * Slices the photograph into horizontal bands and slides each by how near it
 * is to the camera (bottom of frame = nearest). A real street photograph
 * gains a believable dolly for the cost of one JPEG. Production would drive
 * the offsets from a generated depth map rather than screen position.
 */
async function demoDepth(root: HTMLElement): Promise<void> {
  const s = stage(root);
  if (!s) return;
  const img = await loadImage(root.dataset.src ?? "");
  const BANDS = 44;

  let px = 0;
  root.addEventListener("pointermove", (event) => {
    const rect = root.getBoundingClientRect();
    px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  });
  root.addEventListener("pointerleave", () => {
    px = 0;
  });

  let eased = 0;
  loop(root, (t) => {
    const { ctx, w, h } = s;
    // With no pointer, the camera drifts on its own so the tile is alive in
    // a screenshot and on a phone.
    const target = px || Math.sin(t * 0.42) * 0.75;
    eased += (target - eased) * 0.08;

    ctx.clearRect(0, 0, w, h);
    const scale = Math.max(w / img.width, h / img.height) * 1.12;
    const dw = img.width * scale;
    const dh = img.height * scale;
    const ox = (w - dw) / 2;
    const oy = (h - dh) / 2;

    for (let i = 0; i < BANDS; i += 1) {
      const y0 = (i / BANDS) * img.height;
      const bandH = img.height / BANDS;
      // near = 1 at the bottom of frame, 0 at the horizon
      const near = i / (BANDS - 1);
      const shift = eased * 26 * Math.pow(near, 1.7);
      ctx.drawImage(
        img,
        0,
        y0,
        img.width,
        bandH + 1,
        ox + shift,
        oy + (y0 / img.height) * dh,
        dw,
        dh / BANDS + 1,
      );
    }
  });
}

/* ------------------------------------------------------------------ */
/* Rebuild — before becomes after, brick by brick                       */
/* ------------------------------------------------------------------ */

/**
 * The before/after handover as a build rather than a wipe: the old page is
 * taken apart in tiles on a diagonal wave and the new one lands in its place.
 * Replaces the drag-slider on the homepage proof fold and every transformation.
 */
async function demoRebuild(root: HTMLElement): Promise<void> {
  const s = stage(root);
  if (!s) return;
  const [before, after] = await Promise.all([
    loadImage(root.dataset.before ?? ""),
    loadImage(root.dataset.after ?? ""),
  ]);
  const label = root.querySelector<HTMLElement>("[data-rebuild-label]");
  const COLS = 14;
  const ROWS = 9;
  const CYCLE = 7.2;

  // Page screenshots are anchored to the top of frame: the first screen is
  // the thing being judged, so it must never be cropped away.
  const cover = (img: HTMLImageElement, w: number, h: number) => {
    const scale = Math.max(w / img.width, h / img.height);
    return {
      dw: img.width * scale,
      dh: img.height * scale,
      ox: (w - img.width * scale) / 2,
      oy: 0,
    };
  };

  loop(root, (t) => {
    const { ctx, w, h } = s;
    const phase = (t % CYCLE) / CYCLE;
    // 0.00–0.55 build, 0.55–1.00 hold on the new page
    const sweep = smoothstep(0.05, 0.55, phase);

    const b = cover(before, w, h);
    ctx.drawImage(before, b.ox, b.oy, b.dw, b.dh);

    const a = cover(after, w, h);
    const tw = w / COLS;
    const th = h / ROWS;
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const wave = (col / COLS) * 0.65 + (row / ROWS) * 0.35;
        const local = smoothstep(wave * 0.8, wave * 0.8 + 0.3, sweep);
        if (local <= 0) continue;
        ctx.save();
        ctx.globalAlpha = local;
        // tiles drop the last few pixels into place
        const drop = (1 - local) * 10;
        ctx.beginPath();
        ctx.rect(col * tw, row * th, tw + 0.5, th + 0.5);
        ctx.clip();
        ctx.drawImage(after, a.ox, a.oy - drop, a.dw, a.dh);
        ctx.restore();
      }
    }

    if (label) label.textContent = sweep < 0.5 ? "Today" : "The concept";
  });
}

/* ------------------------------------------------------------------ */
/* Lights — the review dataset as the picture                           */
/* ------------------------------------------------------------------ */

interface Point {
  lat: number;
  lon: number;
  lit: boolean;
}

/**
 * Every reviewed business at its real coordinates: lit if it has a website of
 * its own, dark if we could not find one. The claim and the image are the same
 * dataset, so the picture can never say something the data does not.
 */
function demoLights(root: HTMLElement, points: Point[]): void {
  const s = stage(root);
  if (!s || points.length === 0) return;

  const lats = points.map((p) => p.lat);
  const lons = points.map((p) => p.lon);
  const latMin = Math.min(...lats);
  const latMax = Math.max(...lats);
  const lonMin = Math.min(...lons);
  const lonMax = Math.max(...lons);

  loop(root, (t) => {
    const { ctx, w, h } = s;
    ctx.clearRect(0, 0, w, h);
    const pad = 18;
    const iw = w - pad * 2;
    const ih = h - pad * 2;

    points.forEach((p, i) => {
      const x = pad + ((p.lon - lonMin) / (lonMax - lonMin || 1)) * iw;
      const y = pad + (1 - (p.lat - latMin) / (latMax - latMin || 1)) * ih;
      // the dark ones arrive first, then the lit ones come up one by one
      const delay = p.lit ? 1.2 + (i % 90) * 0.045 : (i % 60) * 0.012;
      const on = smoothstep(delay, delay + 0.5, t % 12);

      if (!p.lit) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 165, 176, ${0.5 * on})`;
        ctx.fill();
        return;
      }

      const flicker = 0.85 + Math.sin(t * 1.7 + i) * 0.15;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
      glow.addColorStop(0, `rgba(255, 196, 106, ${0.85 * on * flicker})`);
      glow.addColorStop(1, "rgba(255, 196, 106, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 9, y - 9, 18, 18);
      ctx.beginPath();
      ctx.arc(x, y, 1.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 233, 199, ${on})`;
      ctx.fill();
    });
  });
}

/* ------------------------------------------------------------------ */
/* Tideline — the page knows what the bay is doing                      */
/* ------------------------------------------------------------------ */

/**
 * Sky, sea and tide drawn for the visitor's actual local time, with the real
 * ridgeline on the horizon. Production would read a published tide table for
 * Dundrum Bay; the demo uses a plain 12h25m harmonic, which is the shape but
 * not the truth, and says so on the tile.
 */
function demoTide(root: HTMLElement): void {
  const s = stage(root);
  if (!s) return;
  const readout = root.querySelector<HTMLElement>("[data-tide-readout]");

  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  // dawn 6, noon 13, dusk 21 — a 0–1 daylight curve
  const light = Math.max(0, Math.sin(((hour - 5) / 16) * Math.PI));
  const dusk = smoothstep(0.45, 0.05, light);

  const mix = (a: number[], b: number[], k: number) =>
    `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",")})`;

  loop(root, (t) => {
    const { ctx, w, h } = s;
    const horizon = h * 0.52;

    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, mix([13, 21, 43], [150, 190, 214], light));
    sky.addColorStop(1, mix([46, 40, 62], [222, 234, 240], light));
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon);

    if (dusk > 0.2) {
      const sun = ctx.createRadialGradient(
        w * 0.24,
        horizon - 6,
        0,
        w * 0.24,
        horizon - 6,
        h * 0.5,
      );
      sun.addColorStop(0, `rgba(255, 176, 92, ${0.55 * dusk})`);
      sun.addColorStop(1, "rgba(255, 176, 92, 0)");
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, w, horizon);
    }

    // the real Mournes on the horizon, same data as the ridgeline demo
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    for (let i = 0; i < SKYLINE.length; i += 1) {
      ctx.lineTo(
        (i / (SKYLINE.length - 1)) * w,
        horizon - SKYLINE[i] * h * 0.30,
      );
    }
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fillStyle = mix([10, 16, 28], [58, 84, 98], light * 0.7);
    ctx.fill();

    const sea = ctx.createLinearGradient(0, horizon, 0, h);
    sea.addColorStop(0, mix([12, 20, 34], [64, 106, 126], light));
    sea.addColorStop(1, mix([6, 11, 20], [30, 60, 78], light));
    ctx.fillStyle = sea;
    ctx.fillRect(0, horizon, w, h - horizon);

    // tide: one full 12h25m cycle, plus swell
    const tide = Math.sin((hour / 12.42) * Math.PI * 2) * 0.5 + 0.5;
    const waterline = horizon + (h - horizon) * (0.62 - tide * 0.22);
    for (let x = 0; x <= w; x += 4) {
      const swell =
        Math.sin(x * 0.05 + t * 1.3) * 1.6 + Math.sin(x * 0.017 - t * 0.7) * 2.4;
      ctx.fillStyle = `rgba(255,255,255,${0.10 + 0.06 * light})`;
      ctx.fillRect(x, waterline + swell, 3, 1.4);
    }
    // Wet sand below the waterline — dark at night, pale at noon, and graded
    // so it reads as ground rather than as a bar across the tile.
    const sand = ctx.createLinearGradient(0, waterline, 0, h);
    sand.addColorStop(0, mix([8, 12, 18], [186, 176, 158], 0.1 + light * 0.55));
    sand.addColorStop(1, mix([3, 6, 10], [214, 206, 190], 0.05 + light * 0.5));
    ctx.fillStyle = sand;
    ctx.fillRect(0, waterline + 8, w, h);

    if (readout) {
      readout.textContent = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} · tide ${tide > 0.5 ? "making" : "ebbing"}`;
    }
  });
}

/* ------------------------------------------------------------------ */
/* Weather — headline type worked on by the wind                        */
/* ------------------------------------------------------------------ */

/**
 * The headline is drawn to a canvas and pushed about by an onshore wind: the
 * letters hold their shape but the air moves through them. Costs one canvas
 * per headline and no media at all.
 */
function demoWeather(root: HTMLElement): void {
  const s = stage(root);
  if (!s) return;
  const word = root.dataset.word ?? "Newcastle";

  const buffer = document.createElement("canvas");
  const bctx = buffer.getContext("2d");
  if (!bctx) return;

  loop(root, (t) => {
    const { ctx, w, h } = s;
    if (buffer.width !== w || buffer.height !== h) {
      buffer.width = w;
      buffer.height = h;
    }
    bctx.clearRect(0, 0, w, h);
    const size = Math.min(h * 0.5, (w / word.length) * 1.55);
    bctx.font = `600 ${size}px "Antonio Variable", "Arial Narrow", sans-serif`;
    bctx.textAlign = "center";
    bctx.textBaseline = "middle";
    bctx.fillStyle = "#132029";
    bctx.fillText(word, w / 2, h / 2);

    ctx.clearRect(0, 0, w, h);
    // one scanline at a time, displaced by a travelling gust
    for (let y = 0; y < h; y += 1) {
      const gust =
        Math.sin(y * 0.06 + t * 1.9) * 3.2 +
        Math.sin(y * 0.013 - t * 0.9) * 5.5 +
        Math.sin(t * 0.4) * 2;
      ctx.drawImage(buffer, 0, y, w, 1, gust, y, w, 1);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Voice — a spoken walkthrough that moves the page                     */
/* ------------------------------------------------------------------ */

interface Cue {
  at: number;
  text: string;
  focus: string;
}

const HUGH_CUES: Cue[] = [
  { at: 0, text: "This is Hugh McCann's, on Newcastle's Main Street.", focus: "name" },
  { at: 4.6, text: "Today, the page opens on a stock photograph and a phone number.", focus: "before" },
  { at: 10.2, text: "Here, it opens on the room itself — the bar at dusk, the way you'd find it walking in.", focus: "hero" },
  { at: 17.4, text: "Then, one line down, the thing people actually came for: are you open, and can I book a table?", focus: "action" },
];

/**
 * A narrated walkthrough where the audio drives the page: as the voice reaches
 * each part it lights up. Sound is opt-in — nothing plays until the visitor
 * presses play — and every word is on screen as a caption, so the tile works
 * silently too.
 */
function demoVoice(root: HTMLElement): void {
  const audio = root.querySelector("audio");
  const button = root.querySelector<HTMLButtonElement>("[data-voice-play]");
  const caption = root.querySelector<HTMLElement>("[data-voice-caption]");
  const zones = Array.from(root.querySelectorAll<HTMLElement>("[data-zone]"));
  if (!audio || !button || !caption) return;

  const setCue = (time: number) => {
    let cue = HUGH_CUES[0];
    for (const c of HUGH_CUES) if (time >= c.at) cue = c;
    caption.textContent = cue.text;
    zones.forEach((zone) => {
      zone.dataset.active = String(zone.dataset.zone === cue.focus);
    });
  };

  setCue(0);
  button.addEventListener("click", () => {
    if (audio.paused) void audio.play();
    else audio.pause();
  });
  audio.addEventListener("play", () => {
    button.dataset.state = "playing";
  });
  audio.addEventListener("pause", () => {
    button.dataset.state = "paused";
  });
  audio.addEventListener("ended", () => {
    button.dataset.state = "paused";
    setCue(0);
  });
  audio.addEventListener("timeupdate", () => setCue(audio.currentTime));
}

/* ------------------------------------------------------------------ */
/* Film — a generated establishing shot, per business                   */
/* ------------------------------------------------------------------ */

/** Plays the clip while the tile is on screen, and never with sound. */
function demoFilm(root: HTMLElement): void {
  const video = root.querySelector("video");
  if (!video) return;
  video.muted = true;
  if (reducedMotion()) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    },
    { rootMargin: "80px" },
  );
  observer.observe(root);
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

export function mountShowcase(): void {
  const pointsEl = document.getElementById("showcase-points");
  const points: Point[] = pointsEl?.textContent
    ? JSON.parse(pointsEl.textContent)
    : [];

  document.querySelectorAll<HTMLElement>("[data-demo]").forEach((root) => {
    switch (root.dataset.demo) {
      case "ridgeline":
        demoRidgeline(root);
        break;
      case "depth":
        void demoDepth(root);
        break;
      case "rebuild":
        void demoRebuild(root);
        break;
      case "lights":
        demoLights(root, points);
        break;
      case "tide":
        demoTide(root);
        break;
      case "weather":
        demoWeather(root);
        break;
      case "voice":
        demoVoice(root);
        break;
      case "film":
        demoFilm(root);
        break;
    }
  });
}
