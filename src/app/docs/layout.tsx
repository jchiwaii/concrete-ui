import { Sidebar } from "@/components/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-shell min-h-screen md:flex">
      <Sidebar />
      <main className="min-h-screen flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
          <div className="docs-panel p-6 md:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
