// Lighthouse (mobile) for the home page and a car page, using Playwright's Chromium.
// With `npm start` running: node scripts/lighthouse.mjs   → screenshots/lighthouse/*.json
import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:4173";
const PAGES = [
  ["/", "home"],
  ["/cars/a10/", "car-a10"],
];
await mkdir("screenshots/lighthouse", { recursive: true });
const browser = await chromium.launch({ args: ["--remote-debugging-port=9223"] });

const run = (url, out) =>
  new Promise((resolve) => {
    const p = spawn(
      "npx",
      ["-y", "lighthouse@12", url, "--port=9223", "--quiet", "--output=json", `--output-path=${out}`, "--only-categories=performance,accessibility,best-practices,seo"],
      { shell: true, stdio: "ignore" },
    );
    p.on("exit", resolve);
  });

for (const [path, name] of PAGES) {
  const out = `screenshots/lighthouse/${name}.json`;
  await run(BASE + path, out);
  const r = JSON.parse(await readFile(out, "utf8"));
  console.log(`${path}  ` + Object.values(r.categories).map((c) => `${c.title} ${Math.round(c.score * 100)}`).join(" · "));
  console.log(
    "   " + ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift"].map((k) => `${k.split("-").map((w) => w[0].toUpperCase()).join("")} ${r.audits[k].displayValue}`).join(" · "),
  );
}
await browser.close();
