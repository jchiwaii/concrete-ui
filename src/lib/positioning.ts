export type Placement = "top" | "bottom" | "left" | "right";

export interface Position {
  top: number;
  left: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function calculatePosition(
  trigger: DOMRect,
  content: DOMRect,
  placement: Placement = "bottom"
): Position {
  const spacing = 8; // Space between trigger and content
  let top = 0;
  let left = 0;

  // Calculate initial position based on placement
  switch (placement) {
    case "top":
      top = trigger.top - content.height - spacing;
      left = trigger.left + (trigger.width - content.width) / 2;
      break;
    case "bottom":
      top = trigger.bottom + spacing;
      left = trigger.left + (trigger.width - content.width) / 2;
      break;
    case "left":
      top = trigger.top + (trigger.height - content.height) / 2;
      left = trigger.left - content.width - spacing;
      break;
    case "right":
      top = trigger.top + (trigger.height - content.height) / 2;
      left = trigger.right + spacing;
      break;
  }

  // Viewport collision detection
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 16; // Padding from viewport edges

  left = clamp(left, padding, viewportWidth - content.width - padding);
  top = clamp(top, padding, viewportHeight - content.height - padding);

  return { top, left };
}
