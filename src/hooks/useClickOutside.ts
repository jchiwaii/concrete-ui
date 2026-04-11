import { RefObject, useEffect } from "react";

type OutsideRef = RefObject<HTMLElement | null>;

export function useClickOutside(
  refs: OutsideRef | OutsideRef[],
  handler: (event: PointerEvent) => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const refList = Array.isArray(refs) ? refs : [refs];

    const listener = (event: PointerEvent) => {
      const target = event.target as Node;
      const isInside = refList.some((ref) => ref.current?.contains(target));

      if (isInside) {
        return;
      }

      handler(event);
    };

    document.addEventListener("pointerdown", listener, true);

    return () => {
      document.removeEventListener("pointerdown", listener, true);
    };
  }, [enabled, handler, refs]);
}
