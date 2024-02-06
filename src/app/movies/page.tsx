"use client";
import { AddIcon, LogoutIcon } from "@/assets";
import MovieList from "@/components/MovieList";
import { useRouter } from "next/navigation";

const Movies = () => {
  const router = useRouter();
  const handleCreateMovieClick = () => {
    router.push("/movies/create");
  };
  const handleNavigateToLogout = () => {
    localStorage.setItem("token", "");
    router.push("/login");
  };
  return (
  <>
  <div className="text-white text-left flex items-center">
        <div
          className="flex items-center cursor-pointer lg:absolute lg:left-11"
          onClick={handleCreateMovieClick}
        >
          <h2 className="font-montserrat text-4xl font-semibold leading-10 mr-2 whitespace-nowrap">
            My movies
          </h2>
          <AddIcon onClick={handleCreateMovieClick} />
        </div>
        <div
          className="flex items-center cursor-pointer lg:absolute lg:right-11"
          onClick={handleNavigateToLogout}
        >
          <h3 className="ml-2 mr-2">Logout</h3>
          <LogoutIcon onClick={handleNavigateToLogout} />
        </div>
      </div>
  <MovieList />
  </>
  );
};

export default Movies;
