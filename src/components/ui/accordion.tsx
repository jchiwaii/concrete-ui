"use client";

import {
  HTMLAttributes,
  forwardRef,
  useState,
  createContext,
  useContext,
} from "react";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { className = "", type = "single", defaultValue = [], children, ...props },
    ref
  ) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultValue);

    const toggleItem = (value: string) => {
      if (type === "single") {
        setOpenItems(openItems.includes(value) ? [] : [value]);
      } else {
        setOpenItems(
          openItems.includes(value)
            ? openItems.filter((item) => item !== value)
            : [...openItems, value]
        );
      }
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={`space-y-3 ${className}`} {...props}>
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
    if (!context)
      throw new Error("AccordionItem must be used within Accordion");

    const isOpen = context.openItems.includes(value);

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={`
          border-2 border-black
          bg-white
          shadow-[4px_4px_0_0_#000]
          rounded-md
          overflow-hidden
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context)
      throw new Error("AccordionTrigger must be used within Accordion");

    const isOpen = context.openItems.includes(value);

    return (
      <button
        ref={ref}
        onClick={() => context.toggleItem(value)}
        className={`
          w-full px-5 py-4
          flex items-center justify-between gap-4
          text-left
          font-semibold
          transition-all duration-100 ease-out
          hover:bg-gray-50
          ${className}
        `}
        aria-expanded={isOpen}
        {...props}
      >
        <span>{children}</span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-100 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
    if (!context)
      throw new Error("AccordionContent must be used within Accordion");

    const isOpen = context.openItems.includes(value);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={`px-5 pb-4 border-t-2 border-black animate-brutal-fade-in ${className}`}
        {...props}
      >
        <div className="pt-4 text-sm text-gray-600">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
