export type Placement = "top" | "bottom" | "left" | "right";

export interface Position {
  top: number;
  left: number;
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

  // Adjust if off-screen horizontally
  if (left < padding) {
    left = padding;
  } else if (left + content.width > viewportWidth - padding) {
    left = viewportWidth - content.width - padding;
  }

  // Adjust if off-screen vertically
  if (top < padding) {
    top = padding;
  } else if (top + content.height > viewportHeight - padding) {
    top = viewportHeight - content.height - padding;
  }

  return { top, left };
}
