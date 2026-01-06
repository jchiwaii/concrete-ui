"use client";

import { Badge, Checkbox } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function CheckboxPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          CHECKBOX
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Bold checkbox with thick borders and satisfying check animation.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Checkbox"
        description="Basic checkbox without label."
        code={`import { Checkbox } from "@/components/ui";

<Checkbox />`}
      >
        <Checkbox />
      </ComponentPreview>

      {/* With Label */}
      <ComponentPreview
        title="With Label"
        description="Checkbox with text label."
        code={`import { Checkbox } from "@/components/ui";

<Checkbox label="ACCEPT TERMS" />
<Checkbox label="SUBSCRIBE TO NEWSLETTER" />
<Checkbox label="REMEMBER ME" defaultChecked />`}
      >
        <div className="space-y-4">
          <Checkbox label="ACCEPT TERMS" />
          <Checkbox label="SUBSCRIBE TO NEWSLETTER" />
          <Checkbox label="REMEMBER ME" defaultChecked />
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <ComponentPreview
        title="Disabled State"
        description="Disabled checkbox."
        code={`import { Checkbox } from "@/components/ui";

<Checkbox label="DISABLED" disabled />
<Checkbox label="DISABLED CHECKED" disabled defaultChecked />`}
      >
        <div className="space-y-4">
          <Checkbox label="DISABLED" disabled />
          <Checkbox label="DISABLED CHECKED" disabled defaultChecked />
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

import { InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    const checkboxId = id || \`checkbox-\${Math.random().toString(36).substr(2, 9)}\`;

    return (
      <label
        htmlFor={checkboxId}
        className={\`inline-flex items-center gap-3 cursor-pointer group \${className}\`}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={\`
              w-7 h-7
              bg-white
              border-4 border-black
              shadow-[3px_3px_0_0_#000]
              transition-all duration-100 ease-out
              group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]
              group-hover:shadow-[5px_5px_0_0_#000]
              peer-checked:bg-[#FFFF00]
              peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            \`}
          />
          <svg
            className={\`
              absolute top-1 left-1
              w-5 h-5
              stroke-black stroke-[3]
              opacity-0
              peer-checked:opacity-100
              transition-opacity duration-100
            \`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <span className="text-base font-bold uppercase tracking-wide">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };`}
        </pre>
      </div>
    </div>
  );
}
