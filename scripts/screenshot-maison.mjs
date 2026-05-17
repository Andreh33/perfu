import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:3015";

const targets = [
  { url: `${BASE}/maison`, file: "maison-es.png", w: 1440, h: 4800 },
  { url: `${BASE}/en/maison`, file: "maison-en.png", w: 1440, h: 4800 },
  { url: `${BASE}/ar/maison`, file: "maison-ar.png", w: 1440, h: 4800 },
  { url: `${BASE}/en/maison`, file: "maison-mobile.png", w: 390, h: 6000 },
];

await mkdir("docs/screenshots", { recursive: true });

const browser = await chromium.launch();

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    // Give Next.js a moment to settle images.
    try {
      await page.waitForLoadState("load", { timeout: 30_000 });
    } catch {}
    await page.waitForTimeout(4000);
    await page.screenshot({
      path: `docs/screenshots/${t.file}`,
      fullPage: true,
    });
    console.log(`OK ${t.file}`);
  } catch (e) {
    console.error(`FAIL ${t.file}`, e);
  } finally {
    await ctx.close();
  }
}

await browser.close();
