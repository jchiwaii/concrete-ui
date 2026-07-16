"use client";

import {
  HTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
  MouseEvent,
  ButtonHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";

interface DropdownMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);

export interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.displayName = "DropdownMenu";

export interface DropdownMenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, asChild = false, className = "", onClick, type = "button", ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  }

  const { isOpen, setIsOpen, triggerRef } = context;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!event.defaultPrevented) setIsOpen(!isOpen);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onClick?: (event: MouseEvent<HTMLElement>) => void;
      className?: string;
    }>;

    return (
      cloneElement(child, {
        ref: (node: HTMLElement | null) => {
          if (typeof ref === "function") ref(node as HTMLButtonElement | null);
          else if (ref) ref.current = node as HTMLButtonElement | null;
          triggerRef.current = node;
        },
        onClick: (event: MouseEvent<HTMLElement>) => {
          child.props.onClick?.(event);
          onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
          handleClick(event);
        },
        className: `${child.props.className ?? ""} ${className}`,
        "aria-haspopup": "menu",
        "aria-expanded": isOpen,
        ...props,
      } as unknown as Partial<typeof child.props>)
    );
  }

  return (
    <button
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        triggerRef.current = node;
      }}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        handleClick(event);
      }}
      className={`
        px-6 py-3
        bg-[var(--ui-surface)]
        border-2 border-black
        shadow-[var(--ui-shadow)]
        font-semibold
        transition-all duration-100 ease-out
        hover:-translate-x-px hover:-translate-y-px
        hover:shadow-[var(--ui-shadow-md)]
        ${className}
      `}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, align = "start", className = "", ...props }, ref) => {
    const context = useContext(DropdownMenuContext);
    if (!context) {
      throw new Error("DropdownMenuContent must be used within DropdownMenu");
    }

    const { isOpen, setIsOpen, triggerRef } = context;
    const contentRef = useRef<HTMLDivElement>(null);
    const position = useOverlayPosition(triggerRef, contentRef, isOpen, "bottom");

    useClickOutside([contentRef, triggerRef], () => {
      if (isOpen) setIsOpen(false);
    }, isOpen);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, setIsOpen]);

    if (!isOpen || typeof window === "undefined") return null;

    return createPortal(
      <div
        ref={contentRef}
        className={`
          fixed
          z-50
          min-w-[200px]
          bg-[var(--ui-surface)]
          border-2 border-black
          shadow-[var(--ui-shadow-lg)]
          animate-brutal-slide-down
          ${className}
        `}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        role="menu"
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
}

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
    { children, disabled = false, onSelect, className = "", ...props },
    ref
  ) => {
    const context = useContext(DropdownMenuContext);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      context?.setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={`
          px-6 py-3
          border-b-4 border-black last:border-b-0
          font-semibold
          transition-all duration-100 ease-out
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-200"
              : "cursor-pointer hover:bg-[var(--ui-accent)]"
          }
          ${className}
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="menuitem"
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export interface DropdownMenuSeparatorProps
  extends HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`h-1 bg-black ${className}`}
      role="separator"
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {}

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          px-6 py-2
          font-semibold
          text-xs
          text-gray-600
          border-b-4 border-black
          bg-gray-100
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
