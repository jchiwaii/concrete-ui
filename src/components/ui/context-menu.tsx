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
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(undefined);

export interface ContextMenuProps {
  children: ReactNode;
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition, triggerRef }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

ContextMenu.displayName = "ContextMenu";

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className = "", onContextMenu, onKeyDown, tabIndex = 0, ...props }, ref) => {
    const context = useContext(ContextMenuContext);
    if (!context) throw new Error("ContextMenuTrigger must be used within ContextMenu");

    return (
      <div
        ref={(node) => {
          context.triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={className}
        tabIndex={tabIndex}
        aria-haspopup="menu"
        aria-expanded={context.open}
        onContextMenu={(event) => {
          onContextMenu?.(event);
          event.preventDefault();
          event.currentTarget.focus();
          context.setPosition({ top: event.clientY, left: event.clientX });
          context.setOpen(true);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if ((event.shiftKey && event.key === "F10") || event.key === "ContextMenu") {
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            context.setPosition({ top: rect.top + 16, left: rect.left + 16 });
            context.setOpen(true);
          }
        }}
        {...props}
      />
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className = "", onKeyDown, ...props }, ref) => {
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
      if (!context.open) return;
      const frame = requestAnimationFrame(() => {
        contentRef.current
          ?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
          ?.focus();
      });

      return () => {
        cancelAnimationFrame(frame);
        context.triggerRef.current?.focus();
      };
    }, [context.open, context.triggerRef]);

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
          "fixed z-50 min-w-56 overflow-hidden rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow-lg)] animate-brutal-scale-in",
          className
        )}
        style={{ top: safePosition.top, left: safePosition.left }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          const items = Array.from(
            contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []
          );
          if (items.length === 0) return;

          const currentIndex = items.indexOf(document.activeElement as HTMLElement);
          let nextIndex = currentIndex;
          if (event.key === "ArrowDown") nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          else if (event.key === "ArrowUp") nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          else if (event.key === "Home") nextIndex = 0;
          else if (event.key === "End") nextIndex = items.length - 1;
          else return;

          event.preventDefault();
          items[nextIndex]?.focus();
        }}
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
        tabIndex={-1}
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
          disabled && "cursor-not-allowed bg-[var(--ui-surface-muted)] opacity-50 hover:bg-[var(--ui-surface-muted)]",
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
    <div ref={ref} className={cn("border-b-2 border-black bg-[var(--ui-surface-muted)] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[var(--ui-muted)]", className)} {...props} />
  )
);

ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("h-0.5 bg-black", className)} {...props} />
  )
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator };
