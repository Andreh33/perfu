"use client";
// Client component: reads the Zustand cart count and toggles the cart drawer.
// Replaces the static "0" badge that lived in the Navbar shell.

import { CartIcon } from "@/components/layout/NavbarIcons";
import { useCart, selectCartCount } from "@/lib/store/cart";

interface CartIconButtonProps {
  ariaLabel: string;
}

export function CartIconButton({ ariaLabel }: CartIconButtonProps) {
  const count = useCart(selectCartCount);
  const toggle = useCart((s) => s.toggle);

  return (
    <button
      type="button"
      aria-label={`${ariaLabel} (${count})`}
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
    >
      <CartIcon />
      <span
        aria-hidden="true"
        className="absolute -top-0.5 -right-0.5 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[var(--gold-200)] px-[3px] text-[10px] font-medium text-[var(--obsidian-400)] tabular-nums"
      >
        {count}
      </span>
      <span className="sr-only">{count}</span>
    </button>
  );
}
