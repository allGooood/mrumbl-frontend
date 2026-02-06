import type { ResponsiveSizeType, SizeType } from "../hooks/useResponsive";

const BREAKPOINT_INDEX: Record<ResponsiveSizeType, number> = {
  wide: 0,
  desktop: 1,
  tablet: 2,
  mobile: 3,
};

/**
 * 단일값이면 그대로 반환(고정), 배열이면 [wide, desktop, tablet, mobile] 순으로 breakpoint에 맞는 값 반환.
 * 배열이 4개 미만이면 마지막 값으로 채움.
 */
export function getResponsiveValue<T>(
  value: T | T[],
  breakpoint: ResponsiveSizeType
): T {
  if (!Array.isArray(value)) return value;
  const idx = BREAKPOINT_INDEX[breakpoint];
  const padded = [...value];
  while (padded.length <= idx) {
    padded.push(padded[padded.length - 1] as T);
  }
  return padded[idx];
}

export const getResponsiveSize = (
  size: SizeType | SizeType[],
  breakpoint: ResponsiveSizeType
): SizeType => {
  const allowedSizes = ["large", "medium", "small", "xsmall"] as SizeType[];

  const normalizeSize = (size: SizeType | SizeType[]): SizeType | SizeType[] => {
    if (Array.isArray(size)) {
      if (!size.every((s) => allowedSizes.includes(s))) {
        throw new Error(`Invalid size in allowed sizes: ${size}`);
      }
      return [...size, ...Array(4 - size.length).fill(size[size.length - 1])];
    } else {
      if (!allowedSizes.includes(size)) {
        throw new Error(`Invalid size in allowed sizes: ${size}`);
      }
      return [size, size, size, size];
    }
  };

  const normalizedSize = normalizeSize(size);
  return getResponsiveValue(normalizedSize as SizeType[], breakpoint);
};