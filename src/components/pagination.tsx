import React from "react";

interface PaginationProps {
  currentPage: number;
  totalMovies: any;
  MoviesPerPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalMovies,
  MoviesPerPage,
}) => {
  let movies = [];

  for (let i = 0; i <= Math.ceil(totalMovies / MoviesPerPage); i++) {
    movies.push(i);
  }
  return (
    <div className="pagination">
      {movies.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(item)}
            className={`relative z-10 inline-flex items-center ${
              currentPage === item
                ? "bg-#2BD17E-600 text-white"
                : "bg-login-button text-gray-300 border border-gray-300 hover:bg-gray-600 font-montserrat"
            } px-4 py-2 text-sm font-semibold mx-1 focus:z-10 focus-visible:outline focus-visible:outline-1 font-montserrat focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {currentPage > item
              ? "Prev"
              : item || currentPage < item
              ? "Next"
              : item}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
