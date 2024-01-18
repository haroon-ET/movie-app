"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./pagination";
import { movieService, products } from "@/service/movie.service";
import { AddIcon, LogoutIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Store";

const MovieList = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8; // Number of movies per page
  const totalMovies = movies?.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handleCreateMovieClick = () => {
    router.push("/movies/create");
  };
  const handleNavigateToLogout = () => {
    useAuthStore.getState().setToken("");
    router.push("/login");
  };
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const getAllMovies = async () => {
      const allmovies = await movieService.getAllMovies(authToken!);
      setMovies(allmovies);
    };
    getAllMovies();
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;

    const slicedMovies = movies?.slice(startIndex, endIndex);
    console.log("slicedMovies:", slicedMovies);

    return slicedMovies?.map((item: any, key: any) => (
      <MovieCard
        key={key}
        title={item?.title || ''}
        publishingYear={item?.publishingYear || ''}
        poster={item?.imageUrl || ''}
        id={item?.id || 0}
      />
    ));
  };

  return (
    <div>
      <div className="text-white text-left flex items-center">
        <div className="flex items-center" onClick={handleCreateMovieClick}>
          <h2 className="font-montserrat text-4xl font-semibold leading-10 mr-2">
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
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {renderMovies()}
        </div>
        <div className="flex justify-center items-center h-full">

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
