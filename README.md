# Concrete UI

**Neo Brutalist Component Library for React**

Bold, unapologetic UI components with thick borders, hard shadows, and raw aesthetics. Copy & paste into your React + Tailwind CSS projects.

![Concrete UI](https://img.shields.io/badge/style-neo%20brutalist-yellow?style=flat-square)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-cyan?style=flat-square)

## Features

- 🎨 **Bold Design** - Thick borders, hard shadows, saturated colors
- 📋 **Copy & Paste** - No package to install, just copy component code
- ⚡ **Fast & Light** - Pure React + Tailwind, no heavy dependencies
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎯 **TypeScript** - Full type support

## Components

### Core
- Button (6 variants, 3 sizes)
- Card (with Header, Content, Footer)
- Badge (6 variants, 3 sizes)
- Input & Textarea
- Checkbox & Toggle
- Alert (5 variants)

### Layout
- Tabs
- Accordion
- Modal
- Separator

### Data Display
- Avatar
- Progress
- Skeleton

## Quick Start

### 1. Install Requirements

```bash
npm install react tailwindcss
```

### 2. Add Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Copy Components

Copy the components from `src/components/ui/` into your project.

### 4. Use

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

## Design Principles

- **Borders**: 4-6px solid black on everything
- **Shadows**: Hard drop shadows (no blur): `6px 6px 0 #000`
- **Colors**: Saturated & bold (#FFFF00, #00FFFF, #FF00FF)
- **Corners**: Sharp (0-4px radius max)
- **Typography**: Space Grotesk, uppercase labels
- **Motion**: Snappy 100ms transitions

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

MIT

---

**Concrete UI** - Built with brutal honesty.
