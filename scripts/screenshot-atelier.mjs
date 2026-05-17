import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "docs", "screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  const ctxDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const ctxMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  const targets = [
    { url: "http://localhost:3014/atelier", file: "atelier-es.png", ctx: ctxDesktop },
    { url: "http://localhost:3014/en/atelier", file: "atelier-en.png", ctx: ctxDesktop },
    { url: "http://localhost:3014/ar/atelier", file: "atelier-ar.png", ctx: ctxDesktop },
    { url: "http://localhost:3014/atelier", file: "atelier-mobile.png", ctx: ctxMobile },
  ];

  for (const t of targets) {
    const page = await t.ctx.newPage();
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 60_000 });
    // give animations a brief moment to settle
    await page.waitForTimeout(800);
    await page.screenshot({
      path: resolve(outDir, t.file),
      fullPage: true,
    });
    console.log("captured", t.file);
    await page.close();
  }
} finally {
  await browser.close();
}
