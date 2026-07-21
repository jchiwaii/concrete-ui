"use client";

import { useId, useState, ReactNode } from "react";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: ReactNode;
  code: string;
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const codeId = useId();

  return (
    <section className="docs-source-panel">
      <div className="grid border-b border-[#d8d5c8]/20 bg-[#111410] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch">
        <div className="px-4 py-3 sm:px-5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#f2c230]">Live specimen / 01</p>
          <h2 className="mt-1 font-['Barlow_Condensed'] text-lg font-semibold uppercase tracking-[0.01em] text-[#efede4]">{title}</h2>
          {description && <p className="mt-1 max-w-2xl text-xs leading-5 text-[#999c92]">{description}</p>}
        </div>
        <div className="flex border-t border-[#d8d5c8]/20 sm:border-t-0 sm:border-l">
          <span className="flex items-center gap-2 px-3 font-mono text-[9px] uppercase tracking-[0.12em] whitespace-nowrap text-[#9cad72] sm:px-4">
            <i className="h-1.5 w-1.5 bg-current" /> Active
          </span>
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            aria-expanded={showCode}
            aria-controls={codeId}
            className={`min-h-11 border-l border-[#d8d5c8]/20 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors sm:px-4 ${
              showCode ? "bg-[#f2c230] text-[#080a08]" : "text-[#d8d5c8] hover:bg-[#181c16] hover:text-[#f2c230]"
            }`}
          >
            {showCode ? "Close source" : "Inspect source"}
          </button>
        </div>
      </div>

      <div className="docs-specimen-stage flex items-center justify-center p-5 text-[#080a08] sm:p-10">
        <div className="relative z-[1] flex w-full items-center justify-center">
          {children}
        </div>
      </div>

      {showCode && (
        <div id={codeId} className="border-t border-[#d8d5c8]/20">
          <CodeBlock code={code} embedded />
        </div>
      )}
    </section>
  );
}
