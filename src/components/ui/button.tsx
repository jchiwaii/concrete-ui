import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-bold uppercase tracking-wider
      border-4 border-black
      transition-all duration-100 ease-out
      hover:translate-x-[-4px] hover:translate-y-[-4px]
      hover:shadow-[8px_8px_0_0_#000]
      active:translate-x-0 active:translate-y-0
      active:shadow-none
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:translate-x-0 disabled:hover:translate-y-0
      disabled:hover:shadow-[4px_4px_0_0_#000]
    `;

    const variants = {
      default: "bg-white text-black shadow-[4px_4px_0_0_#000]",
      primary: "bg-[#FFFF00] text-black shadow-[4px_4px_0_0_#000]",
      secondary: "bg-[#00FFFF] text-black shadow-[4px_4px_0_0_#000]",
      danger: "bg-[#FF0000] text-white shadow-[4px_4px_0_0_#000]",
      ghost:
        "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100 hover:shadow-none",
      outline:
        "bg-transparent text-black shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
