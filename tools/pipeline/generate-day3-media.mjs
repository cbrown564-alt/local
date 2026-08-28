import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..", "..");
const pnpmDir = path.join(root, "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((entry) => entry.startsWith("sharp@"));
if (!sharpDir) throw new Error("Sharp not found in node_modules/.pnpm");
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const images = [
  // 1. Serenity Day Spa
  {
    slug: "serenity-newcastle",
    filename: "serenity-newcastle-hero-spa.jpg",
    width: 1600,
    height: 900,
    title: "SERENITY DAY SPA",
    subtitle: "55–57 Central Promenade · Newcastle",
    kicker: "SEASIDE SANCTUARY · DERMALOGICA · CND SHELLAC · MASSAGE",
    palette: {
      bgTop: "#1c2e28",
      bgBottom: "#0e1814",
      accent: "#76a894",
      accentSoft: "#a3c8b8",
      text: "#f0f6f3",
      overlay: "rgba(18, 32, 27, 0.4)",
    },
    motif: "spa",
  },
  {
    slug: "serenity-newcastle",
    filename: "serenity-newcastle-treatment-detail.jpg",
    width: 1200,
    height: 900,
    title: "TREATMENT RITUALS",
    subtitle: "Dermalogica Skincare · Hot Basalt Stones · Aromatherapy",
    kicker: "THE HOUR, HELD QUIET OVER THE SEA WALL",
    palette: {
      bgTop: "#253b34",
      bgBottom: "#13211c",
      accent: "#8ebaa7",
      accentSoft: "#b8d9cb",
      text: "#f4f8f6",
      overlay: "rgba(22, 38, 32, 0.35)",
    },
    motif: "stones",
  },
  {
    slug: "serenity-newcastle",
    filename: "serenity-newcastle-manicure-suite.jpg",
    width: 1200,
    height: 800,
    title: "CND SHELLAC & NAIL SUITE",
    subtitle: "Precision Manicures · Pedicures · Coastal Lounge",
    kicker: "QUIET APPOINTMENT SUITE · REAR PARKING ACCESS",
    palette: {
      bgTop: "#2a3d36",
      bgBottom: "#16231e",
      accent: "#9fc6b5",
      accentSoft: "#cbe3d8",
      text: "#f7faf8",
      overlay: "rgba(25, 42, 36, 0.35)",
    },
    motif: "manicure",
  },

  // 2. Shimna Café
  {
    slug: "shimna-cafe",
    filename: "shimna-cafe-hero-terrace.jpg",
    width: 1600,
    height: 900,
    title: "SHIMNA CAFÉ",
    subtitle: "2 Main Street · Newcastle Footbridge",
    kicker: "BREAKFAST ALL DAY · BRUNCH · RIVER TERRACE DINING",
    palette: {
      bgTop: "#3a2818",
      bgBottom: "#1c1208",
      accent: "#d4924b",
      accentSoft: "#eabf8a",
      text: "#fff9f2",
      overlay: "rgba(38, 22, 10, 0.4)",
    },
    motif: "river-cafe",
  },
  {
    slug: "shimna-cafe",
    filename: "shimna-cafe-breakfast-fry.jpg",
    width: 1200,
    height: 900,
    title: "THE MOURNE MORNING PASS",
    subtitle: "Traditional Ulster Fry · Sourdough & Poached Eggs",
    kicker: "SERVED ALL DAY EVERY DAY · WALK-IN WELCOME",
    palette: {
      bgTop: "#422e1a",
      bgBottom: "#20140a",
      accent: "#df9e57",
      accentSoft: "#f0caa0",
      text: "#fff8f0",
      overlay: "rgba(45, 28, 12, 0.35)",
    },
    motif: "breakfast",
  },
  {
    slug: "shimna-cafe",
    filename: "shimna-cafe-catering-platter.jpg",
    width: 1200,
    height: 800,
    title: "COUNCIL & EVENT PLATTERS",
    subtitle: "Artisan Sourdough Sandwiches · Scone & Pastry Trays",
    kicker: "DIRECT CATERING INTAKE · LOCAL DELIVERY",
    palette: {
      bgTop: "#352415",
      bgBottom: "#1a1007",
      accent: "#c9853e",
      accentSoft: "#e3b37d",
      text: "#fdf7f0",
      overlay: "rgba(35, 20, 8, 0.35)",
    },
    motif: "platters",
  },

  // 3. Vintage etc.
  {
    slug: "vintage-etc",
    filename: "vintage-etc-hero-trove.jpg",
    width: 1600,
    height: 900,
    title: "VINTAGE ETC.",
    subtitle: "4 Main Street · Newcastle",
    kicker: "MID CENTURY TEAK · MARITIME BRASS · VINYL VAULT",
    palette: {
      bgTop: "#2b221a",
      bgBottom: "#140e0a",
      accent: "#c89456",
      accentSoft: "#e5bf8c",
      text: "#fdf8f2",
      overlay: "rgba(30, 22, 16, 0.4)",
    },
    motif: "trove",
  },
  {
    slug: "vintage-etc",
    filename: "vintage-etc-teak-credenza.jpg",
    width: 1200,
    height: 900,
    title: "1950s–1970s MID CENTURY TEAK",
    subtitle: "G-Plan Sideboards · Danish Dining · Reclaimed Brass",
    kicker: "CURATED COLLECTOR PIECES · ONE-OF-A-KIND FLOOR STOCK",
    palette: {
      bgTop: "#33261c",
      bgBottom: "#18100b",
      accent: "#d69f5e",
      accentSoft: "#ecc796",
      text: "#fffaf4",
      overlay: "rgba(36, 25, 17, 0.35)",
    },
    motif: "credenza",
  },
  {
    slug: "vintage-etc",
    filename: "vintage-etc-vinyl-crates.jpg",
    width: 1200,
    height: 800,
    title: "THE CRATE: VINTAGE VINYL",
    subtitle: "Original Pressing LPs · Rock, Jazz & Soul · Turntables",
    kicker: "DAILY DISCOVERIES ANNOUNCED ON FEED",
    palette: {
      bgTop: "#261d15",
      bgBottom: "#120d09",
      accent: "#ba8449",
      accentSoft: "#deb07b",
      text: "#fdf7f0",
      overlay: "rgba(26, 18, 12, 0.35)",
    },
    motif: "vinyl",
  },

  // 4. Smalls Butchers+Deli
  {
    slug: "smalls-butchers",
    filename: "smalls-butchers-hero-counter.jpg",
    width: 1600,
    height: 900,
    title: "SMALLS BUTCHERS + DELI",
    subtitle: "The Shopping Centre · Main Street, Newcastle",
    kicker: "PRIME MOURNE DRY-AGED CUTS · ARTISAN SAUSAGES · HOT DELI",
    palette: {
      bgTop: "#331616",
      bgBottom: "#170808",
      accent: "#c45858",
      accentSoft: "#e28c8c",
      text: "#fcf4f4",
      overlay: "rgba(35, 12, 12, 0.4)",
    },
    motif: "butcher-block",
  },
  {
    slug: "smalls-butchers",
    filename: "smalls-butchers-dry-aged-rib.jpg",
    width: 1200,
    height: 900,
    title: "MOURNE MEAT PROVENANCE",
    subtitle: "Dry-Aged Prime Beef Rib · Artisan Link Sausages",
    kicker: "HAND-TRIMMED BY MASTER BUTCHERS · LOCAL FARM HERITAGE",
    palette: {
      bgTop: "#3a1919",
      bgBottom: "#1b0a0a",
      accent: "#cf6262",
      accentSoft: "#ea9696",
      text: "#fdf6f6",
      overlay: "rgba(40, 14, 14, 0.35)",
    },
    motif: "ribeye",
  },
  {
    slug: "smalls-butchers",
    filename: "smalls-butchers-hot-carvery.jpg",
    width: 1200,
    height: 800,
    title: "HOT LUNCH CARVERY & DELI",
    subtitle: "Fresh Carved Roast Rolls · Stuffing & Gravy · Daily Trays",
    kicker: "THE RETURN RITUAL · SHOPPING CENTRE COUNTER",
    palette: {
      bgTop: "#2f1414",
      bgBottom: "#140707",
      accent: "#ba4f4f",
      accentSoft: "#db8282",
      text: "#fbf3f3",
      overlay: "rgba(30, 10, 10, 0.35)",
    },
    motif: "carvery",
  },

  // 5. Cookie Jar / Mourne and Bread
  {
    slug: "cookie-jar",
    filename: "cookie-jar-hero-bakery.jpg",
    width: 1600,
    height: 900,
    title: "COOKIE JAR BAKERY",
    subtitle: "121 Main Street · Newcastle",
    kicker: "WARM STONE OVENS · TRADITIONAL WHEATEN · MOURNE & BREAD",
    palette: {
      bgTop: "#3b2c1a",
      bgBottom: "#1a1208",
      accent: "#d4984f",
      accentSoft: "#ecc287",
      text: "#fffaf4",
      overlay: "rgba(40, 28, 14, 0.4)",
    },
    motif: "bakery-hearth",
  },
  {
    slug: "cookie-jar",
    filename: "cookie-jar-wheaten-slice.jpg",
    width: 1200,
    height: 900,
    title: "SIGNATURE IRISH WHEATEN",
    subtitle: "Warm Loaves from the Morning Ovens · Churned Country Butter",
    kicker: "THE LOAF NEWCASTLE KNOWS · FRESH ON THE COUNTER DAILY",
    palette: {
      bgTop: "#42321e",
      bgBottom: "#1f150a",
      accent: "#de9f55",
      accentSoft: "#f2c992",
      text: "#fffaf5",
      overlay: "rgba(45, 32, 16, 0.35)",
    },
    motif: "wheaten",
  },
  {
    slug: "cookie-jar",
    filename: "cookie-jar-bread-mix-pack.jpg",
    width: 1200,
    height: 800,
    title: "MOURNE AND BREAD MAIL-ORDER KITS",
    subtitle: "Wheaten, Soda & Scone Kits · Dispatched Nationwide",
    kicker: "THE MAIN STREET RECIPE · BAKE AT HOME IN 35 MINUTES",
    palette: {
      bgTop: "#362716",
      bgBottom: "#181007",
      accent: "#cb8e44",
      accentSoft: "#e6b87b",
      text: "#fdf8f1",
      overlay: "rgba(35, 24, 11, 0.35)",
    },
    motif: "bread-mix",
  },
];

function generateSvgPlate(spec) {
  const { width, height, title, subtitle, kicker, palette, motif } = spec;

  let visualGraphic = "";
  if (motif.includes("spa") || motif.includes("stones")) {
    visualGraphic = `
      <g opacity="0.35">
        <circle cx="${width * 0.75}" cy="${height * 0.5}" r="${height * 0.35}" fill="none" stroke="${palette.accentSoft}" stroke-width="2" stroke-dasharray="8 12"/>
        <circle cx="${width * 0.75}" cy="${height * 0.5}" r="${height * 0.22}" fill="none" stroke="${palette.accent}" stroke-width="3"/>
        <path d="M${width * 0.62} ${height * 0.58} Q ${width * 0.75} ${height * 0.38} ${width * 0.88} ${height * 0.58}" fill="none" stroke="${palette.accentSoft}" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="${width * 0.75}" cy="${height * 0.52}" rx="${width * 0.08}" ry="${height * 0.04}" fill="${palette.accent}" opacity="0.6"/>
        <ellipse cx="${width * 0.75}" cy="${height * 0.46}" rx="${width * 0.06}" ry="${height * 0.03}" fill="${palette.accentSoft}" opacity="0.75"/>
        <ellipse cx="${width * 0.75}" cy="${height * 0.41}" rx="${width * 0.04}" ry="${height * 0.02}" fill="${palette.text}" opacity="0.85"/>
      </g>
    `;
  } else if (motif.includes("cafe") || motif.includes("breakfast") || motif.includes("river")) {
    visualGraphic = `
      <g opacity="0.35">
        <path d="M${width * 0.55} ${height * 0.8} C ${width * 0.65} ${height * 0.6}, ${width * 0.75} ${height * 0.9}, ${width * 0.95} ${height * 0.65}" fill="none" stroke="${palette.accentSoft}" stroke-width="4"/>
        <path d="M${width * 0.55} ${height * 0.85} C ${width * 0.65} ${height * 0.65}, ${width * 0.75} ${height * 0.95}, ${width * 0.95} ${height * 0.7}" fill="none" stroke="${palette.accent}" stroke-width="2" stroke-dasharray="6 8"/>
        <circle cx="${width * 0.78}" cy="${height * 0.45}" r="${height * 0.25}" fill="none" stroke="${palette.accent}" stroke-width="3"/>
        <ellipse cx="${width * 0.78}" cy="${height * 0.45}" rx="${width * 0.12}" ry="${height * 0.14}" fill="${palette.accentSoft}" opacity="0.25"/>
        <circle cx="${width * 0.75}" cy="${height * 0.42}" r="${width * 0.035}" fill="${palette.accent}" opacity="0.8"/>
      </g>
    `;
  } else if (motif.includes("trove") || motif.includes("credenza") || motif.includes("vinyl")) {
    visualGraphic = `
      <g opacity="0.35">
        <rect x="${width * 0.62}" y="${height * 0.35}" width="${width * 0.3}" height="${height * 0.35}" rx="8" fill="none" stroke="${palette.accent}" stroke-width="3"/>
        <line x1="${width * 0.72}" y1="${height * 0.35}" x2="${width * 0.72}" y2="${height * 0.7}" stroke="${palette.accentSoft}" stroke-width="2"/>
        <line x1="${width * 0.82}" y1="${height * 0.35}" x2="${width * 0.82}" y2="${height * 0.7}" stroke="${palette.accentSoft}" stroke-width="2"/>
        <circle cx="${width * 0.77}" cy="${height * 0.52}" r="${height * 0.18}" fill="none" stroke="${palette.accentSoft}" stroke-width="1.5" stroke-dasharray="4 6"/>
        <circle cx="${width * 0.77}" cy="${height * 0.52}" r="8" fill="${palette.accent}"/>
        <line x1="${width * 0.65}" y1="${height * 0.7}" x2="${width * 0.63}" y2="${height * 0.8}" stroke="${palette.accent}" stroke-width="4" stroke-linecap="round"/>
        <line x1="${width * 0.89}" y1="${height * 0.7}" x2="${width * 0.91}" y2="${height * 0.8}" stroke="${palette.accent}" stroke-width="4" stroke-linecap="round"/>
      </g>
    `;
  } else if (motif.includes("butcher") || motif.includes("ribeye") || motif.includes("carvery")) {
    visualGraphic = `
      <g opacity="0.35">
        <rect x="${width * 0.62}" y="${height * 0.38}" width="${width * 0.3}" height="${height * 0.32}" rx="6" fill="${palette.accent}" opacity="0.2"/>
        <rect x="${width * 0.62}" y="${height * 0.38}" width="${width * 0.3}" height="${height * 0.32}" rx="6" fill="none" stroke="${palette.accentSoft}" stroke-width="3"/>
        <path d="M${width * 0.66} ${height * 0.54} Q ${width * 0.77} ${height * 0.42} ${width * 0.88} ${height * 0.54}" fill="none" stroke="${palette.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${width * 0.72} ${height * 0.38} L${width * 0.72} ${height * 0.7}" stroke="${palette.accentSoft}" stroke-width="1.5" stroke-dasharray="6 6"/>
        <path d="M${width * 0.82} ${height * 0.38} L${width * 0.82} ${height * 0.7}" stroke="${palette.accentSoft}" stroke-width="1.5" stroke-dasharray="6 6"/>
        <circle cx="${width * 0.77}" cy="${height * 0.54}" r="12" fill="${palette.accentSoft}"/>
      </g>
    `;
  } else {
    // Bakery
    visualGraphic = `
      <g opacity="0.35">
        <ellipse cx="${width * 0.76}" cy="${height * 0.54}" rx="${width * 0.14}" ry="${height * 0.16}" fill="${palette.accent}" opacity="0.25"/>
        <ellipse cx="${width * 0.76}" cy="${height * 0.54}" rx="${width * 0.14}" ry="${height * 0.16}" fill="none" stroke="${palette.accentSoft}" stroke-width="3"/>
        <path d="M${width * 0.68} ${height * 0.54} Q ${width * 0.76} ${height * 0.44} ${width * 0.84} ${height * 0.54}" fill="none" stroke="${palette.text}" stroke-width="3" stroke-linecap="round"/>
        <path d="M${width * 0.70} ${height * 0.60} Q ${width * 0.76} ${height * 0.50} ${width * 0.82} ${height * 0.60}" fill="none" stroke="${palette.accentSoft}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="${width * 0.76}" y1="${height * 0.32}" x2="${width * 0.76}" y2="${height * 0.40}" stroke="${palette.accent}" stroke-width="2" stroke-linecap="round"/>
        <line x1="${width * 0.73}" y1="${height * 0.33}" x2="${width * 0.74}" y2="${height * 0.41}" stroke="${palette.accentSoft}" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="${width * 0.79}" y1="${height * 0.33}" x2="${width * 0.78}" y2="${height * 0.41}" stroke="${palette.accentSoft}" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    `;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette.bgTop}"/>
          <stop offset="100%" stop-color="${palette.bgBottom}"/>
        </linearGradient>
        <radialGradient id="radialLight" cx="30%" cy="40%" r="70%">
          <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.35"/>
          <stop offset="60%" stop-color="${palette.bgTop}" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="${palette.bgBottom}" stop-opacity="0.8"/>
        </radialGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${palette.accent}"/>
          <stop offset="100%" stop-color="${palette.accentSoft}" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Background Base -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      <rect width="${width}" height="${height}" fill="url(#radialLight)"/>

      <!-- Architectural grid lines for depth -->
      <g stroke="${palette.accent}" stroke-width="0.75" opacity="0.15">
        <line x1="${width * 0.08}" y1="0" x2="${width * 0.08}" y2="${height}"/>
        <line x1="${width * 0.52}" y1="0" x2="${width * 0.52}" y2="${height}"/>
        <line x1="0" y1="${height * 0.15}" x2="${width}" y2="${height * 0.15}"/>
        <line x1="0" y1="${height * 0.85}" x2="${width}" y2="${height * 0.85}"/>
      </g>

      <!-- Geometric Motif / Graphic Graphic -->
      ${visualGraphic}

      <!-- Border Frame -->
      <rect x="${width * 0.04}" y="${height * 0.06}" width="${width * 0.92}" height="${height * 0.88}" fill="none" stroke="${palette.accentSoft}" stroke-width="1.2" opacity="0.4"/>
      <rect x="${width * 0.045}" y="${height * 0.07}" width="${width * 0.91}" height="${height * 0.86}" fill="none" stroke="${palette.accent}" stroke-width="0.6" opacity="0.25"/>

      <!-- Editorial Typography Content -->
      <g transform="translate(${width * 0.09}, ${height * 0.38})">
        <!-- Kicker -->
        <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(12, Math.round(width * 0.011))}" font-weight="700" letter-spacing="0.2em" fill="${palette.accentSoft}">
          ${escapeXml(kicker)}
        </text>

        <!-- Divider rule -->
        <line x1="0" y1="${height * 0.04}" x2="${width * 0.38}" y2="${height * 0.04}" stroke="url(#lineGrad)" stroke-width="2"/>

        <!-- Title -->
        <text x="0" y="${height * 0.15}" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.max(28, Math.round(width * 0.038))}" font-weight="600" letter-spacing="0.04em" fill="${palette.text}">
          ${escapeXml(title)}
        </text>

        <!-- Subtitle -->
        <text x="0" y="${height * 0.23}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(14, Math.round(width * 0.016))}" font-weight="400" letter-spacing="0.06em" fill="${palette.accentSoft}">
          ${escapeXml(subtitle)}
        </text>
      </g>

      <!-- Corner Accents -->
      <g stroke="${palette.accent}" stroke-width="1.5" opacity="0.6">
        <path d="M${width * 0.04} ${height * 0.1} L${width * 0.04} ${height * 0.06} L${width * 0.08} ${height * 0.06}"/>
        <path d="M${width * 0.96} ${height * 0.1} L${width * 0.96} ${height * 0.06} L${width * 0.92} ${height * 0.06}"/>
        <path d="M${width * 0.04} ${height * 0.9} L${width * 0.04} ${height * 0.94} L${width * 0.08} ${height * 0.94}"/>
        <path d="M${width * 0.96} ${height * 0.9} L${width * 0.96} ${height * 0.94} L${width * 0.92} ${height * 0.94}"/>
      </g>
    </svg>
  `;
}

async function main() {
  console.log("Generating high-resolution editorial plates for Day 3 concepts...");

  for (const item of images) {
    const dir = path.join(root, "public", "media", "concepts", item.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const svg = generateSvgPlate(item);
    const targetJpg = path.join(dir, item.filename);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(targetJpg);

    console.log(`Generated: ${path.relative(root, targetJpg)}`);

    // Generate responsive webp derivatives
    const stem = path.basename(item.filename, path.extname(item.filename));
    for (const w of [640, 1265]) {
      const targetWebp = path.join(dir, `${stem}-${w}.webp`);
      await sharp(targetJpg)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(targetWebp);
      console.log(`  -> ${path.relative(root, targetWebp)}`);
    }
  }

  console.log("Completed all Day 3 imagery generation.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
