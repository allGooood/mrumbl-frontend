import axios from "./axios";
import type { ApiSuccessResponse } from "../types/response";

export interface Store {
    storeId: number;
    storeName: string;
    storeAddress: StoreAddress;
    coordinates: Coordinates;
    openNow: boolean;
}

export interface StoreAddress {
    address: string;
    addressDetail: string;
    postcode: string;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface StoreBusinessHour {
    open: string;
    close: string;
}

export type getStoresResopnse = {
    stores: Store[];
}

export type getStoreInformationResponse = {
    storeId: number;
    storeName: string;
    storeAddress: StoreAddress;
    storeBusinessHour: StoreBusinessHour;
    openNow: boolean;
}

export type getNearByStoresRequest = {
    x: number | null;
    y: number | null;
    r: number;
}

interface IStoreService {
    getStores: (keyword?: string) => Promise<Store[]>;
    getNearbyStores: (request: getNearByStoresRequest) => Promise<Store[]>;
    getStoreInformation: (storeId: number) => Promise<getStoreInformationResponse>;
}

export const useStoreService = (): IStoreService => {
    const getStores = async (keyword?: string): Promise<Store[]> => {
        const response = await axios.get<ApiSuccessResponse<getStoresResopnse>>(
            "/stores",
            { params: { keyword: keyword ?? "busan" } }
        );
        return response.data?.data?.stores ?? [];
    };

    const getNearbyStores = async(request: getNearByStoresRequest): Promise<Store[]> => {
        const response = await axios.get<ApiSuccessResponse<getStoresResopnse>>(
            "/stores/nearby",
            { params: 
                { 
                    x: request.x,
                    y: request.y,
                    r: request.r
                } 
            }
        );

        return response.data?.data?.stores ?? [];
    };

    const getStoreInformation = async (storeId: number): Promise<getStoreInformationResponse> => {
        const response = await axios.get<ApiSuccessResponse<getStoreInformationResponse>>(
            `/stores/${storeId}`
        );
        return response.data?.data;
    };

    return { getStores, getNearbyStores, getStoreInformation };
};
