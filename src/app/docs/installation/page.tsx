import Link from "next/link";
import { buttonStyles } from "@/components/ui";
import { CodeBlock } from "@/components/docs";

const requirements = ["React 19", "Tailwind CSS 4", "TypeScript"];

const steps = [
  {
    number: "01",
    title: "Load the typefaces",
    description: "Barlow handles interface copy, Barlow Condensed carries command headings, and JetBrains Mono is reserved for technical data.",
    language: "css",
    code: `@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");\n\nbody {\n  font-family: "Barlow", ui-sans-serif, system-ui, sans-serif;\n}`,
  },
  {
    number: "02",
    title: "Establish the field palette",
    description: "Keep structure in semantic tokens so components remain adaptable without losing state contrast.",
    language: "css",
    code: `:root {\n  --ui-ink: #080a08;\n  --ui-canvas: #d8d5c8;\n  --ui-surface: #efede4;\n  --ui-surface-muted: #d0cec3;\n  --ui-muted: #5c6058;\n  --ui-accent: #f2c230;\n  --ui-info: #a7afa0;\n  --ui-success: #9cad72;\n  --ui-danger: #b85039;\n\n  --ui-radius: 0px;\n  --ui-shadow: 3px 3px 0 var(--ui-ink);\n}`,
  },
  {
    number: "03",
    title: "Add the shared utility",
    description: "The components only need a tiny class-name helper; there is no styling runtime to maintain.",
    language: "ts",
    code: `// src/lib/utils.ts\nexport type ClassValue = string | number | false | null | undefined;\n\nexport function cn(...values: ClassValue[]): string {\n  return values.filter(Boolean).join(" ");\n}`,
  },
  {
    number: "04",
    title: "Deploy only what you need",
    description: "Copy primitives into one predictable directory, then adapt their API and tokens locally.",
    language: "text",
    code: `src/\n  components/\n    ui/\n      button.tsx\n      field.tsx\n      input.tsx\n  lib/\n    utils.ts`,
  },
];

export default function InstallationPage() {
  return (
    <div className="docs-page-stack">
      <header className="docs-page-header">
        <p className="docs-kicker">Getting started / Deployment</p>
        <h1 className="docs-page-title">Initialize<br />the system.</h1>
        <p className="docs-page-copy">
          Concrete UI follows a copy-and-own workflow. Establish the visual protocol once,
          then bring individual React components into the project as they become necessary.
        </p>
        <div className="docs-component-meta" aria-label="Requirements">
          {requirements.map((requirement) => <span key={requirement} className="docs-meta-tag">{requirement}</span>)}
        </div>
      </header>

      <div>
        {steps.map((step) => (
          <section key={step.number} className="docs-install-step">
            <span className="docs-install-step-number">{step.number}</span>
            <div className="docs-install-step-copy">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
            <div className="docs-install-step-code">
              <CodeBlock language={step.language} code={step.code} />
            </div>
          </section>
        ))}
      </div>

      <section className="border border-[#f2c230] bg-[#f2c230] p-6 text-[#080a08] sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">Deployment window open</p>
          <h2 className="mt-2 font-['Barlow_Condensed'] text-2xl font-bold uppercase">Choose a component and begin composition.</h2>
        </div>
        <Link href="/docs/components" className={buttonStyles({ variant: "neutral", size: "lg", className: "mt-5 sm:mt-0" })}>
          Open component index →
        </Link>
      </section>
    </div>
  );
}
