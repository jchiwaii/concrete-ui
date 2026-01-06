"use client";

import { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function CardPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">COMPONENT</Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          CARD
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Versatile container component with thick borders, hard shadows, 
          and multiple color variants.
        </p>
      </div>

      {/* Basic Card */}
      <ComponentPreview
        title="Basic Card"
        description="Simple card with content."
        code={`import { Card, CardContent } from "@/components/ui";

<Card>
  <CardContent className="p-6">
    <p>This is a basic card with some content.</p>
  </CardContent>
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="p-6">
            <p>This is a basic card with some content.</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      {/* Full Card */}
      <ComponentPreview
        title="Full Card Structure"
        description="Card with header, content, and footer."
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";

<Card>
  <CardHeader>
    <CardTitle>CARD TITLE</CardTitle>
    <CardDescription>This is a description of the card.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here. Add whatever you need.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">ACTION</Button>
    <Button variant="outline">CANCEL</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>CARD TITLE</CardTitle>
            <CardDescription>This is a description of the card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content goes here. Add whatever you need.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary">ACTION</Button>
            <Button variant="outline">CANCEL</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* Color Variants */}
      <ComponentPreview
        title="Color Variants"
        description="Cards in different colors."
        code={`import { Card, CardContent } from "@/components/ui";

<Card color="white">White Card</Card>
<Card color="yellow">Yellow Card</Card>
<Card color="cyan">Cyan Card</Card>
<Card color="magenta">Magenta Card</Card>
<Card color="lime">Lime Card</Card>`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          <Card color="white">
            <CardContent className="p-4 text-center font-bold uppercase">White</CardContent>
          </Card>
          <Card color="yellow">
            <CardContent className="p-4 text-center font-bold uppercase">Yellow</CardContent>
          </Card>
          <Card color="cyan">
            <CardContent className="p-4 text-center font-bold uppercase">Cyan</CardContent>
          </Card>
          <Card color="magenta">
            <CardContent className="p-4 text-center font-bold uppercase text-white">Magenta</CardContent>
          </Card>
          <Card color="lime">
            <CardContent className="p-4 text-center font-bold uppercase">Lime</CardContent>
          </Card>
        </div>
      </ComponentPreview>

      {/* Variants */}
      <ComponentPreview
        title="Card Variants"
        description="Different shadow and hover styles."
        code={`import { Card, CardContent } from "@/components/ui";

<Card variant="default">Default</Card>
<Card variant="elevated">Elevated (hover me)</Card>
<Card variant="bordered">Bordered (no shadow)</Card>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Card variant="default">
            <CardContent className="p-4 font-bold uppercase">Default Card</CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 font-bold uppercase">Elevated Card (Hover Me)</CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="p-4 font-bold uppercase">Bordered Card</CardContent>
          </Card>
        </div>
      </ComponentPreview>

      {/* Full Code */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">FULL COMPONENT CODE</h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
{`import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "filled";
  color?: "white" | "yellow" | "cyan" | "magenta" | "lime";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", color = "white", children, ...props }, ref) => {
    const baseStyles = \`
      border-4 border-black
      transition-all duration-100 ease-out
    \`;

    const variants = {
      default: "shadow-[6px_6px_0_0_#000]",
      elevated: "shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:translate-x-[-4px] hover:translate-y-[-4px]",
      bordered: "shadow-none",
      filled: "shadow-[6px_6px_0_0_#000]",
    };

    const colors = {
      white: "bg-white",
      yellow: "bg-[#FFFF00]",
      cyan: "bg-[#00FFFF]",
      magenta: "bg-[#FF00FF]",
      lime: "bg-[#CCFF00]",
    };

    return (
      <div
        ref={ref}
        className={\`\${baseStyles} \${variants[variant]} \${colors[color]} \${className}\`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// CardHeader, CardTitle, CardDescription, CardContent, CardFooter components...
// (See full source for complete implementation)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };`}
        </pre>
      </div>
    </div>
  );
}
