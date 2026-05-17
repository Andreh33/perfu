// Submit the bespoke and concierge forms via the live dev server and verify
// the Server Actions return the expected reference codes.
import { chromium } from "playwright-core";
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";

const PORT = process.env.PORT ?? "3016";
const BASE = `http://localhost:${PORT}`;
const OUT = resolve(process.cwd(), "docs/screenshots");
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// BESPOKE
await page.goto(`${BASE}/bespoke`, { waitUntil: "networkidle" });
await page.fill('input[name="name"]', "Andrés Rubio");
await page.fill('input[name="email"]', "andres@example.com");
await page.fill('input[name="phone"]', "+34 600 000 000");
await page.locator('input[name="families"][value="oud"]').check();
await page.locator('input[name="families"][value="amber"]').check();
await page.locator('input[name="budget"][value="mid"]').check();
await page.locator('input[name="timeline"][value="q2"]').check();
await page.fill(
  'textarea[name="message"]',
  "Quiero un perfume que recuerde a un domingo en Hamra.",
);
await page.click('button[type="submit"]');
await page.waitForTimeout(900);
const bespokeOk = await page.locator("text=/BSP-/").count();
console.log("bespokeOk count:", bespokeOk);
await page.screenshot({
  path: resolve(OUT, "bespoke-success.png"),
  fullPage: true,
});

// CONCIERGE
await page.goto(`${BASE}/concierge?from=boutique`, { waitUntil: "networkidle" });
await page.fill('input[name="name"]', "Andrés Rubio");
await page.fill('input[name="email"]', "andres@example.com");
// subject already prefilled
await page.fill(
  'textarea[name="message"]',
  "Me gustaría reservar una visita el próximo lunes a las 11:00.",
);
await page.click('button[type="submit"]');
await page.waitForTimeout(900);
const conciergeOk = await page.locator("text=/CNC-/").count();
console.log("conciergeOk count:", conciergeOk);
await page.screenshot({
  path: resolve(OUT, "concierge-success.png"),
  fullPage: true,
});

await browser.close();
