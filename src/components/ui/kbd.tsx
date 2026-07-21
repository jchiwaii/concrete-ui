import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className = "", size = "md", ...props }, ref) => {
    const sizes = {
      sm: "px-1.5 py-0.5 text-[10px]",
      md: "px-2 py-1 text-xs",
      lg: "px-2.5 py-1.5 text-sm",
    };

    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-surface)] font-mono font-semibold leading-none shadow-[var(--ui-shadow-sm)]",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Kbd.displayName = "Kbd";

export { Kbd };
