import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className = "", orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex overflow-hidden rounded-[var(--ui-radius)] border-2 border-black shadow-[var(--ui-shadow)] [&_button]:rounded-none [&_button]:border-0 [&_button]:shadow-none",
        orientation === "horizontal"
          ? "flex-row [&_button]:border-r-2 [&_button]:border-black [&_button:last-child]:border-r-0"
          : "flex-col [&_button]:border-b-2 [&_button]:border-black [&_button:last-child]:border-b-0",
        className
      )}
      {...props}
    />
  )
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
