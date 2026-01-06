import { HTMLAttributes, forwardRef } from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: "default" | "primary" | "success" | "warning" | "danger";
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value, max = 100, color = "default", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
      default: "bg-black",
      primary: "bg-[#FFFF00]",
      success: "bg-[#00FF00]",
      warning: "bg-[#FF6600]",
      danger: "bg-[#FF0000]",
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`
          w-full h-8
          bg-white
          border-4 border-black
          shadow-[4px_4px_0_0_#000]
          overflow-hidden
          ${className}
        `}
        {...props}
      >
        <div
          className={`h-full transition-all duration-100 ease-out ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
