"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined);

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className = "", open, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = open ?? internalOpen;
    const setOpen = (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, setOpen }}>
        <div ref={ref} className={className} {...props}>{children}</div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    const context = useContext(CollapsibleContext);
    if (!context) throw new Error("CollapsibleTrigger must be used within Collapsible");

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={context.open}
        onClick={() => context.setOpen(!context.open)}
        className={cn("inline-flex items-center justify-between gap-3", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(CollapsibleContext);
    if (!context) throw new Error("CollapsibleContent must be used within Collapsible");

    if (!context.open) return null;

    return <div ref={ref} className={cn("animate-brutal-slide-down", className)} {...props} />;
  }
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
