"use client";

import { InputHTMLAttributes, forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, indeterminate = false, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "group inline-flex items-center gap-3",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-checked={indeterminate ? "mixed" : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(`
              w-5 h-5
              bg-[var(--ui-surface)]
              border-2 border-black
              rounded-[var(--ui-radius-sm)]
              shadow-[var(--ui-shadow-sm)]
              transition-all duration-150 ease-out
              group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]
              group-hover:shadow-[var(--ui-shadow)]
              peer-checked:bg-[var(--ui-accent)]
              peer-focus-visible:ring-2 peer-focus-visible:ring-black/20
              peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            `, indeterminate && "bg-[var(--ui-accent)]")}
          />
          <svg
            className={cn(`
              absolute top-0.5 left-0.5
              w-4 h-4
              stroke-black stroke-[2.5]
              opacity-0
              peer-checked:opacity-100
              transition-opacity duration-150
              pointer-events-none
            `, indeterminate && "opacity-100")}
            viewBox="0 0 24 24"
            fill="none"
          >
            {indeterminate ? <path d="M6 12h12" /> : <polyline points="20 6 9 17 4 12" />}
          </svg>
        </div>
        {label && (
          <span className="text-sm font-medium select-none">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
