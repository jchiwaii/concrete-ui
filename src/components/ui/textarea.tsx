import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error = false, ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3
      text-base font-medium
      bg-white
      border-4 border-black
      shadow-[4px_4px_0_0_#000]
      outline-none
      transition-all duration-100 ease-out
      placeholder:text-gray-400 placeholder:uppercase
      focus:translate-x-[-2px] focus:translate-y-[-2px]
      focus:shadow-[6px_6px_0_0_#000]
      disabled:opacity-50 disabled:cursor-not-allowed
      resize-none
      min-h-[120px]
    `;

    const errorStyles = error
      ? "border-[#FF0000] shadow-[4px_4px_0_0_#FF0000] focus:shadow-[6px_6px_0_0_#FF0000]"
      : "";

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
