"use client";

import { Badge } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function BadgePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          BADGE
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Small status indicators with bold colors and thick borders. Perfect
          for labels, tags, and status indicators.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Badge"
        description="Basic badge with default styling."
        code={`import { Badge } from "@/components/ui";

<Badge>DEFAULT</Badge>`}
      >
        <Badge>DEFAULT</Badge>
      </ComponentPreview>

      {/* Variants */}
      <ComponentPreview
        title="Badge Variants"
        description="Different color variants for various states."
        code={`import { Badge } from "@/components/ui";

<Badge variant="default">DEFAULT</Badge>
<Badge variant="primary">PRIMARY</Badge>
<Badge variant="secondary">SECONDARY</Badge>
<Badge variant="success">SUCCESS</Badge>
<Badge variant="warning">WARNING</Badge>
<Badge variant="danger">DANGER</Badge>`}
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">DEFAULT</Badge>
          <Badge variant="primary">PRIMARY</Badge>
          <Badge variant="secondary">SECONDARY</Badge>
          <Badge variant="success">SUCCESS</Badge>
          <Badge variant="warning">WARNING</Badge>
          <Badge variant="danger">DANGER</Badge>
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Badge Sizes"
        description="Three sizes available."
        code={`import { Badge } from "@/components/ui";

<Badge size="sm">SMALL</Badge>
<Badge size="md">MEDIUM</Badge>
<Badge size="lg">LARGE</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">SMALL</Badge>
          <Badge size="md">MEDIUM</Badge>
          <Badge size="lg">LARGE</Badge>
        </div>
      </ComponentPreview>

      {/* Use Cases */}
      <ComponentPreview
        title="Common Use Cases"
        description="Examples of badges in context."
        code={`<Badge variant="primary">NEW</Badge>
<Badge variant="success">ACTIVE</Badge>
<Badge variant="danger">SOLD OUT</Badge>
<Badge variant="warning">BETA</Badge>`}
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">NEW</Badge>
          <Badge variant="success">ACTIVE</Badge>
          <Badge variant="danger">SOLD OUT</Badge>
          <Badge variant="warning">BETA</Badge>
          <Badge variant="secondary">V2.0</Badge>
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
          {`import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = \`
      inline-flex items-center justify-center
      font-bold uppercase tracking-wider
      border-4 border-black
      shadow-[3px_3px_0_0_#000]
    \`;

    const variants = {
      default: "bg-white text-black",
      primary: "bg-[#FFFF00] text-black",
      secondary: "bg-[#00FFFF] text-black",
      danger: "bg-[#FF0000] text-white",
      success: "bg-[#00FF00] text-black",
      warning: "bg-[#FF6600] text-white",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };`}
        </pre>
      </div>
    </div>
  );
}
