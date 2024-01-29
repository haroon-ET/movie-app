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
  let pages = [];

  for (let i = 0; i < Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="relative z-10 inline-flex items-center text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat bg-#2BD17E-600 text-white px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Previous
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`relative z-10 inline-flex items-center ${
              currentPage === page
                ? "bg-login-button text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat"
                : "bg-#2BD17E-600 text-white border border-gray-300 hover:bg-gray-600 font-montserrat"
            } px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pages.length - 1}
        className="relative z-10 inline-flex items-center text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat bg-#2BD17E-600 text-white px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
