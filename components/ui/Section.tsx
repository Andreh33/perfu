import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "tight" | "default" | "spacious" | "cinematic";
  tone?: "void" | "elevated" | "ink";
}

const spacingMap = {
  tight: "py-[var(--space-7)] md:py-[var(--space-8)]",
  default: "py-[var(--space-8)] md:py-[var(--space-10)]",
  spacious: "py-[var(--space-9)] md:py-[var(--space-11)]",
  cinematic: "py-[var(--space-10)] md:py-[var(--space-12)]",
} as const;

const toneMap = {
  void: "bg-[var(--obsidian-400)]",
  elevated: "bg-[var(--obsidian-200)]",
  ink: "bg-[var(--ink-100)] text-[var(--obsidian-400)]",
} as const;

export function Section({
  spacing = "default",
  tone = "void",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative w-full", spacingMap[spacing], toneMap[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}
