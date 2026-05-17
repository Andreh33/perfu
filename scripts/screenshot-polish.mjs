// Capture full-page screenshots of the polished home and atelier at 1440x900
// (desktop) and 390x844 (mobile) so I can review the warm-bg + ambient gold
// visual lift without needing to load the production URL in a real browser.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = "docs/screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function shot(path, route, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(url + route, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(opts.wait ?? 5000);
  await page.screenshot({ path, fullPage: opts.full ?? false });
  console.log(path);
  await ctx.close();
}

await shot(`${outDir}/polish-home-desktop.png`, "/", { width: 1440, height: 900 });
await shot(`${outDir}/polish-home-mobile.png`, "/", { width: 390, height: 844 });
await shot(`${outDir}/polish-atelier-desktop.png`, "/atelier", { width: 1440, height: 900 }, { full: false, wait: 6000 });
await shot(`${outDir}/polish-product-desktop.png`, "/atelier/layla-noir", { width: 1440, height: 900 }, { wait: 7000 });
await shot(`${outDir}/polish-maison-desktop.png`, "/maison", { width: 1440, height: 900 }, { wait: 5000 });

await browser.close();
console.log("done");
