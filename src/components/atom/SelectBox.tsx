import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const ChevronDown = () => (
  <svg className="w-4 h-4 shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface SelectBoxProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** 추가 트리거 클래스 */
  className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, options, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 text-sm font-bold text-black px-2 py-1 rounded-full hover:bg-gray-50 ${className}`}
      >
        {selectedOption?.label}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-pink-100 py-1 z-20">
          {options.map((option) => {
            const isSelected = option.value === selectedOption?.value;

            if (option.disabled) {
              return (
                <div
                  key={option.value}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-300 cursor-not-allowed"
                >
                  {option.label}
                </div>
              );
            }

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center gap-2 px-3 py-2 rounded-2xl text-sm font-semibold ${
                  isSelected ? "bg-pink-100 text-black" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectBox;

