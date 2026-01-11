"use client";

import {
  ReactNode,
  useState,
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { calculatePosition, Placement } from "@/lib/positioning";

export interface TooltipProps {
  content: ReactNode;
  placement?: Placement;
  delay?: number;
  children: ReactNode;
  variant?: "dark" | "light";
}

export function Tooltip({
  content,
  placement = "top",
  delay = 500,
  children,
  variant = "dark",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Calculate position when visible
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const pos = calculatePosition(triggerRect, tooltipRect, placement);
      setPosition(pos);
    }
  }, [isVisible, placement]);

  // Clone child and add event handlers
  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ref: (node: HTMLElement) => {
          triggerRef.current = node;
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })
    : children;

  const tooltipStyles = `
    absolute
    z-[9999]
    px-3 py-2
    max-w-xs
    border-4 border-black
    shadow-[3px_3px_0_0_#000]
    font-bold uppercase tracking-wider text-xs
    whitespace-nowrap
    pointer-events-none
    ${
      variant === "dark"
        ? "bg-black text-white border-white"
        : "bg-white text-black border-black"
    }
  `;

  return (
    <>
      {trigger}
      {isVisible &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className={tooltipStyles}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            role="tooltip"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

Tooltip.displayName = "Tooltip";
