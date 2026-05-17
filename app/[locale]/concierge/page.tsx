import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { ConciergeForm } from "@/components/concierge/ConciergeForm";

type LocaleParams = { locale: string };
type ConciergeSearchParams = { from?: string | string[] };

export default async function ConciergePage({
  params,
  searchParams,
}: {
  params: Promise<LocaleParams>;
  searchParams: Promise<ConciergeSearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "concierge" });

  const sp = await searchParams;
  const fromRaw = Array.isArray(sp.from) ? sp.from[0] : sp.from;
  const initialSubject =
    fromRaw === "boutique" ? t("form.subject_boutique") : "";

  return (
    <Section spacing="cinematic">
      <Container width="wide">
        <div className="flex flex-col gap-[var(--space-7)]">
          <div className="flex flex-col gap-[var(--space-4)]">
            <Text variant="small-caps" tone="gold">
              MMXXVI · CONCIERGE
            </Text>
            <Text
              as="h1"
              variant="display-xl"
              italic
              className="display-tight"
            >
              {t("title")}
            </Text>
            <Text variant="subhead" tone="secondary" italic className="max-w-[36ch]">
              {t("subtitle")}
            </Text>
            <Text variant="body-l" tone="muted" className="max-w-[58ch]">
              {t("intro")}
            </Text>
          </div>

          <div className="grid gap-[var(--space-8)] lg:grid-cols-[1.4fr_0.6fr] lg:gap-[var(--space-9)]">
            <ConciergeForm initialSubject={initialSubject} />

            <aside className="flex flex-col gap-[var(--space-5)] lg:pt-[var(--space-4)]">
              <Text variant="small-caps" tone="gold">
                {t("channels.title")}
              </Text>

              <Channel
                label={t("channels.email_label")}
                value={t("channels.email")}
                href={`mailto:${t("channels.email")}`}
              />
              <Channel
                label={t("channels.whatsapp_label")}
                value={t("channels.whatsapp")}
                href={`tel:${t("channels.whatsapp").replace(/[\s+]/g, "")}`}
              />
              <Channel
                label={t("channels.response_label")}
                value={t("channels.response")}
              />
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface ChannelProps {
  label: string;
  value: string;
  href?: string;
}

function Channel({ label, value, href }: ChannelProps) {
  return (
    <div className="flex flex-col gap-[var(--space-2)] border-t border-[var(--ink-500)] pt-[var(--space-4)]">
      <Text variant="small-caps" tone="dim">
        {label}
      </Text>
      {href ? (
        <a
          href={href}
          className="font-body text-[var(--text-base)] text-[var(--ink-100)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
        >
          {value}
        </a>
      ) : (
        <p className="font-body text-[var(--text-base)] text-[var(--ink-200)]">
          {value}
        </p>
      )}
    </div>
  );
}
