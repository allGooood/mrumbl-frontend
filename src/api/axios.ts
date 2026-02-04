import axios, { AxiosError, type AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { type ApiResponse, isErrorResponse } from '../types/response';
import { STORAGE_KEYS } from '../constants/storage';
import { useAuthStore } from '../stores/useAuthStore';

interface DecodedToken {
  exp?: number;
  iat?: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 토큰 만료 체크 및 삭제 함수
const checkAndRemoveExpiredToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000; // 초 단위로 변환
    
    // 토큰에 exp가 있고 만료된 경우
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      const clearUser = useAuthStore.getState().clearUser;
      clearUser();
      return true; // 만료됨
    }
    return false; // 유효함
  } catch (error) {
    // 토큰 디코딩 실패 시 (잘못된 토큰) 삭제
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    const clearUser = useAuthStore.getState().clearUser;
    clearUser();
    return true; // 만료/무효로 처리
  }
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      // 토큰 만료 체크
      const isExpired = checkAndRemoveExpiredToken(token);
      if (!isExpired) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // 만료된 토큰이면 로그인 페이지로 리다이렉트
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(new Error('Token expired'));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {

    // 백엔드 응답이 성공이지만 success가 false인 경우 처리
    if (isErrorResponse(response.data)) {
      const error = new Error(response.data.message);
      (error as any).response = {
        data: response.data,
        status: response.status
      };
      return Promise.reject(error);
    }
    return response;
  },

  (error: AxiosError<ApiResponse<unknown>>) => {
    // 401 Unauthorized 에러 처리 (토큰 만료 또는 인증 실패)
    if (error.response?.status === 401) {
      // 로컬스토리지에서 토큰 및 사용자 정보 삭제
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // Zustand store의 사용자 정보도 초기화
      const clearUser = useAuthStore.getState().clearUser;
      clearUser();
      
      // 로그인 페이지로 리다이렉트 (현재 경로가 로그인 페이지가 아닌 경우)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // 에러 응답 처리
    if (error.response?.data && isErrorResponse(error.response.data)) {
      const apiError = new Error(error.response.data.message);
      (apiError as any).response = {
        data: error.response.data,
        status: error.response.status
      };
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

export default instance;