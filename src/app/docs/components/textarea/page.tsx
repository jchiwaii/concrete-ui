"use client";

import { Badge, Textarea } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function TextareaPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TEXTAREA
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Multi-line text input with the same brutalist styling as Input.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Textarea"
        description="Basic textarea."
        code={`import { Textarea } from "@/components/ui";

<Textarea placeholder="ENTER YOUR MESSAGE..." />`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="ENTER YOUR MESSAGE..." />
        </div>
      </ComponentPreview>

      {/* Error State */}
      <ComponentPreview
        title="Error State"
        description="Textarea with error styling."
        code={`import { Textarea } from "@/components/ui";

<Textarea placeholder="INVALID INPUT" error />`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="INVALID INPUT" error />
        </div>
      </ComponentPreview>

      {/* With Label */}
      <ComponentPreview
        title="With Label"
        description="Textarea with label."
        code={`<div>
  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
    YOUR MESSAGE
  </label>
  <Textarea placeholder="TYPE HERE..." />
</div>`}
      >
        <div className="w-full max-w-md">
          <label className="block text-sm font-bold uppercase tracking-wider mb-2">
            YOUR MESSAGE
          </label>
          <Textarea placeholder="TYPE HERE..." />
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
          {`import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error = false, ...props }, ref) => {
    const baseStyles = \`
      w-full px-4 py-3
      text-base font-medium
      bg-white
      border-4 border-black
      shadow-[4px_4px_0_0_#000]
      outline-none
      transition-all duration-100 ease-out
      placeholder:text-gray-400 placeholder:uppercase
      focus:translate-x-[-2px] focus:translate-y-[-2px]
      focus:shadow-[6px_6px_0_0_#000]
      disabled:opacity-50 disabled:cursor-not-allowed
      resize-none
      min-h-[120px]
    \`;

    const errorStyles = error
      ? "border-[#ef4444] shadow-[4px_4px_0_0_#ef4444] focus:shadow-[6px_6px_0_0_#ef4444]"
      : "";

    return (
      <textarea
        ref={ref}
        className={\`\${baseStyles} \${errorStyles} \${className}\`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };`}
        </pre>
      </div>
    </div>
  );
}
