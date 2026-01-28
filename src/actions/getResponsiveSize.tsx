import type { ResponsiveSizeType, SizeType } from "../hooks/useResponsive";

export const getResponsiveSize = (
  size: SizeType | SizeType[],
  breakpoint: ResponsiveSizeType
) => {
  const allowedSizes = ['large', 'medium', 'small', 'xsmall'] as SizeType[];
 
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
 
  const indexMap: Record<ResponsiveSizeType, number> = {
    wide: 0,
    desktop: 1,
    tablet: 2,
    mobile: 3,
  };
 
  return normalizedSize[indexMap[breakpoint]];
};