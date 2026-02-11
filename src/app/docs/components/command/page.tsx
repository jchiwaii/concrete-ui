"use client";

import { useState } from "react";
import { Badge, Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, Button } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function CommandPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          COMMAND PALETTE
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Keyboard-first command menu with fuzzy search, grouped commands, and
          global shortcut (Cmd+K / Ctrl+K). Perfect for navigation and actions.
        </p>
      </div>

      {/* Global Shortcut */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">GLOBAL SHORTCUT</h2>
        <div className="bg-[#ffde00] border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <p className="font-bold uppercase mb-2">TRY IT NOW!</p>
          <p className="text-sm font-medium">
            Press{" "}
            <kbd className="px-3 py-1 bg-black text-white border-2 border-white font-bold">
              Cmd+K
            </kbd>{" "}
            (Mac) or{" "}
            <kbd className="px-3 py-1 bg-black text-white border-2 border-white font-bold">
              Ctrl+K
            </kbd>{" "}
            (Windows/Linux) anywhere on this page to open the command palette.
          </p>
        </div>
      </div>

      {/* Basic Command */}
      <ComponentPreview
        title="Basic Command Palette"
        description="Simple command palette with search and items."
        code={`import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui";

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>OPEN COMMAND</Button>

  <Command open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="SEARCH COMMANDS..." />
    <CommandList>
      <CommandItem onSelect={() => console.log("Home")}>
        🏠 GO HOME
      </CommandItem>
      <CommandItem onSelect={() => console.log("Settings")}>
        ⚙️ SETTINGS
      </CommandItem>
      <CommandItem onSelect={() => console.log("Help")}>
        ❓ HELP
      </CommandItem>
    </CommandList>
  </Command>
</>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setOpen(true)}>OPEN COMMAND PALETTE</Button>
        </div>

        <Command open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="SEARCH COMMANDS..." />
          <CommandList>
            <CommandItem onSelect={() => alert("Going home...")}>
              🏠 GO HOME
            </CommandItem>
            <CommandItem onSelect={() => alert("Opening settings...")}>
              ⚙️ SETTINGS
            </CommandItem>
            <CommandItem onSelect={() => alert("Opening help...")}>
              ❓ HELP
            </CommandItem>
            <CommandItem onSelect={() => alert("Logging out...")}>
              🚪 LOGOUT
            </CommandItem>
          </CommandList>
        </Command>
      </ComponentPreview>

      {/* With Groups */}
      <ComponentPreview
        title="Grouped Commands"
        description="Organize commands into labeled groups."
        code={`<Command open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="SEARCH..." />
  <CommandList>
    <CommandGroup heading="NAVIGATION">
      <CommandItem icon="🏠">HOME</CommandItem>
      <CommandItem icon="📄">DOCS</CommandItem>
      <CommandItem icon="🧩">COMPONENTS</CommandItem>
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="SETTINGS">
      <CommandItem icon="👤">PROFILE</CommandItem>
      <CommandItem icon="⚙️">PREFERENCES</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      >
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => setOpen(true)}>
            GROUPED COMMANDS
          </Button>
        </div>
      </ComponentPreview>

      {/* With Icons */}
      <ComponentPreview
        title="With Icons"
        description="Add icons to command items for better visual recognition."
        code={`<CommandItem icon="🎨" onSelect={() => {}}>
  CHANGE THEME
</CommandItem>

<CommandItem icon="🔔" onSelect={() => {}}>
  NOTIFICATIONS
</CommandItem>

<CommandItem icon="📊" onSelect={() => {}}>
  ANALYTICS
</CommandItem>`}
      >
        <div className="flex justify-center">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            COMMANDS WITH ICONS
          </Button>
        </div>
      </ComponentPreview>

      {/* Disabled Items */}
      <ComponentPreview
        title="Disabled Items"
        description="Mark certain commands as disabled."
        code={`<CommandItem onSelect={() => {}}>
  AVAILABLE ACTION
</CommandItem>

<CommandItem disabled>
  COMING SOON
</CommandItem>

<CommandItem onSelect={() => {}}>
  ANOTHER ACTION
</CommandItem>`}
      >
        <p className="text-sm text-gray-600 font-medium">
          Disabled items are shown with reduced opacity and cannot be selected.
        </p>
      </ComponentPreview>

      {/* Full Example */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">FULL EXAMPLE</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <pre className="font-mono text-sm overflow-x-auto">
            {`import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui";

<Command open={open} onOpenChange={setOpen} shortcut={true}>
  <CommandInput placeholder="TYPE A COMMAND OR SEARCH..." />

  <CommandList>
    <CommandGroup heading="NAVIGATION">
      <CommandItem
        icon="🏠"
        onSelect={() => router.push("/")}
      >
        GO HOME
      </CommandItem>
      <CommandItem
        icon="📄"
        onSelect={() => router.push("/docs")}
      >
        DOCUMENTATION
      </CommandItem>
      <CommandItem
        icon="🧩"
        onSelect={() => router.push("/components")}
      >
        COMPONENTS
      </CommandItem>
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="ACTIONS">
      <CommandItem
        icon="📝"
        onSelect={() => createNew()}
      >
        CREATE NEW
      </CommandItem>
      <CommandItem
        icon="💾"
        onSelect={() => save()}
      >
        SAVE CHANGES
      </CommandItem>
      <CommandItem
        icon="📤"
        onSelect={() => exportData()}
      >
        EXPORT DATA
      </CommandItem>
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="SETTINGS">
      <CommandItem
        icon="👤"
        onSelect={() => router.push("/profile")}
      >
        PROFILE
      </CommandItem>
      <CommandItem
        icon="⚙️"
        onSelect={() => router.push("/settings")}
      >
        SETTINGS
      </CommandItem>
      <CommandItem
        icon="🚪"
        onSelect={() => logout()}
      >
        LOGOUT
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
          </pre>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">
          KEYBOARD NAVIGATION
        </h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-2 font-mono text-sm">
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Cmd+K / Ctrl+K
              </kbd>{" "}
              - Open command palette
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                ↑/↓
              </kbd>{" "}
              - Navigate commands
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Enter
              </kbd>{" "}
              - Execute selected command
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Esc
              </kbd>{" "}
              - Close command palette
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Type
              </kbd>{" "}
              - Fuzzy search commands
            </li>
          </ul>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">FEATURES</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-3 font-medium">
            <li>
              <strong className="uppercase">Global Shortcut:</strong> Cmd+K /
              Ctrl+K opens from anywhere
            </li>
            <li>
              <strong className="uppercase">Fuzzy Search:</strong> Type to filter
              commands instantly
            </li>
            <li>
              <strong className="uppercase">Keyboard First:</strong> Navigate with
              arrows, execute with Enter
            </li>
            <li>
              <strong className="uppercase">Grouped Commands:</strong> Organize
              with labeled sections
            </li>
            <li>
              <strong className="uppercase">Icon Support:</strong> Add visual
              indicators to commands
            </li>
            <li>
              <strong className="uppercase">Auto-close:</strong> Closes after
              command execution
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
