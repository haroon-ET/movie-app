import React from "react";
import { AddIcon, LogoutIcon } from "@/assets";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  publishingYear: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  publishingYear,
  poster,
}) => {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <a
        key={id}
        className="group inline-flex flex-col items-start
         gap-3 p-2 border rounded overflow-hidden border-gray- 
         hover:border-gray-500 backdrop-blur-100 mt-1"
        style={{
          height: "300px",
          flexShrink: 0,
          borderRadius: "6px",
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%), rgba(8, 41, 53, 0.55)",
        }}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={poster}
            alt={"image"}
            className="w-full h-full object-cover object-center group-hover:opacity-75 rounded"
          />
        </div>
        <Link
          href={{ pathname: "/movies/edit", query: { id: id } }}
          className="cursor-pointer mt-2 text-base font-medium text-white leading-6 font-montserrat"
        >
          {title}
        </Link>
        <p className="mt-1 text-lg font-medium text-white">{publishingYear}</p>
      </a>
    </div>
  );
};

export default MovieCard;
