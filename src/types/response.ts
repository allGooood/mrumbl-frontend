// 백엔드 공통 응답 타입

// 성공 응답
export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  transactionTime: string;
}

// 에러 응답
export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
}

// 성공/에러 유니온 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// 타입 가드 함수
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
