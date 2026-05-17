import type * as React from "react";
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "display-xxl"
  | "display-xl"
  | "display-l"
  | "display-m"
  | "headline"
  | "subhead"
  | "body-l"
  | "body"
  | "body-s"
  | "label"
  | "small-caps"
  | "metadata"
  | "quote";

const variantMap: Record<Variant, string> = {
  "display-xxl":
    "font-display text-[var(--text-9xl)] leading-[0.88] tracking-[-0.04em] text-wrap-balance",
  "display-xl":
    "font-display text-[var(--text-8xl)] leading-[0.88] tracking-[-0.04em] text-wrap-balance",
  "display-l":
    "font-display text-[var(--text-7xl)] leading-[0.9] tracking-[-0.03em]",
  "display-m":
    "font-display text-[var(--text-6xl)] leading-[0.92] tracking-[-0.02em]",
  headline:
    "font-display text-[var(--text-4xl)] leading-[1.05] tracking-[-0.02em]",
  subhead:
    "font-display text-[var(--text-2xl)] leading-[1.2] tracking-[-0.01em]",
  "body-l": "font-body text-[var(--text-md)] leading-[1.55]",
  body: "font-body text-[var(--text-base)] leading-[1.6]",
  "body-s": "font-body text-[var(--text-sm)] leading-[1.55]",
  label: "font-body text-[var(--text-sm)] tracking-[0.04em]",
  "small-caps":
    "font-body uppercase tracking-[0.16em] text-[var(--text-xs)] font-medium",
  metadata:
    "font-mono uppercase tracking-[0.08em] text-[var(--text-xs)] tabular-nums",
  quote:
    "font-display italic text-[var(--text-3xl)] leading-[1.15] tracking-[-0.01em]",
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: Variant;
  italic?: boolean;
  tone?: "primary" | "secondary" | "muted" | "gold" | "dim";
}

const toneMap = {
  primary: "text-[var(--ink-100)]",
  secondary: "text-[var(--ink-200)]",
  muted: "text-[var(--ink-300)]",
  gold: "text-[var(--gold-200)]",
  dim: "text-[var(--ink-400)]",
} as const;

export function Text({
  as: Tag = "p",
  variant = "body",
  italic,
  tone = "primary",
  className,
  children,
  ...props
}: TextProps) {
  const Component = Tag as React.ComponentType<Record<string, unknown>>;
  return (
    <Component
      className={cn(
        variantMap[variant],
        toneMap[tone],
        italic && "italic",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
