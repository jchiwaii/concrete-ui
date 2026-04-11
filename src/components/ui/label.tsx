import { LabelHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required = false, error = false, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide",
        error ? "text-[#ef4444]" : "text-black",
        className
      )}
      {...props}
    >
      {children}
      {required && <span aria-hidden="true">*</span>}
    </label>
  )
);

Label.displayName = "Label";

export { Label };
