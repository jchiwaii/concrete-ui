import { HTMLAttributes, forwardRef } from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className = "",
      value,
      max = 100,
      color = "default",
      size = "md",
      showValue = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
      default: "bg-black",
      primary: "bg-[var(--ui-accent)]",
      success: "bg-[var(--ui-success)]",
      warning: "bg-[var(--ui-warning)]",
      danger: "bg-[var(--ui-danger)]",
    };

    const sizes = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    return (
      <div className={`w-full ${className}`}>
        {showValue && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[var(--ui-muted)]">Progress</span>
            <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={`
            w-full
            bg-[var(--ui-surface-muted)]
            border-2 border-black
            rounded-full
            overflow-hidden
            ${sizes[size]}
          `}
          {...props}
        >
          <div
            className={`h-full transition-all duration-150 ease-out rounded-full ${colors[color]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
