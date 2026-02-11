import Link from "next/link";
import { Badge, Button, Card, CardContent, Input } from "@/components/ui";

const signalStrip = [
  "27+ Components",
  "TypeScript First",
  "React 19 + Next 16",
  "Copy + Paste Workflow",
  "Hard Shadows + Thick Borders",
  "Keyboard Friendly Patterns",
];

const pillars = [
  {
    title: "Modern Neo-Brutal",
    description:
      "Strong outlines and hard depth with cleaner spacing and readable layouts.",
    color: "white" as const,
  },
  {
    title: "Build Fast",
    description:
      "Composable primitives designed to move from docs to production quickly.",
    color: "yellow" as const,
  },
  {
    title: "Consistent System",
    description:
      "Shared color, spacing, and interaction language across every component.",
    color: "cyan" as const,
  },
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
            <Badge variant="primary" size="sm" className="hidden md:inline-flex">
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
        <section className="relative px-6 pb-20 pt-16 md:pb-24 md:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-70" />
          <div className="mx-auto w-full max-w-7xl">
            <Badge variant="primary" size="lg" className="mb-6 uppercase">
              Neo Brutalist Component Library
            </Badge>

            <h1 className="font-heading text-[clamp(4rem,16vw,12rem)] leading-[0.8] uppercase tracking-[0.01em]">
              Build
              <span className="mx-2 inline-block rounded-md border-2 border-black bg-[#ffde00] px-3 py-1 shadow-[6px_6px_0_0_#000]">
                Loud
              </span>
              Interfaces
              <span className="mx-2 inline-block rounded-md border-2 border-black bg-[#06b6d4] px-3 py-1 shadow-[6px_6px_0_0_#000]">
                Fast
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-brutal-lg text-gray-700">
              Concrete UI gives you production-ready components with thick
              borders, hard shadows, and modern neo-brutal clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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
              <Badge variant="default" size="lg" className="uppercase">
                Consistent colors
              </Badge>
              <Badge variant="default" size="lg" className="uppercase">
                Clean layouts
              </Badge>
              <Badge variant="default" size="lg" className="uppercase">
                Brutal character
              </Badge>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-black py-6">
          <div className="overflow-hidden">
            <div className="flex min-w-max items-center gap-5 animate-brutal-marquee px-6">
              {[...signalStrip, ...signalStrip].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className={`inline-flex items-center rounded-md border-2 border-black px-6 py-3 text-lg font-extrabold uppercase tracking-[0.08em] shadow-[4px_4px_0_0_#000] md:text-2xl ${
                    index % 2 === 0 ? "bg-[#ffde00] text-black" : "bg-[#06b6d4] text-black"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <Badge variant="neutral" className="mb-4 uppercase">
                Why Concrete UI
              </Badge>
              <h2 className="text-4xl font-bold uppercase tracking-tight">
                Clean, Modern, Neo-Brutal
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((item) => (
                <Card key={item.title} color={item.color} hover>
                  <CardContent className="p-7">
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm text-gray-800">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <Card variant="elevated" color="white">
              <CardContent className="p-7">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge variant="primary" className="mb-3 uppercase">
                      Component Preview
                    </Badge>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight">
                      Mix, Match, Compose
                    </h3>
                  </div>
                  <Badge variant="neutral">Copy Friendly</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
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
                      Form
                    </p>
                    <div className="space-y-3">
                      <Input placeholder="name@project.com" />
                      <Input placeholder="Missing value example" error />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Card color="yellow" variant="elevated">
              <CardContent className="p-8 md:p-10 text-center">
                <Badge variant="neutral" className="mb-4 uppercase">
                  Ship with confidence
                </Badge>
                <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
                  Keep your UI bold and clean
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-800">
                  Use the docs, copy components, and build consistent interfaces fast.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
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
              Modern neo-brutalist components for expressive web products.
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
          © {new Date().getFullYear()} Concrete UI. Open source under MIT license.
        </div>
      </footer>
    </div>
  );
}
