import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "filled";
  color?: "white" | "yellow" | "cyan" | "magenta" | "lime";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", color = "white", children, ...props }, ref) => {
    const baseStyles = `
      border-4 border-black
      transition-all duration-100 ease-out
    `;

    const variants = {
      default: "shadow-[6px_6px_0_0_#000]",
      elevated: "shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:translate-x-[-4px] hover:translate-y-[-4px]",
      bordered: "shadow-none",
      filled: "shadow-[6px_6px_0_0_#000]",
    };

    const colors = {
      white: "bg-white",
      yellow: "bg-[#FFFF00]",
      cyan: "bg-[#00FFFF]",
      magenta: "bg-[#FF00FF]",
      lime: "bg-[#CCFF00]",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${colors[color]} ${className}`}
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
      className={`p-6 border-b-4 border-black ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-extrabold uppercase tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", children, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-base mt-2 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 border-t-4 border-black flex items-center gap-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
