import React from "react";

interface InlineLoaderProps {
  /** 로딩 메시지 (기본값: "Loading...") */
  message?: string;
  /** 컨테이너에 추가할 클래스명 */
  className?: string;
  /** 스피너 크기 (기본값: "md") */
  size?: "sm" | "md" | "lg";
}

/**
 * 인라인 로더 컴포넌트
 * 
 * 컴포넌트 내부에서 로딩 상태를 표시할 때 사용합니다.
 * GlobalFullPageLoader와 달리 전역 로딩 상태와 독립적으로 작동합니다.
 * 
 * @example
 * ```tsx
 * const [isLoading, setIsLoading] = useState(false);
 * 
 * return (
 *   <div>
 *     {isLoading ? (
 *       <InlineLoader message="Loading your bag..." />
 *     ) : (
 *       <Content />
 *     )}
 *   </div>
 * );
 * ```
 */
const InlineLoader: React.FC<InlineLoaderProps> = ({
  message = "Loading...",
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center py-12 ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className={`inline-block animate-spin rounded-full border-4 border-solid border-brand-primary border-e-transparent ${sizeClasses[size]}`}
        />
        <p className={`text-gray-600 ${textSizeClasses[size]}`}>{message}</p>
      </div>
    </div>
  );
};

export default InlineLoader;
