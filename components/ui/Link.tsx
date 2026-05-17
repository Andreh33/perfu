"use client";

// Drawing-underline link with stroke-dasharray animation on hover.
import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DrawLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  children: ReactNode;
  variant?: "default" | "gold" | "subtle";
}

export function Link({
  children,
  className,
  variant = "default",
  ...props
}: DrawLinkProps) {
  const colorClass =
    variant === "gold"
      ? "text-[var(--gold-200)] hover:text-[var(--gold-100)]"
      : variant === "subtle"
        ? "text-[var(--ink-300)] hover:text-[var(--ink-100)]"
        : "text-[var(--ink-100)] hover:text-[var(--gold-100)]";

  return (
    <NextLink
      className={cn(
        "group relative inline-flex items-center transition-colors duration-[var(--duration-quick)]",
        colorClass,
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
        />
      </span>
    </NextLink>
  );
}
