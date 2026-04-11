"use client";

import { RefObject, useEffect } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void
) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const root = ref.current;
    if (!root) return;

    const previous = document.activeElement as HTMLElement | null;

    const getFocusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0
      );

    const initialFocusables = getFocusables();
    const first = initialFocusables[0];

    if (!root.contains(document.activeElement)) {
      if (first) {
        first.focus();
      } else {
        root.tabIndex = -1;
        root.focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        return;
      }

      const focusables = getFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.key !== "Tab" || focusables.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previous?.isConnected) {
        previous.focus();
      }
    };
  }, [active, onEscape, ref]);
}
