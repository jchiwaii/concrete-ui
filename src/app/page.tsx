import Link from "next/link";
import { Badge, Button, Card, CardContent, Input } from "@/components/ui";

const signalStrip = [
  "27+ Components",
  "TypeScript First",
  "React 19 + Next 16",
  "Copy + Paste Workflow",
  "Hard Shadows + Bold Borders",
  "Keyboard Friendly Patterns",
];

const quickWins = [
  "Zero runtime UI dependency",
  "Color and spacing tokens ready",
  "Consistent interaction feedback",
];

const componentMix = [
  "Navigation + overlays",
  "Forms + feedback",
  "Data display + layout",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-black">
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Concrete
              <span className="ml-0.5 rounded bg-black px-1.5 py-0.5 text-white">
                UI
              </span>
            </span>
            <Badge
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              v0.1
            </Badge>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/docs"
              className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-gray-100"
            >
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-gray-100"
            >
              Components
            </Link>
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gray-800"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-14 md:pb-24 md:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-20 bg-grid-pattern opacity-70" />
          <div className="pointer-events-none absolute -z-10 hidden md:block">
            <div className="absolute left-[7%] top-10 h-16 w-16 rotate-6 border-2 border-black bg-[#ffde00] shadow-[6px_6px_0_0_#000]" />
            <div className="absolute right-[8%] top-24 h-20 w-20 -rotate-6 border-2 border-black bg-[#06b6d4] shadow-[6px_6px_0_0_#000]" />
            <div className="absolute bottom-14 right-[32%] h-12 w-12 rotate-12 border-2 border-black bg-[#f97316] shadow-[4px_4px_0_0_#000]" />
          </div>
          <div className="mx-auto w-full max-w-7xl">
            <div className="animate-brutal-slide-up">
              <Badge variant="primary" size="lg" className="mb-6 uppercase">
                Neo Brutalist Component Library
              </Badge>

              <h1 className="font-heading text-[clamp(4.5rem,17vw,13rem)] leading-[0.79] uppercase tracking-[0.01em]">
                Build
                <span className="mx-2 inline-block -rotate-1 border-2 border-black bg-[#ffde00] px-3 py-1 shadow-[6px_6px_0_0_#000]">
                  Loud
                </span>
                Interfaces
                <span className="mx-2 inline-block rotate-1 border-2 border-black bg-[#06b6d4] px-3 py-1 shadow-[6px_6px_0_0_#000]">
                  Fast
                </span>
                And Furiously
              </h1>

              <p className="mt-8 max-w-3xl text-brutal-lg text-gray-700">
                Concrete UI gives you production-ready components with thick
                borders, hard shadows, and unapologetic contrast. It is made for
                teams that want a distinctive look without slowing delivery.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/docs">
                  <Button variant="primary" size="xl">
                    Read The Docs
                  </Button>
                </Link>
                <Link href="/docs/components/button">
                  <Button variant="outline" size="xl">
                    Browse Components
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {quickWins.map((item) => (
                  <Badge
                    key={item}
                    variant="default"
                    size="lg"
                    className="uppercase"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <Card color="yellow" className="md:col-span-2 md:-rotate-1">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      Starter Command
                    </p>
                    <Badge variant="secondary">Quick setup</Badge>
                  </div>
                  <pre className="!m-0">
                    <code>{`git clone https://github.com/jchiwaii/concrete-ui.git\nnpm install\nnpm run dev`}</code>
                  </pre>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_#000]">
                      <p className="text-2xl font-extrabold uppercase leading-none">
                        27+
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
                        Components
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-black bg-[#a3e635] p-3 shadow-[3px_3px_0_0_#000]">
                      <p className="text-2xl font-extrabold uppercase leading-none">
                        A11y
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
                        Baseline Included
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card color="cyan" className="md:rotate-1">
                <CardContent className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Build posture
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold uppercase">
                    Fast setup
                  </h3>
                  <p className="mt-3 text-sm font-medium text-gray-800">
                    Copy, adapt, and ship. Components are designed to be
                    customized quickly while preserving strong visual identity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-4">
          <div className="overflow-hidden">
            <div className="flex min-w-max items-center gap-3 animate-brutal-marquee px-6">
              {[...signalStrip, ...signalStrip].map((item, index) => (
                <Badge
                  key={`${item}-${index}`}
                  variant={index % 2 === 0 ? "neutral" : "warning"}
                  size="lg"
                  className="uppercase"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Badge variant="neutral" className="mb-4 uppercase">
                  Why teams pick concrete ui
                </Badge>
                <h2 className="text-4xl font-bold uppercase tracking-tight">
                  Strong Visual DNA
                </h2>
              </div>
              <p className="max-w-xl text-gray-700">
                The system is intentionally loud but implementation stays clean:
                stable API shapes, predictable states, and reusable layout
                primitives.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Card color="yellow" className="xl:col-span-2 md:-rotate-1">
                <CardContent className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Design principles
                  </p>
                  <h3 className="mt-3 text-3xl font-extrabold uppercase tracking-tight">
                    Unmistakable Components
                  </h3>
                  <p className="mt-4 text-base text-gray-800">
                    Thick outlines, hard elevation, bold labels. Every element
                    is immediately identifiable and interaction-ready.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border-2 border-black bg-white p-3 text-sm font-bold uppercase shadow-[3px_3px_0_0_#000]">
                      Borders
                    </div>
                    <div className="rounded-lg border-2 border-black bg-white p-3 text-sm font-bold uppercase shadow-[3px_3px_0_0_#000]">
                      Contrast
                    </div>
                    <div className="rounded-lg border-2 border-black bg-white p-3 text-sm font-bold uppercase shadow-[3px_3px_0_0_#000]">
                      Motion
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card color="cyan" hover>
                <CardContent className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Developer speed
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold uppercase">
                    Ready to ship
                  </h3>
                  <p className="mt-4 text-sm text-gray-800">
                    Components drop into projects fast and stay customizable
                    without rewriting internals.
                  </p>
                </CardContent>
              </Card>

              <Card color="pink" hover className="md:rotate-1">
                <CardContent className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Production fit
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold uppercase">
                    Type-safe defaults
                  </h3>
                  <p className="mt-4 text-sm text-gray-800">
                    Clean prop APIs and strong state variants help teams scale
                    visual consistency across pages.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_1fr]">
            <Card variant="elevated" color="white">
              <CardContent className="p-7">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge variant="primary" className="mb-3 uppercase">
                      Live component blend
                    </Badge>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight">
                      Mix, match, compose
                    </h3>
                  </div>
                  <Badge variant="neutral">No lock-in</Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                      Buttons
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">
                        Primary
                      </Button>
                      <Button variant="secondary" size="sm">
                        Secondary
                      </Button>
                      <Button variant="outline" size="sm">
                        Outline
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                      Badges
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="info">Info</Badge>
                      <Badge variant="danger">Danger</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border-2 border-black bg-gray-50 p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                    Forms
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="name@project.com" />
                    <Input placeholder="Missing value example" error />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card color="lime" className="-rotate-1">
                <CardContent className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Component coverage
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold uppercase tracking-tight">
                    UI Toolkit map
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {componentMix.map((item, index) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-black bg-white text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm font-semibold uppercase">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card color="orange" className="rotate-1">
                <CardContent className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                    Start here
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold uppercase tracking-tight">
                    Build your first screen
                  </h3>
                  <p className="mt-4 text-sm text-gray-800">
                    Open docs, pick components, and wire your layout in minutes.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/docs/installation">
                      <Button variant="neutral" size="md">
                        Installation
                      </Button>
                    </Link>
                    <Link href="/docs/components/card">
                      <Button variant="default" size="md">
                        Card Docs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Card color="yellow" variant="elevated">
              <CardContent className="p-8 md:p-11">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
                  <div>
                    <Badge variant="neutral" className="mb-4 uppercase">
                      Ship with confidence
                    </Badge>
                    <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
                      Your Interface Should Not Look Generic
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-gray-800">
                      Concrete UI helps you move fast without giving up visual
                      character. Keep your product recognizable from the very
                      first screen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link href="/docs">
                        <Button variant="neutral" size="lg">
                          Go To Docs
                        </Button>
                      </Link>
                      <a
                        href="https://github.com/jchiwaii/concrete-ui"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="default" size="lg">
                          View On GitHub
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-black bg-black p-6 text-white shadow-[6px_6px_0_0_#000]">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Quick checklist
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="text-sm font-semibold uppercase">
                        1. Clone and run locally
                      </li>
                      <li className="text-sm font-semibold uppercase">
                        2. Copy components from docs
                      </li>
                      <li className="text-sm font-semibold uppercase">
                        3. Customize tokens and launch
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-black bg-black px-6 py-12 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-xl font-bold tracking-tight">
              Concrete
              <span className="ml-0.5 rounded bg-[#ffde00] px-1.5 py-0.5 text-black">
                UI
              </span>
            </span>
            <p className="mt-2 text-sm text-gray-400">
              Neo brutalist components for expressive web products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
            <Link href="/docs" className="hover:text-white">
              Documentation
            </Link>
            <Link href="/docs/components/button" className="hover:text-white">
              Components
            </Link>
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-7xl border-t border-gray-800 pt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Concrete UI. Open source under MIT
          license.
        </div>
      </footer>
    </div>
  );
}
