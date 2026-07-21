import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {}

const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className = "", ...props }, ref) => (
    <ol ref={ref} className={cn("relative grid gap-6 border-l-2 border-black pl-8", className)} {...props} />
  )
);

Timeline.displayName = "Timeline";

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  marker?: ReactNode;
  active?: boolean;
}

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className = "", marker, active = false, children, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props}>
      <span
        className={cn(
          "absolute -left-[46px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[var(--ui-surface)] text-xs font-bold shadow-[var(--ui-shadow)]",
          active && "bg-[var(--ui-accent)]"
        )}
      >
        {marker ?? ""}
      </span>
      {children}
    </li>
  )
);

TimelineItem.displayName = "TimelineItem";

const TimelineTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
  )
);

TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={cn("mt-1 text-sm font-medium text-[var(--ui-muted)]", className)} {...props} />
  )
);

TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("rounded-[var(--ui-radius)] border-2 border-black bg-[var(--ui-surface)] p-4 shadow-[var(--ui-shadow)]", className)} {...props} />
  )
);

TimelineContent.displayName = "TimelineContent";

export { Timeline, TimelineItem, TimelineTitle, TimelineDescription, TimelineContent };
