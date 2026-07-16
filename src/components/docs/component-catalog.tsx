"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import {
  ComponentCategory,
  componentCategories,
  componentRegistry,
  getComponentHref,
} from "@/lib/component-registry";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | ComponentCategory;

export function ComponentCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return componentRegistry.filter((component) => {
      const matchesCategory = category === "All" || component.category === category;
      const matchesQuery = `${component.name} ${component.description} ${component.category}`
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface-muted)] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or use case"
          aria-label="Search components"
        />
        <span className="text-sm font-medium text-gray-600">
          {results.length} of {componentRegistry.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Filter components by category">
        {(["All", ...componentCategories] as CategoryFilter[]).map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={category === filter}
            onClick={() => setCategory(filter)}
            className={cn(
              "rounded-full border-2 border-black px-3 py-1.5 text-xs font-semibold transition-colors",
              category === filter
                ? "bg-black text-white"
                : "bg-[var(--ui-surface)] text-black hover:bg-[var(--ui-accent-soft)]"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((component) => (
            <Link
              key={component.slug}
              href={getComponentHref(component.slug)}
              className="group rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] p-5 shadow-[var(--ui-shadow)] transition-[transform,box-shadow,background-color] hover:-translate-x-px hover:-translate-y-px hover:bg-[var(--ui-accent-soft)] hover:shadow-[var(--ui-shadow-md)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold tracking-[-0.025em]">{component.name}</h2>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{component.description}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                {component.category}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] p-8 text-center shadow-[var(--ui-shadow)]">
          <h2 className="font-semibold">No components found</h2>
          <p className="mt-2 text-sm text-gray-600">Try a shorter search or another category.</p>
        </div>
      )}
    </div>
  );
}
