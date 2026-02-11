import { Badge, Card, CardContent } from "@/components/ui";
import { CodeBlock } from "@/components/docs";

const requirements = [
  "React 18+",
  "Tailwind CSS",
  "TypeScript (recommended)",
];

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      <section className="docs-panel p-7 md:p-8">
        <Badge variant="secondary" className="mb-4 uppercase">
          Getting Started
        </Badge>
        <h1 className="font-heading text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.9]">
          Installation
        </h1>
        <p className="mt-4 max-w-2xl text-brutal-lg text-gray-700">
          Set up Concrete UI in minutes and keep your product styling consistent from day one.
        </p>
      </section>

      <Card>
        <CardContent className="p-7">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">Requirements</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {requirements.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-lg border-2 border-black bg-gray-50 p-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-black bg-[#ffde00] text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card color="cyan">
        <CardContent className="p-7">
          <h2 className="text-brutal-xl font-extrabold uppercase">1. Add Fonts</h2>
          <p className="mt-3 text-sm text-gray-800">
            Include Space Grotesk and JetBrains Mono in your app.
          </p>
          <div className="mt-4">
            <CodeBlock
              language="html"
              code={`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-7">
          <h2 className="text-brutal-xl font-extrabold uppercase">2. Add Tokens</h2>
          <p className="mt-3 text-sm text-gray-700">
            Add the shared colors, shadows, and typography variables to your global stylesheet.
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`:root {
  --concrete-black: #000000;
  --concrete-white: #ffffff;
  --concrete-yellow: #ffde00;
  --concrete-cyan: #06b6d4;
  --concrete-magenta: #ec4899;
  --concrete-shadow: 4px 4px 0 #000;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card color="yellow">
        <CardContent className="p-7">
          <h2 className="text-brutal-xl font-extrabold uppercase">3. Copy Components</h2>
          <p className="mt-3 text-sm text-gray-800">
            Copy components from the docs into your `components/ui` folder.
          </p>
          <div className="mt-4">
            <CodeBlock
              language="bash"
              code={`src/
  components/
    ui/
      button.tsx
      card.tsx
      badge.tsx
      input.tsx
      ...`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
