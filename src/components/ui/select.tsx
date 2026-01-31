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
import { calculatePosition } from "@/lib/positioning";

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
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
    });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useClickOutside(dropdownRef, () => {
      if (isOpen) setIsOpen(false);
    });

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;

    useEffect(() => {
      if (isOpen && triggerRef.current && dropdownRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const position = calculatePosition(triggerRect, dropdownRect, "bottom");
        setDropdownPosition(position);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          } else if (!searchable) {
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
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }
          break;
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm("");
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-lg";

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
            bg-white
            border-2 border-black
            shadow-[3px_3px_0_0_#000]
            transition-all duration-150 ease-out
            font-medium
            text-left
            flex items-center justify-between gap-2
            ${radiusStyles}
            ${
              !disabled
                ? "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
            ${isOpen ? "translate-x-[-2px] translate-y-[-2px] shadow-[5px_5px_0_0_#000]" : ""}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`truncate ${!selectedOption ? "text-gray-400" : "text-black"}`}>
            {displayValue}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
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
                bg-white
                border-2 border-black
                shadow-[4px_4px_0_0_#000]
                rounded-lg
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
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-sm border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">
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
                            ? "bg-[#ffde00]"
                            : option.value === value
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
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
