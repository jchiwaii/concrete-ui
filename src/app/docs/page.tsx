import Link from "next/link";
import { Badge, buttonStyles } from "@/components/ui";
import { componentCategories, componentRegistry, getComponentHref } from "@/lib/component-registry";

const featuredSlugs = ["button", "field", "modal", "command", "table", "tooltip"];

const principles = [
  {
    number: "01",
    title: "Structure first",
    description: "Two-pixel outlines and hard depth clarify grouping instead of decorating every surface.",
  },
  {
    number: "02",
    title: "Quiet typography",
    description: "A compact, readable scale lets the component behavior carry more weight than display type.",
  },
  {
    number: "03",
    title: "Own the code",
    description: "Components are typed, composable, and designed to be copied into a real product codebase.",
  },
];

export default function DocsPage() {
  const featured = featuredSlugs
    .map((slug) => componentRegistry.find((component) => component.slug === slug))
    .filter((component) => component !== undefined);

  return (
    <div className="space-y-16">
      <section className="border-b-2 border-black pb-10 md:pb-14">
        <Badge variant="primary" className="mb-5">Documentation</Badge>
        <h1 className="text-brutal-5xl max-w-4xl text-balance font-bold tracking-[-0.055em]">
          Build interfaces with clarity and character.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Concrete UI is a modern neo-brutalist component system for React. It pairs
          strong structure with restrained color, practical APIs, and accessible behavior.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/docs/installation" className={buttonStyles({ variant: "primary", size: "lg" })}>
            Install Concrete UI
          </Link>
          <Link href="/docs/components" className={buttonStyles({ variant: "outline", size: "lg" })}>
            Browse components
          </Link>
        </div>
      </section>

      <section aria-labelledby="library-overview">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Library overview</p>
            <h2 id="library-overview" className="mt-2 text-brutal-3xl font-bold tracking-[-0.04em]">
              Small system, broad coverage.
            </h2>
          </div>
          <Link href="/docs/components" className="text-sm font-semibold underline decoration-2 underline-offset-4 hover:no-underline">
            View all {componentRegistry.length} components
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-accent)] p-5 shadow-[var(--ui-shadow)]">
            <p className="text-3xl font-bold tracking-[-0.05em]">{componentRegistry.length}</p>
            <p className="mt-1 text-sm font-medium">React components</p>
          </div>
          <div className="rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-info)] p-5 shadow-[var(--ui-shadow)]">
            <p className="text-3xl font-bold tracking-[-0.05em]">{componentCategories.length}</p>
            <p className="mt-1 text-sm font-medium">Focused categories</p>
          </div>
          <div className="rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] p-5 shadow-[var(--ui-shadow)]">
            <p className="text-3xl font-bold tracking-[-0.05em]">A11y</p>
            <p className="mt-1 text-sm font-medium">Keyboard-first patterns</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-components">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Start here</p>
          <h2 id="featured-components" className="mt-2 text-brutal-3xl font-bold tracking-[-0.04em]">
            Essential building blocks.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((component) => (
            <Link
              key={component.slug}
              href={getComponentHref(component.slug)}
              className="group rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] p-5 shadow-[var(--ui-shadow)] transition-[transform,box-shadow,background-color] hover:-translate-x-px hover:-translate-y-px hover:bg-[var(--ui-accent-soft)] hover:shadow-[var(--ui-shadow-md)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-[-0.025em]">{component.name}</h3>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{component.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid border-y-2 border-black md:grid-cols-3" aria-label="Design principles">
        {principles.map((principle, index) => (
          <div
            key={principle.number}
            className={`py-6 md:p-6 ${index > 0 ? "border-t-2 border-black md:border-l-2 md:border-t-0" : ""}`}
          >
            <span className="font-mono text-xs font-bold text-gray-500">{principle.number}</span>
            <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em]">{principle.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{principle.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
