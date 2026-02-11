import Link from "next/link";
import { Button, Card, CardContent, Badge, Input } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Concrete<span className="text-white bg-black px-1.5 py-0.5 ml-0.5 rounded">UI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/docs"
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/docs/components/button"
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Components
            </Link>
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffde00] border-2 border-black rounded-full shadow-[3px_3px_0_0_#000] mb-8 animate-brutal-slide-up">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Neobrutalist Design System</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-brutal-slide-up stagger-1">
            Beautiful components.
            <br />
            <span className="text-gray-400">Bold aesthetics.</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-brutal-slide-up stagger-2">
            A collection of high-quality React components with thick borders, hard shadows,
            and unapologetic design. Copy, paste, and customize.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-brutal-slide-up stagger-3">
            <Link href="/docs">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button variant="outline" size="lg">
                Browse Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-y-2 border-black bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">27+</div>
            <div className="text-sm text-gray-500 mt-1">Components</div>
          </div>
          <div>
            <div className="text-4xl font-bold">100%</div>
            <div className="text-sm text-gray-500 mt-1">TypeScript</div>
          </div>
          <div>
            <div className="text-4xl font-bold">A11y</div>
            <div className="text-sm text-gray-500 mt-1">Accessible</div>
          </div>
          <div>
            <div className="text-4xl font-bold">Free</div>
            <div className="text-sm text-gray-500 mt-1">Open Source</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="neutral" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Concrete UI?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for developers who want bold, distinctive interfaces without the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" color="yellow" hover>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                  🎨
                </div>
                <h3 className="text-lg font-bold mb-2">Bold Design</h3>
                <p className="text-sm text-gray-600">
                  Thick borders, hard shadows, and saturated colors. No gradients, no subtlety—just pure impact.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" color="cyan" hover>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                  📋
                </div>
                <h3 className="text-lg font-bold mb-2">Copy & Paste</h3>
                <p className="text-sm text-gray-600">
                  Just copy the component code into your project. No package installation or complex setup needed.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" color="pink" hover>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                  ⚡
                </div>
                <h3 className="text-lg font-bold mb-2">Fast & Light</h3>
                <p className="text-sm text-gray-600">
                  Pure React + Tailwind CSS. No heavy dependencies, no runtime overhead. Maximum performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section className="py-20 px-6 bg-white border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Preview</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Component Showcase
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of what you can build with Concrete UI components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Buttons
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" size="sm">Default</Button>
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                  <Button variant="success" size="sm">Success</Button>
                  <Button variant="neutral" size="sm">Neutral</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Inputs
                </h3>
                <div className="space-y-3">
                  <Input placeholder="Enter your email..." />
                  <Input placeholder="Error state" error />
                </div>
              </CardContent>
            </Card>

            {/* Cards */}
            <Card color="lime">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Colored Cards
                </h3>
                <p className="text-sm text-gray-700">
                  Cards come in multiple colors including white, yellow, cyan, pink, lime, purple, and orange.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#ffde00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to build something bold?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Start using Concrete UI components in your project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs">
              <Button variant="neutral" size="lg">
                Read the Docs
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button variant="default" size="lg">
                Browse Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t-2 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xl font-bold tracking-tight">
                Concrete<span className="text-black bg-[#ffde00] px-1.5 py-0.5 ml-0.5 rounded">UI</span>
              </span>
              <p className="text-sm mt-2 text-gray-400">
                Neobrutalist components for modern web applications.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/jchiwaii/concrete-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Concrete UI. Open source under MIT license.
          </div>
        </div>
      </footer>
    </div>
  );
}
