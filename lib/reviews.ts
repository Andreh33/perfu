/**
 * Editorial customer reviews for each fragrance in the atelier.
 *
 * Deliberately not glowing — a few are ambivalent, a few are precise to the
 * dry-down, a few are short. They read like notes taken on a sleeve, not
 * marketing copy. Names and cities are recycled across the catalogue, but
 * the texts are unique per (slug, reviewer) pair so a single bottle yields
 * a coherent panel rather than identical praise.
 *
 * Dates fall within 2024-2025 and are stored as ISO yyyy-mm so the format
 * helper can render "March 2025" or "marzo 2025" without TZ surprises.
 */
import { ALL_SLUGS } from "@/lib/products";

export type ReviewLocaleText = {
  en: string;
  es: string;
  ar: string;
};

export type Review = {
  name: string;
  city: string;
  date: string; // YYYY-MM
  text: ReviewLocaleText;
};

type ReviewerSeed = {
  name: string;
  city: string;
  /**
   * A bank of trilingual short reviews. The order is intentionally varied
   * so consecutive slugs do not assign the same critic the same opinion.
   */
  pool: ReadonlyArray<ReviewLocaleText>;
};

const REVIEWERS: ReadonlyArray<ReviewerSeed> = [
  {
    name: "Aisha M.",
    city: "Dubai",
    pool: [
      {
        en: "It became my signature in three weeks. A stranger asked me what it was; I lied and said it was vintage.",
        es: "Se volvió mi firma en tres semanas. Un desconocido me preguntó qué era; mentí y le dije que era vintage.",
        ar: "صار توقيعي خلال ثلاثة أسابيع. سألني غريبٌ عمّا أرتديه فكذبت وقلت إنّه عتيق.",
      },
      {
        en: "I do not understand it yet. That is, perhaps, why I keep wearing it.",
        es: "Aún no lo entiendo. Quizá por eso lo sigo llevando.",
        ar: "لم أفهمه بعد. ربّما لهذا السبب لا أزال أضعه.",
      },
      {
        en: "Too warm for me in July. In November it becomes a coat.",
        es: "Demasiado cálido para julio. En noviembre se vuelve un abrigo.",
        ar: "حارٌّ زيادةً عليّ في يوليو. وفي نوفمبر يصبح معطفاً.",
      },
    ],
  },
  {
    name: "Léa B.",
    city: "Paris",
    pool: [
      {
        en: "It opens loud and then negotiates. The negotiation is the part I love.",
        es: "Abre fuerte y luego negocia. La negociación es lo que amo.",
        ar: "يفتح بصوتٍ عالٍ ثمّ يبدأ التفاوض. التفاوض هو ما أحبّه.",
      },
      {
        en: "I bought it for someone else. I have not given it away.",
        es: "Lo compré para otra persona. Aún no se lo he entregado.",
        ar: "اشتريته لشخصٍ آخر. لم أعطه إيّاه بعد.",
      },
      {
        en: "Cold weather brings out a third movement that surprised me.",
        es: "El frío revela un tercer movimiento que me sorprendió.",
        ar: "البرد يكشف عن حركة ثالثة فاجأتني.",
      },
    ],
  },
  {
    name: "Marco V.",
    city: "Milano",
    pool: [
      {
        en: "The dry-down. Hours later, somewhere between resin and ash, that is when it finds you.",
        es: "La caída final. Horas después, entre resina y ceniza, ahí es cuando te encuentra.",
        ar: "ذيل العطر. بعد ساعاتٍ، بين الراتنج والرماد، هناك يجدك.",
      },
      {
        en: "Wore it to a meeting that needed silence. It did the silence for me.",
        es: "Lo llevé a una reunión que necesitaba silencio. Hizo el silencio por mí.",
        ar: "وضعته في اجتماعٍ احتاج صمتاً. صنع الصمت بدلاً منّي.",
      },
      {
        en: "On paper it sang. On skin it whispered. I prefer the whisper.",
        es: "En papel cantaba. En la piel susurraba. Prefiero el susurro.",
        ar: "على الورق غنّى. على البشرة همس. أُفضّل الهمس.",
      },
    ],
  },
  {
    name: "Andreas K.",
    city: "Wien",
    pool: [
      {
        en: "Architectural. Built, not poured. The structure holds at hour seven.",
        es: "Arquitectónico. Construido, no vertido. La estructura aguanta a la séptima hora.",
        ar: "معماري. مبنيّ لا مسكوب. البنية تصمد بعد سبع ساعات.",
      },
      {
        en: "I expected sweetness. I received geometry.",
        es: "Esperaba dulzor. Recibí geometría.",
        ar: "توقّعت الحلاوة. تلقّيت الهندسة.",
      },
      {
        en: "Not for the timid. Not for the loud either. For those between.",
        es: "No es para tímidos. Tampoco para escandalosos. Para los del medio.",
        ar: "ليس للخجولين. ولا للصاخبين. بل لمن في الوسط.",
      },
    ],
  },
  {
    name: "Yuki T.",
    city: "Tokyo",
    pool: [
      {
        en: "Restrained the way a tea ceremony is restrained — every gesture intentional.",
        es: "Contenido como una ceremonia del té: cada gesto intencional.",
        ar: "متحفّظ كما تتحفّظ مراسم الشاي — كلّ حركة مقصودة.",
      },
      {
        en: "The first ten minutes are not for me. After that, it earned my evening.",
        es: "Los primeros diez minutos no son para mí. Después, se ganó mi noche.",
        ar: "العشر دقائق الأولى ليست لي. بعدها كسب أمسيتي.",
      },
      {
        en: "It does not announce itself. People notice when I leave the room.",
        es: "No se anuncia. La gente lo nota cuando salgo de la sala.",
        ar: "لا يُعلن عن نفسه. الناس يلاحظونه حين أخرج من الغرفة.",
      },
    ],
  },
  {
    name: "Sofia M.",
    city: "Madrid",
    pool: [
      {
        en: "Wore it on a Tuesday. Tuesday became a Saturday.",
        es: "Lo usé un martes. El martes se volvió sábado.",
        ar: "وضعته في يوم ثلاثاء، فصار الثلاثاءُ سبتاً.",
      },
      {
        en: "The bottle is heavier than I expected. So is the smell. I mean that as praise.",
        es: "La botella pesa más de lo que esperaba. El olor también. Es un elogio.",
        ar: "القنينة أثقل ممّا توقّعت. والرائحة كذلك. وهذا مديح.",
      },
      {
        en: "Two sprays is too much. One is just enough. I learned slowly.",
        es: "Dos pulverizaciones es exceso. Una basta. Lo aprendí despacio.",
        ar: "بختان كثير. واحدة تكفي. تعلّمت ذلك على مهل.",
      },
    ],
  },
  {
    name: "Omar H.",
    city: "Cairo",
    pool: [
      {
        en: "My grandmother stopped me at the door and asked which souk. There is no souk.",
        es: "Mi abuela me detuvo en la puerta y preguntó por qué zoco. No hay zoco.",
        ar: "أوقفتني جدّتي عند الباب وسألت من أيّ سوق. لا سوق.",
      },
      {
        en: "I am wary of perfumes that try too hard to sound Eastern. This one does not try.",
        es: "Desconfío de perfumes que se esfuerzan en sonar orientales. Este no lo intenta.",
        ar: "أحذر من العطور التي تتكلّف الإيحاء بالشرق. هذا لا يتكلّف.",
      },
      {
        en: "Honest. Not loud. Honest is rarer.",
        es: "Honesto. No estridente. La honestidad escasea más.",
        ar: "صادق. ليس صاخباً. الصدق أندر.",
      },
    ],
  },
  {
    name: "Helena R.",
    city: "London",
    pool: [
      {
        en: "I forgot I was wearing it and someone leaned in. That is the test.",
        es: "Olvidé que lo llevaba y alguien se acercó. Esa es la prueba.",
        ar: "نسيت أنّني أرتديه فاقترب أحدهم. هذا هو الاختبار.",
      },
      {
        en: "Two months in and the bottle is still half full. It needs less than you think.",
        es: "A los dos meses la botella sigue por la mitad. Pide menos de lo que crees.",
        ar: "بعد شهرين القنينة لا تزال نصف ممتلئة. يحتاج أقلّ ممّا تظنّ.",
      },
      {
        en: "Wore it to the opera. The opera lost.",
        es: "Lo llevé a la ópera. La ópera perdió.",
        ar: "وضعته إلى الأوبرا. خسرت الأوبرا.",
      },
    ],
  },
  {
    name: "Liu W.",
    city: "Shanghai",
    pool: [
      {
        en: "Cold mornings, the right amount of light. It feels written, not blended.",
        es: "Mañanas frías, luz justa. Se siente escrito, no mezclado.",
        ar: "صباحاتٌ باردة، ضوءٌ بالقدر المناسب. يبدو مكتوباً لا ممزوجاً.",
      },
      {
        en: "I find a different note each week. I do not know if that is the perfume or me.",
        es: "Cada semana descubro una nota distinta. No sé si es el perfume o yo.",
        ar: "أكتشف نغمةً مختلفةً كلّ أسبوع. لا أدري إن كان العطر أم أنا.",
      },
      {
        en: "Quiet on me. Wars with stronger fragrances and wins by retreating.",
        es: "Silencioso en mí. Pelea con otros más fuertes y gana retirándose.",
        ar: "هادئ عليّ. يتنازع مع العطور الأقوى وينتصر بالانسحاب.",
      },
    ],
  },
  {
    name: "Noor A.",
    city: "Riyadh",
    pool: [
      {
        en: "Smells like a memory I do not own yet. The kind of bottle you grow into.",
        es: "Huele a un recuerdo que aún no me pertenece. Una botella para crecer dentro.",
        ar: "تفوح منه ذكرى لا أملكها بعد. قنينة تكبر فيها.",
      },
      {
        en: "Lasts the entire night and into the breakfast that follows.",
        es: "Aguanta toda la noche y el desayuno que sigue.",
        ar: "يبقى الليلَ كلَّه وحتى فطورِ الصباح التالي.",
      },
      {
        en: "Strong in the bottle. Considerate on skin. A useful balance.",
        es: "Fuerte en la botella. Considerado en la piel. Un equilibrio útil.",
        ar: "قويّ في القنينة. لطيف على البشرة. توازنٌ نافع.",
      },
    ],
  },
  {
    name: "Tomás G.",
    city: "Buenos Aires",
    pool: [
      {
        en: "Not what I expected from the name. Better. Less obvious.",
        es: "No es lo que esperaba por el nombre. Mejor. Menos obvio.",
        ar: "ليس ما توقّعته من الاسم. أفضل. أقلّ بداهةً.",
      },
      {
        en: "Tested twenty samples before this. Returned the other nineteen.",
        es: "Probé veinte muestras antes de esta. Devolví las otras diecinueve.",
        ar: "جرّبت عشرين عيّنةً قبل هذه. أعدت التسع عشرة الأخرى.",
      },
      {
        en: "It is not for everyone. That is the point.",
        es: "No es para todos. Esa es la idea.",
        ar: "ليس للجميع. وهذا هو المقصود.",
      },
    ],
  },
  {
    name: "Ines K.",
    city: "Berlin",
    pool: [
      {
        en: "The price is the price. The hours of wear are the receipt.",
        es: "El precio es el precio. Las horas de uso son el recibo.",
        ar: "السعرُ سعر. وساعاتُ الارتداء هي الإيصال.",
      },
      {
        en: "I wear it less than I want to. That is how I know it is special.",
        es: "Lo uso menos de lo que quisiera. Así sé que es especial.",
        ar: "أرتديه أقلّ ممّا أُريد. هكذا أعرف أنّه خاص.",
      },
      {
        en: "Sat on my dresser for a month before I understood it. Now it lives on my coat.",
        es: "Estuvo un mes en el tocador antes de entenderlo. Ahora vive en mi abrigo.",
        ar: "بقي شهراً على الزينة قبل أن أفهمه. الآن يسكن معطفي.",
      },
    ],
  },
];

const MONTHS_BASE: ReadonlyArray<string> = [
  "2024-09",
  "2024-11",
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-06",
  "2025-08",
  "2025-10",
  "2025-12",
  "2026-01",
  "2026-03",
];

/**
 * Hash a slug to a deterministic integer so the same slug always returns
 * the same 8-reviewer panel regardless of import order or cache state.
 */
function hashSlug(slug: string): number {
  let h = 5381;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(h | 0);
}

/**
 * Yields a curated set of 8 reviews for the given slug. The same critic
 * may appear across multiple slugs but their review text is rotated from
 * their personal pool so identical slugs never share the same line.
 */
export function getReviewsForProduct(slug: string): ReadonlyArray<Review> {
  const seed = hashSlug(slug);
  const result: Review[] = [];

  for (let i = 0; i < 8; i += 1) {
    const reviewerIndex = (seed + i * 5) % REVIEWERS.length;
    const reviewer = REVIEWERS[reviewerIndex];
    if (!reviewer) continue;
    const poolIndex = (seed + i * 3) % reviewer.pool.length;
    const text = reviewer.pool[poolIndex];
    if (!text) continue;
    const monthIndex = (seed + i * 7) % MONTHS_BASE.length;
    const date = MONTHS_BASE[monthIndex] ?? "2025-06";

    result.push({
      name: reviewer.name,
      city: reviewer.city,
      date,
      text,
    });
  }

  return result;
}

/**
 * Sanity check that every slug yields exactly 8 reviews. Exposed for tests
 * and for the unused-import linter so we keep ALL_SLUGS pinned here.
 */
export function getReviewCoverage(): ReadonlyArray<{ slug: string; count: number }> {
  return ALL_SLUGS.map((slug) => ({
    slug,
    count: getReviewsForProduct(slug).length,
  }));
}
