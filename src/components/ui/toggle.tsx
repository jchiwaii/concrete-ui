"use client";

import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className = "",
      checked,
      defaultChecked = false,
      onChange,
      onClick,
      label,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const currentChecked = checked ?? internalChecked;

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={currentChecked}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || disabled) return;
          const nextChecked = !currentChecked;
          if (checked === undefined) setInternalChecked(nextChecked);
          onChange?.(nextChecked);
        }}
        className={cn(
          "inline-flex items-center gap-3 rounded-[var(--ui-radius-sm)] text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-black",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative h-9 w-16 shrink-0 rounded-full border-2 border-black shadow-[var(--ui-shadow)] transition-[transform,box-shadow,background-color] duration-150",
            !disabled && "hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)]",
            currentChecked ? "bg-[var(--ui-success)]" : "bg-[var(--ui-surface)]"
          )}
        >
          <span
            className={cn(
              "absolute left-1 top-1 h-7 w-7 rounded-full border-2 border-black bg-[var(--ui-surface)] transition-transform duration-150",
              currentChecked && "translate-x-7"
            )}
          />
        </span>
        {label && <span className="text-sm font-medium">{label}</span>}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
