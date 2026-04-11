import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ className = "", steps, currentStep = 0, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        orientation === "horizontal" ? "grid gap-4 md:grid-cols-[repeat(var(--step-count),minmax(0,1fr))]" : "grid gap-4",
        className
      )}
      style={{ "--step-count": steps.length } as React.CSSProperties}
      {...props}
    >
      {steps.map((step, index) => {
        const done = index < currentStep;
        const active = index === currentStep;
        return (
          <div
            key={step.title}
            className={cn(
              "relative rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]",
              done && "bg-[#22c55e]",
              active && "bg-[#ffde00]"
            )}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border-2 border-black bg-white text-sm font-black shadow-[2px_2px_0_0_#000]">
              {done ? "✓" : index + 1}
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">{step.title}</h3>
            {step.description && <p className="mt-1 text-xs font-medium text-gray-700">{step.description}</p>}
          </div>
        );
      })}
    </div>
  )
);

Stepper.displayName = "Stepper";

export { Stepper };
