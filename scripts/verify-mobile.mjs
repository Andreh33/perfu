// Verify the home page in desktop (1440x900) and mobile (390x844),
// plus mobile scrolling, to confirm responsive design works.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("docs/screenshots/mobile-check", { recursive: true });
const browser = await chromium.launch({ headless: true });

// Desktop
const desktopCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const desktopPage = await desktopCtx.newPage();
await desktopPage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await desktopPage.waitForTimeout(5500);
await desktopPage.screenshot({ path: "docs/screenshots/mobile-check/desktop-hero.png" });
console.log("desktop hero");

// iPhone 13
const mobileCtx = await browser.newContext({ ...devices["iPhone 13"] });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await mobilePage.waitForTimeout(5500);

for (const y of [0, 800, 1800, 3000, 4500, 6000]) {
  await mobilePage.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await mobilePage.waitForTimeout(450);
  await mobilePage.screenshot({ path: `docs/screenshots/mobile-check/mobile-${String(y).padStart(5, "0")}.png` });
  console.log(`mobile y=${y}`);
}

await browser.close();
