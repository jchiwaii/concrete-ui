"use client";

import { HTMLAttributes, forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className = "", children, ...props }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: number) => {
      trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
    };

    return (
      <div ref={ref} className={cn("grid gap-4", className)} {...props}>
        <div ref={trackRef} className="brutal-scroll-area flex snap-x gap-4 overflow-x-auto pb-3">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" size="sm" onClick={() => scroll(-1)} aria-label="Previous slide">←</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => scroll(1)} aria-label="Next slide">→</Button>
        </div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("min-w-[280px] snap-start", className)} {...props} />
  )
);

CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselItem };
