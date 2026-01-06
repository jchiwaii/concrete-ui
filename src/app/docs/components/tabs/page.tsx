"use client";

import {
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function TabsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TABS
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Tabbed interface for organizing content into sections.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Tabs"
        description="Basic tabs component."
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">TAB ONE</TabsTrigger>
    <TabsTrigger value="tab2">TAB TWO</TabsTrigger>
    <TabsTrigger value="tab3">TAB THREE</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Content for tab one.</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Content for tab two.</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Content for tab three.</p>
  </TabsContent>
</Tabs>`}
      >
        <div className="w-full max-w-lg">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">TAB ONE</TabsTrigger>
              <TabsTrigger value="tab2">TAB TWO</TabsTrigger>
              <TabsTrigger value="tab3">TAB THREE</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p>Content for the first tab. This is where your content goes.</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Content for the second tab. Different content here.</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Content for the third tab. Even more content!</p>
            </TabsContent>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Full Code */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">
            FULL COMPONENT CODE
          </h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
          {`"use client";

import { HTMLAttributes, forwardRef, useState, createContext, useContext } from "react";

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

// TabsList, TabsTrigger, TabsContent components...
// (See full source for complete implementation)

export { Tabs, TabsList, TabsTrigger, TabsContent };`}
        </pre>
      </div>
    </div>
  );
}
