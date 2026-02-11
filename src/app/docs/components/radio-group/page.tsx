"use client";

import { useState } from "react";
import { Badge, RadioGroup, RadioGroupItem } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function RadioGroupPage() {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          RADIO GROUP
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Mutually exclusive selection component with square brutalist styling.
          Uses Context API for state management with keyboard navigation support.
        </p>
      </div>

      {/* Default */}
      <ComponentPreview
        title="Default Radio Group"
        description="Basic radio group with vertical orientation."
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui";

const [value, setValue] = useState("medium");

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="small" label="SMALL" />
  <RadioGroupItem value="medium" label="MEDIUM" />
  <RadioGroupItem value="large" label="LARGE" />
</RadioGroup>`}
      >
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
          <RadioGroupItem value="small" label="SMALL" />
          <RadioGroupItem value="medium" label="MEDIUM" />
          <RadioGroupItem value="large" label="LARGE" />
        </RadioGroup>
      </ComponentPreview>

      {/* Horizontal Orientation */}
      <ComponentPreview
        title="Horizontal Layout"
        description="Radio groups can be displayed horizontally."
        code={`<RadioGroup
  value={value}
  onValueChange={setValue}
  orientation="horizontal"
>
  <RadioGroupItem value="red" label="RED" />
  <RadioGroupItem value="blue" label="BLUE" />
  <RadioGroupItem value="green" label="GREEN" />
</RadioGroup>`}
      >
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          orientation="horizontal"
        >
          <RadioGroupItem value="red" label="RED" />
          <RadioGroupItem value="blue" label="BLUE" />
          <RadioGroupItem value="green" label="GREEN" />
        </RadioGroup>
      </ComponentPreview>

      {/* Disabled State */}
      <ComponentPreview
        title="Disabled State"
        description="Radio groups and individual items can be disabled."
        code={`// Disabled group
<RadioGroup value="basic" disabled>
  <RadioGroupItem value="basic" label="BASIC" />
  <RadioGroupItem value="pro" label="PRO" />
</RadioGroup>

// Disabled individual items
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="basic" label="BASIC" />
  <RadioGroupItem value="pro" label="PRO" disabled />
  <RadioGroupItem value="enterprise" label="ENTERPRISE" />
</RadioGroup>`}
      >
        <div className="space-y-8">
          <div>
            <p className="text-sm font-bold uppercase mb-4 text-gray-600">
              Disabled Group
            </p>
            <RadioGroup value="basic" disabled>
              <RadioGroupItem value="basic" label="BASIC" />
              <RadioGroupItem value="pro" label="PRO" />
            </RadioGroup>
          </div>

          <div>
            <p className="text-sm font-bold uppercase mb-4 text-gray-600">
              Disabled Individual Items
            </p>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              <RadioGroupItem value="basic" label="BASIC" />
              <RadioGroupItem value="pro" label="PRO (DISABLED)" disabled />
              <RadioGroupItem value="enterprise" label="ENTERPRISE" />
            </RadioGroup>
          </div>
        </div>
      </ComponentPreview>

      {/* Without Labels */}
      <ComponentPreview
        title="Without Labels"
        description="Radio items can be used without labels for custom layouts."
        code={`<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" />
  <RadioGroupItem value="option2" />
  <RadioGroupItem value="option3" />
</RadioGroup>`}
      >
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize} orientation="horizontal">
          <RadioGroupItem value="small" />
          <RadioGroupItem value="medium" />
          <RadioGroupItem value="large" />
        </RadioGroup>
      </ComponentPreview>
    </div>
  );
}
