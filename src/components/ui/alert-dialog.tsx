"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Button } from "./button";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const AlertDialog = ({ open, onOpenChange, children }: AlertDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useFocusTrap(dialogRef, open, close);

  useBodyScrollLock(open);

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 animate-brutal-fade-in" aria-hidden="true" />
      <div ref={dialogRef} className="relative z-[9999] w-full max-w-lg">
        {children}
      </div>
    </div>,
    document.body
  );
};

AlertDialog.displayName = "AlertDialog";

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      className={cn(
        "rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow-lg)] animate-brutal-scale-in",
        className
      )}
      {...props}
    />
  )
);

AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("border-b-2 border-black p-6", className)} {...props} />
  )
);

AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h2 ref={ref} className={cn("text-2xl font-semibold tracking-[-0.035em]", className)} {...props} />
  )
);

AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={cn("mt-2 text-sm font-medium text-gray-600", className)} {...props} />
  )
);

AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse gap-3 border-t-2 border-black bg-[var(--ui-surface-muted)] p-5 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
);

AlertDialogFooter.displayName = "AlertDialogFooter";

export interface AlertDialogActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "success";
}

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className = "", variant = "danger", ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props} />
  )
);

AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", ...props }, ref) => (
    <Button ref={ref} variant="outline" className={className} {...props} />
  )
);

AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
