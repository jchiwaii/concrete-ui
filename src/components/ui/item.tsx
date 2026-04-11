import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ className = "", interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start gap-4 rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]",
        interactive && "cursor-pointer transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#fff4ab] hover:shadow-[6px_6px_0_0_#000]",
        className
      )}
      {...props}
    />
  )
);

Item.displayName = "Item";

const ItemMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-black bg-[#ffde00] text-lg font-black shadow-[2px_2px_0_0_#000]", className)} {...props} />
  )
);

ItemMedia.displayName = "ItemMedia";

const ItemContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props} />
);

ItemContent.displayName = "ItemContent";

const ItemTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => <h3 ref={ref} className={cn("font-extrabold uppercase tracking-tight", className)} {...props} />
);

ItemTitle.displayName = "ItemTitle";

const ItemDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => <p ref={ref} className={cn("mt-1 text-sm font-medium text-gray-600", className)} {...props} />
);

ItemDescription.displayName = "ItemDescription";

export { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription };
