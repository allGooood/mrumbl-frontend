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

interface IProductService {
    getCookies: () => Promise<getCookiesResponse>;
}

export const useProductActions = (): IProductService => {
    const getCookies = async () => {
        const response = await axios.get<ApiSuccessResponse<getCookiesResponse>>(
            '/products/cookies'
        );
        return response.data.data;
    };

    return { getCookies };
};