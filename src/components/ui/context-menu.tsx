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
import { clamp, cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { top: number; left: number };
  setPosition: (position: { top: number; left: number }) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(undefined);

export interface ContextMenuProps {
  children: ReactNode;
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

ContextMenu.displayName = "ContextMenu";

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className = "", onContextMenu, ...props }, ref) => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error("ContextMenuTrigger must be used within ContextMenu");

    return (
      <div
        ref={ref}
        className={className}
        onContextMenu={(event) => {
          onContextMenu?.(event);
          event.preventDefault();
          context.setPosition({ top: event.clientY, left: event.clientX });
          context.setOpen(true);
        }}
        {...props}
      />
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error("ContextMenuContent must be used within ContextMenu");

    const contentRef = useRef<HTMLDivElement>(null);
    const [safePosition, setSafePosition] = useState(context.position);
    useClickOutside(contentRef, () => context.open && context.setOpen(false), context.open);

    useEffect(() => {
      if (!context.open || !contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setSafePosition({
        top: clamp(context.position.top, 16, window.innerHeight - rect.height - 16),
        left: clamp(context.position.left, 16, window.innerWidth - rect.width - 16),
      });
    }, [context.open, context.position]);

    useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") context.setOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [context]);

    if (!context.open || typeof window === "undefined") return null;

    return createPortal(
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="menu"
        className={cn(
          "fixed z-50 min-w-56 overflow-hidden rounded-lg border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow-lg)] animate-brutal-scale-in",
          className
        )}
        style={{ top: safePosition.top, left: safePosition.left }}
        {...props}
      />,
      document.body
    );
  }
);

ContextMenuContent.displayName = "ContextMenuContent";

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  inset?: boolean;
}

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className = "", disabled = false, inset = false, onClick, ...props }, ref) => {
    const context = useContext(ContextMenuContext);

    const activate = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event as React.MouseEvent<HTMLDivElement>);
      context?.setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={activate}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate(event);
          }
        }}
        className={cn(
          "flex cursor-pointer items-center justify-between gap-4 border-b-2 border-black px-4 py-3 text-sm font-semibold last:border-b-0 hover:bg-[var(--ui-accent)]",
          inset && "pl-9",
          disabled && "cursor-not-allowed bg-gray-100 opacity-50 hover:bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);

ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("border-b-2 border-black bg-gray-100 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-gray-500", className)} {...props} />
  )
);

ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("h-1 bg-black", className)} {...props} />
  )
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator };
