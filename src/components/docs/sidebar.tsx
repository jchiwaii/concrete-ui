"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Input,
} from "@/components/ui";
import {
  componentGroups,
  getComponentHref,
} from "@/lib/component-registry";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "All components", href: "/docs/components" },
  { title: "Templates", href: "/docs/templates" },
];

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="Concrete UI home">
      <span className="text-lg font-bold tracking-[-0.04em]">Concrete</span>
      <span className="rounded-[4px] bg-black px-1.5 py-0.5 text-xs font-bold tracking-tight text-white">
        UI
      </span>
    </Link>
  );
}

function NavigationContent({
  pathname,
  searchId,
  onNavigate,
}: {
  pathname: string;
  searchId: string;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = useMemo(
    () =>
      componentGroups
        .map((group) => ({
          ...group,
          components: group.components.filter((component) =>
            `${component.name} ${component.description}`
              .toLowerCase()
              .includes(normalizedQuery)
          ),
        }))
        .filter((group) => group.components.length > 0),
    [normalizedQuery]
  );

  const linkClassName = (active: boolean) =>
    cn(
      "block rounded-[var(--ui-radius-sm)] border-2 px-3 py-2 text-sm transition-colors",
      active
        ? "border-black bg-[var(--ui-accent)] font-semibold shadow-[var(--ui-shadow-sm)]"
        : "border-transparent font-medium text-gray-600 hover:border-black/15 hover:bg-black/5 hover:text-black"
    );

  return (
    <>
      <div className="mb-5">
        <label htmlFor={searchId} className="mb-2 block text-xs font-semibold text-gray-600">
          Find a component
        </label>
        <Input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components"
          sizeVariant="sm"
        />
      </div>

      {!normalizedQuery && (
        <div className="mb-7">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Overview
          </p>
          <ul className="space-y-1">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className={linkClassName(pathname === link.href)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-7">
        {filteredGroups.map((group) => (
          <section key={group.category}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.components.map((component) => {
                const href = getComponentHref(component.slug);
                return (
                  <li key={component.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={linkClassName(pathname === href)}
                    >
                      {component.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <p className="rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface-muted)] p-4 text-sm text-gray-600">
          No component matches “{query}”.
        </p>
      )}
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-2 border-black bg-[var(--ui-surface)] px-4 md:hidden">
        <Brand />
        <button
          type="button"
          aria-label="Open documentation navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-accent)] shadow-[var(--ui-shadow-sm)] transition-transform active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <span className="sr-only">Open menu</span>
          <span className="grid gap-1" aria-hidden="true">
            <span className="h-0.5 w-5 bg-black" />
            <span className="h-0.5 w-5 bg-black" />
            <span className="h-0.5 w-5 bg-black" />
          </span>
        </button>
      </header>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        direction="left"
        ariaLabel="Documentation navigation"
        className="md:hidden"
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Documentation</DrawerTitle>
            <DrawerClose onClose={() => setMobileOpen(false)} />
          </DrawerHeader>
          <DrawerBody className="brutal-scroll-area">
            <NavigationContent pathname={pathname} searchId="mobile-component-search" onNavigate={() => setMobileOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r-2 border-black bg-[var(--ui-surface)] md:flex md:flex-col">
        <div className="border-b-2 border-black px-5 py-5">
          <Brand />
          <p className="mt-2 text-xs font-medium text-gray-500">React components with a harder edge.</p>
        </div>
        <nav className="brutal-scroll-area min-h-0 flex-1 overflow-y-auto p-4" aria-label="Documentation">
          <NavigationContent pathname={pathname} searchId="desktop-component-search" />
        </nav>
        <div className="border-t-2 border-black bg-[var(--ui-surface-muted)] p-4">
          <a
            href="https://github.com/jchiwaii/concrete-ui"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold underline decoration-2 underline-offset-4 hover:no-underline"
          >
            View on GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
