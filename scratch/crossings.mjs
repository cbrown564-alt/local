// Find where the roads cross the rivers by dense bezier sampling.
const roads = [
  ["coast", `M 1190 140 C 1160 148, 1135 152, 1115 156 C 1025 201, 945 246, 848 290 C 760 330, 680 375, 600 415 C 540 445, 470 462, 400 477 C 340 490, 290 497, 240 506 C 200 513, 170 520, 140 528 C 130 530, 120 529, 110 528`],
  ["bryansford", `M 430 472 C 395 435, 358 388, 322 338 C 292 296, 260 278, 232 262`],
  ["main", `M 515 449 C 480 420, 455 395, 435 380 C 415 365, 395 372, 380 382 C 360 395, 348 408, 335 417 C 305 428, 278 428, 250 430 C 200 435, 160 485, 140 528`],
  ["cross", `M 340 414 C 343 397, 343 380, 341 363`],
];
const rivers = [
  ["shimna", `M 280 200 C 290 224, 302 246, 318 266 C 340 292, 366 322, 392 354 C 416 384, 438 416, 458 448 C 472 472, 488 498, 503 530`],
  ["moneycarragh", `M 815 45 C 838 82, 858 120, 874 158 C 888 195, 900 240, 908 278 C 911 292, 913 302, 914 310`],
];

const parse = (d) => {
  const nums = d.match(/-?\d+\.?\d*/g).map(Number);
  const segs = [];
  let cur = [nums[0], nums[1]];
  for (let i = 2; i < nums.length; i += 6) {
    segs.push([cur, [nums[i], nums[i + 1]], [nums[i + 2], nums[i + 3]], [nums[i + 4], nums[i + 5]]]);
    cur = [nums[i + 4], nums[i + 5]];
  }
  return segs;
};

const cubic = (seg, t) => {
  const [p0, p1, p2, p3] = seg;
  const u = 1 - t;
  return [
    u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
    u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
  ];
};

const sample = (d, n = 400) => {
  const segs = parse(d);
  const pts = [];
  segs.forEach((seg, si) => {
    for (let i = 0; i <= n; i += 1) pts.push(cubic(seg, i / n));
  });
  return pts;
};

for (const [rname, rd] of rivers) {
  const rpts = sample(rd);
  for (const [name, dd] of roads) {
    const pts = sample(dd);
    let best = null;
    for (const a of pts) {
      for (const b of rpts) {
        const dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (!best || dist < best.dist) best = { dist, x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2 };
      }
    }
    if (best.dist < 6) console.log(`${name} x ${rname}: crossing near (${best.x.toFixed(0)}, ${best.y.toFixed(0)}) gap=${best.dist.toFixed(1)}`);
    else console.log(`${name} x ${rname}: no crossing (min gap ${best.dist.toFixed(1)} at ${best.x.toFixed(0)},${best.y.toFixed(0)})`);
  }
}
