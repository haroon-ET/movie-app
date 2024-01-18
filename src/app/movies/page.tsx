import EmptyList from "@/components/EmptyList";
import MovieList from "@/components/MovieList";
import { products } from "@/service/movie.service";

const Movies = () => {
  return products.length > 0 ? <MovieList /> : <EmptyList />;
};

export default Movies;
