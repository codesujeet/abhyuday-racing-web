// Behaviour checks against the static build: nav links, active state, URL hash, mobile menu,
// preloader, reduced motion. Run after `npm run build` with `npx serve out -l 4173` running.
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:4173";
const OUT = path.resolve(import.meta.dirname, "..", "screenshots", "checks");
const IDS = ["home", "team", "achievements", "cars", "gallery", "partners", "support"];
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const fails = [];
const ok = (cond, msg) => (cond ? console.log("  ✓", msg) : (fails.push(msg), console.log("  ✗", msg)));

async function sectionState(page, id) {
  return page.evaluate((id) => {
    const top = Math.round(document.getElementById(id).getBoundingClientRect().top);
    const current = [...document.querySelectorAll(".nav-links a[aria-current='true']")].map((a) => a.getAttribute("href"));
    return { top, current, hash: location.hash, navH: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) };
  }, id);
}

for (const reduced of [false, true]) {
  console.log(`\nDesktop nav (1440px${reduced ? ", reduced motion" : ""})`);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduced ? "reduce" : "no-preference" });
  await ctx.addInitScript(() => sessionStorage.setItem("tar-preloaded", "1"));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  ok((await page.evaluate(() => document.documentElement.classList.contains("lenis"))) === !reduced, reduced ? "smooth scroll is off" : "smooth scroll (Lenis) is on");
  for (const id of [...IDS.slice(1), "home"]) {
    // The bar hides on scroll-down; a small scroll up brings it back, as a visitor would.
    await page.mouse.move(700, 400);
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(reduced ? 300 : 900);
    await page.click(`.nav-links a[href="#${id}"]`);
    await page.waitForTimeout(reduced ? 600 : 2200);
    const s = await sectionState(page, id);
    ok(Math.abs(s.top - (id === "home" ? 0 : s.navH)) <= 6, `${id}: lands at the top (offset ${s.top}px)`);
    ok(s.current.includes(`#${id}`), `${id}: nav item highlighted`);
    ok(id === "home" ? s.hash === "" : s.hash === `#${id}`, `${id}: URL hash is "${s.hash}"`);
  }
  await ctx.close();
}

console.log("\nMobile menu (390px)");
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(() => sessionStorage.setItem("tar-preloaded", "1"));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  ok(!(await page.isVisible(".nav-links")), "desktop links hidden on phones");
  const btn = page.locator(".menu-btn");
  const box = await btn.boundingBox();
  ok(box.height >= 44 && box.width >= 44, `menu button is ${Math.round(box.width)}×${Math.round(box.height)} (≥44)`);
  await btn.click();
  await page.waitForTimeout(900);
  ok(await page.isVisible("#mobile-menu"), "menu opens");
  ok((await page.evaluate(() => document.documentElement.style.overflow)) === "hidden", "page scroll locked while open");
  await page.screenshot({ path: path.join(OUT, "390-menu-open.png") });
  await page.click('#mobile-menu a[href="#cars"]');
  await page.waitForTimeout(2200);
  ok(!(await page.isVisible("#mobile-menu")), "menu closes after tapping a link");
  const s = await sectionState(page, "cars");
  ok(Math.abs(s.top - s.navH) <= 6, `scrolled to #cars (offset ${s.top}px)`);
  ok((await page.evaluate(() => document.documentElement.style.overflow)) === "", "page scroll unlocked");
  await btn.click();
  await page.waitForTimeout(700);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  ok(!(await page.isVisible("#mobile-menu")), "Escape closes the menu");
  await ctx.close();
}

console.log("\nPreloader (first visit)");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(BASE + "/");
  await page.waitForTimeout(350);
  ok(await page.isVisible(".preloader"), "preloader shows on first visit");
  await page.screenshot({ path: path.join(OUT, "1440-preloader.png") });
  await page.waitForSelector(".preloader", { state: "detached", timeout: 5000 });
  const took = Date.now() - t0;
  ok(took < 3200, `preloader gone after ${took} ms`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, "1440-after-preloader.png") });
  await page.reload();
  await page.waitForTimeout(300);
  ok(!(await page.isVisible(".preloader")), "not shown again in the same session");
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.waitForTimeout(300);
  ok(!(await page.isVisible(".preloader")), "skipped with reduced motion");
  await ctx.close();
}

console.log("\nCar page links");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem("tar-preloaded", "1"));
  const page = await ctx.newPage();
  const bad = [];
  page.on("response", (r) => r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`));
  await page.goto(BASE + "/#cars", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator('a[href="/cars/a10/"]').first().click();
  await page.waitForURL("**/cars/a10/");
  await page.waitForTimeout(1200);
  ok((await page.textContent("h1")).trim() === "A10", "home → A10 page navigates");
  await page.click('.nav-links a[href="/#achievements"]');
  await page.waitForTimeout(2500);
  const s = await sectionState(page, "achievements");
  ok(Math.abs(s.top - s.navH) <= 8, `car page nav → /#achievements lands on the section (offset ${s.top}px)`);
  ok(bad.length === 0, `no failed requests${bad.length ? ": " + bad.join(", ") : ""}`);
  await ctx.close();
}

await browser.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : "\nAll checks passed");
process.exitCode = fails.length ? 1 : 0;
