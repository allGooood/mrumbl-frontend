import axios from "./axios";
import type { ApiSuccessResponse } from "../types/response";

interface IsAvailableEmailResponse {
    available: boolean;
}

interface IUserService {
    isAvailableEmail: (email: string) => Promise<boolean>;
}

export const useUserService = (): IUserService => {
    const isAvailableEmail = async (email: string): Promise<boolean> => {
        const response = await axios.post<ApiSuccessResponse<IsAvailableEmailResponse>>(
            '/members/availability',
            { email }
        );
        const available = response.data.data.available;
        return available;
    };

    return {
        isAvailableEmail,
    };
};