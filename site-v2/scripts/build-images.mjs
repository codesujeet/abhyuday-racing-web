// Turns the photos in media/originals into small AVIF + WebP files in public/photos,
// writes src/content/generated/images.json, makes the logo/icon/share images,
// and draws the labelled placeholder SVGs in public/placeholders.
// Runs automatically before `npm run dev` and `npm run build`. Only changed photos are re-encoded.
//
// To add a photo: drop a .jpg/.png into media/originals (long side 2000–2400 px is plenty)
// and use its file name (without extension) in src/content. See CONTENT_GUIDE.md.
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "media", "originals");
const outDir = path.join(root, "public", "photos");
const brandDir = path.join(root, "public", "brand");
const phDir = path.join(root, "public", "placeholders");
const manifestPath = path.join(root, "src", "content", "generated", "images.json");
const WIDTHS = [480, 960, 1440, 1920];

// Every placeholder the site can show. Name = the photo name used in src/content.
// Drop media/originals/<name>.jpg in and the placeholder is replaced automatically.
const PLACEHOLDERS = [
  { name: "team-group", w: 1600, h: 900, label: "Team group photo", spec: "16:9 · JPG · 2400×1350" },
  { name: "car-2024-ebaja", w: 1600, h: 1000, label: "2024 eBAJA car", spec: "16:10 · JPG · 2400×1500" },
  { name: "car-2025-abaja", w: 1600, h: 1000, label: "2025 aBAJA car", spec: "16:10 · JPG · 2400×1500" },
  { name: "car-2027-next", w: 1600, h: 1000, label: "2027 car — under wraps", spec: "16:10 · JPG · 2400×1500" },
  { name: "portrait", w: 800, h: 1000, label: "Portrait", spec: "4:5 · JPG · 800×1000" },
  { name: "natrax-endurance", w: 1200, h: 900, label: "NATRAX endurance run", spec: "4:3 · JPG · 2000×1500" },
  { name: "womens-endurance-2025", w: 1200, h: 900, label: "Women's endurance run, 2025", spec: "4:3 · JPG · 2000×1500" },
  { name: "news-coverage", w: 1200, h: 900, label: "News coverage", spec: "4:3 · JPG · 2000×1500" },
  { name: "achievements-2025-1", w: 1200, h: 900, label: "aBAJA 2025 photo", spec: "4:3 · JPG · 2000×1500" },
  { name: "achievements-2025-2", w: 1200, h: 900, label: "eBAJA 2025 photo", spec: "4:3 · JPG · 2000×1500" },
  { name: "achievements-2024-1", w: 1200, h: 900, label: "2024 car unveiling", spec: "4:3 · JPG · 2000×1500" },
  { name: "achievements-2024-2", w: 1200, h: 900, label: "2024 team photo", spec: "4:3 · JPG · 2000×1500" },
  { name: "hero-video", w: 1600, h: 900, label: "Hero video", spec: "16:9 · MP4 (H.264) · ≤ 8 MB · 10–20 s loop" },
];

async function newer(out, src) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

async function buildPhoto(file, manifest) {
  const name = path.parse(file).name;
  const src = path.join(srcDir, file);
  const meta = await sharp(src).rotate().metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, 2400));

  for (const w of widths) {
    for (const [ext, opts] of [["avif", { quality: 48, effort: 4 }], ["webp", { quality: 72 }]]) {
      const out = path.join(outDir, `${name}-${w}.${ext}`);
      if (await newer(out, src)) continue;
      await sharp(src).rotate().resize({ width: w }).toFormat(ext, opts).toFile(out);
    }
  }
  // Tiny blurred preview shown while the real photo loads.
  const blur = await sharp(src).rotate().resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  manifest[name] = { width, height, widths, blur: `data:image/webp;base64,${blur.toString("base64")}` };
}

async function buildBrand(manifest) {
  const emblem = path.join(srcDir, "emblem.png");
  await mkdir(brandDir, { recursive: true });
  for (const w of [160, 320, 640]) {
    await sharp(emblem).resize({ width: w }).webp({ quality: 90 }).toFile(path.join(brandDir, `emblem-${w}.webp`));
  }
  await sharp(emblem).resize({ width: 512 }).png().toFile(path.join(brandDir, "emblem-512.png"));
  // Square app icons: emblem on carbon black.
  const icon = async (size, file) => {
    const inner = await sharp(emblem).resize({ width: Math.round(size * 0.9), height: Math.round(size * 0.9), fit: "inside" }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: "#0A0B0F" } })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toFile(file);
  };
  await icon(64, path.join(root, "src", "app", "icon.png"));
  await icon(180, path.join(root, "src", "app", "apple-icon.png"));
  await icon(512, path.join(brandDir, "icon-512.png"));

  // Open Graph / Twitter share image: the hero photo, darkened, with the emblem.
  const hero = path.join(srcDir, "hero-a10-aeb-run.jpg");
  if (manifest["hero-a10-aeb-run"]) {
    const logo = await sharp(emblem).resize({ width: 300 }).toBuffer();
    const shade = Buffer.from(
      `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0A0B0F" stop-opacity=".92"/><stop offset=".6" stop-color="#0A0B0F" stop-opacity=".35"/><stop offset="1" stop-color="#0A0B0F" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect y="610" width="1200" height="20" fill="#EE7234"/><text x="60" y="440" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="76" fill="#fff">TEAM ABHYUDAY RACING</text><text x="62" y="500" font-family="Consolas, monospace" font-size="26" fill="#EE7234" letter-spacing="4">RISE. CONQUER. REPEAT.</text></svg>`,
    );
    await sharp(hero)
      .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
      .composite([{ input: shade }, { input: logo, left: 60, top: 70 }])
      .jpeg({ quality: 82 })
      .toFile(path.join(root, "public", "og.jpg"));
  }
}

function placeholderSvg({ w, h, label, spec, name }) {
  const fs = Math.round(Math.min(w, h) / 13);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
<pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#EE7234" fill-opacity=".22"/></pattern>
<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#171A22"/><stop offset="1" stop-color="#0D0F14"/></linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#b)"/>
<rect width="${w}" height="${h}" fill="url(#d)"/>
<g stroke="#EE7234" stroke-width="4" fill="none">
<path d="M40 100V40h60"/><path d="M${w - 100} 40h60v60"/><path d="M40 ${h - 100}v60h60"/><path d="M${w - 100} ${h - 40}h60v-60"/>
</g>
<text x="50%" y="46%" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="${fs}" fill="#F4F5F7">${label.toUpperCase()}</text>
<text x="50%" y="46%" dy="${Math.round(fs * 1.1)}" text-anchor="middle" font-family="Consolas, monospace" font-size="${Math.round(fs * 0.42)}" fill="#EE7234" letter-spacing="2">PLACEHOLDER · ${spec}</text>
<text x="50%" y="${h - 60}" text-anchor="middle" font-family="Consolas, monospace" font-size="${Math.round(fs * 0.36)}" fill="#8A90A0">${name === "hero-video" ? "public/media/hero.mp4" : `media/originals/${name}.jpg`}</text>
</svg>`;
}

await mkdir(outDir, { recursive: true });
await mkdir(phDir, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });
const manifest = {};
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith("emblem."));
for (const f of files.sort()) await buildPhoto(f, manifest);
await buildBrand(manifest);
for (const p of PLACEHOLDERS) await writeFile(path.join(phDir, `${p.name}.svg`), placeholderSvg(p));
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`images: ${files.length} photos ready in public/photos, ${PLACEHOLDERS.length} placeholders`);
