"use client";

import { Badge, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function DropdownMenuPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          DROPDOWN MENU
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Contextual menu component with portal rendering, keyboard navigation,
          and support for separators and labels. Click outside or press Escape to close.
        </p>
      </div>

      {/* Basic Menu */}
      <ComponentPreview
        title="Basic Dropdown Menu"
        description="Simple dropdown with menu items."
        code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";

<DropdownMenu>
  <DropdownMenuTrigger>
    OPEN MENU
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => console.log("Edit")}>
      EDIT
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log("Duplicate")}>
      DUPLICATE
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log("Delete")}>
      DELETE
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>OPEN MENU</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => alert("Edit clicked")}>
              EDIT
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Duplicate clicked")}>
              DUPLICATE
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Delete clicked")}>
              DELETE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      {/* With Separators */}
      <ComponentPreview
        title="With Separators"
        description="Group menu items using separators."
        code={`<DropdownMenu>
  <DropdownMenuTrigger>OPTIONS</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>NEW FILE</DropdownMenuItem>
    <DropdownMenuItem>NEW FOLDER</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>SETTINGS</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>LOGOUT</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>OPTIONS</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {}}>NEW FILE</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>NEW FOLDER</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => {}}>SETTINGS</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => {}}>LOGOUT</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      {/* With Labels */}
      <ComponentPreview
        title="With Labels"
        description="Add labels to group related items."
        code={`<DropdownMenu>
  <DropdownMenuTrigger>ACCOUNT</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>MY ACCOUNT</DropdownMenuLabel>
    <DropdownMenuItem>PROFILE</DropdownMenuItem>
    <DropdownMenuItem>BILLING</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>TEAM</DropdownMenuLabel>
    <DropdownMenuItem>INVITE USERS</DropdownMenuItem>
    <DropdownMenuItem>TEAM SETTINGS</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>ACCOUNT</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>MY ACCOUNT</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => {}}>PROFILE</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>BILLING</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>TEAM</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => {}}>INVITE USERS</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>TEAM SETTINGS</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      {/* Disabled Items */}
      <ComponentPreview
        title="Disabled Items"
        description="Individual menu items can be disabled."
        code={`<DropdownMenu>
  <DropdownMenuTrigger>ACTIONS</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>SAVE</DropdownMenuItem>
    <DropdownMenuItem disabled>PUBLISH (COMING SOON)</DropdownMenuItem>
    <DropdownMenuItem>EXPORT</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>ACTIONS</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {}}>SAVE</DropdownMenuItem>
            <DropdownMenuItem disabled>PUBLISH (COMING SOON)</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>EXPORT</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      {/* With Custom Trigger */}
      <ComponentPreview
        title="Custom Trigger"
        description="Use any component as a trigger with asChild prop."
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="primary">CUSTOM TRIGGER</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>OPTION 1</DropdownMenuItem>
    <DropdownMenuItem>OPTION 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary">CUSTOM TRIGGER</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {}}>OPTION 1</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>OPTION 2</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>OPTION 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>
    </div>
  );
}
