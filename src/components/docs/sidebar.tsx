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
    <Link href="/" className="inline-flex items-center gap-3 text-[#efede4]" aria-label="Concrete UI home">
      <svg className="h-8 w-8 text-[#f2c230]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 2 33 10.5v15L18 34 3 25.5v-15L18 2Z" stroke="currentColor" />
        <path d="m18 9 8.5 4.8v8.4L18 27l-8.5-4.8v-8.4L18 9Z" stroke="currentColor" />
        <path d="M3 10.5 18 19l15-8.5M18 19v15" stroke="currentColor" />
      </svg>
      <span className="leading-none">
        <strong className="block font-['Barlow_Condensed'] text-lg font-bold uppercase tracking-[0.04em]">Concrete / UI</strong>
        <small className="mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] text-[#999c92]">Interface armory</small>
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
      "relative block border-l-2 px-3 py-2 text-[13px] transition-colors",
      active
        ? "border-[#f2c230] bg-[#f2c230] font-semibold text-[#080a08]"
        : "border-transparent font-medium text-[#999c92] hover:border-[#78816b] hover:bg-[#181c16] hover:text-[#efede4]"
    );

  return (
    <>
      <div className="mb-6 border-b border-[#d8d5c8]/20 pb-6">
        <label htmlFor={searchId} className="mb-2 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#999c92]">
          Index search
          <span>{componentGroups.reduce((total, group) => total + group.components.length, 0).toString().padStart(2, "0")}</span>
        </label>
        <Input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search loadout"
          sizeVariant="sm"
          className="border-[#d8d5c8]/35 bg-[#181c16] text-[#efede4] shadow-none placeholder:text-[#72766d] focus:border-[#f2c230] focus:translate-x-0 focus:translate-y-0 focus:shadow-none"
        />
      </div>

      {!normalizedQuery && (
        <div className="mb-7">
          <p className="mb-2 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#777b72]">
            00 / Overview
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
        {filteredGroups.map((group, groupIndex) => (
          <section key={group.category}>
            <p className="mb-2 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#777b72]">
              {String(groupIndex + 1).padStart(2, "0")} / {group.category}
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
        <p className="border border-[#d8d5c8]/25 bg-[#181c16] p-4 text-sm text-[#999c92]">
          No component matches &quot;{query}&quot;.
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
      <header className="sticky top-0 z-30 flex h-[66px] items-center justify-between border-b border-[#d8d5c8]/20 bg-[#080a08]/95 px-4 backdrop-blur-xl md:hidden">
        <Brand />
        <button
          type="button"
          aria-label="Open documentation navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="grid h-10 w-10 place-items-center border border-[#d8d5c8]/30 bg-[#111410] text-[#f2c230] transition-colors hover:border-[#f2c230]"
        >
          <span className="sr-only">Open menu</span>
          <span className="grid gap-1" aria-hidden="true">
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
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
        <DrawerContent className="border-[#f2c230] bg-[#111410] text-[#d8d5c8]">
          <DrawerHeader className="border-[#d8d5c8]/20">
            <DrawerTitle className="font-['Barlow_Condensed'] uppercase text-[#efede4]">Component index</DrawerTitle>
            <DrawerClose
              onClose={() => setMobileOpen(false)}
              className="border-[#d8d5c8]/30 bg-[#181c16] text-[#f2c230] shadow-none hover:bg-[#f2c230] hover:text-[#080a08]"
            />
          </DrawerHeader>
          <DrawerBody className="brutal-scroll-area">
            <NavigationContent pathname={pathname} searchId="mobile-component-search" onNavigate={() => setMobileOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[#d8d5c8]/20 bg-[#0d100d] md:flex md:flex-col">
        <div className="border-b border-[#d8d5c8]/20 px-5 py-5">
          <Brand />
          <div className="mt-5 flex items-center justify-between border-t border-[#d8d5c8]/15 pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#777b72]">
            <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 bg-[#9cad72]" /> System online</span>
            <span>V0.1</span>
          </div>
        </div>
        <nav className="brutal-scroll-area min-h-0 flex-1 overflow-y-auto p-4" aria-label="Documentation">
          <NavigationContent pathname={pathname} searchId="desktop-component-search" />
        </nav>
        <div className="border-t border-[#d8d5c8]/20 bg-[#111410] p-4">
          <a
            href="https://github.com/jchiwaii/concrete-ui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d8d5c8] hover:text-[#f2c230]"
          >
            View source <span aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>
    </>
  );
}
