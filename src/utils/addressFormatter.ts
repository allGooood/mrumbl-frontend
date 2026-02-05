import type { StoreAddress } from "../api/storeService";

export interface FormatAddressOptions {
  /** 우편번호까지 포함할지 여부 (기본값: false) */
  includePostcode?: boolean;
  /** 주소 파트 사이 구분자 (기본값: ", ") */
  separator?: string;
  /** 주소가 없을 때 반환할 기본 문자열 (기본값: "") */
  fallback?: string;
}

export const formatAddress = (
  storeAddress?: StoreAddress | null,
  options: FormatAddressOptions = {}
): string => {
  const {
    includePostcode = false,
    separator = ", ",
    fallback = "",
  } = options;

  if (!storeAddress) return fallback;

  const parts: Array<string | undefined> = [
    storeAddress.addressDetail,
    storeAddress.address,
  ];

  if (includePostcode) {
    parts.push(storeAddress.postcode);
  }

  const line = parts.filter(Boolean).join(separator);

  return line || fallback;
};

/**
 * 주소 문자열을 지정한 길이로 잘라 "…"을 붙여줍니다.
 * 너무 짧은 경우 그대로 반환합니다.
 */
export const truncateAddress = (address: string, maxLength = 25): string => {
  if (!address) return "";
  return address.length > maxLength ? `${address.slice(0, maxLength)}…` : address;
};


