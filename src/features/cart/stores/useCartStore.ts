import { create } from "zustand";
import type { Cart } from "../../../api/cartService";

type CartItem = Cart;

export type SetCartPayload = {
  storeId: number | null;
  items: CartItem[];
};

export interface CartState {
  storeId: number | null;
  items: CartItem[];
  setCart: (payload: SetCartPayload) => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  clearCart: () => void;

  getTotalItems: () => number;
  getSubTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    storeId: null,
    items: [],
    setCart: ({ storeId, items }) => set({ storeId, items }),

    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),

    clearCart: () => {
      set({ storeId: null, items: [] });
    },

    getTotalItems: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getSubTotal: () => {
      return get().items.reduce((sum, item) => sum + (item.productAmount ?? item.unitAmount * item.quantity), 0);
    },
}));
