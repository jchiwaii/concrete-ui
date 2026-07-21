import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonStyles } from "@/components/ui";
import { getTemplate, templates } from "@/lib/templates";

type TemplatePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  return template ? { title: `${template.title} Template`, description: template.description } : { title: "Template Not Found" };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <div className="docs-page-stack">
      <header className="docs-page-header">
        <p className="docs-kicker">Template record / {template.status}</p>
        <h1 className="docs-page-title">{template.title}</h1>
        <p className="docs-page-copy">{template.description}</p>
        <div className="docs-component-meta" aria-label="Template metadata">
          <span className="docs-meta-tag is-live">React route active</span>
          <span className="docs-meta-tag">{template.category}</span>
          {template.tags.map((tag) => <span key={tag} className="docs-meta-tag">{tag}</span>)}
        </div>
        <div className="docs-actions">
          <a href={template.reactHref} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "primary", size: "lg" })}>Launch React template ↗</a>
          <a href="#preview" className={buttonStyles({ variant: "outline", size: "lg" })}>View image record</a>
        </div>
      </header>

      <section aria-labelledby="source-heading">
        <div className="docs-section-heading">
          <div><p className="docs-kicker">01 / Source location</p><h2 id="source-heading">React source</h2></div>
        </div>
        <div className="grid border border-[#d8d5c8]/20 bg-[#111410] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <p className="m-0 p-5 text-sm leading-6 text-[#999c92] lg:border-r lg:border-[#d8d5c8]/20">
            This record references the standalone React route only. Static HTML is intentionally excluded so implementation and documentation cannot drift.
          </p>
          <code className="m-5 self-center overflow-x-auto border border-[#d8d5c8]/20 bg-[#080a08] px-4 py-3 font-mono text-xs text-[#f2c230]">{template.sourcePath}</code>
        </div>
      </section>

      <section id="preview" aria-labelledby="preview-heading">
        <div className="docs-section-heading">
          <div><p className="docs-kicker">02 / Visual reconnaissance</p><h2 id="preview-heading">Image record</h2></div>
          <span className="docs-section-link">Static capture / opens live route</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {template.previewImages.map((image, index) => (
            <a key={image.src} href={template.reactHref} target="_blank" rel="noopener noreferrer" className="group overflow-hidden border border-[#d8d5c8]/25 bg-[#111410]">
              <img src={image.src} alt={image.alt} loading="lazy" className="h-72 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]" />
              <div className="flex items-center justify-between border-t border-[#d8d5c8]/20 px-4 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#999c92]">
                <span>{String(index + 1).padStart(2, "0")} / {image.label}</span><span className="text-[#f2c230]">Open ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
