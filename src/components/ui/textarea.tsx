import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error = false, ...props }, ref) => {
    const baseStyles =
      "min-h-28 w-full resize-y rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] px-3.5 py-3 text-[15px] font-medium shadow-[var(--ui-shadow)] outline-none transition-[transform,box-shadow,border-color] duration-150 ease-out placeholder:font-normal placeholder:text-gray-400 focus:-translate-x-px focus:-translate-y-px focus:shadow-[var(--ui-shadow-md)] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50";

    const errorStyles = error
      ? "border-[var(--ui-danger)] shadow-[3px_3px_0_var(--ui-danger)] focus:shadow-[4px_4px_0_var(--ui-danger)]"
      : "";

    return (
      <textarea
        ref={ref}
        aria-invalid={error || props["aria-invalid"] || undefined}
        className={cn(baseStyles, errorStyles, className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
