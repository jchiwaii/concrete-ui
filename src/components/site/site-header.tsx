"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Templates", href: "/docs/templates" },
];

function ConcreteMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M18 2 33 10.5v15L18 34 3 25.5v-15L18 2Z" />
      <path d="m18 9 8.5 4.8v8.4L18 27l-8.5-4.8v-8.4L18 9Z" />
      <path d="M3 10.5 18 19l15-8.5M18 19v15" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="tactical-header">
      <div className="tactical-header-inner">
        <Link href="/" className="tactical-brand" aria-label="Concrete UI home">
          <ConcreteMark />
          <span>
            <strong>Concrete</strong>
            <small>Interface systems</small>
          </span>
        </Link>

        <div className="tactical-header-status" aria-label="Build status">
          <span />
          Network stable
        </div>

        <nav className="tactical-desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/jchiwaii/concrete-ui"
            target="_blank"
            rel="noreferrer"
            className="tactical-header-cta"
          >
            Source ↗
          </a>
        </nav>

        <button
          type="button"
          className="tactical-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" className={open ? "is-open" : ""}>
            <b />
            <b />
          </i>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`tactical-mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        <span className="tactical-mobile-label">Select destination</span>
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {link.label}
            <b aria-hidden="true">→</b>
          </Link>
        ))}
        <a
          href="https://github.com/jchiwaii/concrete-ui"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          <span>04</span>
          GitHub source
          <b aria-hidden="true">↗</b>
        </a>
      </nav>
    </header>
  );
}
