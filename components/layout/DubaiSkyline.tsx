// Stylised Dubai skyline — not a geographic map. Three iconic silhouettes
// (Burj Al Arab triangular, Burj Khalifa spire, surrounding volumes) plus
// a pulsing gold marker over "City Walk".

interface DubaiSkylineProps {
  cityWalkLabel: string;
}

export function DubaiSkyline({ cityWalkLabel }: DubaiSkylineProps) {
  return (
    <div className="relative w-full">
      <style>{`
        @keyframes pd-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.6); opacity: 0.25; }
        }
      `}</style>
      <svg
        viewBox="0 0 800 280"
        width="100%"
        role="img"
        aria-label="Dubai skyline"
        className="block h-auto text-[var(--ink-400)]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Horizon line */}
        <line
          x1="0"
          y1="240"
          x2="800"
          y2="240"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />

        {/* Sand dune hint */}
        <path
          d="M0 240 Q150 232 320 238 T800 240 L800 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
        />

        {/* Background buildings (left cluster) */}
        <path
          d="M40 240 L40 200 L70 200 L70 180 L90 180 L90 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M100 240 L100 170 L130 170 L130 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />

        {/* Burj Al Arab — triangular sail */}
        <path
          d="M180 240 L210 90 L240 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
        />
        <line
          x1="210"
          y1="90"
          x2="210"
          y2="240"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Burj Khalifa — tapering spire (the tallest) */}
        <path
          d="M380 240 L378 200 L383 200 L376 160 L384 160 L370 110 L390 110 L378 60 L380 30 L382 60 L390 110 L370 110 L384 160 L376 160 L383 200 L378 200 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.85"
        />
        <line
          x1="380"
          y1="30"
          x2="380"
          y2="240"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Mid-rise cluster between Burj Al Arab and Burj Khalifa */}
        <path
          d="M260 240 L260 175 L285 175 L285 145 L305 145 L305 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M315 240 L315 165 L340 165 L340 195 L355 195 L355 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />

        {/* Cayan / twisted tower hint */}
        <path
          d="M450 240 L455 160 L475 160 L478 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />

        {/* Right cluster */}
        <path
          d="M500 240 L500 180 L520 180 L520 200 L540 200 L540 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M555 240 L555 150 L580 150 L580 175 L600 175 L600 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M615 240 L615 195 L640 195 L640 215 L660 215 L660 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M675 240 L675 170 L705 170 L705 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M715 240 L715 200 L745 200 L745 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Marker — City Walk (approx between Burj Khalifa & the right cluster) */}
        <g>
          <circle
            cx="430"
            cy="232"
            r="10"
            fill="var(--gold-200)"
            opacity="0.6"
            style={{
              transformOrigin: "430px 232px",
              animation: "pd-pulse 2.4s ease-in-out infinite",
            }}
          />
          <circle cx="430" cy="232" r="3" fill="var(--gold-200)" />
          <line
            x1="430"
            y1="232"
            x2="430"
            y2="260"
            stroke="var(--gold-200)"
            strokeWidth="0.6"
            opacity="0.7"
          />
        </g>

        {/* Marker label */}
        <text
          x="442"
          y="265"
          fill="var(--gold-200)"
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {cityWalkLabel}
        </text>
      </svg>
    </div>
  );
}
