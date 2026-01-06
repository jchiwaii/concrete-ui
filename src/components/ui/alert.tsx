import { HTMLAttributes, forwardRef } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "info" | "success" | "warning" | "danger";
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles = `
      p-4
      border-4 border-black
      shadow-[4px_4px_0_0_#000]
    `;

    const variants = {
      default: "bg-white",
      info: "bg-[#00FFFF]",
      success: "bg-[#00FF00]",
      warning: "bg-[#FFFF00]",
      danger: "bg-[#FF0000] text-white",
    };

    const icons = {
      default: "ℹ",
      info: "ℹ",
      success: "✓",
      warning: "⚠",
      danger: "✕",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl font-bold flex-shrink-0">
            {icons[variant]}
          </span>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

const AlertTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h4
    ref={ref}
    className={`text-lg font-extrabold uppercase tracking-wide mb-1 ${className}`}
    {...props}
  >
    {children}
  </h4>
));

AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <p ref={ref} className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </p>
));

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
