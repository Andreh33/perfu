// Server shell for the pinned manifesto sequence. Fetches localized copy
// server-side, then hands off to the client subcomponent for GSAP + canvas.

import { getTranslations } from "next-intl/server";
import { ManifestoClient } from "./Manifesto.client";

interface ManifestoProps {
  locale: string;
}

export async function Manifesto({ locale }: ManifestoProps) {
  const t = await getTranslations({ locale, namespace: "manifesto" });

  return (
    <section
      id="manifesto"
      className="relative w-full bg-[var(--obsidian-400)] overflow-hidden"
    >
      <ManifestoClient
        phrases={{
          p1: t("phrases.p1"),
          p2_a: t("phrases.p2_a"),
          p2_b: t("phrases.p2_b"),
          p3: t("phrases.p3"),
          p4: t("phrases.p4"),
        }}
        labels={{ frame_caption: t("frame_caption") }}
      />
    </section>
  );
}
