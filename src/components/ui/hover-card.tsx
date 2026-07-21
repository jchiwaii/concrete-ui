"use client";

import {
  HTMLAttributes,
  ButtonHTMLAttributes,
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
import { Placement } from "@/lib/positioning";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";

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

export interface HoverCardTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  ({ className = "", onMouseEnter, onMouseLeave, onFocus, onBlur, type = "button", ...props }, ref) => {
    const context = useContext(HoverCardContext);
    if (!context) throw new Error("HoverCardTrigger must be used within HoverCard");

    return (
      <button
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          context.triggerRef.current = node;
        }}
        type={type}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (!event.defaultPrevented) context.setOpen(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (!event.defaultPrevented) context.setOpen(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented) context.setOpen(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.defaultPrevented) context.setOpen(false);
        }}
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
    const position = useOverlayPosition(
      context.triggerRef,
      contentRef,
      context.open,
      placement
    );

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
          "fixed z-50 max-w-sm rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] p-5 shadow-[var(--ui-shadow-lg)] animate-brutal-scale-in",
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
