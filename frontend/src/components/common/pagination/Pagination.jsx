import {
  RiArrowLeftLine as LeftArrowIcon,
  RiArrowRightLine as RightArrowIcon,
} from "react-icons/ri";

import { twMerge } from "tailwind-merge";

function Pagination({ currentPage = 0, totalPages = 0, onPageChange }) {
  currentPage = parseInt(currentPage);
  totalPages = parseInt(totalPages);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const pageOffset = 2;

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
          for (let i = totalPages - totalPagesToShow; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        }
      } else {
        pageNumbers.push(1);
        if (totalPages > totalPagesToShow + 1) {
          pageNumbers.push("...");
        }
        for (
          let i = currentPage - pageOffset;
          i <= currentPage + pageOffset;
          i++
        ) {
          pageNumbers.push(i);
        }
        if (totalPages > totalPagesToShow + 1) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-between border-t font-semibold">
      <div
        className={twMerge(
          "flex py-3 items-center gap-3 cursor-pointer",
          currentPage <= 1 && "pointer-events-none text-slate-300",
          currentPage !== 1 && "hover:text-primary"
        )}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LeftArrowIcon size={20} />
        Previous
      </div>

      <div className="py-3 md:hidden">
        Page {currentPage} of {totalPages}
      </div>

      <div className="hidden md:flex justify-center gap-3">
        {getPageNumbers().map((pageNumber, index) => (
          <span
            key={index}
            className={twMerge(
              "cursor-pointer p-3 border-t-4 border-transparent",
              pageNumber === "..." && "pointer-events-none",
              pageNumber === currentPage &&
                "text-primary border-t-4 border-primary",
              pageNumber !== "..." && "hover:text-primary"
            )}
            onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>

      <div
        className={twMerge(
          "flex py-3 items-center gap-3 cursor-pointer",
          currentPage >= totalPages && "pointer-events-none text-slate-300",
          currentPage !== totalPages && "hover:text-primary"
        )}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <RightArrowIcon size={20} />
      </div>
    </nav>
  );
}

export default Pagination;