// Capture home page at multiple time slices: 0 ms (cold), 800 ms (preloader),
// 2500 ms (preloader exiting), 5000 ms (hero settled), 8000 ms (animations
// running). Lets us see the visual progression frame-by-frame.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
mkdirSync("docs/screenshots/frames", { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

// Start capturing the moment we navigate. Don't wait for networkidle.
await page.goto(url, { waitUntil: "commit", timeout: 30000 });

const stamps = [200, 800, 1500, 2500, 3500, 5000, 7000, 10000];
for (const ms of stamps) {
  await page.waitForTimeout(ms - (stamps[stamps.indexOf(ms) - 1] ?? 0));
  await page.screenshot({ path: `docs/screenshots/frames/home-${String(ms).padStart(5, "0")}ms.png` });
  console.log(`captured ${ms}ms`);
}

// Also scroll a bit and capture
await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
await page.waitForTimeout(600);
await page.screenshot({ path: `docs/screenshots/frames/home-scrolled-800.png` });
console.log("captured scrolled-800");

await browser.close();
console.log("done");
