import { useState, useCallback, KeyboardEvent } from "react";

export interface UseKeyboardNavOptions<T> {
  items: T[];
  onSelect: (item: T) => void;
  loop?: boolean; // Whether to loop from end to start
}

export interface UseKeyboardNavReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  resetSelection: () => void;
}

export function useKeyboardNav<T>({
  items,
  onSelect,
  loop = true,
}: UseKeyboardNavOptions<T>): UseKeyboardNavReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            if (prev < items.length - 1) {
              return prev + 1;
            }
            return loop ? 0 : prev;
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => {
            if (prev > 0) {
              return prev - 1;
            }
            return loop ? items.length - 1 : prev;
          });
          break;

        case "Enter":
          e.preventDefault();
          if (items[selectedIndex]) {
            onSelect(items[selectedIndex]);
          }
          break;

        case "Home":
          e.preventDefault();
          setSelectedIndex(0);
          break;

        case "End":
          e.preventDefault();
          setSelectedIndex(items.length - 1);
          break;
      }
    },
    [items, selectedIndex, onSelect, loop]
  );

  const resetSelection = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    resetSelection,
  };
}
