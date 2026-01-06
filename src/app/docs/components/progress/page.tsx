"use client";

import { Badge, Progress } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function ProgressPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">COMPONENT</Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          PROGRESS
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Progress bar showing completion status with bold styling.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Progress"
        description="Basic progress bar."
        code={`import { Progress } from "@/components/ui";

<Progress value={60} />`}
      >
        <div className="w-full max-w-md">
          <Progress value={60} />
        </div>
      </ComponentPreview>

      {/* Values */}
      <ComponentPreview
        title="Different Values"
        description="Progress at various percentages."
        code={`<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm font-bold">0%</span>
            <Progress value={0} className="flex-1" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm font-bold">25%</span>
            <Progress value={25} className="flex-1" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm font-bold">50%</span>
            <Progress value={50} className="flex-1" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm font-bold">75%</span>
            <Progress value={75} className="flex-1" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 text-sm font-bold">100%</span>
            <Progress value={100} className="flex-1" />
          </div>
        </div>
      </ComponentPreview>

      {/* Colors */}
      <ComponentPreview
        title="Color Variants"
        description="Progress bars in different colors."
        code={`<Progress value={60} color="default" />
<Progress value={60} color="primary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="danger" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <Progress value={60} color="default" />
          <Progress value={60} color="primary" />
          <Progress value={60} color="success" />
          <Progress value={60} color="warning" />
          <Progress value={60} color="danger" />
        </div>
      </ComponentPreview>

      {/* Full Code */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">FULL COMPONENT CODE</h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
{`import { HTMLAttributes, forwardRef } from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: "default" | "primary" | "success" | "warning" | "danger";
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value, max = 100, color = "default", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
      default: "bg-black",
      primary: "bg-[#FFFF00]",
      success: "bg-[#00FF00]",
      warning: "bg-[#FF6600]",
      danger: "bg-[#FF0000]",
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={\`
          w-full h-8
          bg-white
          border-4 border-black
          shadow-[4px_4px_0_0_#000]
          overflow-hidden
          \${className}
        \`}
        {...props}
      >
        <div
          className={\`h-full transition-all duration-100 ease-out \${colors[color]}\`}
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };`}
        </pre>
      </div>
    </div>
  );
}
