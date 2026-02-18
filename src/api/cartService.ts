import axios from "./axios";
import type { ApiSuccessResponse } from "./axios";

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
    /** Product type (e.g. COOKIE_BOX, MERCH). When COOKIE_BOX, description may be shown. */
    productType?: string;
    /** Shown when productType is COOKIE_BOX. */
    description?: string;
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

// export type CartResponse = {
//     cartIds: string[];
// }

export type CartCommonResponse = {
    storeId: number;
    items: Cart[];
};

export type UpdateCartRequest = {
    cartId: string;
    quantity: number;
    options?: AddCartOption[];
}

interface ICartService {
    addCarts: (request: AddCartRequest) => Promise<CartCommonResponse>;
    getCarts: () => Promise<CartCommonResponse>;
    updateCart: (request: UpdateCartRequest) => Promise<CartCommonResponse>;
    deleteCarts: (cartIds: string[]) => Promise<CartCommonResponse>;
}

export const useCartActions = (): ICartService => {
    const addCarts = async (request: AddCartRequest) => {
        const response = await axios.post<ApiSuccessResponse<CartCommonResponse>>(
            "/v2/carts",
            request
        );
        return response.data.data;
    };

    const getCarts = async () => {
        const response = await axios.get<ApiSuccessResponse<CartCommonResponse>>(
            "/v2/carts"
        );
        return response.data.data;
    };

    const updateCart = async (request: UpdateCartRequest) => {
        const response = await axios.put<ApiSuccessResponse<CartCommonResponse>>(
            "/v2/carts", 
            request);
        return response.data.data;
    };

    const deleteCarts = async (cartIds: string[]) => {
        const response = await axios.delete<ApiSuccessResponse<CartCommonResponse>>(
            "/v2/carts", 
            { data: { cartIds } });
        return response.data.data;
    };

    return { addCarts, getCarts, updateCart, deleteCarts };
};

// export const useCartActions = (): ICartService => {
//     const addCarts = async (request: AddCartRequest) => {
//         const response = await axios.post<ApiSuccessResponse<CartResponse>>(
//             "/v2/carts",
//             request
//         );
//         return response.data.data;
//     };

//     const getCarts = async () => {
//         const response = await axios.get<ApiSuccessResponse<GetCartsResponse>>(
//             "/v2/carts"
//         );
//         return response.data.data;
//     };

//     const updateCart = async (request: UpdateCartRequest) => {
//         await axios.put("/v2/carts", request);
//     };

//     const deleteCarts = async (cartIds: string[]) => {
//         await axios.delete("/v2/carts", { data: { cartIds } });
//     };

//     return { addCarts, getCarts, updateCart, deleteCarts };
// };