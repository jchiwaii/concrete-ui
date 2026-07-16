"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  embedded?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  embedded = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${embedded ? "" : "rounded-[var(--ui-radius-lg)] border-2 border-black shadow-[var(--ui-shadow)]"}
      `}
    >
      <div className="flex items-center justify-between border-b-2 border-black bg-[var(--ui-accent)] px-4 py-2.5">
        <span className="rounded-[var(--ui-radius-sm)] border-2 border-black bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-black">
          {language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-live="polite"
          className={`
            flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1
            text-xs font-semibold
            transition-all duration-100
            ${
              copied
                ? "border-black bg-[var(--ui-success)] text-black"
                : "border-black bg-white text-black hover:bg-black hover:text-white"
            }
          `}
        >
          {copyFailed ? (
            "Copy failed"
          ) : copied ? (
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
      <pre className="m-0 overflow-x-auto rounded-none border-0 bg-[var(--ui-ink)] p-4 font-mono text-[13px] leading-6 text-gray-100 sm:p-5">
        <code>{code}</code>
      </pre>
    </div>
  );
}
