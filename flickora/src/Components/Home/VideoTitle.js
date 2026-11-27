import React from "react";
import { useSelector } from "react-redux";

const VideoTitle = ({ title, overview, releaseDate, rating }) => {
  const movieLogo = useSelector((store) => store.movies?.movieLogo);
  const isLogoLoading = useSelector((store) => store.movies?.isLogoLoading);

  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : null;
  const formattedRating =
    typeof rating === "number" && rating > 0 ? rating.toFixed(1) : null;

  return (
    <div className="relative z-10 flex flex-col justify-center h-full px-12 sm:px-14 md:px-16 bg-gradient-to-r from-[#090914]/95 via-[#090914]/70 via-45% to-transparent max-w-full select-none">
      <div className="max-w-md lg:max-w-lg">
        {/* Featured Movie Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-medium text-gray-200 mb-3">
          <svg
            className="w-3.5 h-3.5 text-amber-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
          <span>Featured Movie</span>
        </div>

        {/* Shimmer while logo loads -> Official Movie Logo -> Fallback Title Text */}
        {isLogoLoading ? (
          <div className="h-10 sm:h-14 md:h-16 w-48 sm:w-64 bg-white/10 rounded-xl animate-pulse" />
        ) : movieLogo ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieLogo}`}
            alt={title}
            className="max-h-14 sm:max-h-20 md:max-h-24 w-auto max-w-[220px] sm:max-w-[300px] md:max-w-[340px] object-contain object-left drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] transition-opacity duration-500"
          />
        ) : (
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.12em] text-white drop-shadow-2xl leading-tight">
            {title}
          </h1>
        )}

        {/* Metadata Row (Year • Rating ★) */}
        {(releaseYear || formattedRating) && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium mt-2.5">
            {releaseYear && <span>{releaseYear}</span>}
            {releaseYear && formattedRating && (
              <span className="text-gray-500">•</span>
            )}
            {formattedRating && (
              <span className="inline-flex items-center gap-1 text-gray-200">
                <span>{formattedRating}</span>
                <svg
                  className="w-3.5 h-3.5 text-amber-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            )}
          </div>
        )}

        {/* Movie Overview / Synopsis */}
        <p className="mt-2.5 text-xs sm:text-sm text-gray-300/95 font-normal leading-relaxed line-clamp-2 drop-shadow-md">
          {overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            type="button"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9d74f7] hover:to-[#8b5cf6] text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(124,58,237,0.45)] cursor-pointer select-none"
          >
            <svg
              className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Details</span>
          </button>

          <button
            type="button"
            className="group flex items-center justify-center gap-2 bg-black/45 hover:bg-black/65 text-white font-medium px-5 py-2.5 rounded-xl text-xs sm:text-sm backdrop-blur-md border border-white/20 active:scale-95 transition-all duration-200 cursor-pointer select-none"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add to Watchlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
