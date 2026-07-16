"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className = "",
      type = "single",
      value,
      defaultValue = [],
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const openItems = value ?? internalValue;

    const toggleItem = (itemValue: string) => {
      const nextValue =
        type === "single"
          ? openItems.includes(itemValue)
            ? []
            : [itemValue]
          : openItems.includes(itemValue)
            ? openItems.filter((item) => item !== itemValue)
            : [...openItems, itemValue];

      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, baseId }}>
        <div ref={ref} className={cn("space-y-3", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be used within Accordion");

    const isOpen = context.openItems.includes(value);

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "overflow-hidden rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className = "", value, children, onClick, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const isOpen = context.openItems.includes(value);
    const triggerId = `${context.baseId}-trigger-${value}`;
    const contentId = `${context.baseId}-content-${value}`;

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.toggleItem(value);
        }}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold transition-colors duration-150 hover:bg-black/5",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-gray-500 transition-transform duration-150",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    if (!context.openItems.includes(value)) return null;

    return (
      <div
        ref={ref}
        id={`${context.baseId}-content-${value}`}
        role="region"
        aria-labelledby={`${context.baseId}-trigger-${value}`}
        className={cn(
          "border-t-2 border-black px-5 py-4 text-sm leading-6 text-gray-600 animate-brutal-fade-in",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
