import { SVGAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className = "", size = "md", ...props }, ref) => {
    const sizes = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-7 w-7",
      xl: "h-10 w-10",
    };

    return (
      <svg
        ref={ref}
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        className={cn("animate-spin", sizes[size], className)}
        fill="none"
        {...props}
      >
        <path
          d="M12 3a9 9 0 1 1-8.49 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
        />
        <path d="M12 3h6v6" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
