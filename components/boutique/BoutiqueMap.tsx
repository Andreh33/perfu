// Larger, more detailed stylised "map" of Dubai for the boutique page.
// Not a geographic map — an editorial drawing: skyline silhouette, four
// district labels, a pulsing gold marker at City Walk and a small compass.
// Server component, zero JS payload.

interface BoutiqueMapProps {
  cityWalkLabel: string;
  caption: string;
}

export function BoutiqueMap({ cityWalkLabel, caption }: BoutiqueMapProps) {
  return (
    <figure className="relative w-full">
      <style>{`
        @keyframes pdb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.7); opacity: 0.18; }
        }
        @keyframes pdb-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg
        viewBox="0 0 800 400"
        width="100%"
        height="auto"
        role="img"
        aria-label="Stylised drawing of Dubai with City Walk marker"
        className="block text-[var(--ink-400)]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* compass */}
        <g transform="translate(740 50)" opacity="0.6">
          <circle r="22" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path
            d="M0 -16 L4 0 L0 4 L-4 0 Z"
            fill="var(--gold-200)"
            opacity="0.85"
          />
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fill="var(--gold-200)"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "9px",
              letterSpacing: "0.16em",
            }}
          >
            N
          </text>
        </g>

        {/* district labels */}
        {[
          { x: 120, y: 70, label: "JUMEIRAH" },
          { x: 250, y: 110, label: "AL WASL" },
          { x: 460, y: 80, label: "DOWNTOWN" },
          { x: 640, y: 60, label: "BUSINESS BAY" },
        ].map((d) => (
          <text
            key={d.label}
            x={d.x}
            y={d.y}
            fill="currentColor"
            opacity="0.45"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {d.label}
          </text>
        ))}

        {/* coastline — soft top-left arc */}
        <path
          d="M0 180 Q150 130 320 175 T560 205 T800 230"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.35"
          strokeDasharray="2 4"
        />

        {/* horizon */}
        <line
          x1="0"
          y1="340"
          x2="800"
          y2="340"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* dunes */}
        <path
          d="M0 340 Q120 332 220 338 T520 340 T800 340"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.25"
        />

        {/* left low cluster */}
        {[
          "M60 340 L60 295 L90 295 L90 310 L120 310 L120 340 Z",
          "M140 340 L140 280 L170 280 L170 340 Z",
        ].map((d, i) => (
          <path
            key={`l${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}

        {/* Burj Al Arab — sail triangle */}
        <path
          d="M210 340 L245 160 L280 340 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <line
          x1="245"
          y1="160"
          x2="245"
          y2="340"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <text
          x="245"
          y="358"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.55"
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "8px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Burj Al Arab
        </text>

        {/* mid towers */}
        {[
          "M310 340 L310 260 L335 260 L335 220 L355 220 L355 340 Z",
          "M370 340 L370 250 L395 250 L395 280 L412 280 L412 340 Z",
        ].map((d, i) => (
          <path
            key={`m${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}

        {/* Burj Khalifa — spire */}
        <path
          d="M470 340 L468 290 L473 290 L466 240 L474 240 L460 180 L482 180 L470 110 L472 40 L474 110 L482 180 L460 180 L474 240 L466 240 L473 290 L468 290 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.9"
        />
        <line
          x1="471"
          y1="40"
          x2="471"
          y2="340"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
          strokeDasharray="2 3"
        />
        <text
          x="471"
          y="358"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.55"
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "8px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Burj Khalifa
        </text>

        {/* twisted Cayan-style tower */}
        <path
          d="M540 340 L548 210 L572 210 L578 340 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />

        {/* right cluster */}
        {[
          "M600 340 L600 270 L625 270 L625 295 L650 295 L650 340 Z",
          "M665 340 L665 220 L695 220 L695 250 L720 250 L720 340 Z",
          "M735 340 L735 280 L760 280 L760 340 Z",
        ].map((d, i) => (
          <path
            key={`r${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}

        {/* leader line from marker to label below skyline */}
        <line
          x1="520"
          y1="320"
          x2="520"
          y2="384"
          stroke="var(--gold-200)"
          strokeWidth="0.6"
          opacity="0.8"
          strokeDasharray="1 3"
        />

        {/* marker — City Walk (approx between Khalifa and Cayan) */}
        <g>
          <circle
            cx="520"
            cy="320"
            r="14"
            fill="var(--gold-200)"
            opacity="0.6"
            style={{
              transformOrigin: "520px 320px",
              animation: "pdb-pulse 2.4s ease-in-out infinite",
            }}
          />
          <circle cx="520" cy="320" r="4" fill="var(--gold-200)" />
        </g>
        <text
          x="520"
          y="396"
          textAnchor="middle"
          fill="var(--gold-200)"
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {cityWalkLabel}
        </text>
      </svg>
      <figcaption className="mt-[var(--space-3)] font-body text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--ink-400)]">
        {caption}
      </figcaption>
    </figure>
  );
}
