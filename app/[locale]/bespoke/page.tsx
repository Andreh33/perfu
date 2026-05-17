import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { BespokeForm } from "@/components/bespoke/BespokeForm";

type LocaleParams = { locale: string };

export default async function BespokePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "bespoke" });

  const steps = ["step_1", "step_2", "step_3"] as const;

  return (
    <>
      <Section spacing="cinematic">
        <Container width="wide">
          <div className="grid gap-[var(--space-9)] lg:grid-cols-[1fr_1fr] lg:gap-[var(--space-10)]">
            <div className="flex flex-col gap-[var(--space-5)]">
              <Text variant="small-caps" tone="gold">
                MMXXVI · ON COMMISSION
              </Text>
              <Text
                as="h1"
                variant="display-xl"
                italic
                className="display-tight"
              >
                {t("title")}
              </Text>
              <Text
                variant="subhead"
                tone="secondary"
                italic
                className="max-w-[28ch]"
              >
                {t("subtitle")}
              </Text>
              <div className="flex flex-col gap-[var(--space-3)] max-w-[58ch]">
                <Text variant="body-l" tone="secondary">
                  {t("intro_1")}
                </Text>
                <Text variant="body-l" tone="muted">
                  {t("intro_2")}
                </Text>
                <Text variant="body-l" tone="muted">
                  {t("intro_3")}
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-5)] lg:pt-[var(--space-8)]">
              <BespokeForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="spacious" tone="elevated">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-7)]">
            <Text variant="small-caps" tone="gold">
              {t("process.title")}
            </Text>
            <div className="grid gap-[var(--space-6)] md:grid-cols-3 md:gap-[var(--space-7)]">
              {steps.map((step) => (
                <article
                  key={step}
                  className="flex flex-col gap-[var(--space-4)] border-t border-[var(--ink-500)] pt-[var(--space-5)]"
                >
                  <ProcessIcon step={step} />
                  <Text
                    variant="metadata"
                    tone="gold"
                    className="text-[var(--text-sm)]"
                  >
                    {t(`process.${step}_label`)}
                  </Text>
                  <Text variant="headline" italic className="display-tight">
                    {t(`process.${step}_title`)}
                  </Text>
                  <Text variant="body" tone="muted">
                    {t(`process.${step}_body`)}
                  </Text>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ProcessIcon({ step }: { step: "step_1" | "step_2" | "step_3" }) {
  const common = {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "var(--gold-200)",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "opacity-80",
  };

  if (step === "step_1") {
    // dialogue — two thin chat ovals
    return (
      <svg {...common}>
        <path d="M6 12 H30 V26 H18 L12 32 V26 H6 Z" />
        <path d="M18 18 H42 V32 H36 L30 38 V32 H18 Z" />
      </svg>
    );
  }
  if (step === "step_2") {
    // composition — concentric rings (an organ of bottles)
    return (
      <svg {...common}>
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4" />
        <line x1="24" y1="2" x2="24" y2="46" />
        <line x1="2" y1="24" x2="46" y2="24" />
      </svg>
    );
  }
  // step 3 — flacon
  return (
    <svg {...common}>
      <path d="M20 6 H28 V10 H30 V14 L34 18 V40 C34 43 32 44 30 44 H18 C16 44 14 43 14 40 V18 L18 14 V10 H20 Z" />
      <line x1="14" y1="22" x2="34" y2="22" />
    </svg>
  );
}
