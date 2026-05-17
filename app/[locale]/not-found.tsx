import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { Link as I18nLink } from "@/i18n/navigation";

// 404 cinematic per §5.10.
// next-intl already resolves the locale through `getTranslations()` at
// request time, so we do not need to read `params` here. Avoids the new
// Next 16 async-params boilerplate for this static-shaped segment.

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center overflow-hidden bg-[var(--obsidian-400)]">
      <style>{`
        @keyframes pd-vial-drain {
          0%   { transform: scaleY(1); opacity: 0.85; }
          70%  { transform: scaleY(0.04); opacity: 0.85; }
          85%  { transform: scaleY(0); opacity: 0.4; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        .pd-vial-liquid {
          transform-origin: bottom center;
          animation: pd-vial-drain 5.6s cubic-bezier(0.83, 0, 0.17, 1) infinite;
        }
      `}</style>

      <Container width="narrow">
        <div className="flex flex-col items-center gap-[var(--space-7)] text-center">
          <EmptyVial />
          <div className="flex flex-col items-center gap-[var(--space-5)]">
            <Text variant="small-caps" tone="dim">
              404
            </Text>
            <Text
              as="h1"
              variant="display-xl"
              italic
              className="display-tight max-w-[20ch]"
            >
              {t("title")}
            </Text>
            <Text variant="body-l" tone="muted" className="max-w-[42ch]">
              {t("subtitle")}
            </Text>
            <div className="pt-[var(--space-4)]">
              <I18nLink
                href="/"
                className="group inline-flex items-center font-body text-[var(--text-sm)] uppercase tracking-[0.18em] text-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
              >
                <span className="relative">
                  {t("cta")}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                  />
                </span>
              </I18nLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function EmptyVial() {
  return (
    <svg
      width="120"
      height="180"
      viewBox="0 0 120 180"
      role="img"
      aria-label="An empty flacon, slowly draining"
      className="text-[var(--ink-300)]"
    >
      <defs>
        <linearGradient id="vial-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--gold-100)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--gold-300)" stopOpacity="0.6" />
        </linearGradient>
        <clipPath id="vial-inner">
          {/* Inner mask shaped like the flacon body */}
          <path d="M40 50 H80 V154 C80 162 76 166 70 166 H50 C44 166 40 162 40 154 Z" />
        </clipPath>
      </defs>

      {/* stopper */}
      <rect
        x="50"
        y="14"
        width="20"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="46"
        y="28"
        width="28"
        height="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* neck */}
      <line
        x1="52"
        y1="36"
        x2="52"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line
        x1="68"
        y1="36"
        x2="68"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* body */}
      <path
        d="M40 50 H80 V154 C80 162 76 166 70 166 H50 C44 166 40 162 40 154 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* draining liquid (clipped to body) */}
      <g clipPath="url(#vial-inner)">
        <rect
          x="40"
          y="80"
          width="40"
          height="86"
          fill="url(#vial-liquid)"
          className="pd-vial-liquid"
        />
      </g>
      {/* label band */}
      <line
        x1="40"
        y1="118"
        x2="80"
        y2="118"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}
