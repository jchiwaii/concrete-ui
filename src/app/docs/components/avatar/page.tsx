"use client";

import { Badge, Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function AvatarPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          AVATAR
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          User profile pictures with fallback support.
        </p>
      </div>

      {/* With Image */}
      <ComponentPreview
        title="With Image"
        description="Avatar displaying an image."
        code={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";

<Avatar>
  <AvatarImage src="/next.svg" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="User"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </ComponentPreview>

      {/* Fallback */}
      <ComponentPreview
        title="Fallback"
        description="When image is unavailable, show initials."
        code={`<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Avatar Sizes"
        description="Small, medium, large, and extra large."
        code={`<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </div>
      </ComponentPreview>

      {/* Group */}
      <ComponentPreview
        title="Avatar Group"
        description="Multiple avatars stacked."
        code={`<div className="flex -space-x-4">
  <Avatar className="relative z-30">...</Avatar>
  <Avatar className="relative z-20">...</Avatar>
  <Avatar className="relative z-10">...</Avatar>
</div>`}
      >
        <div className="flex -space-x-4">
          <Avatar className="relative z-30">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="relative z-20">
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar className="relative z-10">
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <Avatar className="relative">
            <AvatarFallback>+3</AvatarFallback>
          </Avatar>
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

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "w-10 h-10",
      md: "w-14 h-14",
      lg: "w-20 h-20",
      xl: "w-28 h-28",
    };

    return (
      <div
        ref={ref}
        className={\`
          relative overflow-hidden
          border-4 border-black
          shadow-[3px_3px_0_0_#000]
          \${sizes[size]}
          \${className}
        \`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// AvatarImage and AvatarFallback components...

export { Avatar, AvatarImage, AvatarFallback };`}
        </pre>
      </div>
    </div>
  );
}
