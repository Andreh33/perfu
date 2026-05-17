"use client";

// Client because of toggle interaction.
import { cn } from "@/lib/cn";

export function FilterChip({
  label,
  active,
  onClick,
  ariaPressed,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  ariaPressed?: boolean;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ?? active}
      className={cn(
        "inline-flex items-center justify-center border px-[var(--space-4)] py-[6px]",
        "small-caps text-[var(--text-xs)] tracking-[0.14em]",
        "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-soft-expo)]",
        active
          ? "border-[var(--gold-200)] bg-[var(--gold-200)]/10 text-[var(--gold-100)]"
          : "border-[var(--ink-500)] text-[var(--ink-300)] hover:border-[var(--gold-200)] hover:text-[var(--gold-100)]",
      )}
    >
      {label}
    </button>
  );
}
