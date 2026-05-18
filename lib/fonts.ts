import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  IBM_Plex_Sans_Arabic,
  Aboreto,
  Rakkas,
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

// Aboreto — kept for any secondary display use (geometric Latin with
// slight Arabic flavour). Not the brand wordmark anymore.
export const aboreto = Aboreto({
  subsets: ["latin"],
  variable: "--font-aboreto",
  display: "swap",
  weight: ["400"],
});

// Rakkas — Latin display face specifically designed to look like Arabic
// Naskh calligraphy. The letters carry the bowls, ascenders, terminal
// flicks and rhythm of Arabic script while remaining Latin-readable.
// THIS is the brand wordmark — drama and Maghreb identity together.
export const rakkas = Rakkas({
  subsets: ["latin"],
  variable: "--font-rakkas",
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
  rakkas.variable,
].join(" ");
