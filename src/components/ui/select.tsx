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
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      placeholder = "SELECT OPTION",
      options,
      disabled = false,
      searchable = false,
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

    // Close dropdown when clicking outside
    useClickOutside(dropdownRef, () => {
      if (isOpen) setIsOpen(false);
    });

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    // Get selected option label
    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;

    // Calculate dropdown position
    useEffect(() => {
      if (isOpen && triggerRef.current && dropdownRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const position = calculatePosition(triggerRect, dropdownRect, "bottom");
        setDropdownPosition(position);
      }
    }, [isOpen]);

    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Keyboard navigation
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

    const baseStyles = `
      relative
      inline-block
      w-full
      font-bold
      uppercase
      tracking-wider
    `;

    const triggerStyles = `
      w-full
      px-6 py-3
      bg-white
      border-4 border-black
      shadow-[4px_4px_0_0_#000]
      transition-all duration-100 ease-out
      font-bold uppercase tracking-wider
      text-left
      flex items-center justify-between
      ${
        !disabled
          ? "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      }
      ${isOpen ? "translate-x-[-2px] translate-y-[-2px] shadow-[6px_6px_0_0_#000]" : ""}
    `;

    const dropdownStyles = `
      absolute
      z-50
      w-full
      min-w-[200px]
      max-h-[300px]
      overflow-y-auto
      bg-white
      border-4 border-black
      shadow-[6px_6px_0_0_#000]
      animate-brutal-slide-down
    `;

    const optionStyles = (index: number, option: SelectOption) => `
      px-6 py-3
      border-b-4 border-black last:border-b-0
      cursor-pointer
      font-bold uppercase tracking-wider
      transition-all duration-100 ease-out
      ${option.disabled ? "opacity-50 cursor-not-allowed bg-gray-200" : ""}
      ${
        index === selectedIndex && !option.disabled
          ? "bg-[#FFFF00] text-black"
          : "bg-white text-black hover:bg-gray-100"
      }
      ${option.value === value ? "bg-[#00FFFF]" : ""}
    `;

    const searchStyles = `
      w-full
      px-6 py-3
      border-b-4 border-black
      outline-none
      font-bold uppercase tracking-wider
      placeholder:text-gray-400 placeholder:uppercase
    `;

    return (
      <div ref={ref} className={`${baseStyles} ${className}`} {...props}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={triggerStyles}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate">{displayValue}</span>
          <span className="ml-2 transform transition-transform duration-100">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {isOpen &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              className={dropdownStyles}
              style={{
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: triggerRef.current?.offsetWidth,
              }}
              role="listbox"
              aria-label="Select options"
            >
              {searchable && (
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="SEARCH..."
                  className={searchStyles}
                />
              )}

              {filteredOptions.length === 0 ? (
                <div className="px-6 py-3 text-gray-400 uppercase">
                  NO OPTIONS FOUND
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={optionStyles(index, option)}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    {option.label}
                  </div>
                ))
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
