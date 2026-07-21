"use client";

import {
  HTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  searchable?: boolean;
  rounded?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      placeholder = "Select option...",
      options,
      disabled = false,
      searchable = false,
      rounded = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownPosition = useOverlayPosition(
      triggerRef,
      dropdownRef,
      isOpen,
      "bottom"
    );

    useClickOutside([dropdownRef, triggerRef], () => {
      if (isOpen) setIsOpen(false);
    }, isOpen);

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    useEffect(() => {
      if (selectedIndex > filteredOptions.length - 1) {
        setSelectedIndex(Math.max(filteredOptions.length - 1, 0));
      }
    }, [filteredOptions.length, selectedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
              } else {
                e.preventDefault();
                const option = filteredOptions[selectedIndex];
                if (option && !option.disabled) {
              onChange?.(option.value);
              setIsOpen(false);
            }
          }
          break;

        case "Escape":
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
          }
          break;

        case "ArrowDown":
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          } else {
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;

        case "ArrowUp":
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          } else {
            e.preventDefault();
            setSelectedIndex((prev) =>
              filteredOptions.length === 0
                ? 0
                : prev > 0
                ? prev - 1
                : filteredOptions.length - 1
            );
          }
          break;
      }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredOptions.length === 0
            ? 0
            : prev > 0
            ? prev - 1
            : filteredOptions.length - 1
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const option = filteredOptions[selectedIndex];
        if (option && !option.disabled) {
          handleSelect(option);
        }
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm("");
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-[var(--ui-radius-sm)]";

    return (
      <div ref={ref} className={`relative inline-block w-full ${className}`} {...props}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full
            px-4 py-2.5
            bg-[var(--ui-surface)]
            border-2 border-black
            shadow-[var(--ui-shadow)]
            transition-all duration-100 ease-out
            font-semibold
            text-left
            flex items-center justify-between gap-2
            ${radiusStyles}
            ${
              !disabled
                ? "hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
            ${isOpen ? "-translate-x-px -translate-y-px shadow-[var(--ui-shadow-lg)]" : ""}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`truncate ${!selectedOption ? "text-[var(--ui-muted)]" : "text-black"}`}>
            {displayValue}
          </span>
          <svg
            className={`w-4 h-4 text-[var(--ui-muted)] transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              className={`
                z-50
                min-w-[200px]
                max-h-[280px]
                overflow-y-auto
                bg-[var(--ui-surface)]
                border-2 border-black
                shadow-[var(--ui-shadow-lg)]
                rounded-[var(--ui-radius-sm)]
                animate-brutal-slide-down
              `}
              style={{
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: triggerRef.current?.offsetWidth,
              }}
              role="listbox"
            >
              {searchable && (
                <div className="p-2 border-b-2 border-black">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-sm border-2 border-black rounded-[var(--ui-radius-sm)] outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-[var(--ui-muted)]">
                  No options found
                </div>
              ) : (
                <div className="py-1">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      className={`
                        px-4 py-2.5
                        cursor-pointer
                        text-sm font-medium
                        transition-all duration-100
                        ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                        ${
                          index === selectedIndex && !option.disabled
                            ? "bg-[var(--ui-accent)]"
                            : option.value === value
                            ? "bg-[var(--ui-surface-muted)]"
                            : "hover:bg-[var(--ui-surface-muted)]"
                        }
                      `}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="option"
                      aria-selected={option.value === value}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>,
            document.body
          )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
