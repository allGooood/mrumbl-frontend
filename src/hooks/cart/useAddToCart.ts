import { useCallback, useState } from "react";
import { useCartActions } from "../../api/cartService";
import type { AddCartOption } from "../../api/cartService";
import { useCartStore } from "../../stores/useCartStore";

export type AddToCartParams = {
    quantity: number;
    options?: AddCartOption[];
};

export type UseAddToCartOptions = {
    productId: number;
    storeId: number | null;
    productType: string;
};

export function useAddToCart({ productId, storeId, productType }: UseAddToCartOptions) {
    const { addCarts, getCarts } = useCartActions();
    const setItems = useCartStore((state) => state.setItems);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addToCart = useCallback(
        async ({ quantity, options }: AddToCartParams) => {
            if (storeId === null) return;

            try {
                setLoading(true);
                setError(null);

                await addCarts({
                    productId,
                    storeId,
                    quantity,
                    productType,
                    ...(options && options.length > 0 ? { options } : {}),
                });

                const carts = await getCarts();
                setItems(carts);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "장바구니에 담는 데 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [productId, storeId, productType, addCarts, getCarts, setItems]
    );

    return { addToCart, loading, error, setError };
}
