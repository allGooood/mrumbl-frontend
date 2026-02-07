import axios from "./axios";
import type { ApiSuccessResponse } from "../types/response";

export type Cart = {
    cartId: string;
    productId: number;
    productName: string;
    unitAmount: number;
    productAmount: number;
    imageUrl?: string;
    isSoldOut: boolean;
    requiredItemCount: number;
    quantity: number;
    options?: CartOption[];
}

export type CartOption = {
    cookieId: number;
    cookieName: string;
    quantity: number;
    isSoldOut: boolean;
}

export type AddCartRequest = {
    productId: number;
    storeId: number;
    quantity: number;
    productType: string;
    options?: AddCartOption[];
}

export type AddCartOption = {
    cookieId: number;
    quantity: number;
}

export type CartResponse = {
    cartIds: string[];
}

export type GetCartsResponse = Cart[];

export type UpdateCartRequest = {
    cartId: string;
    quantity: number;
    options?: AddCartOption[];
}

interface ICartService {
    addCarts: (request: AddCartRequest) => Promise<CartResponse>;
    getCarts: () => Promise<GetCartsResponse>;
    updateCart: (request: UpdateCartRequest) => Promise<void>;
    deleteCarts: (cartIds: string[]) => Promise<void>;
}

export const useCartActions = (): ICartService => {
    const addCarts = async (request: AddCartRequest) => {
        const response = await axios.post<ApiSuccessResponse<CartResponse>>(
            "/carts",
            request
        );
        return response.data.data;
    };

    const getCarts = async () => {
        const response = await axios.get<ApiSuccessResponse<GetCartsResponse>>(
            "/carts"
        );
        return response.data.data ?? [];
    };

    const updateCart = async (request: UpdateCartRequest) => {
        await axios.put("/carts", request);
    };

    const deleteCarts = async (cartIds: string[]) => {
        await axios.delete("/carts", { data: { cartIds } });
    };

    return { addCarts, getCarts, updateCart, deleteCarts };
};