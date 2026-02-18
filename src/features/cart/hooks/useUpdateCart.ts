import { useCallback, useState } from "react";
import { useCartActions, type AddCartOption } from "../../../api/cartService";
import { useCartStore } from "../stores/useCartStore";

export function useUpdateCart() {
    const { updateCart, deleteCarts } = useCartActions();
    const { setCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const syncUpdateQuantity = useCallback(
        async (cartId: string, quantity: number, options:AddCartOption[]) => {
            try {
                setLoading(true);
                setError(null);

                if (quantity <= 0) {
                    const cartData = await deleteCarts([cartId]);
                    setCart(cartData);
                } else {
                    const cartData = await updateCart({ cartId, quantity, options });
                    setCart(cartData);
                }

            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "수량 변경에 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [deleteCarts, setCart, updateCart]
    );

    const syncRemoveItem = useCallback(
        async (cartId: string) => {
            try {
                setLoading(true);
                setError(null);

                const cartData = await deleteCarts([cartId]);
                setCart(cartData);

            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "항목 삭제에 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [deleteCarts, setCart]
    );

    return { syncUpdateQuantity, syncRemoveItem, loading, error, setError };
}

