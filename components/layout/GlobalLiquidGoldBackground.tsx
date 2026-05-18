"use client";
// Global liquid-gold background — METABALLS approach.
//
// Prior attempt (rotating conic gradients) read as "sun rotating" not
// liquid. True liquid motion needs SURFACE TENSION + MERGING — blobs that
// approach each other, fuse, then separate. The classic technique is the
// "goo filter": Gaussian blur softens the blob edges, a feColorMatrix
// contrast threshold then sharpens them again into a single merged
// silhouette. The result is mercury-like fluid.
//
// We animate eight gold circles via SMIL <animate>, each on its own
// path/duration. The goo filter merges them where they overlap, producing
// continuously morphing organic blobs that genuinely read as liquid gold.

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

const STRENGTH = {
  subtle:   { ballOpacity: 0.7, ambient: 0.4 },
  balanced: { ballOpacity: 0.85, ambient: 0.6 },
  opulent:  { ballOpacity: 1.0, ambient: 0.75 },
} as const;

export function GlobalLiquidGoldBackground({ intensity = "opulent" }: Props = {}) {
  const s = STRENGTH[intensity];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      data-global-bg
      style={{ background: "#0b0805" }}
    >
      {/* Ambient warm wash so the metaballs sit on a glowing canvas, not
          flat dark. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: s.ambient,
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(184, 134, 50, 0.35) 0%, rgba(120, 80, 30, 0.18) 45%, transparent 90%)",
        }}
      />

      {/* THE LIQUID. Full-viewport SVG with the goo filter and eight
          gold circles whose centres animate along independent paths.
          Where two circles overlap, the goo filter merges them into a
          single blob — the visual is continuously morphing gold mercury. */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 700"
        style={{ opacity: s.ballOpacity }}
      >
        <defs>
          {/* The goo filter: blur 30 px, then a colour-matrix that boosts
              alpha contrast around 0.5 → soft circles merge into hard
              silhouettes wherever they overlap. */}
          <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          {/* A second softer goo — used on a separate layer for sub-blobs
              that float over the main liquid. */}
          <filter id="goo-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
              result="goo"
            />
          </filter>

          <radialGradient id="ball-warm" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f4e4bc" stopOpacity="1" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8e6e3f" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="ball-amber" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f4d27a" stopOpacity="1" />
            <stop offset="60%" stopColor="#b8935a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5c4628" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* MAIN LIQUID GROUP — large merged blobs */}
        <g filter="url(#goo)">
          <circle r="180" fill="url(#ball-warm)">
            <animate
              attributeName="cx"
              values="200; 700; 500; 300; 200"
              dur="22s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate
              attributeName="cy"
              values="200; 350; 500; 250; 200"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate attributeName="r" values="180; 220; 160; 200; 180" dur="14s" repeatCount="indefinite" />
          </circle>

          <circle r="160" fill="url(#ball-amber)">
            <animate
              attributeName="cx"
              values="800; 400; 600; 750; 800"
              dur="24s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate
              attributeName="cy"
              values="180; 450; 300; 550; 180"
              dur="20s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate attributeName="r" values="160; 130; 200; 150; 160" dur="16s" repeatCount="indefinite" />
          </circle>

          <circle r="140" fill="url(#ball-warm)">
            <animate
              attributeName="cx"
              values="500; 200; 750; 450; 500"
              dur="26s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate
              attributeName="cy"
              values="500; 200; 400; 600; 500"
              dur="22s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate attributeName="r" values="140; 180; 110; 160; 140" dur="18s" repeatCount="indefinite" />
          </circle>

          <circle r="120" fill="url(#ball-amber)">
            <animate
              attributeName="cx"
              values="350; 650; 450; 250; 350"
              dur="20s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate
              attributeName="cy"
              values="350; 300; 600; 400; 350"
              dur="17s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate attributeName="r" values="120; 100; 150; 130; 120" dur="13s" repeatCount="indefinite" />
          </circle>

          <circle r="100" fill="url(#ball-warm)">
            <animate
              attributeName="cx"
              values="700; 300; 500; 800; 700"
              dur="19s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate
              attributeName="cy"
              values="600; 500; 350; 450; 600"
              dur="21s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            <animate attributeName="r" values="100; 130; 90; 120; 100" dur="15s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* SUB-LAYER — smaller satellites that float over the main liquid
            on the softer goo. */}
        <g filter="url(#goo-soft)" opacity="0.6">
          <circle r="70" fill="url(#ball-amber)">
            <animate attributeName="cx" values="600; 200; 800; 400; 600" dur="15s" repeatCount="indefinite" />
            <animate attributeName="cy" values="100; 600; 450; 250; 100" dur="17s" repeatCount="indefinite" />
          </circle>
          <circle r="60" fill="url(#ball-warm)">
            <animate attributeName="cx" values="900; 100; 500; 700; 900" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cy" values="400; 350; 100; 550; 400" dur="14s" repeatCount="indefinite" />
          </circle>
          <circle r="55" fill="url(#ball-amber)">
            <animate attributeName="cx" values="150; 850; 350; 550; 150" dur="16s" repeatCount="indefinite" />
            <animate attributeName="cy" values="550; 150; 650; 300; 550" dur="19s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* Very light vignette so the edges fade. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />

      {/* Whisper of grain. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch' seed='9'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.83  0 0 0 0 0.58  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "320px",
        }}
      />
    </div>
  );
}
