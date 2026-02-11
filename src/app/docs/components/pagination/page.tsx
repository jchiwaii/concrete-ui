"use client";

import { useState } from "react";
import { Badge, Pagination } from "@/components/ui";
import { ComponentPreview } from "@/components/docs";

export default function PaginationPage() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);

  return (
    <div className="docs-component-page space-y-12">
      {/* Header */}
      <div>
        <Badge variant="primary" className="mb-4">
          COMPONENT
        </Badge>
        <h1 className="text-brutal-4xl font-extrabold uppercase tracking-tight mb-4">
          PAGINATION
        </h1>
        <p className="text-brutal-lg max-w-2xl">
          Page navigation component with ellipsis for long page lists, prev/next
          buttons, and first/last page jumps. Current page highlighted in yellow.
        </p>
      </div>

      {/* Basic Pagination */}
      <ComponentPreview
        title="Basic Pagination"
        description="Simple pagination with few pages."
        code={`import { Pagination } from "@/components/ui";

const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
/>`}
      >
        <div className="space-y-4">
          <Pagination
            currentPage={page1}
            totalPages={5}
            onPageChange={setPage1}
          />
          <p className="text-sm font-bold uppercase text-gray-600">
            Current Page: {page1}
          </p>
        </div>
      </ComponentPreview>

      {/* With Ellipsis */}
      <ComponentPreview
        title="With Ellipsis"
        description="Pagination automatically adds ellipsis for many pages."
        code={`<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>`}
      >
        <div className="space-y-4">
          <Pagination
            currentPage={page2}
            totalPages={20}
            onPageChange={setPage2}
          />
          <p className="text-sm font-bold uppercase text-gray-600">
            Current Page: {page2} of 20
          </p>
        </div>
      </ComponentPreview>

      {/* Without First/Last */}
      <ComponentPreview
        title="Without First/Last Buttons"
        description="Hide the first and last page jump buttons."
        code={`<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showFirstLast={false}
/>`}
      >
        <div className="space-y-4">
          <Pagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            showFirstLast={false}
          />
          <p className="text-sm font-bold uppercase text-gray-600">
            Current Page: {page3} of 10
          </p>
        </div>
      </ComponentPreview>

      {/* Custom Sibling Count */}
      <ComponentPreview
        title="Custom Sibling Count"
        description="Control how many page numbers to show around current page."
        code={`<Pagination
  currentPage={currentPage}
  totalPages={50}
  onPageChange={setCurrentPage}
  siblingCount={2}
/>`}
      >
        <div className="space-y-4">
          <Pagination
            currentPage={page4}
            totalPages={50}
            onPageChange={setPage4}
            siblingCount={2}
          />
          <p className="text-sm font-bold uppercase text-gray-600">
            Current Page: {page4} of 50
          </p>
        </div>
      </ComponentPreview>

      {/* Usage Example */}
      <div className="space-y-4">
        <h2 className="text-brutal-2xl font-bold uppercase">USAGE EXAMPLE</h2>
        <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0_0_#000] p-6">
          <pre className="font-mono text-sm overflow-x-auto">
            {`// Typical usage with data fetching
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalItems = 243;
const totalPages = Math.ceil(totalItems / itemsPerPage);

// Calculate slice indices
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = allItems.slice(startIndex, endIndex);

<div>
  {currentItems.map(item => <ItemCard key={item.id} {...item} />)}

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
