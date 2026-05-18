"use client";
// Global liquid-gold background. Same atmospheric layers as
// <LiquidGoldBackground/> (gold gradient mesh distorted by SVG feTurbulence
// + feDisplacementMap, 3 drifting orbs, shimmer sweep, vignette, grain) but
// mounted as a fixed full-viewport layer behind every route. Sits BELOW
// every page's content but ABOVE the body's dark base.
//
// Renders nothing inside — purely a backdrop. Children of the layout
// stack on top via z-index. Reduced-motion is intentionally ignored
// (the brand IS the atmosphere; without it the site looks generic).

import { useId } from "react";

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

const STRENGTH = {
  subtle:   { scale: 18, opacity: 0.32, orbOpacity: 0.55, turbDur: 32 },
  balanced: { scale: 32, opacity: 0.5,  orbOpacity: 0.75, turbDur: 26 },
  opulent:  { scale: 55, opacity: 0.78, orbOpacity: 0.95, turbDur: 22 },
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
      {/* Base ink — deep cocoa wash that the gold mesh sits on. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 140% 100% at 50% 50%, #14100a 0%, #0a0705 70%, #060403 100%)",
        }}
      />

      {/* Liquid gradient mesh — 5 radial blobs, distorted by the SVG
          turbulence filter to write the gold like molten metal. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: s.opacity,
          filter: `url(#${filterId})`,
          background:
            "radial-gradient(ellipse 55% 45% at 22% 32%, rgba(244, 207, 113, 0.85) 0%, rgba(212, 175, 55, 0.45) 35%, transparent 70%)," +
            "radial-gradient(ellipse 50% 40% at 78% 28%, rgba(184, 134, 50, 0.7) 0%, rgba(120, 80, 30, 0.32) 45%, transparent 75%)," +
            "radial-gradient(ellipse 65% 55% at 50% 70%, rgba(212, 175, 55, 0.55) 0%, rgba(140, 95, 35, 0.28) 45%, transparent 80%)," +
            "radial-gradient(ellipse 45% 35% at 15% 82%, rgba(244, 207, 113, 0.6) 0%, rgba(200, 150, 60, 0.25) 50%, transparent 80%)," +
            "radial-gradient(ellipse 40% 32% at 85% 80%, rgba(201, 146, 138, 0.45) 0%, rgba(150, 90, 70, 0.18) 50%, transparent 80%)",
        }}
      />

      {/* Drifting blurred orbs of warm gold (live ABOVE the distorted
          mesh so they read as foreground light pools). */}
      <div
        className="absolute inset-0"
        style={{ opacity: s.orbOpacity, mixBlendMode: "screen" }}
      >
        <span className="lgb-orb lgb-orb-a" />
        <span className="lgb-orb lgb-orb-b" />
        <span className="lgb-orb lgb-orb-c" />
      </div>

      {/* Slow shimmer sweep. */}
      <div className="absolute inset-0">
        <span className="lgb-sweep" />
      </div>

      {/* Vignette — softer than the Hero's local one since this lives
          behind ALL content (sections need to read). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.45) 95%, rgba(0, 0, 0, 0.7) 100%)",
        }}
      />

      {/* Grain — tiny warm noise locked to viewport. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch' seed='9'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.83  0 0 0 0 0.58  0 0 0 0.85 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "260px",
        }}
      />

      {/* SVG filter — feTurbulence drives feDisplacementMap so the mesh
          appears to ripple. Filter is referenced by id from the mesh div above. */}
      <svg aria-hidden focusable="false" className="absolute -z-10 h-0 w-0">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={2}
              seed={4}
              style={{ animationDuration: `${s.turbDur}s` }}
            />
            <feDisplacementMap in="SourceGraphic" scale={s.scale} />
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
