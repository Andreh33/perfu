// Verify the conic rotation is visible: capture 6 frames over 12 s and
// the user should see the gold gradient rotated in each.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("docs/screenshots/motion", { recursive: true });
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(5500);

for (const t of [0, 2, 4, 6, 8, 12]) {
  await page.waitForTimeout(t === 0 ? 0 : 2000);
  await page.screenshot({ path: `docs/screenshots/motion/t-${String(t).padStart(2, "0")}s.png` });
  console.log(`t=${t}s captured`);
}

await browser.close();
