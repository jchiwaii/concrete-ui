import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-bold uppercase tracking-wider
      border-4 border-black
      shadow-[3px_3px_0_0_#000]
    `;

    const variants = {
      default: "bg-white text-black",
      primary: "bg-[#FFFF00] text-black",
      secondary: "bg-[#00FFFF] text-black",
      danger: "bg-[#FF0000] text-white",
      success: "bg-[#00FF00] text-black",
      warning: "bg-[#FF6600] text-white",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
