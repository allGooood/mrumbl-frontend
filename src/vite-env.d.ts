/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_S3_PRODUCT_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
