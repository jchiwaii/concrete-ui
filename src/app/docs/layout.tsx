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
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-accent)] px-3 py-2 text-sm font-semibold shadow-[var(--ui-shadow)] focus:translate-y-0"
      >
        Skip to content
      </a>
      <Sidebar />
      <main id="docs-content" className="min-h-screen min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 md:px-10 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
