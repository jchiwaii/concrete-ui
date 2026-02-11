"use client";

import { Badge, Breadcrumb, BreadcrumbItem } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function BreadcrumbPage() {
  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          BREADCRUMB
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Navigation component showing the current page location within a hierarchy.
          Current page is highlighted with yellow background.
        </p>
      </div>

      {/* Basic Breadcrumb */}
      <ComponentPreview
        title="Basic Breadcrumb"
        description="Simple breadcrumb navigation with default separator."
        code={`import { Breadcrumb, BreadcrumbItem } from "@/components/ui";

<Breadcrumb>
  <BreadcrumbItem href="/">HOME</BreadcrumbItem>
  <BreadcrumbItem href="/docs">DOCS</BreadcrumbItem>
  <BreadcrumbItem current>BREADCRUMB</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbItem href="/">HOME</BreadcrumbItem>
          <BreadcrumbItem href="/docs">DOCS</BreadcrumbItem>
          <BreadcrumbItem current>BREADCRUMB</BreadcrumbItem>
        </Breadcrumb>
      </ComponentPreview>

      {/* Custom Separator */}
      <ComponentPreview
        title="Custom Separator"
        description="Use a custom separator character."
        code={`<Breadcrumb>
  <BreadcrumbItem href="/" separator="→">HOME</BreadcrumbItem>
  <BreadcrumbItem href="/products" separator="→">PRODUCTS</BreadcrumbItem>
  <BreadcrumbItem current>LAPTOP</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbItem href="/" separator="→">
            HOME
          </BreadcrumbItem>
          <BreadcrumbItem href="/products" separator="→">
            PRODUCTS
          </BreadcrumbItem>
          <BreadcrumbItem current>LAPTOP</BreadcrumbItem>
        </Breadcrumb>
      </ComponentPreview>

      {/* Long Breadcrumb */}
      <ComponentPreview
        title="Long Navigation Path"
        description="Breadcrumb with multiple levels."
        code={`<Breadcrumb>
  <BreadcrumbItem href="/">HOME</BreadcrumbItem>
  <BreadcrumbItem href="/docs">DOCS</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components">COMPONENTS</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components/navigation">NAVIGATION</BreadcrumbItem>
  <BreadcrumbItem current>BREADCRUMB</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbItem href="/">HOME</BreadcrumbItem>
          <BreadcrumbItem href="/docs">DOCS</BreadcrumbItem>
          <BreadcrumbItem href="/docs/components">COMPONENTS</BreadcrumbItem>
          <BreadcrumbItem href="/docs/components/navigation">
            NAVIGATION
          </BreadcrumbItem>
          <BreadcrumbItem current>BREADCRUMB</BreadcrumbItem>
        </Breadcrumb>
      </ComponentPreview>

      {/* Alternative Separator */}
      <ComponentPreview
        title="Different Separators"
        description="Examples with various separator styles."
        code={`// Using ">"
<Breadcrumb>
  <BreadcrumbItem href="/" separator=">">HOME</BreadcrumbItem>
  <BreadcrumbItem href="/shop" separator=">">SHOP</BreadcrumbItem>
  <BreadcrumbItem current>CART</BreadcrumbItem>
</Breadcrumb>

// Using "•"
<Breadcrumb>
  <BreadcrumbItem href="/" separator="•">HOME</BreadcrumbItem>
  <BreadcrumbItem href="/blog" separator="•">BLOG</BreadcrumbItem>
  <BreadcrumbItem current>POST</BreadcrumbItem>
</Breadcrumb>`}
      >
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbItem href="/" separator=">">
              HOME
            </BreadcrumbItem>
            <BreadcrumbItem href="/shop" separator=">">
              SHOP
            </BreadcrumbItem>
            <BreadcrumbItem current>CART</BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbItem href="/" separator="•">
              HOME
            </BreadcrumbItem>
            <BreadcrumbItem href="/blog" separator="•">
              BLOG
            </BreadcrumbItem>
            <BreadcrumbItem current>POST</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </ComponentPreview>
    </div>
  );
}
