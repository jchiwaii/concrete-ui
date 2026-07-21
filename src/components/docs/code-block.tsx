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
        ${embedded ? "" : "border border-[#d8d5c8]/20 bg-[#111410]"}
      `}
    >
      <div className="flex items-center justify-between border-b border-[#d8d5c8]/20 bg-[#181c16] px-4 py-2.5">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#999c92]">
          Source / {language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-live="polite"
          className={`
            flex min-h-8 items-center gap-1.5 border px-2.5 py-1
            font-mono text-[9px] font-semibold uppercase tracking-[0.1em]
            transition-colors duration-100
            ${
              copied
                ? "border-[#9cad72] bg-[#9cad72] text-[#080a08]"
                : "border-[#d8d5c8]/30 bg-transparent text-[#d8d5c8] hover:border-[#f2c230] hover:text-[#f2c230]"
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
      <pre className="m-0 overflow-x-auto rounded-none border-0 bg-[#080a08] p-4 font-mono text-[12px] leading-6 text-[#d8d5c8] sm:p-5">
        <code>{code}</code>
      </pre>
    </div>
  );
}
