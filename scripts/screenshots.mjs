// Screenshots of every section at phone and desktop widths, plus a car page.
// 1. npm run build   2. npx serve out -l 4173   3. npm run shots
// Optional args: --base=http://localhost:4173 --widths=390,1440 --reduced
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1] ?? d;
const BASE = arg("base", "http://localhost:4173");
const WIDTHS = arg("widths", "390,1440").split(",").map(Number);
const REDUCED = process.argv.includes("--reduced");
const OUT = path.resolve(import.meta.dirname, "..", "screenshots", REDUCED ? "reduced" : "default");
const SECTIONS = ["home", "team", "achievements", "cars", "gallery", "partners", "support"];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const errors = [];

for (const width of WIDTHS) {
  const height = width < 768 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: REDUCED ? "reduce" : "no-preference" });
  // Skip the preloader for section shots (it is tested separately).
  await ctx.addInitScript(() => sessionStorage.setItem("tar-preloaded", "1"));
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push(`[${width}] ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`[${width}] ${e.message}`));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) errors.push(`[${width}] horizontal overflow ${overflow}px`);

  for (const id of SECTIONS) {
    const box = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, h: r.height };
    }, id);
    const steps = Math.min(8, Math.max(1, Math.ceil(box.h / (height * 0.95))));
    for (let i = 0; i < steps; i++) {
      const y = Math.round(box.top + i * height * 0.95);
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(1300);
      await page.screenshot({ path: path.join(OUT, `${width}-${id}-${i + 1}.png`) });
    }
  }
  await ctx.close();
}

// A car detail page.
for (const width of WIDTHS) {
  const height = width < 768 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: REDUCED ? "reduce" : "no-preference" });
  await ctx.addInitScript(() => sessionStorage.setItem("tar-preloaded", "1"));
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[car ${width}] ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`[car ${width}] ${m.text()}`));
  await page.goto(BASE + "/cars/a10/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (over > 0) errors.push(`[car ${width}] horizontal overflow ${over}px`);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0, y = 0; y < total && i < 8; i++, y += height * 0.95) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(OUT, `${width}-car-a10-${i + 1}.png`) });
  }
  await ctx.close();
}

await browser.close();
console.log(errors.length ? `Problems:\n${errors.join("\n")}` : "No console errors, no horizontal overflow.");
console.log(`Screenshots in ${OUT}`);
