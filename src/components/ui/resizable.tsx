"use client";

import { HTMLAttributes, ReactNode, forwardRef, useRef, useState } from "react";
import { cn, clamp } from "@/lib/utils";

export interface ResizableProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode;
  right: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  onSizeChange?: (size: number) => void;
}

const Resizable = forwardRef<HTMLDivElement, ResizableProps>(
  ({ className = "", left, right, defaultSize = 50, minSize = 20, maxSize = 80, onSizeChange, ...props }, ref) => {
    const [size, setSize] = useState(defaultSize);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const updateSize = (nextSize: number) => {
      const clampedSize = clamp(nextSize, minSize, maxSize);
      setSize(clampedSize);
      onSizeChange?.(clampedSize);
    };

    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId) || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      updateSize(next);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      let nextSize = size;
      if (event.key === "ArrowLeft") nextSize -= 2;
      else if (event.key === "ArrowRight") nextSize += 2;
      else if (event.key === "Home") nextSize = minSize;
      else if (event.key === "End") nextSize = maxSize;
      else return;

      event.preventDefault();
      updateSize(nextSize);
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("grid overflow-hidden rounded-[var(--ui-radius-lg)] border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]", className)}
        style={{ gridTemplateColumns: `${size}% 12px 1fr` }}
        {...props}
      >
        <div className="min-w-0 overflow-auto p-4">{left}</div>
        <button
          type="button"
          role="separator"
          aria-label="Resize panels"
          aria-orientation="vertical"
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          aria-valuenow={Math.round(size)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
          className="touch-none cursor-col-resize border-x-2 border-black bg-[var(--ui-accent)] transition-colors hover:bg-[var(--ui-info)]"
        />
        <div className="min-w-0 overflow-auto p-4">{right}</div>
      </div>
    );
  }
);

Resizable.displayName = "Resizable";

export { Resizable };
