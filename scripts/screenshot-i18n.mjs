// Captures the homepage at desktop for each locale (es default, en, ar RTL).
// Usage: node scripts/screenshot-i18n.mjs
// Requires: dev server running on http://localhost:3000 + playwright chromium.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/screenshots");
const BASE = process.env.PERFU_URL ?? "http://localhost:3000";

const targets = [
  { name: "home-es.png", path: "/" },
  { name: "home-en.png", path: "/en" },
  { name: "home-ar.png", path: "/ar" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const t of targets) {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      const url = `${BASE}${t.path}`;
      console.log(`→ ${t.name}  ${url}`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
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
