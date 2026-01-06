"use client";

import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function AccordionPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          ACCORDION
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Collapsible content sections with bold headers and smooth animations.
        </p>
      </div>

      {/* Single */}
      <ComponentPreview
        title="Single Accordion"
        description="Only one item can be open at a time."
        code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";

<Accordion type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">WHAT IS CONCRETE UI?</AccordionTrigger>
    <AccordionContent value="item-1">
      Concrete UI is a neo brutalist component library...
    </AccordionContent>
  </AccordionItem>
  ...
</Accordion>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger value="item-1">
                WHAT IS CONCRETE UI?
              </AccordionTrigger>
              <AccordionContent value="item-1">
                Concrete UI is a neo brutalist component library for React. It
                features bold borders, hard shadows, and saturated colors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger value="item-2">
                HOW DO I INSTALL IT?
              </AccordionTrigger>
              <AccordionContent value="item-2">
                Simply copy the component code into your project. No npm package
                needed. Just make sure you have React and Tailwind CSS set up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger value="item-3">
                IS IT ACCESSIBLE?
              </AccordionTrigger>
              <AccordionContent value="item-3">
                Yes! All components follow WAI-ARIA guidelines and support
                keyboard navigation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      {/* Multiple */}
      <ComponentPreview
        title="Multiple Accordion"
        description="Multiple items can be open simultaneously."
        code={`<Accordion type="multiple">
  ...
</Accordion>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="multiple" defaultValue={["m-1", "m-2"]}>
            <AccordionItem value="m-1">
              <AccordionTrigger value="m-1">FIRST SECTION</AccordionTrigger>
              <AccordionContent value="m-1">
                This section can stay open while others are opened too.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="m-2">
              <AccordionTrigger value="m-2">SECOND SECTION</AccordionTrigger>
              <AccordionContent value="m-2">
                Multiple sections open at the same time!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="m-3">
              <AccordionTrigger value="m-3">THIRD SECTION</AccordionTrigger>
              <AccordionContent value="m-3">
                Click to expand this one without closing others.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

// Context for managing accordion state
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

// Accordion, AccordionItem, AccordionTrigger, AccordionContent
// (See full source for complete implementation)

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };`}
        </pre>
      </div>
    </div>
  );
}
