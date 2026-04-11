"use client";

import { HTMLAttributes, ReactNode, forwardRef, useRef, useState } from "react";
import { cn, clamp } from "@/lib/utils";

export interface ResizableProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode;
  right: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const Resizable = forwardRef<HTMLDivElement, ResizableProps>(
  ({ className = "", left, right, defaultSize = 50, minSize = 20, maxSize = 80, ...props }, ref) => {
    const [size, setSize] = useState(defaultSize);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId) || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setSize(clamp(next, minSize, maxSize));
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("grid overflow-hidden rounded-lg border-2 border-black bg-white shadow-[4px_4px_0_0_#000]", className)}
        style={{ gridTemplateColumns: `${size}% 10px 1fr` }}
        {...props}
      >
        <div className="min-w-0 overflow-auto p-4">{left}</div>
        <button
          type="button"
          aria-label="Resize panels"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          className="cursor-col-resize border-x-2 border-black bg-[#ffde00] hover:bg-[#06b6d4]"
        />
        <div className="min-w-0 overflow-auto p-4">{right}</div>
      </div>
    );
  }
);

Resizable.displayName = "Resizable";

export { Resizable };
