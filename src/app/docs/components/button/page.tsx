"use client";

import { Badge, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function ButtonPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          BUTTON
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Chunky, bold buttons with thick borders and hard shadows. Interactive
          states include hover transforms and shadow shifts.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Button"
        description="The standard button with white background."
        code={`import { Button } from "@/components/ui";

<Button>DEFAULT BUTTON</Button>`}
      >
        <Button>DEFAULT BUTTON</Button>
      </ComponentPreview>

      {/* Variants */}
      <ComponentPreview
        title="Button Variants"
        description="Different color variants for various use cases."
        code={`import { Button } from "@/components/ui";

<Button variant="default">DEFAULT</Button>
<Button variant="primary">PRIMARY</Button>
<Button variant="secondary">SECONDARY</Button>
<Button variant="danger">DANGER</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="ghost">GHOST</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default">DEFAULT</Button>
          <Button variant="primary">PRIMARY</Button>
          <Button variant="secondary">SECONDARY</Button>
          <Button variant="danger">DANGER</Button>
          <Button variant="outline">OUTLINE</Button>
          <Button variant="ghost">GHOST</Button>
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Button Sizes"
        description="Three sizes: small, medium, and large."
        code={`import { Button } from "@/components/ui";

<Button size="sm">SMALL</Button>
<Button size="md">MEDIUM</Button>
<Button size="lg">LARGE</Button>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">SMALL</Button>
          <Button size="md">MEDIUM</Button>
          <Button size="lg">LARGE</Button>
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <ComponentPreview
        title="Disabled State"
        description="Buttons can be disabled."
        code={`import { Button } from "@/components/ui";

<Button disabled>DISABLED</Button>
<Button variant="primary" disabled>DISABLED PRIMARY</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>DISABLED</Button>
          <Button variant="primary" disabled>
            DISABLED PRIMARY
          </Button>
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
          {`import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = \`
      inline-flex items-center justify-center
      font-bold uppercase tracking-wider
      border-4 border-black
      transition-all duration-100 ease-out
      hover:translate-x-[-4px] hover:translate-y-[-4px]
      hover:shadow-[8px_8px_0_0_#000]
      active:translate-x-0 active:translate-y-0
      active:shadow-none
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:translate-x-0 disabled:hover:translate-y-0
      disabled:hover:shadow-[4px_4px_0_0_#000]
    \`;

    const variants = {
      default: "bg-white text-black shadow-[4px_4px_0_0_#000]",
      primary: "bg-[#ffde00] text-black shadow-[4px_4px_0_0_#000]",
      secondary: "bg-[#06b6d4] text-black shadow-[4px_4px_0_0_#000]",
      danger: "bg-[#ef4444] text-white shadow-[4px_4px_0_0_#000]",
      ghost: "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100 hover:shadow-none",
      outline: "bg-transparent text-black shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };`}
        </pre>
      </div>
    </div>
  );
}
