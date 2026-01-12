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
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutside";
import { calculatePosition, Placement } from "@/lib/positioning";

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | undefined>(
  undefined
);

export interface PopoverProps {
  children: ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

Popover.displayName = "Popover";

export interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild = false, className = "", ...props }, ref) => {
    const context = useContext(PopoverContext);
    if (!context) {
      throw new Error("PopoverTrigger must be used within Popover");
    }

    const { isOpen, setIsOpen, triggerRef } = context;

    const handleClick = () => {
      setIsOpen(!isOpen);
    };

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
          border-4 border-black
          shadow-[4px_4px_0_0_#000]
          font-bold uppercase tracking-wider
          transition-all duration-100 ease-out
          hover:translate-x-[-2px] hover:translate-y-[-2px]
          hover:shadow-[6px_6px_0_0_#000]
          ${className}
        `}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, placement = "bottom", className = "", ...props }, ref) => {
    const context = useContext(PopoverContext);
    if (!context) {
      throw new Error("PopoverContent must be used within Popover");
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
        const pos = calculatePosition(triggerRect, contentRect, placement);
        setPosition(pos);
      }
    }, [isOpen, placement, triggerRef]);

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
          p-6
          min-w-[200px]
          max-w-md
          bg-white
          border-4 border-black
          shadow-[6px_6px_0_0_#000]
          animate-brutal-slide-down
          ${className}
        `}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        role="dialog"
        {...props}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute
            top-2 right-2
            w-6 h-6
            flex items-center justify-center
            font-bold text-xl
            text-black
            transition-all duration-100 ease-out
            hover:scale-110
            hover:text-red-600
          "
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>,
      document.body
    );
  }
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
