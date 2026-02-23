import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '../constants/storage';
import { useAuthStore } from '../features/auth/stores/useAuthStore';


//-- Axios 인스턴스 생성
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});


//-- 백엔드 공통 응답 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  transactionTime: string;
}

export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
}

export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> {
  return response.success === true;
}

export function isErrorResponse(
  response: ApiResponse<unknown>
): response is ApiErrorResponse {
  return response.success === false;
}



//-- Request 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



//-- Response 인터셉터
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

  async (error: AxiosError<ApiResponse<unknown>>) => {
    // -- 실패한 Request 객체
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 1. 401 Unauthorized 에러 처리 (토큰 만료 또는 인증 실패)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const isReissueRequest = originalRequest.url === '/auth/reissue';

      // Reissue API가 실패했을 경우
      if(isReissueRequest){
        reissuePromise = null;
        clearAuthAndRedirectToLogin();
        return Promise.reject(error);
      }

      if(!reissuePromise){
        reissuePromise = doReissue()
                          .catch((e) => {
                            reissuePromise = null;
                            clearAuthAndRedirectToLogin();
                            throw e;
                          });
      }

      // AccessToken 재발급 후 실패했던 Request 재전송
      try{
        const newAccessToken = await reissuePromise;
        reissuePromise = null;
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
        
      } catch(e){
        return Promise.reject(e);
      }
    }
    
    // 2. 일반 API 에러 처리
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


//-- Reissue용 변수 및 함수
let reissuePromise: Promise<string> | null = null;

interface ReissueResponse {
  accessToken: string;
}

const doReissue = async(): Promise<string> => {
  const response = await instance.post<ApiSuccessResponse<ReissueResponse>>(
    '/auth/reissue',
    {},
    {withCredentials: true}
  );
  
  const newAccessToken = response.data.data.accessToken;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

  return newAccessToken;
};

const clearAuthAndRedirectToLogin = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);

  useAuthStore.getState().clearUser();

  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

export default instance;