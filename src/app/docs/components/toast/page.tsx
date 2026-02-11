"use client";

import { Badge, Button } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { ComponentPreview } from "@/components/docs";

export default function ToastPage() {
  const { toast } = useToast();

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TOAST
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Global notification system with auto-dismiss, multiple variants, and
          stacked display. Includes ToastProvider context for global state management.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">SETUP</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <p className="font-bold uppercase mb-4">
            Wrap your app with ToastProvider:
          </p>
          <pre className="font-mono text-sm overflow-x-auto">
            {`// In your root layout or app component
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "@/components/ui";

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Toast Variants */}
      <ComponentPreview
        title="Toast Variants"
        description="Different toast styles for various use cases."
        code={`import { useToast } from "@/context/ToastContext";

const { toast } = useToast();

// Success
toast({
  variant: "success",
  title: "SUCCESS!",
  description: "Your changes have been saved.",
});

// Error
toast({
  variant: "error",
  title: "ERROR!",
  description: "Something went wrong.",
});

// Warning
toast({
  variant: "warning",
  title: "WARNING!",
  description: "Please review your input.",
});

// Info
toast({
  variant: "info",
  title: "INFO",
  description: "This is informational.",
});`}
      >
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            onClick={() =>
              toast({
                variant: "default",
                title: "DEFAULT",
                description: "This is a default toast notification.",
              })
            }
          >
            SHOW DEFAULT
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              toast({
                variant: "success",
                title: "SUCCESS!",
                description: "Your changes have been saved successfully.",
              })
            }
          >
            SHOW SUCCESS
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              toast({
                variant: "error",
                title: "ERROR!",
                description: "Something went wrong. Please try again.",
              })
            }
          >
            SHOW ERROR
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: "warning",
                title: "WARNING!",
                description: "Please review your input before continuing.",
              })
            }
          >
            SHOW WARNING
          </Button>

          <Button
            onClick={() =>
              toast({
                variant: "info",
                title: "INFO",
                description: "This is an informational message.",
              })
            }
          >
            SHOW INFO
          </Button>
        </div>
      </ComponentPreview>

      {/* With Action */}
      <ComponentPreview
        title="With Action Button"
        description="Add an action button to the toast."
        code={`toast({
  variant: "default",
  title: "FILE DELETED",
  description: "Your file has been moved to trash.",
  action: {
    label: "UNDO",
    onClick: () => console.log("Undo clicked"),
  },
});`}
      >
        <Button
          onClick={() =>
            toast({
              variant: "default",
              title: "FILE DELETED",
              description: "Your file has been moved to trash.",
              action: {
                label: "UNDO",
                onClick: () => alert("Undo clicked!"),
              },
            })
          }
        >
          SHOW WITH ACTION
        </Button>
      </ComponentPreview>

      {/* Custom Duration */}
      <ComponentPreview
        title="Custom Duration"
        description="Control how long the toast stays visible."
        code={`// Short duration (2 seconds)
toast({
  title: "QUICK MESSAGE",
  duration: 2000,
});

// Long duration (10 seconds)
toast({
  title: "IMPORTANT",
  description: "This will stay longer.",
  duration: 10000,
});

// No auto-dismiss
toast({
  title: "PERSISTENT",
  description: "Must be manually closed.",
  duration: 0,
});`}
      >
        <div className="flex gap-4">
          <Button
            onClick={() =>
              toast({
                title: "QUICK MESSAGE",
                description: "Dismisses in 2 seconds",
                duration: 2000,
              })
            }
          >
            SHORT (2s)
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: "LONG MESSAGE",
                description: "Stays for 10 seconds",
                duration: 10000,
              })
            }
          >
            LONG (10s)
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "PERSISTENT",
                description: "Must be manually closed",
                duration: 0,
              })
            }
          >
            PERSISTENT
          </Button>
        </div>
      </ComponentPreview>

      {/* Multiple Toasts */}
      <ComponentPreview
        title="Multiple Toasts"
        description="Stack multiple toasts simultaneously."
        code={`// Trigger multiple toasts
toast({ variant: "info", title: "LOADING..." });
toast({ variant: "success", title: "STEP 1 COMPLETE" });
toast({ variant: "success", title: "STEP 2 COMPLETE" });`}
      >
        <Button
          onClick={() => {
            toast({ variant: "info", title: "PROCESSING..." });
            setTimeout(
              () => toast({ variant: "success", title: "STEP 1 COMPLETE" }),
              500
            );
            setTimeout(
              () => toast({ variant: "success", title: "STEP 2 COMPLETE" }),
              1000
            );
            setTimeout(
              () => toast({ variant: "success", title: "ALL DONE!" }),
              1500
            );
          }}
        >
          SHOW MULTIPLE
        </Button>
      </ComponentPreview>
    </div>
  );
}
