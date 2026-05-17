/**
 * Fictional but plausible perfumers, each authored as a short biography
 * rather than a marketing line. Photographs reference Unsplash portraits
 * (documented by query) and should be replaced with commissioned shots
 * during the production migration to Vercel Blob.
 */
export type Perfumer = {
  id: string;
  name: string;
  origin: string;
  bio_short: { en: string; es: string; ar: string };
  photo_url: string;
};

export const PERFUMERS: ReadonlyArray<Perfumer> = [
  {
    id: "antoine-vasseur",
    name: "Antoine Vasseur",
    origin: "Grasse, FR",
    bio_short: {
      en: "Trained between Grasse and Beirut, Vasseur composes with the patience of a winemaker — letting every accord settle before deciding it has spoken.",
      es: "Formado entre Grasse y Beirut, Vasseur compone con paciencia de viticultor: deja reposar cada acorde antes de aceptar que ya ha dicho lo suyo.",
      ar: "تدرّب بين غراس وبيروت، ويؤلّف عطوره بصبر صانع نبيذ، يترك كلّ نغمة تستقر قبل أن يقرّر أنّها قالت ما تريد.",
    },
    // Unsplash query: "portrait man dark moody artisan beard 50s natural light"
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&fit=crop",
  },
  {
    id: "yasmin-el-khoury",
    name: "Yasmin El-Khoury",
    origin: "Beirut, LB",
    bio_short: {
      en: "Yasmin grew up in a Beirut apothecary that bottled rosewater for the city's grandmothers. Her work carries that lineage without ever mentioning it.",
      es: "Yasmin creció entre los estantes de una botica beirutí que embotellaba agua de rosas para las abuelas de la ciudad. Su trabajo carga ese linaje sin necesidad de nombrarlo.",
      ar: "نشأت ياسمين في عطّارية بيروتية كانت تعبّئ ماء الورد لجدّات المدينة، فحملت ذلك الإرث في عطورها دون أن تُسمّيه.",
    },
    // Unsplash query: "portrait middle eastern woman warm light editorial textile"
    photo_url:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop",
  },
  {
    id: "maurice-belaid",
    name: "Maurice Belaïd",
    origin: "Fès, MA",
    bio_short: {
      en: "Maurice considers perfumery a craft of subtraction. He arrives at a fragrance by removing notes until only the indispensable remain.",
      es: "Maurice entiende la perfumería como un oficio de sustracción. Llega a la fragancia retirando notas hasta que queda lo indispensable.",
      ar: "يعتبر موريس صناعة العطر فنّ الحذف، يصل إلى العطر بإزالة المكوّنات حتى لا يبقى إلا الجوهري.",
    },
    // Unsplash query: "portrait north african man artisan workshop bw editorial"
    photo_url:
      "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=800&q=85&fit=crop",
  },
  {
    id: "leonore-caspari",
    name: "Léonore Caspari",
    origin: "Paris, FR",
    bio_short: {
      en: "Léonore writes about composition the way a poet writes about silence. Her flacons are small experiments in what can be left unsaid.",
      es: "Léonore habla de composición como un poeta del silencio. Sus frascos son pequeños ensayos sobre lo que puede dejarse sin decir.",
      ar: "تتحدث ليونور عن التركيب بطريقة شاعر يتأمّل الصمت، وعطورها تجارب صغيرة فيما يمكن تركه دون قول.",
    },
    // Unsplash query: "portrait french woman blonde editorial soft window light"
    photo_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=85&fit=crop",
  },
  {
    id: "hassan-al-mansouri",
    name: "Hassan Al-Mansouri",
    origin: "Dubai, AE",
    bio_short: {
      en: "Born in the Al Quoz alleys, Hassan distills agarwood with techniques inherited from his father and refined in a laboratory in Marseille.",
      es: "Nacido en los callejones de Al Quoz, Hassan destila agarwood con técnicas heredadas de su padre y refinadas en un laboratorio marsellés.",
      ar: "وُلد حسن في أزقّة القوز، ويُقطّر العود بأسلوب ورثه عن والده وصقله في مختبر مارسيلي.",
    },
    // Unsplash query: "portrait emirati man kandura traditional studio bw"
    photo_url:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=85&fit=crop",
  },
  {
    id: "camille-theron",
    name: "Camille Théron",
    origin: "Lyon, FR",
    bio_short: {
      en: "Camille trained as a botanist before turning to perfumery. She still labels her ingredients with the precision of a herbarium.",
      es: "Camille fue botánica antes que perfumista. Todavía etiqueta sus ingredientes con la precisión de un herbario.",
      ar: "كانت كاميل عالمة نباتات قبل أن تنتقل إلى صناعة العطور، ولا تزال تصنّف موادها بدقّة عشّاب.",
    },
    // Unsplash query: "portrait woman lab coat botanist soft natural daylight"
    photo_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=85&fit=crop",
  },
  {
    id: "sofia-aliotti",
    name: "Sofia Aliotti",
    origin: "Palermo, IT",
    bio_short: {
      en: "Sofia composes from a balcony overlooking the Tyrrhenian Sea. The salt is in everything she signs, whether or not the bottle lists it.",
      es: "Sofia compone desde un balcón sobre el Tirreno. La sal está presente en todo lo que firma, lo confiese o no la etiqueta.",
      ar: "تؤلّف صوفيا عطورها من شرفة تطلّ على البحر التيراني، وملح البحر حاضر في كلّ ما توقّعه، أعلنته القنينة أم لا.",
    },
    // Unsplash query: "portrait italian woman dark hair window mediterranean"
    photo_url:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=85&fit=crop",
  },
  {
    id: "idris-karim",
    name: "Idris Karim",
    origin: "Tunis, TN",
    bio_short: {
      en: "Idris approaches perfume as a translator approaches a difficult poem — looking for the line that survives the journey across languages.",
      es: "Idris aborda el perfume como un traductor aborda un poema difícil: busca la línea que sobrevive al viaje entre idiomas.",
      ar: "يتعامل إدريس مع العطر كما يتعامل المترجم مع قصيدة عسيرة، باحثاً عن السطر الذي يصمد في رحلته بين اللغات.",
    },
    // Unsplash query: "portrait north african man editorial scarf low key"
    photo_url:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=85&fit=crop",
  },
] as const;

export function getPerfumer(id: string): Perfumer | undefined {
  return PERFUMERS.find((p) => p.id === id);
}
