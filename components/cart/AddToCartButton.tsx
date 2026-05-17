"use client";
// Client component: adds a (slug, size) line to the cart and opens the drawer.

import { useTranslations } from "next-intl";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { hasStripeLink } from "@/lib/stripe-links";
import { useCart, type CartSize } from "@/lib/store/cart";

interface AddToCartButtonProps
  extends Omit<ButtonProps, "onClick" | "children" | "size"> {
  slug: string;
  bottleSize: CartSize;
  label?: string;
  quantity?: number;
}

export function AddToCartButton({
  slug,
  bottleSize,
  label,
  quantity = 1,
  variant = "gold",
  ...rest
}: AddToCartButtonProps) {
  const t = useTranslations("cart");
  const addItem = useCart((s) => s.addItem);
  const open = useCart((s) => s.open);

  // In production we disable the CTA if no Stripe link exists for this SKU —
  // a visible "soldout"-style affordance that prevents dead carts. In dev /
  // preview we let it through so QA can flow through the drawer freely.
  const isProd = process.env.NODE_ENV === "production";
  const blocked = isProd && !hasStripeLink(slug, bottleSize);

  const onClick = () => {
    addItem({ slug, size: bottleSize, quantity });
    open();
  };

  return (
    <Button
      type="button"
      variant={variant}
      onClick={onClick}
      disabled={blocked || rest.disabled}
      {...rest}
    >
      {label ?? t("add_button")}
    </Button>
  );
}
