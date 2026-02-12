/**
 * localStorage 키 상수
 * 
 * localStorage에 저장되는 키 값들을 중앙에서 관리합니다.
 */
export const STORAGE_KEYS = {
  /** 인증 토큰 */
  ACCESS_TOKEN: 'accessToken',
  /** 사용자 정보 */
  USER: 'user',
} as const;
