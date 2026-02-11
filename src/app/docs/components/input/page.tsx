"use client";

import { Badge, Input } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function InputPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          INPUT
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Text input with thick borders and interactive shadow effects on focus.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Input"
        description="Basic text input."
        code={`import { Input } from "@/components/ui";

<Input placeholder="ENTER YOUR NAME" />`}
      >
        <div className="w-full max-w-sm">
          <Input placeholder="ENTER YOUR NAME" />
        </div>
      </ComponentPreview>

      {/* Types */}
      <ComponentPreview
        title="Input Types"
        description="Different input types."
        code={`import { Input } from "@/components/ui";

<Input type="text" placeholder="TEXT INPUT" />
<Input type="email" placeholder="EMAIL INPUT" />
<Input type="password" placeholder="PASSWORD" />
<Input type="number" placeholder="NUMBER" />`}
      >
        <div className="w-full max-w-sm space-y-4">
          <Input type="text" placeholder="TEXT INPUT" />
          <Input type="email" placeholder="EMAIL INPUT" />
          <Input type="password" placeholder="PASSWORD" />
          <Input type="number" placeholder="NUMBER" />
        </div>
      </ComponentPreview>

      {/* Error State */}
      <ComponentPreview
        title="Error State"
        description="Input with error styling."
        code={`import { Input } from "@/components/ui";

<Input placeholder="INVALID INPUT" error />`}
      >
        <div className="w-full max-w-sm">
          <Input placeholder="INVALID INPUT" error />
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <ComponentPreview
        title="Disabled State"
        description="Disabled input."
        code={`import { Input } from "@/components/ui";

<Input placeholder="DISABLED INPUT" disabled />`}
      >
        <div className="w-full max-w-sm">
          <Input placeholder="DISABLED INPUT" disabled />
        </div>
      </ComponentPreview>

      {/* With Label */}
      <ComponentPreview
        title="With Label"
        description="Input with label styling."
        code={`<div>
  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
    EMAIL ADDRESS
  </label>
  <Input type="email" placeholder="YOU@EXAMPLE.COM" />
</div>`}
      >
        <div className="w-full max-w-sm">
          <label className="block text-sm font-bold uppercase tracking-wider mb-2">
            EMAIL ADDRESS
          </label>
          <Input type="email" placeholder="YOU@EXAMPLE.COM" />
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
          {`import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
    \`;

    const errorStyles = error
      ? "border-[#ef4444] shadow-[4px_4px_0_0_#ef4444] focus:shadow-[6px_6px_0_0_#ef4444]"
      : "";

    return (
      <input
        ref={ref}
        className={\`\${baseStyles} \${errorStyles} \${className}\`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };`}
        </pre>
      </div>
    </div>
  );
}
