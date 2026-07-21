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

  const groupedResults = componentCategories
    .map((group) => ({
      category: group,
      components: results.filter((component) => component.category === group),
    }))
    .filter((group) => group.components.length > 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 border-y border-[#d8d5c8]/20 bg-[#111410] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or use case"
          aria-label="Search components"
          className="border-[#d8d5c8]/30 bg-[#181c16] text-[#efede4] shadow-none placeholder:text-[#777b72] focus:border-[#f2c230] focus:translate-x-0 focus:translate-y-0 focus:shadow-none"
        />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999c92]">
          Indexed {String(results.length).padStart(2, "0")} / {String(componentRegistry.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-wrap gap-px border border-[#d8d5c8]/20 bg-[#d8d5c8]/20" aria-label="Filter components by category">
        {(["All", ...componentCategories] as CategoryFilter[]).map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={category === filter}
            onClick={() => setCategory(filter)}
            className={cn(
              "min-h-9 flex-1 bg-[#111410] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] transition-colors",
              category === filter
                ? "!bg-[#f2c230] text-[#080a08]"
                : "text-[#999c92] hover:!bg-[#181c16] hover:text-[#efede4]"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="space-y-10">
          {groupedResults.map((group, groupIndex) => (
            <section key={group.category} aria-labelledby={`catalog-${groupIndex}`}>
              <div className="mb-3 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[#777b72]">
                <h2 id={`catalog-${groupIndex}`} className="font-mono text-[9px] font-semibold">{String(groupIndex + 1).padStart(2, "0")} / {group.category}</h2>
                <span>{String(group.components.length).padStart(2, "0")} units</span>
              </div>
              <div className="docs-rows">
                {group.components.map((component) => {
                  const index = componentRegistry.findIndex((item) => item.slug === component.slug) + 1;
                  return (
                    <Link key={component.slug} href={getComponentHref(component.slug)} className="docs-row group">
                      <span className="docs-row-code">{String(index).padStart(2, "0")}</span>
                      <span className="docs-row-copy">
                        <h3>{component.name}</h3>
                        <p>{component.description}</p>
                      </span>
                      <span className="docs-row-arrow" aria-hidden="true">→</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="border border-[#d8d5c8]/20 bg-[#111410] p-10 text-center">
          <h2 className="font-['Barlow_Condensed'] text-xl font-semibold uppercase text-[#efede4]">No components found</h2>
          <p className="mt-2 text-sm text-[#999c92]">Try a shorter search or another category.</p>
        </div>
      )}
    </div>
  );
}
