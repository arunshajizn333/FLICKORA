// src/utils/hooks/useHomeMovies.js
import useFetchAndDispatch from "./useFetchAndDispatch";
import {
    addNowPlayingMovies,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies
} from "../reduxStore/moviesSlice .js";

const useHomeMovies = () => {
    useFetchAndDispatch('/movie/now_playing', addNowPlayingMovies, (store) => store.movies?.nowPlayingMovies);
    useFetchAndDispatch('/movie/popular', addPopularMovies, (store) => store.movies?.popularMovies);
    useFetchAndDispatch('/movie/top_rated', addTopRatedMovies, (store) => store.movies?.topRatedMovies);
    useFetchAndDispatch('/movie/upcoming', addUpcomingMovies, (store) => store.movies?.upcomingMovies);
};

export default useHomeMovies;