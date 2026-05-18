"use client";
// Global liquid-gold background. Re-tuned so the gold reads as ONE
// continuous molten surface, not separate blobs. The user reported seeing
// "two stains" (one gold, one yellow) and a "filter" — that was the prior
// build's 5 distinct radial gradients plus a heavy vignette + grain on top.
// Now: a single large radial mass + two huge cross-fading orbs heavily
// blurred, mix-blend so they meld, vignette much lighter, grain almost
// imperceptible.

import { useId } from "react";

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

const STRENGTH = {
  subtle:   { scale: 14, opacity: 0.45, orbOpacity: 0.7,  turbDur: 32 },
  balanced: { scale: 24, opacity: 0.65, orbOpacity: 0.85, turbDur: 26 },
  opulent:  { scale: 38, opacity: 0.82, orbOpacity: 1.0,  turbDur: 22 },
} as const;

export function GlobalLiquidGoldBackground({ intensity = "opulent" }: Props = {}) {
  const uid = useId().replace(/:/g, "");
  const filterId = `glgb-turb-${uid}`;
  const s = STRENGTH[intensity];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      data-global-bg
    >
      {/* Base ink — uniform deep cocoa wash, NO radial darkening
          (the prior radial was making one side look duller, contributing
          to the "two stains" effect). */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0e0907 0%, #100c08 50%, #0a0604 100%)",
        }}
      />

      {/* SINGLE large gold mass — fills ~80% of the viewport, distorted by
          the turbulence filter. Replaces the prior 5-blob mesh which read
          as separate patches. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: s.opacity,
          filter: `url(#${filterId}) blur(40px)`,
          background:
            "radial-gradient(ellipse 95% 80% at 50% 50%, " +
            "rgba(244, 207, 113, 0.85) 0%, " +
            "rgba(212, 175, 55, 0.65) 25%, " +
            "rgba(184, 134, 50, 0.42) 50%, " +
            "rgba(120, 80, 30, 0.18) 75%, " +
            "transparent 100%)",
        }}
      />

      {/* Two huge cross-fading orbs that meld with the central mass. Heavy
          blur + mix-blend-mode: screen → the eye reads them as variations
          inside one continuous liquid, not separate spots. */}
      <div
        className="absolute inset-0"
        style={{ opacity: s.orbOpacity, mixBlendMode: "screen" }}
      >
        <span
          className="lgb-orb-mega lgb-orb-mega-a"
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "100vw",
            height: "100vh",
            borderRadius: "50%",
            filter: "blur(180px)",
            background:
              "radial-gradient(circle, rgba(244, 207, 113, 0.55) 0%, rgba(212, 175, 55, 0.22) 45%, transparent 75%)",
            animation: "lgb-mega-a 42s ease-in-out infinite alternate",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-25%",
            right: "-15%",
            width: "110vw",
            height: "110vh",
            borderRadius: "50%",
            filter: "blur(200px)",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(160, 110, 50, 0.2) 45%, transparent 75%)",
            animation: "lgb-mega-b 56s ease-in-out infinite alternate",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            width: "80vw",
            height: "80vh",
            borderRadius: "50%",
            filter: "blur(160px)",
            background:
              "radial-gradient(circle, rgba(244, 228, 188, 0.32) 0%, rgba(201, 146, 138, 0.14) 45%, transparent 75%)",
            animation: "lgb-mega-c 48s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Very light vignette — was 0.7 at corners, now 0.3. The user
          flagged the prior version as "filtered"; this is barely felt. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.18) 92%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />

      {/* Whisper of grain. Was 0.07; now 0.035 so it does not read as a
          texture overlay. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.035,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch' seed='9'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.83  0 0 0 0 0.58  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "300px",
        }}
      />

      {/* SVG turbulence filter — distorts the central gold mass. */}
      <svg aria-hidden focusable="false" className="absolute -z-10 h-0 w-0">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.008"
              numOctaves={2}
              seed={4}
              style={{ animationDuration: `${s.turbDur}s` }}
            />
            <feDisplacementMap in="SourceGraphic" scale={s.scale} />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
