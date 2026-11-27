import React from "react";
import MovieCardShimmer from "./MovieCardShimmer";

const MovieListShimmer = ({ count = 8 }) => {
  return (
    <section className="space-y-3">
      <div className="h-6 w-44 bg-white/10 rounded-md animate-pulse" />
      <div className="flex gap-3 sm:gap-4 overflow-hidden pb-3">
        {Array.from({ length: count }).map((_, idx) => (
          <MovieCardShimmer key={idx} />
        ))}
      </div>
    </section>
  );
};

export default MovieListShimmer;
