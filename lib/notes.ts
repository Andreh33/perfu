/**
 * Olfactive notes catalogue.
 * Each entry pairs trilingual descriptions with abstract SVG path data
 * (24x24 viewBox, stroke="currentColor"). Paths are deliberately minimal
 * — a single glyph per note — so they read at chip size without becoming
 * decorative noise.
 */
export type NoteIcon = {
  paths: ReadonlyArray<string>;
  description: { en: string; es: string; ar: string };
};

export const NOTES = {
  bergamot: {
    paths: ["M12 4 A8 8 0 1 0 12 20 A8 8 0 1 0 12 4 Z", "M12 4 L12 20", "M4 12 L20 12"],
    description: {
      en: "Citrus, bright, faintly bitter — opens the heart of the composition like a window onto dawn.",
      es: "Cítrica, brillante, ligeramente amarga — abre el corazón de la composición como una ventana al alba.",
      ar: "حمضية، ساطعة، فيها مرارة خفيفة، تفتح قلب التركيبة كنافذة على الفجر.",
    },
  },
  lemon: {
    paths: ["M6 12 Q12 4 18 12 Q12 20 6 12 Z", "M9 12 L15 12"],
    description: {
      en: "Sicilian lemon: rind, sun, the sting of summer.",
      es: "Limón siciliano: corteza, sol, mordedura de verano.",
      ar: "ليمون صقلّي: قشر، شمس، لذعة صيف.",
    },
  },
  grapefruit: {
    paths: ["M12 4 A8 8 0 1 0 12 20 A8 8 0 1 0 12 4 Z", "M12 4 L12 20", "M4 12 L20 12", "M6 6 L18 18", "M18 6 L6 18"],
    description: {
      en: "Pink grapefruit, bittersweet, with a metallic shimmer.",
      es: "Pomelo rosa, agridulce, con un brillo metálico.",
      ar: "جريب فروت وردي، حلو مرّ، ببريق معدني.",
    },
  },
  neroli: {
    paths: ["M12 5 Q15 9 12 12 Q9 9 12 5", "M12 12 Q15 16 12 19 Q9 16 12 12", "M5 12 Q9 9 12 12 Q9 15 5 12", "M19 12 Q15 9 12 12 Q15 15 19 12"],
    description: {
      en: "Neroli: the flower of bitter orange, honeyed and slightly green.",
      es: "Neroli: la flor del naranjo amargo, miel y verde tenue.",
      ar: "زهر النارنج: معسّل وفيه خضرة خفيفة.",
    },
  },
  petitgrain: {
    paths: ["M12 4 L12 20", "M12 8 L8 6", "M12 8 L16 6", "M12 14 L8 12", "M12 14 L16 12", "M12 18 L9 17", "M12 18 L15 17"],
    description: {
      en: "Petitgrain: the leaves and twigs, green, woody, contemplative.",
      es: "Petitgrain: las hojas y ramitas, verdes, leñosas, contemplativas.",
      ar: "بيتيغرين: أوراق وغصينات، خضراء، خشبية، متأمّلة.",
    },
  },
  cardamom: {
    paths: ["M12 4 Q16 8 12 12 Q8 8 12 4", "M12 12 L12 20", "M9 16 L15 16"],
    description: {
      en: "Green cardamom: cool, camphoraceous, the breath after rainfall.",
      es: "Cardamomo verde: fresco, alcanforado, aliento tras la lluvia.",
      ar: "هيل أخضر: بارد، كافوريّ، نَفَس بعد المطر.",
    },
  },
  pink_pepper: {
    paths: ["M12 12 A4 4 0 1 0 12 4 A4 4 0 1 0 12 12 Z", "M6 18 L8 16", "M18 18 L16 16", "M12 20 L12 17"],
    description: {
      en: "Pink pepper: tingle without heat, a sharp pulse.",
      es: "Pimienta rosa: hormigueo sin calor, un pulso afilado.",
      ar: "فلفل وردي: وخز دون حرارة، نبض حادّ.",
    },
  },
  black_pepper: {
    paths: ["M8 8 A2 2 0 1 0 8 4 A2 2 0 1 0 8 8 Z", "M16 10 A2 2 0 1 0 16 6 A2 2 0 1 0 16 10 Z", "M10 16 A2 2 0 1 0 10 12 A2 2 0 1 0 10 16 Z", "M17 18 A1.5 1.5 0 1 0 17 15 A1.5 1.5 0 1 0 17 18 Z"],
    description: {
      en: "Black pepper: a kicked door, then warmth.",
      es: "Pimienta negra: puerta abierta de una patada, luego calor.",
      ar: "فلفل أسود: باب يُفتح بقوّة، ثمّ دفء.",
    },
  },
  saffron: {
    paths: ["M12 4 L12 20", "M12 10 L7 6", "M12 10 L17 6", "M12 14 L7 18", "M12 14 L17 18"],
    description: {
      en: "Saffron: leather, hay, the red thread of an Eastern dye-house.",
      es: "Azafrán: cuero, heno, hilo rojo de una tintorería oriental.",
      ar: "زعفران: جلد، قشّ، خيط أحمر من صبّاغة شرقية.",
    },
  },
  cumin: {
    paths: ["M6 12 Q9 4 12 12 Q15 20 18 12", "M6 12 L18 12"],
    description: {
      en: "Cumin: skin warmth, intimate, almost a confession.",
      es: "Comino: calor de piel, íntimo, casi una confesión.",
      ar: "كمّون: دفء بشرة، حميم، يكاد يكون اعترافاً.",
    },
  },
  cinnamon: {
    paths: ["M5 19 C 8 14 16 10 19 5", "M7 17 C 10 13 14 11 17 7"],
    description: {
      en: "Cinnamon: a slow ember, sweet at the bone.",
      es: "Canela: brasa lenta, dulce en el hueso.",
      ar: "قرفة: جمرة بطيئة، حلاوة في العمق.",
    },
  },
  rose_damascena: {
    paths: ["M12 6 Q15 9 12 12 Q9 9 12 6", "M12 12 Q15 15 12 18 Q9 15 12 12", "M6 12 Q9 9 12 12 Q9 15 6 12", "M18 12 Q15 9 12 12 Q15 15 18 12", "M12 12 L12 12.01"],
    description: {
      en: "Damascena rose: the queen of Bulgarian dawn, jammy and quiet.",
      es: "Rosa damascena: la reina del alba búlgara, mermelada y silencio.",
      ar: "وردة دمشقية: ملكة الفجر البلغاري، مربّى وصمت.",
    },
  },
  rose_centifolia: {
    paths: ["M12 8 Q14 10 12 12 Q10 10 12 8", "M12 12 Q14 14 12 16 Q10 14 12 12", "M8 12 Q10 10 12 12 Q10 14 8 12", "M16 12 Q14 10 12 12 Q14 14 16 12", "M12 4 L12 20", "M4 12 L20 12"],
    description: {
      en: "May rose from Grasse: powdery, lemony, dressed for a wedding.",
      es: "Rosa de mayo de Grasse: pulverulenta, alimonada, vestida de boda.",
      ar: "وردة مايو من غراس: مسحوقية الملمس، فيها ليمون، كثوب عرس.",
    },
  },
  jasmine: {
    paths: ["M12 4 L12 20", "M12 12 L4 12", "M12 12 L20 12", "M12 12 L6 6", "M12 12 L18 6", "M12 12 L6 18", "M12 12 L18 18"],
    description: {
      en: "Sambac jasmine: white at noon, indolic at midnight.",
      es: "Jazmín sambac: blanco al mediodía, indólico a medianoche.",
      ar: "ياسمين سامبَك: أبيض ظهراً، إندولي منتصف الليل.",
    },
  },
  tuberose: {
    paths: ["M12 4 Q14 8 12 12 Q10 8 12 4", "M12 4 Q16 6 14 10", "M12 4 Q8 6 10 10", "M12 12 L12 20"],
    description: {
      en: "Tuberose: narcotic, buttery, takes up the whole room.",
      es: "Nardo: narcótico, mantecoso, ocupa toda la sala.",
      ar: "تيوبروز: مخدّر، زبدي، يملأ الغرفة كلّها.",
    },
  },
  iris: {
    paths: ["M12 4 L12 20", "M9 8 L15 8", "M8 12 L16 12", "M7 16 L17 16"],
    description: {
      en: "Iris pallida: cold powder, suede, an aristocratic restraint.",
      es: "Iris pallida: polvo frío, ante, contención aristocrática.",
      ar: "سوسن باليدا: مسحوق بارد، شامواه، تحفّظ أرستقراطي.",
    },
  },
  violet: {
    paths: ["M12 12 A4 4 0 1 0 12 4 A4 4 0 1 0 12 12 Z", "M12 12 L12 20", "M9 18 L15 18"],
    description: {
      en: "Violet leaves: green-watery, the memory of a school garden.",
      es: "Hojas de violeta: verde acuoso, recuerdo de un jardín escolar.",
      ar: "أوراق البنفسج: خضرة مائية، ذكرى حديقة مدرسة.",
    },
  },
  orange_blossom: {
    paths: ["M12 5 Q14 8 12 11 Q10 8 12 5", "M12 11 Q14 14 12 17 Q10 14 12 11", "M5 11 Q8 14 11 11 Q8 8 5 11", "M19 11 Q16 14 13 11 Q16 8 19 11", "M9 19 L15 19"],
    description: {
      en: "Orange blossom: bridal, sunlit, edible if you let it.",
      es: "Flor de azahar: nupcial, soleada, comestible si la dejas.",
      ar: "زهر البرتقال: عَرَسيّ، مشمس، يكاد يؤكل.",
    },
  },
  ylang_ylang: {
    paths: ["M12 12 L4 4", "M12 12 L20 4", "M12 12 L4 20", "M12 12 L20 20", "M12 4 L12 20"],
    description: {
      en: "Ylang-ylang: banana, custard, a sweet humid afternoon.",
      es: "Ylang-ylang: plátano, natilla, tarde húmeda y dulce.",
      ar: "إيلانغ إيلانغ: موز، كاسترد، عصر دافئ رطب.",
    },
  },
  oud: {
    paths: ["M6 19 Q9 12 12 14 Q15 16 18 6", "M6 19 L18 6"],
    description: {
      en: "Aged agarwood: smoke, leather, the resin of patience itself.",
      es: "Agarwood añejado: humo, cuero, la resina misma de la paciencia.",
      ar: "العود المعتّق: دخان، جلد، صمغ الصبر بعينه.",
    },
  },
  cedar: {
    paths: ["M12 4 L8 10 L11 10 L7 14 L11 14 L6 19 L18 19 L13 14 L17 14 L13 10 L16 10 Z"],
    description: {
      en: "Atlas cedar: pencil shavings, dry sun, a calm spine.",
      es: "Cedro del Atlas: virutas de lápiz, sol seco, espalda calma.",
      ar: "أرز الأطلس: نشارة قلم، شمس جافة، عمود فقري هادئ.",
    },
  },
  sandalwood: {
    paths: ["M6 18 L6 6", "M10 18 L10 6", "M14 18 L14 6", "M18 18 L18 6"],
    description: {
      en: "Mysore sandalwood: milk, prayer, the inside of a temple at dusk.",
      es: "Sándalo de Mysore: leche, oración, interior de un templo al ocaso.",
      ar: "صندل ميسوريّ: حليب، صلاة، داخل معبد عند الغسق.",
    },
  },
  vetiver: {
    paths: ["M6 4 L9 20", "M9 4 L12 20", "M12 4 L15 20", "M15 4 L18 20"],
    description: {
      en: "Haitian vetiver: smoke and root, the floor of the world.",
      es: "Vetiver haitiano: humo y raíz, el suelo del mundo.",
      ar: "نجيل هايتي: دخان وجذر، أرضية العالم.",
    },
  },
  patchouli: {
    paths: ["M5 12 Q8 6 12 12 Q16 18 19 12", "M5 12 Q8 18 12 12 Q16 6 19 12"],
    description: {
      en: "Indonesian patchouli, aged in oak: earth, ink, melancholy.",
      es: "Pachulí indonesio envejecido en roble: tierra, tinta, melancolía.",
      ar: "باتشولي إندونيسي معتّق في البلوط: تراب، حبر، شجن.",
    },
  },
  guaiac: {
    paths: ["M6 18 L18 6", "M6 12 L12 18", "M12 6 L18 12", "M9 15 L15 9"],
    description: {
      en: "Guaiac wood: smoke trapped in resin, dry to the last drop.",
      es: "Madera de guayaco: humo atrapado en resina, seco hasta la última gota.",
      ar: "خشب الغاياك: دخان محبوس في الراتنج، جاف حتى آخر قطرة.",
    },
  },
  birch_tar: {
    paths: ["M6 20 L18 4", "M6 20 L10 16", "M14 8 L18 4", "M9 17 L13 13"],
    description: {
      en: "Birch tar: smoke, leather, the back of a stable.",
      es: "Brea de abedul: humo, cuero, fondo de cuadra.",
      ar: "قطران البتولا: دخان، جلد، عمق إسطبل.",
    },
  },
  amber: {
    paths: ["M12 4 A8 8 0 1 0 12 20 A8 8 0 1 0 12 4 Z", "M8 12 Q12 8 16 12 Q12 16 8 12"],
    description: {
      en: "Amber accord: vanilla, labdanum, benzoin — slow honey.",
      es: "Acorde de ámbar: vainilla, labdano, benjuí — miel lenta.",
      ar: "مزيج العنبر: فانيليا، لادان، بنزوين — عسل بطيء.",
    },
  },
  labdanum: {
    paths: ["M6 12 Q9 4 12 12 Q15 20 18 12", "M6 12 L18 12", "M9 14 L15 14"],
    description: {
      en: "Labdanum: leather and church, the resin of warm rock.",
      es: "Labdano: cuero e iglesia, resina de roca caliente.",
      ar: "لادان: جلد وكنيسة، راتنج صخر دافئ.",
    },
  },
  benzoin: {
    paths: ["M12 4 Q16 8 12 12 Q8 8 12 4", "M12 12 Q16 16 12 20 Q8 16 12 12", "M6 18 L18 18"],
    description: {
      en: "Siam benzoin: vanilla, almond, a hymn under the breath.",
      es: "Benjuí de Siam: vainilla, almendra, himno bajo el aliento.",
      ar: "بنزوين سيامي: فانيليا، لوز، ترنيمة هامسة.",
    },
  },
  myrrh: {
    paths: ["M12 4 L4 20 L20 20 Z", "M12 4 L12 20"],
    description: {
      en: "Myrrh: bitter resin, a procession across a stone courtyard.",
      es: "Mirra: resina amarga, procesión por un patio de piedra.",
      ar: "مرّ: راتنج مرّ، موكب في فناء حجري.",
    },
  },
  frankincense: {
    paths: ["M12 4 L12 20", "M12 6 L8 12 L12 12 L8 18", "M12 6 L16 12 L12 12 L16 18"],
    description: {
      en: "Omani frankincense: cold smoke, ascending, prayer in vapour.",
      es: "Incienso omaní: humo frío, ascendente, oración en vapor.",
      ar: "لبان عُماني: دخان بارد، صاعد، صلاة بخار.",
    },
  },
  musk: {
    paths: ["M12 12 A6 6 0 1 0 12 0 A6 6 0 1 0 12 12 Z", "M12 12 L12 24", "M6 18 L18 18"],
    description: {
      en: "White musk: skin after rain, intimate without insisting.",
      es: "Almizcle blanco: piel tras la lluvia, íntimo sin insistir.",
      ar: "مسك أبيض: بشرة بعد المطر، حميم دون إلحاح.",
    },
  },
  vanilla: {
    paths: ["M12 4 L12 20", "M8 4 L8 20", "M16 4 L16 20", "M6 4 L18 4", "M6 20 L18 20"],
    description: {
      en: "Madagascar vanilla: not a dessert — a slow leather drying in the sun.",
      es: "Vainilla de Madagascar: no es postre — es cuero secándose al sol.",
      ar: "فانيليا مدغشقرية: ليست حلوى — جلد يجفّ في الشمس.",
    },
  },
  tonka: {
    paths: ["M12 4 Q16 12 12 20 Q8 12 12 4", "M6 12 L18 12"],
    description: {
      en: "Tonka bean: hay, almond, the warm pocket of an old coat.",
      es: "Haba tonka: heno, almendra, el bolsillo cálido de un abrigo viejo.",
      ar: "حبّة التونكا: قش، لوز، جيب معطف عتيق دافئ.",
    },
  },
  tobacco: {
    paths: ["M4 12 Q8 8 12 12 Q16 16 20 12", "M6 16 Q10 12 14 16", "M10 8 Q14 4 18 8"],
    description: {
      en: "Honeyed tobacco: a leather chair, a closed library, a slow afternoon.",
      es: "Tabaco meloso: sillón de cuero, biblioteca cerrada, tarde lenta.",
      ar: "تبغ معسّل: كرسي جلدي، مكتبة موصدة، عصر بطيء.",
    },
  },
  leather: {
    paths: ["M4 6 L20 6 L18 20 L6 20 Z", "M4 6 L8 10 L16 10 L20 6"],
    description: {
      en: "Leather: birch, suede, the spine of a book never opened.",
      es: "Cuero: abedul, ante, el lomo de un libro nunca abierto.",
      ar: "جلد: بتولا، شامواه، كعب كتاب لم يُفتح قطّ.",
    },
  },
  sea_salt: {
    paths: ["M4 16 Q8 12 12 16 Q16 20 20 16", "M4 12 Q8 8 12 12 Q16 16 20 12", "M4 8 Q8 4 12 8 Q16 12 20 8"],
    description: {
      en: "Sea salt: skin after swimming, calm, mineral.",
      es: "Sal de mar: piel tras nadar, calma, mineral.",
      ar: "ملح البحر: بشرة بعد السباحة، هدوء، معدنية.",
    },
  },
  ozone: {
    paths: ["M4 12 L20 12", "M4 8 L20 8", "M4 16 L20 16"],
    description: {
      en: "Ozone: the moment before a storm, the air made aware of itself.",
      es: "Ozono: instante previo a la tormenta, aire consciente de sí.",
      ar: "أوزون: لحظة قبل العاصفة، هواء واعٍ بنفسه.",
    },
  },
  mint: {
    paths: ["M12 4 Q15 8 12 12 Q9 8 12 4", "M8 8 Q11 12 8 16 Q5 12 8 8", "M16 8 Q19 12 16 16 Q13 12 16 8"],
    description: {
      en: "Moroccan mint: cold water, market awning, midday relief.",
      es: "Menta marroquí: agua fría, toldo de mercado, alivio del mediodía.",
      ar: "نعناع مغربي: ماء بارد، خيمة سوق، راحة الظهر.",
    },
  },
  fig: {
    paths: ["M12 4 Q16 8 14 14 Q12 20 10 14 Q8 8 12 4 Z", "M12 4 L12 8", "M10 11 L14 11"],
    description: {
      en: "Fig leaf: green milk, late August, shade falling slow.",
      es: "Hoja de higuera: leche verde, agosto tardío, sombra lenta.",
      ar: "ورقة تين: حليب أخضر، أواخر أغسطس، ظلّ يسقط ببطء.",
    },
  },
  oakmoss: {
    paths: ["M4 18 Q8 14 12 18 Q16 22 20 18", "M6 14 Q10 10 14 14 Q18 18 20 14", "M8 10 Q12 6 16 10"],
    description: {
      en: "Oakmoss: damp forest floor, ink, the smell of patience.",
      es: "Musgo de roble: suelo de bosque húmedo, tinta, olor a paciencia.",
      ar: "طحلب البلّوط: أرضية غابة رطبة، حبر، رائحة الصبر.",
    },
  },
} as const;

export type NoteName = keyof typeof NOTES;

const fallbackIcon: NoteIcon = {
  paths: ["M6 12 L18 12", "M12 6 L12 18"],
  description: {
    en: "An unwritten note.",
    es: "Una nota sin escribir.",
    ar: "نغمة لم تُكتب بعد.",
  },
};

export function getNoteIcon(name: string): NoteIcon {
  if (name in NOTES) {
    return NOTES[name as NoteName];
  }
  return fallbackIcon;
}

export function getNoteIconPath(name: string): ReadonlyArray<string> {
  return getNoteIcon(name).paths;
}
