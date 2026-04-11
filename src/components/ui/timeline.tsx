import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {}

const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className = "", ...props }, ref) => (
    <ol ref={ref} className={cn("relative grid gap-6 border-l-4 border-black pl-8", className)} {...props} />
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
          "absolute -left-[46px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white text-xs font-black shadow-[3px_3px_0_0_#000]",
          active && "bg-[#ffde00]"
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
    <h3 ref={ref} className={cn("text-lg font-extrabold uppercase tracking-tight", className)} {...props} />
  )
);

TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={cn("mt-1 text-sm font-medium text-gray-600", className)} {...props} />
  )
);

TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]", className)} {...props} />
  )
);

TimelineContent.displayName = "TimelineContent";

export { Timeline, TimelineItem, TimelineTitle, TimelineDescription, TimelineContent };
