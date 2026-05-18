// Inject the new home-page namespaces (featured, stats, maison_teaser,
// pull_quote, newsletter) into each locale messages file.
import { readFileSync, writeFileSync } from "node:fs";

const payload = {
  en: {
    featured: {
      eyebrow: "FEATURED FRAGRANCES",
      title: "Three compositions worth slowing down for.",
      subtitle: "Hand-picked by the perfumer this season. Each one a different temperature.",
      from: "FROM",
      explore: "EXPLORE",
      see_all: "SEE ALL TWENTY",
    },
    stats: {
      eyebrow: "BY THE NUMBERS",
      title: "An atelier of patience.",
      fragrances: "FRAGRANCES",
      perfumers: "PERFUMERS",
      months_suffix: "M",
      months_label: "PER ESSENCE",
      cities: "CITIES",
    },
    maison_teaser: {
      eyebrow: "THE MAISON",
      title: "The fire does not transform the rose; it only convinces it to remember itself.",
      body_1: "We compose in oils, alone, until the final week. Eight perfumers, three workshops, twelve commissions a year. No more.",
      body_2: "From the morning harvest in Grasse to the wax-sealed flacon, every essence takes between fourteen and twenty-four months. We never release on a deadline.",
      cta: "READ THE LETTERS",
      image_alt: "Antique copper alembic at the maison's workshop.",
    },
    pull_quote: {
      quote: "Patience is not a virtue in our cellar. It is the only available material.",
      attribution: "MAÎTRE ANTOINE VASSEUR · PERFUMER",
    },
    newsletter: {
      eyebrow: "QUIET LIST",
      title: "For the rare and the rumored.",
      body: "New releases, perfumer interviews, private events. Three letters a year. No more.",
      placeholder: "your email",
      submit: "SUBSCRIBE",
      success: "RECEIVED. YOU ARE ON THE QUIET LIST.",
      error: "ENTER A VALID EMAIL.",
    },
  },
  es: {
    featured: {
      eyebrow: "FRAGANCIAS DESTACADAS",
      title: "Tres composiciones por las que vale la pena demorarse.",
      subtitle: "Seleccionadas por el perfumista esta temporada. Cada una a su temperatura.",
      from: "DESDE",
      explore: "EXPLORAR",
      see_all: "VER LAS VEINTE",
    },
    stats: {
      eyebrow: "POR LOS NÚMEROS",
      title: "Un atelier de paciencia.",
      fragrances: "FRAGANCIAS",
      perfumers: "PERFUMISTAS",
      months_suffix: "M",
      months_label: "POR ESENCIA",
      cities: "CIUDADES",
    },
    maison_teaser: {
      eyebrow: "LA MAISON",
      title: "El fuego no transforma la rosa; sólo la convence de recordarse a sí misma.",
      body_1: "Componemos en aceites, en silencio, hasta la última semana. Ocho perfumistas, tres talleres, doce encargos al año. No más.",
      body_2: "Desde la cosecha matinal en Grasse hasta el frasco sellado con cera, cada esencia tarda entre catorce y veinticuatro meses. Nunca lanzamos contra una fecha.",
      cta: "LEER LAS CARTAS",
      image_alt: "Alambique de cobre antiguo en el taller de la maison.",
    },
    pull_quote: {
      quote: "La paciencia no es una virtud en nuestra bodega. Es el único material disponible.",
      attribution: "MAÎTRE ANTOINE VASSEUR · PERFUMISTA",
    },
    newsletter: {
      eyebrow: "LISTA SILENCIOSA",
      title: "Para los singulares y los rumoreados.",
      body: "Nuevos lanzamientos, entrevistas con el perfumista, eventos privados. Tres cartas al año. No más.",
      placeholder: "tu correo",
      submit: "SUSCRIBIRSE",
      success: "RECIBIDO. ESTÁS EN LA LISTA SILENCIOSA.",
      error: "INTRODUCE UN CORREO VÁLIDO.",
    },
  },
  ar: {
    featured: {
      eyebrow: "العطور المختارة",
      title: "ثلاث تركيبات تستحقّ التمهّل.",
      subtitle: "اختارها العطّار لهذا الموسم. كلٌّ منها على حرارته.",
      from: "من",
      explore: "اكتشف",
      see_all: "اعرض العشرين كلّها",
    },
    stats: {
      eyebrow: "بالأرقام",
      title: "ورشةُ صبرٍ.",
      fragrances: "عطراً",
      perfumers: "عطّارين",
      months_suffix: "ش",
      months_label: "لكلّ خلاصة",
      cities: "مدن",
    },
    maison_teaser: {
      eyebrow: "الدار",
      title: "النارُ لا تُحوّل الوردة؛ بل تُقنعها أن تتذكّر نفسها.",
      body_1: "نُركّب في الزيوت، في الصمت، حتى الأسبوع الأخير. ثمانية عطّارين، ثلاث ورشات، اثنا عشر طلباً في السنة. لا أكثر.",
      body_2: "من حصاد فجر غراس حتى القارورة المختومة بالشمع، تستغرق كل خلاصة بين أربعة عشر وأربعة وعشرين شهراً. لا نُطلق إصداراً وفقاً لموعدٍ نهائي.",
      cta: "اقرأ الرسائل",
      image_alt: "إنبيقٌ نحاسي عتيق في ورشة الدار.",
    },
    pull_quote: {
      quote: "الصبر ليس فضيلةً في قبونا. إنه المادةُ الوحيدةُ المتاحة.",
      attribution: "أنطوان فاسور · العطّار",
    },
    newsletter: {
      eyebrow: "القائمة الهامسة",
      title: "للنادر وللهامس.",
      body: "إصدارات جديدة، مقابلات مع العطّار، مناسبات خاصة. ثلاث رسائل في السنة. لا أكثر.",
      placeholder: "بريدك الإلكتروني",
      submit: "اشترك",
      success: "وصلَنا. اسمك بين الأسماء النادرة.",
      error: "أدخل بريداً صحيحاً.",
    },
  },
};

for (const [locale, content] of Object.entries(payload)) {
  const file = `messages/${locale}.json`;
  const json = JSON.parse(readFileSync(file, "utf8"));
  json.home = json.home ?? {};
  for (const [k, v] of Object.entries(content)) json.home[k] = v;
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`${locale}: home.${Object.keys(content).join(",")} merged`);
}
