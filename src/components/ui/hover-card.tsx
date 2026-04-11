"use client";

import {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { calculatePosition, Placement } from "@/lib/positioning";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const HoverCardContext = createContext<HoverCardContextValue | undefined>(undefined);

export interface HoverCardProps {
  children: ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

const HoverCard = ({ children, openDelay = 120, closeDelay = 120 }: HoverCardProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);

  const setDelayedOpen = (next: boolean) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    const delay = next ? openDelay : closeDelay;
    timers.current.push(window.setTimeout(() => setOpen(next), delay));
  };

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  return (
    <HoverCardContext.Provider value={{ open, setOpen: setDelayedOpen, triggerRef }}>
      <span className="inline-block">{children}</span>
    </HoverCardContext.Provider>
  );
};

HoverCard.displayName = "HoverCard";

export interface HoverCardTriggerProps extends HTMLAttributes<HTMLButtonElement> {}

const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(HoverCardContext);
    if (!context) throw new Error("HoverCardTrigger must be used within HoverCard");

    return (
      <button
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          context.triggerRef.current = node;
        }}
        type="button"
        onMouseEnter={() => context.setOpen(true)}
        onMouseLeave={() => context.setOpen(false)}
        onFocus={() => context.setOpen(true)}
        onBlur={() => context.setOpen(false)}
        className={cn("inline-flex", className)}
        {...props}
      />
    );
  }
);

HoverCardTrigger.displayName = "HoverCardTrigger";

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
}

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className = "", placement = "bottom", ...props }, ref) => {
    const context = useContext(HoverCardContext);
    if (!context) throw new Error("HoverCardContent must be used within HoverCard");

    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (!context.open || !context.triggerRef.current || !contentRef.current) return;
      setPosition(
        calculatePosition(
          context.triggerRef.current.getBoundingClientRect(),
          contentRef.current.getBoundingClientRect(),
          placement
        )
      );
    }, [context.open, context.triggerRef, placement]);

    if (!context.open || typeof window === "undefined") return null;

    return createPortal(
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="tooltip"
        onMouseEnter={() => context.setOpen(true)}
        onMouseLeave={() => context.setOpen(false)}
        className={cn(
          "fixed z-50 max-w-sm rounded-lg border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] animate-brutal-scale-in",
          className
        )}
        style={{ top: position.top, left: position.left }}
        {...props}
      />,
      document.body
    );
  }
);

HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
