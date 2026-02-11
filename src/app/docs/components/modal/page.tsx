"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalClose,
} from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          MODAL
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Dialog overlay with backdrop and slide-up animation.
        </p>
      </div>

      {/* Basic */}
      <ComponentPreview
        title="Basic Modal"
        description="Click the button to open the modal."
        code={`import { useState } from "react";
import { Button, Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter, ModalClose } from "@/components/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>OPEN MODAL</Button>

<Modal open={open} onClose={() => setOpen(false)}>
  <ModalClose onClick={() => setOpen(false)} />
  <ModalHeader>
    <ModalTitle>MODAL TITLE</ModalTitle>
    <ModalDescription>This is the modal description.</ModalDescription>
  </ModalHeader>
  <ModalContent>
    <p>Your modal content goes here.</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>CANCEL</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>CONFIRM</Button>
  </ModalFooter>
</Modal>`}
      >
        <div>
          <Button onClick={() => setOpen(true)}>OPEN MODAL</Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalClose onClick={() => setOpen(false)} />
            <ModalHeader>
              <ModalTitle>MODAL TITLE</ModalTitle>
              <ModalDescription>
                This is the modal description text.
              </ModalDescription>
            </ModalHeader>
            <ModalContent>
              <p>
                This is the modal content. You can put any content here
                including forms, images, or other components.
              </p>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                CANCEL
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                CONFIRM
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </ComponentPreview>

      {/* Simple Modal */}
      <ComponentPreview
        title="Simple Modal"
        description="Modal with just content."
        code={`<Modal open={open} onClose={() => setOpen(false)}>
  <ModalClose onClick={() => setOpen(false)} />
  <ModalContent className="py-12 text-center">
    <p className="text-xl font-bold uppercase">SIMPLE MESSAGE</p>
    <Button variant="primary" className="mt-6" onClick={() => setOpen(false)}>
      GOT IT
    </Button>
  </ModalContent>
</Modal>`}
      >
        <div>
          <Button onClick={() => setOpen2(true)}>OPEN SIMPLE MODAL</Button>
          <Modal open={open2} onClose={() => setOpen2(false)}>
            <ModalClose onClick={() => setOpen2(false)} />
            <ModalContent className="py-12 text-center">
              <p className="text-xl font-bold uppercase">SIMPLE MESSAGE</p>
              <p className="mt-2 text-gray-600">
                This is a simple modal with minimal content.
              </p>
              <Button
                variant="primary"
                className="mt-6"
                onClick={() => setOpen2(false)}
              >
                GOT IT
              </Button>
            </ModalContent>
          </Modal>
        </div>
      </ComponentPreview>

      {/* Full Code */}
      <div className="source-panel bg-white">
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">
            FULL COMPONENT CODE
          </h3>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono bg-[#171717] text-[#f5f5f5]">
          {`"use client";

import { HTMLAttributes, forwardRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className = "", open, onClose, children, ...props }, ref) => {
    // Handle Escape key and body scroll lock
    const handleEscape = useCallback((e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [open, handleEscape]);

    if (!open) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0_0_#000] animate-brutal-slide-up"
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

// ModalHeader, ModalTitle, ModalContent, ModalFooter, ModalClose
// (See full source for complete implementation)

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter, ModalClose };`}
        </pre>
      </div>
    </div>
  );
}
