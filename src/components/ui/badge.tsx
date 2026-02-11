import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "neutral";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      rounded = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-bold uppercase tracking-wide
      border-2 border-black
      shadow-[3px_3px_0_0_#000]
      whitespace-nowrap
    `;

    const variants = {
      default: "bg-white text-black",
      primary: "bg-[#ffde00] text-black",
      secondary: "bg-[#06b6d4] text-black",
      danger: "bg-[#ef4444] text-white",
      success: "bg-[#22c55e] text-black",
      warning: "bg-[#f97316] text-black",
      info: "bg-[#3b82f6] text-white",
      neutral: "bg-gray-900 text-white",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-[10px]",
      md: "px-2.5 py-1 text-xs",
      lg: "px-3 py-1.5 text-sm",
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-md";

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusStyles} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
