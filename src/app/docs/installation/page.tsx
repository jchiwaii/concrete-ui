import Link from "next/link";
import { Badge, buttonStyles } from "@/components/ui";
import { CodeBlock } from "@/components/docs";

const requirements = ["React 19", "Tailwind CSS 4", "TypeScript"];

const steps = [
  {
    number: "01",
    title: "Load the typefaces",
    description: "Space Grotesk handles interface text; JetBrains Mono is reserved for code and numeric detail.",
    language: "css",
    code: `@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap");

body {
  font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
}`,
  },
  {
    number: "02",
    title: "Add the semantic foundation",
    description: "Keep the visual identity in tokens so component APIs stay independent from a specific palette.",
    language: "css",
    code: `:root {
  --ui-ink: #171714;
  --ui-canvas: #f4f1e8;
  --ui-surface: #fffef9;
  --ui-surface-muted: #ebe8df;
  --ui-muted: #6d6c64;
  --ui-accent: #ffd84d;
  --ui-accent-soft: #fff1ad;
  --ui-info: #9ed9f3;
  --ui-success: #8fd694;
  --ui-danger: #ff6b62;

  --ui-radius-sm: 6px;
  --ui-radius: 10px;
  --ui-radius-lg: 14px;
  --ui-shadow-sm: 2px 2px 0 var(--ui-ink);
  --ui-shadow: 3px 3px 0 var(--ui-ink);
  --ui-shadow-md: 4px 4px 0 var(--ui-ink);
}`,
  },
  {
    number: "03",
    title: "Copy the shared utility",
    description: "Components use a tiny class-name helper instead of requiring another runtime dependency.",
    language: "ts",
    code: `// src/lib/utils.ts
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}`,
  },
  {
    number: "04",
    title: "Own the components",
    description: "Copy only what the product needs, keep it in one predictable directory, and adapt it locally.",
    language: "text",
    code: `src/
  components/
    ui/
      button.tsx
      card.tsx
      field.tsx
      input.tsx
  lib/
    utils.ts`,
  },
];

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      <header className="border-b-2 border-black pb-8">
        <Badge variant="secondary" className="mb-4">Getting started</Badge>
        <h1 className="text-brutal-4xl font-bold tracking-[-0.045em]">Installation</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Concrete UI follows a copy-and-own workflow. Add the shared foundation once,
          then bring individual components into your project as you need them.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {requirements.map((requirement) => (
            <span key={requirement} className="rounded-full border-2 border-black bg-[var(--ui-surface)] px-3 py-1.5 text-xs font-semibold">
              {requirement}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-12">
        {steps.map((step) => (
          <section key={step.number} className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10">
            <div>
              <span className="font-mono text-xs font-bold text-gray-500">{step.number}</span>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.035em]">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{step.description}</p>
            </div>
            <CodeBlock language={step.language} code={step.code} />
          </section>
        ))}
      </div>

      <section className="rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-accent)] p-6 shadow-[var(--ui-shadow)] sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Choose a component and start composing.</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">Each page includes a working preview and the smallest useful implementation.</p>
        </div>
        <Link href="/docs/components" className={buttonStyles({ variant: "neutral", size: "lg", className: "mt-5 sm:mt-0" })}>
          Browse components
        </Link>
      </section>
    </div>
  );
}
