"use client";

import {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className = "",
      value,
      onValueChange,
      options,
      placeholder = "Select option...",
      searchPlaceholder = "Search...",
      emptyMessage = "No options found",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const position = useOverlayPosition(triggerRef, contentRef, open, "bottom");

    const selected = options.find((option) => option.value === value);
    const filtered = useMemo(
      () =>
        options.filter((option) =>
          `${option.label} ${option.description ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
      [options, search]
    );

    useClickOutside([contentRef, triggerRef], () => open && setOpen(false), open);

    useEffect(() => {
      inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
      if (selectedIndex > filtered.length - 1) {
        setSelectedIndex(Math.max(filtered.length - 1, 0));
      }
    }, [filtered.length, selectedIndex]);

    const select = (option: ComboboxOption) => {
      if (option.disabled) return;
      onValueChange?.(option.value);
      setOpen(false);
      setSearch("");
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;
      if (!open && ["Enter", " ", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((index) => (index + 1) % Math.max(filtered.length, 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) => (index <= 0 ? filtered.length - 1 : index - 1));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const option = filtered[selectedIndex];
        if (option) select(option);
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} onKeyDown={onKeyDown} {...props}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((next) => !next)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-md border-2 border-black bg-white px-4 py-2.5 text-left font-semibold shadow-[4px_4px_0_0_#000] transition-all duration-100",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className={cn("truncate", !selected && "text-gray-400")}>{selected?.label ?? placeholder}</span>
          <span className={cn("text-lg leading-none transition-transform", open && "rotate-180")}>⌄</span>
        </button>

        {open && typeof window !== "undefined" &&
          createPortal(
            <div
              ref={contentRef}
              role="listbox"
              className="fixed z-50 max-h-80 min-w-64 overflow-hidden rounded-md border-2 border-black bg-white shadow-[6px_6px_0_0_#000] animate-brutal-slide-down"
              style={{ top: position.top, left: position.left, width: triggerRef.current?.offsetWidth }}
            >
              <div className="border-b-2 border-black p-2">
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border-2 border-black px-3 py-2 text-sm font-semibold outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="max-h-64 overflow-y-auto brutal-scroll-area">
                {filtered.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm font-semibold text-gray-500">{emptyMessage}</div>
                ) : (
                  filtered.map((option, index) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={option.value === value}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => select(option)}
                      className={cn(
                        "cursor-pointer border-b-2 border-black px-4 py-3 last:border-b-0",
                        index === selectedIndex && "bg-[#ffde00]",
                        option.value === value && "font-bold",
                        option.disabled && "cursor-not-allowed bg-gray-100 opacity-50"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold uppercase tracking-wide">{option.label}</span>
                        {option.value === value && <span aria-hidden="true">✓</span>}
                      </div>
                      {option.description && <p className="mt-1 text-xs font-medium text-gray-600">{option.description}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

Combobox.displayName = "Combobox";

export { Combobox };
