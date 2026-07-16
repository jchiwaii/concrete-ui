import { HTMLAttributes, ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "square" | "rounded" | "circle";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", shape = "rounded", children, ...props }, ref) => {
    const sizes = {
      sm: "w-10 h-10",
      md: "w-14 h-14",
      lg: "w-20 h-20",
      xl: "w-28 h-28",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden border-2 border-black shadow-[var(--ui-shadow)]",
          sizes[size],
          shape === "circle" && "rounded-full",
          shape === "rounded" && "rounded-[var(--ui-radius)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", src, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  )
);

AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
        w-full h-full
        flex items-center justify-center
        bg-[var(--ui-accent)]
        text-black font-semibold
        ${className}
      `}
    {...props}
  >
    {children}
  </div>
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
