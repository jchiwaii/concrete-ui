import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", orientation = "vertical", ...props }, ref) => {
    const overflow = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    };

    return (
      <div
        ref={ref}
        className={cn("brutal-scroll-area", overflow[orientation], className)}
        {...props}
      />
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
