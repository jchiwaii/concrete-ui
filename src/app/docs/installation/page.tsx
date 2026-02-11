import { Badge, Card, CardContent } from "@/components/ui";
import { CodeBlock } from "@/components/docs";

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="secondary" className="mb-4">
          GETTING STARTED
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          INSTALLATION
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Get Concrete UI up and running in your project in minutes.
        </p>
      </div>

      {/* Requirements */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-brutal-2xl font-extrabold uppercase mb-4">
            REQUIREMENTS
          </h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-[#FFFF00] border-4 border-black flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <span>
                <strong>React 18+</strong> — Components use modern React
                features
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-[#FFFF00] border-4 border-black flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <span>
                <strong>Tailwind CSS 3+</strong> — All styling uses Tailwind
                utilities
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-[#FFFF00] border-4 border-black flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <span>
                <strong>TypeScript</strong> — Optional but recommended
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Step 1: Fonts */}
      <Card color="cyan">
        <CardContent className="p-8">
          <h2 className="text-brutal-xl font-extrabold uppercase mb-4">
            STEP 1: ADD FONTS
          </h2>
          <p className="text-base mb-4">
            Add Space Grotesk (display) and JetBrains Mono (monospace) to your
            project:
          </p>
          <CodeBlock
            code={`<!-- Add to your HTML head or import in CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">`}
          />
        </CardContent>
      </Card>

      {/* Step 2: CSS Variables */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-brutal-xl font-extrabold uppercase mb-4">
            STEP 2: ADD CSS VARIABLES
          </h2>
          <p className="text-base mb-4">
            Add these design tokens to your global CSS file:
          </p>
          <CodeBlock
            code={`:root {
  /* Core Colors */
  --concrete-black: #000000;
  --concrete-white: #FFFFFF;
  --concrete-yellow: #FFFF00;
  --concrete-blue: #0000FF;
  --concrete-magenta: #FF00FF;
  --concrete-cyan: #00FFFF;
  --concrete-red: #FF0000;
  --concrete-green: #00FF00;
  --concrete-orange: #FF6600;
  --concrete-lime: #CCFF00;
  
  /* Border & Shadow */
  --concrete-border-width: 4px;
  --concrete-shadow: 6px 6px 0 var(--concrete-black);
  --concrete-shadow-sm: 4px 4px 0 var(--concrete-black);
  --concrete-shadow-lg: 8px 8px 0 var(--concrete-black);
  
  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Transitions */
  --concrete-transition: all 0.1s ease-out;
}`}
          />
        </CardContent>
      </Card>

      {/* Step 3: Copy Components */}
      <Card color="yellow">
        <CardContent className="p-8">
          <h2 className="text-brutal-xl font-extrabold uppercase mb-4">
            STEP 3: COPY COMPONENTS
          </h2>
          <p className="text-base mb-4">
            Browse the components documentation and copy the ones you need into
            your project. We recommend creating a{" "}
            <code className="bg-black text-[#FFFF00] px-2 py-0.5 border-2 border-black font-bold">
              components/ui
            </code>{" "}
            folder:
          </p>
          <CodeBlock
            code={`your-project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── input.tsx
│   │       └── ...
│   └── ...
└── ...`}
          />
        </CardContent>
      </Card>

      {/* Step 4: Usage */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-brutal-xl font-extrabold uppercase mb-4">
            STEP 4: USE COMPONENTS
          </h2>
          <p className="text-base mb-4">
            Import and use components in your React files:
          </p>
          <CodeBlock
            code={`import { Button, Card, CardContent, Badge } from "@/components/ui";

export default function MyPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <Badge variant="primary">NEW</Badge>
        <h2 className="text-2xl font-extrabold uppercase mt-4">
          Hello Brutal World
        </h2>
        <Button variant="primary" className="mt-4">
          CLICK ME
        </Button>
      </CardContent>
    </Card>
  );
}`}
          />
        </CardContent>
      </Card>

      {/* Tips */}
      <Card color="magenta">
        <CardContent className="p-8">
          <h2 className="text-brutal-xl font-extrabold uppercase mb-4 text-white">
            PRO TIPS
          </h2>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-3">
              <span className="font-bold">→</span>
              <span>
                Use <strong>uppercase text</strong> for buttons, badges, and
                labels
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">→</span>
              <span>
                Keep border radius <strong>0-4px max</strong> for the brutalist
                look
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">→</span>
              <span>
                Use <strong>bold, saturated colors</strong> — avoid pastels
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">→</span>
              <span>
                Keep transitions <strong>snappy (100ms)</strong> — no slow fades
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">→</span>
              <span>
                Add <strong>generous padding</strong> — chunky is good
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
