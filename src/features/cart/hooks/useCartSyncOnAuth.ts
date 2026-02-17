import { useEffect, useRef } from "react";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { useCartActions } from "../../../api/cartService";

export function useCartSyncOnAuth() {
    const user = useAuthStore((state) => state.user);
    const { getCarts } = useCartActions();
    const { setCart, clearCart } = useCartStore();

    const getCartsRef = useRef(getCarts);
    const setCartRef = useRef(setCart);
    const clearCartRef = useRef(clearCart);
    getCartsRef.current = getCarts;
    setCartRef.current = setCart;
    clearCartRef.current = clearCart;

    useEffect(() => {
        if (user) {
            getCartsRef.current()
                .then((carts) => {
                    setCartRef.current({
                        storeId: carts?.storeId ?? null,
                        items: carts?.items ?? [],
                    });
                })
                .catch(() => {
                    setCartRef.current({ storeId: null, items: [] });
                });
        } else {
            clearCartRef.current();
        }
    }, [user]);
}
