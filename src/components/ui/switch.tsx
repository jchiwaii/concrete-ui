"use client";

import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className = "",
      checked,
      defaultChecked = false,
      onCheckedChange,
      label,
      size = "md",
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const currentChecked = checked ?? internalChecked;

    const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const nextChecked = !currentChecked;
      if (checked === undefined) setInternalChecked(nextChecked);
      onCheckedChange?.(nextChecked);
      onClick?.(event);
    };

    const sizes = {
      sm: { track: "h-7 w-12", thumb: "h-5 w-5", active: "translate-x-5" },
      md: { track: "h-9 w-16", thumb: "h-7 w-7", active: "translate-x-7" },
      lg: { track: "h-11 w-20", thumb: "h-9 w-9", active: "translate-x-9" },
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={currentChecked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "inline-flex items-center gap-3 rounded-[var(--ui-radius-sm)] text-left focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-black",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative rounded-full border-2 border-black shadow-[var(--ui-shadow)] transition-all duration-100 ease-out",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--ui-shadow-md)]",
            currentChecked ? "bg-[var(--ui-success)]" : "bg-[var(--ui-surface)]",
            sizes[size].track
          )}
        >
          <span
            className={cn(
              "absolute left-1 top-1 rounded-full border-2 border-black bg-[var(--ui-surface)] transition-transform duration-100 ease-out",
              sizes[size].thumb,
              currentChecked && sizes[size].active
            )}
          />
        </span>
        {label && <span className="text-sm font-medium">{label}</span>}
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
