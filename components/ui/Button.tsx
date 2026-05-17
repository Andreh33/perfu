import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-3 font-body text-[var(--text-sm)] tracking-[0.16em] uppercase font-medium transition-[color,background,border,opacity] outline-none disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--gold-200)] text-[var(--obsidian-400)] hover:bg-[var(--gold-100)] px-7 py-4",
        gold: "border border-[var(--gold-200)] text-[var(--gold-200)] hover:bg-[var(--gold-200)] hover:text-[var(--obsidian-400)] px-7 py-4",
        outline:
          "border border-[var(--ink-300)] text-[var(--ink-100)] hover:border-[var(--gold-200)] hover:text-[var(--gold-100)] px-7 py-4",
        ghost:
          "text-[var(--ink-200)] hover:text-[var(--gold-100)] px-3 py-2",
      },
      size: {
        sm: "text-[var(--text-xs)] px-4 py-2",
        md: "",
        lg: "text-[var(--text-base)] px-9 py-5",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
