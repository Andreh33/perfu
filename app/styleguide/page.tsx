import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Style Guide · Perfumes Dubai",
  description: "Internal design system reference. Not for public consumption.",
  robots: "noindex, nofollow",
};

type Swatch = { token: string; hex: string; label: string };

const inkSwatches: Swatch[] = [
  { token: "--ink-100", hex: "#F5F1E8", label: "Ink 100" },
  { token: "--ink-200", hex: "#E8DFC9", label: "Ink 200" },
  { token: "--ink-300", hex: "#B8A98C", label: "Ink 300" },
  { token: "--ink-400", hex: "#7A6F5C", label: "Ink 400" },
  { token: "--ink-500", hex: "#4A4438", label: "Ink 500" },
];

const obsidianSwatches: Swatch[] = [
  { token: "--obsidian-100", hex: "#1F1F1D", label: "Obsidian 100" },
  { token: "--obsidian-200", hex: "#18181A", label: "Obsidian 200" },
  { token: "--obsidian-300", hex: "#0F0F11", label: "Obsidian 300" },
  { token: "--obsidian-400", hex: "#08080A", label: "Obsidian 400" },
];

const goldSwatches: Swatch[] = [
  { token: "--gold-100", hex: "#D4B677", label: "Gold 100" },
  { token: "--gold-200", hex: "#B8935A", label: "Gold 200" },
  { token: "--gold-300", hex: "#8E6E3F", label: "Gold 300" },
  { token: "--gold-400", hex: "#5C4628", label: "Gold 400" },
];

const accentSwatches: Swatch[] = [
  { token: "--accent-rose", hex: "#C9928A", label: "Rose" },
  { token: "--accent-amber", hex: "#C4945C", label: "Amber" },
  { token: "--accent-jade", hex: "#5C7A6F", label: "Jade" },
];

function SwatchTile({ swatch }: { swatch: Swatch }) {
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <div
        className="h-24 w-24 border border-[var(--ink-500)]"
        style={{ background: `var(${swatch.token})` }}
        aria-label={swatch.label}
      />
      <div className="flex flex-col gap-1">
        <Text variant="metadata" tone="secondary">
          {swatch.token}
        </Text>
        <Text variant="small-caps" tone="muted">
          {swatch.hex}
        </Text>
      </div>
    </div>
  );
}

function SwatchColumn({
  title,
  swatches,
}: {
  title: string;
  swatches: Swatch[];
}) {
  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      <Text variant="small-caps" tone="gold">
        {title}
      </Text>
      <div className="flex flex-wrap gap-[var(--space-5)]">
        {swatches.map((s) => (
          <SwatchTile key={s.token} swatch={s} />
        ))}
      </div>
    </div>
  );
}

const typographyVariants = [
  { variant: "display-xxl", word: "Maison", note: "Fraunces · 9xl" },
  { variant: "display-xl", word: "Maison", note: "Fraunces · 8xl" },
  { variant: "display-l", word: "Maison", note: "Fraunces · 7xl" },
  { variant: "display-m", word: "Maison", note: "Fraunces · 6xl" },
  { variant: "headline", word: "Maison", note: "Fraunces · 4xl" },
  { variant: "subhead", word: "The atelier awaits", note: "Fraunces · 2xl" },
  { variant: "body-l", word: "The atelier awaits", note: "Inter · md" },
  { variant: "body", word: "The atelier awaits", note: "Inter · base" },
  { variant: "body-s", word: "The atelier awaits", note: "Inter · sm" },
  { variant: "label", word: "The atelier awaits", note: "Inter · sm" },
  { variant: "small-caps", word: "The atelier awaits", note: "Inter · xs" },
  { variant: "metadata", word: "EST · MMXXVI", note: "JetBrains · xs" },
  { variant: "quote", word: "The atelier awaits", note: "Fraunces italic · 3xl" },
] as const;

const spacingTokens = [
  { name: "--space-1", value: 4 },
  { name: "--space-2", value: 8 },
  { name: "--space-3", value: 12 },
  { name: "--space-4", value: 16 },
  { name: "--space-5", value: 24 },
  { name: "--space-6", value: 40 },
  { name: "--space-7", value: 64 },
  { name: "--space-8", value: 96 },
  { name: "--space-9", value: 128 },
  { name: "--space-10", value: 160 },
  { name: "--space-11", value: 224 },
  { name: "--space-12", value: 320 },
];

const easingCurves = [
  { name: "--ease-pure-cubic", label: "Pure Cubic" },
  { name: "--ease-soft-expo", label: "Soft Expo" },
  { name: "--ease-firm-back", label: "Firm Back" },
  { name: "--ease-silk", label: "Silk" },
  { name: "--ease-tide", label: "Tide" },
];

export default function StyleguidePage() {
  return (
    <>
      <style>{`
        @keyframes sg-slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(200px); }
          100% { transform: translateX(0); }
        }
        .sg-easing-box {
          animation: sg-slide 3s infinite;
        }
      `}</style>

      <Section spacing="default">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-3)]">
            <Text variant="small-caps" tone="gold">
              Perfumes Dubai · Internal
            </Text>
            <Text as="h1" variant="display-m" className="display-tight">
              Style Guide
            </Text>
            <Text variant="body-l" tone="muted" className="max-w-[60ch]">
              Visual reference of every design token and primitive. Hidden from
              search engines. For QA and engineering only.
            </Text>
          </div>
        </Container>
      </Section>

      {/* A · Palette */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            a · Chromatic palette
          </Text>
          <div className="grid grid-cols-1 gap-[var(--space-8)] md:grid-cols-3">
            <SwatchColumn title="Ink" swatches={inkSwatches} />
            <SwatchColumn title="Obsidian" swatches={obsidianSwatches} />
            <SwatchColumn title="Gold" swatches={goldSwatches} />
          </div>
          <div className="mt-[var(--space-7)]">
            <SwatchColumn title="Accents · Olfactory" swatches={accentSwatches} />
          </div>
        </Container>
      </Section>

      {/* B · Typography */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            b · Typographic scale
          </Text>
          <div className="flex flex-col gap-[var(--space-6)]">
            {typographyVariants.map((row) => (
              <div
                key={row.variant}
                className="grid grid-cols-1 items-baseline gap-[var(--space-3)] border-t border-[var(--ink-500)] pt-[var(--space-4)] md:grid-cols-[200px_1fr]"
              >
                <div className="flex flex-col gap-1">
                  <Text variant="metadata" tone="muted">
                    {row.variant}
                  </Text>
                  <Text variant="metadata" tone="dim">
                    {row.note}
                  </Text>
                </div>
                <div className="overflow-hidden">
                  <Text variant={row.variant}>{row.word}</Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* C · Buttons */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            c · Buttons
          </Text>
          <div className="grid grid-cols-1 gap-[var(--space-7)] md:grid-cols-2 lg:grid-cols-4">
            {(["primary", "gold", "outline", "ghost"] as const).map((variant) => (
              <div
                key={variant}
                className="flex flex-col items-start gap-[var(--space-4)] border border-[var(--ink-500)] p-[var(--space-5)]"
              >
                <Text variant="metadata" tone="muted">
                  variant · {variant}
                </Text>
                <div className="flex flex-col gap-[var(--space-3)]">
                  <Button variant={variant} size="md">
                    Enter Atelier
                  </Button>
                  <Button variant={variant} size="lg">
                    Enter Atelier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* D · Links */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            d · Links
          </Text>
          <div className="flex flex-col gap-[var(--space-5)]">
            {(["default", "gold", "subtle"] as const).map((variant) => (
              <div key={variant} className="flex items-baseline gap-[var(--space-6)]">
                <Text variant="metadata" tone="muted" className="w-32">
                  {variant}
                </Text>
                <Link href="#" variant={variant}>
                  Hover to draw the underline
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* E · Arabic RTL */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            e · Arabic · RTL
          </Text>
          <div
            dir="rtl"
            lang="ar"
            className="flex flex-col gap-[var(--space-5)] border border-[var(--ink-500)] p-[var(--space-7)]"
          >
            <Text variant="metadata" tone="muted" dir="ltr">
              Noto Naskh Arabic · display
            </Text>
            <Text
              variant="display-m"
              className="font-arabic-display"
              italic={false}
            >
              فن العطر، مستخلص من الصحراء والزمن
            </Text>
            <Text variant="metadata" tone="muted" dir="ltr">
              IBM Plex Sans Arabic · body
            </Text>
            <Text variant="body-l" className="font-arabic">
              الورشة بانتظار اختيارك
            </Text>
          </div>
        </Container>
      </Section>

      {/* F · Spacing */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            f · Spacing tokens
          </Text>
          <div className="flex flex-col gap-[var(--space-3)]">
            {spacingTokens.map((s) => (
              <div
                key={s.name}
                className="grid grid-cols-[200px_80px_1fr] items-center gap-[var(--space-4)]"
              >
                <Text variant="metadata" tone="muted">
                  {s.name}
                </Text>
                <Text variant="metadata" tone="dim">
                  {s.value}px
                </Text>
                <div
                  className="h-6"
                  style={{
                    width: `${s.value}px`,
                    background: "var(--gold-300)",
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* G · Easing curves */}
      <Section spacing="default">
        <Container width="wide">
          <Text as="h2" variant="headline" className="mb-[var(--space-7)]">
            g · Easing curves
          </Text>
          <div className="flex flex-col gap-[var(--space-6)]">
            {easingCurves.map((curve) => (
              <div key={curve.name} className="flex flex-col gap-[var(--space-3)]">
                <div className="flex items-baseline gap-[var(--space-4)]">
                  <Text variant="metadata" tone="muted">
                    {curve.name}
                  </Text>
                  <Text variant="metadata" tone="dim">
                    {curve.label}
                  </Text>
                </div>
                <div className="relative h-12 w-[260px] border-l border-r border-[var(--ink-500)]">
                  <div
                    className="sg-easing-box absolute top-1 left-1 h-10 w-10"
                    style={{
                      background: "var(--gold-200)",
                      animationTimingFunction: `var(${curve.name})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
