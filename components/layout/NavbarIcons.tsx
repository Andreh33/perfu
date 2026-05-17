// Pure SVG icons — server-renderable. Custom drawn instead of lucide to keep
// stroke weights and proportions consistent with the maison hairline style.

import type { SVGProps } from "react";

const baseProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20c1.4-3.4 4.2-5 7.5-5s6.1 1.6 7.5 5" />
    </svg>
  );
}

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M5 7h14l-1.5 11a1.5 1.5 0 0 1-1.5 1.3H8a1.5 1.5 0 0 1-1.5-1.3L5 7z" />
      <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
    </svg>
  );
}
