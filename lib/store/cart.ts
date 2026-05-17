/**
 * Cart store · Zustand + persist middleware.
 *
 * The cart is intentionally minimal: it only holds (slug, size, quantity) tuples.
 * Product details are resolved on read via `getProductBySlug` so the persisted
 * state stays small and resilient to catalogue edits between sessions.
 *
 * Persistence:
 *   - localStorage key `pd-cart-v1`. Bumping the version is the migration story.
 *   - On rehydrate we re-validate with Zod; any corruption resets the cart to
 *     an empty state rather than throwing.
 *
 * Quantity is bounded to [1, 20] per line; updating to 0 removes the line.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";

export type CartSize = "ml50" | "ml100";

export type CartItem = {
  slug: string;
  size: CartSize;
  quantity: number;
};

const cartItemSchema = z.object({
  slug: z.string().min(1),
  size: z.enum(["ml50", "ml100"]),
  quantity: z.number().int().min(1).max(20),
});

const cartStateSchema = z.object({
  items: z.array(cartItemSchema),
});

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: { slug: string; size: CartSize; quantity?: number }) => void;
  removeItem: (slug: string, size: CartSize) => void;
  updateQty: (slug: string, size: CartSize, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const MAX_QTY = 20;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: ({ slug, size, quantity = 1 }) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.slug === slug && i.size === size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === slug && i.size === size
                  ? {
                      ...i,
                      quantity: Math.min(MAX_QTY, i.quantity + quantity),
                    }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                slug,
                size,
                quantity: Math.max(1, Math.min(MAX_QTY, quantity)),
              },
            ],
          };
        }),
      removeItem: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.size === size),
          ),
        })),
      updateQty: (slug, size, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.slug === slug && i.size === size
                ? { ...i, quantity: Math.max(0, Math.min(MAX_QTY, qty)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "pd-cart-v1",
      version: 1,
      // Keep `isOpen` purely ephemeral — drawers should never resurrect on reload.
      partialize: (state) => ({ items: state.items }),
      // Validate persisted state with Zod on rehydrate; reset on corruption.
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const parsed = cartStateSchema.safeParse({ items: state.items });
        if (!parsed.success) {
          state.items = [];
        } else {
          state.items = parsed.data.items;
        }
      },
    },
  ),
);

// ── Selectors ────────────────────────────────────────────────────────────────

export function selectCartCount(state: { items: CartItem[] }): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function selectCartLineCount(state: { items: CartItem[] }): number {
  return state.items.length;
}
