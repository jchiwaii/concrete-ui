"use client";

import { useState, ReactNode } from "react";
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

  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0_0_#000] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b-2 border-black bg-gray-50">
        <h3 className="text-base font-bold tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      {/* Preview Area */}
      <div className="p-8 min-h-[180px] flex items-center justify-center bg-[radial-gradient(circle,#e5e5e5_1px,transparent_1px)] bg-[size:16px_16px]">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Code Toggle */}
      <div className="border-t-2 border-black">
        <button
          onClick={() => setShowCode(!showCode)}
          className={`
            w-full px-5 py-3
            text-sm font-semibold
            transition-all duration-150
            flex items-center justify-between
            ${
              showCode
                ? "bg-gray-900 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-black"
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

      {/* Code Block */}
      {showCode && (
        <div className="border-t-2 border-black">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
