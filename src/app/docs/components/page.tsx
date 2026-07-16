import { Badge } from "@/components/ui";
import { ComponentCatalog } from "@/components/docs/component-catalog";

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <header className="border-b-2 border-black pb-8">
        <Badge variant="primary" className="mb-4">Components</Badge>
        <h1 className="text-brutal-4xl max-w-3xl font-bold tracking-[-0.045em]">
          Practical primitives with a harder edge.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Browse accessible React components by task. The visual language stays consistent,
          while the APIs remain straightforward enough to own and adapt.
        </p>
      </header>
      <ComponentCatalog />
    </div>
  );
}
