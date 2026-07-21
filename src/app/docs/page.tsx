import Link from "next/link";
import { buttonStyles } from "@/components/ui";
import { componentCategories, componentRegistry, getComponentHref } from "@/lib/component-registry";

const featuredSlugs = ["button", "field", "modal", "command", "table", "tooltip"];

const principles = [
  {
    number: "01",
    title: "Signal before style",
    description: "Hierarchy and state remain clear before color, motion, or decoration are added.",
  },
  {
    number: "02",
    title: "Compact under pressure",
    description: "Controls stay readable and efficient without inflating every label or target.",
  },
  {
    number: "03",
    title: "Source is standard issue",
    description: "Typed, local React code can be inspected, adapted, and deployed without a black box.",
  },
];

export default function DocsPage() {
  const featured = featuredSlugs
    .map((slug) => componentRegistry.find((component) => component.slug === slug))
    .filter((component) => component !== undefined);

  return (
    <div className="docs-page-stack">
      <header className="docs-page-header">
        <p className="docs-kicker">Documentation / System brief</p>
        <h1 className="docs-page-title">Interface<br />field manual.</h1>
        <p className="docs-page-copy">
          Concrete UI is a modern neo-brutalist React system built for decisive interfaces.
          Use the index to inspect behavior, verify states, and copy only what the mission needs.
        </p>
        <div className="docs-actions">
          <Link href="/docs/installation" className={buttonStyles({ variant: "primary", size: "lg" })}>
            Initialize system →
          </Link>
          <Link href="/docs/components" className={buttonStyles({ variant: "outline", size: "lg" })}>
            Open component index
          </Link>
        </div>
      </header>

      <section aria-label="Library status" className="docs-stat-grid">
        <div className="docs-stat">
          <strong>{String(componentRegistry.length).padStart(2, "0")}</strong>
          <span>React primitives</span>
        </div>
        <div className="docs-stat">
          <strong>{String(componentCategories.length).padStart(2, "0")}</strong>
          <span>Operational groups</span>
        </div>
        <div className="docs-stat is-accent">
          <strong>A11Y</strong>
          <span>Keyboard-first protocol</span>
        </div>
      </section>

      <section aria-labelledby="featured-components">
        <div className="docs-section-heading">
          <div>
            <p className="docs-kicker">01 / Recommended loadout</p>
            <h2 id="featured-components">Core primitives</h2>
          </div>
          <Link href="/docs/components" className="docs-section-link">
            Full index / {componentRegistry.length} →
          </Link>
        </div>
        <div className="docs-rows">
          {featured.map((component, index) => (
            <Link key={component.slug} href={getComponentHref(component.slug)} className="docs-row">
              <span className="docs-row-code">{String(index + 1).padStart(2, "0")}</span>
              <span className="docs-row-copy">
                <h3>{component.name}</h3>
                <p>{component.description}</p>
              </span>
              <span className="docs-row-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="operating-principles">
        <div className="docs-section-heading">
          <div>
            <p className="docs-kicker">02 / Operating protocol</p>
            <h2 id="operating-principles">Rules of engagement</h2>
          </div>
        </div>
        <div className="docs-principles">
          {principles.map((principle) => (
            <article key={principle.number} className="docs-principle">
              <span>SYS-{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
