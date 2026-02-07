import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCartStore } from "../../stores/useCartStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useUpdateCart } from "../../hooks/cart/useUpdateCart";
import CartSidebarHeader from "./CartSidebarHeader";
import CartEmpty from "./CartEmpty";
import CartItemRow from "./CartItemRow";
import CartSidebarFooter from "./CartSidebarFooter";

const CART_PANEL_WIDTH = "min(400px, 100vw - 2rem)";

export default function CartSidebar() {
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const { syncUpdateQuantity, syncRemoveItem } = useUpdateCart();

  const subtotal = useCartStore((state) =>
    state.items.reduce(
      (sum, item) => sum + (item.productAmount ?? item.unitAmount * item.quantity),
      0
    )
  );

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.addEventListener("keydown", onEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeCart();
  };

  if (!isCartOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="My Bag"
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={handleBackdropClick}
      />

      <div
        className="relative flex flex-col h-full max-w-[400px] bg-white shadow-xl rounded-l-2xl animate-slide-in-right"
        style={{ width: CART_PANEL_WIDTH, maxHeight: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CartSidebarHeader onClose={closeCart} />

        <div className="flex-1 overflow-y-auto flex flex-col">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <ul className="flex-1 divide-y divide-gray-200">
              {items.map((item) => (
                <CartItemRow
                  key={item.cartId}
                  item={item}
                  onUpdateQuantity={syncUpdateQuantity}
                  onRemove={syncRemoveItem}
                />
              ))}
            </ul>
          )}

          <CartSidebarFooter
            subtotal={subtotal}
            canCheckout={items.length > 0 && !!user}
            onCheckout={closeCart}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
