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
    <section className="overflow-hidden rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]">
      <div className="border-b-2 border-black bg-[var(--ui-surface-muted)] px-5 py-4">
        <h2 className="text-base font-semibold tracking-[-0.025em]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="flex min-h-[220px] items-center justify-center bg-dot-pattern p-5 sm:p-8">
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>

      <div className="border-t-2 border-black">
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          aria-expanded={showCode}
          aria-controls={codeId}
          className={`
            flex w-full items-center justify-between px-5 py-3
            text-sm font-semibold
            transition-all duration-150
            ${
              showCode
                ? "border-b-2 border-black bg-[var(--ui-accent)] text-black"
                : "bg-white text-gray-700 hover:bg-[var(--ui-accent-soft)] hover:text-black"
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {showCode ? "Hide Code" : "View Code"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-150 ${showCode ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showCode && (
        <div id={codeId}>
          <CodeBlock code={code} embedded />
        </div>
      )}
    </section>
  );
}
