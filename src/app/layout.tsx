import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: "Concrete UI - Neo Brutalist Component Library",
  description:
    "Bold, unapologetic UI components with thick borders, hard shadows, and raw aesthetics. Copy & paste React components for the brutalist web.",
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
      <body className="font-display antialiased">
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
