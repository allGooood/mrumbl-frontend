import React, { useEffect } from "react";
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
    large: "px-6 py-3 text-lg",
    medium: "px-4 py-2 text-base",
    small: "px-3 py-1.5 text-sm",
    xsmall: "px-2 py-1 text-xs",
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
  };

  const baseStyle =
    "cursor-pointer font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

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