import {
  RiArrowLeftLine as LeftArrowIcon,
  RiArrowRightLine as RightArrowIcon,
} from "react-icons/ri";

import { twMerge } from "tailwind-merge";

function Pagination({
  currentPage = 0,
  totalPages = 0,
  onPageChange,
  totalPagesToShow = 5,
}) {
  currentPage = parseInt(currentPage);
  totalPages = parseInt(totalPages);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageOffset = Math.floor(totalPagesToShow / 2);

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const isFirstPage = currentPage === 1;
      const isLastPage = currentPage === totalPages;
      const isNearFirstPage = currentPage <= pageOffset + 1;
      const isNearLastPage = currentPage >= totalPages - pageOffset;
      if (isFirstPage || isNearFirstPage) {
        for (let i = 1; i <= totalPagesToShow; i++) {
          pageNumbers.push(i);
        }
        if (totalPages > totalPagesToShow + 1) {
          pageNumbers.push("...");
        }
        if (totalPages > totalPagesToShow) {
          pageNumbers.push(totalPages);
        }
      } else if (isLastPage || isNearLastPage) {
        pageNumbers.push(1);
        if (totalPages > totalPagesToShow + 1) {
          pageNumbers.push("...");
          for (
            let i = totalPages - totalPagesToShow + 1;
            i <= totalPages;
            i++
          ) {
            pageNumbers.push(i);
          }
        } else {
          for (
            let i = totalPages - totalPagesToShow + 1;
            i <= totalPages;
            i++
          ) {
            pageNumbers.push(i);
          }
        }
      } else {
        pageNumbers.push(1);
        if (currentPage > pageOffset + 2) {
          pageNumbers.push("...");
        }
        for (
          let i = currentPage - pageOffset;
          i <= currentPage + pageOffset;
          i++
        ) {
          pageNumbers.push(i);
        }
        if (currentPage + pageOffset + 1 < totalPages) {
          pageNumbers.push("...");
        }
        if (currentPage + pageOffset + 1 <= totalPages) {
          pageNumbers.push(totalPages);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <nav
      data-testid="pagination"
      className="flex justify-between border-t border-divider font-semibold"
    >
      <button
        data-testid="previous-button"
        disabled={currentPage <= 1}
        className={twMerge(
          "flex py-3 items-center gap-3 cursor-pointer",
          currentPage !== 1 && "hover:text-primary"
        )}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LeftArrowIcon size={20} />
        <span className="hidden sm:block">Previous</span>
      </button>

      <div className="py-3 md:hidden">
        Page {currentPage} of {totalPages}
      </div>

      <div className="hidden md:flex justify-center gap-3">
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={twMerge(
              "cursor-pointer p-3 border-t-4 border-transparent",
              pageNumber === "..." && "pointer-events-none",
              pageNumber === currentPage && "text-primary border-primary",
              pageNumber !== "..." && "hover:text-primary"
            )}
            onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        data-testid="next-button"
        disabled={currentPage >= totalPages}
        className={twMerge(
          "flex py-3 items-center gap-3 cursor-pointer",
          currentPage !== totalPages && "hover:text-primary"
        )}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="hidden sm:block">Next</span>
        <RightArrowIcon size={20} />
      </button>
    </nav>
  );
}

export default Pagination;
