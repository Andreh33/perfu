"use client";
// Global background — editorial, restrained, NO animated shapes.
//
// The previous three attempts (turbulent gold mesh, rotating conics,
// metaballs) all read as CSS demos rather than a maison atmosphere.
// Premium atelier sites (Byredo, Aesop, Maison Francis Kurkdjian) use
// restraint: deep warm dark + subtle gradient + grain + carefully placed
// editorial photography. That's what this layer now is — a foundation.
// Hero pages can carry their own atmospheric content on top.

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

export function GlobalLiquidGoldBackground(_props: Props = {}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      data-global-bg
    >
      {/* Deep cocoa base. Single warm tone, no animation. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c0805 0%, #100b07 40%, #0d0906 100%)",
        }}
      />

      {/* A single very soft warm wash anchored upper-left — suggests a
          window of light somewhere off-screen. No movement, no shapes. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 15%, rgba(184, 134, 50, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* A second very soft wash lower-right — slightly cooler, balances
          the composition without competing with the upper light. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 90%, rgba(92, 60, 30, 0.18) 0%, transparent 65%)",
        }}
      />

      {/* Editorial film grain — the only "texture" on the canvas. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch' seed='9'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.83  0 0 0 0 0.58  0 0 0 0.85 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "320px",
        }}
      />

      {/* Edge vignette so corners darken and the eye lands centre. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 65%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  );
}
