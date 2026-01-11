"use client";

import {
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  useState,
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
            border-4 border-black
            shadow-[6px_6px_0_0_#000]
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
    const [isHovered, setIsHovered] = useState(false);

    return (
      <tr
        ref={ref}
        className={`
          border-b-4 border-black last:border-b-0
          transition-all duration-100 ease-out
          ${
            selected
              ? "bg-[#00FFFF]"
              : isHovered
              ? "bg-[#FFFF00]"
              : "even:bg-gray-100 odd:bg-white"
          }
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          px-6 py-4
          text-left
          font-bold uppercase tracking-wider
          border-r-4 border-black last:border-r-0
          ${sortable ? "cursor-pointer hover:bg-gray-800" : ""}
          ${className}
        `}
        onClick={handleClick}
        aria-sort={
          isSorted
            ? sortDirection === "asc"
              ? "ascending"
              : "descending"
            : undefined
        }
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && (
            <span className="text-sm">
              {isSorted ? (sortDirection === "asc" ? "▲" : "▼") : "⬍"}
            </span>
          )}
        </div>
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
          px-6 py-4
          border-r-4 border-black last:border-r-0
          font-medium
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
