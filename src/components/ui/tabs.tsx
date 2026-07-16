"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
  orientation: "horizontal" | "vertical";
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className = "",
      defaultValue,
      value,
      onValueChange,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;

    const setActiveTab = (nextValue: string) => {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    return (
      <TabsContext.Provider
        value={{ activeTab, setActiveTab, baseId, orientation }}
      >
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsList must be used within Tabs");

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={context.orientation}
        className={cn(
          "inline-flex gap-1 rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface-muted)] p-1",
          context.orientation === "vertical" && "flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = "", value, children, onClick, onKeyDown, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const tabs = Array.from(
        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not([disabled])'
        ) ?? []
      );
      const currentIndex = tabs.indexOf(event.currentTarget);
      const previousKey = context.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const nextKey = context.orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      let nextIndex = currentIndex;

      if (event.key === previousKey) nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === nextKey) nextIndex = (currentIndex + 1) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab?.focus();
      nextTab?.click();
    };

    return (
      <button
        ref={ref}
        id={`${context.baseId}-tab-${value}`}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`${context.baseId}-panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setActiveTab(value);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "rounded-[var(--ui-radius-sm)] border-2 px-3.5 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-150",
          isActive
            ? "border-black bg-[var(--ui-surface)] text-black shadow-[var(--ui-shadow-sm)]"
            : "border-transparent bg-transparent text-gray-600 hover:bg-black/5 hover:text-black",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");
    if (context.activeTab !== value) return null;

    return (
      <div
        ref={ref}
        id={`${context.baseId}-panel-${value}`}
        role="tabpanel"
        aria-labelledby={`${context.baseId}-tab-${value}`}
        tabIndex={0}
        className={cn(
          "mt-4 rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] p-5 shadow-[var(--ui-shadow)] animate-brutal-fade-in",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
