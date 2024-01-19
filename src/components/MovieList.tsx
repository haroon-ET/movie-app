"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./pagination";
import { movieService } from "@/service/movie.service";
import { AddIcon, LogoutIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import EmptyList from "./EmptyList";

const MovieList = () => {
  const router = useRouter();
  const { movies, setMovies } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  const handleCreateMovieClick = () => {
    router.push("/movies/create");
  };
  const handleNavigateToLogout = () => {
    localStorage.setItem("token", "");
    router.push("/login");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const getAllMovies = async () => {
      const allMovies = await movieService.getAllMovies(
        authToken!,
        currentPage,
        moviesPerPage
      );
      setMovies(allMovies);
    };
    getAllMovies();
  }, [currentPage, setMovies]);

  return (
    <div>
      <div className="text-white text-left flex items-center">
        <div className="flex items-center" onClick={handleCreateMovieClick}>
          <h2 className="font-montserrat text-4xl font-semibold leading-10 mr-2 whitespace-nowrap">
            My movies
          </h2>
          <AddIcon onClick={handleCreateMovieClick} />
        </div>
        <div
          className="ml-auto flex items-center"
          onClick={handleNavigateToLogout}
        >
          <h3 className="ml-2 mr-2">Logout</h3>
          <LogoutIcon onClick={handleNavigateToLogout} />
        </div>
      </div>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {movies.map((item: any, key) => (
            <MovieCard
              key={key}
              title={item?.title || ""}
              publishingYear={item?.publishingYear || ""}
              poster={item?.imageUrl || ""}
              id={item?.id || 1}
            />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
      <div className="flex justify-center items-center h-full">
        <Pagination
          currentPage={currentPage}
          totalMovies={movies.length}
          MoviesPerPage={moviesPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MovieList;
