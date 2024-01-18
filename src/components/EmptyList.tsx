'use client'
import { useRouter } from "next/navigation";
import React from "react";

const EmptyList = () => {
  const router = useRouter();

  const handleCreateMovieClick = () => {
    router.push("/movies/create");
  };
  return (
    <div className="flex flex-col items-center justify-center h-96 mt-10">
      <h1 className="text-white text-center text-5xl font-semibold mb-6 tracking-wide">
        Your movie list is empty
      </h1>
      <button onClick={handleCreateMovieClick} className="text-white rounded-lg bg-green-600 inline-flex items-center justify-center h-11 w-4/12 items-start gap-2">
        Add a new movie
      </button>
    </div>
  );
};

export default EmptyList;
