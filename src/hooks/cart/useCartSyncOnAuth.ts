import { useEffect, useRef } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import { useCartActions } from "../../api/cartService";

export function useCartSyncOnAuth() {
    const user = useAuthStore((state) => state.user);
    const { getCarts } = useCartActions();
    const setItems = useCartStore((state) => state.setItems);
    const clearCart = useCartStore((state) => state.clearCart);

    const getCartsRef = useRef(getCarts);
    const setItemsRef = useRef(setItems);
    const clearCartRef = useRef(clearCart);
    getCartsRef.current = getCarts;
    setItemsRef.current = setItems;
    clearCartRef.current = clearCart;

    useEffect(() => {
        if (user) {
            getCartsRef.current()
                .then((carts) => {
                    setItemsRef.current(carts);
                })
                .catch(() => {
                    setItemsRef.current([]);
                });
        } else {
            clearCartRef.current();
        }
    }, [user]);
}
