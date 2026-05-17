// Add missing perfumer.works.{first,second} keys for elkhoury + belaid in all 3 locales.
import { readFileSync, writeFileSync } from "node:fs";

const works = {
  en: {
    elkhoury: { first: "Beirut, Sept.", second: "Cèdre du Chouf" },
    belaid: { first: "Tariqa", second: "Atlas Smoke" },
  },
  es: {
    elkhoury: { first: "Beirut, sept.", second: "Cèdre du Chouf" },
    belaid: { first: "Tariqa", second: "Humo del Atlas" },
  },
  ar: {
    elkhoury: { first: "بيروت، أيلول.", second: "أرز الشوف" },
    belaid: { first: "طريقة", second: "دخان الأطلس" },
  },
};

for (const locale of ["en", "es", "ar"]) {
  const file = `messages/${locale}.json`;
  const json = JSON.parse(readFileSync(file, "utf8"));
  const perfumers = json.perfumeur?.perfumers;
  if (!perfumers) {
    console.error(`${locale}: perfumeur.perfumers missing`);
    continue;
  }
  perfumers.elkhoury.works = works[locale].elkhoury;
  perfumers.belaid.works = works[locale].belaid;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`${locale}: added works for elkhoury + belaid`);
}
