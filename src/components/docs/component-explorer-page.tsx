"use client";

import { ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComponentPreview } from "./component-preview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AspectRatio,
  ButtonGroup,
  Calendar,
  Carousel,
  CarouselItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DatePicker,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FileUpload,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  InputGroup,
  InputGroupAddon,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  Label,
  Marquee,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MultiSelect,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Resizable,
  ScrollArea,
  Spinner,
  Stepper,
  Switch,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui";

interface DemoConfig {
  title: string;
  description: string;
  demo: ReactNode;
  code: string;
}

const comboOptions = [
  { value: "design", label: "Design", description: "Creative and brand roles" },
  { value: "engineering", label: "Engineering", description: "Product and platform teams" },
  { value: "growth", label: "Growth", description: "Marketing and lifecycle work" },
];

const multiOptions = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "tailwind", label: "Tailwind" },
  { value: "typescript", label: "TypeScript" },
];

export function ComponentExplorerPage({ component }: { component: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [toggleValue, setToggleValue] = useState<string | string[]>("left");
  const [comboValue, setComboValue] = useState("design");
  const [multiValue, setMultiValue] = useState<string[]>(["react", "typescript"]);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 11));
  const [files, setFiles] = useState<File[]>([]);

  const demos: Record<string, DemoConfig> = {
    "alert-dialog": {
      title: "Alert Dialog",
      description: "A focused confirmation dialog for destructive or important decisions.",
      demo: (
        <>
          <Button variant="danger" onClick={() => setDialogOpen(true)}>Delete Project</Button>
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. The project and its files will be removed.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setDialogOpen(false)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ),
      code: `const [open, setOpen] = useState(false);

<Button variant="danger" onClick={() => setOpen(true)}>Delete Project</Button>
<AlertDialog open={open} onOpenChange={setOpen}>...</AlertDialog>`,
    },
    "aspect-ratio": {
      title: "Aspect Ratio",
      description: "A simple media wrapper that preserves proportional layouts.",
      demo: <AspectRatio ratio={16 / 9} className="max-w-md rounded-lg border-2 border-black bg-[#06b6d4] shadow-[4px_4px_0_0_#000]" />,
      code: `<AspectRatio ratio={16 / 9} />`,
    },
    "button-group": {
      title: "Button Group",
      description: "Groups related actions with one hard shared outline.",
      demo: <ButtonGroup><Button>Day</Button><Button variant="primary">Week</Button><Button>Month</Button></ButtonGroup>,
      code: `<ButtonGroup><Button>Day</Button><Button>Week</Button><Button>Month</Button></ButtonGroup>`,
    },
    calendar: {
      title: "Calendar",
      description: "A brutal calendar grid for date selection.",
      demo: <Calendar selected={date} onSelect={setDate} />,
      code: `<Calendar selected={date} onSelect={setDate} />`,
    },
    carousel: {
      title: "Carousel",
      description: "A horizontal snap carousel with Concrete UI controls.",
      demo: (
        <Carousel className="w-full max-w-xl">
          {["Design", "Build", "Ship"].map((item) => (
            <CarouselItem key={item}><div className="rounded-lg border-2 border-black bg-[#ffde00] p-8 text-2xl font-black uppercase shadow-[4px_4px_0_0_#000]">{item}</div></CarouselItem>
          ))}
        </Carousel>
      ),
      code: `<Carousel><CarouselItem>...</CarouselItem></Carousel>`,
    },
    collapsible: {
      title: "Collapsible",
      description: "A controlled disclosure primitive for compact sections.",
      demo: <Collapsible defaultOpen><CollapsibleTrigger className="rounded-md border-2 border-black bg-[#ffde00] px-4 py-2 font-bold shadow-[3px_3px_0_0_#000]">Toggle Details</CollapsibleTrigger><CollapsibleContent className="mt-4 rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">Concrete UI keeps the mechanics sharp and visible.</CollapsibleContent></Collapsible>,
      code: `<Collapsible><CollapsibleTrigger /> <CollapsibleContent /></Collapsible>`,
    },
    combobox: {
      title: "Combobox",
      description: "Search and select from structured options.",
      demo: <Combobox value={comboValue} onValueChange={setComboValue} options={comboOptions} />,
      code: `<Combobox value={value} onValueChange={setValue} options={options} />`,
    },
    "context-menu": {
      title: "Context Menu",
      description: "Right-click actions with a brutal command surface.",
      demo: <ContextMenu><ContextMenuTrigger className="rounded-lg border-2 border-dashed border-black bg-white p-10 text-center font-bold shadow-[4px_4px_0_0_#000]">Right click this panel</ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuItem>Rename</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem>Archive</ContextMenuItem></ContextMenuContent></ContextMenu>,
      code: `<ContextMenu><ContextMenuTrigger>Right click</ContextMenuTrigger><ContextMenuContent>...</ContextMenuContent></ContextMenu>`,
    },
    "date-picker": {
      title: "Date Picker",
      description: "A calendar-backed date input.",
      demo: <DatePicker value={date} onValueChange={setDate} />,
      code: `<DatePicker value={date} onValueChange={setDate} />`,
    },
    empty: {
      title: "Empty",
      description: "A reusable empty state for tables, searches, and dashboards.",
      demo: <Empty variant="boxed"><EmptyIcon>!</EmptyIcon><EmptyTitle>No results</EmptyTitle><EmptyDescription>Try adjusting your filters or creating a new item.</EmptyDescription><EmptyActions><Button variant="primary">Create Item</Button></EmptyActions></Empty>,
      code: `<Empty><EmptyIcon /><EmptyTitle>No results</EmptyTitle><EmptyDescription /></Empty>`,
    },
    field: {
      title: "Field",
      description: "Form composition for labels, descriptions, controls, and errors.",
      demo: <FieldGroup columns={2}><Field><FieldLabel required>Email</FieldLabel><Input placeholder="name@project.com" /><FieldDescription>We only use this for account updates.</FieldDescription></Field><Field invalid><FieldLabel error>Bio</FieldLabel><Textarea error placeholder="Tell us about the work" /><FieldError>Bio is required.</FieldError></Field></FieldGroup>,
      code: `<Field><FieldLabel>Email</FieldLabel><Input /><FieldDescription /></Field>`,
    },
    "file-upload": {
      title: "File Upload",
      description: "Drag-and-drop file selection with selected file chips.",
      demo: <FileUpload files={files} onFilesChange={setFiles} maxFiles={3} accept=".png,.jpg,.pdf" />,
      code: `<FileUpload files={files} onFilesChange={setFiles} maxFiles={3} />`,
    },
    "hover-card": {
      title: "Hover Card",
      description: "A richer tooltip for previews, profiles, and metadata.",
      demo: <HoverCard><HoverCardTrigger className="rounded-md border-2 border-black bg-[#ffde00] px-4 py-2 font-bold shadow-[3px_3px_0_0_#000]">Hover profile</HoverCardTrigger><HoverCardContent><h3 className="font-extrabold uppercase">Concrete Designer</h3><p className="mt-2 text-sm text-gray-600">Builds bold, accessible surfaces with hard shadows.</p></HoverCardContent></HoverCard>,
      code: `<HoverCard><HoverCardTrigger /><HoverCardContent /></HoverCard>`,
    },
    "input-group": {
      title: "Input Group",
      description: "Inputs with attached prefixes, suffixes, or actions.",
      demo: <InputGroup className="max-w-md"><InputGroupAddon>https://</InputGroupAddon><Input placeholder="concrete-ui.dev" /><InputGroupAddon>.com</InputGroupAddon></InputGroup>,
      code: `<InputGroup><InputGroupAddon>https://</InputGroupAddon><Input /></InputGroup>`,
    },
    item: {
      title: "Item",
      description: "A compact list item primitive for menus, settings, and search results.",
      demo: <Item interactive><ItemMedia>★</ItemMedia><ItemContent><ItemTitle>Reusable item</ItemTitle><ItemDescription>Works well inside lists, command results, and settings screens.</ItemDescription></ItemContent></Item>,
      code: `<Item><ItemMedia /><ItemContent><ItemTitle /></ItemContent></Item>`,
    },
    kbd: {
      title: "Kbd",
      description: "Keyboard shortcut tokens for docs and command menus.",
      demo: <div className="flex gap-2"><Kbd>⌘</Kbd><Kbd>K</Kbd><Kbd>Esc</Kbd></div>,
      code: `<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
    },
    label: {
      title: "Label",
      description: "Accessible form labels with required and error states.",
      demo: <div className="grid gap-4"><Label htmlFor="label-demo" required>Email address</Label><Input id="label-demo" placeholder="name@site.com" /></div>,
      code: `<Label htmlFor="email" required>Email</Label>`,
    },
    marquee: {
      title: "Marquee",
      description: "A reusable ticker for logos, stats, and announcements.",
      demo: <Marquee className="w-full max-w-xl rounded-lg border-2 border-black bg-black p-4" speed={12}>{["Fast", "Bold", "Composable", "Accessible"].map((item) => <Badge key={item} variant="primary" size="lg">{item}</Badge>)}</Marquee>,
      code: `<Marquee><Badge>Fast</Badge><Badge>Bold</Badge></Marquee>`,
    },
    menubar: {
      title: "Menubar",
      description: "A compact app command bar with dropdown panels.",
      demo: <Menubar><MenubarMenu value="file"><MenubarTrigger value="file">File</MenubarTrigger><MenubarContent value="file"><MenubarItem>New</MenubarItem><MenubarItem>Export</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu value="edit"><MenubarTrigger value="edit">Edit</MenubarTrigger><MenubarContent value="edit"><MenubarItem>Undo</MenubarItem><MenubarItem>Redo</MenubarItem></MenubarContent></MenubarMenu></Menubar>,
      code: `<Menubar><MenubarMenu value="file"><MenubarTrigger value="file" /></MenubarMenu></Menubar>`,
    },
    "multi-select": {
      title: "Multi Select",
      description: "Searchable multiple selection with brutal chips.",
      demo: <MultiSelect value={multiValue} onValueChange={setMultiValue} options={multiOptions} />,
      code: `<MultiSelect value={values} onValueChange={setValues} options={options} />`,
    },
    "navigation-menu": {
      title: "Navigation Menu",
      description: "A clean nav primitive for app headers and docs shells.",
      demo: <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#" active>Docs</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#">Components</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#">Templates</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>,
      code: `<NavigationMenu><NavigationMenuList><NavigationMenuLink active /></NavigationMenuList></NavigationMenu>`,
    },
    resizable: {
      title: "Resizable",
      description: "Two-panel resizable layout for builders and dashboards.",
      demo: <Resizable className="h-56 w-full max-w-2xl" left={<div className="font-bold uppercase">Preview</div>} right={<div className="font-bold uppercase">Code</div>} />,
      code: `<Resizable left={<Preview />} right={<Code />} />`,
    },
    "scroll-area": {
      title: "Scroll Area",
      description: "Custom brutal scroll containers for panels and menus.",
      demo: <ScrollArea className="h-48 w-72 rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]"><div className="grid gap-3">{Array.from({ length: 12 }, (_, index) => <div key={index} className="rounded-md border-2 border-black bg-[#fff4ab] p-3 text-sm font-bold">Item {index + 1}</div>)}</div></ScrollArea>,
      code: `<ScrollArea className="h-48">...</ScrollArea>`,
    },
    spinner: {
      title: "Spinner",
      description: "A loading indicator that works inside buttons, badges, and empty states.",
      demo: <div className="flex items-center gap-4"><Spinner size="sm" /><Spinner /><Spinner size="lg" /><Button disabled><Spinner size="sm" />Loading</Button></div>,
      code: `<Spinner /><Button disabled><Spinner size="sm" />Loading</Button>`,
    },
    stepper: {
      title: "Stepper",
      description: "A step-by-step progress display for onboarding and flows.",
      demo: <Stepper steps={[{ title: "Account", description: "Create profile" }, { title: "Details", description: "Add project info" }, { title: "Ship", description: "Go live" }]} currentStep={1} />,
      code: `<Stepper steps={steps} currentStep={1} />`,
    },
    switch: {
      title: "Switch",
      description: "A proper boolean control for settings and forms.",
      demo: <Switch checked={switchOn} onCheckedChange={setSwitchOn} label="Email alerts" />,
      code: `<Switch checked={checked} onCheckedChange={setChecked} label="Email alerts" />`,
    },
    timeline: {
      title: "Timeline",
      description: "A vertical progress/history component with hard markers.",
      demo: <Timeline><TimelineItem active marker="1"><TimelineContent><TimelineTitle>Design</TimelineTitle><TimelineDescription>Define the system language.</TimelineDescription></TimelineContent></TimelineItem><TimelineItem marker="2"><TimelineContent><TimelineTitle>Build</TimelineTitle><TimelineDescription>Create accessible primitives.</TimelineDescription></TimelineContent></TimelineItem></Timeline>,
      code: `<Timeline><TimelineItem><TimelineContent>...</TimelineContent></TimelineItem></Timeline>`,
    },
    "toggle-group": {
      title: "Toggle Group",
      description: "Grouped toggle state for view modes and formatting controls.",
      demo: <ToggleGroup value={toggleValue} onValueChange={setToggleValue}><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>,
      code: `<ToggleGroup value={value} onValueChange={setValue}><ToggleGroupItem value="left" /></ToggleGroup>`,
    },
  };

  const config = demos[component];

  if (!config) {
    return <div className="docs-panel p-8">Component documentation not found.</div>;
  }

  return (
    <div className="docs-component-page space-y-12">
      <div>
        <Badge variant="primary" className="mb-4">COMPONENT</Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">{config.title}</h1>
        <p className="text-brutal-lg max-w-2xl">{config.description}</p>
      </div>

      <ComponentPreview title={`${config.title} Preview`} description={config.description} code={config.code}>
        {config.demo}
      </ComponentPreview>
    </div>
  );
}
