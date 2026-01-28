import { useAuthStore, type User } from '../stores/useAuthStore';
import axios from './axios';
import type { ApiSuccessResponse } from '../types/response';
import { STORAGE_KEYS } from '../constants/storage';

export interface LoginRequest {
    email: string;
    password: string;
  }
  
export interface LoginResponse {
  email: string;
  accessToken: string;
  attemptLeft: number;
}

interface IUseAuth {
  signin: (loginRequest: LoginRequest) => Promise<void>;
  // signup: (email: string, password: string, username: string) => Promise<void>;
  signout: () => void;
}

export const useAuthActions = (): IUseAuth => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const signin = async (loginRequest: LoginRequest) => {
    const response = await axios.post<ApiSuccessResponse<LoginResponse>>('/auth/login/email', loginRequest);
    const authData = response.data.data;
    const accessToken = authData.accessToken;

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    
    const user: User = {
      id: authData.email,
      email: authData.email,
      username: authData.email.split('@')[0], // email의 @ 앞부분을 username으로 사용
    }

    setUser(user, accessToken);
  };

  const signout = async() => {
    await axios.delete<ApiSuccessResponse<void>>('/auth/logout');
    
    clearUser();
    
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  };

  return { signin, signout };
};

  









