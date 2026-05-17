// Server Component: resolves the `preloader` next-intl namespace on the server
// and feeds plain strings to <PreloaderShell> so that the preloader does not
// need to wait for <NextIntlClientProvider> to hydrate before showing copy.
//
// This keeps the boundary tidy: the client <Preloader> receives concrete props
// (no hook reads, no provider dependency), which means it can mount before any
// other client provider in the layout tree.

import { getTranslations } from "next-intl/server";
import { PreloaderShell } from "@/components/preloader/PreloaderShell";

interface PreloaderMountProps {
  locale: string;
}

export async function PreloaderMount({ locale }: PreloaderMountProps) {
  const t = await getTranslations({ locale, namespace: "preloader" });
  return (
    <PreloaderShell
      copy={{
        assembling: t("assembling"),
        labels: {
          shaders: t("labels.shaders"),
          textures: t("labels.textures"),
          scene: t("labels.scene"),
          composing: t("labels.composing"),
          timeout: t("labels.timeout"),
        },
        arabicBadge: t("arabic_badge"),
      }}
    />
  );
}
