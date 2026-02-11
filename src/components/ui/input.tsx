import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  rounded?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, rounded = false, ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-2.5
      text-base font-medium
      bg-white
      border-2 border-black
      shadow-[4px_4px_0_0_#000]
      outline-none
      transition-all duration-100 ease-out
      placeholder:text-gray-400
      focus:translate-x-[-2px] focus:translate-y-[-2px]
      focus:shadow-[6px_6px_0_0_#000]
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:bg-gray-100
    `;

    const errorStyles = error
      ? "border-[#ef4444] shadow-[4px_4px_0_0_#ef4444] focus:shadow-[6px_6px_0_0_#ef4444]"
      : "";

    const radiusStyles = rounded ? "rounded-full" : "rounded-md";

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${radiusStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
