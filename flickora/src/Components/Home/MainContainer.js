import React from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import MainContainerShimmer from "../shimmers/MainContainerShimmer";
import useMainCarousel from "../../utils/hooks/useMainCarousel";
import {
  addCurrentCarousel,
  setCurrentCarouselIndex,
} from "../../utils/reduxStore/moviesSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const data = useMainCarousel();
  const movieList = useSelector((state) => state.movies?.nowPlayingMovies);
  const currentIndex = useSelector(
    (state) => state.movies?.currentCarouselIndex ?? 0
  );

  const handlePrev = () => {
    if (!movieList || movieList.length === 0) return;
    const prevIndex = (currentIndex - 1 + movieList.length) % movieList.length;
    dispatch(setCurrentCarouselIndex(prevIndex));
    dispatch(addCurrentCarousel(movieList[prevIndex]));
  };

  const handleNext = () => {
    if (!movieList || movieList.length === 0) return;
    const nextIndex = (currentIndex + 1) % movieList.length;
    dispatch(setCurrentCarouselIndex(nextIndex));
    dispatch(addCurrentCarousel(movieList[nextIndex]));
  };

  if (!data) {
    return <MainContainerShimmer />;
  }

  const { id, title, overview, backdrop_path, release_date, vote_average } = data;
  const totalDots = Math.min(movieList?.length || 4, 4);
  const activeDot = currentIndex % totalDots;

  return (
    <div className="w-full px-4 sm:px-8 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left/Main Featured Movie Card (~8/12 width on desktop matching reference ratio) */}
        <div className="lg:col-span-8 relative w-full aspect-video min-h-[300px] sm:min-h-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#0b0b14]">
          <VideoBackground
            movieId={id}
            backdropPath={backdrop_path}
            title={title}
          />
          <VideoTitle
            title={title}
            overview={overview}
            releaseDate={release_date}
            rating={vote_average}
          />

          {/* Left Carousel Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous movie"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/80 hover:text-white backdrop-blur-sm transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Carousel Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next movie"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/80 hover:text-white backdrop-blur-sm transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Bottom-left Carousel Dots */}
          <div className="absolute bottom-4 left-10 sm:left-14 z-20 flex items-center gap-1.5">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeDot
                  ? "w-5 bg-purple-500"
                  : "w-1.5 bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Reserved Right Column (lg:col-span-4) for Flickora AI Assistant card */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>
    </div>
  );
};

export default MainContainer;
