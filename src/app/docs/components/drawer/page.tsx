"use client";

import { useState } from "react";
import { Badge, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function DrawerPage() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          DRAWER
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Side panel component with slide animations from any edge. Features
          backdrop overlay, escape key support, and body scroll locking.
        </p>
      </div>

      {/* Right Drawer (Default) */}
      <ComponentPreview
        title="Right Drawer (Default)"
        description="Drawer slides in from the right side."
        code={`import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
} from "@/components/ui";

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>OPEN DRAWER</Button>

  <Drawer open={open} onClose={() => setOpen(false)} direction="right">
    <DrawerContent>
      <DrawerClose onClose={() => setOpen(false)} />
      <DrawerHeader>
        <DrawerTitle>DRAWER TITLE</DrawerTitle>
        <DrawerDescription>
          This is a description of the drawer content.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerBody>
        <p>Your content goes here...</p>
      </DrawerBody>
      <DrawerFooter>
        <Button onClick={() => setOpen(false)}>CLOSE</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setRightOpen(true)}>OPEN RIGHT DRAWER</Button>
        </div>

        <Drawer
          open={rightOpen}
          onClose={() => setRightOpen(false)}
          direction="right"
        >
          <DrawerContent>
            <DrawerClose onClose={() => setRightOpen(false)} />
            <DrawerHeader>
              <DrawerTitle>RIGHT DRAWER</DrawerTitle>
              <DrawerDescription>
                This drawer slides in from the right side of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                <p className="font-medium">
                  This is the drawer body. You can put any content here
                  including forms, lists, or other components.
                </p>
                <div className="bg-gray-100 border-4 border-black p-4">
                  <p className="font-bold uppercase text-sm mb-2">FEATURES:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Portal rendering</li>
                    <li>• Backdrop overlay</li>
                    <li>• Escape key support</li>
                    <li>• Body scroll lock</li>
                  </ul>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setRightOpen(false)} variant="primary">
                CLOSE DRAWER
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentPreview>

      {/* All Directions */}
      <ComponentPreview
        title="All Directions"
        description="Drawers can slide from any edge: left, right, top, or bottom."
        code={`// From left
<Drawer open={open} onClose={onClose} direction="left">
  {/* ... */}
</Drawer>

// From right
<Drawer open={open} onClose={onClose} direction="right">
  {/* ... */}
</Drawer>

// From top
<Drawer open={open} onClose={onClose} direction="top">
  {/* ... */}
</Drawer>

// From bottom
<Drawer open={open} onClose={onClose} direction="bottom">
  {/* ... */}
</Drawer>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => setLeftOpen(true)}>LEFT</Button>
          <Button onClick={() => setRightOpen(true)}>RIGHT</Button>
          <Button onClick={() => setTopOpen(true)}>TOP</Button>
          <Button onClick={() => setBottomOpen(true)}>BOTTOM</Button>
        </div>

        {/* Left Drawer */}
        <Drawer
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          direction="left"
        >
          <DrawerContent>
            <DrawerClose onClose={() => setLeftOpen(false)} />
            <DrawerHeader>
              <DrawerTitle>LEFT DRAWER</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Slides in from the left side.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Top Drawer */}
        <Drawer
          open={topOpen}
          onClose={() => setTopOpen(false)}
          direction="top"
        >
          <DrawerContent>
            <DrawerClose onClose={() => setTopOpen(false)} />
            <DrawerHeader>
              <DrawerTitle>TOP DRAWER</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Slides in from the top.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Bottom Drawer */}
        <Drawer
          open={bottomOpen}
          onClose={() => setBottomOpen(false)}
          direction="bottom"
        >
          <DrawerContent>
            <DrawerClose onClose={() => setBottomOpen(false)} />
            <DrawerHeader>
              <DrawerTitle>BOTTOM DRAWER</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Slides in from the bottom.</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </ComponentPreview>

      {/* With Form */}
      <ComponentPreview
        title="With Form Content"
        description="Drawers are perfect for forms and settings panels."
        code={`<Drawer open={open} onClose={onClose}>
  <DrawerContent>
    <DrawerClose onClose={onClose} />
    <DrawerHeader>
      <DrawerTitle>CREATE ACCOUNT</DrawerTitle>
      <DrawerDescription>
        Fill in your details to get started.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <form className="space-y-4">
        <div>
          <label>NAME</label>
          <input type="text" />
        </div>
        <div>
          <label>EMAIL</label>
          <input type="email" />
        </div>
      </form>
    </DrawerBody>
    <DrawerFooter>
      <Button type="submit">CREATE ACCOUNT</Button>
      <Button variant="outline" onClick={onClose}>CANCEL</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setRightOpen(true)}>OPEN FORM</Button>
        </div>
      </ComponentPreview>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">FEATURES</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-3 font-medium">
            <li>
              <strong className="uppercase">Portal Rendering:</strong> Renders
              outside the DOM hierarchy to avoid z-index issues
            </li>
            <li>
              <strong className="uppercase">Backdrop Overlay:</strong> 50% black
              backdrop with click-to-close
            </li>
            <li>
              <strong className="uppercase">Body Scroll Lock:</strong> Prevents
              scrolling the page behind the drawer
            </li>
            <li>
              <strong className="uppercase">Escape Key:</strong> Press Escape to
              close the drawer
            </li>
            <li>
              <strong className="uppercase">4 Directions:</strong> Slide from
              left, right, top, or bottom
            </li>
            <li>
              <strong className="uppercase">Smooth Animations:</strong> 300ms
              slide animations with neobrutalist styling
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
