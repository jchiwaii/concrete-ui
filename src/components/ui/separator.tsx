import { HTMLAttributes, forwardRef } from "react";

const Separator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={`
          w-full h-1
          bg-black
          ${className}
        `}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
