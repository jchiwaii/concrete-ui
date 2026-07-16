"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  buttonStyles,
} from "@/components/ui";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Templates", href: "/docs/templates" },
];

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="Concrete UI home">
      <span className="text-xl font-bold tracking-[-0.045em]">Concrete</span>
      <span className="rounded-[4px] bg-black px-1.5 py-0.5 text-xs font-bold text-white">UI</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-black bg-[color:var(--ui-surface)/0.94] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--ui-radius-sm)] px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-black/5 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/jchiwaii/concrete-ui"
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({ variant: "neutral", size: "sm", className: "ml-2" })}
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-[var(--ui-radius-sm)] border-2 border-black bg-[var(--ui-accent)] shadow-[var(--ui-shadow-sm)] md:hidden"
        >
          <span className="grid gap-1" aria-hidden="true">
            <span className="h-0.5 w-5 bg-black" />
            <span className="h-0.5 w-5 bg-black" />
            <span className="h-0.5 w-5 bg-black" />
          </span>
        </button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} direction="right" ariaLabel="Site navigation">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navigate</DrawerTitle>
            <DrawerClose onClose={() => setOpen(false)} />
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] px-4 py-3 text-base font-semibold shadow-[var(--ui-shadow-sm)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/jchiwaii/concrete-ui"
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ variant: "neutral", size: "lg", className: "mt-3" })}
            >
              View on GitHub
            </a>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
