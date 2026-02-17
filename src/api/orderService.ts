import axios from "axios";
import { ApiSuccessResponse } from "./axios";

export type AddOrderRequest = {
    itmes: OrderItem[];
    customerRequest: string | null;
    storeId: number;
    paymentMethod: paymentMethod;
    productAmount: number;
    taxAmount: number;
    paymentAmount: number;
    cartIds: string[] | null;
};

export type OrderItem = {
    productId: number;
    productName: string;
    quantity: number;
    options: string | null;
    unitAmount: number;
    productAmount: number;
    imageUrl: string | null;
};

export enum paymentMethod {
    CARD,
}

export type AddOrderResponse = {
    orderNo: string;
}

interface IOrderService {
    addOrders: (request: AddOrderRequest) => void;
};

export const useOrderActions = (): IOrderService => {
    const addOrders =  async(request: AddOrderRequest) => {
        const response = await axios.post<ApiSuccessResponse<AddOrderResponse>>(
            "/orders", 
            request
        );
        return response.data.data;
    };

    return { addOrders };
};

