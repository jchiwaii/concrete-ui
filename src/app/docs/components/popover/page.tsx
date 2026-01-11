"use client";

import { Badge, Popover, PopoverTrigger, PopoverContent, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function PopoverPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          POPOVER
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Click-triggered content overlay with portal rendering and automatic
          positioning. Perfect for forms, menus, or additional information.
        </p>
      </div>

      {/* Basic Popover */}
      <ComponentPreview
        title="Basic Popover"
        description="Simple popover with custom content."
        code={`import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui";

<Popover>
  <PopoverTrigger>
    OPEN POPOVER
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-4">
      <h3 className="font-bold uppercase text-lg">POPOVER TITLE</h3>
      <p className="text-sm">
        This is the popover content. You can put anything here.
      </p>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>OPEN POPOVER</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-4">
                <h3 className="font-bold uppercase text-lg">POPOVER TITLE</h3>
                <p className="text-sm">
                  This is the popover content. You can put anything here
                  including forms, images, or other components.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      {/* With Form */}
      <ComponentPreview
        title="With Form Content"
        description="Use popovers for inline forms or settings."
        code={`<Popover>
  <PopoverTrigger>SETTINGS</PopoverTrigger>
  <PopoverContent>
    <div className="space-y-4">
      <h3 className="font-bold uppercase">SETTINGS</h3>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase">NAME</label>
        <input
          type="text"
          className="w-full px-3 py-2 border-4 border-black"
          placeholder="ENTER NAME"
        />
      </div>
      <button className="px-4 py-2 bg-black text-white">
        SAVE
      </button>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>SETTINGS</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-4">
                <h3 className="font-bold uppercase">SETTINGS</h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase block">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border-4 border-black outline-none focus:shadow-[2px_2px_0_0_#000]"
                    placeholder="ENTER NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase block">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border-4 border-black outline-none focus:shadow-[2px_2px_0_0_#000]"
                    placeholder="ENTER EMAIL"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-black text-white font-bold uppercase border-2 border-white shadow-[2px_2px_0_0_#fff] hover:shadow-[3px_3px_0_0_#fff]">
                  SAVE
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      {/* Different Placements */}
      <ComponentPreview
        title="Placement Options"
        description="Control where the popover appears."
        code={`<Popover>
  <PopoverTrigger>TOP</PopoverTrigger>
  <PopoverContent placement="top">
    <p>Content appears on top</p>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger>BOTTOM</PopoverTrigger>
  <PopoverContent placement="bottom">
    <p>Content appears on bottom</p>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex gap-6 justify-center">
          <Popover>
            <PopoverTrigger>TOP</PopoverTrigger>
            <PopoverContent placement="top">
              <p className="font-bold uppercase text-sm">
                CONTENT APPEARS ON TOP
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>BOTTOM</PopoverTrigger>
            <PopoverContent placement="bottom">
              <p className="font-bold uppercase text-sm">
                CONTENT APPEARS ON BOTTOM
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>LEFT</PopoverTrigger>
            <PopoverContent placement="left">
              <p className="font-bold uppercase text-sm">
                CONTENT APPEARS ON LEFT
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>RIGHT</PopoverTrigger>
            <PopoverContent placement="right">
              <p className="font-bold uppercase text-sm">
                CONTENT APPEARS ON RIGHT
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      {/* Rich Content */}
      <ComponentPreview
        title="Rich Content"
        description="Popovers can contain any React components."
        code={`<Popover>
  <PopoverTrigger>INFO</PopoverTrigger>
  <PopoverContent>
    <div className="space-y-3 max-w-xs">
      <h3 className="font-bold uppercase text-lg">DID YOU KNOW?</h3>
      <p className="text-sm">
        Neobrutalism is a design trend that features bold colors,
        thick borders, and hard shadows.
      </p>
      <ul className="text-sm space-y-1">
        <li>• NO ROUNDED CORNERS</li>
        <li>• THICK BLACK BORDERS</li>
        <li>• BOLD COLORS</li>
        <li>• HARD SHADOWS</li>
      </ul>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger>INFO</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-3 max-w-xs">
                <h3 className="font-bold uppercase text-lg border-b-4 border-black pb-2">
                  DID YOU KNOW?
                </h3>
                <p className="text-sm">
                  Neobrutalism is a design trend that features bold colors,
                  thick borders, and hard shadows.
                </p>
                <ul className="text-sm space-y-1 font-bold">
                  <li>• NO ROUNDED CORNERS</li>
                  <li>• THICK BLACK BORDERS</li>
                  <li>• BOLD COLORS</li>
                  <li>• HARD SHADOWS</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      {/* Usage Notes */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">USAGE NOTES</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-3 font-medium">
            <li>
              <strong className="uppercase">Click to Open:</strong> Unlike
              tooltips, popovers open on click, not hover
            </li>
            <li>
              <strong className="uppercase">Close Button:</strong> Includes an ×
              button in the top-right corner
            </li>
            <li>
              <strong className="uppercase">Click Outside:</strong> Clicking
              outside the popover will close it
            </li>
            <li>
              <strong className="uppercase">Escape Key:</strong> Press Escape to
              close the popover
            </li>
            <li>
              <strong className="uppercase">Portal Rendering:</strong> Renders in
              a portal to avoid z-index issues
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
