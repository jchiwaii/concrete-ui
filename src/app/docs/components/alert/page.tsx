"use client";

import { Badge, Alert, AlertTitle, AlertDescription } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function AlertPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          ALERT
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Notification banners with icons and multiple severity levels.
        </p>
      </div>

      {/* Variants */}
      <ComponentPreview
        title="Alert Variants"
        description="Different alert types for various contexts."
        code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui";

<Alert variant="default">
  <AlertTitle>DEFAULT ALERT</AlertTitle>
  <AlertDescription>This is a default alert message.</AlertDescription>
</Alert>

<Alert variant="info">...</Alert>
<Alert variant="success">...</Alert>
<Alert variant="warning">...</Alert>
<Alert variant="danger">...</Alert>`}
      >
        <div className="w-full space-y-4">
          <Alert variant="default">
            <AlertTitle>DEFAULT ALERT</AlertTitle>
            <AlertDescription>
              This is a default alert message.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>INFO</AlertTitle>
            <AlertDescription>
              Here&apos;s some useful information for you.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>SUCCESS</AlertTitle>
            <AlertDescription>
              Your action was completed successfully!
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>WARNING</AlertTitle>
            <AlertDescription>
              Please be aware of this important notice.
            </AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>DANGER</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      {/* Simple */}
      <ComponentPreview
        title="Simple Alert"
        description="Alert with just text content."
        code={`<Alert variant="warning">
  This is a simple warning message without title.
</Alert>`}
      >
        <div className="w-full">
          <Alert variant="warning">
            This is a simple warning message without title.
          </Alert>
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

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "info" | "success" | "warning" | "danger";
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles = \`
      p-4
      border-4 border-black
      shadow-[4px_4px_0_0_#000]
    \`;

    const variants = {
      default: "bg-white",
      info: "bg-[#06b6d4]",
      success: "bg-[#22c55e]",
      warning: "bg-[#ffde00]",
      danger: "bg-[#ef4444] text-white",
    };

    const icons = {
      default: "ℹ",
      info: "ℹ",
      success: "✓",
      warning: "⚠",
      danger: "✕",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={\`\${baseStyles} \${variants[variant]} \${className}\`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl font-bold flex-shrink-0">{icons[variant]}</span>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

// AlertTitle and AlertDescription components...

export { Alert, AlertTitle, AlertDescription };`}
        </pre>
      </div>
    </div>
  );
}
