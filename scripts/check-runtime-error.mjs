// Visit /, wait for hydration + preloader exit, report any console errors
// or unhandled exceptions. Used to confirm the removeChild fix.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (err) => errors.push({ kind: "pageerror", message: err.message }));
page.on("console", (msg) => {
  if (msg.type() === "error") {
    errors.push({ kind: "console.error", message: msg.text() });
  }
});

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(5000); // let preloader finish exit + hero hydrate

console.log(`URL: ${url}`);
console.log(`Total errors: ${errors.length}`);
for (const e of errors) {
  console.log(`  [${e.kind}] ${e.message.slice(0, 200)}`);
}

await browser.close();
process.exit(errors.length > 0 ? 1 : 0);
