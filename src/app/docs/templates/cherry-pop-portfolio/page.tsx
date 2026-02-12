import { Badge, Button, Card, CardContent } from "@/components/ui";

const BASE = "/templates/cherry-pop-portfolio";

const pages = [
  { title: "Home", href: `${BASE}/index.html` },
  { title: "About", href: `${BASE}/about.html` },
  { title: "Projects", href: `${BASE}/projects.html` },
  { title: "Case Study", href: `${BASE}/project.html?id=lumen` },
  { title: "Contact", href: `${BASE}/contact.html` },
];

export default function CherryPopPortfolioTemplatePage() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="primary" className="mb-4 uppercase">
          Template
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight">
          Cherry Pop Portfolio
        </h1>
        <p className="mt-3 max-w-3xl text-brutal-lg text-gray-700">
          Multi-page software engineer portfolio with a clean girly
          neo-brutalist aesthetic. Built from scratch with separate HTML, CSS,
          JS, and custom SVG dummy assets.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">
            Pages
          </h2>
          <div className="flex flex-wrap gap-3">
            {pages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">{page.title}</Button>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden rounded-lg border-2 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <iframe
          src={`${BASE}/index.html`}
          title="Cherry Pop portfolio template preview"
          loading="lazy"
          className="h-[900px] w-full border-0 bg-white"
        />
      </div>
    </div>
  );
}
