import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Perfume } from "@/lib/products";

interface RitualProps {
  product: Perfume;
  locale: "es" | "en" | "ar";
  sectionLabel: string;
  caption: string;
}

/**
 * Editorial "ritual of application" block. Centres a single italic display
 * sentence next to a minimal SVG torso. The torso uses animated SMIL pulses
 * on the wrist/neck/elbow markers so the diagram subtly breathes — falls
 * back to a static glyph in browsers that suppress SMIL.
 */
export function Ritual({ product, locale, sectionLabel, caption }: RitualProps) {
  const ritualText = product.ritual[locale];

  return (
    <Section spacing="cinematic" id="ritual">
      <Container width="default">
        <div className="flex flex-col items-center gap-[var(--space-7)]">
          <Text variant="small-caps" tone="gold">
            {sectionLabel}
          </Text>

          <div className="grid w-full grid-cols-1 items-center gap-[var(--space-7)] md:grid-cols-2">
            <figure className="mx-auto w-full max-w-[320px]">
              <PulsingTorso />
              <figcaption className="mt-[var(--space-4)] text-center small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]">
                {caption}
              </figcaption>
            </figure>

            <Text
              as="p"
              variant="display-m"
              italic
              tone="primary"
              className="max-w-[40ch] text-balance"
            >
              {ritualText}
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PulsingTorso(): React.JSX.Element {
  // ViewBox 200x260. Stroke = gold-200. Markers pulse via SMIL.
  return (
    <svg
      viewBox="0 0 200 260"
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--gold-200)"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* head */}
      <ellipse cx="100" cy="30" rx="18" ry="22" />
      {/* neck */}
      <path d="M92 50 L92 64 Q100 70 108 64 L108 50" />
      {/* shoulders + torso */}
      <path d="M60 76 Q100 64 140 76 L150 210 Q100 224 50 210 Z" />
      {/* arms */}
      <path d="M60 76 L34 200" />
      <path d="M140 76 L166 200" />
      {/* collarbone hint */}
      <path d="M82 76 Q100 84 118 76" opacity={0.5} />

      {/* wrist markers */}
      <g fill="var(--gold-200)" stroke="none">
        <circle cx="34" cy="200" r="3">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="166" cy="200" r="3">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
        {/* neck hollow */}
        <circle cx="100" cy="72" r="3">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </circle>
        {/* inner elbows */}
        <circle cx="58" cy="138" r="3">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="142" cy="138" r="3">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            begin="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export default Ritual;
