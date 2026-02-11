import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "ghost"
    | "outline"
    | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      relative
      inline-flex items-center justify-center gap-2
      font-bold uppercase tracking-wide
      border-2 border-black
      transition-all duration-100 ease-out
      cursor-pointer
      select-none
      active:translate-y-[2px] active:translate-x-[2px]
      active:shadow-none
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:translate-x-0 disabled:hover:translate-y-0
      disabled:active:translate-x-0 disabled:active:translate-y-0
    `;

    const variants = {
      default:
        "bg-white text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      primary:
        "bg-[#ffde00] text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      secondary:
        "bg-[#06b6d4] text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      danger:
        "bg-[#ef4444] text-white shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      success:
        "bg-[#22c55e] text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      neutral:
        "bg-gray-900 text-white shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#ffde00] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      ghost:
        "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100 hover:border-black/20",
      outline:
        "bg-transparent text-black shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white hover:translate-x-[-2px] hover:translate-y-[-2px]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-md";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
