import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  rounded?: boolean;
  sizeVariant?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, rounded = false, sizeVariant = "md", ...props }, ref) => {
    const baseStyles =
      "w-full border-2 border-black bg-[var(--ui-surface)] font-medium shadow-[var(--ui-shadow)] outline-none transition-[transform,box-shadow,border-color] duration-150 ease-out placeholder:font-normal placeholder:text-[var(--ui-muted)] focus:-translate-x-px focus:-translate-y-px focus:shadow-[var(--ui-shadow-md)] disabled:cursor-not-allowed disabled:bg-[var(--ui-surface-muted)] disabled:text-[var(--ui-muted)] disabled:opacity-70";

    const sizeStyles = {
      sm: "h-[34px] px-3 text-[13px]",
      md: "h-10 px-3.5 text-sm",
      lg: "h-11 px-4 text-[15px]",
    };

    const errorStyles = error
      ? "border-[var(--ui-danger)] shadow-[3px_3px_0_var(--ui-danger)] focus:shadow-[4px_4px_0_var(--ui-danger)]"
      : "";

    const radiusStyles = rounded ? "rounded-full" : "rounded-[var(--ui-radius)]";

    return (
      <input
        ref={ref}
        aria-invalid={error || props["aria-invalid"] || undefined}
        className={cn(baseStyles, sizeStyles[sizeVariant], errorStyles, radiusStyles, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
