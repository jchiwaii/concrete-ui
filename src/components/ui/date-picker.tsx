"use client";

import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { calculatePosition } from "@/lib/positioning";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Calendar } from "./calendar";

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date;
  onValueChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  formatDate?: (date: Date) => string;
}

const defaultFormat = (date: Date) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className = "", value, onValueChange, placeholder = "Pick a date", disabled = false, formatDate = defaultFormat, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useClickOutside(contentRef, () => open && setOpen(false));

    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;
      setPosition(
        calculatePosition(
          triggerRef.current.getBoundingClientRect(),
          contentRef.current.getBoundingClientRect(),
          "bottom"
        )
      );
    }, [open]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((next) => !next)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-md border-2 border-black bg-white px-4 py-2.5 text-left font-semibold shadow-[4px_4px_0_0_#000] transition-all duration-100",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className={cn(!value && "text-gray-400")}>{value ? formatDate(value) : placeholder}</span>
          <span aria-hidden="true">▦</span>
        </button>
        {open && typeof window !== "undefined" &&
          createPortal(
            <div ref={contentRef} className="fixed z-50 animate-brutal-slide-down" style={{ top: position.top, left: position.left }}>
              <Calendar
                selected={value}
                onSelect={(date) => {
                  onValueChange?.(date);
                  setOpen(false);
                }}
              />
            </div>,
            document.body
          )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
