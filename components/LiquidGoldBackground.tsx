"use client";
// Liquid-gold animated background. Pure CSS + a single SVG feTurbulence /
// feDisplacementMap filter so the gradient mesh appears to flow like
// molten gold without WebGL. Three intensity tiers control the strength
// of the distortion and the opacity of the overlays.
//
// Sits as a fixed/absolute layer inside the section it wraps; the children
// render on top with z-10. The whole thing is decorative (aria-hidden on
// every layer) and respects prefers-reduced-motion (animations stop, the
// gradient mesh stays still).

import { useId, type ReactNode } from "react";

type Intensity = "subtle" | "balanced" | "opulent";

interface LiquidGoldBackgroundProps {
  intensity?: Intensity;
  children?: ReactNode;
  className?: string;
}

const STRENGTH: Record<Intensity, { scale: number; opacity: number; orbOpacity: number; turbDur: number }> = {
  subtle:   { scale: 18, opacity: 0.32, orbOpacity: 0.55, turbDur: 32 },
  balanced: { scale: 32, opacity: 0.5,  orbOpacity: 0.75, turbDur: 26 },
  opulent:  { scale: 55, opacity: 0.75, orbOpacity: 0.95, turbDur: 22 },
};

export function LiquidGoldBackground({
  intensity = "balanced",
  children,
  className = "",
}: LiquidGoldBackgroundProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `lgb-turb-${uid}`;
  const s = STRENGTH[intensity];

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* Base ink — a deep cocoa rather than flat black so the gold reads
          warm. NOT the same as #000; suggested upstream tokens. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-50"
        style={{
          background:
            "radial-gradient(ellipse 140% 100% at 50% 50%, #14100a 0%, #0a0705 70%, #060403 100%)",
        }}
      />

      {/* Liquid gradient mesh — five blurred radials of warm gold and
          deep amber, each at a different position. The whole layer is
          distorted by the SVG filter below so the mesh writhes. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-40"
        style={{
          opacity: s.opacity,
          filter: `url(#${filterId})`,
          background:
            // Five radial blobs — warm gold + amber + rose-gold + deeper
            // sand. Sized in % so they scale with the viewport.
            "radial-gradient(ellipse 55% 45% at 22% 32%, rgba(244, 207, 113, 0.85) 0%, rgba(212, 175, 55, 0.45) 35%, transparent 70%)," +
            "radial-gradient(ellipse 50% 40% at 78% 28%, rgba(184, 134, 50, 0.7) 0%, rgba(120, 80, 30, 0.32) 45%, transparent 75%)," +
            "radial-gradient(ellipse 65% 55% at 50% 70%, rgba(212, 175, 55, 0.55) 0%, rgba(140, 95, 35, 0.28) 45%, transparent 80%)," +
            "radial-gradient(ellipse 45% 35% at 15% 82%, rgba(244, 207, 113, 0.6) 0%, rgba(200, 150, 60, 0.25) 50%, transparent 80%)," +
            "radial-gradient(ellipse 40% 32% at 85% 80%, rgba(201, 146, 138, 0.45) 0%, rgba(150, 90, 70, 0.18) 50%, transparent 80%)",
        }}
      />

      {/* Floating gold orbs — three soft blurred orbs animated on
          independent drifts. Live ABOVE the distorted mesh so they
          read as foreground light pools. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{ opacity: s.orbOpacity, mixBlendMode: "screen" }}
      >
        <span className="lgb-orb lgb-orb-a" />
        <span className="lgb-orb lgb-orb-b" />
        <span className="lgb-orb lgb-orb-c" />
      </div>

      {/* Slow shimmer band — a thin gold streak sweeps the canvas. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <span className="lgb-sweep" />
      </div>

      {/* Vignette so the eye lands centre. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.55) 95%, rgba(0, 0, 0, 0.78) 100%)",
        }}
      />

      {/* Grain — tiny warm noise. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch' seed='9'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.83  0 0 0 0 0.58  0 0 0 0.85 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "260px",
        }}
      />

      {/* SVG filter — feTurbulence drives feDisplacementMap so the gradient
          mesh appears to ripple like liquid. The turbulence seed animates
          via @keyframes (in globals.css → .lgb-turb) so the displacement
          field shifts over time. */}
      <svg
        aria-hidden
        className="absolute -z-10 h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={2}
              seed={4}
              className="lgb-turb"
              style={{ animationDuration: `${s.turbDur}s` }}
            />
            <feDisplacementMap in="SourceGraphic" scale={s.scale} />
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
      </svg>

      {/* Children render on top. */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
