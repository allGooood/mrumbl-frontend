import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "../api/cartService";

type CartItem = Cart;  

export interface CartState {
  items: CartItem[];
  /** 로그인 직후 getCarts 동기화 */
  setItems: (items: CartItem[]) => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getSubTotal: () => number;
}

export const useCartStore = create(persist<CartState>((set, get) => ({
    items: [],
    setItems: (items) => set({ items }),

    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),

    addItem: (item) => {
      const existingItem = get().items.find(i => i.cartId === item.cartId);

      if (existingItem) {
        set({
          items: get().items.map(i =>
            i.cartId === item.cartId ? { ...i, quantity: i.quantity + 1 } : i
          )
        });
      } else {
        set({ items: [...get().items, { ...item, quantity: 1 }] });
      }
    },

    removeItem: (id) => {
      set({ items: get().items.filter(item => item.cartId !== id) });
    },

    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        get().removeItem(id);
      } else {
        set({
          items: get().items.map((item) =>
            item.cartId === id
              ? { ...item, quantity, productAmount: item.unitAmount * quantity }
              : item
          ),
        });
      }
    },

    clearCart: () => {
      set({ items: [] });
    },

    getTotalItems: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getSubTotal: () => {
      return get().items.reduce((sum, item) => sum + (item.productAmount ?? item.unitAmount * item.quantity), 0);
    },
  }),
  {
    name: "cart",
    merge: (persisted, current) => ({
      ...current,
      ...(persisted as Partial<CartState>),
      isCartOpen: false,
    }),
  }
));
