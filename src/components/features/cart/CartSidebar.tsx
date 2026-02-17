import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCartStore } from "../../../features/cart/stores/useCartStore";
import { useAuthStore } from "../../../features/auth/stores/useAuthStore";
import { useUpdateCart } from "../../../features/cart/hooks/useUpdateCart";
import { useStoreService } from "../../../api/storeService";
import type { getStoreInformationResponse } from "../../../api/storeService";
import CartSidebarHeader from "./CartSidebarHeader";
import CartStoreInfo from "./CartStoreInfo";
import CartEmpty from "./CartEmpty";
import CartItemRow from "./CartItemRow";
import CartSidebarFooter from "./CartSidebarFooter";
import { useNavigate } from "react-router-dom";

const CART_PANEL_WIDTH = "min(400px, 100vw - 2rem)";

export default function CartSidebar() {
  const { storeId, items, isCartOpen, closeCart } = useCartStore();
  const subtotal = useCartStore((state) => state.getSubTotal());
  const { syncUpdateQuantity, syncRemoveItem } = useUpdateCart();
  const { getStoreInformation } = useStoreService();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [store, setStore] = useState<getStoreInformationResponse | null>(null);

  const handleCheckout = () => {
    closeCart();
    navigate(`/order/pickup/${storeId}/checkout`);
  };

  useEffect(() => {
    if (storeId && items.length > 0) {
      getStoreInformation(storeId)
        .then(setStore)
        .catch(() => setStore(null));
    } else {
      setStore(null);
    }
  }, [storeId]);

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

        {store && <CartStoreInfo store={store} />}

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
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
