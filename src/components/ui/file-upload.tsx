"use client";

import { ChangeEvent, DragEvent, InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
  description?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className = "",
      files = [],
      onFilesChange,
      maxFiles,
      multiple = true,
      accept,
      label = "Drop files here",
      description = "or click to browse from your device",
      disabled,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const [dragging, setDragging] = useState(false);

    const applyFiles = (incoming: FileList | File[]) => {
      const next = [...files, ...Array.from(incoming)];
      onFilesChange?.(typeof maxFiles === "number" ? next.slice(0, maxFiles) : next);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) applyFiles(event.target.files);
      event.target.value = "";
    };

    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragging(false);
      if (!disabled) applyFiles(event.dataTransfer.files);
    };

    const removeFile = (index: number) => {
      onFilesChange?.(files.filter((_, fileIndex) => fileIndex !== index));
    };

    return (
      <div className={cn("grid gap-3", className)}>
        <label
          htmlFor={id}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-black bg-[var(--ui-surface)] p-8 text-center shadow-[var(--ui-shadow)] transition-all duration-100",
            dragging && "-translate-x-0.5 -translate-y-0.5 bg-[var(--ui-accent)] shadow-[var(--ui-shadow-lg)]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            ref={ref}
            id={id}
            type="file"
            className="sr-only"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={onInputChange}
            {...props}
          />
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-black bg-[var(--ui-info)] text-2xl font-bold shadow-[var(--ui-shadow)]">
            ↑
          </span>
          <span className="text-lg font-semibold tracking-tight">{label}</span>
          <span className="mt-1 text-sm font-medium text-gray-600">{description}</span>
          {accept && <span className="mt-3 rounded-md border-2 border-black bg-gray-100 px-2 py-1 text-xs font-semibold">{accept}</span>}
        </label>

        {files.length > 0 && (
          <div className="overflow-hidden rounded-lg border-2 border-black bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 border-b-2 border-black px-4 py-3 last:border-b-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="text-xs font-medium text-gray-500">{Math.ceil(file.size / 1024)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-md border-2 border-black bg-[var(--ui-surface)] px-2 py-1 text-xs font-semibold shadow-[var(--ui-shadow-sm)] hover:bg-[var(--ui-danger)] hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
