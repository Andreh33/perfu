// Server Component: renders the translated, statically known shell of the navbar.
// All interactivity lives in `NavbarClient` and `LocaleSwitcher`.

import { getTranslations } from "next-intl/server";
import { Link as I18nLink } from "@/i18n/navigation";
import { Monogram } from "./Monogram";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavbarClient } from "./Navbar.client";
import { SearchIcon, UserIcon, CartIcon } from "./NavbarIcons";

interface NavbarProps {
  locale: string;
}

export async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "navbar" });

  const centerLinks = [
    { key: "maison", href: "/maison", label: t("maison") },
    { key: "atelier", href: "/atelier", label: t("atelier") },
    { key: "perfumeur", href: "/perfumeur", label: t("perfumeur") },
    { key: "bespoke", href: "/bespoke", label: t("bespoke") },
    { key: "journal", href: "/journal", label: t("journal") },
  ] as const;

  // For now the cart badge is static; Zustand store arrives in Phase 10.
  const cartCount = 0;

  return (
    <NavbarClient
      openMenuLabel={t("open_menu")}
      closeMenuLabel={t("close_menu")}
      links={centerLinks.map((l) => ({ ...l }))}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-[var(--space-5)]">
        {/* LEFT · monogram */}
        <I18nLink
          href="/"
          aria-label={t("maison")}
          className="flex items-center text-[var(--ink-100)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
        >
          <Monogram size={32} />
        </I18nLink>

        {/* CENTER · desktop links */}
        <ul className="hidden items-center justify-center gap-[var(--space-4)] lg:flex">
          {centerLinks.map((link, idx) => (
            <li key={link.key} className="flex items-center gap-[var(--space-4)]">
              <I18nLink
                href={link.href}
                className="group relative font-body text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink-200)] hover:text-[var(--ink-100)] transition-colors duration-[var(--duration-quick)]"
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                  />
                </span>
              </I18nLink>
              {idx < centerLinks.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="text-[10px] text-[var(--ink-400)]"
                >
                  •
                </span>
              ) : null}
            </li>
          ))}
        </ul>

        {/* RIGHT · icons (hidden on mobile, hamburger takes over) */}
        <div className="hidden items-center gap-[var(--space-4)] lg:flex">
          <button
            type="button"
            aria-label={t("search")}
            className="flex h-9 w-9 items-center justify-center text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
          >
            <SearchIcon />
          </button>

          <LocaleSwitcher />

          <button
            type="button"
            aria-label={t("account")}
            className="flex h-9 w-9 items-center justify-center text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
          >
            <UserIcon />
          </button>

          <button
            type="button"
            aria-label={t("cart")}
            className="relative flex h-9 w-9 items-center justify-center text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
          >
            <CartIcon />
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[var(--gold-200)] px-[3px] text-[10px] font-medium text-[var(--obsidian-400)] tabular-nums"
            >
              {cartCount}
            </span>
            <span className="sr-only">{cartCount}</span>
          </button>
        </div>
      </div>
    </NavbarClient>
  );
}
