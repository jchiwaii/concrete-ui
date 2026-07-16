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
        <h1 className="text-brutal-4xl font-bold tracking-[-0.045em] mb-3">
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
<Button variant="success">SUCCESS</Button>
<Button variant="neutral">NEUTRAL</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="ghost">GHOST</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default">DEFAULT</Button>
          <Button variant="primary">PRIMARY</Button>
          <Button variant="secondary">SECONDARY</Button>
          <Button variant="danger">DANGER</Button>
          <Button variant="success">SUCCESS</Button>
          <Button variant="neutral">NEUTRAL</Button>
          <Button variant="outline">OUTLINE</Button>
          <Button variant="ghost">GHOST</Button>
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Button Sizes"
        description="Four sizes: small, medium, large, and extra large."
        code={`import { Button } from "@/components/ui";

<Button size="sm">SMALL</Button>
<Button size="md">MEDIUM</Button>
<Button size="lg">LARGE</Button>
<Button size="xl">EXTRA LARGE</Button>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">SMALL</Button>
          <Button size="md">MEDIUM</Button>
          <Button size="lg">LARGE</Button>
          <Button size="xl">EXTRA LARGE</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Rounded Button"
        description="Use rounded buttons when the surrounding UI needs softer controls."
        code={`import { Button } from "@/components/ui";

<Button rounded>ROUNDED BUTTON</Button>`}
      >
        <Button rounded>ROUNDED BUTTON</Button>
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
          <h3 className="text-xl font-semibold tracking-[-0.03em]">
            FULL COMPONENT CODE
          </h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
          {`import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "ghost"
    | "outline"
    | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      rounded = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = \`
      relative inline-flex items-center justify-center gap-2
      font-bold uppercase tracking-wide
      border-2 border-black
      transition-all duration-100 ease-out
      cursor-pointer select-none
      active:translate-y-[2px] active:translate-x-[2px] active:shadow-none
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:translate-x-0 disabled:hover:translate-y-0
      disabled:active:translate-x-0 disabled:active:translate-y-0
    \`;

    const variants = {
      default:
        "bg-white text-black shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      primary:
        "bg-[var(--ui-accent)] text-black shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      secondary:
        "bg-[var(--ui-info)] text-black shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      danger:
        "bg-[var(--ui-danger)] text-white shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      success:
        "bg-[var(--ui-success)] text-black shadow-[var(--ui-shadow)] hover:shadow-[var(--ui-shadow-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      neutral:
        "bg-gray-900 text-white shadow-[var(--ui-shadow)] hover:shadow-[6px_6px_0_0_#ffde00] hover:translate-x-[-2px] hover:translate-y-[-2px]",
      ghost: "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100 hover:shadow-none",
      outline: "bg-transparent text-black shadow-[var(--ui-shadow)] hover:bg-black hover:text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    const radiusStyles = rounded ? "rounded-full" : "rounded-md";

    return (
      <button
        ref={ref}
        className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${radiusStyles} \${className}\`}
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
