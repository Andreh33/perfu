// Captures full-page screenshots of /styleguide at desktop + mobile breakpoints.
// Usage: node scripts/screenshot-styleguide.mjs
// Requires: dev server running on http://localhost:3000 and playwright chromium installed.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/screenshots");
const URL = process.env.STYLEGUIDE_URL ?? "http://localhost:3000/styleguide";

const targets = [
  { name: "styleguide-1440.png", width: 1440, height: 900, dpr: 1 },
  { name: "styleguide-mobile.png", width: 390, height: 844, dpr: 2 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const t of targets) {
      const ctx = await browser.newContext({
        viewport: { width: t.width, height: t.height },
        deviceScaleFactor: t.dpr,
      });
      const page = await ctx.newPage();
      console.log(`→ ${t.name}  @ ${t.width}x${t.height}`);
      await page.goto(URL, { waitUntil: "networkidle", timeout: 30_000 });
      // Allow fonts + any client-only paint to settle.
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(400);
      const out = resolve(OUT_DIR, t.name);
      await page.screenshot({ path: out, fullPage: true });
      console.log(`  saved → ${out}`);
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
