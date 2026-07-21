import { ComponentCatalog } from "@/components/docs/component-catalog";

export default function ComponentsPage() {
  return (
    <div className="docs-page-stack">
      <header className="docs-page-header">
        <p className="docs-kicker">Component index / 55 units</p>
        <h1 className="docs-page-title">
          Select your<br />loadout.
        </h1>
        <p className="docs-page-copy">
          Browse by operational task, inspect the live specimen, and copy the smallest useful
          implementation. Every entry uses the same state, focus, and responsive protocol.
        </p>
      </header>
      <ComponentCatalog />
    </div>
  );
}
