import Link from "next/link";
import { Button, Card, CardContent, Badge, Input } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold uppercase tracking-tight">
              CONCRETE<span className="text-[#FFFF00] bg-black px-1">UI</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/docs"
              className="px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FFFF00] border-2 border-transparent hover:border-black transition-all duration-100"
            >
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FFFF00] border-2 border-transparent hover:border-black transition-all duration-100"
            >
              Components
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-bold uppercase tracking-wider bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-100"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="primary"
            size="lg"
            className="mb-6 animate-brutal-slide-up"
          >
            NEO BRUTALIST
          </Badge>
          <h1 className="text-brutal-5xl font-extrabold uppercase tracking-tight leading-none mb-6 animate-brutal-slide-up stagger-1">
            CONCRETE<span className="text-[#FFFF00] bg-black px-2">UI</span>
          </h1>
          <p className="text-brutal-xl max-w-2xl mx-auto mb-10 animate-brutal-slide-up stagger-2">
            Bold, unapologetic UI components with thick borders, hard shadows,
            and raw aesthetics.
            <span className="font-extrabold"> Copy & paste</span> into your
            React projects.
          </p>
          <div className="flex items-center justify-center gap-4 animate-brutal-slide-up stagger-3">
            <Link href="/docs">
              <Button variant="primary" size="lg">
                GET STARTED
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button variant="outline" size="lg">
                VIEW COMPONENTS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 border-y-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-brutal-3xl font-extrabold uppercase tracking-tight text-center mb-12">
            WHY CONCRETE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" color="yellow">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-extrabold uppercase mb-2">
                  BOLD DESIGN
                </h3>
                <p className="text-base">
                  Thick borders, hard shadows, and saturated colors. No
                  gradients, no subtlety.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" color="cyan">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-extrabold uppercase mb-2">
                  COPY & PASTE
                </h3>
                <p className="text-base">
                  Just copy the component code into your project. No package
                  installation needed.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" color="magenta">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-extrabold uppercase mb-2">
                  FAST & LIGHT
                </h3>
                <p className="text-base">
                  Pure React + Tailwind. No heavy dependencies. Maximum
                  performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-brutal-3xl font-extrabold uppercase tracking-tight text-center mb-12">
            SAMPLE COMPONENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons Preview */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-extrabold uppercase mb-6 border-b-4 border-black pb-2">
                  Buttons
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">DEFAULT</Button>
                  <Button variant="primary">PRIMARY</Button>
                  <Button variant="secondary">SECONDARY</Button>
                  <Button variant="danger">DANGER</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges Preview */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-extrabold uppercase mb-6 border-b-4 border-black pb-2">
                  Badges
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="default">DEFAULT</Badge>
                  <Badge variant="primary">PRIMARY</Badge>
                  <Badge variant="success">SUCCESS</Badge>
                  <Badge variant="danger">DANGER</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Input Preview */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-extrabold uppercase mb-6 border-b-4 border-black pb-2">
                  Input
                </h3>
                <div className="space-y-4">
                  <Input placeholder="ENTER YOUR EMAIL" />
                  <Input placeholder="ERROR STATE" error />
                </div>
              </CardContent>
            </Card>

            {/* Cards Preview */}
            <Card color="lime">
              <CardContent className="p-8">
                <h3 className="text-lg font-extrabold uppercase mb-4">
                  Colored Cards
                </h3>
                <p className="text-base">
                  Cards come in multiple colors: white, yellow, cyan, magenta,
                  and lime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-16 px-6 border-y-4 border-black bg-[#FFFF00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-brutal-3xl font-extrabold uppercase tracking-tight mb-8">
            EASY INSTALLATION
          </h2>
          <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] font-mono text-left">
            <code className="text-sm">
              # Just copy components into your project
              <br />
              <br />
              # Requirements:
              <br />
              # - React 18+
              <br />
              # - Tailwind CSS 3+
              <br /># - Space Grotesk & JetBrains Mono fonts
            </code>
          </div>
          <div className="mt-8">
            <Link href="/docs/installation">
              <Button variant="default" size="lg">
                READ INSTALLATION GUIDE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t-4 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-2xl font-extrabold uppercase tracking-tight">
              CONCRETE<span className="text-black bg-[#FFFF00] px-1">UI</span>
            </span>
            <p className="text-sm mt-2 text-gray-400">
              Neo brutalist components for the modern web.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-wider hover:text-[#FFFF00] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-wider hover:text-[#FFFF00] transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
