import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationContent,
} from "@/components/ui/pagination";

const TransactionPagination = ({ currentPage, totalPages, pagesToShow, paginate }) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pagesToShow={pagesToShow}
      className="mb-3 cursor-pointer"
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* Render pagination links */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - Math.floor(pagesToShow / 2) &&
              page <= currentPage + Math.floor(pagesToShow / 2))
          ) {
            return (
              <PaginationItem key={page} active={page === currentPage}>
                <PaginationLink onClick={() => paginate(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if ((page === 2 && currentPage > 1) || page === totalPages - 1) {
            return <PaginationEllipsis key={`ellipsis-${page}`} />;
          }

          return null;
        })}

        <PaginationItem>
          <PaginationNext
            disabled={totalPages <= currentPage}
            onClick={() => paginate(currentPage + 1)}
            className={
              totalPages <= currentPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TransactionPagination;
