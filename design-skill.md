# Concrete UI - Current Design Skill

## Overview

**Concrete UI** is a modern, clean neo-brutalist React UI library.
It combines bold visual identity (borders + hard shadows + saturated accents) with cleaner spacing, softer card corners, and practical developer ergonomics.

This file documents the **current implemented style** and should be used as the source of truth for future edits.

---

## Current Visual Direction

- Neo-brutal foundation with modern polish.
- Strong outlines and hard shadow offsets.
- Saturated accents used intentionally, not everywhere.
- Mostly flat color blocks and pattern backgrounds.
- Structured, readable layout system with generous whitespace.

---

## Design Tokens (Current)

### Primary colors

- `--concrete-black: #000000`
- `--concrete-white: #ffffff`
- `--concrete-yellow: #ffde00`
- `--concrete-cyan: #06b6d4`
- `--concrete-magenta: #ec4899`
- `--concrete-red: #ef4444`
- `--concrete-green: #22c55e`
- `--concrete-orange: #f97316`
- `--concrete-lime: #a3e635`

### Structural tokens

- Borders: `2px / 3px / 4px`
- Shadows: mostly `4px 4px 0 #000` to `6px 6px 0 #000`
- Radius system exists and is used (`md/lg/xl`) for cleaner neo-brutal presentation
- Fast transitions: `0.1s` to `0.15s` are the common interaction timings

### Typography

- Display/body: **Space Grotesk**
- Hero/headline utility: **Bebas Neue**
- Code: **JetBrains Mono**
- Uppercase treatment is heavily used for labels, chips, buttons, and section markers

---

## Component Styling Rules (Current)

### Borders and shadows

- Most interactive primitives use `border-2 border-black`.
- Larger structural components may use thicker edges where appropriate.
- Use hard, non-blurred shadow offsets.

### Motion and interaction

- Hover movement is subtle and directional (`-2px` / `-4px` pattern).
- Active states collapse depth (shadow removal + pressed translation).
- Motion should feel immediate, not soft.

### Corners and surfaces

- Rounded corners are part of the current identity (not fully square-only brutalism).
- Use rounded cards/inputs/buttons consistently across the same context.

### Color usage

- Accent colors are bright, but avoid overusing all accents in one area.
- Maintain high text contrast and legibility first.

---

## Landing Page Structure (Current)

### Hero

- Large flowing headline:
  - "Build Loud Interfaces Fast And Furiously"
- Supporting paragraph and primary CTAs.
- Quick win badge row below hero content.

### Removed noisy setup block

The previous hero support panel content has been removed:

- Starter Command / Quick setup block
- Git clone + install command snippet
- 27+ Components / A11y mini-stats
- Build posture / Fast setup card

This keeps the top fold focused and less distracting.

### Scrolling signal strip

- Black background strip with marquee motion.
- Large, bold, uppercase moving labels.
- Alternating high-contrast neo-brutal chips.

### Remaining sections

- "Why teams pick concrete ui"
- Component blend showcase
- CTA + footer

All kept intact with consistent visual language.

---

## Component Library Surface (Current)

Concrete UI currently documents and ships components across:

- Form and input primitives
- Feedback and notification components
- Navigation components
- Data display and structure components
- Overlay/dialog primitives

The docs pages use a shared preview pattern and code toggle style, with strong border/shadow treatment and consistent spacing.

---

## Contribution Rules

When updating existing pages/components:

1. Preserve current spacing rhythm and type scale.
2. Keep border/shadow language consistent with current tokens.
3. Keep interactions snappy (`0.1s` to `0.15s`).
4. Avoid introducing soft/glassy styles that conflict with the neo-brutal system.
5. Prefer composition and shared primitives over one-off visual rules.

---

## Do / Avoid

### Do

- Use strong black outlines and hard shadows
- Use clear hierarchy and uppercase utility labels
- Keep layouts expressive but readable
- Maintain mobile + desktop visual integrity

### Avoid

- Reintroducing noisy hero clutter in top fold
- Over-layering too many competing accents in one section
- Slow, floaty transitions
- Inconsistent border/shadow depths across similar components
