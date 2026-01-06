"use client";

import { HTMLAttributes, forwardRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className = "", open, onClose, children, ...props }, ref) => {
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

    if (!open) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
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
            w-full max-w-lg
            bg-white
            border-4 border-black
            shadow-[8px_8px_0_0_#000]
            animate-brutal-slide-up
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
      className={`p-6 border-b-4 border-black ${className}`}
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
    className={`text-2xl font-extrabold uppercase tracking-tight ${className}`}
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
  <p ref={ref} className={`mt-2 text-base ${className}`} {...props}>
    {children}
  </p>
));

ModalDescription.displayName = "ModalDescription";

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);

ModalContent.displayName = "ModalContent";

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 border-t-4 border-black flex items-center justify-end gap-4 ${className}`}
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
        w-10 h-10
        flex items-center justify-center
        text-2xl font-black
        bg-white
        border-4 border-black
        shadow-[2px_2px_0_0_#000]
        transition-all duration-100 ease-out
        hover:bg-[#FF0000] hover:text-white
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        hover:shadow-[4px_4px_0_0_#000]
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      ×
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
