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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r-2 border-black bg-white">
      <div className="sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b-2 border-black">
          <Link href="/" className="block">
            <span className="text-xl font-bold tracking-tight">
              Concrete<span className="text-white bg-black px-1.5 py-0.5 ml-0.5 rounded">UI</span>
            </span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Neobrutalist Components</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-3">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`
                          block px-3 py-2
                          text-sm font-medium
                          rounded-lg
                          transition-all duration-150
                          ${
                            isActive
                              ? "bg-[#ffde00] text-black border-2 border-black shadow-[2px_2px_0_0_#000]"
                              : "text-gray-600 hover:text-black hover:bg-gray-100"
                          }
                        `}
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

        {/* Footer */}
        <div className="p-4 border-t-2 border-black mt-auto">
          <div className="text-xs text-gray-500">
            <p>Built with React + Tailwind</p>
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium hover:underline mt-1 inline-block"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
