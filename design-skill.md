# Concrete UI - Design System Documentation

## Overview

**Concrete UI** is a neo-brutalist React component library featuring bold borders, hard shadows, and raw aesthetics. Copy & paste components into your React + Tailwind CSS projects.

---

## Design Principles

<brutal_aesthetics>
When building components for the Brutal UI library:

### Typography

- Use Space Grotesk 800 for primary text
- JetBrains Mono for monospace needs
- All-caps for buttons, badges, labels
- Size hierarchy: 3x+ jumps between levels

### Color

- Thick black borders (4-6px) on ALL components
- Hard shadows: box-shadow: 6px 6px 0 black
- Saturated, bold colors: #FFFF00, #0000FF, #FF00FF
- No gradients, no subtle transparency

### Motion

- Abrupt transitions (0.1s max)
- Scale transforms on hover (1.05-1.1)
- Shadow position shifts for depth
- Staggered page load animations

### Shapes

- Sharp corners (border-radius: 0-4px max)
- Generous padding (minimum 16px)
- Chunky components with visual weight
  </brutal_aesthetics>

---

## Color Palette

| Color   | Hex       | Usage                  |
| ------- | --------- | ---------------------- |
| Black   | `#000000` | Borders, shadows, text |
| White   | `#FFFFFF` | Backgrounds            |
| Yellow  | `#FFFF00` | Primary accent, CTAs   |
| Cyan    | `#00FFFF` | Secondary accent       |
| Magenta | `#FF00FF` | Tertiary accent        |
| Red     | `#FF0000` | Danger, errors         |
| Green   | `#00FF00` | Success states         |
| Orange  | `#FF6600` | Warnings               |
| Lime    | `#CCFF00` | Alternative accent     |

---

## Components

### Core Components

1. **Button** - Primary interaction element with 6 variants
2. **Card** - Content container with color variants
3. **Badge** - Status indicators and labels
4. **Input** - Text input with focus effects
5. **Textarea** - Multi-line text input
6. **Checkbox** - Selection control with checkmark
7. **Toggle** - On/off switch
8. **Alert** - Notification banners (info, success, warning, danger)

### Layout Components

9. **Tabs** - Tabbed interface (single selection)
10. **Accordion** - Collapsible sections (single/multiple)
11. **Modal** - Dialog overlay with backdrop
12. **Separator** - Content divider

### Data Display

13. **Avatar** - User profile images with fallback
14. **Progress** - Progress bars with color variants
15. **Skeleton** - Loading placeholders

---

## Installation

### Requirements

- React 18+
- Tailwind CSS 3+
- TypeScript (recommended)

### Step 1: Add Fonts

```html
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Step 2: Add CSS Variables

```css
:root {
  --concrete-black: #000000;
  --concrete-white: #ffffff;
  --concrete-yellow: #ffff00;
  --concrete-cyan: #00ffff;
  --concrete-magenta: #ff00ff;
  --concrete-red: #ff0000;
  --concrete-green: #00ff00;
  --concrete-orange: #ff6600;
  --concrete-lime: #ccff00;

  --concrete-shadow: 6px 6px 0 var(--concrete-black);
  --concrete-shadow-sm: 4px 4px 0 var(--concrete-black);
  --concrete-shadow-lg: 8px 8px 0 var(--concrete-black);

  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

### Step 3: Copy Components

Copy components from `/src/components/ui/` into your project.

---

## Usage Example

```tsx
import { Button, Card, CardContent, Badge } from "@/components/ui";

export default function MyPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <Badge variant="primary">NEW</Badge>
        <h2 className="text-2xl font-extrabold uppercase mt-4">
          Hello Brutal World
        </h2>
        <Button variant="primary" className="mt-4">
          CLICK ME
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens & base styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── docs/
│       ├── layout.tsx       # Docs layout with sidebar
│       ├── page.tsx         # Introduction
│       ├── installation/
│       └── components/
│           ├── button/
│           ├── card/
│           ├── badge/
│           └── ...
├── components/
│   ├── ui/                  # UI components (copy these)
│   │   ├── index.ts
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── docs/                # Documentation components
│       ├── code-block.tsx
│       ├── component-preview.tsx
│       └── sidebar.tsx
```

---

## Design Guidelines

### DO ✅

- Use thick black borders (4-6px)
- Apply hard drop shadows (no blur)
- Use saturated, bold colors
- Keep corners sharp (0-4px radius)
- Make transitions snappy (100ms)
- Use uppercase for labels
- Add generous padding

### DON'T ❌

- Use gradients
- Use subtle transparency
- Use rounded corners (>4px)
- Use slow transitions (>100ms)
- Use muted/pastel colors
- Use thin borders (<4px)

---

## Credits

**Concrete UI** - Neo Brutalist Component Library  
Built with React, Tailwind CSS, and brutal honesty.
