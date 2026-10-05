// Turns the photos in media/originals into small AVIF + WebP files the site serves.
// Run automatically before `npm run dev` and `npm run build`. Only changed photos are re-encoded.
//
// To add a photo: drop a .jpg/.png into media/originals (long side 2000–2400 px is plenty),
// then reference it by file name (without extension) in src/content.
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "media", "originals");
const outDir = path.join(root, "public", "img");
const manifestPath = path.join(root, "src", "content", "generated", "images.json");
const WIDTHS = [480, 960, 1440, 1920, 2400];

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
  const widths = WIDTHS.filter((w) => w <= width);
  if (widths.length === 0 || widths.at(-1) < width) widths.push(width);

  for (const w of widths) {
    for (const [ext, opts] of [["avif", { quality: 50, effort: 4 }], ["webp", { quality: 72 }]]) {
      const out = path.join(outDir, `${name}-${w}.${ext}`);
      if (await newer(out, src)) continue;
      await sharp(src).rotate().resize({ width: w })[ext](opts).toFile(out);
    }
  }
  manifest[name] = { width, height, widths };
}

async function buildBrand() {
  const emblem = path.join(srcDir, "emblem.png");
  const brandDir = path.join(root, "public", "brand");
  await mkdir(brandDir, { recursive: true });
  for (const w of [120, 240]) {
    await sharp(emblem).resize({ width: w }).webp({ quality: 88 }).toFile(path.join(brandDir, `emblem-${w}.webp`));
  }
  // Square app icons: emblem on the livery navy.
  const icon = async (size, file) => {
    const inner = await sharp(emblem).resize({ width: Math.round(size * 0.86), height: Math.round(size * 0.86), fit: "inside" }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: "#131A35" } })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toFile(path.join(root, "src", "app", file));
  };
  await icon(64, "icon.png");
  await icon(180, "apple-icon.png");
}

await mkdir(outDir, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });
const manifest = {};
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith("emblem."));
for (const f of files.sort()) await buildPhoto(f, manifest);
await buildBrand();
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`images: ${files.length} photos ready in public/img`);
