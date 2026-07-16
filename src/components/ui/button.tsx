import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "outline"
  | "neutral";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  loading?: boolean;
}

const baseStyles =
  "relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap border-2 border-black font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background-color,color] duration-150 ease-out focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-black disabled:pointer-events-none disabled:opacity-45";

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-[var(--ui-surface)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-[var(--ui-shadow-xs)]",
  primary:
    "bg-[var(--ui-accent)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-[var(--ui-shadow-xs)]",
  secondary:
    "bg-[var(--ui-info)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-[var(--ui-shadow-xs)]",
  danger:
    "bg-[var(--ui-danger)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-[var(--ui-shadow-xs)]",
  success:
    "bg-[var(--ui-success)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-[var(--ui-shadow-xs)]",
  neutral:
    "bg-[var(--ui-ink)] text-white shadow-[3px_3px_0_var(--ui-accent)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--ui-accent)] active:translate-x-px active:translate-y-px active:shadow-none",
  ghost:
    "border-transparent bg-transparent text-black shadow-none hover:border-black/20 hover:bg-black/5 active:bg-black/10",
  outline:
    "bg-[var(--ui-surface)] text-black shadow-[var(--ui-shadow)] hover:-translate-x-px hover:-translate-y-px hover:bg-black hover:text-white hover:shadow-[var(--ui-shadow-md)] active:translate-x-px active:translate-y-px active:shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
  xl: "h-14 px-6 text-base",
};

export function buttonStyles({
  variant = "default",
  size = "md",
  rounded = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  className?: string;
} = {}) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    rounded ? "rounded-full" : "rounded-[var(--ui-radius)]",
    className
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      rounded = false,
      loading = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={buttonStyles({ variant, size, rounded, className })}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
