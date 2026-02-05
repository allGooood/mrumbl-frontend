import { S3_PRODUCT_BASE_URL } from "../constants/url";

/**
 * S3 product 경로를 전체 이미지 URL로 변환
 * @param path - API에서 내려주는 상대 경로 (예: "cookie-1.jpg") 또는 null
 * @returns 전체 URL 또는 빈 문자열 (이미지 없음 처리용)
 */
export function getProductImageUrl(path: string | null | undefined): string {
  if (path == null || path.trim() === "") return "";
  const base = S3_PRODUCT_BASE_URL.replace(/\/$/, "");
  const segment = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${segment}`;
}
