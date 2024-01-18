import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPaginationLinks = () => {
    const paginationLinks = [];

    // Previous button
    if (currentPage > 1) {
      paginationLinks.push(
        <a
          key="previous"
          href="#"
          onClick={() => handlePageClick(currentPage - 1)}
          className="relative z-10 inline-flex items-center text-gray-300 hover:text-gray-400 px-2 py-1 text-xl font-semibold font-montserrat focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          Prev
        </a>
      );
    }

    // Numbered pagination links
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <a
          key={i}
          href="#"
          onClick={() => handlePageClick(i)}
          className={`relative z-10 inline-flex items-center ${currentPage === i
              ? 'bg-#2BD17E-600 text-white'
              : 'bg-login-button text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat'
            } px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {i}
        </a>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      paginationLinks.push(
        <a
          key="next"
          href="#"
          onClick={() => handlePageClick(currentPage + 1)}
          className="relative z-10 inline-flex items-center text-gray-300 hover:text-gray-400 px-2 py-1 text-xl font-semibold font-montserrat focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 border border-transparent rounded-md"
        >
          Next
        </a>
      );
    }

    return paginationLinks;
  };

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      {renderPaginationLinks()}
    </nav>
  );
};

export default Pagination;
