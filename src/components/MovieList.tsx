"use client";
import React from "react";
import MovieCard from "./MovieCard";
import Pagination from "./pagination";
import { products } from "@/service/movie.service";
import { AddIcon, LogoutIcon } from "@/assets";
import { useRouter } from "next/navigation";

const MovieList = () => {
  const router = useRouter();

  const handleCreateMovieClick = () => {
    router.push("/movies/create");
  };
  const handleNavigateToLogout = () => {
    router.push("/login");
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
        {products.map((item, key) => (
          <MovieCard
            key={key}
            title={item.name}
            publishingYear={item.year}
            poster={item.imageSrc}
            id={item.id}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default MovieList;
