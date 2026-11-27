import React from "react";
import MovieCards from "./MovieCards";

const MovieLists = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
        {title}
      </h2>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar">
        {movies.map((movie) => (
          <MovieCards
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title || movie.original_title}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieLists;
