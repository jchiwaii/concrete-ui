"use client";

import { Badge, Tooltip, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function TooltipPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TOOLTIP
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Hover-triggered information overlay with portal rendering and automatic
          positioning. Shows after a configurable delay with bold styling.
        </p>
      </div>

      {/* Basic Tooltip */}
      <ComponentPreview
        title="Basic Tooltip"
        description="Simple tooltip with default dark variant."
        code={`import { Tooltip, Button } from "@/components/ui";

<Tooltip content="THIS IS A TOOLTIP">
  <Button>HOVER ME</Button>
</Tooltip>`}
      >
        <div className="flex justify-center">
          <Tooltip content="THIS IS A TOOLTIP">
            <Button>HOVER ME</Button>
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Light Variant */}
      <ComponentPreview
        title="Light Variant"
        description="Tooltip with light background and black text."
        code={`<Tooltip content="LIGHT TOOLTIP" variant="light">
  <Button variant="primary">HOVER FOR LIGHT</Button>
</Tooltip>`}
      >
        <div className="flex justify-center">
          <Tooltip content="LIGHT TOOLTIP" variant="light">
            <Button variant="primary">HOVER FOR LIGHT</Button>
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Different Placements */}
      <ComponentPreview
        title="Tooltip Placement"
        description="Control where the tooltip appears relative to the trigger."
        code={`<Tooltip content="TOP TOOLTIP" placement="top">
  <Button>TOP</Button>
</Tooltip>

<Tooltip content="BOTTOM TOOLTIP" placement="bottom">
  <Button>BOTTOM</Button>
</Tooltip>

<Tooltip content="LEFT TOOLTIP" placement="left">
  <Button>LEFT</Button>
</Tooltip>

<Tooltip content="RIGHT TOOLTIP" placement="right">
  <Button>RIGHT</Button>
</Tooltip>`}
      >
        <div className="flex flex-wrap gap-6 justify-center">
          <Tooltip content="TOP TOOLTIP" placement="top">
            <Button>TOP</Button>
          </Tooltip>

          <Tooltip content="BOTTOM TOOLTIP" placement="bottom">
            <Button>BOTTOM</Button>
          </Tooltip>

          <Tooltip content="LEFT TOOLTIP" placement="left">
            <Button>LEFT</Button>
          </Tooltip>

          <Tooltip content="RIGHT TOOLTIP" placement="right">
            <Button>RIGHT</Button>
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Custom Delay */}
      <ComponentPreview
        title="Custom Delay"
        description="Adjust the hover delay before showing the tooltip."
        code={`// Instant (no delay)
<Tooltip content="INSTANT!" delay={0}>
  <Button>NO DELAY</Button>
</Tooltip>

// Long delay (1 second)
<Tooltip content="PATIENT TOOLTIP" delay={1000}>
  <Button>LONG DELAY</Button>
</Tooltip>`}
      >
        <div className="flex gap-6 justify-center">
          <Tooltip content="INSTANT!" delay={0}>
            <Button>NO DELAY</Button>
          </Tooltip>

          <Tooltip content="PATIENT TOOLTIP" delay={1000}>
            <Button variant="secondary">LONG DELAY (1s)</Button>
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* On Text */}
      <ComponentPreview
        title="On Text Elements"
        description="Tooltips work on any element, not just buttons."
        code={`<Tooltip content="HELP TEXT HERE">
  <span className="underline cursor-help font-bold">
    HOVER FOR HELP
  </span>
</Tooltip>`}
      >
        <div className="flex justify-center">
          <Tooltip content="HELP TEXT HERE">
            <span className="underline cursor-help font-bold uppercase">
              HOVER FOR HELP
            </span>
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Usage Notes */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">USAGE NOTES</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-3 font-medium">
            <li>
              <strong className="uppercase">Portal Rendering:</strong> Tooltips
              render in a portal to avoid z-index issues
            </li>
            <li>
              <strong className="uppercase">Auto Positioning:</strong> Automatically
              adjusts position to stay within viewport
            </li>
            <li>
              <strong className="uppercase">Default Delay:</strong> 500ms hover
              delay before showing (configurable)
            </li>
            <li>
              <strong className="uppercase">Instant Hide:</strong> Disappears
              immediately when mouse leaves trigger
            </li>
            <li>
              <strong className="uppercase">Accessibility:</strong> Uses role="tooltip"
              for screen readers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
