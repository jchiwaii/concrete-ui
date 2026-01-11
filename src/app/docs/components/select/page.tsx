"use client";

import { useState } from "react";
import { Badge, Select, type SelectOption } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "APPLE" },
  { value: "banana", label: "BANANA" },
  { value: "orange", label: "ORANGE" },
  { value: "grape", label: "GRAPE" },
  { value: "mango", label: "MANGO" },
];

const colorOptions: SelectOption[] = [
  { value: "red", label: "RED" },
  { value: "blue", label: "BLUE" },
  { value: "green", label: "GREEN" },
  { value: "yellow", label: "YELLOW" },
];

export default function SelectPage() {
  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchableFruit, setSearchableFruit] = useState("");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          SELECT
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Dropdown select component with portal rendering, keyboard navigation,
          and optional search functionality. Features bold neobrutalist styling.
        </p>
      </div>

      {/* Basic Usage */}
      <ComponentPreview
        title="Basic Select"
        description="A standard select dropdown with keyboard navigation support."
        code={`import { Select, SelectOption } from "@/components/ui";

const options: SelectOption[] = [
  { value: "apple", label: "APPLE" },
  { value: "banana", label: "BANANA" },
  { value: "orange", label: "ORANGE" },
];

<Select
  value={value}
  onChange={setValue}
  options={options}
  placeholder="SELECT FRUIT"
/>`}
      >
        <Select
          value={selectedFruit}
          onChange={setSelectedFruit}
          options={fruitOptions}
          placeholder="SELECT FRUIT"
        />
      </ComponentPreview>

      {/* Searchable Select */}
      <ComponentPreview
        title="Searchable Select"
        description="Enable search to filter options as you type."
        code={`<Select
  value={value}
  onChange={setValue}
  options={options}
  searchable
  placeholder="SEARCH FRUITS"
/>`}
      >
        <Select
          value={searchableFruit}
          onChange={setSearchableFruit}
          options={fruitOptions}
          searchable
          placeholder="SEARCH FRUITS"
        />
      </ComponentPreview>

      {/* Disabled Select */}
      <ComponentPreview
        title="Disabled State"
        description="Disabled selects are non-interactive with reduced opacity."
        code={`<Select
  value="apple"
  onChange={() => {}}
  options={options}
  disabled
/>`}
      >
        <Select
          value="apple"
          onChange={() => {}}
          options={colorOptions}
          disabled
        />
      </ComponentPreview>

      {/* With Disabled Options */}
      <ComponentPreview
        title="Disabled Options"
        description="Individual options can be disabled."
        code={`const options: SelectOption[] = [
  { value: "red", label: "RED" },
  { value: "blue", label: "BLUE", disabled: true },
  { value: "green", label: "GREEN" },
];

<Select
  value={value}
  onChange={setValue}
  options={options}
/>`}
      >
        <Select
          value={selectedColor}
          onChange={setSelectedColor}
          options={[
            { value: "red", label: "RED" },
            { value: "blue", label: "BLUE", disabled: true },
            { value: "green", label: "GREEN" },
            { value: "yellow", label: "YELLOW" },
          ]}
          placeholder="SELECT COLOR"
        />
      </ComponentPreview>

      {/* Keyboard Navigation */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">
          KEYBOARD NAVIGATION
        </h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-2 font-mono text-sm">
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Enter/Space
              </kbd>{" "}
              - Open dropdown
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                ↑/↓
              </kbd>{" "}
              - Navigate options
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Enter
              </kbd>{" "}
              - Select option
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Esc
              </kbd>{" "}
              - Close dropdown
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
