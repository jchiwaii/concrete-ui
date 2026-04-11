"use client";

import { RefObject, useCallback, useEffect, useState } from "react";
import { calculatePosition, Placement, Position } from "@/lib/positioning";

export function useOverlayPosition(
  triggerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  open: boolean,
  placement: Placement = "bottom"
): Position {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    setPosition(
      calculatePosition(
        triggerRef.current.getBoundingClientRect(),
        contentRef.current.getBoundingClientRect(),
        placement
      )
    );
  }, [contentRef, open, placement, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  return position;
}
