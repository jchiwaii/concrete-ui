import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "boxed" | "dashed";
}

const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants = {
      default: "",
      boxed: "border-2 border-black bg-white shadow-[4px_4px_0_0_#000]",
      dashed: "border-2 border-dashed border-black bg-[#fff7cc]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-center",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Empty.displayName = "Empty";

const EmptyIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-lg border-2 border-black bg-[#ffde00] text-black shadow-[4px_4px_0_0_#000]",
        className
      )}
      {...props}
    />
  )
);

EmptyIcon.displayName = "EmptyIcon";

const EmptyTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-extrabold uppercase tracking-tight", className)} {...props} />
  )
);

EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={cn("max-w-md text-sm font-medium text-gray-600", className)} {...props} />
  )
);

EmptyDescription.displayName = "EmptyDescription";

const EmptyActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-3", className)} {...props} />
  )
);

EmptyActions.displayName = "EmptyActions";

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions };
