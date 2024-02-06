"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./pagination";
import { movieService } from "@/service/movie.service";
import { useMovieStore } from "@/store/movieStore";
import EmptyList from "./EmptyList";

const MovieList = () => {
  const { movies, setMovies } = useMovieStore();
  const [totalCount, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const moviesPerPage = 8;

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const getAllMovies = async () => {
      const newMovies = await movieService.getAllMovies(
        authToken!,
        currentPage,
        moviesPerPage
      );

      setMovies(newMovies.movies);
      setCount(newMovies.count);
    };
    getAllMovies();
  }, [currentPage, setMovies]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {movies?.map((item: any, key) => (
              <MovieCard
                key={key}
                title={item?.title || ""}
                publishingYear={item?.publishingYear || ""}
                poster={item?.imageUrl || ""}
                id={item?.id || 1}
              />
            ))}
          </div>
          <div className="flex justify-center items-center h-full">
            <Pagination
              currentPage={currentPage}
              totalMovies={totalCount}
              moviesPerPage={moviesPerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default MovieList;
