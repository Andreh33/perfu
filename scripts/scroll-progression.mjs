// Scroll progressively through the home page and capture frames to see if
// the Manifesto, sections, footer etc render correctly past the Hero.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("docs/screenshots/scroll", { recursive: true });
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
// Wait for preloader to settle
await page.waitForTimeout(5500);

const scrollPositions = [0, 600, 1200, 1800, 2400, 3200, 4200, 5500, 7500];
for (const y of scrollPositions) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `docs/screenshots/scroll/y-${String(y).padStart(5, "0")}.png` });
  console.log(`y=${y}`);
}

// Also capture max scroll
const maxY = await page.evaluate(() => document.body.scrollHeight);
console.log(`document.body.scrollHeight = ${maxY}`);
await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), maxY);
await page.waitForTimeout(450);
await page.screenshot({ path: `docs/screenshots/scroll/y-bottom.png` });

await browser.close();
console.log("done");
