"use client";

import { Badge, Skeleton, Card, CardContent } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function SkeletonPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          SKELETON
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Loading placeholder with pulsing animation.
        </p>
      </div>

      {/* Basic */}
      <ComponentPreview
        title="Basic Skeleton"
        description="Simple skeleton shapes."
        code={`import { Skeleton } from "@/components/ui";

<Skeleton className="w-full h-8" />
<Skeleton className="w-3/4 h-8" />
<Skeleton className="w-1/2 h-8" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-1/2 h-8" />
        </div>
      </ComponentPreview>

      {/* Card Skeleton */}
      <ComponentPreview
        title="Card Skeleton"
        description="Skeleton for card loading state."
        code={`<Card>
  <CardContent className="p-6 space-y-4">
    <Skeleton className="w-20 h-20" />
    <Skeleton className="w-full h-6" />
    <Skeleton className="w-3/4 h-4" />
    <Skeleton className="w-1/2 h-4" />
  </CardContent>
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </CardContent>
        </Card>
      </ComponentPreview>

      {/* User Card Skeleton */}
      <ComponentPreview
        title="User Card Skeleton"
        description="Loading state for user profile card."
        code={`<div className="flex items-center gap-4">
  <Skeleton className="w-14 h-14" />
  <div className="space-y-2">
    <Skeleton className="w-32 h-5" />
    <Skeleton className="w-24 h-4" />
  </div>
</div>`}
      >
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-24 h-4" />
          </div>
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

const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`
          bg-gray-200
          border-4 border-black
          animate-pulse
          \${className}
        \`}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };`}
        </pre>
      </div>
    </div>
  );
}
