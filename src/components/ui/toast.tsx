"use client";

import { createPortal } from "react-dom";
import { useToast, Toast as ToastType } from "@/context/ToastContext";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-4 max-w-md">
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
    default: "bg-white text-black border-black",
    success: "bg-[#00FF00] text-black border-black",
    error: "bg-[#FF0000] text-white border-white",
    warning: "bg-[#FFFF00] text-black border-black",
    info: "bg-[#00FFFF] text-black border-black",
  };

  const variantIcons = {
    default: "ℹ",
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className={`
        relative
        min-w-[320px]
        p-6
        border-4
        shadow-[6px_6px_0_0_#000]
        animate-brutal-slide-in
        ${variantStyles[variant]}
      `}
      role="alert"
      aria-live="polite"
    >
      <button
        onClick={() => onDismiss(id)}
        className={`
          absolute
          top-2 right-2
          w-6 h-6
          flex items-center justify-center
          font-bold text-xl
          transition-all duration-100 ease-out
          hover:scale-110
          ${variant === "error" ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"}
        `}
        aria-label="Close"
      >
        ×
      </button>

      <div className="flex gap-3">
        <div className="text-2xl mt-0.5">{variantIcons[variant]}</div>
        <div className="flex-1 pr-6">
          <div className="font-bold uppercase tracking-wider text-base mb-1">
            {title}
          </div>
          {description && (
            <div className="text-sm font-medium mt-2">{description}</div>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="
                mt-3
                px-4 py-2
                bg-black text-white
                border-2 border-white
                shadow-[2px_2px_0_0_#fff]
                font-bold uppercase text-xs
                transition-all duration-100 ease-out
                hover:translate-x-[-1px] hover:translate-y-[-1px]
                hover:shadow-[3px_3px_0_0_#fff]
              "
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
