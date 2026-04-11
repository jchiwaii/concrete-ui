"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className = "",
      checked = false,
      onCheckedChange,
      label,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: { track: "h-7 w-12", thumb: "h-5 w-5", active: "translate-x-5" },
      md: { track: "h-9 w-16", thumb: "h-7 w-7", active: "translate-x-7" },
      lg: { track: "h-11 w-20", thumb: "h-9 w-9", active: "translate-x-9" },
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-3",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          className={cn(
            "relative rounded-full border-2 border-black shadow-[3px_3px_0_0_#000] transition-all duration-100 ease-out",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000]",
            checked ? "bg-[#22c55e]" : "bg-white",
            sizes[size].track
          )}
          {...props}
        >
          <span
            className={cn(
              "absolute left-1 top-1 rounded-full border-2 border-black bg-white transition-transform duration-100 ease-out",
              sizes[size].thumb,
              checked && sizes[size].active
            )}
          />
        </button>
        {label && <span className="text-sm font-bold uppercase tracking-wide">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
