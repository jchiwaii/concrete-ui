"use client";

import { HTMLAttributes, forwardRef, useState, createContext, useContext } from "react";

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
  ({ className = "", type = "single", defaultValue = [], children, ...props }, ref) => {
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
        <div ref={ref} className={`space-y-4 ${className}`} {...props}>
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
        className={`border-4 border-black bg-white shadow-[4px_4px_0_0_#000] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const isOpen = context.openItems.includes(value);

    return (
      <button
        ref={ref}
        onClick={() => context.toggleItem(value)}
        className={`
          w-full px-6 py-4
          flex items-center justify-between
          text-lg font-bold uppercase tracking-wide
          transition-all duration-100 ease-out
          hover:bg-gray-50
          ${className}
        `}
        {...props}
      >
        {children}
        <span
          className={`
            text-2xl font-black
            transition-transform duration-100
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
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

    const isOpen = context.openItems.includes(value);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={`px-6 pb-4 border-t-4 border-black ${className}`}
        {...props}
      >
        <div className="pt-4">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
