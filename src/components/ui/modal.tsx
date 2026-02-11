"use client";

import { HTMLAttributes, forwardRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className = "", open, onClose, size = "md", children, ...props }, ref) => {
    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [open, handleEscape]);

    if (!open || typeof window === "undefined") return null;

    const sizes = {
      sm: "max-w-sm",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-[calc(100vw-2rem)]",
    };

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 animate-brutal-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={`
            relative z-10
            w-full ${sizes[size]}
            bg-white
            border-2 border-black
            shadow-[6px_6px_0_0_#000]
            rounded-lg
            animate-brutal-scale-in
            ${className}
          `}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-5 border-b-2 border-black ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

ModalHeader.displayName = "ModalHeader";

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-xl font-bold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h2>
));

ModalTitle.displayName = "ModalTitle";

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <p ref={ref} className={`mt-1.5 text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
));

ModalDescription.displayName = "ModalDescription";

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  )
);

ModalContent.displayName = "ModalContent";

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-t-2 border-black flex items-center justify-end gap-3 bg-gray-50 rounded-b-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = "ModalFooter";

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className = "", onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        absolute top-4 right-4
        w-8 h-8
        flex items-center justify-center
        text-xl font-bold
        text-gray-500
        rounded-lg
        transition-all duration-100 ease-out
        hover:bg-gray-100 hover:text-black
        ${className}
      `}
      onClick={onClick}
      aria-label="Close"
      {...props}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
);

ModalClose.displayName = "ModalClose";

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalClose,
};
