import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
  weight: ["400", "500", "600"],
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

export const fontVariables = [
  fraunces.variable,
  inter.variable,
  jetbrains.variable,
  notoNaskh.variable,
  plexArabic.variable,
].join(" ");
