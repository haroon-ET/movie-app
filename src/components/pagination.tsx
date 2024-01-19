import React from "react";

interface PaginationProps {
  currentPage: number;
  totalMovies: any;
  moviesPerPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  totalMovies,
  moviesPerPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="relative z-10 inline-flex items-center text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat bg-#2BD17E-600 text-white px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Previous
      </button>
      {Array.from({ length: currentPage }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={currentPage === index}
          className={`relative z-10 inline-flex items-center ${
            currentPage === index
              ? "bg-#2BD17E-600 text-white"
              : "bg-login-button text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat"
          } px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {index}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={totalMovies < moviesPerPage}
        className="relative z-10 inline-flex items-center text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat bg-#2BD17E-600 text-white px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
