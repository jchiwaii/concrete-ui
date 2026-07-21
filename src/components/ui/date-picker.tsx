"use client";

import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";
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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const position = useOverlayPosition(triggerRef, contentRef, open, "bottom");

    useClickOutside([contentRef, triggerRef], () => open && setOpen(false), open);

    useEffect(() => {
      if (!open) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
        }
      };

      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((next) => !next)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-surface)] px-4 py-2.5 text-left font-semibold shadow-[var(--ui-shadow)] transition-all duration-100",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--ui-shadow-md)]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className={cn(!value && "text-[var(--ui-muted)]")}>{value ? formatDate(value) : placeholder}</span>
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
