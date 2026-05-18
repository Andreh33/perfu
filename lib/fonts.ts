import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  IBM_Plex_Sans_Arabic,
  Aboreto,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // axes can only be set when the font is requested as a variable font
  // (i.e. no fixed weight array). Fraunces is variable across 100..900.
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-plex-arabic",
  display: "swap",
  weight: ["400", "500"],
});

// Aboreto — Latin display face designed to evoke Arabic calligraphy
// (geometric strokes, tall ascenders, classical bone structure). Used
// for the brand wordmark to give 'PERFUMES DUBAI' a Maghreb/Levantine
// editorial feel without losing Latin legibility.
export const aboreto = Aboreto({
  subsets: ["latin"],
  variable: "--font-aboreto",
  display: "swap",
  weight: ["400"],
});

export const fontVariables = [
  fraunces.variable,
  inter.variable,
  jetbrains.variable,
  notoNaskh.variable,
  plexArabic.variable,
  aboreto.variable,
].join(" ");
