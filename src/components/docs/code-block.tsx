"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-2">
        <span className="rounded-md border-2 border-white bg-black px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className={`
            flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1
            text-xs font-semibold uppercase tracking-wide
            transition-all duration-100
            ${
              copied
                ? "border-black bg-[#22c55e] text-black"
                : "border-white text-white hover:bg-[#ffde00] hover:text-black"
            }
          `}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#171717] p-4 text-sm font-mono leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
