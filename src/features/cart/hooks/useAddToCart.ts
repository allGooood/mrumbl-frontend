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
    "You can only add items from the same store to your cart.";
const DIFFERENT_STORE_SUB_MESSAGE =
    "Adding this item will remove previously added items.";

export function useAddToCart({ productId, storeId, productType }: UseAddToCartOptions) {
    const { addCarts, getCarts, deleteCarts } = useCartActions();
    const { setCart, storeId: cartStoreId, items } = useCartStore();
    const { showDialog, hideDialog } = useAppDialogStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performAdd = useCallback(
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

                // 새 아이템 추가
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
        [productId, storeId, productType, addCarts, getCarts, setCart, deleteCarts, items]
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
                    onConfirm: () => performAdd(params),
                    onSecondaryAction: hideDialog,
                });
            } else {
                performAdd(params);
            }
        },
        [storeId, cartStoreId, showDialog, hideDialog, performAdd]
    );

    return { addToCart, loading, error, setError };
}
