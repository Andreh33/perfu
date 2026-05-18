"use client";
// Atmospheric ambient background — a fixed full-viewport layer with three
// slowly drifting warm-gold orbs, a very slow shimmer sweep across the
// horizontal axis, and a subtle pulsing warmth at the centre. CSS-only,
// GPU-friendly (transform + opacity only), respects prefers-reduced-motion.
//
// Sits BEHIND the existing body bg gradients (z:0) — augments, not replaces.
// Mounted from app/[locale]/layout.tsx above the vignette so the orbs are
// dimmed at the corners.

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pd-ambient pointer-events-none fixed inset-0 z-[2] overflow-hidden"
    >
      {/* Three drifting orbs of warm gold. Each on its own timeline so the
          composition never repeats visibly. */}
      <span className="pd-orb pd-orb-1" />
      <span className="pd-orb pd-orb-2" />
      <span className="pd-orb pd-orb-3" />

      {/* Slow horizontal shimmer — a thin gold band that sweeps left → right
          over 24s, fading at both ends. Suggests light from a moving lamp. */}
      <span className="pd-shimmer" />

      {/* Centre pulse — a single very slow opacity sine on a soft gold wash.
          Adds the subtle "breathing" feel of an interior at dusk. */}
      <span className="pd-pulse-warm" />
    </div>
  );
}
