import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {}

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full overflow-hidden rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:shadow-[var(--ui-shadow-lg)]",
        "[&_input]:border-0 [&_input]:shadow-none [&_input]:rounded-none [&_input]:focus:translate-x-0 [&_input]:focus:translate-y-0 [&_input]:focus:shadow-none",
        className
      )}
      {...props}
    />
  )
);

InputGroup.displayName = "InputGroup";

export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {}

const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center border-r-2 border-black bg-[var(--ui-surface-muted)] px-3 text-sm font-semibold text-[var(--ui-ink-soft)] last:border-l-2 last:border-r-0",
        className
      )}
      {...props}
    />
  )
);

InputGroupAddon.displayName = "InputGroupAddon";

export { InputGroup, InputGroupAddon };
