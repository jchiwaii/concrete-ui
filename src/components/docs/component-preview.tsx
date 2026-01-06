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
    <div className="border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
      {/* Header */}
      <div className="p-4 border-b-4 border-black bg-[#FFFF00]">
        <h3 className="text-xl font-extrabold uppercase tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm font-medium">{description}</p>
        )}
      </div>

      {/* Preview */}
      <div className="p-8 min-h-[200px] flex items-center justify-center bg-[repeating-linear-gradient(45deg,#f5f5f5,#f5f5f5_10px,#ffffff_10px,#ffffff_20px)]">
        {children}
      </div>

      {/* Toggle */}
      <div className="border-t-4 border-black">
        <button
          onClick={() => setShowCode(!showCode)}
          className={`
            w-full px-4 py-3
            text-sm font-bold uppercase tracking-wider
            transition-all duration-100
            flex items-center justify-between
            ${
              showCode
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }
          `}
        >
          <span>{showCode ? "HIDE CODE" : "SHOW CODE"}</span>
          <span className="text-lg">{showCode ? "−" : "+"}</span>
        </button>
      </div>

      {/* Code */}
      {showCode && (
        <div className="border-t-4 border-black">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
