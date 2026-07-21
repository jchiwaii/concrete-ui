import Link from "next/link";
import { buttonStyles } from "@/components/ui";
import { templates } from "@/lib/templates";

export default function TemplatesPage() {
  return (
    <div className="docs-page-stack">
      <header className="docs-page-header">
        <p className="docs-kicker">Field templates / React only</p>
        <h1 className="docs-page-title">Proven<br />configurations.</h1>
        <p className="docs-page-copy">
          Static image reconnaissance for complete React pages built from Concrete UI.
          Open a record for screenshots and launch the separate interactive route when needed.
        </p>
      </header>

      <section aria-labelledby="template-index">
        <div className="docs-section-heading">
          <div>
            <p className="docs-kicker">01 / Available builds</p>
            <h2 id="template-index">Template index</h2>
          </div>
          <span className="docs-section-link">{String(templates.length).padStart(2, "0")} operational</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {templates.map((template, index) => {
            const preview = template.previewImages[0];
            return (
              <article key={template.slug} className="overflow-hidden border border-[#d8d5c8]/25 bg-[#111410]">
                <Link href={template.docsHref} className="group relative block overflow-hidden border-b border-[#d8d5c8]/20 bg-[#d0cec3]" aria-label={`View ${template.title} details`}>
                  <img src={preview.src} alt={preview.alt} loading="lazy" className="h-72 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]" />
                  <span className="absolute top-0 left-0 bg-[#080a08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#f2c230]">REC-{String(index + 1).padStart(2, "0")}</span>
                </Link>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#999c92]">
                    <span>{template.category}</span><span>/</span><span className="text-[#9cad72]">React route active</span>
                  </div>
                  <h2 className="mt-4 font-['Barlow_Condensed'] text-3xl font-bold uppercase tracking-[-0.02em] text-[#efede4]">{template.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#999c92]">{template.description}</p>
                  <div className="docs-component-meta">
                    {template.tags.map((tag) => <span key={tag} className="docs-meta-tag">{tag}</span>)}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={template.docsHref} className={buttonStyles({ variant: "primary", size: "lg" })}>Inspect record →</Link>
                    <a href={template.reactHref} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "outline", size: "lg" })}>Launch React ↗</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
