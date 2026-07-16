import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge, Card, CardContent, buttonStyles } from "@/components/ui";
import { getTemplate, templates } from "@/lib/templates";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return { title: "Template Not Found" };
  }

  return {
    title: `${template.title} Template`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section>
        <Badge variant="primary" className="mb-4">
          Template
        </Badge>
        <h1 className="text-brutal-4xl font-bold tracking-[-0.045em]">
          {template.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700 md:text-lg">
          {template.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="secondary" size="sm">
            {template.category}
          </Badge>
          <Badge variant="success" size="sm">
            React Only
          </Badge>
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              React Source
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-gray-700">
              This template is served only from the React route. The old static
              HTML preview has been removed from the template flow so the docs
              and live page stay aligned.
            </p>
          </div>

          <div className="rounded-md border-2 border-black bg-gray-100 px-4 py-3 font-mono text-xs font-bold text-gray-800">
            {template.sourcePath}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={template.reactHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Open React Template
            </a>
            <a href="#preview" className={buttonStyles({ variant: "outline", size: "lg" })}>
              View Preview Images
            </a>
          </div>
        </CardContent>
      </Card>

      <Card id="preview">
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              Image Preview
            </h2>
            <p className="text-sm leading-6 text-gray-700">
              These are static screenshots of the React template. Click any
              image to open the React page in a new tab.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {template.previewImages.map((image) => (
              <a
                key={image.src}
                href={template.reactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border-2 border-black bg-white shadow-[var(--ui-shadow)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--ui-shadow-lg)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-64 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="border-t-2 border-black bg-gray-100 px-3 py-2 text-xs font-semibold">
                  {image.label}
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
