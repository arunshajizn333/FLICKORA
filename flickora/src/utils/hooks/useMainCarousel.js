import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentCarousel } from "../reduxStore/moviesSlice"; // Fixed trailing space

const useMainCarousel = () => {
  const dispatch = useDispatch();

  const movieList = useSelector((state) => state.movies?.nowPlayingMovies);
  const currentMovie = useSelector((state) => state.movies?.currentCarousel);

  useEffect(() => {
  
    if (!movieList || movieList.length === 0 || currentMovie) return;

    // Pick a random movie safely
    const randomIndex = Math.floor(Math.random() * movieList.length);
    const mainMovie = movieList[randomIndex];

    dispatch(addCurrentCarousel(mainMovie));
  }, [movieList, currentMovie, dispatch]);


  return currentMovie;
};

export default useMainCarousel;