// Visit / , /atelier, /maison, /atelier/layla-noir — capture every console
// message + page error + failed network request. Print a digest so we know
// exactly what is broken before patching blind.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const routes = ["/", "/atelier", "/maison", "/atelier/layla-noir"];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const route of routes) {
  const page = await ctx.newPage();
  const errors = [];
  const warnings = [];
  const failed = [];
  page.on("pageerror", (e) => errors.push("[pageerror] " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("[console.error] " + m.text().slice(0, 300));
    else if (m.type() === "warning") warnings.push("[console.warn] " + m.text().slice(0, 200));
  });
  page.on("requestfailed", (r) => failed.push(`[netfail] ${r.method()} ${r.url().slice(0, 120)} — ${r.failure()?.errorText}`));
  page.on("response", (r) => {
    const s = r.status();
    if (s >= 400) failed.push(`[http${s}] ${r.url().slice(0, 120)}`);
  });
  try {
    await page.goto(url + route, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    errors.push("[goto] " + e.message);
  }
  await page.waitForTimeout(4500);
  console.log(`\n═══ ${route} ═══`);
  console.log(`errors: ${errors.length}, warnings: ${warnings.length}, network failed/4xx: ${failed.length}`);
  for (const e of errors.slice(0, 15)) console.log("  " + e);
  for (const f of failed.slice(0, 8)) console.log("  " + f);
  await page.close();
}
await browser.close();
