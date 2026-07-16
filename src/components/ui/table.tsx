"use client";

import {
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  forwardRef,
  createContext,
  useContext,
} from "react";

interface TableContextValue {
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

const TableContext = createContext<TableContextValue>({});

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    { children, sortColumn, sortDirection, onSort, className = "", ...props },
    ref
  ) => {
    return (
      <TableContext.Provider value={{ sortColumn, sortDirection, onSort }}>
        <div
          ref={ref}
          className={`
            overflow-x-auto
            border-2 border-black
            rounded-[var(--ui-radius-lg)] bg-[var(--ui-surface)]
            shadow-[var(--ui-shadow)]
            ${className}
          `}
          {...props}
        >
          <table className="w-full border-collapse">{children}</table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={`bg-black text-white ${className}`}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <tbody ref={ref} className={className} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, selected = false, className = "", ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`
          border-b-2 border-black last:border-b-0
          transition-colors duration-150 ease-out
          ${selected ? "bg-[var(--ui-info)]" : "even:bg-gray-100 odd:bg-[var(--ui-surface)] hover:bg-[var(--ui-accent-soft)]"}
          ${className}
        `}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortKey?: string;
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { children, sortable = false, sortKey, className = "", ...props },
    ref
  ) => {
    const context = useContext(TableContext);
    const { sortColumn, sortDirection, onSort } = context;

    const isSorted = sortKey && sortColumn === sortKey;

    const handleClick = () => {
      if (sortable && sortKey && onSort) {
        onSort(sortKey);
      }
    };

    return (
      <th
        ref={ref}
        className={`
          px-5 py-3.5
          text-left
          text-sm font-semibold
          border-r-2 border-black last:border-r-0
          ${className}
        `}
        aria-sort={
          isSorted
            ? sortDirection === "asc"
              ? "ascending"
              : "descending"
            : undefined
        }
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={handleClick}
            className="-m-2 flex w-[calc(100%+1rem)] items-center gap-2 rounded-md p-2 text-left hover:bg-white/10 focus-visible:outline-white"
          >
            <span>{children}</span>
            <span className="text-xs" aria-hidden="true">
              {isSorted ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
            </span>
          </button>
        ) : (
          children
        )}
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, align = "left", className = "", ...props }, ref) => {
    const alignmentStyles = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <td
        ref={ref}
        className={`
          px-5 py-3.5
          border-r-2 border-black last:border-r-0
          text-sm font-medium
          ${alignmentStyles[align]}
          ${className}
        `}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
