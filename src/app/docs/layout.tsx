import { Sidebar } from "@/components/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-shell min-h-screen md:flex">
      <a
        href="#docs-content"
        className="docs-skip-link"
      >
        Skip to content
      </a>
      <Sidebar />
      <main id="docs-content" className="docs-main min-h-screen min-w-0 flex-1">
        <div className="docs-content-wrap">
          {children}
        </div>
      </main>
    </div>
  );
}
