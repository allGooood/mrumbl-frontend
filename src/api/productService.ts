import axios from "./axios";
import type { ApiSuccessResponse } from "../types/response";

export interface Cookie {
    cookieId: number;
    cookieName: string;
    imageUrl: string;
    cookieCalorie: number;
    additionalPrice: number | null;
    description: string;
}

export type getCookiesResponse = Cookie[];

export type Product = {
    productId: number;
    productName: string;
    unitAmount: number;
    discountRate: number;
    isSoldOut: boolean;
    productType: string;
    imageUrl: string | null;
    requiredItemCount: number;
};

export type ProductsByCategory = {
    storeId: number;
    category: string;
    displayOrder: number;
    products: Product[];
};

export type getProductsResponse = ProductsByCategory[];

export type getProductDetailResponse = {
    productId: number;
    productName: string;
    unitAmount: number;
    description: string;
    stock: number;
    imageUrl: string | null;
    discountRate: number;
    productType: string;
    requiredItemCount: number;
}

interface IProductService {
    getCookies: () => Promise<getCookiesResponse>;
    getProducts: (storeId: number) => Promise<ProductsByCategory[]>;
    getProductDetail: (storeId: number, productId: number) => Promise<getProductDetailResponse>;
};

export const useProductActions = (): IProductService => {
    const getCookies = async () => {
        const response = await axios.get<ApiSuccessResponse<getCookiesResponse>>(
            '/products/cookies'
        );
        return response.data.data;
    };

    const getProducts = async (storeId: number): Promise<ProductsByCategory[]> => {
        const response = await axios.get<ApiSuccessResponse<getProductsResponse>>(
            `/products/${storeId}`
        );
        return response.data?.data ?? [];
    };

    const getProductDetail = async(storeId: number, productId: number): Promise<getProductDetailResponse> => {
        const response = await axios.get<ApiSuccessResponse<getProductDetailResponse>>(
            `/products/${storeId}/${productId}`
        )
        return response.data.data;
    };

    return { getCookies, getProducts, getProductDetail };
};