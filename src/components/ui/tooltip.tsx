"use client";

import {
  FocusEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Placement } from "@/lib/positioning";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";
import { cn } from "@/lib/utils";

interface TooltipTriggerProps {
  ref?: Ref<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  "aria-describedby"?: string;
}

export interface TooltipProps {
  content: ReactNode;
  placement?: Placement;
  delay?: number;
  children: ReactNode;
  variant?: "dark" | "light";
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

export function Tooltip({
  content,
  placement = "top",
  delay = 350,
  children,
  variant = "dark",
}: TooltipProps) {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const position = useOverlayPosition(
    triggerRef,
    tooltipRef,
    isVisible,
    placement
  );

  const clearTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const show = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    clearTimer();
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVisible]);

  useEffect(() => clearTimer, []);

  let trigger: ReactNode;

  if (isValidElement(children)) {
    const child = children as ReactElement<TooltipTriggerProps>;
    trigger = cloneElement(child, {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        assignRef(child.props.ref, node);
      },
      onMouseEnter: (event) => {
        child.props.onMouseEnter?.(event);
        if (!event.defaultPrevented) show();
      },
      onMouseLeave: (event) => {
        child.props.onMouseLeave?.(event);
        if (!event.defaultPrevented) hide();
      },
      onFocus: (event) => {
        child.props.onFocus?.(event);
        if (!event.defaultPrevented) show();
      },
      onBlur: (event) => {
        child.props.onBlur?.(event);
        if (!event.defaultPrevented) hide();
      },
      "aria-describedby": isVisible
        ? tooltipId
        : child.props["aria-describedby"],
    });
  } else {
    trigger = (
      <span
        ref={triggerRef}
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </span>
    );
  }

  return (
    <>
      {trigger}
      {isVisible &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={cn(
              "pointer-events-none fixed z-[9999] max-w-xs rounded-[var(--ui-radius-sm)] border-2 px-3 py-2 text-xs font-medium leading-5 shadow-[var(--ui-shadow-sm)] animate-brutal-fade-in",
              variant === "dark"
                ? "border-white bg-[var(--ui-ink)] text-white"
                : "border-black bg-[var(--ui-surface)] text-black"
            )}
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

Tooltip.displayName = "Tooltip";
