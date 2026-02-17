import { useCallback, useState } from "react";
import { useCartActions } from "../../../api/cartService";
import type { AddCartOption } from "../../../api/cartService";
import { useCartStore } from "../stores/useCartStore";
import { useAppDialogStore } from "../../../shared/stores/useAppDialogStore";

export type AddToCartParams = {
    quantity: number;
    options?: AddCartOption[];
};

export type UseAddToCartOptions = {
    productId: number;
    storeId: number | null;
    productType: string;
};

const DIFFERENT_STORE_MESSAGE =
    "You can only add items from the same store to your cart. Adding this item will remove previously added items.";

export function useAddToCart({ productId, storeId, productType }: UseAddToCartOptions) {
    const { addCarts, getCarts } = useCartActions();
    const setCart = useCartStore((state) => state.setCart);
    const { showDialog } = useAppDialogStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performAdd = useCallback(
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
                setCart({ storeId: carts.storeId, items: carts.items });
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "장바구니에 담는 데 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [productId, storeId, productType, addCarts, getCarts, setCart]
    );

    const addToCart = useCallback(
        (params: AddToCartParams) => {
            if (storeId === null) return;

            const cartStoreId = useCartStore.getState().storeId;
            const isDifferentStore =
                cartStoreId !== null && cartStoreId !== storeId;

            if (isDifferentStore) {
                showDialog({
                    title: "Different store",
                    description: DIFFERENT_STORE_MESSAGE,
                    onConfirm: () => performAdd(params),
                });
            } else {
                performAdd(params);
            }
        },
        [storeId, showDialog, performAdd]
    );

    return { addToCart, loading, error, setError };
}
