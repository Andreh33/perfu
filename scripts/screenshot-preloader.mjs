// Phase 4 — captures the cinematic preloader at multiple moments of its
// lifetime so we can verify the choreography visually.
//
// Usage:    node scripts/screenshot-preloader.mjs
// Env:      PERFU_URL  (default http://localhost:3010)
//
// The script navigates to "/" four times (one ctx each) so timing is clean
// and each shot starts from a cold preloader instance.
//
//   600ms  → logo drawing + early progress (~0-25%)
//   1500ms → mid-loading (~50-75%)
//   2400ms → curtain rising or just dropped (post-100%)
//   3500ms → after reveal — hero visible

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/screenshots");
const BASE = process.env.PERFU_URL ?? "http://localhost:3010";

async function shoot(browser, { name, path = "/", viewport, waitMs }) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const url = `${BASE}${path}`;
  console.log(`→ ${name}  ${url}  wait=${waitMs}ms`);
  // Do NOT wait for networkidle — we want to capture the preloader *during*
  // its lifecycle. domcontentloaded is enough to start the rAF clock.
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(waitMs);
  const out = resolve(OUT_DIR, name);
  await page.screenshot({ path: out, fullPage: false });
  console.log(`  saved → ${out}`);
  await ctx.close();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const viewport = { width: 1440, height: 900 };
    await shoot(browser, { name: "preloader-600ms.png", viewport, waitMs: 600 });
    await shoot(browser, { name: "preloader-1500ms.png", viewport, waitMs: 1500 });
    await shoot(browser, { name: "preloader-2400ms.png", viewport, waitMs: 2400 });
    await shoot(browser, { name: "preloader-3500ms.png", viewport, waitMs: 3500 });
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
