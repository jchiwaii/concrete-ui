"use client";

import {
  HTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  orientation?: "horizontal" | "vertical";
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value = 50,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = true,
      orientation = "horizontal",
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Sync internal value with prop
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    // Clamp value within min/max
    const clampValue = useCallback(
      (val: number) => {
        const clamped = Math.min(Math.max(val, min), max);
        return Math.round(clamped / step) * step;
      },
      [min, max, step]
    );

    // Calculate percentage from value
    const percentage = ((internalValue - min) / (max - min)) * 100;

    // Update value from position
    const updateValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        let newPercentage;

        if (orientation === "horizontal") {
          newPercentage = ((clientX - rect.left) / rect.width) * 100;
        } else {
          newPercentage = ((rect.bottom - clientY) / rect.height) * 100;
        }

        newPercentage = Math.min(Math.max(newPercentage, 0), 100);
        const newValue = clampValue(min + (newPercentage / 100) * (max - min));

        setInternalValue(newValue);
        onChange?.(newValue);
      },
      [min, max, clampValue, onChange, orientation]
    );

    // Mouse handlers
    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValueFromPosition(e.clientX, e.clientY);
    };

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return;
        updateValueFromPosition(e.clientX, e.clientY);
      },
      [isDragging, updateValueFromPosition]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      const touch = e.touches[0];
      updateValueFromPosition(touch.clientX, touch.clientY);
    };

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        updateValueFromPosition(touch.clientX, touch.clientY);
      },
      [isDragging, updateValueFromPosition]
    );

    // Global event listeners for dragging
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = internalValue;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = clampValue(internalValue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = clampValue(internalValue - step);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        case "PageUp":
          e.preventDefault();
          newValue = clampValue(internalValue + step * 10);
          break;
        case "PageDown":
          e.preventDefault();
          newValue = clampValue(internalValue - step * 10);
          break;
        default:
          return;
      }

      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const containerStyles = `
      relative
      flex
      ${orientation === "horizontal" ? "flex-col w-full" : "flex-row h-64"}
      gap-4
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `;

    const trackStyles = `
      relative
      bg-white
      border-4 border-black
      shadow-[3px_3px_0_0_#000]
      ${orientation === "horizontal" ? "h-8 w-full" : "w-8 h-full"}
      ${!disabled ? "hover:shadow-[4px_4px_0_0_#000]" : ""}
    `;

    const fillStyles = `
      absolute
      bg-[#FFFF00]
      border-r-4 border-black
      ${orientation === "horizontal" ? "h-full left-0 top-0" : "w-full bottom-0 left-0"}
      transition-all duration-100 ease-out
      pointer-events-none
    `;

    const thumbStyles = `
      absolute
      w-6 h-6
      bg-black
      border-4 border-white
      shadow-[4px_4px_0_0_#000]
      transition-all duration-100 ease-out
      ${
        !disabled
          ? "hover:scale-110 hover:shadow-[5px_5px_0_0_#000]"
          : ""
      }
      ${isDragging ? "scale-110 shadow-[5px_5px_0_0_#000]" : ""}
      ${orientation === "horizontal" ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2"}
    `;

    const valueStyles = `
      font-bold
      uppercase
      tracking-wider
      text-sm
      ${orientation === "horizontal" ? "text-center" : "text-left"}
    `;

    const thumbPosition =
      orientation === "horizontal"
        ? { left: `calc(${percentage}% - 12px)` }
        : { bottom: `calc(${percentage}% - 12px)` };

    const fillSize =
      orientation === "horizontal"
        ? { width: `${percentage}%` }
        : { height: `${percentage}%` };

    return (
      <div ref={ref} className={`${containerStyles} ${className}`} {...props}>
        {showValue && (
          <div className={valueStyles}>
            {internalValue} / {max}
          </div>
        )}

        <div
          ref={trackRef}
          className={trackStyles}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue}
          aria-orientation={orientation}
          aria-disabled={disabled}
        >
          <div className={fillStyles} style={fillSize} />
          <div className={thumbStyles} style={thumbPosition} />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
