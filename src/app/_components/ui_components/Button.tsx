import React from "react";
import clsx from "clsx";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  ariaLabel?: string;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  isLoading = false,
  ariaLabel,
}) => {
  const baseStyles =
    //   inline-flex items-center justify-center
    "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={ariaLabel}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
