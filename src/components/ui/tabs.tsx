"use client";

import {
  HTMLAttributes,
  forwardRef,
  useState,
  createContext,
  useContext,
} from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className = "", defaultValue, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`
        inline-flex p-1 gap-1
        bg-gray-100
        border-2 border-black
        rounded-md
        ${className}
      `}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={() => context.setActiveTab(value)}
        className={`
          px-4 py-2
          text-sm font-semibold uppercase tracking-wide
          rounded-md
          transition-all duration-100 ease-out
          ${
            isActive
              ? "bg-white text-black shadow-[3px_3px_0_0_#000] border-2 border-black"
              : "bg-transparent text-gray-600 border-2 border-transparent hover:text-black hover:bg-gray-200"
          }
          ${className}
        `}
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
        role="tabpanel"
        className={`
          mt-4 p-5
          bg-white
          border-2 border-black
          shadow-[5px_5px_0_0_#000]
          rounded-md
          animate-brutal-fade-in
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
