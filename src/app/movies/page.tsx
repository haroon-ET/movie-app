'use client'
import EmptyList from "@/components/EmptyList";
import MovieList from "@/components/MovieList";
import { movieService, products } from "@/service/movie.service";
import { useEffect, useState } from "react";

const Movies = () => {
  const authToken = localStorage.getItem("token");
  const [movies, setMovies] = useState<any>(null);
  useEffect(() => {
    const getAllMovies = async () => {
      const allmovies = await movieService.getAllMovies(authToken!);
      setMovies(allmovies);
    };
    getAllMovies();
  }, []);
  return movies?.length > 0 ? <MovieList /> : <EmptyList />;
};

export default Movies;
