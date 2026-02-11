"use client";

import { useState } from "react";
import { Badge, Toggle } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function TogglePage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TOGGLE
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          On/off switch with sliding knob and bold styling.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Toggle"
        description="Basic toggle switch."
        code={`import { useState } from "react";
import { Toggle } from "@/components/ui";

const [checked, setChecked] = useState(false);

<Toggle checked={checked} onChange={setChecked} />`}
      >
        <Toggle checked={checked1} onChange={setChecked1} />
      </ComponentPreview>

      {/* With Label */}
      <ComponentPreview
        title="With Label"
        description="Toggle with text label."
        code={`<Toggle label="DARK MODE" checked={checked} onChange={setChecked} />`}
      >
        <Toggle label="DARK MODE" checked={checked2} onChange={setChecked2} />
      </ComponentPreview>

      {/* Disabled */}
      <ComponentPreview
        title="Disabled State"
        description="Disabled toggle."
        code={`<Toggle label="DISABLED OFF" disabled />
<Toggle label="DISABLED ON" checked disabled />`}
      >
        <div className="space-y-4">
          <Toggle label="DISABLED OFF" disabled />
          <Toggle label="DISABLED ON" checked disabled />
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
          {`"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className = "", checked = false, onChange, label, disabled, ...props }, ref) => {
    return (
      <label
        className={\`inline-flex items-center gap-3 cursor-pointer \${disabled ? "opacity-50 cursor-not-allowed" : ""} \${className}\`}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          className={\`
            relative w-16 h-9
            border-4 border-black
            shadow-[3px_3px_0_0_#000]
            transition-all duration-100 ease-out
            hover:translate-x-[-2px] hover:translate-y-[-2px]
            hover:shadow-[5px_5px_0_0_#000]
            disabled:hover:translate-x-0 disabled:hover:translate-y-0
            disabled:hover:shadow-[3px_3px_0_0_#000]
            \${checked ? "bg-[#22c55e]" : "bg-white"}
          \`}
          {...props}
        >
          <span
            className={\`
              absolute top-0.5 w-6 h-6
              bg-black
              transition-all duration-100 ease-out
              \${checked ? "left-[calc(100%-26px)]" : "left-0.5"}
            \`}
          />
        </button>
        {label && (
          <span className="text-base font-bold uppercase tracking-wide">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };`}
        </pre>
      </div>
    </div>
  );
}
