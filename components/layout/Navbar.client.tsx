"use client";
// Client component: scroll listener (passive), hamburger state, mobile menu wiring.

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

interface NavbarClientProps {
  children: ReactNode;
  openMenuLabel: string;
  closeMenuLabel: string;
  links: ReadonlyArray<{ href: string; label: string; key: string }>;
}

export function NavbarClient({
  children,
  openMenuLabel,
  closeMenuLabel,
  links,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const threshold = Math.max(window.innerHeight * 0.8, 480);
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-[80]",
          "px-[var(--space-5)] py-[var(--space-4)] md:py-[var(--space-5)]",
          "transition-[background-color,backdrop-filter,border-color]",
          "duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)]",
          "animate-[pd-nav-enter_600ms_var(--ease-soft-expo)_both]",
          scrolled
            ? "border-b border-[rgba(245,241,232,0.06)] bg-[var(--obsidian-400)]/60 backdrop-blur-[24px] backdrop-saturate-[1.4]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* @keyframes pd-nav-enter lives in app/globals.css (HostHoistable fix) */}
        {children}

        {/* Hamburger — visible only below lg */}
        <button
          type="button"
          aria-label={openMenuLabel}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="absolute top-1/2 right-[var(--space-5)] flex h-9 w-9 -translate-y-1/2 flex-col items-end justify-center gap-[5px] lg:hidden"
        >
          <span className="block h-px w-6 bg-[var(--ink-100)]" />
          <span className="block h-[2px] w-7 bg-[var(--ink-100)]" />
          <span className="block h-px w-5 bg-[var(--ink-100)]" />
        </button>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        closeLabel={closeMenuLabel}
        links={links}
      />
    </>
  );
}
