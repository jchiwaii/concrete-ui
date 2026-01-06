import Link from "next/link";
import { Badge, Button, Card, CardContent } from "@/components/ui";

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">DOCUMENTATION</Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          INTRODUCTION
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Welcome to <strong>Concrete UI</strong> — a neo brutalist component library for React.
          Bold borders, hard shadows, saturated colors. No subtlety, no compromise.
        </p>
      </div>

      {/* What is Concrete UI */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-brutal-2xl font-extrabold uppercase mb-4">
            WHAT IS CONCRETE UI?
          </h2>
          <div className="space-y-4 text-base">
            <p>
              Concrete UI is a collection of copy-paste React components designed in the 
              <strong> neo brutalist</strong> style. Inspired by the raw, honest aesthetic of 
              brutalist architecture, these components feature:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-3">
                <span className="bg-[#FFFF00] px-2 py-0.5 border-2 border-black font-bold text-sm">01</span>
                <span><strong>Thick black borders</strong> (4-6px) on every component</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#00FFFF] px-2 py-0.5 border-2 border-black font-bold text-sm">02</span>
                <span><strong>Hard drop shadows</strong> for depth and dimension</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#FF00FF] px-2 py-0.5 border-2 border-black font-bold text-sm">03</span>
                <span><strong>Saturated, bold colors</strong> — no pastels, no subtlety</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#00FF00] px-2 py-0.5 border-2 border-black font-bold text-sm">04</span>
                <span><strong>Sharp corners</strong> — minimal to no border radius</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#FF6600] px-2 py-0.5 border-2 border-black font-bold text-sm text-white">05</span>
                <span><strong>Abrupt transitions</strong> — 100ms max for snappy feedback</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Design Philosophy */}
      <Card color="yellow">
        <CardContent className="p-8">
          <h2 className="text-brutal-2xl font-extrabold uppercase mb-4">
            DESIGN PHILOSOPHY
          </h2>
          <div className="space-y-4 text-base">
            <p>
              Neo brutalism in UI design is about <strong>honesty and confidence</strong>. 
              It rejects the sanitized, rounded, gradient-heavy aesthetics that dominate 
              modern interfaces. Instead, it embraces:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 border-4 border-black">
                <h3 className="font-extrabold uppercase mb-2">RAW HONESTY</h3>
                <p className="text-sm">Components that look like what they are. No hiding behind soft curves.</p>
              </div>
              <div className="bg-white p-4 border-4 border-black">
                <h3 className="font-extrabold uppercase mb-2">VISUAL WEIGHT</h3>
                <p className="text-sm">Chunky, substantial elements that demand attention.</p>
              </div>
              <div className="bg-white p-4 border-4 border-black">
                <h3 className="font-extrabold uppercase mb-2">BOLD EXPRESSION</h3>
                <p className="text-sm">High contrast, saturated colors, uppercase typography.</p>
              </div>
              <div className="bg-white p-4 border-4 border-black">
                <h3 className="font-extrabold uppercase mb-2">PLAYFUL REBELLION</h3>
                <p className="text-sm">Breaking conventions while remaining functional.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-brutal-2xl font-extrabold uppercase mb-4">
            GETTING STARTED
          </h2>
          <p className="text-base mb-6">
            Ready to add some brutalist energy to your project? Follow these steps:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/docs/installation">
              <Button variant="primary" size="lg">
                INSTALLATION GUIDE
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button variant="outline" size="lg">
                VIEW COMPONENTS
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Credits */}
      <div className="text-center py-8 border-t-4 border-black">
        <p className="text-sm text-gray-600 uppercase tracking-wider">
          Built with React, Tailwind CSS, and brutal honesty.
        </p>
      </div>
    </div>
  );
}
