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
    <aside className="w-64 flex-shrink-0 border-r-4 border-black bg-white">
      <div className="sticky top-0 h-screen overflow-y-auto p-6">
        <Link href="/" className="block mb-8">
          <span className="text-2xl font-extrabold uppercase tracking-tight">
            CONCRETE<span className="text-[#FFFF00] bg-black px-1">UI</span>
          </span>
        </Link>

        <nav className="space-y-8">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`
                          block px-3 py-2
                          text-sm font-bold uppercase tracking-wide
                          border-2 border-transparent
                          transition-all duration-100
                          ${
                            isActive
                              ? "bg-[#FFFF00] border-black"
                              : "hover:bg-gray-100 hover:border-black"
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
      </div>
    </aside>
  );
}
