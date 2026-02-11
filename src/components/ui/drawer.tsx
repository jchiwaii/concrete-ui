"use client";

import {
  HTMLAttributes,
  forwardRef,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

export type DrawerDirection = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  direction?: DrawerDirection;
  children: ReactNode;
}

const Drawer = ({
  open,
  onClose,
  direction = "right",
  children,
}: DrawerProps) => {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || typeof window === "undefined") return null;

  const directionStyles = {
    left: "left-0 top-0 h-full w-96 border-r-6 shadow-[8px_0_0_0_#000] animate-brutal-slide-right",
    right:
      "right-0 top-0 h-full w-96 border-l-6 shadow-[-8px_0_0_0_#000] animate-brutal-slide-left",
    top: "top-0 left-0 w-full h-96 border-b-6 shadow-[0_8px_0_0_#000] animate-brutal-slide-bottom",
    bottom:
      "bottom-0 left-0 w-full h-96 border-t-6 shadow-[0_-8px_0_0_#000] animate-brutal-slide-top",
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-brutal-slide-down"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`
          fixed
          z-50
          bg-white
          border-black
          overflow-y-auto
          ${directionStyles[direction]}
        `}
        role="dialog"
        aria-modal="true"
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
        className={`flex flex-col h-full ${className}`}
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
          px-6 py-4
          border-b-4 border-black
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
          text-2xl
          font-bold
          uppercase
          tracking-wider
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
        className={`flex-1 px-6 py-4 overflow-y-auto ${className}`}
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
          px-6 py-4
          border-t-4 border-black
          flex gap-4
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

export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ onClose, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClose}
        className={`
          absolute
          top-4 right-4
          w-10 h-10
          flex items-center justify-center
          bg-white
          border-2 border-black
          shadow-[3px_3px_0_0_#000]
          font-bold text-2xl
          transition-all duration-100 ease-out
          hover:translate-x-[-2px] hover:translate-y-[-2px]
          hover:shadow-[5px_5px_0_0_#000]
          hover:bg-[#ef4444] hover:text-white hover:border-white
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
