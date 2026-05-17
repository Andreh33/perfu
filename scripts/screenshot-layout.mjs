// Phase 3 — captures full-page screenshots of the global layout at desktop
// for ES, AR and a mobile breakpoint for the hamburger menu open state.
//
// Usage:  node scripts/screenshot-layout.mjs
// Requires: dev server on http://localhost:3000 + playwright chromium.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/screenshots");
const BASE = process.env.PERFU_URL ?? "http://localhost:3000";

async function shoot(browser, { name, path, viewport, fullPage, before }) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    hasTouch: viewport.width < 768,
    isMobile: viewport.width < 768,
  });
  const page = await ctx.newPage();
  const url = `${BASE}${path}`;
  console.log(`→ ${name}  ${url}  ${viewport.width}x${viewport.height}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(600);
  if (typeof before === "function") {
    await before(page);
    await page.waitForTimeout(700);
  }
  const out = resolve(OUT_DIR, name);
  await page.screenshot({ path: out, fullPage });
  console.log(`  saved → ${out}`);
  await ctx.close();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    await shoot(browser, {
      name: "home-es-layout.png",
      path: "/",
      viewport: { width: 1440, height: 2400 },
      fullPage: true,
    });
    await shoot(browser, {
      name: "home-en-layout.png",
      path: "/en",
      viewport: { width: 1440, height: 2400 },
      fullPage: true,
    });
    await shoot(browser, {
      name: "home-ar-layout.png",
      path: "/ar",
      viewport: { width: 1440, height: 2400 },
      fullPage: true,
    });
    await shoot(browser, {
      name: "home-mobile.png",
      path: "/",
      viewport: { width: 390, height: 844 },
      fullPage: false,
    });
    await shoot(browser, {
      name: "home-mobile-menu.png",
      path: "/",
      viewport: { width: 390, height: 844 },
      fullPage: false,
      before: async (page) => {
        // Open hamburger menu — the only `lg:hidden` button inside <nav>.
        await page.locator("nav button.lg\\:hidden").first().click({
          force: true,
        });
      },
    });
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
