/** Deterministic jitter — a hand-drawn wobble that does not change between
 *  builds, so drawn plates are byte-stable and diffable. First used for the
 *  Enniskeen woodland; handy for any scattered cluster (trees, buildings,
 *  sheep) that should look placed by hand rather than by grid. */
export const wobble = (seed: number, index: number, amount: number): number => {
  const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * 2 * amount;
};
