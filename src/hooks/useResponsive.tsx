import { useEffect, useState } from "react";

export type ResponsiveSizeType = 'wide' | 'desktop' | 'tablet' | 'mobile';
export type SizeType = 'large' | 'medium' | 'small' | 'xsmall';
export const breakpoints = [1440, 1024, 768];
 
const calcBreakpoint = (width: number) => {
  if (width >= breakpoints[0]) return 'wide';
  if (width >= breakpoints[1]) return 'desktop';
  if (width >= breakpoints[2]) return 'tablet';
  return 'mobile';
};
 
const useResponsive = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<ResponsiveSizeType>('wide');
 
  useEffect(() => {
    const handleSize = () => {
      const width = window.innerWidth;
      const breakpoint = calcBreakpoint(width);
      
      setCurrentBreakpoint(breakpoint);
    };

    // 초기 마운트 시에도 실행
    handleSize();

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);
 
  return currentBreakpoint;
};
 
export default useResponsive;