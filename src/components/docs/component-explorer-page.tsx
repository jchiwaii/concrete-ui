"use client";

import { ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/context/ToastContext";
import { ComponentPreview } from "./component-preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DatePicker,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Resizable,
  ScrollArea,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  Checkbox,
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

const selectOptions = [
  { value: "starter", label: "Starter" },
  { value: "studio", label: "Studio" },
  { value: "enterprise", label: "Enterprise" },
];

export function ComponentExplorerPage({ component }: { component: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(3);
  const [radioValue, setRadioValue] = useState("email");
  const [selectValue, setSelectValue] = useState("starter");
  const [sliderValue, setSliderValue] = useState(64);
  const [toggleOn, setToggleOn] = useState(false);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [switchOn, setSwitchOn] = useState(true);
  const [toggleValue, setToggleValue] = useState<string | string[]>("left");
  const [comboValue, setComboValue] = useState("design");
  const [multiValue, setMultiValue] = useState<string[]>(["react", "typescript"]);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 11));
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const demos: Record<string, DemoConfig> = {
    accordion: {
      title: "Accordion",
      description: "Accessible disclosure sections with controlled or uncontrolled state.",
      demo: (
        <Accordion type="single" defaultValue={["details"]} className="w-full max-w-xl">
          <AccordionItem value="details">
            <AccordionTrigger value="details">What makes the system different?</AccordionTrigger>
            <AccordionContent value="details">Strong structure and restrained accents keep the interface expressive without making every element compete.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="accessibility">
            <AccordionTrigger value="accessibility">Is keyboard support included?</AccordionTrigger>
            <AccordionContent value="accessibility">Triggers are native buttons with connected regions and clear expanded state.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      code: `<Accordion type="single" defaultValue={["details"]}>\n  <AccordionItem value="details">\n    <AccordionTrigger value="details">Details</AccordionTrigger>\n    <AccordionContent value="details">Content</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    },
    alert: {
      title: "Alert",
      description: "Inline status messaging with semantic visual variants.",
      demo: <Alert variant="success" className="max-w-xl"><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your workspace settings are now up to date.</AlertDescription></Alert>,
      code: `<Alert variant="success">\n  <AlertTitle>Changes saved</AlertTitle>\n  <AlertDescription>Your settings are up to date.</AlertDescription>\n</Alert>`,
    },
    avatar: {
      title: "Avatar",
      description: "An identity marker with image and fallback content.",
      demo: <div className="flex items-end gap-4"><Avatar size="sm" shape="circle"><AvatarFallback>SM</AvatarFallback></Avatar><Avatar shape="rounded"><AvatarFallback>CU</AvatarFallback></Avatar><Avatar size="lg" shape="circle"><AvatarFallback>LG</AvatarFallback></Avatar></div>,
      code: `<Avatar shape="circle">\n  <AvatarFallback>CU</AvatarFallback>\n</Avatar>`,
    },
    badge: {
      title: "Badge",
      description: "Compact metadata and status labels with restrained depth.",
      demo: <div className="flex flex-wrap gap-3"><Badge>Default</Badge><Badge variant="primary">Featured</Badge><Badge variant="success">Ready</Badge><Badge variant="danger">Blocked</Badge></div>,
      code: `<Badge variant="primary">Featured</Badge>`,
    },
    breadcrumb: {
      title: "Breadcrumb",
      description: "A compact hierarchical location trail.",
      demo: <Breadcrumb><BreadcrumbItem href="/docs">Docs</BreadcrumbItem><BreadcrumbItem href="/docs/components">Components</BreadcrumbItem><BreadcrumbItem current>Breadcrumb</BreadcrumbItem></Breadcrumb>,
      code: `<Breadcrumb>\n  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>\n  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>\n</Breadcrumb>`,
    },
    button: {
      title: "Button",
      description: "Clear action hierarchy with consistent size, focus, and loading states.",
      demo: <div className="flex flex-wrap gap-3"><Button variant="primary">Primary</Button><Button>Default</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></div>,
      code: `<Button variant="primary">Save changes</Button>`,
    },
    card: {
      title: "Card",
      description: "A composable surface for related content and actions.",
      demo: <Card className="w-full max-w-sm"><CardHeader><CardTitle>Workspace plan</CardTitle><CardDescription>Everything your team needs to ship.</CardDescription></CardHeader><CardContent><Badge variant="secondary">Studio</Badge></CardContent></Card>,
      code: `<Card>\n  <CardHeader><CardTitle>Workspace plan</CardTitle></CardHeader>\n  <CardContent>...</CardContent>\n</Card>`,
    },
    checkbox: {
      title: "Checkbox",
      description: "A native checkbox with checked, mixed, focus, and disabled states.",
      demo: <div className="grid gap-4"><Checkbox label="Email updates" defaultChecked /><Checkbox label="Partially selected" indeterminate /><Checkbox label="Unavailable" disabled /></div>,
      code: `<Checkbox label="Email updates" defaultChecked />`,
    },
    command: {
      title: "Command",
      description: "A searchable keyboard command surface with grouped results.",
      demo: <><Button variant="primary" onClick={() => setCommandOpen(true)}>Open command menu</Button><Command open={commandOpen} onOpenChange={setCommandOpen} shortcut={false}><CommandInput placeholder="Search actions" /><CommandList><CommandGroup heading="Workspace"><CommandItem onSelect={() => setCommandOpen(false)}>Create project</CommandItem><CommandItem onSelect={() => setCommandOpen(false)}>Invite teammate</CommandItem></CommandGroup></CommandList></Command></>,
      code: `<Command open={open} onOpenChange={setOpen}>\n  <CommandInput placeholder="Search actions" />\n  <CommandList><CommandItem>Create project</CommandItem></CommandList>\n</Command>`,
    },
    drawer: {
      title: "Drawer",
      description: "A responsive edge panel with focus trapping and Escape dismissal.",
      demo: <><Button variant="primary" onClick={() => setDrawerOpen(true)}>Open drawer</Button><Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}><DrawerContent><DrawerHeader><DrawerTitle>Project details</DrawerTitle><DrawerClose onClose={() => setDrawerOpen(false)} /></DrawerHeader><DrawerBody><p className="text-sm leading-6 text-gray-600">Use drawers for contextual tasks that should not replace the current page.</p></DrawerBody></DrawerContent></Drawer></>,
      code: `<Drawer open={open} onClose={() => setOpen(false)}>\n  <DrawerContent>...</DrawerContent>\n</Drawer>`,
    },
    "dropdown-menu": {
      title: "Dropdown Menu",
      description: "An anchored action menu with semantic menu items.",
      demo: <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Actions</DropdownMenuLabel><DropdownMenuItem>Edit details</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button>Actions</Button></DropdownMenuTrigger>\n  <DropdownMenuContent><DropdownMenuItem>Edit</DropdownMenuItem></DropdownMenuContent>\n</DropdownMenu>`,
    },
    input: {
      title: "Input",
      description: "A text input with consistent sizing, focus, and validation states.",
      demo: <div className="grid w-full max-w-md gap-4"><Input placeholder="name@company.com" /><Input error defaultValue="Invalid value" aria-label="Invalid example" /></div>,
      code: `<Input placeholder="name@company.com" />`,
    },
    modal: {
      title: "Modal",
      description: "An accessible focused task surface with managed scroll and focus.",
      demo: <><Button variant="primary" onClick={() => setModalOpen(true)}>Edit profile</Button><Modal open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby="profile-modal-title"><ModalHeader><ModalTitle id="profile-modal-title">Edit profile</ModalTitle><ModalDescription>Update the public details for your account.</ModalDescription><ModalClose onClick={() => setModalOpen(false)} /></ModalHeader><ModalContent><Input defaultValue="Maya Chen" aria-label="Display name" /></ModalContent><ModalFooter><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setModalOpen(false)}>Save</Button></ModalFooter></Modal></>,
      code: `<Modal open={open} onClose={() => setOpen(false)}>\n  <ModalHeader><ModalTitle>Edit profile</ModalTitle></ModalHeader>\n  <ModalContent>...</ModalContent>\n</Modal>`,
    },
    pagination: {
      title: "Pagination",
      description: "Responsive page navigation for long collections.",
      demo: <Pagination currentPage={page} totalPages={9} onPageChange={setPage} />,
      code: `<Pagination currentPage={page} totalPages={9} onPageChange={setPage} />`,
    },
    popover: {
      title: "Popover",
      description: "Anchored interactive content that closes outside or with Escape.",
      demo: <Popover><PopoverTrigger asChild><Button variant="outline">Open settings</Button></PopoverTrigger><PopoverContent><h3 className="font-semibold">Quick settings</h3><p className="mt-2 max-w-xs text-sm text-gray-600">Keep short, contextual tasks close to their trigger.</p></PopoverContent></Popover>,
      code: `<Popover>\n  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>\n  <PopoverContent>Settings</PopoverContent>\n</Popover>`,
    },
    progress: {
      title: "Progress",
      description: "Determinate task completion with optional value output.",
      demo: <Progress value={64} color="primary" showValue className="max-w-xl" />,
      code: `<Progress value={64} color="primary" showValue />`,
    },
    "radio-group": {
      title: "Radio Group",
      description: "A native single-selection group with one clear focus target per option.",
      demo: <RadioGroup value={radioValue} onValueChange={setRadioValue} name="notification-method"><RadioGroupItem value="email" label="Email" /><RadioGroupItem value="push" label="Push notification" /><RadioGroupItem value="none" label="Do not notify" /></RadioGroup>,
      code: `<RadioGroup value={value} onValueChange={setValue}>\n  <RadioGroupItem value="email" label="Email" />\n</RadioGroup>`,
    },
    select: {
      title: "Select",
      description: "A compact single-value selection control with optional search.",
      demo: <Select value={selectValue} onChange={setSelectValue} options={selectOptions} className="w-full max-w-sm" />,
      code: `<Select value={value} onChange={setValue} options={options} />`,
    },
    separator: {
      title: "Separator",
      description: "A semantic visual divider for horizontal and vertical layouts.",
      demo: <div className="w-full max-w-lg rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] p-5"><p className="font-semibold">Account</p><Separator className="my-4" /><p className="text-sm text-gray-600">Manage identity and security preferences.</p></div>,
      code: `<Separator className="my-4" />`,
    },
    skeleton: {
      title: "Skeleton",
      description: "A reduced-motion-aware placeholder for loading content.",
      demo: <div className="grid w-full max-w-md grid-cols-[48px_1fr] gap-4"><Skeleton className="h-12 w-12 rounded-full" /><div className="grid gap-2"><Skeleton className="h-4 w-2/3 rounded" /><Skeleton className="h-4 w-full rounded" /></div></div>,
      code: `<Skeleton className="h-4 w-full rounded" />`,
    },
    slider: {
      title: "Slider",
      description: "A keyboard-accessible numeric range control.",
      demo: <Slider value={sliderValue} onChange={setSliderValue} min={0} max={100} className="w-full max-w-xl" />,
      code: `<Slider value={value} onChange={setValue} min={0} max={100} />`,
    },
    table: {
      title: "Table",
      description: "Responsive tabular data with keyboard-native sortable headers.",
      demo: <Table sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} className="w-full max-w-2xl"><TableHeader><TableRow><TableHead sortable sortKey="name">Name</TableHead><TableHead>Role</TableHead><TableHead align="right">Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Maya Chen</TableCell><TableCell>Designer</TableCell><TableCell align="right">Active</TableCell></TableRow><TableRow><TableCell>Owen Reed</TableCell><TableCell>Engineer</TableCell><TableCell align="right">Active</TableCell></TableRow></TableBody></Table>,
      code: `<Table sortColumn={sortColumn} onSort={setSortColumn}>\n  <TableHeader><TableHead sortable sortKey="name">Name</TableHead></TableHeader>\n  <TableBody>...</TableBody>\n</Table>`,
    },
    tabs: {
      title: "Tabs",
      description: "Keyboard-managed content switching with controlled or uncontrolled state.",
      demo: <Tabs defaultValue="overview" className="w-full max-w-xl"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList><TabsContent value="overview"><p className="text-sm leading-6 text-gray-600">A concise overview of the workspace.</p></TabsContent><TabsContent value="activity"><p className="text-sm leading-6 text-gray-600">Recent updates and project events.</p></TabsContent><TabsContent value="settings"><p className="text-sm leading-6 text-gray-600">Configuration and access controls.</p></TabsContent></Tabs>,
      code: `<Tabs defaultValue="overview">\n  <TabsList><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>\n  <TabsContent value="overview">Content</TabsContent>\n</Tabs>`,
    },
    textarea: {
      title: "Textarea",
      description: "Multi-line input with the same focus and validation language as Input.",
      demo: <Textarea className="max-w-lg" placeholder="Describe the project goals" rows={5} />,
      code: `<Textarea placeholder="Describe the project goals" rows={5} />`,
    },
    toast: {
      title: "Toast",
      description: "Transient non-blocking feedback with responsive positioning.",
      demo: <Button variant="primary" onClick={() => toast({ title: "Project created", description: "Your new workspace is ready.", variant: "success" })}>Show toast</Button>,
      code: `const { toast } = useToast();\n\ntoast({ title: "Project created", variant: "success" });`,
    },
    toggle: {
      title: "Toggle",
      description: "A controlled or uncontrolled two-state setting action.",
      demo: <Toggle checked={toggleOn} onChange={setToggleOn} label="Public profile" />,
      code: `<Toggle checked={checked} onChange={setChecked} label="Public profile" />`,
    },
    tooltip: {
      title: "Tooltip",
      description: "Supplementary text for mouse and keyboard users.",
      demo: <Tooltip content="Copy the project URL" placement="top"><Button variant="outline">Copy link</Button></Tooltip>,
      code: `<Tooltip content="Copy the project URL">\n  <Button>Copy link</Button>\n</Tooltip>`,
    },
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
      demo: <AspectRatio ratio={16 / 9} className="max-w-md rounded-lg border-2 border-black bg-[var(--ui-info)] shadow-[var(--ui-shadow)]" />,
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
            <CarouselItem key={item}><div className="rounded-lg border-2 border-black bg-[var(--ui-accent)] p-8 text-xl font-semibold shadow-[var(--ui-shadow)]">{item}</div></CarouselItem>
          ))}
        </Carousel>
      ),
      code: `<Carousel><CarouselItem>...</CarouselItem></Carousel>`,
    },
    collapsible: {
      title: "Collapsible",
      description: "A controlled disclosure primitive for compact sections.",
      demo: <Collapsible defaultOpen><CollapsibleTrigger className="rounded-md border-2 border-black bg-[var(--ui-accent)] px-4 py-2 font-bold shadow-[var(--ui-shadow)]">Toggle Details</CollapsibleTrigger><CollapsibleContent className="mt-4 rounded-lg border-2 border-black bg-[var(--ui-surface)] p-4 shadow-[var(--ui-shadow)]">Concrete UI keeps the mechanics sharp and visible.</CollapsibleContent></Collapsible>,
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
      demo: <ContextMenu><ContextMenuTrigger className="rounded-lg border-2 border-dashed border-black bg-[var(--ui-surface)] p-10 text-center font-bold shadow-[var(--ui-shadow)]">Right click this panel</ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuItem>Rename</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem>Archive</ContextMenuItem></ContextMenuContent></ContextMenu>,
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
      demo: <HoverCard><HoverCardTrigger className="rounded-md border-2 border-black bg-[var(--ui-accent)] px-4 py-2 font-bold shadow-[var(--ui-shadow)]">Hover profile</HoverCardTrigger><HoverCardContent><h3 className="font-semibold">Concrete Designer</h3><p className="mt-2 text-sm text-gray-600">Builds bold, accessible surfaces with hard shadows.</p></HoverCardContent></HoverCard>,
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
      demo: <Resizable className="h-56 w-full max-w-2xl" left={<div className="font-semibold">Preview</div>} right={<div className="font-semibold">Code</div>} />,
      code: `<Resizable left={<Preview />} right={<Code />} />`,
    },
    "scroll-area": {
      title: "Scroll Area",
      description: "Custom brutal scroll containers for panels and menus.",
      demo: <ScrollArea className="h-48 w-72 rounded-lg border-2 border-black bg-[var(--ui-surface)] p-4 shadow-[var(--ui-shadow)]"><div className="grid gap-3">{Array.from({ length: 12 }, (_, index) => <div key={index} className="rounded-md border-2 border-black bg-[var(--ui-accent-soft)] p-3 text-sm font-bold">Item {index + 1}</div>)}</div></ScrollArea>,
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
    <div className="docs-component-page space-y-10">
      <div>
        <Badge variant="primary" className="mb-4">Component</Badge>
        <h1>{config.title}</h1>
        <p className="text-brutal-lg">{config.description}</p>
      </div>

      <ComponentPreview title={`${config.title} Preview`} description={config.description} code={config.code}>
        {config.demo}
      </ComponentPreview>
    </div>
  );
}
