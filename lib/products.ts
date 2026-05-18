/**
 * The 20 fragrances of Perfumes Dubai · Maison Digital.
 *
 * Copy was written first in English and then *adapted* (not translated)
 * to Spanish and Arabic. The Arabic prose leans toward classical phrasing
 * rather than literal renderings. All Stripe links are intentionally left
 * empty — the cart layer (Phase 10) will fill them once the merchant
 * pastes their Payment Link URLs from the Stripe Dashboard.
 *
 * Image references all point to Unsplash and are documented with their
 * search query above each URL. A migration script will move these to
 * Vercel Blob during launch (see scripts/ folder, future phase).
 */
import type { Family } from "./families";
import type { NoteName } from "./notes";

export type Note = {
  name_en: string;
  name_es: string;
  name_ar: string;
  icon: NoteName;
};

export type Perfume = {
  slug: string;
  names: { en: string; es: string; ar: string };
  family: Family;
  gender: "masculine" | "feminine" | "unisex";
  perfumer: string; // id from PERFUMERS
  year: number;
  edition: { type: "permanent" | "limited"; number?: string };
  intensity: "Eau de Parfum" | "Extrait de Parfum" | "Parfum";
  description: { en: string[]; es: string[]; ar: string[] };
  ritual: { en: string; es: string; ar: string };
  notes: {
    top: Note[];
    heart: Note[];
    base: Note[];
  };
  prices: { ml50: number; ml100: number };
  stripeLinks: { ml50: string; ml100: string };
  images: {
    bottle_primary: string;
    bottle_secondary: string[];
    editorial: string[];
    lifestyle: string[];
  };
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  liquid_color_hex: string;
  inspiration_country: string;
  tags: string[];
};

// Helper to keep image lists readable; documents the Unsplash query inline.
// All images go through next/image so format/quality params are appended.
const img = (id: string, _query: string): string =>
  `https://images.unsplash.com/${id}?w=1600&q=85&fit=crop&auto=format`;

export const PERFUMES: ReadonlyArray<Perfume> = [
  // ─── OUD · 6 ─────────────────────────────────────────────────────
  {
    slug: "layla-noir",
    names: { en: "Layla Noir", es: "Layla Noir", ar: "ليلى نوار" },
    family: "oud",
    gender: "unisex",
    perfumer: "hassan-al-mansouri",
    year: 2022,
    edition: { type: "permanent" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Layla Noir is the moonless night of the desert. The calm that follows a sandstorm. An aged Cambodian oud wrapped in damascena rose, slow to reveal itself — like a conversation between strangers who discover they are kin.",
        "It opens with a single drop of saffron, the kind that stains fingers and waits. Beneath it, a thread of black pepper and pink pepper crossing, neither winning, both arguing about who saw the night first.",
        "The heart is the part you remember in the morning. Rose, of course, but not the rose of weddings — a rose left out on a balcony in Damascus, soaked in dew, sharpened by the cold. Cardamom drifts beside it like a voice on the other side of a wall.",
        "And then the oud arrives. Twenty years aged, distilled three times, smoked in oak. Patchouli underneath it, deepening the shadow. The dry-down is leather, labdanum, ambergris — the smell of a hand that has held the same coin for a very long time.",
        "Wear it when the room expects nothing. It will return the favour with everything.",
      ],
      es: [
        "Layla Noir es la noche sin luna del desierto. La calma que sigue a la tormenta de arena. Un oud camboyano envejecido envuelto en rosa damascena, lento en revelarse — como una conversación entre desconocidos que descubren ser hermanos.",
        "Abre con una sola gota de azafrán, ese que mancha los dedos y espera. Debajo, un hilo de pimienta negra y rosa cruzándose, ninguna ganando, ambas discutiendo quién vio primero la noche.",
        "El corazón es lo que recuerdas por la mañana. Rosa, claro, pero no la rosa de las bodas — una rosa olvidada en un balcón de Damasco, calada de rocío, afilada por el frío. El cardamomo deriva al lado como una voz al otro lado de un muro.",
        "Entonces llega el oud. Veinte años de envejecimiento, tres destilaciones, ahumado en roble. El pachulí debajo, hondando la sombra. La caída final es cuero, labdano, ámbar gris — el olor de una mano que ha sostenido la misma moneda durante demasiado tiempo.",
        "Llévalo cuando la sala no espere nada. Te devolverá el favor con todo.",
      ],
      ar: [
        "ليلى نوار هي ليلة الصحراء بلا قمر. هي السكون الذي يعقب عاصفة الرمل. عودٌ كمبودي معتّق ملفوفٌ بوردة دمشقية، يكشف عن نفسه ببطء — كحوار بين غريبَين يكتشفان أنّهما من دمٍ واحد.",
        "تفتح بقطرة واحدة من زعفران، من ذلك الذي يصبغ الأصابع وينتظر. تحتها خيطٌ من فلفل أسود وفلفل وردي يتقاطعان، لا ينتصر أيٌّ منهما، يتجادلان مَن رأى الليلَ أولاً.",
        "القلب ما تتذكّره عند الصباح. وردٌ بالتأكيد، لكن لا وردة الأعراس — بل وردة نُسيت على شرفة دمشقية، نقعها الندى وشحذها البرد. يهبّ الهيل إلى جانبها كصوتٍ من خلف جدار.",
        "ثمّ يأتي العود. عشرون عاماً من التعتيق، ثلاث تقطيرات، تدخينٌ في خشب البلّوط. الباتشولي تحته يعمّق الظلّ. الذيلُ جلدٌ ولادان وعنبر — رائحةُ يدٍ أمسكت العملة ذاتها مدّةً طويلة.",
        "البَسها حين لا تنتظر منك الغرفةُ شيئاً. سترد لك الجميل بكلّ شيء.",
      ],
    },
    ritual: {
      en: "Two drops at the inner wrist. One at the hollow beneath the ear. Wait three breaths before you stand.",
      es: "Dos gotas en la cara interna de la muñeca. Una en el hueco bajo la oreja. Espera tres respiraciones antes de incorporarte.",
      ar: "قطرتان على باطن المعصم. وقطرةٌ في الجوف خلف الأذن. انتظر ثلاث أنفاسٍ قبل أن تنهض.",
    },
    notes: {
      top: [
        { name_en: "Saffron", name_es: "Azafrán", name_ar: "زعفران", icon: "saffron" },
        { name_en: "Black pepper", name_es: "Pimienta negra", name_ar: "فلفل أسود", icon: "black_pepper" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
      ],
      heart: [
        { name_en: "Damascena rose", name_es: "Rosa damascena", name_ar: "وردة دمشقية", icon: "rose_damascena" },
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
        { name_en: "Iris", name_es: "Iris", name_ar: "سوسن", icon: "iris" },
      ],
      base: [
        { name_en: "Aged oud", name_es: "Oud envejecido", name_ar: "عود معتّق", icon: "oud" },
        { name_en: "Patchouli", name_es: "Pachulí", name_ar: "باتشولي", icon: "patchouli" },
        { name_en: "Labdanum", name_es: "Labdano", name_ar: "لادان", icon: "labdanum" },
      ],
    },
    prices: { ml50: 420, ml100: 720 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "dark perfume bottle moody amber gold low light"
      bottle_primary: img("photo-1541643600914-78b084683601", "dark perfume bottle moody amber"),
      bottle_secondary: [
        img("photo-1592945403244-b3fbafd7f539", "luxury perfume bottle dark backdrop"),
        img("photo-1615634260167-c8cdede054de", "perfume crystal still life"),
      ],
      editorial: [
        img("photo-1542816417-0983c9c9ad53", "moody amber editorial textile gold"),
        img("photo-1502691876148-a84978e59af8", "incense smoke desert dark"),
        img("photo-1469474968028-56623f02e42e", "moonless desert night sand"),
      ],
      lifestyle: [
        img("photo-1519985176271-adb1088fa94c", "woman silhouette window dusk"),
        img("photo-1517999144091-3d9dca6d1e43", "candle still life dark"),
      ],
    },
    featured: true,
    bestseller: true,
    new: false,
    liquid_color_hex: "#2a1810",
    inspiration_country: "Damascus",
    tags: ["oriental", "nocturnal", "signature", "leather"],
  },
  {
    slug: "oud-al-qamar",
    names: { en: "Oud al-Qamar", es: "Oud al-Qamar", ar: "عود القمر" },
    family: "oud",
    gender: "masculine",
    perfumer: "hassan-al-mansouri",
    year: 2021,
    edition: { type: "limited", number: "042/500" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Oud al-Qamar — the oud of the moon — was composed during the three nights when Hassan Al-Mansouri's father was teaching him to read the agarwood by its weight in the palm.",
        "It opens cold. Cardamom, a breath of grapefruit, a flicker of pink pepper. The air of a workshop early enough that the lamps are still on.",
        "The heart turns silver. A frankincense that has been kept in a copper box for nine years. Beside it, the powdered hush of iris, and a thread of orange blossom that does not insist.",
        "The base is the oud you have been waiting for. Hindi, smoky, but warmed by sandalwood from Mysore and a quiet labdanum. There is musk underneath — the kind that finds you again at the end of the evening, when everyone else has left.",
        "It is not a fragrance for arriving. It is a fragrance for being already there.",
      ],
      es: [
        "Oud al-Qamar — el oud de la luna — fue compuesto durante las tres noches en que el padre de Hassan Al-Mansouri le enseñaba a leer el agarwood por su peso en la palma.",
        "Abre frío. Cardamomo, un soplo de pomelo, un parpadeo de pimienta rosa. El aire de un taller a una hora aún tan temprana que las lámparas siguen encendidas.",
        "El corazón se vuelve plata. Un incienso que lleva guardado nueve años en una caja de cobre. A su lado, el silencio en polvo del iris, y un hilo de flor de azahar que no insiste.",
        "La base es el oud que estabas esperando. Hindi, ahumado, pero entibiado por sándalo de Mysore y un labdano discreto. Hay almizcle debajo — del que vuelve a encontrarte al final de la velada, cuando todos los demás se han ido.",
        "No es una fragancia para llegar. Es una fragancia para estar ya allí.",
      ],
      ar: [
        "عودُ القمر مزيجٌ ألّفه حسن المنصوري في الليالي الثلاث التي كان أبوه يعلّمه فيها قراءةَ العود بثقله في راحة اليد.",
        "يفتح بارداً. هيلٌ، وأنفاسُ جريب فروت، ولمعةُ فلفل وردي. هواءُ ورشةٍ في ساعةٍ مبكّرة لا تزال فيها المصابيح موقدة.",
        "ثمّ يتحوّل القلب إلى فضّة. لبانٌ حُفظ في علبةٍ نحاسية تسع سنوات. وإلى جانبه، صمتُ السوسن المسحوقي، وخيطُ زهر برتقالٍ لا يُلحّ.",
        "والقاعدة عودٌ هندي مدخّن، يدفّئه صندلٌ ميسوريّ ولادانٌ هادئ. وتحته مسكٌ من ذلك الذي يعود إليك آخر السهرة، حين يغادر الآخرون.",
        "ليس عطراً للقدوم. بل عطرٌ لأن تكون هناك سلفاً.",
      ],
    },
    ritual: {
      en: "Apply once at the neckline. Do not dress for an hour. Let the silk arrive last.",
      es: "Aplica una vez en el escote. No te vistas durante una hora. Deja que la seda llegue al final.",
      ar: "ضع رشّةً واحدة في المنحر. لا ترتدِ ثوبك لساعةٍ كاملة. دع الحرير يأتي أخيراً.",
    },
    notes: {
      top: [
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
        { name_en: "Grapefruit", name_es: "Pomelo", name_ar: "جريب فروت", icon: "grapefruit" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
      ],
      heart: [
        { name_en: "Frankincense", name_es: "Incienso", name_ar: "لبان", icon: "frankincense" },
        { name_en: "Iris", name_es: "Iris", name_ar: "سوسن", icon: "iris" },
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
      ],
      base: [
        { name_en: "Hindi oud", name_es: "Oud hindi", name_ar: "عود هندي", icon: "oud" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
      ],
    },
    prices: { ml50: 560, ml100: 950 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "perfume bottle silver moonlight studio still life"
      bottle_primary: img("photo-1605648916361-9bc12ad6a569", "perfume bottle silver moonlight"),
      bottle_secondary: [
        img("photo-1571781926291-c477ebfd024b", "amber perfume bottle dark"),
        img("photo-1567721913486-6585f069b332", "luxury perfume crystal label"),
      ],
      editorial: [
        img("photo-1532012197267-da84d127e765", "incense burner brass moroccan"),
        img("photo-1517400508447-f8dd518b86db", "moon night silver light"),
        img("photo-1473773508845-188df298d2d1", "agarwood workshop dim"),
      ],
      lifestyle: [
        img("photo-1604609177180-c41a73a14076", "emirati man kandura desert"),
        img("photo-1481627834876-b7833e8f5570", "library old books dim lamp"),
      ],
    },
    featured: true,
    bestseller: false,
    new: false,
    liquid_color_hex: "#3a1f10",
    inspiration_country: "Dubai",
    tags: ["oriental", "ceremonial", "smoky", "rare"],
  },
  {
    slug: "musk-al-madina",
    names: { en: "Musk al-Madina", es: "Musk al-Madina", ar: "مسك المدينة" },
    family: "oud",
    gender: "unisex",
    perfumer: "idris-karim",
    year: 2020,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Musk al-Madina is the warmth of a courtyard at five in the afternoon, when the call to prayer has just ended and the air still holds it.",
        "It opens with rosewater and a brief, civil bergamot. No surprises. The first minute behaves like a host who already knows your name.",
        "Then a triple musk accord — animalic at first, then powdered, then almost vegetal — opens up beneath rose centifolia and a quiet jasmine. The flowers are not the point. The point is what they grow on.",
        "The base is where the city arrives. A young oud, neither smoky nor sweet, only present. Cedar, sandalwood, and a thread of amber that you only notice when you take off your jacket.",
        "It is not religious. But it remembers being so.",
      ],
      es: [
        "Musk al-Madina es la calidez de un patio a las cinco de la tarde, cuando el llamado a la oración acaba de cesar y el aire todavía lo sostiene.",
        "Abre con agua de rosas y una bergamota breve, cortés. Sin sorpresas. El primer minuto se comporta como un anfitrión que ya conoce tu nombre.",
        "Después, un acorde triple de almizcle — animal al principio, luego en polvo, luego casi vegetal — se abre bajo rosa centifolia y un jazmín discreto. Las flores no son lo importante. Lo importante es sobre qué crecen.",
        "La base es donde llega la ciudad. Un oud joven, ni ahumado ni dulce, solo presente. Cedro, sándalo, y un hilo de ámbar que solo notas cuando te quitas la chaqueta.",
        "No es religioso. Pero recuerda haberlo sido.",
      ],
      ar: [
        "مسكُ المدينة دفءُ صحنٍ في الخامسة عصراً، حين ينتهي الأذان وتظلّ الأهواءُ تحمله.",
        "يفتح بماء الورد وببرغموتٍ قصيرٍ مهذّب. لا مفاجآت. الدقيقةُ الأولى تتصرّف كمضيفٍ يعرف اسمك.",
        "ثم ينفتح تحت ذلك مزيجٌ ثلاثي من المسك — حيواني أولاً، ثم مسحوقي، ثم نباتي تقريباً — تحت وردة سنتيفوليا وياسمين هادئ. الزهور ليست الفكرة. الفكرة في ما تنبت عليه.",
        "القاعدة هي حيث تأتي المدينة. عودٌ شاب، لا مدخّن ولا حلو، حاضرٌ فحسب. أرز، صندل، وخيطُ عنبر لا تنتبه إليه إلا حين تخلع معطفك.",
        "ليس دينياً. لكنّه يتذكّر أنّه كان كذلك.",
      ],
    },
    ritual: {
      en: "Apply on a clean garment, not on the skin. Let it dress in your warmth.",
      es: "Aplica sobre una prenda limpia, no sobre la piel. Deja que se vista de tu calor.",
      ar: "ضعه على ثوبٍ نظيف، لا على البشرة. اتركه يرتدي دفأك.",
    },
    notes: {
      top: [
        { name_en: "Rose water", name_es: "Agua de rosas", name_ar: "ماء الورد", icon: "rose_damascena" },
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
      ],
      heart: [
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Jasmine sambac", name_es: "Jazmín sambac", name_ar: "ياسمين سامبَك", icon: "jasmine" },
        { name_en: "Iris", name_es: "Iris", name_ar: "سوسن", icon: "iris" },
      ],
      base: [
        { name_en: "Young oud", name_es: "Oud joven", name_ar: "عود شاب", icon: "oud" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Cedar", name_es: "Cedro", name_ar: "أرز", icon: "cedar" },
      ],
    },
    prices: { ml50: 380, ml100: 650 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "rose water perfume bottle warm light medina courtyard"
      bottle_primary: img("photo-1547887537-6158d64c35b3", "perfume bottle warm light minimal"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "amber bottle still life"),
        img("photo-1585386959984-a4155224a1ad", "perfume vintage label brass"),
      ],
      editorial: [
        img("photo-1543248939-4296e1fea89b", "moroccan courtyard fountain warm"),
        img("photo-1518998053901-5348d3961a04", "rose petals close warm tone"),
        img("photo-1564540586988-aa4e53c3d799", "arabic calligraphy parchment"),
      ],
      lifestyle: [
        img("photo-1502920917128-1aa500764cbd", "courtyard arabesque afternoon"),
        img("photo-1583416750470-965b2707b355", "tea cup brass moroccan"),
      ],
    },
    featured: false,
    bestseller: true,
    new: false,
    liquid_color_hex: "#5a3a20",
    inspiration_country: "Medina",
    tags: ["devotional", "warm", "powdered", "everyday"],
  },
  {
    slug: "nuit-de-dubai",
    names: { en: "Nuit de Dubaï", es: "Nuit de Dubaï", ar: "ليلُ دبي" },
    family: "oud",
    gender: "feminine",
    perfumer: "yasmin-el-khoury",
    year: 2024,
    edition: { type: "limited", number: "087/300" },
    intensity: "Parfum",
    description: {
      en: [
        "Nuit de Dubaï was Yasmin El-Khoury's note to a city she had visited only twice. The first time at twenty-four; the second time at forty-one, on her way to compose this.",
        "It begins with the smell of warm concrete and salt air — saffron, sea salt, an unobvious bergamot. The high-rise glass at midnight, when the lobby music has finally stopped.",
        "The heart is tuberose and centifolia rose, the kind of bouquet someone bought you in a hotel lobby and never explained. Beneath them, a thread of cumin, just enough to admit that the night has skin.",
        "The base is rose oud — the agarwood macerated with rose petals for ten weeks — held together by amber, labdanum, and a quiet white musk. There is a single drop of birch tar in the formula. You will not find it, but you will feel that someone meant something.",
        "It is a night fragrance. It is also a fragrance about deciding what kind of night it will be.",
      ],
      es: [
        "Nuit de Dubaï fue la nota de Yasmin El-Khoury a una ciudad que solo había visitado dos veces. La primera a los veinticuatro; la segunda a los cuarenta y uno, de camino a componer esto.",
        "Comienza con olor a hormigón cálido y aire salobre — azafrán, sal de mar, una bergamota nada obvia. El cristal de los rascacielos a medianoche, cuando la música del lobby por fin ha parado.",
        "El corazón es nardo y rosa centifolia, ese tipo de ramo que alguien te compró en el vestíbulo de un hotel y nunca explicó. Debajo, un hilo de comino, lo justo para admitir que la noche tiene piel.",
        "La base es rosa-oud — el agarwood macerado en pétalos de rosa durante diez semanas — sostenido por ámbar, labdano y un almizcle blanco discreto. Hay una sola gota de brea de abedul en la fórmula. No la encontrarás, pero sentirás que alguien quiso decir algo.",
        "Es una fragancia nocturna. También es una fragancia sobre decidir qué clase de noche será.",
      ],
      ar: [
        "ليلُ دبي رسالةٌ كتبتها ياسمين الخوري إلى مدينةٍ زارتها مرّتين فحسب. الأولى وهي في الرابعة والعشرين، والثانية في الحادية والأربعين، في طريقها لتأليف هذا العطر.",
        "يبدأ برائحة إسمنتٍ دافئ وهواءٍ مالح — زعفران، ملحُ بحر، برغموتٌ لا يلفت النظر. زجاجُ ناطحات السحاب منتصف الليل، حين تكفّ موسيقى الردهة أخيراً.",
        "القلبُ تيوبروز ووردة سنتيفوليا، من ذلك النوع من البوكيهات التي يشتريها لك أحدُهم في ردهة فندقٍ ولا يفسّر. تحتها خيطُ كمّون، يكفي للاعتراف بأنّ الليلَ له بشرة.",
        "والقاعدةُ مزيجُ ورد وعود — عودٌ نُقع في بتلات الورد عشرة أسابيع — يحفظه عنبرٌ ولادان ومسكٌ أبيض هادئ. ثمّة قطرةٌ واحدة من قطران البتولا في التركيبة. لن تعثر عليها، لكنّك ستحسّ بأنّ أحداً أراد قول شيء.",
        "إنّه عطرُ ليل. وهو أيضاً عطرٌ عن اختيار أيّ ليلٍ يكون.",
      ],
    },
    ritual: {
      en: "Apply once on the inner elbow, once at the throat. Step away from the mirror.",
      es: "Aplica una vez en el codo interior, una vez en la garganta. Apártate del espejo.",
      ar: "رشّةٌ على باطن الكوع، ورشّةٌ على الحلق. ثم ابتعدي عن المرآة.",
    },
    notes: {
      top: [
        { name_en: "Saffron", name_es: "Azafrán", name_ar: "زعفران", icon: "saffron" },
        { name_en: "Sea salt", name_es: "Sal de mar", name_ar: "ملح البحر", icon: "sea_salt" },
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
      ],
      heart: [
        { name_en: "Tuberose", name_es: "Nardo", name_ar: "تيوبروز", icon: "tuberose" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Cumin", name_es: "Comino", name_ar: "كمّون", icon: "cumin" },
      ],
      base: [
        { name_en: "Rose oud", name_es: "Rosa-oud", name_ar: "عود الورد", icon: "oud" },
        { name_en: "Labdanum", name_es: "Labdano", name_ar: "لادان", icon: "labdanum" },
        { name_en: "Birch tar", name_es: "Brea de abedul", name_ar: "قطران البتولا", icon: "birch_tar" },
      ],
    },
    prices: { ml50: 480, ml100: 820 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "dubai skyline night reflection moody warm gold"
      bottle_primary: img("photo-1546412414-e1885259563a", "perfume bottle gold night moody"),
      bottle_secondary: [
        img("photo-1574870111867-089730e5a72b", "dark amber luxury bottle"),
        img("photo-1610456297561-6f6c4d9a8d83", "perfume crystal black backdrop"),
      ],
      editorial: [
        img("photo-1518684079-3c830dcef090", "dubai skyline night warm gold"),
        img("photo-1502672023488-70e25813eb80", "hotel lobby late night warm"),
        img("photo-1571805341302-f857390a3bb0", "tuberose flower closeup dark"),
      ],
      lifestyle: [
        img("photo-1490481651871-ab68de25d43d", "woman silhouette balcony night"),
        img("photo-1530541930197-ff16ac917b0e", "city lights cab evening"),
      ],
    },
    featured: true,
    bestseller: false,
    new: true,
    liquid_color_hex: "#2b1820",
    inspiration_country: "Dubai",
    tags: ["nocturnal", "rose-oud", "limited", "metropolitan"],
  },
  {
    slug: "patchouli-dynastie",
    names: { en: "Patchouli Dynastie", es: "Patchouli Dynastie", ar: "سلالةُ الباتشولي" },
    family: "oud",
    gender: "masculine",
    perfumer: "antoine-vasseur",
    year: 2019,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Patchouli Dynastie is the smell of a wooden trunk in the attic that has not been opened since a marriage. Inside: a coat, a letter, a small jar of black resin.",
        "It opens with a dry bergamot and a wisp of black pepper. No bait. Two seconds in, the patchouli arrives — Indonesian, aged in oak for six years, and so dense that the rest of the composition has to work around it.",
        "Cedar and a sober vetiver answer at the heart, with a thread of guaiac wood smoke. Iris flickers in and out, depending on how the skin warms it.",
        "The base is oud, sandalwood, oakmoss, and a sliver of leather. There is honesty in the dry-down — the kind that admits a fragrance is also an inheritance. Wear it as you would carry a name.",
        "Suitable for those who own at least one object they cannot explain.",
      ],
      es: [
        "Patchouli Dynastie es el olor de un baúl de madera en el desván que no se ha abierto desde un matrimonio. Dentro: un abrigo, una carta, un pequeño tarro de resina negra.",
        "Abre con una bergamota seca y un soplo de pimienta negra. Sin cebo. A los dos segundos llega el pachulí — indonesio, envejecido en roble durante seis años, tan denso que el resto de la composición ha de moverse a su alrededor.",
        "Cedro y un vetiver sobrio responden en el corazón, con un hilo de humo de madera de guayaco. El iris parpadea según el calor que la piel le dé.",
        "La base es oud, sándalo, musgo de roble y una astilla de cuero. Hay honestidad en la caída — esa que admite que una fragancia es también una herencia. Llévalo como llevarías un apellido.",
        "Apto para quienes poseen al menos un objeto que no saben explicar.",
      ],
      ar: [
        "سلالةُ الباتشولي رائحةُ صندوقٍ خشبي في عِلّيّةٍ لم يُفتح منذ زواج. في الداخل: معطفٌ، ورسالةٌ، وجرّةٌ صغيرة من راتنجٍ أسود.",
        "يفتح ببرغموتٍ جافّ ونفحةٍ من فلفل أسود. بلا طُعم. وبعد ثانيتين يصلُ الباتشولي — إندونيسيّ، معتّقٌ في خشب البلّوط ستّ سنوات، كثيفٌ إلى حدٍّ يجعل سائر التركيبة تتحرّك حوله.",
        "يجيبه أرزٌ ونجيلٌ هايتي رزينان في القلب، مع خيطٍ من دخان خشب الغاياك. السوسن يومضُ ويختفي بحسب الحرارة التي تمنحه إيّاها البشرة.",
        "القاعدةُ عودٌ وصندلٌ وطحلبُ بلّوطٍ وشظيّةُ جلد. ثمّة صدقٌ في الذيل — من ذلك الذي يعترف بأنّ العطر إرث. البَسه كما تحمل اسماً.",
        "يصلح لمن يملكون شيئاً واحداً على الأقلّ لا يستطيعون تفسيره.",
      ],
    },
    ritual: {
      en: "One drop on a wool lapel, one on bare skin. Wait until evening before deciding what it means.",
      es: "Una gota en una solapa de lana, una en piel desnuda. Espera a la noche para decidir qué significa.",
      ar: "قطرةٌ على رفرف صوفي، وقطرةٌ على البشرة. انتظر المساء قبل أن تقرّر ما يعنيه.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Black pepper", name_es: "Pimienta negra", name_ar: "فلفل أسود", icon: "black_pepper" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
      ],
      heart: [
        { name_en: "Aged patchouli", name_es: "Pachulí envejecido", name_ar: "باتشولي معتّق", icon: "patchouli" },
        { name_en: "Cedar", name_es: "Cedro", name_ar: "أرز", icon: "cedar" },
        { name_en: "Guaiac wood", name_es: "Guayaco", name_ar: "خشب الغاياك", icon: "guaiac" },
      ],
      base: [
        { name_en: "Oud", name_es: "Oud", name_ar: "عود", icon: "oud" },
        { name_en: "Oakmoss", name_es: "Musgo de roble", name_ar: "طحلب البلّوط", icon: "oakmoss" },
        { name_en: "Leather", name_es: "Cuero", name_ar: "جلد", icon: "leather" },
      ],
    },
    prices: { ml50: 360, ml100: 610 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "vintage trunk leather bottle moody amber heritage"
      bottle_primary: img("photo-1563170351-be82bc888aa4", "vintage trunk perfume bottle"),
      bottle_secondary: [
        img("photo-1588405748880-b434362febfa", "leather bottle gold cap dark"),
        img("photo-1535378917042-10a22c95931a", "old wooden table bottle"),
      ],
      editorial: [
        img("photo-1567016381003-86ac32d1f8d8", "patchouli leaves botanical close"),
        img("photo-1502920514313-52581002a659", "old leather books dim library"),
        img("photo-1502920917128-1aa500764cbd", "courtyard wood texture"),
      ],
      lifestyle: [
        img("photo-1492447166138-50c3889fccb1", "man suit library window"),
        img("photo-1485875437342-9b39470b3d95", "wooden chest old letter"),
      ],
    },
    featured: false,
    bestseller: true,
    new: false,
    liquid_color_hex: "#2c1b14",
    inspiration_country: "Java",
    tags: ["heritage", "smoky", "earthy", "winter"],
  },
  {
    slug: "encens-du-souk",
    names: { en: "Encens du Souk", es: "Encens du Souk", ar: "بخورُ السوق" },
    family: "oud",
    gender: "unisex",
    perfumer: "maurice-belaid",
    year: 2023,
    edition: { type: "permanent" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Encens du Souk is the alley of Fès on a Friday morning, when the shopkeepers have just opened and the cedar door of the spice merchant is letting through the smell of the warehouse before he has lit anything.",
        "Top: a sharp lemon and a single grain of cumin. Not a kitchen note — a market note, the kind that wakes the sinuses without announcing itself.",
        "The heart is frankincense, myrrh, and a saffron that behaves like a stripe on cloth. Underneath them, the warm dust of cardamom and a fold of pink pepper.",
        "The base is an oud rolled in benzoin and amber, a slow sandalwood, and the particular kind of musk that smells of wool that has been folded a hundred times.",
        "It is a fragrance for the long walk back from somewhere you did not expect to enter.",
      ],
      es: [
        "Encens du Souk es la callejuela de Fez una mañana de viernes, cuando los comerciantes acaban de abrir y la puerta de cedro del especiero deja pasar el olor del almacén antes de haber encendido nada.",
        "Salida: un limón afilado y un grano único de comino. No es nota de cocina — es nota de mercado, esa que despierta los senos sin anunciarse.",
        "El corazón es incienso, mirra y un azafrán que se comporta como una raya en una tela. Bajo ellos, el polvo cálido del cardamomo y un pliegue de pimienta rosa.",
        "La base es un oud rodado en benjuí y ámbar, un sándalo lento, y esa clase particular de almizcle que huele a lana doblada cien veces.",
        "Es una fragancia para el regreso largo desde un lugar al que no esperabas entrar.",
      ],
      ar: [
        "بخورُ السوق هو زقاقُ فاسٍ في صبيحة جمعة، حين يفتح الباعةُ متاجرَهم للتوّ، وبابُ الأرز عند العطّار يسمح بمرور رائحة المخزن قبل أن يُشعل شيئاً.",
        "في القمّة: ليمونٌ حادّ وحبّةٌ واحدة من كمّون. ليست نغمةَ مطبخٍ، بل نغمةَ سوق، من تلك التي توقظ الجيوبَ دون أن تُعلن عن نفسها.",
        "والقلبُ لبانٌ ومرٌّ وزعفرانٌ يتصرّف كخطّ في نسيج. وتحتها غبارُ الهيل الدافئ وطيّةُ فلفلٍ وردي.",
        "والقاعدةُ عودٌ مدحرجٌ في بنزوينٍ وعنبر، صندلٌ بطيء، وذلك النوعُ بعينه من المسك الذي تشمّ فيه صوفاً طُويَ مئةَ مرّة.",
        "هو عطرٌ للعودة الطويلة من مكانٍ لم تكن تتوقّع دخوله.",
      ],
    },
    ritual: {
      en: "Apply on the back of the hand, then run that hand once through clean hair.",
      es: "Aplica en el dorso de la mano, luego pasa esa mano una vez por el cabello limpio.",
      ar: "ضعه على ظهر اليد، ثم مرّر تلك اليد مرّةً في شعرٍ نظيف.",
    },
    notes: {
      top: [
        { name_en: "Lemon", name_es: "Limón", name_ar: "ليمون", icon: "lemon" },
        { name_en: "Cumin", name_es: "Comino", name_ar: "كمّون", icon: "cumin" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
      ],
      heart: [
        { name_en: "Frankincense", name_es: "Incienso", name_ar: "لبان", icon: "frankincense" },
        { name_en: "Myrrh", name_es: "Mirra", name_ar: "مرّ", icon: "myrrh" },
        { name_en: "Saffron", name_es: "Azafrán", name_ar: "زعفران", icon: "saffron" },
      ],
      base: [
        { name_en: "Oud", name_es: "Oud", name_ar: "عود", icon: "oud" },
        { name_en: "Benzoin", name_es: "Benjuí", name_ar: "بنزوين", icon: "benzoin" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
      ],
    },
    prices: { ml50: 410, ml100: 695 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "souk spices morocco warm sunlight aromatic"
      bottle_primary: img("photo-1571781926291-c477ebfd024b", "amber bottle gold dark moody"),
      bottle_secondary: [
        img("photo-1615634260167-c8cdede054de", "amber perfume bottle gold"),
        img("photo-1592945403244-b3fbafd7f539", "perfume crystal dark backdrop"),
      ],
      editorial: [
        img("photo-1568879386068-4cc4bfddf8c5", "moroccan souk warm spices"),
        img("photo-1539020140153-e479b8c5d6a3", "incense smoke close-up"),
        img("photo-1539188400847-fdca9f3a4b0d", "saffron threads close-up red"),
      ],
      lifestyle: [
        img("photo-1538137524007-21e48fa42f3f", "souk alley fez morning warm"),
        img("photo-1485875437342-9b39470b3d95", "wooden door old morocco"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#3a2615",
    inspiration_country: "Fès",
    tags: ["aromatic", "incense", "spices", "transportive"],
  },
  // ─── AMBER / SPICY · 4 ─────────────────────────────────────────
  {
    slug: "ambre-du-desert",
    names: { en: "Ambre du Désert", es: "Ambre du Désert", ar: "عنبرُ الصحراء" },
    family: "amber",
    gender: "unisex",
    perfumer: "antoine-vasseur",
    year: 2020,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Ambre du Désert is the last hour of light over the dunes, when the sand has finally stopped giving back the heat and the air becomes the colour of honey.",
        "It opens with bergamot, pink pepper, and a brief cardamom. The familiar handshake before a long conversation.",
        "At the heart, a vanilla absolute — not the bakery kind, but the dark resinous original. Beside it, a centifolia rose laid flat, and a quiet jasmine. Cinnamon underneath, but only as a memory of warmth, not a description.",
        "The base is the amber accord proper: labdanum, benzoin, tonka, a thread of musk, a sliver of patchouli. It dries down like a beach blanket left out overnight — warm, sweet, slightly smoked, never sticky.",
        "Wear it as a closing argument.",
      ],
      es: [
        "Ambre du Désert es la última hora de luz sobre las dunas, cuando la arena por fin ha dejado de devolver el calor y el aire toma el color de la miel.",
        "Abre con bergamota, pimienta rosa y un breve cardamomo. El apretón conocido antes de una larga conversación.",
        "En el corazón, un absoluto de vainilla — no la de panadería, sino el original resinoso y oscuro. A su lado, una rosa centifolia tendida, y un jazmín discreto. Canela debajo, pero solo como recuerdo del calor, no como descripción.",
        "La base es el acorde de ámbar propiamente dicho: labdano, benjuí, haba tonka, un hilo de almizcle, una astilla de pachulí. Cae como una manta de playa olvidada al raso — cálida, dulce, ligeramente ahumada, nunca pegajosa.",
        "Llévalo como un alegato final.",
      ],
      ar: [
        "عنبرُ الصحراء آخرُ ساعةٍ من النور فوق الكثبان، حين يكفّ الرمل أخيراً عن ردّ الحرارة، فيتلوّن الهواءُ بلون العسل.",
        "يفتح ببرغموتٍ، وفلفلٍ وردي، وهيلٍ قصير. مصافحةٌ مألوفة قبل حوارٍ طويل.",
        "في القلب، فانيليا مطلقة — لا فانيليا المخبز، بل الأصلية الراتنجية الداكنة. إلى جانبها وردةُ سنتيفوليا منبسطة، وياسمين هادئ. وقرفةٌ تحتها، لا كوصفٍ، بل كذكرى دفء.",
        "والقاعدةُ مزيجُ العنبر بحدّ ذاته: لادان، بنزوين، حبّةُ التونكا، خيطُ مسك، وشظيّةُ باتشولي. يجفّ كبطّانية شاطئٍ نُسيت في العراء — دافئةٌ حلوة، فيها قليلُ دخان، بلا لزوجة.",
        "البَسه كحجّةٍ ختامية.",
      ],
    },
    ritual: {
      en: "Apply at sunset, never before. Let the warmth of the day decide the dose.",
      es: "Aplica al atardecer, nunca antes. Deja que el calor del día decida la dosis.",
      ar: "ضعه عند الغروب، لا قبله. اترك دفءَ النهار يحدّد المقدار.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
      ],
      heart: [
        { name_en: "Vanilla absolute", name_es: "Vainilla absoluta", name_ar: "فانيليا مطلقة", icon: "vanilla" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Cinnamon", name_es: "Canela", name_ar: "قرفة", icon: "cinnamon" },
      ],
      base: [
        { name_en: "Labdanum", name_es: "Labdano", name_ar: "لادان", icon: "labdanum" },
        { name_en: "Benzoin", name_es: "Benjuí", name_ar: "بنزوين", icon: "benzoin" },
        { name_en: "Tonka", name_es: "Tonka", name_ar: "تونكا", icon: "tonka" },
      ],
    },
    prices: { ml50: 340, ml100: 580 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "amber bottle warm golden hour desert"
      bottle_primary: img("photo-1592945403244-b3fbafd7f539", "amber bottle golden hour warm"),
      bottle_secondary: [
        img("photo-1615634260167-c8cdede054de", "luxury amber bottle dark"),
        img("photo-1571781926291-c477ebfd024b", "bottle warm light backdrop"),
      ],
      editorial: [
        img("photo-1547888020-d5aaa3b25b40", "desert dunes golden hour warm"),
        img("photo-1473773508845-188df298d2d1", "honey amber resin warm"),
        img("photo-1518684079-3c830dcef090", "warm sunset oasis"),
      ],
      lifestyle: [
        img("photo-1547888020-d5aaa3b25b40", "desert sand wind warm hour"),
        img("photo-1462331940025-496dfbfc7564", "honey amber warm sunlight"),
      ],
    },
    featured: true,
    bestseller: true,
    new: false,
    liquid_color_hex: "#a86c2c",
    inspiration_country: "Liwa",
    tags: ["sunset", "warm", "ambery", "honeyed"],
  },
  {
    slug: "saffron-imperial",
    names: { en: "Saffron Imperial", es: "Saffron Imperial", ar: "الزعفرانُ الإمبراطوري" },
    family: "spicy",
    gender: "masculine",
    perfumer: "idris-karim",
    year: 2018,
    edition: { type: "permanent" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Saffron Imperial was built around a single material: saffron tincture from Iran, aged twelve months in copper before it touched the rest of the formula.",
        "It opens warm and immediate. Saffron, of course, but stretched between cumin, cardamom, and a soft pink pepper. The first minute is animal in the politest way.",
        "Heart: leather, a Damascena rose dressed for a quiet evening, and a thread of tobacco — not lit, only present. Cinnamon stays at the edge, doing the bare minimum.",
        "Base: amber, oakmoss, sandalwood, and a labdanum that takes its time. Dries down like a heavy curtain in a hotel room, the kind that absorbs decades of cologne and tea.",
        "It rewards confidence. It will not perform on a hesitant skin.",
      ],
      es: [
        "Saffron Imperial fue construido alrededor de un único material: tintura de azafrán de Irán, envejecida doce meses en cobre antes de tocar el resto de la fórmula.",
        "Abre cálido e inmediato. Azafrán, claro, pero tendido entre comino, cardamomo y una pimienta rosa blanda. El primer minuto es animal del modo más cortés.",
        "Corazón: cuero, una rosa damascena vestida para una velada tranquila, y un hilo de tabaco — no encendido, solo presente. La canela queda al margen, haciendo lo mínimo.",
        "Base: ámbar, musgo de roble, sándalo, y un labdano que se toma su tiempo. Cae como una cortina pesada en una habitación de hotel, de las que absorben décadas de colonia y té.",
        "Premia la confianza. No actúa sobre piel dudosa.",
      ],
      ar: [
        "الزعفرانُ الإمبراطوري بُني حول مادّةٍ واحدة: صبغةُ زعفرانٍ إيراني، عُتّقت في النحاس اثني عشر شهراً قبل أن تلمسَ بقيّةَ التركيبة.",
        "يفتح دافئاً مباشراً. زعفرانٌ بالطبع، لكنّه ممدودٌ بين كمّون وهيل وفلفلٍ وردي لطيف. الدقيقةُ الأولى حيوانيّةٌ بأكثر الطرق تهذيباً.",
        "القلبُ جلدٌ، ووردةٌ دمشقية متهيّئةٌ لسهرة هادئة، وخيطٌ من تبغٍ — غير مشتعل، حاضرٌ فحسب. والقرفةُ في الحاشية، تفعل أقلّ ما يمكن.",
        "والقاعدةُ عنبرٌ وطحلبُ بلّوطٍ وصندلٌ ولادانٌ يأخذ وقته. يجفّ كستارةٍ ثقيلةٍ في غرفة فندق، من تلك التي تمتصّ عقوداً من الكولونيا والشاي.",
        "يكافئ الثقة. ولا يؤدّي على بشرةٍ مترددة.",
      ],
    },
    ritual: {
      en: "Apply at the pulse points and on the back of the neck. Wear with a closed collar.",
      es: "Aplica en los puntos de pulso y en la nuca. Llévalo con cuello cerrado.",
      ar: "ضعه على نقاط النبض وعلى مؤخّرة العنق. والبَسه بياقةٍ مغلقة.",
    },
    notes: {
      top: [
        { name_en: "Saffron", name_es: "Azafrán", name_ar: "زعفران", icon: "saffron" },
        { name_en: "Cumin", name_es: "Comino", name_ar: "كمّون", icon: "cumin" },
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
      ],
      heart: [
        { name_en: "Leather", name_es: "Cuero", name_ar: "جلد", icon: "leather" },
        { name_en: "Damascena rose", name_es: "Rosa damascena", name_ar: "وردة دمشقية", icon: "rose_damascena" },
        { name_en: "Tobacco", name_es: "Tabaco", name_ar: "تبغ", icon: "tobacco" },
      ],
      base: [
        { name_en: "Amber", name_es: "Ámbar", name_ar: "عنبر", icon: "amber" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "Oakmoss", name_es: "Musgo de roble", name_ar: "طحلب البلّوط", icon: "oakmoss" },
      ],
    },
    prices: { ml50: 460, ml100: 780 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "saffron threads red persian luxury still"
      bottle_primary: img("photo-1610456297561-6f6c4d9a8d83", "luxury bottle red saffron tone"),
      bottle_secondary: [
        img("photo-1574870111867-089730e5a72b", "amber perfume dark backdrop"),
        img("photo-1547887537-6158d64c35b3", "amber bottle still life dark"),
      ],
      editorial: [
        img("photo-1539188400847-fdca9f3a4b0d", "saffron threads red persian"),
        img("photo-1542816417-0983c9c9ad53", "moody editorial textile gold"),
        img("photo-1502672023488-70e25813eb80", "hotel curtain warm interior"),
      ],
      lifestyle: [
        img("photo-1492447166138-50c3889fccb1", "man suit tea evening warm"),
        img("photo-1605648916361-9bc12ad6a569", "amber resin metal close"),
      ],
    },
    featured: false,
    bestseller: true,
    new: false,
    liquid_color_hex: "#b85a25",
    inspiration_country: "Isfahan",
    tags: ["spicy", "leather", "tobacco", "imperial"],
  },
  {
    slug: "tabac-royal",
    names: { en: "Tabac Royal", es: "Tabac Royal", ar: "التبغُ الملكي" },
    family: "amber",
    gender: "masculine",
    perfumer: "maurice-belaid",
    year: 2017,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Tabac Royal is a leather chair, a closed library, a small glass of armagnac. Maurice composed it as a portrait of his uncle, who taught him to read before he taught him anything else.",
        "Top: bergamot, neroli, a single grain of black pepper. Quick civilities.",
        "Heart: honeyed tobacco absolute, with hay, tonka bean, and a tobacco-leaf accord that smells of rolled cigars cooled in a wooden drawer. Cinnamon sits behind, low.",
        "Base: vanilla absolute, labdanum, sandalwood, oakmoss. The dry-down is the smell of the chair after you leave. Warm. Patient. Not waiting.",
        "Suitable for those who have stopped explaining their decisions.",
      ],
      es: [
        "Tabac Royal es un sillón de cuero, una biblioteca cerrada, una pequeña copa de armagnac. Maurice lo compuso como retrato de su tío, que le enseñó a leer antes que cualquier otra cosa.",
        "Salida: bergamota, neroli, un único grano de pimienta negra. Cortesías rápidas.",
        "Corazón: absoluto de tabaco meloso, con heno, haba tonka, y un acorde de hoja de tabaco que huele a puros enrollados enfriándose en un cajón de madera. La canela se sienta detrás, baja.",
        "Base: vainilla absoluta, labdano, sándalo, musgo de roble. La caída es el olor del sillón cuando te has ido. Cálida. Paciente. No espera.",
        "Apto para quienes han dejado de explicar sus decisiones.",
      ],
      ar: [
        "التبغُ الملكي كرسيٌّ جلدي، ومكتبةٌ موصدة، وكأسُ أرماغناك صغير. ألّفه موريس بورتريهاً لعمّه الذي علّمه القراءةَ قبل أيّ شيءٍ آخر.",
        "في القمّة: برغموتٌ، ونيرولي، وحبّةٌ واحدة من فلفلٍ أسود. مجاملاتٌ سريعة.",
        "والقلبُ تبغٌ معسّل مطلق، مع قشٍّ وحبّة تونكا، ومزيجُ ورقة تبغٍ تشمّ فيه سيجاراً ملفوفاً يبردُ في درجٍ خشبي. والقرفةُ خلفه، خافتة.",
        "والقاعدةُ فانيليا مطلقة، ولادان، وصندل، وطحلبُ بلّوط. الذيلُ رائحةُ الكرسي بعد أن تغادر. دافئٌ صبور، لا ينتظر.",
        "يصلح لمن كفّوا عن تبرير قراراتهم.",
      ],
    },
    ritual: {
      en: "Apply once on the chest before dressing. Once on the wrist before leaving.",
      es: "Aplica una vez en el pecho antes de vestir. Una vez en la muñeca antes de salir.",
      ar: "ضعه على الصدر قبل اللباس. وعلى المعصم قبل المغادرة.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Black pepper", name_es: "Pimienta negra", name_ar: "فلفل أسود", icon: "black_pepper" },
      ],
      heart: [
        { name_en: "Tobacco absolute", name_es: "Tabaco absoluto", name_ar: "تبغ مطلق", icon: "tobacco" },
        { name_en: "Tonka", name_es: "Tonka", name_ar: "تونكا", icon: "tonka" },
        { name_en: "Cinnamon", name_es: "Canela", name_ar: "قرفة", icon: "cinnamon" },
      ],
      base: [
        { name_en: "Vanilla", name_es: "Vainilla", name_ar: "فانيليا", icon: "vanilla" },
        { name_en: "Labdanum", name_es: "Labdano", name_ar: "لادان", icon: "labdanum" },
        { name_en: "Oakmoss", name_es: "Musgo de roble", name_ar: "طحلب البلّوط", icon: "oakmoss" },
      ],
    },
    prices: { ml50: 320, ml100: 545 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "tobacco leather library dim lamp warm masculine"
      bottle_primary: img("photo-1547887537-6158d64c35b3", "leather perfume bottle warm light"),
      bottle_secondary: [
        img("photo-1588405748880-b434362febfa", "leather bottle gold cap dark"),
        img("photo-1535378917042-10a22c95931a", "dark wooden table bottle"),
      ],
      editorial: [
        img("photo-1502920514313-52581002a659", "old leather books dim library"),
        img("photo-1481627834876-b7833e8f5570", "library old books warm lamp"),
        img("photo-1532012197267-da84d127e765", "tobacco pipe ashtray dim"),
      ],
      lifestyle: [
        img("photo-1492447166138-50c3889fccb1", "man suit library window warm"),
        img("photo-1492011221367-f47e3ccd77a0", "armagnac glass warm interior"),
      ],
    },
    featured: false,
    bestseller: true,
    new: false,
    liquid_color_hex: "#7a4a20",
    inspiration_country: "Andalusia",
    tags: ["tobacco", "leather", "warm", "winter"],
  },
  {
    slug: "ambre-khol",
    names: { en: "Ambre Khol", es: "Ambre Khol", ar: "كحلُ العنبر" },
    family: "amber",
    gender: "feminine",
    perfumer: "yasmin-el-khoury",
    year: 2025,
    edition: { type: "limited", number: "012/250" },
    intensity: "Parfum",
    description: {
      en: [
        "Ambre Khol takes its name from the line that women in Yasmin's family draw under their eyes before any occasion they refuse to call important.",
        "Top: pink pepper, fresh ginger, a softened bergamot. A quick, dark line.",
        "Heart: orange blossom absolute, ylang-ylang, and a Damascena rose that has been weighing what to say. Saffron stays beside them like a watcher.",
        "Base: an unusually pale amber accord — benzoin, tonka, white musk, a thread of sandalwood — left almost transparent so the wearer's skin shows through it. A flicker of patchouli at the very end, only the third hour onward.",
        "It is the perfume of a woman who decides what is important and does not announce the decision.",
      ],
      es: [
        "Ambre Khol toma su nombre de la línea que las mujeres de la familia de Yasmin se dibujan bajo los ojos antes de cualquier ocasión que se niegan a llamar importante.",
        "Salida: pimienta rosa, jengibre fresco, una bergamota suavizada. Una línea breve y oscura.",
        "Corazón: absoluto de azahar, ylang-ylang, y una rosa damascena que ha estado pesando qué decir. El azafrán permanece a su lado como un vigilante.",
        "Base: un acorde de ámbar inusualmente pálido — benjuí, tonka, almizcle blanco, un hilo de sándalo — dejado casi transparente para que la piel de quien lo lleve se transparente a través. Un parpadeo de pachulí al final, solo a partir de la tercera hora.",
        "Es el perfume de una mujer que decide qué es importante y no anuncia la decisión.",
      ],
      ar: [
        "كحلُ العنبر يحمل اسمَ ذلك الخطّ الذي ترسمه نساءُ عائلة ياسمين تحت العيون قبل أيّ مناسبة يأبَين أن يسمّينها مهمّة.",
        "في القمّة: فلفلٌ وردي، وزنجبيلٌ طازج، وبرغموتٌ مليّن. خطٌّ قصيرٌ داكن.",
        "والقلبُ زهرُ برتقالٍ مطلق، وإيلانغ إيلانغ، ووردةٌ دمشقية كانت تفكّر بما تقول. والزعفرانُ إلى جانبها كحارس.",
        "والقاعدةُ عنبرٌ شاحبٌ على غير العادة — بنزوينٌ وتونكا ومسكٌ أبيض وخيطُ صندل — تُرك شفّافاً تقريباً كي تظهر بشرةُ من ترتديه من خلاله. ووميضُ باتشولي في النهاية، من الساعة الثالثة وما بعدها.",
        "إنّه عطرُ امرأةٍ تقرّر ما هو مهمّ ولا تُعلن قرارها.",
      ],
    },
    ritual: {
      en: "Apply once on the collarbone before the eyes. Once behind the knee before the door.",
      es: "Aplica una vez en la clavícula antes de los ojos. Una vez tras la rodilla antes de la puerta.",
      ar: "ضعيه على الترقوة قبل العينين. وخلف الركبة قبل الباب.",
    },
    notes: {
      top: [
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Saffron", name_es: "Azafrán", name_ar: "زعفران", icon: "saffron" },
      ],
      heart: [
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
        { name_en: "Ylang-ylang", name_es: "Ylang-ylang", name_ar: "إيلانغ إيلانغ", icon: "ylang_ylang" },
        { name_en: "Damascena rose", name_es: "Rosa damascena", name_ar: "وردة دمشقية", icon: "rose_damascena" },
      ],
      base: [
        { name_en: "Benzoin", name_es: "Benjuí", name_ar: "بنزوين", icon: "benzoin" },
        { name_en: "Tonka", name_es: "Tonka", name_ar: "تونكا", icon: "tonka" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
      ],
    },
    prices: { ml50: 510, ml100: 870 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "pale amber bottle minimal soft light feminine"
      bottle_primary: img("photo-1547887537-6158d64c35b3", "pale amber bottle soft minimal"),
      bottle_secondary: [
        img("photo-1574870111867-089730e5a72b", "amber bottle dark backdrop"),
        img("photo-1615634260167-c8cdede054de", "amber crystal still life"),
      ],
      editorial: [
        img("photo-1518998053901-5348d3961a04", "rose petals close warm tone"),
        img("photo-1571805341302-f857390a3bb0", "tuberose orange blossom close"),
        img("photo-1583416750470-965b2707b355", "tea brass moroccan warm"),
      ],
      lifestyle: [
        img("photo-1488426862026-3ee34a7d66df", "woman mediterranean window soft"),
        img("photo-1490481651871-ab68de25d43d", "woman silhouette balcony evening"),
      ],
    },
    featured: true,
    bestseller: false,
    new: true,
    liquid_color_hex: "#d49a5c",
    inspiration_country: "Beirut",
    tags: ["amber", "subtle", "feminine", "limited"],
  },
  // ─── FLORAL · 4 ─────────────────────────────────────────────────
  {
    slug: "rose-damas-vintage",
    names: { en: "Rose Damas Vintage", es: "Rose Damas Vintage", ar: "وردةُ دمشق العتيقة" },
    family: "floral",
    gender: "feminine",
    perfumer: "leonore-caspari",
    year: 2019,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Rose Damas Vintage is a rose that has been let to settle. Léonore worked from a tincture distilled in 2011 — a vintage in the wine sense of the word, with the rose accord matured before the rest of the composition was even drafted.",
        "Top: a brief lemon, neroli, and a dry petitgrain. The dressing room before the gown.",
        "Heart: damascena, centifolia, and Sambac jasmine. Three roses across two continents, with a stem of violet leaves cutting across them. The composition is restrained on purpose — the perfumer chose dilution over insistence.",
        "Base: a quiet sandalwood, a sliver of white musk, the lightest oud you have ever met. The whole thing rests like a silk dress folded on a chair.",
        "It is a fragrance that asks to be remembered. It will not work to be noticed.",
      ],
      es: [
        "Rose Damas Vintage es una rosa a la que se ha dejado reposar. Léonore trabajó desde una tintura destilada en 2011 — un vintage en el sentido vinícola, con el acorde de rosa madurado antes de que el resto de la composición se hubiese siquiera borrado en papel.",
        "Salida: un limón breve, neroli, y un petitgrain seco. El vestidor antes del vestido.",
        "Corazón: damascena, centifolia y jazmín sambac. Tres rosas a través de dos continentes, con un tallo de hojas de violeta atravesándolas. La composición está contenida adrede — la perfumista eligió dilución sobre insistencia.",
        "Base: un sándalo discreto, una astilla de almizcle blanco, el oud más leve que hayas conocido. El conjunto reposa como un vestido de seda doblado en una silla.",
        "Es una fragancia que pide ser recordada. No trabajará para ser notada.",
      ],
      ar: [
        "وردةُ دمشق العتيقة وردةٌ تُركت تستقرّ. اشتغلت ليونور من صبغةٍ قُطّرت عام 2011 — \"عتيقةٌ\" بمعنى النبيذ، إذ نضج مزيجُ الورد قبل أن يُكتب سائرُ التركيبة.",
        "في القمّة: ليمونٌ قصير، ونيرولي، وبيتيغرين جافّ. غرفةُ تبديلٍ قبل الثوب.",
        "والقلبُ دمشقية وسنتيفوليا وياسمين سامبَك. ثلاثُ ورودٍ عبر قارّتَين، يخترقها ساقُ أوراق بنفسج. والتركيبةُ مكبوحةٌ عمداً — اختارت العطّارةُ التخفيف على الإصرار.",
        "والقاعدةُ صندلٌ هادئ، وشظيّةٌ من مسكٍ أبيض، وأخفُّ عودٍ التقيتَه. كلُّ ذلك مستريحٌ كثوب حريرٍ مطويٍّ على كرسي.",
        "إنّه عطرٌ يطلب أن يُتذكّر. ولن يجتهد ليُلاحَظ.",
      ],
    },
    ritual: {
      en: "Apply one drop on the inside of the wrist. Sit for a moment before the day begins.",
      es: "Aplica una gota en el interior de la muñeca. Siéntate un instante antes de que empiece el día.",
      ar: "قطرةٌ واحدة على باطن المعصم. اجلسي لحظةً قبل أن يبدأ النهار.",
    },
    notes: {
      top: [
        { name_en: "Lemon", name_es: "Limón", name_ar: "ليمون", icon: "lemon" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
      ],
      heart: [
        { name_en: "Damascena rose", name_es: "Rosa damascena", name_ar: "وردة دمشقية", icon: "rose_damascena" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Sambac jasmine", name_es: "Jazmín sambac", name_ar: "ياسمين سامبَك", icon: "jasmine" },
        { name_en: "Violet leaves", name_es: "Hojas de violeta", name_ar: "أوراق البنفسج", icon: "violet" },
      ],
      base: [
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Light oud", name_es: "Oud ligero", name_ar: "عود خفيف", icon: "oud" },
      ],
    },
    prices: { ml50: 380, ml100: 645 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "rose perfume bottle pale pink soft window light editorial"
      bottle_primary: img("photo-1541643600914-78b084683601", "rose perfume bottle soft window"),
      bottle_secondary: [
        img("photo-1615634260167-c8cdede054de", "luxury perfume soft pink bottle"),
        img("photo-1547887537-6158d64c35b3", "perfume bottle warm light"),
      ],
      editorial: [
        img("photo-1518998053901-5348d3961a04", "rose petals close pale warm"),
        img("photo-1496485651528-cca7b6da7b54", "fresh roses petals soft light"),
        img("photo-1505246170520-c2d5cb6ca5a2", "rose damascena field soft"),
      ],
      lifestyle: [
        img("photo-1438761681033-6461ffad8d80", "woman blonde editorial soft"),
        img("photo-1494790108377-be9c29b29330", "woman portrait soft daylight"),
      ],
    },
    featured: true,
    bestseller: true,
    new: false,
    liquid_color_hex: "#d4929a",
    inspiration_country: "Damascus",
    tags: ["rose", "vintage", "feminine", "signature"],
  },
  {
    slug: "iris-bedouin",
    names: { en: "Iris Bedouin", es: "Iris Bedouin", ar: "سوسنُ البدو" },
    family: "floral",
    gender: "unisex",
    perfumer: "camille-theron",
    year: 2022,
    edition: { type: "permanent" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Iris Bedouin began as an experiment: what happens when you place a Florentine iris in the middle of a Saharan caravan? Camille worked on it for nineteen months and finally let the question answer itself.",
        "Top: cold cardamom, pink pepper, a clean grapefruit zest. The first hour is silvery.",
        "Heart: iris pallida absolute — three years of root maceration — beside a centifolia rose, a sliver of saffron, and a quiet violet. The accord is powdery the way snow is powdery, not the way a cake is.",
        "Base: dry sandalwood, vetiver, a thread of guaiac wood smoke, and ambergris. The iris stays present throughout, as if it had been planted in the sand and refused to leave.",
        "A fragrance for those who have a cold streak in a warm life. Or vice versa.",
      ],
      es: [
        "Iris Bedouin empezó como experimento: ¿qué pasa si pones un iris florentino en mitad de una caravana sahariana? Camille trabajó en él diecinueve meses y finalmente dejó que la pregunta se respondiera sola.",
        "Salida: cardamomo frío, pimienta rosa, una ralladura limpia de pomelo. La primera hora es plateada.",
        "Corazón: iris pallida absoluto — tres años de maceración de raíz — junto a una rosa centifolia, una astilla de azafrán y una violeta discreta. El acorde es en polvo como la nieve, no como un pastel.",
        "Base: sándalo seco, vetiver, un hilo de humo de guayaco, y ámbar gris. El iris permanece presente todo el rato, como si lo hubieran plantado en la arena y se hubiese negado a marcharse.",
        "Una fragancia para quienes tienen una franja fría en una vida cálida. O al revés.",
      ],
      ar: [
        "سوسنُ البدو بدأ تجربةً: ماذا يحدث حين تضع سوسناً فلورنسيّاً في وسط قافلةٍ صحراوية؟ اشتغلت كاميل عليه تسعةَ عشرَ شهراً، ثمّ تركت السؤالَ يجيب نفسه.",
        "في القمّة: هيلٌ بارد، وفلفلٌ وردي، وقشرُ جريب فروتٍ نظيف. الساعةُ الأولى فضّيّة.",
        "والقلبُ سوسن باليدا مطلق — ثلاث سنواتٍ من نقع الجذور — إلى جانب وردةٍ سنتيفوليّة، وشظيّةٍ من زعفران، وبنفسجةٍ هادئة. المزيجُ مسحوقيٌّ بطريقة الثلج، لا بطريقة الكعك.",
        "والقاعدةُ صندلٌ جاف، ونجيلٌ هايتي، وخيطٌ من دخان خشب الغاياك، وعنبر. السوسنُ يبقى حاضراً طوال الوقت، كأنّه زُرع في الرمل ورفض الرحيل.",
        "عطرٌ لمن يحملون شريطاً بارداً في حياةٍ دافئة. أو العكس.",
      ],
    },
    ritual: {
      en: "Apply on cool skin, never warm. Wait an hour before testing it on yourself.",
      es: "Aplica sobre piel fría, nunca cálida. Espera una hora antes de probarlo en ti.",
      ar: "ضعه على بشرةٍ باردة، لا دافئة. وانتظر ساعةً قبل أن تختبره على نفسك.",
    },
    notes: {
      top: [
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
        { name_en: "Grapefruit", name_es: "Pomelo", name_ar: "جريب فروت", icon: "grapefruit" },
      ],
      heart: [
        { name_en: "Iris pallida", name_es: "Iris pallida", name_ar: "سوسن باليدا", icon: "iris" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Violet", name_es: "Violeta", name_ar: "بنفسج", icon: "violet" },
      ],
      base: [
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "Vetiver", name_es: "Vetiver", name_ar: "نجيل هايتي", icon: "vetiver" },
        { name_en: "Guaiac wood", name_es: "Guayaco", name_ar: "خشب الغاياك", icon: "guaiac" },
      ],
    },
    prices: { ml50: 420, ml100: 715 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "iris flower pale violet soft minimal still life"
      bottle_primary: img("photo-1567721913486-6585f069b332", "iris perfume bottle pale soft"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "pale bottle still life cold"),
        img("photo-1605648916361-9bc12ad6a569", "bottle silver moonlight pale"),
      ],
      editorial: [
        img("photo-1531746020798-e6953c6e8e04", "iris flower violet close-up"),
        img("photo-1547888020-d5aaa3b25b40", "desert dunes cool morning"),
        img("photo-1502691876148-a84978e59af8", "sand wind cold morning"),
      ],
      lifestyle: [
        img("photo-1494790108377-be9c29b29330", "portrait soft cool light"),
        img("photo-1517400508447-f8dd518b86db", "cold morning silver light"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#c5b8d4",
    inspiration_country: "Florence",
    tags: ["iris", "powdered", "cool", "minimal"],
  },
  {
    slug: "neroli-sultane",
    names: { en: "Néroli Sultane", es: "Néroli Sultane", ar: "نيروليُّ السلطانة" },
    family: "floral",
    gender: "feminine",
    perfumer: "sofia-aliotti",
    year: 2023,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Néroli Sultane was Sofia Aliotti's letter to her grandmother — a Sicilian woman who used to keep an orange tree in a clay pot on a balcony overlooking the Tyrrhenian.",
        "Top: a sun-warm bergamot, neroli, a hint of mint. The first minute is the inside of a citrus garden after rain.",
        "Heart: orange blossom absolute, jasmine sambac, and a quiet Damascena. There is petitgrain underneath, dry, almost wooden, holding the bouquet upright.",
        "Base: white musk, a clean sandalwood, a sliver of tonka. The sea is hinted at without ever arriving — a question of restraint.",
        "Bright, not sweet. Awake without being loud.",
      ],
      es: [
        "Néroli Sultane fue la carta de Sofia Aliotti a su abuela — una mujer siciliana que solía tener un naranjo en una maceta de barro en un balcón sobre el Tirreno.",
        "Salida: una bergamota tibia, neroli, un toque de menta. El primer minuto es el interior de un jardín de cítricos tras la lluvia.",
        "Corazón: absoluto de azahar, jazmín sambac y una damascena discreta. Hay petitgrain debajo, seco, casi de madera, sosteniendo el ramo erguido.",
        "Base: almizcle blanco, un sándalo limpio, una astilla de tonka. El mar se sugiere sin llegar nunca — cuestión de contención.",
        "Brillante, no dulce. Despierta sin alzar la voz.",
      ],
      ar: [
        "نيروليُّ السلطانة رسالةُ صوفيا أليوتي إلى جدّتها — امرأةٍ صقلّيةٍ كانت تحتفظ بشجرة برتقالٍ في إناءٍ فخّاريٍّ على شرفةٍ تطلّ على البحر التيراني.",
        "في القمّة: برغموتٌ دافئٌ بالشمس، ونيرولي، ولمسةٌ من نعناع. الدقيقةُ الأولى داخلُ بستان حمضيّاتٍ بعد المطر.",
        "والقلبُ زهرُ برتقالٍ مطلق، وياسمين سامبَك، ووردةٌ دمشقيةٌ هادئة. وثمّة بيتيغرينٌ تحتها، جافٌّ يكاد يكون خشبياً، يُمسك الباقةَ معتدلة.",
        "والقاعدةُ مسكٌ أبيض، وصندلٌ نظيف، وشظيّةٌ من تونكا. البحرُ يُلمَح ولا يصل — مسألةُ تحفّظ.",
        "ساطعٌ لا حلو. مستيقظٌ بلا ضجيج.",
      ],
    },
    ritual: {
      en: "Apply at morning, never at night. Once on each wrist, once on the chest.",
      es: "Aplica por la mañana, nunca de noche. Una vez en cada muñeca, una vez en el pecho.",
      ar: "ضعيه صباحاً، لا ليلاً. مرّةً في كلّ معصم، ومرّةً على الصدر.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Mint", name_es: "Menta", name_ar: "نعناع", icon: "mint" },
      ],
      heart: [
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
        { name_en: "Jasmine sambac", name_es: "Jazmín sambac", name_ar: "ياسمين سامبَك", icon: "jasmine" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
      ],
      base: [
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "Tonka", name_es: "Tonka", name_ar: "تونكا", icon: "tonka" },
      ],
    },
    prices: { ml50: 260, ml100: 440 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "orange blossom bottle bright daylight mediterranean"
      bottle_primary: img("photo-1567721913486-6585f069b332", "orange blossom perfume bottle bright"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "perfume bottle daylight warm"),
        img("photo-1541643600914-78b084683601", "perfume soft mediterranean light"),
      ],
      editorial: [
        img("photo-1496485651528-cca7b6da7b54", "orange blossom branch bright"),
        img("photo-1518998053901-5348d3961a04", "white petals soft warm"),
        img("photo-1539020140153-e479b8c5d6a3", "citrus branch leaves close"),
      ],
      lifestyle: [
        img("photo-1488426862026-3ee34a7d66df", "italian woman window mediterranean"),
        img("photo-1502920514313-52581002a659", "balcony terra cotta plant pot"),
      ],
    },
    featured: false,
    bestseller: false,
    new: true,
    liquid_color_hex: "#e9c98a",
    inspiration_country: "Palermo",
    tags: ["citrus-floral", "mediterranean", "daytime", "bright"],
  },
  {
    slug: "fleur-doranger-imperiale",
    names: {
      en: "Fleur d'Oranger Imperiale",
      es: "Fleur d'Oranger Imperiale",
      ar: "زهرُ البرتقال الإمبراطوري",
    },
    family: "floral",
    gender: "feminine",
    perfumer: "leonore-caspari",
    year: 2021,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Fleur d'Oranger Imperiale is a wedding photograph that no one knows is a photograph until the second decade.",
        "Top: bergamot, neroli, a thread of petitgrain. The handshake at the door.",
        "Heart: an orange blossom absolute so dense it has been described — in the lab notebook — as 'edible'. Beside it, tuberose at a respectful distance, and ylang-ylang holding the back of the room.",
        "Base: tonka, a clean white musk, a slow sandalwood, a thread of benzoin. The composition stays sweet in the cheek, never in the throat.",
        "It is a fragrance about the future, written by a perfumer who refuses to be sentimental about it.",
      ],
      es: [
        "Fleur d'Oranger Imperiale es una fotografía de boda que nadie sabe que es fotografía hasta la segunda década.",
        "Salida: bergamota, neroli, un hilo de petitgrain. El apretón en la puerta.",
        "Corazón: un absoluto de azahar tan denso que ha sido descrito — en el cuaderno de laboratorio — como 'comestible'. A su lado, el nardo a una distancia respetuosa, y el ylang-ylang sosteniendo el fondo de la sala.",
        "Base: tonka, un almizcle blanco limpio, un sándalo lento, un hilo de benjuí. La composición se queda dulce en la mejilla, nunca en la garganta.",
        "Es una fragancia sobre el futuro, escrita por una perfumista que se niega a ponerse sentimental al respecto.",
      ],
      ar: [
        "زهرُ البرتقال الإمبراطوري صورةُ عرسٍ لا يعرف أحدٌ أنّها صورة إلا في العقد الثاني.",
        "في القمّة: برغموتٌ، ونيرولي، وخيطُ بيتيغرين. مصافحةٌ عند الباب.",
        "والقلبُ زهرُ برتقالٍ مطلق كثيفٌ إلى حدّ وُصف — في دفتر المختبر — بأنّه «صالحٌ للأكل». إلى جانبه التيوبروز على مسافةٍ محترمة، والإيلانغ إيلانغ يُمسك مؤخّرة الغرفة.",
        "والقاعدةُ تونكا، ومسكٌ أبيض نظيف، وصندلٌ بطيء، وخيطُ بنزوين. التركيبةُ تبقى حلوةً على الخدّ، لا في الحلق.",
        "إنّه عطرٌ عن المستقبل، كتبته عطّارةٌ ترفض أن تتعاطف معه.",
      ],
    },
    ritual: {
      en: "Apply at the throat. Once. Do not retouch.",
      es: "Aplica en la garganta. Una vez. No retoques.",
      ar: "ضعيه على الحلق. مرّةً واحدة. لا تُعيدي.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
      ],
      heart: [
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
        { name_en: "Tuberose", name_es: "Nardo", name_ar: "تيوبروز", icon: "tuberose" },
        { name_en: "Ylang-ylang", name_es: "Ylang-ylang", name_ar: "إيلانغ إيلانغ", icon: "ylang_ylang" },
      ],
      base: [
        { name_en: "Tonka", name_es: "Tonka", name_ar: "تونكا", icon: "tonka" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
      ],
    },
    prices: { ml50: 290, ml100: 495 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "orange blossom bridal soft white petals editorial"
      bottle_primary: img("photo-1547887537-6158d64c35b3", "white perfume bottle bridal soft"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "perfume bottle daylight soft"),
        img("photo-1571781926291-c477ebfd024b", "bottle bridal warm light"),
      ],
      editorial: [
        img("photo-1496485651528-cca7b6da7b54", "orange blossom branch bridal"),
        img("photo-1518998053901-5348d3961a04", "petals soft warm bridal"),
        img("photo-1505246170520-c2d5cb6ca5a2", "flower field soft bridal"),
      ],
      lifestyle: [
        img("photo-1494790108377-be9c29b29330", "woman portrait window soft"),
        img("photo-1490481651871-ab68de25d43d", "woman silhouette window soft"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#f3dca8",
    inspiration_country: "Seville",
    tags: ["orange-blossom", "bridal", "soft", "imperial"],
  },
  // ─── WOODY · 3 ─────────────────────────────────────────────────
  {
    slug: "bois-sacre",
    names: { en: "Bois Sacré", es: "Bois Sacré", ar: "الخشبُ المقدّس" },
    family: "woody",
    gender: "masculine",
    perfumer: "antoine-vasseur",
    year: 2018,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Bois Sacré is the floor of a church in autumn — cedar pews, an incense burner being filled, the long quiet between two services.",
        "Top: a sober bergamot, juniper, cypress. The cold air on the way to the building.",
        "Heart: frankincense, cedar from the Atlas, guaiac wood. The composition shifts unexpectedly to dryness — the perfumer wanted it to feel architectural rather than spiritual.",
        "Base: vetiver, oakmoss, labdanum, a sliver of leather. The dry-down is the floor itself, varnished a hundred times, holding the smell of every coat that ever rested on it.",
        "Worn well by those who think before they speak.",
      ],
      es: [
        "Bois Sacré es el suelo de una iglesia en otoño — bancos de cedro, un incensario que están llenando, el largo silencio entre dos oficios.",
        "Salida: una bergamota sobria, enebro, ciprés. El aire frío de camino al edificio.",
        "Corazón: incienso, cedro del Atlas, guayaco. La composición vira inesperadamente a la sequedad — el perfumista quería que se sintiera arquitectónica más que espiritual.",
        "Base: vetiver, musgo de roble, labdano, una astilla de cuero. La caída es el suelo mismo, barnizado cien veces, conservando el olor de cada abrigo que descansó en él.",
        "Llevado bien por quienes piensan antes de hablar.",
      ],
      ar: [
        "الخشبُ المقدّس أرضيّةُ كنيسةٍ في الخريف — مقاعدٌ من أرز، ومبخرةٌ تُملأ، والصمتُ الطويل بين قدّاسَين.",
        "في القمّة: برغموتٌ رزين، وعرعر، وسرو. الهواءُ الباردُ في الطريق إلى المبنى.",
        "والقلبُ لبانٌ، وأرزُ الأطلس، وخشبُ الغاياك. التركيبةُ تنحرف فجأةً نحو الجفاف — أراد العطّار أن يبدو معمارياً لا روحانياً.",
        "والقاعدةُ نجيلٌ هايتي، وطحلبُ بلّوط، ولادان، وشظيّةٌ من جلد. الذيلُ الأرضيّةُ نفسها، طُلّيت بالورنيش مئةَ مرّة، تحتفظ برائحة كلّ معطفٍ استراح عليها.",
        "يرتديه جيّداً من يفكّرون قبل أن يتكلّموا.",
      ],
    },
    ritual: {
      en: "One drop on the inner collar of a coat. Wear the coat into the cold.",
      es: "Una gota en el cuello interior de un abrigo. Lleva el abrigo al frío.",
      ar: "قطرةٌ على الياقة الداخلية لمعطف. والبَس المعطفَ في البرد.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
      ],
      heart: [
        { name_en: "Frankincense", name_es: "Incienso", name_ar: "لبان", icon: "frankincense" },
        { name_en: "Atlas cedar", name_es: "Cedro del Atlas", name_ar: "أرز الأطلس", icon: "cedar" },
        { name_en: "Guaiac wood", name_es: "Guayaco", name_ar: "خشب الغاياك", icon: "guaiac" },
      ],
      base: [
        { name_en: "Vetiver", name_es: "Vetiver", name_ar: "نجيل هايتي", icon: "vetiver" },
        { name_en: "Oakmoss", name_es: "Musgo de roble", name_ar: "طحلب البلّوط", icon: "oakmoss" },
        { name_en: "Labdanum", name_es: "Labdano", name_ar: "لادان", icon: "labdanum" },
      ],
    },
    prices: { ml50: 310, ml100: 525 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "cedar wood church bench autumn cold light architectural"
      bottle_primary: img("photo-1588405748880-b434362febfa", "wood perfume bottle dark architectural"),
      bottle_secondary: [
        img("photo-1535378917042-10a22c95931a", "wooden table perfume dark"),
        img("photo-1547887537-6158d64c35b3", "perfume bottle warm light woody"),
      ],
      editorial: [
        img("photo-1473773508845-188df298d2d1", "cedar workshop wood resin"),
        img("photo-1481627834876-b7833e8f5570", "old library cold lamp architectural"),
        img("photo-1502920917128-1aa500764cbd", "courtyard architectural arch"),
      ],
      lifestyle: [
        img("photo-1496345875659-11f7dd282d1d", "man portrait architectural workshop"),
        img("photo-1530541930197-ff16ac917b0e", "winter coat dim light"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#4a3520",
    inspiration_country: "Atlas",
    tags: ["woody", "incense", "architectural", "winter"],
  },
  {
    slug: "cedre-brule",
    names: { en: "Cèdre Brûlé", es: "Cèdre Brûlé", ar: "الأرزُ المحروق" },
    family: "woody",
    gender: "unisex",
    perfumer: "camille-theron",
    year: 2020,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Cèdre Brûlé takes its title from the smell of a cedar trunk after a forest fire, when the wood is no longer wood but has not yet become ash.",
        "Top: dry pink pepper, a juniper berry, an almost-smoked grapefruit. The composition is alarming on purpose.",
        "Heart: cedar, vetiver, a guaiac wood note that has been pushed darker than usual. Iris underneath, doing its powdered work.",
        "Base: birch tar, oakmoss, leather, a slow ambergris. The fragrance becomes warmer as the hour passes — it ends almost soft, after starting almost severe.",
        "For those who want a fragrance to argue with them before agreeing.",
      ],
      es: [
        "Cèdre Brûlé toma su título del olor de un tronco de cedro tras un incendio forestal, cuando la madera ya no es madera pero todavía no se ha vuelto ceniza.",
        "Salida: pimienta rosa seca, una baya de enebro, un pomelo casi ahumado. La composición es alarmante a propósito.",
        "Corazón: cedro, vetiver, una nota de guayaco empujada más oscura de lo habitual. Iris debajo, haciendo su trabajo en polvo.",
        "Base: brea de abedul, musgo de roble, cuero, un ámbar gris lento. La fragancia se vuelve más cálida con la hora — termina casi suave, tras comenzar casi severa.",
        "Para quienes quieren que una fragancia discuta con ellos antes de aceptarlos.",
      ],
      ar: [
        "الأرزُ المحروق يأخذ عنوانَه من رائحة جذعِ أرزٍ بعد حريق غابة، حين لا يعود الخشبُ خشباً ولم يصر بعدُ رماداً.",
        "في القمّة: فلفلٌ وردي جافّ، وحبّةُ عرعر، وجريب فروتٍ يكاد يكون مدخّناً. التركيبةُ مُقلقةٌ عمداً.",
        "والقلبُ أرز، ونجيلٌ هايتي، ونغمةُ غاياكٍ دُفعت إلى عتمةٍ أعمق من المعتاد. والسوسنُ تحته يقوم بعمله المسحوقي.",
        "والقاعدةُ قطرانُ بتولا، وطحلبُ بلّوط، وجلد، وعنبرٌ بطيء. تصبح التركيبةُ أدفأ مع مرور الساعة — تنتهي ناعمةً تقريباً، بعد أن بدأت قاسيةً تقريباً.",
        "لمن يريدون عطراً يجادلهم قبل أن يوافقهم.",
      ],
    },
    ritual: {
      en: "One drop on a wool sleeve. Wait until the room asks where the fire is.",
      es: "Una gota en una manga de lana. Espera hasta que la sala pregunte dónde está el fuego.",
      ar: "قطرةٌ على كمٍّ صوفي. انتظر حتى تسأل الغرفةُ أين النار.",
    },
    notes: {
      top: [
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
        { name_en: "Grapefruit", name_es: "Pomelo", name_ar: "جريب فروت", icon: "grapefruit" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
      ],
      heart: [
        { name_en: "Cedar", name_es: "Cedro", name_ar: "أرز", icon: "cedar" },
        { name_en: "Vetiver", name_es: "Vetiver", name_ar: "نجيل هايتي", icon: "vetiver" },
        { name_en: "Guaiac wood", name_es: "Guayaco", name_ar: "خشب الغاياك", icon: "guaiac" },
      ],
      base: [
        { name_en: "Birch tar", name_es: "Brea de abedul", name_ar: "قطران البتولا", icon: "birch_tar" },
        { name_en: "Leather", name_es: "Cuero", name_ar: "جلد", icon: "leather" },
        { name_en: "Oakmoss", name_es: "Musgo de roble", name_ar: "طحلب البلّوط", icon: "oakmoss" },
      ],
    },
    prices: { ml50: 290, ml100: 490 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "burnt cedar wood charcoal dark smoky still life"
      bottle_primary: img("photo-1535378917042-10a22c95931a", "wooden charred bottle smoky dark"),
      bottle_secondary: [
        img("photo-1588405748880-b434362febfa", "wooden bottle dark moody"),
        img("photo-1571781926291-c477ebfd024b", "amber bottle dark smoky"),
      ],
      editorial: [
        img("photo-1532012197267-da84d127e765", "burnt wood charcoal close"),
        img("photo-1473773508845-188df298d2d1", "cedar workshop dim"),
        img("photo-1502691876148-a84978e59af8", "smoke incense dark texture"),
      ],
      lifestyle: [
        img("photo-1481627834876-b7833e8f5570", "dim warm lamp library"),
        img("photo-1485875437342-9b39470b3d95", "wooden trunk fire ember"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#5a3a25",
    inspiration_country: "Lebanon",
    tags: ["woody", "smoky", "unconventional", "transitional"],
  },
  {
    slug: "bois-de-mysore",
    names: { en: "Bois de Mysore", es: "Bois de Mysore", ar: "خشبُ ميسور" },
    family: "woody",
    gender: "unisex",
    perfumer: "hassan-al-mansouri",
    year: 2016,
    edition: { type: "permanent" },
    intensity: "Extrait de Parfum",
    description: {
      en: [
        "Bois de Mysore is sandalwood the way it used to be — Indian, old, slow. The composition was built around a tincture of Mysore santal that the maison has been holding since 2009.",
        "Top: cardamom, a clean bergamot, a thread of pink pepper. The cup before the bowl.",
        "Heart: sandalwood absolute, neroli, and a centifolia rose laid quietly. The wood is the centre and the sentence.",
        "Base: a benzoin that warms but never sweetens, a thread of vanilla absolute, white musk, a sliver of amber. The fragrance dries down to milk, to prayer, to a temple interior at dusk.",
        "For those who own a single object that takes them home.",
      ],
      es: [
        "Bois de Mysore es sándalo como solía ser — indio, viejo, lento. La composición se construyó alrededor de una tintura de sándalo de Mysore que la maison guarda desde 2009.",
        "Salida: cardamomo, una bergamota limpia, un hilo de pimienta rosa. La taza antes del cuenco.",
        "Corazón: sándalo absoluto, neroli y una rosa centifolia tendida en silencio. La madera es el centro y la frase.",
        "Base: un benjuí que calienta sin endulzar, un hilo de vainilla absoluta, almizcle blanco, una astilla de ámbar. La fragancia cae a leche, a oración, al interior de un templo al ocaso.",
        "Para quienes poseen un único objeto que los lleva a casa.",
      ],
      ar: [
        "خشبُ ميسور صندلٌ كما كان قديماً — هندي، عتيق، بطيء. بُنيت التركيبةُ حول صبغةِ صندلٍ من ميسور احتفظت بها الدارُ منذ 2009.",
        "في القمّة: هيلٌ، وبرغموتٌ نظيف، وخيطٌ من فلفلٍ وردي. الكأسُ قبل القَدَح.",
        "والقلبُ صندلٌ مطلق، ونيرولي، ووردةٌ سنتيفوليّةٌ مستلقيةٌ في صمت. الخشبُ هو المركزُ والجملة.",
        "والقاعدةُ بنزوينٌ يدفّئ ولا يحلّي، وخيطُ فانيليا مطلقة، ومسكٌ أبيض، وشظيّةٌ من عنبر. يجفّ العطرُ إلى حليبٍ، إلى صلاةٍ، إلى داخل معبدٍ عند الغسق.",
        "لمن يملكون شيئاً واحداً يأخذهم إلى البيت.",
      ],
    },
    ritual: {
      en: "Apply once at the heart. Bow your head before standing.",
      es: "Aplica una vez en el corazón. Inclina la cabeza antes de incorporarte.",
      ar: "ضعه على القلب مرّةً. أحنِ رأسَك قبل أن تنهض.",
    },
    notes: {
      top: [
        { name_en: "Cardamom", name_es: "Cardamomo", name_ar: "هيل", icon: "cardamom" },
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Pink pepper", name_es: "Pimienta rosa", name_ar: "فلفل وردي", icon: "pink_pepper" },
      ],
      heart: [
        { name_en: "Sandalwood absolute", name_es: "Sándalo absoluto", name_ar: "صندل مطلق", icon: "sandalwood" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
      ],
      base: [
        { name_en: "Benzoin", name_es: "Benjuí", name_ar: "بنزوين", icon: "benzoin" },
        { name_en: "Vanilla", name_es: "Vainilla", name_ar: "فانيليا", icon: "vanilla" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
      ],
    },
    prices: { ml50: 380, ml100: 650 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "sandalwood temple india warm dusk wood detail"
      bottle_primary: img("photo-1571781926291-c477ebfd024b", "sandal perfume bottle warm dusk"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "wooden bottle warm light"),
        img("photo-1535378917042-10a22c95931a", "wooden table bottle warm"),
      ],
      editorial: [
        img("photo-1473773508845-188df298d2d1", "sandalwood workshop close"),
        img("photo-1502920917128-1aa500764cbd", "temple courtyard dusk"),
        img("photo-1583416750470-965b2707b355", "tea brass warm temple"),
      ],
      lifestyle: [
        img("photo-1531123897727-8f129e1688ce", "man portrait dusk warm"),
        img("photo-1502691876148-a84978e59af8", "incense smoke dusk"),
      ],
    },
    featured: true,
    bestseller: false,
    new: false,
    liquid_color_hex: "#a87a4a",
    inspiration_country: "Mysore",
    tags: ["sandalwood", "meditative", "milky", "heritage"],
  },
  // ─── FRESH / AQUATIC · 3 ───────────────────────────────────────
  {
    slug: "hesperides-atlas",
    names: { en: "Hespérides Atlas", es: "Hespérides Atlas", ar: "هسبيريدِس الأطلس" },
    family: "fresh",
    gender: "unisex",
    perfumer: "sofia-aliotti",
    year: 2024,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Hespérides Atlas is the morning along the road from Casablanca to Essaouira — citrus orchards, salt in the air, mint cooling in a glass on a metal tray.",
        "Top: a bright Sicilian lemon, a grapefruit, a quiet bergamot, a single leaf of mint.",
        "Heart: neroli, petitgrain, a thread of orange blossom. The composition stays vertical, never sweet, because the perfumer wanted it to feel like a held glass of water.",
        "Base: cedar, white musk, a clean vetiver. The fragrance disappears like a wet handprint on stone — not gone, simply having done its work.",
        "Designed for the first three hours of the day. Reapply if necessary.",
      ],
      es: [
        "Hespérides Atlas es la mañana en la carretera de Casablanca a Essaouira — huertos de cítricos, sal en el aire, menta enfriándose en un vaso sobre una bandeja de metal.",
        "Salida: un limón siciliano brillante, un pomelo, una bergamota discreta, una sola hoja de menta.",
        "Corazón: neroli, petitgrain, un hilo de azahar. La composición se queda vertical, nunca dulce, porque la perfumista quería que se sintiera como un vaso de agua sostenido en la mano.",
        "Base: cedro, almizcle blanco, un vetiver limpio. La fragancia desaparece como una huella mojada sobre la piedra — no se va, simplemente ha hecho su trabajo.",
        "Diseñada para las primeras tres horas del día. Reaplica si es necesario.",
      ],
      ar: [
        "هسبيريدِس الأطلس صباحُ الطريق من الدار البيضاء إلى الصويرة — بساتينُ الحمضيّات، الملحُ في الهواء، النعناعُ يبردُ في كأسٍ على صينيةٍ معدنية.",
        "في القمّة: ليمونٌ صقلّيّ ساطع، وجريب فروت، وبرغموتٌ هادئ، وورقةٌ واحدة من نعناع.",
        "والقلبُ نيرولي، وبيتيغرين، وخيطُ زهر برتقال. التركيبةُ تبقى عمودية، لا حلوةً أبداً، لأنّ العطّارة أرادتها كأنّها كأسُ ماءٍ مرفوعةٌ في اليد.",
        "والقاعدةُ أرز، ومسكٌ أبيض، ونجيلٌ هايتي نظيف. يختفي العطرُ كأثر يدٍ مبتلّةٍ على حجر — لا يذهب، لكنّه أنجز عمله.",
        "صُمّم للساعات الثلاث الأولى من النهار. أعِد تطبيقَه إن لزم.",
      ],
    },
    ritual: {
      en: "Apply on the wrists at sunrise. Drink water before deciding to dress.",
      es: "Aplica en las muñecas al amanecer. Bebe agua antes de decidir vestirte.",
      ar: "ضعه على المعصمَين عند الفجر. اشرب ماءً قبل أن تقرّر اللباس.",
    },
    notes: {
      top: [
        { name_en: "Sicilian lemon", name_es: "Limón siciliano", name_ar: "ليمون صقلّي", icon: "lemon" },
        { name_en: "Grapefruit", name_es: "Pomelo", name_ar: "جريب فروت", icon: "grapefruit" },
        { name_en: "Mint", name_es: "Menta", name_ar: "نعناع", icon: "mint" },
      ],
      heart: [
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Petitgrain", name_es: "Petitgrain", name_ar: "بيتيغرين", icon: "petitgrain" },
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
      ],
      base: [
        { name_en: "Cedar", name_es: "Cedro", name_ar: "أرز", icon: "cedar" },
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Vetiver", name_es: "Vetiver", name_ar: "نجيل هايتي", icon: "vetiver" },
      ],
    },
    prices: { ml50: 220, ml100: 375 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "citrus lemon orchard bright daylight clean minimal"
      bottle_primary: img("photo-1567721913486-6585f069b332", "citrus bottle bright daylight"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "pale bottle bright daylight"),
        img("photo-1547887537-6158d64c35b3", "perfume bottle daylight clean"),
      ],
      editorial: [
        img("photo-1538137524007-21e48fa42f3f", "moroccan coast bright morning"),
        img("photo-1496485651528-cca7b6da7b54", "citrus branch bright clean"),
        img("photo-1502691876148-a84978e59af8", "mint glass tea bright"),
      ],
      lifestyle: [
        img("photo-1538137524007-21e48fa42f3f", "morocco coast morning clean"),
        img("photo-1488426862026-3ee34a7d66df", "woman window mediterranean clean"),
      ],
    },
    featured: false,
    bestseller: false,
    new: true,
    liquid_color_hex: "#e9e5b8",
    inspiration_country: "Essaouira",
    tags: ["citrus", "fresh", "morning", "summer"],
  },
  {
    slug: "vetiver-khaleej",
    names: { en: "Vétiver Khaleej", es: "Vétiver Khaleej", ar: "نجيلُ الخليج" },
    family: "fresh",
    gender: "masculine",
    perfumer: "idris-karim",
    year: 2017,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Vétiver Khaleej is the smell of a yacht's wooden deck after the salt has dried — vetiver as a coastal material rather than a forest one.",
        "Top: grapefruit, bergamot, a sober mint. The first minute is the deck before anyone has stepped onto it.",
        "Heart: Haitian vetiver — the smoked variety — alongside cedar and a clean iris. The composition is bracing without ever becoming cold.",
        "Base: white musk, ambergris, a sliver of guaiac wood. The fragrance ends with a faint salinity — the deck is still warm, but the sun has finally left.",
        "For those who have spent more time near water than they let on.",
      ],
      es: [
        "Vétiver Khaleej es el olor de la cubierta de madera de un yate después de que la sal se haya secado — vetiver como material costero más que forestal.",
        "Salida: pomelo, bergamota, una menta sobria. El primer minuto es la cubierta antes de que nadie haya puesto pie en ella.",
        "Corazón: vetiver haitiano — la variedad ahumada — junto con cedro y un iris limpio. La composición es tonificante sin volverse fría.",
        "Base: almizcle blanco, ámbar gris, una astilla de guayaco. La fragancia termina con una salinidad débil — la cubierta sigue cálida, pero el sol al fin se ha ido.",
        "Para quienes han pasado más tiempo cerca del agua del que admiten.",
      ],
      ar: [
        "نجيلُ الخليج رائحةُ سطحٍ خشبيٍّ في يختٍ بعد أن جفّ الملح — النجيلُ بوصفه مادّةً ساحلية لا غابيّة.",
        "في القمّة: جريب فروت، وبرغموت، ونعناعٌ رزين. الدقيقةُ الأولى السطحُ قبل أن يطأَه أحد.",
        "والقلبُ نجيلٌ هايتي — الصنفُ المدخّن — مع أرزٍ وسوسنٍ نظيف. التركيبةُ منعشةٌ دون أن تبردَ أبداً.",
        "والقاعدةُ مسكٌ أبيض، وعنبر، وشظيّةٌ من خشب الغاياك. ينتهي العطرُ بملوحةٍ خفيفة — السطحُ لا يزال دافئاً، لكنّ الشمسَ غادرت أخيراً.",
        "لمن قضَوا قرب الماءِ وقتاً أكثر ممّا يبوحون.",
      ],
    },
    ritual: {
      en: "Apply once on a clean shirt. Walk towards the wind.",
      es: "Aplica una vez en una camisa limpia. Camina hacia el viento.",
      ar: "ضعه على قميصٍ نظيف. وامشِ باتجاه الريح.",
    },
    notes: {
      top: [
        { name_en: "Grapefruit", name_es: "Pomelo", name_ar: "جريب فروت", icon: "grapefruit" },
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Mint", name_es: "Menta", name_ar: "نعناع", icon: "mint" },
      ],
      heart: [
        { name_en: "Haitian vetiver", name_es: "Vetiver haitiano", name_ar: "نجيل هايتي", icon: "vetiver" },
        { name_en: "Cedar", name_es: "Cedro", name_ar: "أرز", icon: "cedar" },
        { name_en: "Iris", name_es: "Iris", name_ar: "سوسن", icon: "iris" },
      ],
      base: [
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Sea salt", name_es: "Sal de mar", name_ar: "ملح البحر", icon: "sea_salt" },
        { name_en: "Guaiac wood", name_es: "Guayaco", name_ar: "خشب الغاياك", icon: "guaiac" },
      ],
    },
    prices: { ml50: 240, ml100: 410 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "yacht wooden deck salt water bright"
      bottle_primary: img("photo-1547887537-6158d64c35b3", "fresh aquatic bottle bright"),
      bottle_secondary: [
        img("photo-1567721913486-6585f069b332", "fresh bottle bright daylight"),
        img("photo-1605648916361-9bc12ad6a569", "silver bottle bright fresh"),
      ],
      editorial: [
        img("photo-1488426862026-3ee34a7d66df", "italian coast yacht bright"),
        img("photo-1518684079-3c830dcef090", "wooden deck water bright"),
        img("photo-1502920917128-1aa500764cbd", "coastal stone arch bright"),
      ],
      lifestyle: [
        img("photo-1531123897727-8f129e1688ce", "man coast portrait bright"),
        img("photo-1502672023488-70e25813eb80", "deck wood bright morning"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#9bc1b8",
    inspiration_country: "Khor Fakkan",
    tags: ["aquatic", "vetiver", "coastal", "summer"],
  },
  {
    slug: "eau-de-medine",
    names: { en: "Eau de Médine", es: "Eau de Médine", ar: "ماءُ المدينة" },
    family: "aquatic",
    gender: "unisex",
    perfumer: "yasmin-el-khoury",
    year: 2015,
    edition: { type: "permanent" },
    intensity: "Eau de Parfum",
    description: {
      en: [
        "Eau de Médine is the smell of a stone fountain in the centre of an old Arab city, washed every morning by hand, kept cool by shade.",
        "Top: bergamot, neroli, a single mint leaf, a thread of ozone — the air before the dawn call.",
        "Heart: orange blossom, a quiet centifolia rose, a sliver of iris. The fragrance is clean in the way a courtyard is clean — swept by someone who cares.",
        "Base: white musk, sea salt, a clean sandalwood. There is one drop of cedar at the very base, just enough to remind the wearer that water needs something to flow over.",
        "For those who arrive on time and stay quietly.",
      ],
      es: [
        "Eau de Médine es el olor de una fuente de piedra en el centro de una vieja ciudad árabe, lavada cada mañana a mano, mantenida fresca por la sombra.",
        "Salida: bergamota, neroli, una sola hoja de menta, un hilo de ozono — el aire antes de la llamada al alba.",
        "Corazón: azahar, una rosa centifolia discreta, una astilla de iris. La fragancia es limpia como un patio limpio — barrido por alguien que cuida.",
        "Base: almizcle blanco, sal de mar, un sándalo limpio. Hay una gota de cedro al fondo, lo justo para recordarle a quien lo lleve que el agua necesita algo sobre lo que fluir.",
        "Para quienes llegan a tiempo y se quedan en silencio.",
      ],
      ar: [
        "ماءُ المدينة رائحةُ نافورةٍ حجريّة في وسط مدينةٍ عربيّة عتيقة، تُغسل كلّ صباحٍ باليد، ويُبقيها الظلّ باردة.",
        "في القمّة: برغموتٌ، ونيرولي، وورقةُ نعناعٍ واحدة، وخيطٌ من أوزون — الهواءُ قبل أذان الفجر.",
        "والقلبُ زهرُ برتقال، ووردةُ سنتيفوليّةٍ هادئة، وشظيّةٌ من سوسن. العطرُ نظيفٌ بنظافة فناءٍ — كنسَه شخصٌ يُبالي.",
        "والقاعدةُ مسكٌ أبيض، وملحُ بحر، وصندلٌ نظيف. ثمّة قطرةٌ من أرزٍ في القاع، تكفي لتذكير من يلبسه بأنّ الماءَ يحتاج إلى شيءٍ يجري عليه.",
        "لمن يصلون في موعدهم ويبقَون في صمت.",
      ],
    },
    ritual: {
      en: "Apply twice on bare skin, once on a clean white shirt. Drink water before stepping out.",
      es: "Aplica dos veces en piel desnuda, una en una camisa blanca limpia. Bebe agua antes de salir.",
      ar: "ضعه مرّتَين على البشرة، ومرّةً على قميصٍ أبيضَ نظيف. اشرب ماءً قبل الخروج.",
    },
    notes: {
      top: [
        { name_en: "Bergamot", name_es: "Bergamota", name_ar: "برغموت", icon: "bergamot" },
        { name_en: "Neroli", name_es: "Neroli", name_ar: "نيرولي", icon: "neroli" },
        { name_en: "Mint", name_es: "Menta", name_ar: "نعناع", icon: "mint" },
        { name_en: "Ozone", name_es: "Ozono", name_ar: "أوزون", icon: "ozone" },
      ],
      heart: [
        { name_en: "Orange blossom", name_es: "Azahar", name_ar: "زهر برتقال", icon: "orange_blossom" },
        { name_en: "Centifolia rose", name_es: "Rosa centifolia", name_ar: "وردة سنتيفوليا", icon: "rose_centifolia" },
        { name_en: "Iris", name_es: "Iris", name_ar: "سوسن", icon: "iris" },
      ],
      base: [
        { name_en: "White musk", name_es: "Almizcle blanco", name_ar: "مسك أبيض", icon: "musk" },
        { name_en: "Sea salt", name_es: "Sal de mar", name_ar: "ملح البحر", icon: "sea_salt" },
        { name_en: "Sandalwood", name_es: "Sándalo", name_ar: "صندل", icon: "sandalwood" },
      ],
    },
    prices: { ml50: 190, ml100: 320 },
    stripeLinks: { ml50: "", ml100: "" },
    images: {
      // Unsplash query: "stone fountain old arab city water cool morning"
      bottle_primary: img("photo-1567721913486-6585f069b332", "clean aquatic perfume bottle bright"),
      bottle_secondary: [
        img("photo-1547887537-6158d64c35b3", "fresh perfume bottle clean daylight"),
        img("photo-1547887537-6158d64c35b3", "pale bottle bright minimal"),
      ],
      editorial: [
        img("photo-1502920917128-1aa500764cbd", "stone fountain courtyard cool"),
        img("photo-1543248939-4296e1fea89b", "moroccan courtyard fountain cool"),
        img("photo-1564540586988-aa4e53c3d799", "arabic calligraphy stone wall"),
      ],
      lifestyle: [
        img("photo-1538137524007-21e48fa42f3f", "morocco alley morning fresh"),
        img("photo-1531746020798-e6953c6e8e04", "woman portrait window cool"),
      ],
    },
    featured: false,
    bestseller: false,
    new: false,
    liquid_color_hex: "#c4d4d0",
    inspiration_country: "Marrakech",
    tags: ["aquatic", "clean", "everyday", "morning"],
  },
] as const;

export const ALL_SLUGS: ReadonlyArray<string> = PERFUMES.map((p) => p.slug);

export function getProductBySlug(slug: string): Perfume | undefined {
  return PERFUMES.find((p) => p.slug === slug);
}

export function getProductsByFamily(family: Family): ReadonlyArray<Perfume> {
  return PERFUMES.filter((p) => p.family === family);
}

export function getRelatedProducts(
  slug: string,
  limit = 3,
): ReadonlyArray<Perfume> {
  const current = getProductBySlug(slug);
  if (!current) return [];
  const sameFamily = PERFUMES.filter(
    (p) => p.slug !== slug && p.family === current.family,
  );
  const others = PERFUMES.filter(
    (p) => p.slug !== slug && p.family !== current.family,
  );
  return [...sameFamily, ...others].slice(0, limit);
}
