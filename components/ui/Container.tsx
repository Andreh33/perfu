import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: "narrow" | "default" | "wide" | "full";
}

const widthMap = {
  narrow: "max-w-[840px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1560px]",
  full: "max-w-none",
} as const;

export function Container({
  width = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-5)] md:px-[var(--space-7)]",
        widthMap[width],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
