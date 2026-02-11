import { HTMLAttributes, forwardRef } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "w-10 h-10",
      md: "w-14 h-14",
      lg: "w-20 h-20",
      xl: "w-28 h-28",
    };

    return (
      <div
        ref={ref}
        className={`
          relative overflow-hidden
          border-2 border-black
          shadow-[3px_3px_0_0_#000]
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export interface AvatarImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

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
        bg-[#ffde00]
        text-black font-extrabold uppercase
        ${className}
      `}
    {...props}
  >
    {children}
  </div>
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
