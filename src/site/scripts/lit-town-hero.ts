/**
 * Lit Town hero — a live 3D model of the Mournes sweeping down to Dundrum
 * Bay, with every reviewed local business as a point of light at its real
 * coordinates. Terrain comes from `src/site/data/mourne-terrain.json`
 * (baked from open SRTM-derived elevation by
 * `tools/pipeline/bake-mourne-terrain.mjs`); business points come from
 * `src/site/data/businesses.json` via the page.
 *
 * Used by the internal prototype at `/prototypes/home/lit-town/`.
 */
import * as THREE from "three";
import terrain from "../data/mourne-terrain.json";

export interface LitTownPoint {
  lat: number;
  lon: number;
  lit: boolean;
}

export type LitTownTime = "day" | "dusk" | "night";

export interface LitTownOptions {
  points: LitTownPoint[];
  time?: LitTownTime;
  reducedMotion?: boolean;
}

/** Metres per world unit — the whole stage is about 24 units across. */
const UNIT = 800;
/** Vertical exaggeration so the Mournes read at hero scale. */
const EXAGGERATION = 1.9;
const SWEEP_MS = 7500;
const SWEEP_DELAY_MS = 500;

const { bbox, width: GRID_W, height: GRID_H, heights } = terrain;
const LAT_MID = (bbox.latMin + bbox.latMax) / 2;
const LON_MID = (bbox.lonMin + bbox.lonMax) / 2;
const M_PER_LAT = 111132;
const M_PER_LON = 111320 * Math.cos((LAT_MID * Math.PI) / 180);
const SPAN_X = ((bbox.lonMax - bbox.lonMin) * M_PER_LON) / UNIT;
const SPAN_Z = ((bbox.latMax - bbox.latMin) * M_PER_LAT) / UNIT;

const toWorldX = (lon: number) => ((lon - LON_MID) * M_PER_LON) / UNIT;
const toWorldZ = (lat: number) => ((LAT_MID - lat) * M_PER_LAT) / UNIT;
const toWorldY = (metres: number) => (metres * EXAGGERATION) / UNIT;

/** Bilinear height (metres) at a lat/lon from the baked grid. */
const heightAt = (lat: number, lon: number): number => {
  const row = ((bbox.latMax - lat) / (bbox.latMax - bbox.latMin)) * (GRID_H - 1);
  const col = ((lon - bbox.lonMin) / (bbox.lonMax - bbox.lonMin)) * (GRID_W - 1);
  const r0 = Math.min(Math.max(Math.floor(row), 0), GRID_H - 2);
  const c0 = Math.min(Math.max(Math.floor(col), 0), GRID_W - 2);
  const dr = Math.min(Math.max(row - r0, 0), 1);
  const dc = Math.min(Math.max(col - c0, 0), 1);
  const h00 = heights[r0 * GRID_W + c0];
  const h10 = heights[r0 * GRID_W + c0 + 1];
  const h01 = heights[(r0 + 1) * GRID_W + c0];
  const h11 = heights[(r0 + 1) * GRID_W + c0 + 1];
  return (
    h00 * (1 - dc) * (1 - dr) +
    h10 * dc * (1 - dr) +
    h01 * (1 - dc) * dr +
    h11 * dc * dr
  );
};

interface Palette {
  fog: number;
  fogNear: number;
  fogFar: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  sunColor: number;
  sunIntensity: number;
  sunPosition: [number, number, number];
  /** Soft fill from the camera side so shadowed slopes keep their form. */
  fillColor: number;
  fillIntensity: number;
  fillPosition: [number, number, number];
  water: number;
  litColor: number;
  litIntensity: number;
  darkColor: number;
  darkOpacity: number;
}

const PALETTES: Record<LitTownTime, Palette> = {
  day: {
    fog: 0xb9cbd6,
    fogNear: 14,
    fogFar: 60,
    hemiSky: 0xe4eef5,
    hemiGround: 0x76837b,
    hemiIntensity: 1.15,
    sunColor: 0xfff3dd,
    sunIntensity: 1.5,
    sunPosition: [-6, 14, -4],
    fillColor: 0xdfe9f2,
    fillIntensity: 0.35,
    fillPosition: [10, 6, 8],
    water: 0x33566c,
    litColor: 0xffaa3d,
    litIntensity: 0.85,
    darkColor: 0x24435e,
    darkOpacity: 0.6,
  },
  dusk: {
    fog: 0x2c3050,
    fogNear: 13,
    fogFar: 62,
    hemiSky: 0x5a6699,
    hemiGround: 0x33383f,
    hemiIntensity: 1.7,
    sunColor: 0xff9a58,
    sunIntensity: 1.15,
    sunPosition: [-18, 3.4, -3],
    fillColor: 0x5566a0,
    fillIntensity: 0.65,
    fillPosition: [14, 5, 6],
    water: 0x14243a,
    litColor: 0xffb45c,
    litIntensity: 1.6,
    darkColor: 0x66799e,
    darkOpacity: 0.65,
  },
  night: {
    fog: 0x0b1020,
    fogNear: 13,
    fogFar: 60,
    hemiSky: 0x243254,
    hemiGround: 0x0e1219,
    hemiIntensity: 1.15,
    sunColor: 0xa9c0e6,
    sunIntensity: 0.6,
    sunPosition: [8, 12, 6],
    fillColor: 0x2c3d63,
    fillIntensity: 0.5,
    fillPosition: [12, 6, 8],
    water: 0x0b1626,
    litColor: 0xffb45c,
    litIntensity: 1.5,
    darkColor: 0x66799e,
    darkOpacity: 0.5,
  },
};

export const timeOfDayNow = (): LitTownTime => {
  const hour = new Date().getHours();
  if (hour >= 9 && hour < 17) return "day";
  if ((hour >= 17 && hour < 23) || (hour >= 5 && hour < 9)) return "dusk";
  return "night";
};

const smootherstep = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

const ramp = (t: number, from: number, to: number) =>
  Math.min(Math.max((t - from) / (to - from), 0), 1);

const TERRAIN_STOPS: Array<{ h: number; color: THREE.Color }> = [
  { h: -30, color: new THREE.Color(0x24343d) },
  { h: 0, color: new THREE.Color(0x5d6553) },
  { h: 3, color: new THREE.Color(0x877f63) },
  { h: 45, color: new THREE.Color(0x4b5c4c) },
  { h: 200, color: new THREE.Color(0x545743) },
  { h: 450, color: new THREE.Color(0x5c5546) },
  { h: 750, color: new THREE.Color(0x6e7076) },
];

const terrainColour = (metres: number, out: THREE.Color) => {
  for (let i = 0; i < TERRAIN_STOPS.length - 1; i += 1) {
    const a = TERRAIN_STOPS[i];
    const b = TERRAIN_STOPS[i + 1];
    if (metres <= b.h) {
      const t = Math.min(Math.max((metres - a.h) / (b.h - a.h), 0), 1);
      out.copy(a.color).lerp(b.color, t);
      return;
    }
  }
  out.copy(TERRAIN_STOPS[TERRAIN_STOPS.length - 1].color);
};

const buildTerrain = (): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(
    SPAN_X,
    SPAN_Z,
    GRID_W - 1,
    GRID_H - 1,
  );
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  const colours = new Float32Array(positions.count * 3);
  const swatch = new THREE.Color();
  for (let i = 0; i < positions.count; i += 1) {
    const metres = heights[i];
    positions.setY(i, toWorldY(metres));
    terrainColour(metres, swatch);
    colours[i * 3] = swatch.r;
    colours[i * 3 + 1] = swatch.g;
    colours[i * 3 + 2] = swatch.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3));
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
  });
  return new THREE.Mesh(geometry, material);
};

const WATER_SEGMENTS = 72;

const buildWater = (palette: Palette): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(
    SPAN_X,
    SPAN_Z,
    WATER_SEGMENTS,
    WATER_SEGMENTS,
  );
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({
    color: palette.water,
    roughness: 0.36,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.012;
  return mesh;
};

const animateWater = (water: THREE.Mesh, seconds: number) => {
  const positions = (water.geometry as THREE.PlaneGeometry).attributes.position;
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    positions.setY(
      i,
      Math.sin(x * 1.6 + seconds * 0.55) * 0.006 +
        Math.sin(z * 2.1 - seconds * 0.38) * 0.005,
    );
  }
  positions.needsUpdate = true;
  water.geometry.computeVertexNormals();
};

const POINT_VERTEX = /* glsl */ `
  attribute float phase;
  attribute float size;
  uniform float uTime;
  uniform float uScale;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.82 + 0.22 * sin(uTime * 1.35 + phase);
    gl_PointSize = size * uScale * vTwinkle / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.04, d);
    a *= a;
    gl_FragColor = vec4(uColor, a * uOpacity * vTwinkle);
  }
`;

interface PointCloud {
  object: THREE.Points;
  material: THREE.ShaderMaterial;
  targetOpacity: number;
}

const buildPointCloud = (
  points: LitTownPoint[],
  lit: boolean,
  palette: Palette,
): PointCloud => {
  const subset = points.filter((p) => p.lit === lit);
  const positions = new Float32Array(subset.length * 3);
  const phases = new Float32Array(subset.length);
  const sizes = new Float32Array(subset.length);
  subset.forEach((point, i) => {
    positions[i * 3] = toWorldX(point.lon);
    positions[i * 3 + 1] =
      toWorldY(Math.max(heightAt(point.lat, point.lon), 1)) + 0.03;
    positions[i * 3 + 2] = toWorldZ(point.lat);
    phases[i] = Math.random() * Math.PI * 2;
    sizes[i] = lit ? 0.115 + Math.random() * 0.05 : 0.06 + Math.random() * 0.02;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  const material = new THREE.ShaderMaterial({
    vertexShader: POINT_VERTEX,
    fragmentShader: POINT_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 600 },
      uColor: {
        value: new THREE.Color(lit ? palette.litColor : palette.darkColor),
      },
      uOpacity: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: lit ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const object = new THREE.Points(geometry, material);
  return {
    object,
    material,
    targetOpacity: lit ? palette.litIntensity : palette.darkOpacity,
  };
};

/**
 * Camera keyframes: start high over the ridge south-west of Slieve Donard
 * with the bay on the horizon, then sweep down and out over the water until
 * Newcastle's shoreline fills the frame.
 */
const CAMERA_FROM = new THREE.Vector3(-6.5, 5.2, 9.5);
const CAMERA_TO = new THREE.Vector3(6.2, 1.9, 1.4);
const LOOK_FROM = new THREE.Vector3(0.5, 0.35, 0.9);
const LOOK_TO = new THREE.Vector3(-1.0, 0.45, 1.5);

/**
 * Boot the scene into `container`. Returns false when WebGL is unavailable
 * so the page can show its static fallback instead.
 */
export const initLitTownHero = (
  container: HTMLElement,
  options: LitTownOptions,
): boolean => {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return false;
  }

  const time = options.time ?? timeOfDayNow();
  const palette = PALETTES[time];
  const reducedMotion =
    options.reducedMotion ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.classList.add("lt-canvas");
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(palette.fog, palette.fogNear, palette.fogFar);

  const hemisphere = new THREE.HemisphereLight(
    palette.hemiSky,
    palette.hemiGround,
    palette.hemiIntensity,
  );
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(palette.sunColor, palette.sunIntensity);
  sun.position.set(...palette.sunPosition);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(
    palette.fillColor,
    palette.fillIntensity,
  );
  fill.position.set(...palette.fillPosition);
  scene.add(fill);

  scene.add(buildTerrain());
  const water = buildWater(palette);
  scene.add(water);

  const litCloud = buildPointCloud(options.points, true, palette);
  const darkCloud = buildPointCloud(options.points, false, palette);
  scene.add(litCloud.object);
  scene.add(darkCloud.object);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  container.addEventListener("pointermove", (event) => {
    const rect = container.getBoundingClientRect();
    pointer.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  });
  container.addEventListener("pointerleave", () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
  });

  const setSize = () => {
    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    const scale = clientHeight * renderer.getPixelRatio() * 0.62;
    litCloud.material.uniforms.uScale.value = scale;
    darkCloud.material.uniforms.uScale.value = scale;
  };
  setSize();

  const cameraPosition = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  let phaseFlags = { lights: false, counts: false };

  const composeFrame = (sweepT: number, seconds: number) => {
    const eased = smootherstep(sweepT);
    cameraPosition.lerpVectors(CAMERA_FROM, CAMERA_TO, eased);
    lookTarget.lerpVectors(LOOK_FROM, LOOK_TO, eased);

    if (!reducedMotion && sweepT >= 1) {
      const drift = seconds * 0.12;
      cameraPosition.x += Math.sin(drift) * 0.14;
      cameraPosition.y += Math.sin(drift * 0.7) * 0.06;
      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;
      cameraPosition.x += pointer.x * 0.35;
      cameraPosition.y += -pointer.y * 0.18;
    }

    camera.position.copy(cameraPosition);
    camera.lookAt(lookTarget);

    litCloud.material.uniforms.uOpacity.value =
      litCloud.targetOpacity * ramp(sweepT, 0.52, 0.78);
    darkCloud.material.uniforms.uOpacity.value =
      darkCloud.targetOpacity * ramp(sweepT, 0.78, 0.98);
    litCloud.material.uniforms.uTime.value = seconds;
    darkCloud.material.uniforms.uTime.value = seconds;

    if (!phaseFlags.lights && sweepT >= 0.55) {
      phaseFlags = { ...phaseFlags, lights: true };
      container.classList.add("lt-lights-on");
    }
    if (!phaseFlags.counts && sweepT >= 0.85) {
      phaseFlags = { ...phaseFlags, counts: true };
      container.classList.add("lt-counts-on");
    }

    renderer.render(scene, camera);
  };

  if (reducedMotion) {
    animateWater(water, 0);
    composeFrame(1, 0);
    const observer = new ResizeObserver(() => {
      setSize();
      composeFrame(1, 0);
    });
    observer.observe(container);
    return true;
  }

  const started = performance.now() + SWEEP_DELAY_MS;
  let running = true;
  let frameHandle = 0;

  const tick = (now: number) => {
    if (!running) return;
    const seconds = now / 1000;
    const sweepT = Math.min(Math.max((now - started) / SWEEP_MS, 0), 1);
    animateWater(water, seconds);
    composeFrame(sweepT, seconds);
    frameHandle = requestAnimationFrame(tick);
  };
  frameHandle = requestAnimationFrame(tick);

  let inView = true;
  const applyRunning = () => {
    const next = inView && !document.hidden;
    if (next === running) return;
    running = next;
    if (running) {
      frameHandle = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frameHandle);
    }
  };

  const visibility = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      applyRunning();
    },
    { threshold: 0.05 },
  );
  visibility.observe(container);
  document.addEventListener("visibilitychange", applyRunning);

  const observer = new ResizeObserver(setSize);
  observer.observe(container);

  return true;
};

/**
 * Opt-in shore ambience, synthesised in the browser from filtered noise —
 * no recording and no download. A stand-in for a produced sound bed.
 */
export class ShoreSound {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;

  private buildLayer(
    context: AudioContext,
    noise: AudioBuffer,
    cutoffHz: number,
    swellRateHz: number,
    baseGain: number,
    swellDepth: number,
    destination: AudioNode,
  ) {
    const source = context.createBufferSource();
    source.buffer = noise;
    source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = cutoffHz;
    const gain = context.createGain();
    gain.gain.value = baseGain;
    const swell = context.createOscillator();
    swell.frequency.value = swellRateHz;
    const swellGain = context.createGain();
    swellGain.gain.value = swellDepth;
    swell.connect(swellGain);
    swellGain.connect(gain.gain);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    source.start();
    swell.start();
  }

  private ensureStarted() {
    if (this.context) return;
    const context = new AudioContext();
    const seconds = 4;
    const noise = context.createBuffer(
      1,
      context.sampleRate * seconds,
      context.sampleRate,
    );
    const channel = noise.getChannelData(0);
    let last = 0;
    for (let i = 0; i < channel.length; i += 1) {
      // Brown-ish noise: integrate white noise with leak, then soften.
      last = last * 0.985 + (Math.random() * 2 - 1) * 0.12;
      channel[i] = last;
    }
    const master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);
    this.buildLayer(context, noise, 340, 0.07, 0.5, 0.3, master);
    this.buildLayer(context, noise, 1500, 0.113, 0.1, 0.08, master);
    this.context = context;
    this.master = master;
  }

  toggle(): boolean {
    this.ensureStarted();
    if (!this.context || !this.master) return false;
    void this.context.resume();
    const gain = this.master.gain;
    const now = this.context.currentTime;
    const turningOn = gain.value < 0.05;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(turningOn ? 0.5 : 0, now + 1.4);
    return turningOn;
  }
}
