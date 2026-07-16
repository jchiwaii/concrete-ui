import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Switch,
  buttonStyles,
} from "@/components/ui";
import { componentRegistry, getComponentHref } from "@/lib/component-registry";

const featuredSlugs = ["button", "field", "command", "modal", "table", "tabs"];

const principles = [
  {
    index: "01",
    title: "Brutal, not noisy",
    description: "Hard edges establish hierarchy. Color and shadow are reserved for the moments that need emphasis.",
  },
  {
    index: "02",
    title: "Behavior included",
    description: "Keyboard navigation, focus management, and controlled or uncontrolled state are part of the primitive.",
  },
  {
    index: "03",
    title: "Designed to be owned",
    description: "Readable TypeScript and small APIs make every component practical to copy, adapt, and maintain.",
  },
];

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => componentRegistry.find((component) => component.slug === slug))
    .filter((component) => component !== undefined);

  return (
    <div className="min-h-screen bg-[var(--ui-canvas)] text-[var(--ui-ink)]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b-2 border-black">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-45" />
          <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
            <div>
              <Badge variant="primary" className="mb-6">React component library</Badge>
              <h1 className="text-brutal-6xl max-w-[12ch] text-balance font-bold tracking-[-0.065em]">
                UI with enough edge to be remembered.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                Concrete UI is a modern neo-brutalist system for React: strong structure,
                restrained color, accessible behavior, and code you can actually own.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/docs/installation" className={buttonStyles({ variant: "primary", size: "lg" })}>
                  Get started
                </Link>
                <Link href="/docs/components" className={buttonStyles({ variant: "outline", size: "lg" })}>
                  Explore components
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
                <span>{componentRegistry.length} components</span>
                <span>React 19</span>
                <span>TypeScript first</span>
              </div>
            </div>

            <div className="lg:pl-8" aria-label="Component example">
              <div className="overflow-hidden rounded-[var(--ui-radius-xl)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow-lg)]">
                <div className="flex items-center justify-between border-b-2 border-black bg-[var(--ui-surface-muted)] px-4 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full border border-black bg-[var(--ui-danger)]" />
                    <span className="h-2.5 w-2.5 rounded-full border border-black bg-[var(--ui-accent)]" />
                    <span className="h-2.5 w-2.5 rounded-full border border-black bg-[var(--ui-success)]" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-gray-500">profile-card.tsx</span>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" size="sm">Live primitive</Badge>
                      <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">Profile settings</h2>
                      <p className="mt-1 text-sm text-gray-600">A small form composed from library parts.</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-black bg-[var(--ui-accent)] font-bold shadow-[var(--ui-shadow-sm)]">
                      CU
                    </span>
                  </div>

                  <div className="grid gap-5">
                    <Field>
                      <FieldLabel htmlFor="demo-name">Display name</FieldLabel>
                      <Input id="demo-name" defaultValue="Maya Chen" />
                      <FieldDescription>Shown on your public profile.</FieldDescription>
                    </Field>
                    <div className="flex items-center justify-between gap-4 rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface-muted)] p-4">
                      <div>
                        <p className="text-sm font-semibold">Weekly digest</p>
                        <p className="mt-1 text-xs leading-5 text-gray-600">One useful summary, every Friday.</p>
                      </div>
                      <Switch defaultChecked aria-label="Enable weekly digest" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-2 border-t-2 border-black pt-5">
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="primary">Save changes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 md:py-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">The essentials</p>
              <h2 className="mt-2 text-brutal-4xl max-w-xl font-bold tracking-[-0.05em]">
                Familiar primitives, clearer character.
              </h2>
            </div>
            <Link href="/docs/components" className="text-sm font-semibold underline decoration-2 underline-offset-4 hover:no-underline">
              Browse all components
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((component) => (
              <Link key={component.slug} href={getComponentHref(component.slug)} className="group">
                <Card hover className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold tracking-[-0.025em]">{component.name}</h3>
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{component.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y-2 border-black bg-[var(--ui-surface)]">
          <div className="mx-auto grid w-full max-w-[1200px] md:grid-cols-3">
            {principles.map((principle, index) => (
              <article
                key={principle.index}
                className={`px-4 py-8 sm:px-6 md:py-12 ${index > 0 ? "border-t-2 border-black md:border-l-2 md:border-t-0" : ""}`}
              >
                <span className="font-mono text-xs font-bold text-gray-500">{principle.index}</span>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.035em]">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 md:py-24">
          <div className="rounded-[var(--ui-radius-xl)] border-2 border-black bg-[var(--ui-ink)] px-6 py-10 text-white shadow-[5px_5px_0_var(--ui-accent)] md:flex md:items-center md:justify-between md:gap-10 md:px-10">
            <div>
              <Badge variant="primary" className="mb-4">Ready when you are</Badge>
              <h2 className="text-brutal-3xl max-w-xl font-bold tracking-[-0.045em]">Start with the system. Make it yours.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">Install the foundation, copy a component, and adapt the tokens to your product.</p>
            </div>
            <Link href="/docs/installation" className={buttonStyles({ variant: "primary", size: "lg", className: "mt-7 md:mt-0" })}>
              Read installation
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-black bg-[var(--ui-surface)]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Concrete UI. Modern neo-brutal primitives for React.</p>
          <div className="flex gap-5 font-semibold text-black">
            <Link href="/docs">Docs</Link>
            <a href="https://github.com/jchiwaii/concrete-ui" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
