import Link from "next/link";
import { Badge, Button, Card, CardContent } from "@/components/ui";

const templates = [
  {
    title: "Cherry Pop Portfolio (Multi-Page)",
    description:
      "A fresh girly neo-brutalist software engineer portfolio built from scratch with five pages, custom assets, and vanilla JS behaviors.",
    docsHref: "/docs/templates/cherry-pop-portfolio",
    previewHref: "/templates/cherry-pop-portfolio/index.html",
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="primary" className="mb-4 uppercase">
          Templates
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight">
          Full Page Templates
        </h1>
        <p className="mt-3 max-w-3xl text-brutal-lg text-gray-700">
          Showcase production-ready full pages built with the Concrete UI visual
          language.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.title} hover>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight">
                {template.title}
              </h2>
              <p className="text-sm text-gray-700">{template.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={template.docsHref}>
                  <Button variant="primary">Preview in Docs</Button>
                </Link>
                <a
                  href={template.previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Open Full Page</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
