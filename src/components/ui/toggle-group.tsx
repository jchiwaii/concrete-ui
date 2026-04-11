"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
} from "react";
import { cn } from "@/lib/utils";

type ToggleGroupType = "single" | "multiple";

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[] | undefined;
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(undefined);

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
  type?: ToggleGroupType;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  children: ReactNode;
}

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className = "", type = "single", value, onValueChange, disabled = false, children, ...props }, ref) => (
    <ToggleGroupContext.Provider value={{ type, value, onValueChange, disabled }}>
      <div
        ref={ref}
        role="group"
        className={cn("inline-flex flex-wrap overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]", className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
);

ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className = "", value, disabled, children, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);
    if (!context) throw new Error("ToggleGroupItem must be used within ToggleGroup");

    const isPressed =
      context.type === "multiple"
        ? Array.isArray(context.value) && context.value.includes(value)
        : context.value === value;
    const isDisabled = context.disabled || disabled;

    const handleClick = () => {
      if (isDisabled) return;

      if (context.type === "multiple") {
        const current = Array.isArray(context.value) ? context.value : [];
        const next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        context.onValueChange?.(next);
        return;
      }

      context.onValueChange?.(isPressed ? "" : value);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          "border-r-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wide last:border-r-0",
          "transition-colors duration-100 focus:outline-none focus-visible:bg-[#fff4ab]",
          isPressed ? "bg-[#ffde00] text-black" : "bg-white text-black hover:bg-gray-100",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
