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
import { calculatePosition } from "@/lib/positioning";

interface DropdownMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);

export interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
>(({ children, asChild = false, className = "", ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  }

  const { isOpen, setIsOpen, triggerRef } = context;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onClick?: (event: MouseEvent<HTMLElement>) => void;
      className?: string;
    }>;

    return (
      cloneElement(child, {
        ref: (node: HTMLButtonElement | null) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          triggerRef.current = node;
        },
        onClick: (event: MouseEvent<HTMLElement>) => {
          child.props.onClick?.(event);
          handleClick();
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
      onClick={handleClick}
      className={`
        px-6 py-3
        bg-white
        border-2 border-black
        shadow-[4px_4px_0_0_#000]
        font-bold uppercase tracking-wider
        transition-all duration-100 ease-out
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        hover:shadow-[6px_6px_0_0_#000]
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
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useClickOutside(contentRef, () => {
      if (isOpen) setIsOpen(false);
    });

    // Calculate position
    useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const pos = calculatePosition(triggerRect, contentRect, "bottom");
        setPosition(pos);
      }
    }, [isOpen, triggerRef]);

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
          bg-white
          border-2 border-black
          shadow-[6px_6px_0_0_#000]
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

    return (
      <div
        ref={ref}
        className={`
          px-6 py-3
          border-b-4 border-black last:border-b-0
          font-bold uppercase tracking-wider
          transition-all duration-100 ease-out
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-200"
              : "cursor-pointer hover:bg-[#ffde00]"
          }
          ${className}
        `}
        onClick={handleClick}
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
          font-bold uppercase tracking-wider
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
