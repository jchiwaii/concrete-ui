import { HTMLAttributes, forwardRef } from "react";

const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-gray-200
          border-2 border-black
          animate-pulse
          ${className}
        `}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
