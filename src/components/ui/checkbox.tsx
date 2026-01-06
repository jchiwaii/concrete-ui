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
              w-7 h-7
              bg-white
              border-4 border-black
              shadow-[3px_3px_0_0_#000]
              transition-all duration-100 ease-out
              group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]
              group-hover:shadow-[5px_5px_0_0_#000]
              peer-checked:bg-[#FFFF00]
              peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            `}
          />
          <svg
            className={`
              absolute top-1 left-1
              w-5 h-5
              stroke-black stroke-[3]
              opacity-0
              peer-checked:opacity-100
              transition-opacity duration-100
            `}
            viewBox="0 0 24 24"
            fill="none"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <span className="text-base font-bold uppercase tracking-wide">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
