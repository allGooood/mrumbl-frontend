import { useCallback, useState } from "react";
import { useCartActions } from "../../../api/cartService";
import type { AddCartOption } from "../../../api/cartService";
import { useCartStore } from "../stores/useCartStore";
import { useDialog } from "../../../shared/stores/useDialog";

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
    "You can only add items from the same store to your cart.";
const DIFFERENT_STORE_SUB_MESSAGE =
    "Adding this item will remove previously added items.";

export function useAddToCart({ productId, storeId, productType }: UseAddToCartOptions) {
    const { addCarts, deleteCarts } = useCartActions();
    const { setCart, storeId: cartStoreId, items } = useCartStore();
    const { showDialog, hideDialog } = useDialog();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addItem = useCallback(
        async ({ quantity, options }: AddToCartParams) => {
            if (!storeId) return;

            try {
                setLoading(true);
                setError(null);
                
                const cartData = await addCarts({
                    productId,
                    storeId,
                    quantity,
                    productType,
                    ...(options && options.length > 0 ? { options } : {}),
                });

                setCart(cartData);

            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "장바구니에 담는 데 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },

        [productId, storeId, productType, addCarts, setCart]
    );

    const clearDifferentStoreItemsAndAdd = useCallback(
        async ({ quantity, options }: AddToCartParams) => {
            if (storeId === null) return;

            try {
                setLoading(true);
                setError(null);
                
                // 기존 카트가 있으면 삭제
                if (items.length > 0) {
                    const cartIds = items.map((item) => item.cartId);
                    await deleteCarts(cartIds);
                }

                const cartData = await addCarts({
                    productId,
                    storeId,
                    quantity,
                    productType,
                    ...(options && options.length > 0 ? { options } : {}),
                });

                setCart(cartData);

            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "장바구니에 담는 데 실패했습니다."
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [storeId, items, addCarts, productId, productType, setCart, deleteCarts]
    );

    const addToCart = useCallback(
        (params: AddToCartParams) => {
            if (storeId === null) return;

            const isDifferentStore =
                cartStoreId !== null && cartStoreId !== storeId;

            if (isDifferentStore) {
                showDialog({
                    title: "Different store",
                    description: DIFFERENT_STORE_MESSAGE,
                    subDescription: DIFFERENT_STORE_SUB_MESSAGE,
                    buttonLabel: "Add",
                    onConfirm: () => clearDifferentStoreItemsAndAdd(params),
                    onSecondaryAction: hideDialog,
                });
            } else {
                addItem(params);
            }
        },
        [storeId, cartStoreId, showDialog, hideDialog, clearDifferentStoreItemsAndAdd, addItem]
    );

    return { addToCart, loading, error, setError };
}

