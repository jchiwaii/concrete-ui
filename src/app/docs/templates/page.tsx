import Link from "next/link";
import { Badge, Card, CardContent, buttonStyles } from "@/components/ui";
import { templates } from "@/lib/templates";

export default function TemplatesPage() {
  return (
    <div className="space-y-10">
      <section>
        <Badge variant="primary" className="mb-4">
          Templates
        </Badge>
        <h1 className="text-brutal-4xl font-bold tracking-[-0.045em]">
          React Page Templates
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700 md:text-lg">
          Image-first previews for production-ready React templates built with
          the Concrete UI visual language. Open the React route for the full
          interactive page.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {templates.map((template) => {
          const preview = template.previewImages[0];

          return (
            <Card key={template.slug} hover className="overflow-hidden">
              <CardContent className="p-0">
                <Link
                  href={template.docsHref}
                  className="block border-b-2 border-black bg-gray-100"
                  aria-label={`View ${template.title} details`}
                >
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    loading="lazy"
                    className="h-72 w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                  />
                </Link>

                <div className="space-y-5 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" size="sm">
                      {template.category}
                    </Badge>
                    <Badge variant="success" size="sm">
                      React Only
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-[-0.035em]">
                      {template.title}
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-gray-700">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link href={template.docsHref} className={buttonStyles({ variant: "primary", size: "lg" })}>
                      View Details
                    </Link>
                    <a
                      href={template.reactHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: "outline", size: "lg" })}
                    >
                      Open React
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
