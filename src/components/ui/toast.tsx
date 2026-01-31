"use client";

import { createPortal } from "react-dom";
import { useToast, Toast as ToastType } from "@/context/ToastContext";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>,
    document.body
  );
}

interface ToastComponentProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

function ToastComponent({ toast, onDismiss }: ToastComponentProps) {
  const { id, variant = "default", title, description, action } = toast;

  const variantStyles = {
    default: "bg-white border-black",
    success: "bg-[#dcfce7] border-black",
    error: "bg-[#fee2e2] border-black",
    warning: "bg-[#fef3c7] border-black",
    info: "bg-[#dbeafe] border-black",
  };

  const iconStyles = {
    default: "text-gray-600",
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  };

  const icons = {
    default: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        relative
        p-4
        border-2
        shadow-[4px_4px_0_0_#000]
        rounded-lg
        animate-brutal-slide-in
        pointer-events-auto
        ${variantStyles[variant]}
      `}
      role="alert"
      aria-live="polite"
    >
      <button
        onClick={() => onDismiss(id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex gap-3 pr-6">
        <span className={`flex-shrink-0 mt-0.5 ${iconStyles[variant]}`}>
          {icons[variant]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-black">{title}</div>
          {description && (
            <div className="text-sm text-gray-600 mt-1">{description}</div>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-3 px-3 py-1.5 text-xs font-semibold bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export type { ToastType };
