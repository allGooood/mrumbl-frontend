/**
 * 외부 리소스 Base URL
 * 환경별로 다른 URL이 필요하면 .env에 VITE_S3_PRODUCT_BASE_URL 설정
 */
export const S3_PRODUCT_BASE_URL =
  import.meta.env.VITE_S3_PRODUCT_BASE_URL ??
  "https://mrumbl-bucket.s3.ap-northeast-2.amazonaws.com/product";
