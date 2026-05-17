import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perfumes Dubai · Maison de Parfum",
  description: "The art of fragrance, distilled from desert and time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${fontVariables} font-body bg-[var(--obsidian-400)] text-[var(--ink-100)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
