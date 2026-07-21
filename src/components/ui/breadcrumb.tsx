import { HTMLAttributes, forwardRef, AnchorHTMLAttributes } from "react";
import Link from "next/link";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  separator?: string;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, separator = "/", className = "", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={`flex w-full min-w-0 max-w-full items-center gap-2 overflow-x-auto whitespace-nowrap ${className}`}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  current?: boolean;
  separator?: string;
}

const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  (
    { children, href, current = false, separator = "/", className = "", ...props },
    ref
  ) => {
    const itemStyles = `
      shrink-0
      font-semibold
      tracking-[0.02em]
      text-sm
      ${
        current
          ? "bg-[var(--ui-accent)] px-3 py-1 border-2 border-black"
          : "hover:underline text-black"
      }
    `;

    const separatorStyles = `
      mx-1 shrink-0
      font-bold
      text-black
      select-none
    `;

    return (
      <>
        {current || !href ? (
          <span
            className={`${itemStyles} ${className}`}
            aria-current={current ? "page" : undefined}
          >
            {children}
          </span>
        ) : (
          <Link
            ref={ref}
            href={href}
            className={`${itemStyles} ${className}`}
            {...props}
          >
            {children}
          </Link>
        )}
        {!current && <span className={separatorStyles}>{separator}</span>}
      </>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export { Breadcrumb, BreadcrumbItem };
