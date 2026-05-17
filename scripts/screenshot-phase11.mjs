// Quick screenshot run for Phase 11 routes. Uses chromium directly so it
// works without a playwright config file. Run with:
//   PORT=3016 node scripts/screenshot-phase11.mjs
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const PORT = process.env.PORT ?? "3016";
const BASE = `http://localhost:${PORT}`;
const OUT = resolve(process.cwd(), "docs/screenshots");

const SHOTS = [
  ["perfumeur-es", "/perfumeur"],
  ["bespoke-es", "/bespoke"],
  ["boutique-es", "/boutique"],
  ["journal-es", "/journal"],
  ["concierge-es", "/concierge"],
  ["concierge-from-boutique-es", "/concierge?from=boutique"],
  ["legal-privacy-es", "/legal/privacy"],
  ["not-found-es", "/this-page-does-not-exist"],
];

function locateChromium() {
  // playwright-core ships an installer/cli; query for chromium path.
  const res = spawnSync(
    "node",
    [
      resolve(
        process.cwd(),
        "../../../node_modules/playwright-core/cli.js",
      ),
      "install",
      "chromium",
      "--with-deps",
    ],
    { stdio: "inherit" },
  );
  if (res.status !== 0) console.warn("chromium install returned non-zero");
}

async function main() {
  await mkdir(OUT, { recursive: true });
  try {
    var browser = await chromium.launch();
  } catch (err) {
    console.log("Chromium not installed, attempting install…", err.message);
    locateChromium();
    browser = await chromium.launch();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "es-ES",
  });
  const page = await context.newPage();

  for (const [name, path] of SHOTS) {
    const url = `${BASE}${path}`;
    console.log(`→ ${name}: ${url}`);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: resolve(OUT, `${name}.png`),
      fullPage: true,
    });
  }

  // Easter-egg shot: force the toast by directly dispatching the velocity
  // signal via window.scrollTo() rapidly while on the bespoke page.
  console.log("→ patience-easter-egg");
  await page.goto(`${BASE}/bespoke`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const spacer = document.createElement("div");
    spacer.style.height = "8000px";
    document.body.appendChild(spacer);
  });
  // Use real wheel events through the mouse API so Lenis sees them.
  for (let i = 0; i < 25; i += 1) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(8);
  }
  await page.waitForTimeout(400);
  await page.screenshot({
    path: resolve(OUT, "easter-egg-patience.png"),
    fullPage: false,
  });

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
