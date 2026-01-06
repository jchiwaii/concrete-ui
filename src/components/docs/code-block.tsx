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
    <div className="relative group">
      <pre className="overflow-x-auto p-4 bg-[#171717] text-[#f5f5f5] border-4 border-black text-sm font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className={`
          absolute top-3 right-3
          px-3 py-1.5
          text-xs font-bold uppercase tracking-wider
          border-2 border-black
          shadow-[2px_2px_0_0_#000]
          transition-all duration-100
          hover:translate-x-[-2px] hover:translate-y-[-2px]
          hover:shadow-[4px_4px_0_0_#000]
          active:translate-x-0 active:translate-y-0
          active:shadow-none
          ${copied ? "bg-[#00FF00] text-black" : "bg-white text-black"}
        `}
      >
        {copied ? "COPIED!" : "COPY"}
      </button>
    </div>
  );
}
