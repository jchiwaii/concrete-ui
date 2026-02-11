import { HTMLAttributes, forwardRef } from "react";

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
      rounded = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      border-2 border-black
      transition-all duration-100 ease-out
    `;

    const variants = {
      default: "shadow-[4px_4px_0_0_#000]",
      elevated: "shadow-[6px_6px_0_0_#000]",
      outline: "shadow-none",
      flat: "shadow-none border-transparent",
      bordered: "shadow-none",
    };

    const colors = {
      white: "bg-white",
      yellow: "bg-[#ffde00]",
      cyan: "bg-[#06b6d4]",
      pink: "bg-[#f472b6]",
      lime: "bg-[#a3e635]",
      purple: "bg-[#8b5cf6]",
      orange: "bg-[#f97316]",
      magenta: "bg-[#ec4899]",
    };

    const radiusStyles = {
      none: "rounded-none",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };

    const hoverStyles = hover
      ? "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${colors[color]} ${radiusStyles[rounded]} ${hoverStyles} ${className}`}
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
      className={`px-6 py-5 border-b-2 border-black ${className}`}
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
    className={`text-xl font-bold tracking-tight ${className}`}
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
    className={`text-sm text-gray-600 mt-1.5 ${className}`}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-t-2 border-black flex items-center gap-3 bg-gray-50 ${className}`}
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
