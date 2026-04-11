import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label, LabelProps } from "./label";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
}

const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className = "", invalid = false, ...props }, ref) => (
    <div
      ref={ref}
      data-invalid={invalid || undefined}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
);

Field.displayName = "Field";

export interface FieldLabelProps extends LabelProps {}

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className = "", ...props }, ref) => (
    <Label ref={ref} className={cn("leading-none", className)} {...props} />
  )
);

FieldLabel.displayName = "FieldLabel";

export interface FieldControlProps extends HTMLAttributes<HTMLDivElement> {}

const FieldControl = forwardRef<HTMLDivElement, FieldControlProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0", className)} {...props} />
  )
);

FieldControl.displayName = "FieldControl";

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-gray-600", className)}
      {...props}
    />
  )
);

FieldDescription.displayName = "FieldDescription";

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-bold uppercase tracking-wide text-[#ef4444]", className)}
      role="alert"
      {...props}
    />
  )
);

FieldError.displayName = "FieldError";

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
}

const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ className = "", columns = 1, ...props }, ref) => {
    const columnStyles = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-5", columnStyles[columns], className)}
        {...props}
      />
    );
  }
);

FieldGroup.displayName = "FieldGroup";

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
};
