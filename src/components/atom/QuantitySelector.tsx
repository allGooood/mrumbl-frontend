import React from "react";
import useResponsive from "../../hooks/useResponsive";
import { getResponsiveValue } from "../../actions/getResponsiveSize";

/** large=기본, medium/small/compact=점점 작음. 단일값=고정, 배열=[wide, desktop, tablet, mobile] 반응형 */
export type QuantitySizeType = "large" | "medium" | "small" | "xsmall";

export type QuantitySelectorProps = {
  value?: number;
  onChange: (value: number) => void;
  /** 최소 수량. 삭제 불가면 1, 삭제 가능이면 0 권장 */
  min?: number;
  /** 최대 수량. 의존 모드에서는 부모가 total - others 로 계산해 전달 */
  max?: number;
  /** 제공 시 삭제 가능 모드: 0 허용, 제거 UI 노출(선택) */
  onRemove?: () => void;
  /** true면 +/- 비활성 (예: 의존 모드에서 남은 수량 0) */
  disabled?: boolean;
  /** 접근성: 수량이 무엇인지 설명 (예: "티셔츠 수량") */
  "aria-label"?: string;
  /** 단일값=해당 크기 고정, 배열=[wide, desktop, tablet, mobile] 반응형 */
  size?: QuantitySizeType | QuantitySizeType[];
  className?: string;
};

/**
 * 단일 수량 선택기. 용도별 사용법:
 *
 * 1. 독립 + 삭제 불가: min=1, max=고정, onRemove 없음
 * 2. 의존 + 삭제 불가: min=1, max=(total - others), onRemove 없음 → max=0이면 disabled
 * 3. 독립 + 삭제 가능: min=0, max=고정, onRemove 제공
 * 4. 의존 + 삭제 가능: min=0, max=(total - others), onRemove 제공
 *
 * "의존"은 컴포넌트 분리가 아니라 사용 방식: 부모가 max를 계산해 넘기면 됨.
 */
const CONTAINER_CLASSES: Record<QuantitySizeType, string> = {
  large: "min-w-[110px] min-h-[50px] w-[150px] 2xl:w-[178px] h-full p-3",
  medium: "min-w-[96px] min-h-[44px] w-[130px] 2xl:w-[152px] h-full p-2.5",
  small: "min-w-[84px] min-h-[38px] w-[112px] 2xl:w-[132px] h-full p-2",
  xsmall: "min-w-[74px] min-h-[34px] w-[100px] p-2",
};

const BUTTON_CLASSES: Record<QuantitySizeType, string> = {
  large: "text-2xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  medium: "text-xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  small: "text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  xsmall: "text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value = 0,
  onChange,
  min = 1,
  max,
  onRemove,
  disabled = false,
  "aria-label": ariaLabel = "수량",
  size = "large",
  className = "",
}) => {
  const breakpoint = useResponsive();
  const resolvedSize = getResponsiveValue(size, breakpoint);

  const effectiveMin = onRemove != null ? 0 : (min ?? 1);
  const canDecrease = !disabled && value > effectiveMin;
  const canIncrease = !disabled && (max == null || value < max);

  const handleDecrease = () => {
    if (!canDecrease) return;

    const next = value - 1;
    if (next === 0 && onRemove) {
      onRemove();
      return;
    }

    onChange(next);
  };

  const handleIncrease = () => {
    if (!canIncrease) return;

    onChange(value + 1);
  };

  const sizeClasses = CONTAINER_CLASSES[resolvedSize];
  const btnClass = BUTTON_CLASSES[resolvedSize];

  return (
    <div
      className={`inline-flex items-center justify-between rounded-full border border-gray-300 
        ${sizeClasses}
        ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        aria-label="수량 줄이기"
        onClick={handleDecrease}
        disabled={!canDecrease}
        className={btnClass}
      >
        −
      </button>
      <span className="tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="수량 늘리기"
        onClick={handleIncrease}
        disabled={!canIncrease}
        className={btnClass}
      >
        +
      </button>
    </div>
  );

  // Legacy commented markup kept for reference:
  // <div
    //   className={`inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white ${className}`}
    //   role="group"
    //   aria-label={ariaLabel}
    // >
    //   <button
    //     type="button"
    //     aria-label="수량 줄이기"
    //     onClick={handleDecrease}
    //     disabled={!canDecrease}
    //     className="w-11 h-11 flex items-center justify-center text-black hover:bg-gray-100 transition-colors 
    //             disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
    //   >
    //     −
    //   </button>
    //   <span
    //         className="w-11 h-11 flex items-center justify-center text-black font-medium border-x border-gray-300 bg-white tabular-nums"
    //         aria-live="polite"
    //   >
    //     {value}
    //   </span>
    //   <button
    //     type="button"
    //     aria-label="수량 늘리기"
    //     onClick={handleIncrease}
    //     disabled={!canIncrease}
    //     className="w-11 h-11 flex items-center justify-center text-black hover:bg-gray-100 transition-colors 
    //             disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
  //   >
  //     +
  //   </button>
  // </div>
};

/** 의존 모드: 전체 수량(total)과 다른 선택기들 합(othersSum)으로 이 선택기의 max 계산 */
export function getAvailableMax(total: number, othersSum: number): number {
  return Math.max(0, total - othersSum);
}

export default QuantitySelector;
