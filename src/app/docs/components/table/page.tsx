"use client";

import { useState } from "react";
import { Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function TablePage() {
  const [sortColumn, setSortColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          TABLE
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Data grid component with sorting, row selection, zebra striping, and
          sticky headers. Features thick black borders in a grid layout.
        </p>
      </div>

      {/* Basic Table */}
      <ComponentPreview
        title="Basic Table"
        description="Simple table with header and data rows."
        code={`import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NAME</TableHead>
      <TableHead>EMAIL</TableHead>
      <TableHead>ROLE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>JOHN DOE</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>ADMIN</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>JANE SMITH</TableCell>
      <TableCell>jane@example.com</TableCell>
      <TableCell>USER</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>JOHN DOE</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>ADMIN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>JANE SMITH</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>USER</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BOB JOHNSON</TableCell>
              <TableCell>bob@example.com</TableCell>
              <TableCell>USER</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentPreview>

      {/* Sortable Table */}
      <ComponentPreview
        title="Sortable Columns"
        description="Enable sorting on specific columns."
        code={`const [sortColumn, setSortColumn] = useState<string>();
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortDirection("asc");
  }
};

<Table sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort}>
  <TableHeader>
    <TableRow>
      <TableHead sortable sortKey="name">NAME</TableHead>
      <TableHead sortable sortKey="age">AGE</TableHead>
      <TableHead sortable sortKey="score">SCORE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* rows */}
  </TableBody>
</Table>`}
      >
        <Table
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          <TableHeader>
            <TableRow>
              <TableHead sortable sortKey="name">
                NAME
              </TableHead>
              <TableHead sortable sortKey="age">
                AGE
              </TableHead>
              <TableHead sortable sortKey="score">
                SCORE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ALICE</TableCell>
              <TableCell>28</TableCell>
              <TableCell>95</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BOB</TableCell>
              <TableCell>34</TableCell>
              <TableCell>87</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CHARLIE</TableCell>
              <TableCell>25</TableCell>
              <TableCell>92</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentPreview>

      {/* Selectable Rows */}
      <ComponentPreview
        title="Selectable Rows"
        description="Highlight selected rows with cyan background."
        code={`const [selectedRows, setSelectedRows] = useState<string[]>([]);

const toggleRow = (id: string) => {
  setSelectedRows((prev) =>
    prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
  );
};

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>SELECT</TableHead>
      <TableHead>PRODUCT</TableHead>
      <TableHead>PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow
      selected={selectedRows.includes("1")}
      onClick={() => toggleRow("1")}
    >
      <TableCell>
        <input type="checkbox" checked={selectedRows.includes("1")} />
      </TableCell>
      <TableCell>LAPTOP</TableCell>
      <TableCell>$999</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SELECT</TableHead>
              <TableHead>PRODUCT</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>STOCK</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              selected={selectedRows.includes("1")}
              onClick={() => toggleRow("1")}
              className="cursor-pointer"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.includes("1")}
                  onChange={() => {}}
                  className="w-5 h-5"
                />
              </TableCell>
              <TableCell>LAPTOP</TableCell>
              <TableCell>$999</TableCell>
              <TableCell>12</TableCell>
            </TableRow>
            <TableRow
              selected={selectedRows.includes("2")}
              onClick={() => toggleRow("2")}
              className="cursor-pointer"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.includes("2")}
                  onChange={() => {}}
                  className="w-5 h-5"
                />
              </TableCell>
              <TableCell>MOUSE</TableCell>
              <TableCell>$29</TableCell>
              <TableCell>45</TableCell>
            </TableRow>
            <TableRow
              selected={selectedRows.includes("3")}
              onClick={() => toggleRow("3")}
              className="cursor-pointer"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.includes("3")}
                  onChange={() => {}}
                  className="w-5 h-5"
                />
              </TableCell>
              <TableCell>KEYBOARD</TableCell>
              <TableCell>$79</TableCell>
              <TableCell>23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentPreview>

      {/* Cell Alignment */}
      <ComponentPreview
        title="Cell Alignment"
        description="Control text alignment in table cells."
        code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ITEM</TableHead>
      <TableHead>QUANTITY</TableHead>
      <TableHead>PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell align="left">WIDGET</TableCell>
      <TableCell align="center">5</TableCell>
      <TableCell align="right">$50.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ITEM</TableHead>
              <TableHead>QUANTITY</TableHead>
              <TableHead>PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell align="left">WIDGET A</TableCell>
              <TableCell align="center">5</TableCell>
              <TableCell align="right">$50.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">WIDGET B</TableCell>
              <TableCell align="center">12</TableCell>
              <TableCell align="right">$120.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">WIDGET C</TableCell>
              <TableCell align="center">8</TableCell>
              <TableCell align="right">$80.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentPreview>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">FEATURES</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <ul className="space-y-3 font-medium">
            <li>
              <strong className="uppercase">Zebra Striping:</strong> Alternating
              row colors for better readability
            </li>
            <li>
              <strong className="uppercase">Hover Effect:</strong> Rows highlight
              in yellow on hover
            </li>
            <li>
              <strong className="uppercase">Sortable Headers:</strong> Click to
              sort with visual indicators (▲▼)
            </li>
            <li>
              <strong className="uppercase">Row Selection:</strong> Cyan
              background for selected rows
            </li>
            <li>
              <strong className="uppercase">Responsive:</strong> Horizontal scroll
              on smaller screens
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
