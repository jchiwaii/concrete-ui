import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className = "", children, speed = 25, reverse = false, pauseOnHover = true, ...props }, ref) => (
    <div ref={ref} className={cn("overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "flex min-w-max items-center gap-4 animate-brutal-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-4">{children}</div>
        <div className="flex items-center gap-4" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
);

Marquee.displayName = "Marquee";

export { Marquee };
