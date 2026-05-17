// Merge messages/{en,es,ar}.json from git stage 2 (ours) and stage 3 (theirs).
// HEAD has preloader+atelier+maison; theirs (B6) has preloader+perfumeur+bespoke+boutique+journal+concierge+legal.
// Strategy: deep merge with theirs adding new top-level keys; ours wins on collisions for preloader (identical anyway).
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const locales = ["en", "es", "ar"];

function getStage(file, stage) {
  return JSON.parse(execSync(`git show :${stage}:${file}`, { encoding: "utf8" }));
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key]) &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      deepMerge(target[key], source[key]);
    } else if (target[key] === undefined) {
      target[key] = source[key];
    }
    // collision on primitive: ours wins (preloader strings identical anyway).
  }
  return target;
}

for (const locale of locales) {
  const file = `messages/${locale}.json`;
  const ours = getStage(file, 2);
  const theirs = getStage(file, 3);
  const merged = deepMerge(ours, theirs);
  writeFileSync(file, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`${locale}: ${Object.keys(merged).length} top-level keys`);
}
