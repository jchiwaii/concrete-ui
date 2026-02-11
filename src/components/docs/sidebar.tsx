"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
];

const mobileQuickLinks = [
  { title: "Intro", href: "/docs" },
  { title: "Install", href: "/docs/installation" },
  { title: "Button", href: "/docs/components/button" },
  { title: "Slider", href: "/docs/components/slider" },
  { title: "Card", href: "/docs/components/card" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-0 z-40 border-b-2 border-black bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              Concrete
              <span className="ml-0.5 rounded bg-black px-1.5 py-0.5 text-white">
                UI
              </span>
            </span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Docs
          </span>
        </div>
        <div className="overflow-x-auto border-t-2 border-black px-3 py-3">
          <div className="flex min-w-max gap-2">
            {mobileQuickLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "rounded-md border-2 border-black bg-[#ffde00] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide shadow-[2px_2px_0_0_#000]"
                      : "rounded-md border-2 border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide"
                  }
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="hidden w-72 flex-shrink-0 p-6 md:block">
        <div className="docs-panel sticky top-6 h-[calc(100vh-3rem)] overflow-hidden">
          <div className="border-b-2 border-black p-5">
            <Link href="/" className="block">
              <span className="text-2xl font-bold tracking-tight">
                Concrete
                <span className="ml-0.5 rounded bg-black px-1.5 py-0.5 text-white">
                  UI
                </span>
              </span>
            </Link>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">
              Neobrutalist Components
            </p>
          </div>

          <nav className="h-[calc(100%-160px)] overflow-y-auto p-4">
            {navigation.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={
                            isActive
                              ? "block rounded-md border-2 border-black bg-[#ffde00] px-3 py-2 text-sm font-semibold shadow-[2px_2px_0_0_#000]"
                              : "block rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                          }
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t-2 border-black bg-gray-50 p-4 pb-5 pr-5">
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-md border-2 border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
