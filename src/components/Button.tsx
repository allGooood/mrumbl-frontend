import React from "react";
import { getResponsiveSize } from "../actions/getResponsiveSize";
import type { SizeType } from "../hooks/useResponsive";
import useResponsive from "../hooks/useResponsive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeType | SizeType[];
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = ["large", "medium", "small", "xsmall"],
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const currentBreakpoint = useResponsive();
  const responsiveSize = getResponsiveSize(size, currentBreakpoint);

  const sizeClasses = {
    large: "px-8 py-3 text-lg",
    medium: "px-6 py-2 text-base",
    small: "px-5 py-1.5 text-sm",
    xsmall: "px-4 py-1 text-xs",
  };

  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-700 active:bg-gray-800 border-2 border-transparent",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 border-2 border-transparent",
    outline: "border-2 border-black text-black bg-transparent hover:bg-white/20 active:bg-white/60",
  };

  const baseStyle =
  "box-border cursor-pointer font-medium rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    // "cursor-pointer font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyle = sizeClasses[responsiveSize as keyof typeof sizeClasses];
  const variantStyle = variantClasses[variant];

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;