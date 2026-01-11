"use client";

import { HTMLAttributes, forwardRef, useMemo } from "react";

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      className = "",
      ...props
    },
    ref
  ) => {
    // Generate page numbers with ellipsis
    const pageNumbers = useMemo(() => {
      const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
      const totalBlocks = totalNumbers + 2; // + 2 for ellipsis

      if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const leftRange = Array.from(
          { length: 3 + 2 * siblingCount },
          (_, i) => i + 1
        );
        return [...leftRange, "ellipsis", totalPages];
      }

      if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        const rightRange = Array.from(
          { length: 3 + 2 * siblingCount },
          (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
        );
        return [1, "ellipsis", ...rightRange];
      }

      if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        );
        return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
      }

      return [];
    }, [currentPage, totalPages, siblingCount]);

    const buttonStyles = (isActive: boolean, isDisabled: boolean) => `
      w-10 h-10
      flex items-center justify-center
      border-4 border-black
      shadow-[3px_3px_0_0_#000]
      font-bold uppercase
      transition-all duration-100 ease-out
      ${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-200"
          : isActive
          ? "bg-[#FFFF00] text-black"
          : "bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] cursor-pointer"
      }
    `;

    const arrowButtonStyles = (isDisabled: boolean) => `
      px-4 h-10
      flex items-center justify-center
      border-4 border-black
      shadow-[3px_3px_0_0_#000]
      font-bold uppercase text-sm
      transition-all duration-100 ease-out
      ${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-200"
          : "bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] cursor-pointer"
      }
    `;

    const ellipsisStyles = `
      w-10 h-10
      flex items-center justify-center
      font-bold text-2xl
      text-black
    `;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={`flex items-center gap-2 ${className}`}
        {...props}
      >
        {/* First Page */}
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={arrowButtonStyles(currentPage === 1)}
            aria-label="Go to first page"
          >
            ««
          </button>
        )}

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={arrowButtonStyles(currentPage === 1)}
          aria-label="Go to previous page"
        >
          ←
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className={ellipsisStyles}
              >
                ...
              </span>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isActive}
              className={buttonStyles(isActive, isActive)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={arrowButtonStyles(currentPage === totalPages)}
          aria-label="Go to next page"
        >
          →
        </button>

        {/* Last Page */}
        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={arrowButtonStyles(currentPage === totalPages)}
            aria-label="Go to last page"
          >
            »»
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination };
