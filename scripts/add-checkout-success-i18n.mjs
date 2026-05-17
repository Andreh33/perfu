// Add `checkout_success` namespace to the three locale files.
import { readFileSync, writeFileSync } from "node:fs";

const payload = {
  en: {
    eyebrow: "ORDER · CONFIRMED",
    title: "The atelier thanks you.",
    ordered: "Your acquisition of {name} is on its way.",
    body: "We hand-wrap and number every flacon before it leaves. Expect delivery within seven working days. A confirmation has reached your inbox.",
    cta_continue: "RETURN TO THE ATELIER →",
    cta_concierge: "MESSAGE THE CONCIERGE →",
  },
  es: {
    eyebrow: "PEDIDO · CONFIRMADO",
    title: "El atelier te agradece.",
    ordered: "Tu adquisición de {name} ya viaja hacia ti.",
    body: "Cada frasco se envuelve y numera a mano antes de partir. Llega en un máximo de siete días laborables. Recibirás la confirmación por correo.",
    cta_continue: "VOLVER AL ATELIER →",
    cta_concierge: "ESCRIBIR AL CONCIERGE →",
  },
  ar: {
    eyebrow: "الطلب · مؤكَّد",
    title: "الورشة تشكرك.",
    ordered: "اقتناؤك لعطر {name} في طريقه إليك.",
    body: "نُغلِّف كل قارورة بأيدينا ونرقّمها قبل أن تغادر الورشة. التوصيل خلال سبعة أيام عمل كحدٍّ أقصى. وصلتك رسالة التأكيد على بريدك.",
    cta_continue: "العودة إلى الورشة ←",
    cta_concierge: "مراسلة الكونسيرج ←",
  },
};

for (const [locale, content] of Object.entries(payload)) {
  const file = `messages/${locale}.json`;
  const json = JSON.parse(readFileSync(file, "utf8"));
  if (json.checkout_success) {
    console.log(`${locale}: already present, skipping`);
    continue;
  }
  json.checkout_success = content;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`${locale}: added checkout_success namespace`);
}
