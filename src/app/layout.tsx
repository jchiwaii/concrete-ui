import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: {
    default: "Concrete UI - Modern Neo-Brutalist React Components",
    template: "%s | Concrete UI",
  },
  description:
    "Accessible React components with strong structure, restrained color, and a modern neo-brutalist visual language.",
  keywords: [
    "ui library",
    "react components",
    "brutalist design",
    "neo brutalism",
    "tailwind css",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
