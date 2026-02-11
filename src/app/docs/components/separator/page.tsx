"use client";

import { Badge, Separator } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function SeparatorPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          SEPARATOR
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Visual divider between content sections.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Separator"
        description="Horizontal line separator."
        code={`import { Separator } from "@/components/ui";

<div>
  <p>Content above</p>
  <Separator className="my-4" />
  <p>Content below</p>
</div>`}
      >
        <div className="w-full max-w-md text-center">
          <p className="font-bold uppercase">Content Above</p>
          <Separator className="my-4" />
          <p className="font-bold uppercase">Content Below</p>
        </div>
      </ComponentPreview>

      {/* In Context */}
      <ComponentPreview
        title="In Context"
        description="Separator used between list items."
        code={`<div className="space-y-4">
  <div>Item One</div>
  <Separator />
  <div>Item Two</div>
  <Separator />
  <div>Item Three</div>
</div>`}
      >
        <div className="w-full max-w-md">
          <div className="p-4 font-bold uppercase">Item One</div>
          <Separator />
          <div className="p-4 font-bold uppercase">Item Two</div>
          <Separator />
          <div className="p-4 font-bold uppercase">Item Three</div>
        </div>
      </ComponentPreview>

      {/* Thick */}
      <ComponentPreview
        title="Thick Separator"
        description="Custom thickness with className."
        code={`<Separator className="h-2" />`}
      >
        <div className="w-full max-w-md text-center">
          <p className="font-bold uppercase mb-4">Above</p>
          <Separator className="h-2" />
          <p className="font-bold uppercase mt-4">Below</p>
        </div>
      </ComponentPreview>

      {/* Full Code */}
      <div className="source-panel bg-white">
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">
            FULL COMPONENT CODE
          </h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
          {`import { HTMLAttributes, forwardRef } from "react";

const Separator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={\`
          w-full h-1
          bg-black
          \${className}
        \`}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };`}
        </pre>
      </div>
    </div>
  );
}
