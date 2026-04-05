import Link from "next/link";
import { Badge, Button, Card, CardContent } from "@/components/ui";

const principles = [
  {
    title: "Clear hierarchy",
    description:
      "Strong type scale, visible structure, and predictable spacing across every component.",
  },
  {
    title: "Confident surfaces",
    description:
      "Bold outlines and hard shadows give interfaces identity while staying clean and usable.",
  },
  {
    title: "Fast composition",
    description:
      "Copy components, adapt tokens, and ship screens quickly without losing consistency.",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <section className="docs-panel p-7 md:p-8">
        <Badge variant="primary" className="mb-4 uppercase">
          Documentation
        </Badge>
        <h1 className="font-heading text-[clamp(3rem,8vw,5.5rem)] uppercase leading-[0.9]">
          Concrete UI Guide
        </h1>
        <p className="mt-4 max-w-3xl text-brutal-lg text-gray-700">
          Concrete UI is a modern neo-brutalist component system for React.
          Clean layout, bold identity, and practical copy-paste workflows.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/docs/installation">
            <Button variant="primary" size="lg">
              Installation
            </Button>
          </Link>
          <Link href="/docs/components/button">
            <Button variant="outline" size="lg">
              Browse Components
            </Button>
          </Link>
          <Link href="/docs/templates">
            <Button variant="outline" size="lg">
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {principles.map((item) => (
          <Card key={item.title} hover>
            <CardContent className="p-6">
              <h2 className="text-xl font-extrabold uppercase tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-sm text-gray-700">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="docs-panel p-7 md:p-8">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight">
          Core style language
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Borders + depth
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Thick black outlines and hard shadows across controls and layout blocks.
            </p>
          </div>
          <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Color strategy
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Neutral base with focused accent usage: yellow for primary, cyan for secondary.
            </p>
          </div>
          <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Motion
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Short transitions and clear interaction feedback without decorative overload.
            </p>
          </div>
          <div className="rounded-lg border-2 border-black bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Shape language
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Rounded modern corners with brutalist contrast and structural weight.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
