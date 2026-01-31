"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-center gap-3 cursor-pointer group ${className}`}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`
              w-5 h-5
              bg-white
              border-2 border-black
              rounded-md
              shadow-[2px_2px_0_0_#000]
              transition-all duration-150 ease-out
              group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]
              group-hover:shadow-[3px_3px_0_0_#000]
              peer-checked:bg-[#ffde00]
              peer-focus-visible:ring-2 peer-focus-visible:ring-black/20
              peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            `}
          />
          <svg
            className={`
              absolute top-0.5 left-0.5
              w-4 h-4
              stroke-black stroke-[2.5]
              opacity-0
              peer-checked:opacity-100
              transition-opacity duration-150
              pointer-events-none
            `}
            viewBox="0 0 24 24"
            fill="none"
          >
            <polyline points="20 6 9 17 4 12" />
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
