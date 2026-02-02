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

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface sendVerficationCodeResponse {
  email: string;
  ttlSeconds: number;
  issuedAt: string;
}

export interface verifySecurityCodeRequest {
  email: string;
  verificationCode: string;
}

interface IAuthService {
  signin: (loginRequest: LoginRequest) => Promise<void>;
  signup: (req: SignupRequest) => Promise<void>;
  signout: () => void;
  sendSecurityCode: (email: string) => Promise<sendVerficationCodeResponse>;
  verifySecurityCode: (req: verifySecurityCodeRequest) => Promise<void>;
}

export const useAuthActions = (): IAuthService => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  // 로그인
  const signin = async (loginRequest: LoginRequest) => {
    const response = await axios.post<ApiSuccessResponse<LoginResponse>>(
      '/auth/login/email',
      loginRequest
    );
    const authData = response.data.data;
    const accessToken = authData.accessToken;

    // !!! 백엔드 로그인 API는 실패 응답이 없음 (대신에 accessToken이 null)
    if (!accessToken) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      setUser(null as unknown as User, null as unknown as string);
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

    const user: User = {
      id: authData.email,
      email: authData.email,
      username: authData.email.split('@')[0], // email의 @ 앞부분을 username으로 사용
    };

    setUser(user, accessToken);
  };

  // 회원가입
  const signup = async(req: SignupRequest) => {
    await axios.post<ApiSuccessResponse<void>>('/members', req);
  };

  // 로그아웃
  const signout = async() => {
    await axios.delete<ApiSuccessResponse<void>>('/auth/logout');
    
    clearUser();
    
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  };

  // 인증코드 Email 전송
  const sendSecurityCode = async(email: string) => {
    const response = await axios.post<ApiSuccessResponse<sendVerficationCodeResponse>>(
      '/auth/verification-code', {email});
    return response.data.data;
  };

  // 인증코드 일치 확인
  const verifySecurityCode = async(req: verifySecurityCodeRequest) => {
    await axios.post<ApiSuccessResponse<void>>(
      '/auth/verification-code/verify', req
    );
  }

  return { signin, signup, signout, sendSecurityCode, verifySecurityCode };
};

  









