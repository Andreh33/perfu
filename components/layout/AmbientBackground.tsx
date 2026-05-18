"use client";
// Eight atmospheric ambient variants — each a different "mood" for the
// layered canvas that sits behind every page. CSS-only (GPU friendly,
// reduced-motion safe). Pick a variant by passing the `variant` prop or
// by editing DEFAULT_VARIANT below. Each variant is documented inline so
// it is easy to A/B in a stakeholder review.
//
//  1. drift        — three soft gold orbs floating slowly. Read: incense
//                    haze in a candlelit room.
//  2. mist         — three horizontal warm fog layers drifting at different
//                    speeds. Read: morning over the dunes.
//  3. velvet       — single very large deep-gold radial that "breathes",
//                    with a fixed warm corner light. Read: silk drape lit
//                    by a single lamp.
//  4. aurora       — slow gentle hue rotations across gold → amber → rose
//                    on a centred radial mass. Read: nocturnal interior.
//  5. constellation — dim warm pinpoints scattered across the canvas with
//                    rare twinkles and slow drift. Read: oud-scented night
//                    at a private gallery. THE DEFAULT.
//  6. ember        — soft pulsing warm glow rising from the bottom edge,
//                    suggesting embers in a brazier. Read: a hammam at night.
//  7. silk         — two long horizontal silk-like waves drifting up the
//                    viewport, mix-blend overlay. Read: gold-leaf paper
//                    moving in still air.
//  8. veil         — vertical near-imperceptible streaks of warm gold (like
//                    rising incense smoke) with a base haze. Read: bakhoor.

type Variant =
  | "drift"
  | "mist"
  | "velvet"
  | "aurora"
  | "constellation"
  | "ember"
  | "silk"
  | "veil";

const DEFAULT_VARIANT: Variant = "constellation";

interface AmbientBackgroundProps {
  variant?: Variant;
}

export function AmbientBackground({ variant }: AmbientBackgroundProps = {}) {
  const v = variant ?? DEFAULT_VARIANT;
  return (
    <div
      aria-hidden
      className={`pd-ambient pd-amb-${v} pointer-events-none fixed inset-0 z-[2] overflow-hidden`}
      data-ambient-variant={v}
    >
      {renderLayers(v)}
    </div>
  );
}

function renderLayers(v: Variant) {
  switch (v) {
    case "drift":
      return (
        <>
          <span className="pd-orb pd-orb-1" />
          <span className="pd-orb pd-orb-2" />
          <span className="pd-orb pd-orb-3" />
          <span className="pd-shimmer" />
          <span className="pd-pulse-warm" />
        </>
      );
    case "mist":
      return (
        <>
          <span className="pd-mist-layer pd-mist-1" />
          <span className="pd-mist-layer pd-mist-2" />
          <span className="pd-mist-layer pd-mist-3" />
          <span className="pd-pulse-warm" />
        </>
      );
    case "velvet":
      return (
        <>
          <span className="pd-velvet-mass" />
          <span className="pd-velvet-corner" />
          <span className="pd-velvet-grain" />
        </>
      );
    case "aurora":
      return (
        <>
          <span className="pd-aurora-mass" />
          <span className="pd-aurora-edge" />
        </>
      );
    case "constellation":
      return (
        <>
          {/* Two parallax layers: 60 stars total, all CSS box-shadows on a
              single 1×1 span per layer (cheap, GPU friendly). */}
          <span className="pd-stars pd-stars-back" />
          <span className="pd-stars pd-stars-front" />
          {/* A subtle warm centre wash so the stars are read against gold
              not pure dark. */}
          <span className="pd-constellation-wash" />
          {/* One occasional twinkle — a single brighter star that pulses
              roughly once every 8 s. */}
          <span className="pd-twinkle" />
        </>
      );
    case "ember":
      return (
        <>
          <span className="pd-ember-base" />
          <span className="pd-ember-glow" />
          <span className="pd-ember-flicker" />
        </>
      );
    case "silk":
      return (
        <>
          <span className="pd-silk pd-silk-1" />
          <span className="pd-silk pd-silk-2" />
        </>
      );
    case "veil":
      return (
        <>
          <span className="pd-veil-haze" />
          <span className="pd-veil-streak pd-veil-streak-1" />
          <span className="pd-veil-streak pd-veil-streak-2" />
          <span className="pd-veil-streak pd-veil-streak-3" />
          <span className="pd-veil-streak pd-veil-streak-4" />
        </>
      );
  }
}
