import type { SVGProps } from "react";

/**
 * Custom "PD" monogram — geometric editorial composition.
 * Not a font glyph: drawn with stroked paths so it scales cleanly.
 */
export function Monogram({
  size = 32,
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Perfumes Dubai"
      {...rest}
    >
      {/* Hairline circle frame */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* P · vertical stem */}
      <path
        d="M16 14 L16 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* P · bowl */}
      <path
        d="M16 14 L26 14 Q34 14 34 22 Q34 30 26 30 L16 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* D · vertical stem (offset so the two letters share the optical centre) */}
      <path
        d="M34 14 L34 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* D · bowl */}
      <path
        d="M34 14 L42 14 Q52 14 52 32 Q52 50 42 50 L34 50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Gold dot — maison signature */}
      <circle cx="50" cy="12" r="1.2" fill="var(--gold-200)" />
    </svg>
  );
}
