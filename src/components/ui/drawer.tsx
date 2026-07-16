"use client";

import {
  HTMLAttributes,
  forwardRef,
  ReactNode,
  useRef,
  ButtonHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export type DrawerDirection = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  direction?: DrawerDirection;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Drawer = ({
  open,
  onClose,
  direction = "right",
  children,
  className = "",
  ariaLabel = "Panel",
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);
  useFocusTrap(drawerRef, open, onClose);

  if (!open || typeof window === "undefined") return null;

  const directionStyles = {
    left: "left-0 top-0 h-full w-[min(90vw,24rem)] border-r-2 shadow-[5px_0_0_var(--ui-ink)] animate-brutal-slide-right",
    right:
      "right-0 top-0 h-full w-[min(90vw,24rem)] border-l-2 shadow-[-5px_0_0_var(--ui-ink)] animate-brutal-slide-left",
    top: "left-0 top-0 max-h-[85dvh] w-full border-b-2 shadow-[0_5px_0_var(--ui-ink)] animate-brutal-slide-bottom",
    bottom:
      "bottom-0 left-0 max-h-[85dvh] w-full border-t-2 shadow-[0_-5px_0_var(--ui-ink)] animate-brutal-slide-top",
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] animate-brutal-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed
          z-50
          bg-[var(--ui-surface)]
          border-black
          overflow-y-auto
          ${directionStyles[direction]}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

Drawer.displayName = "Drawer";

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex h-full min-h-0 flex-col ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerContent.displayName = "DrawerContent";

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          border-b-2 border-black px-5 py-4 pr-16
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerHeader.displayName = "DrawerHeader";

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={`
          text-xl
          font-semibold
          tracking-[-0.03em]
          ${className}
        `}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = "DrawerTitle";

export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`
          mt-2
          text-sm
          font-medium
          text-gray-600
          ${className}
        `}
        {...props}
      >
        {children}
      </p>
    );
  }
);

DrawerDescription.displayName = "DrawerDescription";

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`min-h-0 flex-1 overflow-y-auto px-5 py-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = "DrawerBody";

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex flex-col-reverse gap-3 border-t-2 border-black bg-[var(--ui-surface-muted)] px-5 py-4 sm:flex-row
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = "DrawerFooter";

export interface DrawerCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ onClose, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClose}
        className={`
          absolute
          top-4 right-4
          w-9 h-9
          flex items-center justify-center
          bg-[var(--ui-surface)]
          border-2 border-black
          rounded-[var(--ui-radius-sm)]
          shadow-[var(--ui-shadow-sm)]
          font-semibold text-xl
          transition-all duration-150 ease-out
          hover:-translate-x-px hover:-translate-y-px
          hover:shadow-[var(--ui-shadow)]
          hover:bg-[var(--ui-danger)]
          ${className}
        `}
        aria-label="Close"
        {...props}
      >
        {children || "×"}
      </button>
    );
  }
);

DrawerClose.displayName = "DrawerClose";

export {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
};
