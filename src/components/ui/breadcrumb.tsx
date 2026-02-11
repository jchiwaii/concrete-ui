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
        className={`flex items-center gap-2 ${className}`}
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
      font-bold
      uppercase
      tracking-wider
      text-sm
      ${
        current
          ? "bg-[#ffde00] px-3 py-1 border-2 border-black"
          : "hover:underline text-black"
      }
    `;

    const separatorStyles = `
      mx-2
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
