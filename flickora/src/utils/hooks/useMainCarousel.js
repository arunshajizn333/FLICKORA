import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentCarousel,
  setCurrentCarouselIndex,
} from "../reduxStore/moviesSlice";

const CAROUSEL_INTERVAL_MS = 30000; // 30 seconds per movie

const useMainCarousel = () => {
  const dispatch = useDispatch();

  const movieList = useSelector((state) => state.movies?.nowPlayingMovies);
  const currentIndex = useSelector(
    (state) => state.movies?.currentCarouselIndex ?? 0
  );
  const currentMovie = useSelector((state) => state.movies?.currentCarousel);

  // Initialize with the first movie once nowPlayingMovies loads
  useEffect(() => {
    if (!movieList || movieList.length === 0) return;
    if (!currentMovie) {
      dispatch(setCurrentCarouselIndex(0));
      dispatch(addCurrentCarousel(movieList[0]));
    }
  }, [movieList, currentMovie, dispatch]);

  // Automatically advance to the next movie every 30s and loop back to 0
  useEffect(() => {
    if (!movieList || movieList.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % movieList.length;
      dispatch(setCurrentCarouselIndex(nextIndex));
      dispatch(addCurrentCarousel(movieList[nextIndex]));
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [movieList, currentIndex, dispatch]);

  return currentMovie;
};

export default useMainCarousel;
