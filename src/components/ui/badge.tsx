import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

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
      rounded = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap border-2 border-black font-semibold tracking-[0.01em] shadow-[var(--ui-shadow-sm)]";

    const variants = {
      default: "bg-[var(--ui-surface)] text-black",
      primary: "bg-[var(--ui-accent)] text-black",
      secondary: "bg-[var(--ui-info)] text-black",
      danger: "bg-[var(--ui-danger)] text-white",
      success: "bg-[var(--ui-success)] text-black",
      warning: "bg-[var(--ui-warning)] text-black",
      info: "bg-[var(--concrete-blue)] text-white",
      neutral: "bg-gray-900 text-white",
    };

    const sizes = {
      sm: "px-2.5 py-0.5 text-[10px]",
      md: "px-3 py-1 text-xs",
      lg: "px-3.5 py-1.5 text-[13px]",
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-[var(--ui-radius-sm)]";

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          radiusStyles,
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
