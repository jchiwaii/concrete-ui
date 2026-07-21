import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "flat" | "bordered";
  color?: "white" | "yellow" | "cyan" | "pink" | "lime" | "purple" | "orange" | "magenta";
  hover?: boolean;
  rounded?: "none" | "md" | "lg" | "xl";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      color = "white",
      hover = false,
      rounded = "none",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "border-2 border-black transition-[transform,box-shadow,background-color] duration-150 ease-out";

    const variants = {
      default: "shadow-[var(--ui-shadow)]",
      elevated: "shadow-[var(--ui-shadow-lg)]",
      outline: "shadow-none",
      flat: "shadow-none border-transparent",
      bordered: "shadow-none",
    };

    const colors = {
      white: "bg-[var(--ui-surface)]",
      yellow: "bg-[var(--ui-accent)]",
      cyan: "bg-[var(--ui-info)]",
      pink: "bg-[var(--ui-pink)]",
      lime: "bg-[var(--ui-lime)]",
      purple: "bg-[var(--ui-purple)]",
      orange: "bg-[var(--ui-warning)]",
      magenta: "bg-[var(--ui-pink)]",
    };

    const radiusStyles = {
      none: "rounded-none",
      md: "rounded-[var(--ui-radius-sm)]",
      lg: "rounded-[var(--ui-radius-lg)]",
      xl: "rounded-[var(--ui-radius-xl)]",
    };

    const hoverStyles = hover
      ? "hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)]"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          colors[color],
          radiusStyles[rounded],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-b-2 border-black px-5 py-4 sm:px-6 sm:py-5", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold tracking-[-0.025em]", className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1.5 text-sm leading-6 text-[var(--ui-muted)]", className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 py-5 sm:px-6", className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 border-t-2 border-black bg-[var(--ui-surface-muted)] px-5 py-4 sm:px-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
