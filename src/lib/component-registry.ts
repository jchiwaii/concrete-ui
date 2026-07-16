export type ComponentCategory =
  | "Inputs & Actions"
  | "Layout & Content"
  | "Navigation"
  | "Overlays & Feedback"
  | "Data & Utility";

export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  category: ComponentCategory;
}

export const componentRegistry: ComponentMeta[] = [
  { name: "Button", slug: "button", description: "Primary, secondary, and quiet actions.", category: "Inputs & Actions" },
  { name: "Button Group", slug: "button-group", description: "Related actions in one shared frame.", category: "Inputs & Actions" },
  { name: "Checkbox", slug: "checkbox", description: "Boolean and multi-select form control.", category: "Inputs & Actions" },
  { name: "Combobox", slug: "combobox", description: "Searchable single-value selection.", category: "Inputs & Actions" },
  { name: "Date Picker", slug: "date-picker", description: "Date entry with an anchored calendar.", category: "Inputs & Actions" },
  { name: "Field", slug: "field", description: "Accessible form field composition.", category: "Inputs & Actions" },
  { name: "File Upload", slug: "file-upload", description: "Drag, drop, and validate file input.", category: "Inputs & Actions" },
  { name: "Input", slug: "input", description: "Text input with clear focus and error states.", category: "Inputs & Actions" },
  { name: "Input Group", slug: "input-group", description: "Inputs with connected addons and actions.", category: "Inputs & Actions" },
  { name: "Label", slug: "label", description: "Accessible labels and required states.", category: "Inputs & Actions" },
  { name: "Multi Select", slug: "multi-select", description: "Searchable selection with removable values.", category: "Inputs & Actions" },
  { name: "Radio Group", slug: "radio-group", description: "Single selection from a visible set.", category: "Inputs & Actions" },
  { name: "Select", slug: "select", description: "Compact single-value selection.", category: "Inputs & Actions" },
  { name: "Slider", slug: "slider", description: "Keyboard-accessible numeric range input.", category: "Inputs & Actions" },
  { name: "Switch", slug: "switch", description: "Immediate on and off setting control.", category: "Inputs & Actions" },
  { name: "Textarea", slug: "textarea", description: "Multi-line text entry with validation.", category: "Inputs & Actions" },
  { name: "Toggle", slug: "toggle", description: "Pressable two-state action.", category: "Inputs & Actions" },
  { name: "Toggle Group", slug: "toggle-group", description: "Single or multiple grouped toggles.", category: "Inputs & Actions" },

  { name: "Aspect Ratio", slug: "aspect-ratio", description: "Predictable media proportions.", category: "Layout & Content" },
  { name: "Card", slug: "card", description: "Composable content surface with restrained depth.", category: "Layout & Content" },
  { name: "Item", slug: "item", description: "Flexible list and settings row.", category: "Layout & Content" },
  { name: "Resizable", slug: "resizable", description: "Keyboard and pointer resizable panels.", category: "Layout & Content" },
  { name: "Scroll Area", slug: "scroll-area", description: "Contained scrolling with styled rails.", category: "Layout & Content" },
  { name: "Separator", slug: "separator", description: "Semantic visual division.", category: "Layout & Content" },

  { name: "Breadcrumb", slug: "breadcrumb", description: "Hierarchical location trail.", category: "Navigation" },
  { name: "Context Menu", slug: "context-menu", description: "Pointer-positioned contextual actions.", category: "Navigation" },
  { name: "Dropdown Menu", slug: "dropdown-menu", description: "Anchored menu for compact actions.", category: "Navigation" },
  { name: "Menubar", slug: "menubar", description: "Application-level command navigation.", category: "Navigation" },
  { name: "Navigation Menu", slug: "navigation-menu", description: "Responsive site and product navigation.", category: "Navigation" },
  { name: "Pagination", slug: "pagination", description: "Page navigation for long collections.", category: "Navigation" },
  { name: "Tabs", slug: "tabs", description: "Keyboard-managed content switching.", category: "Navigation" },

  { name: "Alert", slug: "alert", description: "Inline status and contextual messaging.", category: "Overlays & Feedback" },
  { name: "Alert Dialog", slug: "alert-dialog", description: "Focused confirmation for important choices.", category: "Overlays & Feedback" },
  { name: "Badge", slug: "badge", description: "Compact metadata and status label.", category: "Overlays & Feedback" },
  { name: "Drawer", slug: "drawer", description: "Edge panel with focus and scroll management.", category: "Overlays & Feedback" },
  { name: "Empty", slug: "empty", description: "Helpful zero-state composition.", category: "Overlays & Feedback" },
  { name: "Hover Card", slug: "hover-card", description: "Rich preview for a linked trigger.", category: "Overlays & Feedback" },
  { name: "Modal", slug: "modal", description: "Accessible focused task surface.", category: "Overlays & Feedback" },
  { name: "Popover", slug: "popover", description: "Anchored interactive content.", category: "Overlays & Feedback" },
  { name: "Progress", slug: "progress", description: "Determinate task completion feedback.", category: "Overlays & Feedback" },
  { name: "Skeleton", slug: "skeleton", description: "Reduced-motion loading placeholder.", category: "Overlays & Feedback" },
  { name: "Spinner", slug: "spinner", description: "Compact indeterminate loading state.", category: "Overlays & Feedback" },
  { name: "Toast", slug: "toast", description: "Transient non-blocking notification.", category: "Overlays & Feedback" },
  { name: "Tooltip", slug: "tooltip", description: "Focus and hover supplementary label.", category: "Overlays & Feedback" },

  { name: "Accordion", slug: "accordion", description: "Single or multiple disclosure sections.", category: "Data & Utility" },
  { name: "Avatar", slug: "avatar", description: "Image and fallback identity marker.", category: "Data & Utility" },
  { name: "Calendar", slug: "calendar", description: "Date grid for display and selection.", category: "Data & Utility" },
  { name: "Carousel", slug: "carousel", description: "Snap-scrolling horizontal collection.", category: "Data & Utility" },
  { name: "Collapsible", slug: "collapsible", description: "Compact show and hide primitive.", category: "Data & Utility" },
  { name: "Command", slug: "command", description: "Searchable keyboard command surface.", category: "Data & Utility" },
  { name: "Kbd", slug: "kbd", description: "Keyboard shortcut token.", category: "Data & Utility" },
  { name: "Marquee", slug: "marquee", description: "Reduced-motion-aware continuous strip.", category: "Data & Utility" },
  { name: "Stepper", slug: "stepper", description: "Ordered flow progress and state.", category: "Data & Utility" },
  { name: "Table", slug: "table", description: "Responsive sortable data presentation.", category: "Data & Utility" },
  { name: "Timeline", slug: "timeline", description: "Ordered events and progress history.", category: "Data & Utility" },
];

export const componentCategories: ComponentCategory[] = [
  "Inputs & Actions",
  "Layout & Content",
  "Navigation",
  "Overlays & Feedback",
  "Data & Utility",
];

export const componentGroups = componentCategories.map((category) => ({
  category,
  components: componentRegistry.filter((component) => component.category === category),
}));

export function getComponentHref(slug: string) {
  return `/docs/components/${slug}`;
}
