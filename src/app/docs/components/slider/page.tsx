"use client";

import { useState } from "react";
import { Badge, Slider } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function SliderPage() {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [temperature, setTemperature] = useState(20);
  const [vertical, setVertical] = useState(30);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          SLIDER
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Range input component with drag handling, keyboard support, and value
          display. Features a square thumb with bold neobrutalist styling.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Slider"
        description="Basic slider with value display."
        code={`import { Slider } from "@/components/ui";

const [value, setValue] = useState(50);

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>`}
      >
        <Slider value={volume} onChange={setVolume} min={0} max={100} />
      </ComponentPreview>

      {/* Custom Range */}
      <ComponentPreview
        title="Custom Range"
        description="Slider with custom min, max, and step values."
        code={`<Slider
  value={value}
  onChange={setValue}
  min={-10}
  max={40}
  step={0.5}
/>`}
      >
        <Slider
          value={temperature}
          onChange={setTemperature}
          min={-10}
          max={40}
          step={0.5}
        />
      </ComponentPreview>

      {/* Without Value Display */}
      <ComponentPreview
        title="Without Value Display"
        description="Hide the value label for a cleaner look."
        code={`<Slider
  value={value}
  onChange={setValue}
  showValue={false}
/>`}
      >
        <Slider
          value={brightness}
          onChange={setBrightness}
          showValue={false}
        />
      </ComponentPreview>

      {/* Disabled State */}
      <ComponentPreview
        title="Disabled State"
        description="Disabled sliders are non-interactive."
        code={`<Slider
  value={50}
  onChange={() => {}}
  disabled
/>`}
      >
        <Slider value={50} onChange={() => {}} disabled />
      </ComponentPreview>

      {/* Vertical Orientation */}
      <ComponentPreview
        title="Vertical Orientation"
        description="Sliders can be oriented vertically."
        code={`<Slider
  value={value}
  onChange={setValue}
  orientation="vertical"
/>`}
      >
        <div className="flex justify-center">
          <Slider
            value={vertical}
            onChange={setVertical}
            orientation="vertical"
          />
        </div>
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
                ←/→
              </kbd>{" "}
              - Decrease/increase value
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                Home
              </kbd>{" "}
              - Jump to minimum
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                End
              </kbd>{" "}
              - Jump to maximum
            </li>
            <li>
              <kbd className="px-2 py-1 bg-black text-white border-2 border-white">
                PgUp/PgDn
              </kbd>{" "}
              - Large increments
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
