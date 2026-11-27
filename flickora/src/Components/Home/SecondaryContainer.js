import React from "react";
import { useSelector } from "react-redux";
import MovieLists from "./MovieLists";
import MovieListShimmer from "../shimmers/MovieListShimmer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  const sections = [
    { title: "Now Playing Movies", data: movies?.nowPlayingMovies },
    { title: "Popular Movies", data: movies?.popularMovies },
    { title: "Top Rated Movies", data: movies?.topRatedMovies },
    { title: "Upcoming Movies", data: movies?.upcomingMovies },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) =>
        section.data ? (
          <MovieLists
            key={section.title}
            title={section.title}
            movies={section.data}
          />
        ) : (
          <MovieListShimmer key={section.title} />
        )
      )}
    </div>
  );
};

export default SecondaryContainer;
