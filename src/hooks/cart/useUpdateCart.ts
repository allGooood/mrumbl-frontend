import { useCallback, useState } from "react";
import { useCartActions } from "../../api/cartService";
import { useCartStore } from "../../stores/useCartStore";

export function useUpdateCart() {
    const { updateCart, deleteCarts } = useCartActions();
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const syncUpdateQuantity = useCallback(
        async (cartId: string, quantity: number) => {
            try {
                setLoading(true);
                setError(null);

                if (quantity <= 0) {
                    await deleteCarts([cartId]);
                    removeItem(cartId);
                } else {
                    await updateCart({ cartId, quantity });
                    updateQuantity(cartId, quantity);
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
        [updateCart, deleteCarts, updateQuantity, removeItem]
    );

    const syncRemoveItem = useCallback(
        async (cartId: string) => {
            try {
                setLoading(true);
                setError(null);
                await deleteCarts([cartId]);
                removeItem(cartId);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "항목 삭제에 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [deleteCarts, removeItem]
    );

    return { syncUpdateQuantity, syncRemoveItem, loading, error, setError };
}
