/**
 * localStorage 키 상수
 * 
 * localStorage에 저장되는 키 값들을 중앙에서 관리합니다.
 * 키 이름 변경 시 이 파일만 수정하면 됩니다.
 */
export const STORAGE_KEYS = {
  /** 인증 토큰 */
  ACCESS_TOKEN: 'accessToken',
  /** 사용자 정보 */
  USER: 'user',
} as const;
