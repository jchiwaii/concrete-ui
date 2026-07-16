"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { className = "", checked = false, onChange, label, disabled, ...props },
    ref
  ) => {
    return (
      <label
        className={`inline-flex items-center gap-3 cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          className={`
            relative w-16 h-9
            border-2 border-black
            shadow-[var(--ui-shadow)]
            transition-all duration-100 ease-out
            hover:-translate-x-px hover:-translate-y-px
            hover:shadow-[var(--ui-shadow-md)]
            disabled:hover:translate-x-0 disabled:hover:translate-y-0
            disabled:hover:shadow-[var(--ui-shadow)]
            ${checked ? "bg-[var(--ui-success)]" : "bg-[var(--ui-surface)]"}
          `}
          {...props}
        >
          <span
            className={`
              absolute top-0.5 w-6 h-6
              bg-black
              transition-all duration-100 ease-out
              ${checked ? "left-[calc(100%-26px)]" : "left-0.5"}
            `}
          />
        </button>
        {label && (
          <span className="text-base font-semibold">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
