"use client";

import { HTMLAttributes, forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(a?: Date, b?: Date) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(date: Date) {
  return isSameDay(date, new Date());
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  selected?: Date;
  onSelect?: (date: Date) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
  disabledDate?: (date: Date) => boolean;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ className = "", selected, onSelect, month, onMonthChange, disabledDate, ...props }, ref) => {
    const [internalMonth, setInternalMonth] = useState(month ?? selected ?? new Date());
    const visibleMonth = month ?? internalMonth;

    const setMonth = (next: Date) => {
      setInternalMonth(next);
      onMonthChange?.(next);
    };

    const days = useMemo(() => {
      const year = visibleMonth.getFullYear();
      const monthIndex = visibleMonth.getMonth();
      const firstDay = new Date(year, monthIndex, 1);
      const startOffset = firstDay.getDay();
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const cells: Array<Date | null> = Array.from({ length: startOffset }, () => null);
      for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, monthIndex, day));
      while (cells.length % 7 !== 0) cells.push(null);
      return cells;
    }, [visibleMonth]);

    return (
      <div ref={ref} className={cn("w-full max-w-sm rounded-lg border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]", className)} {...props}>
        <div className="flex items-center justify-between border-b-2 border-black bg-[var(--ui-accent)] p-3">
          <button
            type="button"
            onClick={() => setMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-black bg-[var(--ui-surface)] text-lg font-bold shadow-[var(--ui-shadow-sm)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="text-sm font-semibold tracking-wide">{monthLabel(visibleMonth)}</div>
          <button
            type="button"
            onClick={() => setMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-black bg-[var(--ui-surface)] text-lg font-bold shadow-[var(--ui-shadow-sm)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 border-b-2 border-black bg-gray-100">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-[11px] font-semibold tracking-widest text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 p-2">
          {days.map((date, index) => {
            const disabled = !date || disabledDate?.(date);
            const active = isSameDay(date ?? undefined, selected);
            const today = date ? isToday(date) : false;
            return (
              <button
                key={date?.toISOString() ?? `empty-${index}`}
                type="button"
                disabled={disabled}
                onClick={() => date && onSelect?.(date)}
                className={cn(
                  "m-0.5 flex h-10 items-center justify-center rounded-md border-2 text-sm font-bold transition-all duration-100",
                  date ? "border-black" : "border-transparent",
                  active ? "bg-black text-white shadow-[2px_2px_0_var(--ui-accent)]" : today ? "bg-[var(--ui-info)] text-black" : "bg-[var(--ui-surface)] text-black hover:bg-[var(--ui-accent-soft)]",
                  disabled && "cursor-not-allowed opacity-30 hover:bg-[var(--ui-surface)]"
                )}
              >
                {date?.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };
