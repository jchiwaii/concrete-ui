"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MutableRefObject,
  forwardRef,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className = "", open, onClose, size = "md", children, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useBodyScrollLock(open);
    useFocusTrap(contentRef, open, onClose);

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
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="dialog"
          aria-modal="true"
          className={`
            relative z-10
            w-full ${sizes[size]}
            max-h-[calc(100dvh-2rem)] overflow-y-auto
            bg-[var(--ui-surface)]
            border-2 border-black
            shadow-[var(--ui-shadow-lg)]
            rounded-[var(--ui-radius-lg)]
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
      className={`border-b-2 border-black px-5 py-4 sm:px-6 sm:py-5 ${className}`}
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
    className={`text-xl font-semibold tracking-[-0.03em] ${className}`}
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
  <p ref={ref} className={`mt-1.5 text-sm text-[var(--ui-muted)] ${className}`} {...props}>
    {children}
  </p>
));

ModalDescription.displayName = "ModalDescription";

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`px-5 py-5 sm:px-6 ${className}`} {...props}>
      {children}
    </div>
  )
);

ModalContent.displayName = "ModalContent";

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col-reverse gap-3 border-t-2 border-black bg-[var(--ui-surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = "ModalFooter";

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className = "", onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`
        absolute top-4 right-4
        w-8 h-8
        flex items-center justify-center
        text-xl font-bold
        text-[var(--ui-muted)]
        rounded-[var(--ui-radius-sm)]
        transition-all duration-100 ease-out
        hover:bg-[var(--ui-surface-muted)] hover:text-black
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
