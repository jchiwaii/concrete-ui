import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className = "", ratio = 16 / 9, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  )
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
