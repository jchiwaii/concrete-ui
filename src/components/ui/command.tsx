"use client";

import {
  HTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onClose?: () => void;
}

const CommandContext = createContext<CommandContextValue | undefined>(
  undefined
);

export interface CommandProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shortcut?: boolean;
}

const Command = forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      children,
      open: controlledOpen,
      onOpenChange,
      shortcut = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = onOpenChange || setInternalOpen;

    const onClose = useCallback(() => {
      setIsOpen(false);
      setSearch("");
      setSelectedIndex(0);
    }, [setIsOpen]);

    // Global keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
      if (!shortcut) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [shortcut, isOpen, setIsOpen]);

    // Lock body scroll when open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    if (!isOpen || typeof window === "undefined") return null;

    return createPortal(
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-[9998] animate-brutal-slide-down"
          onClick={onClose}
        />

        {/* Command Panel */}
        <div
          className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            z-[9999]
            w-full
            max-w-2xl
            mx-4
          "
        >
          <CommandContext.Provider
            value={{ search, setSearch, selectedIndex, setSelectedIndex, onClose }}
          >
            <div
              ref={ref}
              className={`
                bg-white
                border-6 border-black
                shadow-[8px_8px_0_0_#000]
                animate-brutal-slide-up
                ${className}
              `}
              role="combobox"
              aria-expanded={isOpen}
              {...props}
            >
              {children}
            </div>
          </CommandContext.Provider>
        </div>
      </>,
      document.body
    );
  }
);

Command.displayName = "Command";

export interface CommandInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(CommandContext);
    if (!context) {
      throw new Error("CommandInput must be used within Command");
    }

    const { search, setSearch, onClose } = context;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`
          w-full
          px-6 py-4
          border-b-4 border-black
          outline-none
          font-bold uppercase tracking-wider text-lg
          placeholder:text-gray-400 placeholder:uppercase
          ${className}
        `}
        role="searchbox"
        aria-autocomplete="list"
        {...props}
      />
    );
  }
);

CommandInput.displayName = "CommandInput";

export interface CommandListProps extends HTMLAttributes<HTMLDivElement> {}

const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className = "", ...props }, ref) => {
    const context = useContext(CommandContext);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!context) return;

        const { selectedIndex, setSelectedIndex } = context;
        const items = document.querySelectorAll('[role="option"]');

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIndex(
              selectedIndex < items.length - 1 ? selectedIndex + 1 : 0
            );
            break;

          case "ArrowUp":
            e.preventDefault();
            setSelectedIndex(
              selectedIndex > 0 ? selectedIndex - 1 : items.length - 1
            );
            break;

          case "Enter":
            e.preventDefault();
            const selected = items[selectedIndex] as HTMLElement;
            selected?.click();
            break;
        }
      },
      [context]
    );

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
      <div
        ref={ref}
        className={`
          max-h-[400px]
          overflow-y-auto
          ${className}
        `}
        role="listbox"
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = "CommandList";

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ children, heading, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`${className}`} role="group" {...props}>
        {heading && (
          <div
            className="
              px-6 py-2
              text-xs
              font-bold uppercase tracking-wider
              text-gray-600
              bg-gray-100
              border-b-4 border-t-4 border-black
            "
          >
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = "CommandGroup";

export interface CommandItemProps extends HTMLAttributes<HTMLDivElement> {
  onSelect?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (
    { children, onSelect, icon, disabled = false, className = "", ...props },
    ref
  ) => {
    const context = useContext(CommandContext);
    if (!context) {
      throw new Error("CommandItem must be used within Command");
    }

    const { search, onClose } = context;
    const [itemIndex, setItemIndex] = useState(-1);
    const itemRef = useRef<HTMLDivElement | null>(null);

    // Calculate item index
    useEffect(() => {
      const current = itemRef.current;
      if (!current) return;

      const list = current.closest('[role="listbox"]');
      if (!list) return;

      const items = Array.from(
        list.querySelectorAll<HTMLElement>('[role="option"]')
      );
      setItemIndex(items.indexOf(current));
    }, [search, children]);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      onClose?.();
    };

    // Simple fuzzy search
    const childText =
      typeof children === "string"
        ? children
        : (children as any)?.props?.children || "";
    const isVisible =
      !search ||
      childText.toLowerCase().includes(search.toLowerCase());

    if (!isVisible) return null;

    const isSelected = context.selectedIndex === itemIndex;

    return (
      <div
        ref={(node) => {
          itemRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={`
          px-6 py-3
          border-b-4 border-black last:border-b-0
          font-bold uppercase tracking-wider
          flex items-center gap-3
          transition-all duration-100 ease-out
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-200"
              : "cursor-pointer"
          }
          ${isSelected && !disabled ? "bg-[#ffde00] text-black" : "bg-white text-black hover:bg-[#fff4ab]"}
          ${className}
        `}
        onClick={handleClick}
        onMouseEnter={() => {
          if (!disabled && itemIndex >= 0) {
            context.setSelectedIndex(itemIndex);
          }
        }}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        {...props}
      >
        {icon && <span className="text-xl">{icon}</span>}
        <span>{children}</span>
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";

export interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-1 bg-black ${className}`}
        role="separator"
        {...props}
      />
    );
  }
);

CommandSeparator.displayName = "CommandSeparator";

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};
