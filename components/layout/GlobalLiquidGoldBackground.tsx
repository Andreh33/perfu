"use client";
// Global liquid-gold background — full rebuild.
//
// Prior attempts used feTurbulence + heavy gaussian blur. The user could
// not perceive motion because the blur (40 px on the mesh, 180 px on the
// orbs) averaged out every frame. SMIL animations were running but the
// eye had no edges to track.
//
// New approach: TWO large conic gradients that ROTATE in opposite
// directions on a long cycle. Conic rotation is a continuous, perceivable
// motion — the gold visibly swirls. Plus three medium-blur orbs with
// real silhouettes drifting across the viewport. No turbulence filter,
// no SMIL, no heavy mesh blur. The motion is now obvious.

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

const STRENGTH = {
  subtle:   { opacity: 0.55, orbOpacity: 0.6,  conicDur: 60 },
  balanced: { opacity: 0.75, orbOpacity: 0.8,  conicDur: 45 },
  opulent:  { opacity: 0.95, orbOpacity: 0.95, conicDur: 36 },
} as const;

export function GlobalLiquidGoldBackground({ intensity = "opulent" }: Props = {}) {
  const s = STRENGTH[intensity];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      data-global-bg
    >
      {/* Base — deep cocoa, single uniform colour. No radial dimming. */}
      <div
        className="absolute inset-0"
        style={{ background: "#0b0805" }}
      />

      {/* CONIC LAYER A — large rotating sweep of warm gold. Rotation
          is continuous and perceptible. Massively over-sized (200vmax)
          so the centre of rotation is off-screen and we always see a
          fresh slice. */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: "200vmax",
          height: "200vmax",
          marginLeft: "-100vmax",
          marginTop: "-100vmax",
          opacity: s.opacity,
          background:
            "conic-gradient(from 0deg at 50% 50%, " +
            "transparent 0deg, " +
            "rgba(244, 207, 113, 0.55) 40deg, " +
            "rgba(212, 175, 55, 0.85) 90deg, " +
            "rgba(244, 207, 113, 0.45) 140deg, " +
            "rgba(140, 95, 35, 0.2) 200deg, " +
            "transparent 250deg, " +
            "rgba(184, 134, 50, 0.6) 310deg, " +
            "transparent 360deg)",
          filter: "blur(40px)",
          animation: `lgb-rotate ${s.conicDur}s linear infinite`,
          willChange: "transform",
        }}
      />

      {/* CONIC LAYER B — counter-rotating gold/amber/rose, blends with A
          via mix-blend overlay. Two opposite-rotating conics give the
          illusion of a turbulent surface. */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: "200vmax",
          height: "200vmax",
          marginLeft: "-100vmax",
          marginTop: "-100vmax",
          opacity: s.opacity * 0.85,
          mixBlendMode: "overlay",
          background:
            "conic-gradient(from 180deg at 50% 50%, " +
            "transparent 0deg, " +
            "rgba(244, 228, 188, 0.5) 60deg, " +
            "rgba(201, 146, 138, 0.3) 120deg, " +
            "transparent 180deg, " +
            "rgba(212, 175, 55, 0.55) 240deg, " +
            "rgba(244, 207, 113, 0.4) 300deg, " +
            "transparent 360deg)",
          filter: "blur(50px)",
          animation: `lgb-rotate-reverse ${s.conicDur * 1.4}s linear infinite`,
          willChange: "transform",
        }}
      />

      {/* Drifting orbs — moderate blur (sharp enough to be seen moving). */}
      <div
        className="absolute inset-0"
        style={{ opacity: s.orbOpacity, mixBlendMode: "screen" }}
      >
        <span
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            width: "60vmin",
            height: "60vmin",
            borderRadius: "50%",
            filter: "blur(70px)",
            background:
              "radial-gradient(circle, rgba(244, 207, 113, 0.85) 0%, rgba(212, 175, 55, 0.4) 35%, transparent 70%)",
            animation: "lgb-mega-a 22s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "30%",
            right: "10%",
            width: "55vmin",
            height: "55vmin",
            borderRadius: "50%",
            filter: "blur(80px)",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(160, 110, 50, 0.35) 40%, transparent 75%)",
            animation: "lgb-mega-b 28s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "12%",
            left: "40%",
            width: "50vmin",
            height: "50vmin",
            borderRadius: "50%",
            filter: "blur(70px)",
            background:
              "radial-gradient(circle, rgba(244, 228, 188, 0.55) 0%, rgba(201, 146, 138, 0.25) 45%, transparent 75%)",
            animation: "lgb-mega-c 25s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      {/* Vignette — very light so the rotating gold reads to the edges. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 75%, rgba(0, 0, 0, 0.25) 100%)",
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
