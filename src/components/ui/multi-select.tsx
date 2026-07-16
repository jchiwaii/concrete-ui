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

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className = "",
      value = [],
      onValueChange,
      options,
      placeholder = "Select options...",
      searchPlaceholder = "Search options...",
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

    const selectedOptions = options.filter((option) => value.includes(option.value));
    const filtered = useMemo(
      () => options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
      [options, search]
    );

    useClickOutside([contentRef, triggerRef], () => open && setOpen(false), open);

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
      if (selectedIndex > filtered.length - 1) {
        setSelectedIndex(Math.max(filtered.length - 1, 0));
      }
    }, [filtered.length, selectedIndex]);

    const toggle = (option: MultiSelectOption) => {
      if (option.disabled) return;
      const next = value.includes(option.value)
        ? value.filter((item) => item !== option.value)
        : [...value, option.value];
      onValueChange?.(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
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
        setSelectedIndex((index) =>
          index < filtered.length - 1 ? index + 1 : 0
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) =>
          filtered.length === 0 ? 0 : index <= 0 ? filtered.length - 1 : index - 1
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const option = filtered[selectedIndex];
        if (option) toggle(option);
      }

      if (event.key === "Backspace" && search.length === 0 && value.length > 0) {
        onValueChange?.(value.slice(0, -1));
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} onKeyDown={handleKeyDown} {...props}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((next) => !next)}
          className={cn(
            "flex min-h-11 w-full items-center justify-between gap-3 rounded-md border-2 border-black bg-[var(--ui-surface)] px-3 py-2 text-left shadow-[var(--ui-shadow)] transition-all duration-100",
            !disabled && "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--ui-shadow-md)]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className="flex flex-1 flex-wrap gap-2">
            {selectedOptions.length === 0 ? (
              <span className="px-1 text-sm font-semibold text-gray-400">{placeholder}</span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md border-2 border-black bg-[var(--ui-accent)] px-2 py-1 text-xs font-semibold"
                >
                  {option.label}
                </span>
              ))
            )}
          </span>
          <span className={cn("text-lg leading-none transition-transform", open && "rotate-180")}>⌄</span>
        </button>

        {open && typeof window !== "undefined" &&
          createPortal(
            <div
              ref={contentRef}
              role="listbox"
              aria-multiselectable="true"
              className="fixed z-50 max-h-80 min-w-64 overflow-hidden rounded-md border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow-lg)] animate-brutal-slide-down"
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
                {filtered.map((option, index) => {
                  const selected = value.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={selected}
                      onClick={() => toggle(option)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 border-b-2 border-black px-4 py-3 last:border-b-0 hover:bg-[var(--ui-accent-soft)]",
                        selectedIndex === index && "bg-[var(--ui-accent-soft)]",
                        selected && "bg-[var(--ui-accent)]",
                        option.disabled && "cursor-not-allowed bg-gray-100 opacity-50"
                      )}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-black bg-[var(--ui-surface)] text-xs font-bold shadow-[var(--ui-shadow-sm)]">
                        {selected ? "✓" : ""}
                      </span>
                      <span className="text-sm font-semibold">{option.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
