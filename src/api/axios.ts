import axios, { AxiosError, type AxiosResponse } from 'axios';
import { type ApiResponse, isErrorResponse } from '../types/response';
import { STORAGE_KEYS } from '../constants/storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
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